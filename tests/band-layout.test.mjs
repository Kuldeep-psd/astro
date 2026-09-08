import test from 'node:test';
import assert from 'node:assert/strict';
import { createTimeScale, dateToAngle } from '../src/lib/charts/radial.js';
import { layoutBands } from '../src/lib/charts/band-layout.js';

const makeScale = (direction = -1) => createTimeScale({ start: '2024-01-01', end: '2024-01-11', startAngle: 17, sweep: 100 * direction });
const release = (id, day, width = 10) => ({ id, date: `2024-01-${String(day).padStart(2, '0')}`, width });
const closeTo = (actual, expected, message) => assert.ok(Math.abs(actual - expected) < 1e-9, message ?? `${actual} should equal ${expected}`);
const position = (angle, scale) => Math.sign(scale.sweep) * (angle - scale.startAngle);

function assertSeparated(bands, input, scale, gap = 1.4) {
  const byId = new Map(input.map(item => [item.id, item]));
  const chronological = [...bands].sort((a, b) => position(a.dateAngle, scale) - position(b.dateAngle, scale) || (a.id < b.id ? -1 : 1));
  for (let index = 0; index < chronological.length; index += 1) {
    const band = chronological[index];
    const source = byId.get(band.id);
    const start = position(band.startAngle, scale);
    const end = position(band.endAngle, scale);
    closeTo(end - start, source.width, `${band.id} must keep its full width`);
    assert.ok(start >= -1e-9 && end <= Math.abs(scale.sweep) + 1e-9, `${band.id} must fit inside the sweep`);
    closeTo(band.centerAngle, (band.startAngle + band.endAngle) / 2);
    assert.equal(band.dateAngle, dateToAngle(source.date, scale));
    if (index > 0) {
      const previousEnd = position(chronological[index - 1].endAngle, scale);
      assert.ok(start - previousEnd >= gap - 1e-9, `${chronological[index - 1].id} and ${band.id} need a ${gap}° gap`);
    }
  }
}

test('same-day releases become full-width bands with separate clickable areas', () => {
  for (const direction of [-1, 1]) {
    const scale = makeScale(direction);
    const input = [release('third', 6, 18), release('first', 6, 18), release('second', 6, 18)];
    const output = layoutBands(input, scale);
    assert.deepEqual(output.map(band => band.id), input.map(item => item.id));
    assertSeparated(output, input, scale);
    const centers = [...output].map(band => position(band.centerAngle, scale)).sort((a, b) => a - b);
    centers.forEach((center, index) => closeTo(center, 50 + (index - 1) * 19.4));
    assert.equal(new Set(output.map(band => band.centerAngle)).size, input.length);
  }
});

test('nearby non-overlapping releases still receive a real visible gap', () => {
  const scale = makeScale();
  const input = [release('earlier', 5, 9), release('later', 6, 9)];
  const output = layoutBands(input, scale);
  assertSeparated(output, input, scale);
  closeTo(position(output[0].centerAngle, scale), 39.8);
  closeTo(position(output[1].centerAngle, scale), 50.2);
});

test('mixed-width collision chains stay chronological in either direction', () => {
  for (const direction of [-1, 1]) {
    const scale = makeScale(direction);
    const input = [release('late', 5, 8), release('wide', 4, 26), release('early', 3, 10), release('far', 9, 12)];
    const output = layoutBands(input, scale);
    assertSeparated(output, input, scale);
    closeTo(output[3].centerAngle, output[3].dateAngle);
  }
});

test('both timeline boundaries preserve full bands instead of clipping them', () => {
  for (const direction of [-1, 1]) {
    const scale = makeScale(direction);
    const input = [release('first', 1, 20), release('last', 11, 16)];
    const output = layoutBands(input, scale);
    assertSeparated(output, input, scale);
    closeTo(position(output[0].startAngle, scale), 0);
    closeTo(position(output[0].endAngle, scale), 20);
    closeTo(position(output[1].startAngle, scale), 84);
    closeTo(position(output[1].endAngle, scale), 100);
  }
});

