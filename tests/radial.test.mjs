import test from 'node:test';
import assert from 'node:assert/strict';
import { annularSector, arcLine, artistTrackAngles, createTimeScale, dateToAngle, parseDate, polarPoint, releaseMarkerAngles } from '../src/lib/charts/radial.js';

function close(actual, expected, tolerance = 0.000001) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} should be within ${tolerance} of ${expected}`);
}

// Parse only the small SVG command vocabulary emitted by the geometry API.
function commands(path) {
  return [...path.matchAll(/([MLAZ])([^MLAZ]*)/g)].map(([, command, values]) => ({
    command,
    values: values.trim() ? values.trim().split(/\s+/).map(Number) : [],
  }));
}

test('dates use UTC, preserve early years, and account for Gregorian leap days', () => {
  assert.equal(parseDate('1970-01-01'), 0);
  assert.equal(parseDate('2024-02-29'), Date.UTC(2024, 1, 29));
  assert.equal(parseDate('2024-03-01') - parseDate('2024-02-28'), 2 * 86400000);
  assert.equal(parseDate('2023-03-01') - parseDate('2023-02-28'), 86400000);
  assert.equal(new Date(parseDate('0099-01-01')).toISOString(), '0099-01-01T00:00:00.000Z');
  assert.equal(new Date(parseDate('0000-02-29')).getUTCFullYear(), 0);
  assert.equal(parseDate('2000-02-29'), Date.UTC(2000, 1, 29));
});

test('date parsing rejects rollover and non-date formats', () => {
  for (const invalid of ['2023-02-29', '1900-02-29', '2024-04-31', '2024-00-10', '2024-13-01', '2024-01-00', '2024-01-32', '2024-1-01', '2024-01-1', '2024-01-01T00:00:00Z', ' 2024-01-01', '', null, 0]) {
    assert.throws(() => parseDate(invalid), undefined, String(invalid));
  }
});

test('a time scale includes both endpoints and maps actual elapsed days', () => {
  const scale = createTimeScale({ start: '2024-02-28', end: '2024-03-01' });
  assert.equal(scale.start, Date.UTC(2024, 1, 28));
  assert.equal(scale.end, Date.UTC(2024, 2, 1));
  assert.equal(dateToAngle('2024-02-28', scale), -36);
  assert.equal(dateToAngle('2024-02-29', scale), -198);
  assert.equal(dateToAngle('2024-03-01', scale), -360);
  assert.equal(dateToAngle(scale.end, scale), -360);
  assert.throws(() => dateToAngle('2024-02-27', scale), RangeError);
  assert.throws(() => dateToAngle('2024-03-02', scale), RangeError);
});

test('invalid scale ranges, angles, and numeric dates are rejected', () => {
  const valid = { start: '2024-01-01', end: '2025-01-01' };
  for (const options of [
    { ...valid, end: '2024-01-01' }, { ...valid, end: '2023-01-01' },
    { ...valid, start: NaN }, { ...valid, end: Infinity }, { ...valid, end: 1e30 },
    { ...valid, startAngle: NaN }, { ...valid, sweep: 0 },
    { ...valid, sweep: 361 }, { ...valid, sweep: -361 }, { ...valid, sweep: Infinity },
  ]) assert.throws(() => createTimeScale(options));
  const scale = createTimeScale(valid);
  assert.throws(() => dateToAngle(NaN, scale));
  assert.throws(() => dateToAngle(scale.start, { ...scale, sweep: NaN }));
});

test('polar coordinates use SVG clockwise angles and arbitrary centers', () => {
  for (const [angle, expected] of [[0, [25, 20]], [90, [10, 35]], [180, [-5, 20]], [-90, [10, 5]], [360, [25, 20]]]) {
    const actual = polarPoint(10, 20, 15, angle);
    close(actual.x, expected[0]);
    close(actual.y, expected[1]);
  }
  assert.deepEqual(polarPoint(7, 8, 0, 43), { x: 7, y: 8 });
  assert.throws(() => polarPoint(0, 0, -1, 0), RangeError);
  assert.throws(() => polarPoint(NaN, 0, 1, 0), TypeError);
});

test('annular sectors connect the expected four corners and reverse the inner edge', () => {
  for (const direction of [-1, 1]) {
    const path = commands(annularSector(10, 20, 5, 10, 0, direction * 90));
    assert.deepEqual(path.map(({ command }) => command), ['M', 'A', 'L', 'A', 'Z']);
    assert.deepEqual(path[0].values, [20, 20]);
    assert.deepEqual(path[1].values.slice(0, 5), [10, 10, 0, 0, direction > 0 ? 1 : 0]);
    close(path[1].values[5], 10);
    close(path[1].values[6], 20 + direction * 10);
    close(path[2].values[0], 10);
    close(path[2].values[1], 20 + direction * 5);
    assert.deepEqual(path[3].values.slice(0, 5), [5, 5, 0, 0, direction > 0 ? 0 : 1]);
    assert.deepEqual(path[3].values.slice(5), [15, 20]);
  }
});

test('large sectors select the longer route in both directions', () => {
  for (const direction of [-1, 1]) {
    const arcs = commands(annularSector(0, 0, 5, 10, 0, direction * 270)).filter(({ command }) => command === 'A');
    assert.equal(arcs.length, 2);
    assert.equal(arcs[0].values[3], 1);
    assert.equal(arcs[1].values[3], 1);
    assert.equal(arcs[0].values[4], direction > 0 ? 1 : 0);
    assert.equal(arcs[1].values[4], direction > 0 ? 0 : 1);
    close(arcs[0].values[5], 0);
    close(arcs[0].values[6], -direction * 10);
  }
});

test('full annuli use two arcs per boundary, with opposite winding around the hole', () => {
  for (const direction of [-1, 1]) {
    const path = commands(annularSector(0, 0, 5, 10, 0, direction * 360));
    assert.deepEqual(path.map(({ command }) => command), ['M', 'A', 'A', 'L', 'A', 'A', 'Z']);
    const arcs = path.filter(({ command }) => command === 'A');
    assert.deepEqual(arcs.map(({ values }) => values.slice(5)), [[-10, 0], [10, 0], [-5, 0], [5, 0]]);
    assert.deepEqual(arcs.map(({ values }) => values[4]), direction > 0 ? [1, 1, 0, 0] : [0, 0, 1, 1]);
    assert.ok(arcs.every(({ values }) => values[3] === 0));
  }
});

test('zero spans are empty, zero inner radius makes a pie, invalid geometry fails', () => {
  assert.equal(annularSector(0, 0, 5, 10, 31, 31), '');
  assert.equal(arcLine(0, 0, 10, 31, 31), '');
  const pie = commands(annularSector(4, 6, 0, 10, 0, 90));
  assert.deepEqual(pie.map(({ command }) => command), ['M', 'A', 'L', 'Z']);
  assert.deepEqual(pie[2].values, [4, 6]);
  for (const radii of [[-1, 10], [10, 10], [11, 10], [0, 0], [0, Infinity]]) {
    assert.throws(() => annularSector(0, 0, ...radii, 0, 90));
  }
  for (const end of [361, -361, NaN, Infinity]) {
    assert.throws(() => annularSector(0, 0, 5, 10, 0, end));
    assert.throws(() => arcLine(0, 0, 10, 0, end));
  }
  for (const radius of [-1, 0, NaN]) assert.throws(() => arcLine(0, 0, radius, 0, 90));
});

test('open arcs preserve direction, longer spans, and full-circle topology', () => {
  for (const direction of [-1, 1]) {
    const quarter = commands(arcLine(0, 0, 10, 0, direction * 90));
    assert.deepEqual(quarter.map(({ command }) => command), ['M', 'A']);
    assert.deepEqual(quarter[1].values, [10, 10, 0, 0, direction > 0 ? 1 : 0, 0, direction * 10]);
    const long = commands(arcLine(0, 0, 10, 0, direction * 270));
    assert.equal(long[1].values[3], 1);
    const circle = commands(arcLine(0, 0, 10, 0, direction * 360));
    assert.deepEqual(circle.map(({ command }) => command), ['M', 'A', 'A']);
    assert.deepEqual(circle[1].values.slice(5), [-10, 0]);
    assert.deepEqual(circle[2].values.slice(5), [10, 0]);
  }
});

test('release glyphs are centered on the actual date in either timeline direction', () => {
  for (const direction of [-1, 1]) {
    const scale = createTimeScale({ start: '2024-02-28', end: '2024-03-01', startAngle: 17, sweep: direction * 100 });
    const marker = releaseMarkerAngles('2024-02-29', scale, 8);
    assert.equal(marker.centerAngle, 17 + direction * 50);
    assert.equal(marker.startAngle, marker.centerAngle - direction * 4);
    assert.equal(marker.endAngle, marker.centerAngle + direction * 4);
    close(Math.abs(marker.endAngle - marker.startAngle), 8);
  }
});

test('boundary clipping keeps exact event centers without wrapping or shifting', () => {
  for (const direction of [-1, 1]) {
    const scale = createTimeScale({ start: 0, end: 1000, startAngle: 17, sweep: direction * 100 });
    const first = releaseMarkerAngles(0, scale, 8);
    assert.deepEqual(first, { startAngle: 17, endAngle: 17 + direction * 4, centerAngle: 17 });
    const last = releaseMarkerAngles(1000, scale, 8);
    assert.deepEqual(last, { startAngle: 17 + direction * 96, endAngle: 17 + direction * 100, centerAngle: 17 + direction * 100 });
    const nearStart = releaseMarkerAngles(20, scale, 8);
    assert.equal(nearStart.startAngle, 17);
    assert.equal(nearStart.centerAngle, 17 + direction * 2);
    assert.equal(nearStart.endAngle, 17 + direction * 6);
    const nearEnd = releaseMarkerAngles(980, scale, 8);
    assert.equal(nearEnd.startAngle, 17 + direction * 94);
    assert.equal(nearEnd.centerAngle, 17 + direction * 98);
    assert.equal(nearEnd.endAngle, 17 + direction * 100);
    const wide = releaseMarkerAngles(500, scale, 200);
    assert.equal(wide.startAngle, 17);
    assert.equal(wide.endAngle, 17 + direction * 100);
    assert.equal(wide.centerAngle, 17 + direction * 50);
  }
});

test('release glyph width must be positive and finite and date must remain in domain', () => {
  const scale = createTimeScale({ start: '2024-01-01', end: '2025-01-01' });
  for (const width of [0, -1, 361, NaN, Infinity]) assert.throws(() => releaseMarkerAngles('2024-05-01', scale, width));
  assert.throws(() => releaseMarkerAngles('2023-12-31', scale), RangeError);
  assert.throws(() => releaseMarkerAngles('2025-01-02', scale), RangeError);
  const marker = releaseMarkerAngles('2024-05-01', scale);
  close(Math.abs(marker.endAngle - marker.startAngle), 3.6);
});


test('artist activity spans end independently of the scene cutoff in either direction', () => {
  const artist = { anchor: { date: '2020-01-01' }, activityEnd: { date: '2022-05-29' } };
  for (const sweep of [-324, 324]) {
    const scale = createTimeScale({ start: '2019-01-01', end: '2025-01-01', sweep });
    assert.deepEqual(artistTrackAngles(artist, scale), {
      startAngle: dateToAngle('2020-01-01', scale),
      endAngle: dateToAngle('2022-05-29', scale),
    });
    assert.equal(artistTrackAngles({ anchor: artist.anchor }, scale).endAngle, scale.startAngle + sweep);
    assert.equal(artistTrackAngles({ ...artist, activityEnd: { date: '2027-01-01' } }, scale).endAngle, scale.startAngle + sweep);
    const earlier = { anchor: { date: '2010-01-01' }, activityEnd: { date: '2018-01-01' } };
    assert.deepEqual(artistTrackAngles(earlier, scale), { startAngle: scale.startAngle, endAngle: scale.startAngle });
    assert.equal(artistTrackAngles({ ...artist, anchor: earlier.anchor }, scale).startAngle, scale.startAngle);
  }
});