test('dense boundary clusters move inward and retain every gap', () => {
  for (const direction of [-1, 1]) {
    const scale = makeScale(direction);
    const input = [release('start-b', 1), release('start-a', 1), release('end-b', 11), release('end-a', 11)];
    const output = layoutBands(input, scale);
    assertSeparated(output, input, scale);
    closeTo(position(output[1].startAngle, scale), 0);
    closeTo(position(output[0].startAngle, scale), 11.4);
    closeTo(position(output[3].endAngle, scale), 88.6);
    closeTo(position(output[2].endAngle, scale), 100);
  }
});

test('isolated releases retain their date centers around a local collision', () => {
  const scale = makeScale();
  const input = [release('before', 2, 8), release('a', 5), release('b', 5), release('after', 9, 8)];
  const output = layoutBands(input, scale);
  assertSeparated(output, input, scale);
  closeTo(output[0].centerAngle, output[0].dateAngle);
  closeTo(output[3].centerAngle, output[3].dateAngle);
  closeTo(position(output[1].centerAngle, scale), 34.3);
  closeTo(position(output[2].centerAngle, scale), 45.7);
});

test('a wider same-day project stays intact beside a narrow one', () => {
  const scale = makeScale();
  const input = [release('wide', 6, 30), release('narrow', 6, 10)];
  assertSeparated(layoutBands(input, scale), input, scale);
});

test('layout is deterministic across input order and does not mutate release data', () => {
  const input = [release('z', 4, 18), release('a', 4, 12), release('middle', 5, 20), release('last', 10)];
  const original = structuredClone(input);
  const byId = bands => Object.fromEntries([...bands].sort((a, b) => a.id.localeCompare(b.id)).map(band => [band.id, band]));
  const expected = byId(layoutBands(input, makeScale()));
  for (const reordered of [[...input].reverse(), [input[2], input[0], input[3], input[1]]]) {
    const result = layoutBands(reordered, makeScale());
    assert.deepEqual(result.map(band => band.id), reordered.map(item => item.id));
    assert.deepEqual(byId(result), expected);
  }
  assert.deepEqual(input, original);
});

test('custom gaps are respected without changing nominal widths', () => {
  const scale = makeScale();
  const input = [release('a', 5), release('b', 5), release('c', 6)];
  assertSeparated(layoutBands(input, scale, 4), input, scale, 4);
  assertSeparated(layoutBands(input, scale, 0), input, scale, 0);
});

test('an exactly full lane remains feasible with intact widths and gaps', () => {
  const scale = makeScale();
  const input = [release('a', 6, 30), release('b', 6, 30), release('c', 6, 36)];
  const output = layoutBands(input, scale, 2);
  assertSeparated(output, input, scale, 2);
  closeTo(position(output[0].startAngle, scale), 0);
  closeTo(position(output[2].endAngle, scale), 100);
});

test('crowded lanes fail explicitly instead of shrinking bands or hiding releases', () => {
  assert.throws(() => layoutBands([release('a', 4, 50), release('b', 7, 50)], makeScale()), /exceed the timeline sweep/);
  assert.throws(() => layoutBands([release('too-wide', 6, 101)], makeScale()), /exceed the timeline sweep/);
});

test('empty artist catalogs produce no bands', () => {
  assert.deepEqual(layoutBands([], makeScale()), []);
});

test('duplicate or missing release identifiers are rejected', () => {
  assert.throws(() => layoutBands([release('duplicate', 2), release('duplicate', 8)], makeScale()), /Duplicate release ID/);
  for (const id of ['', '   ', undefined]) {
    assert.throws(() => layoutBands([release(id, 2)], makeScale()), /nonempty string/);
  }
});

test('invalid dates, widths, gaps and scales are rejected', () => {
  assert.throws(() => layoutBands([{ id: 'outside', date: '2023-12-31', width: 10 }], makeScale()), /outside the timeline/);
  assert.throws(() => layoutBands([{ id: 'rollover', date: '2024-02-30', width: 10 }], makeScale()), /Invalid calendar date/);
  for (const width of [0, -1, NaN, Infinity, 361, '10']) {
    assert.throws(() => layoutBands([release('bad-width', 4, width)], makeScale()), /Marker width/);
  }
  for (const gap of [-1, NaN, Infinity, '2']) {
    assert.throws(() => layoutBands([release('a', 5)], makeScale(), gap), /Band gap/);
  }
  assert.throws(() => layoutBands([], { ...makeScale(), sweep: 0 }), /Sweep/);
});
