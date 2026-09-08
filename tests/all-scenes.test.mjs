import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { validateScene } from '../src/lib/charts/validate-scene.js';
import { annularSector, arcLine, createTimeScale, dateToAngle } from '../src/lib/charts/radial.js';

let server, render, scenes, RadialDisc, SceneLocator, SceneDeck, createRawSnippet, projectPakistanLocation;
before(async () => {
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
  ({ render } = await server.ssrLoadModule('svelte/server'));
  ({ createRawSnippet } = await server.ssrLoadModule('svelte'));
  ({ scenes } = await server.ssrLoadModule('/src/lib/data/scenes.ts'));
  ({ default: RadialDisc } = await server.ssrLoadModule('/src/lib/components/RadialDisc.svelte'));
  ({ default: SceneLocator } = await server.ssrLoadModule('/src/lib/components/SceneLocator.svelte'));
  ({ default: SceneDeck } = await server.ssrLoadModule('/src/lib/components/SceneDeck.svelte'));
  ({ projectPakistanLocation } = await server.ssrLoadModule('/src/lib/maps/pakistan-outline.ts'));
});
after(async () => { await server?.close(); });
const draw = (scene, extra = {}) => render(RadialDisc, { props: { scene, onselect() {}, onartistselect() {}, ...extra } }).body;

test('all eight original scenes are registered with their artists and pre-2025 sources', () => {
  assert.deepEqual(scenes.map(scene => scene.id), ['bombay', 'punjabi', 'delhi', 'urdu', 'pune', 'goa', 'amd', 'koshur']);
  assert.deepEqual(scenes.map(scene => scene.artists.length), [5, 5, 6, 4, 2, 2, 2, 3]);
  for (const scene of scenes) {
    assert.equal(validateScene(scene), scene);
    assert.equal(scene.end, '2025-01-01');
    assert.ok(scene.location?.source.url);
    assert.ok(scene.projects.length > 0);
  }
});

test('each disc renders every sourced band and artist filters retain only the matching releases', () => {
  for (const scene of scenes) {
    const html = draw(scene, { fit: true });
    assert.equal((html.match(/data-release-id=/g) ?? []).length, scene.projects.length, scene.id);
    const artistButtons = [...html.matchAll(/<g\s[^>]*data-artist-id="([^"]+)"[^>]*>/g)];
    assert.deepEqual(artistButtons.map(match => match[1]), scene.artists.map(artist => artist.id));
    for (const [index, button] of artistButtons.entries()) {
      assert.match(button[0], /role="button"/);
      assert.match(button[0], /tabindex="0"/);
      assert.match(button[0], /aria-pressed="false"/);
      assert.ok(button[0].includes(`aria-label="Filter by ${scene.artists[index].name}"`));
    }
    assert.doesNotMatch(html, /(?:d|cx|cy|x|y|r|transform|viewBox)="[^"]*(?:NaN|Infinity)/);
    assert.match(html, /preserveAspectRatio="xMidYMid meet"/);
    for (const artist of scene.artists) {
      const filtered = draw(scene, { artistId: artist.id });
      assert.equal((filtered.match(/data-release-id=/g) ?? []).length, scene.projects.filter(project => project.artistId === artist.id).length, `${scene.id}/${artist.id}`);
    }
  }
});

test('longer original calendars get legible major years and preserve the shared cutoff', () => {
  const years = html => [...html.matchAll(/<text[^>]*class="year[^>]*>([^<]+)<\/text>/g)].map(match => match[1]);
  assert.deepEqual(years(draw(scenes.find(scene => scene.id === 'punjabi'))), ['2004', '2011', '2018', '2025']);
  assert.deepEqual(years(draw(scenes.find(scene => scene.id === 'delhi'))), ['2010', '2015', '2020', '2025']);
  assert.deepEqual(years(draw(scenes.find(scene => scene.id === 'bombay'))), ['2013', '2017', '2021', '2025']);
});

test('the Urdu locator represents Pakistan instead of placing Karachi on India', () => {
  const urdu = scenes.find(scene => scene.id === 'urdu');
  const point = projectPakistanLocation(urdu.location.longitude, urdu.location.latitude);
  assert.ok(point.x > 0 && point.x < 100 && point.y > 0 && point.y < 110);
  const html = render(SceneLocator, { props: { location: urdu.location } }).body;
  assert.match(html, /Pakistan/);
  assert.doesNotMatch(html, /India/);
  const invalid = structuredClone(urdu);
  invalid.location.country = 'invalid';
  assert.throws(() => validateScene(invalid), /country/);
});

test('every scene exposes enabled previous and next controls and its current name', () => {
  for (let activeIndex = 0; activeIndex < scenes.length; activeIndex++) {
    const html = render(SceneDeck, { props: { scenes, activeIndex, onchange() {}, children: createRawSnippet(() => ({ render: () => '<div>Disc</div>' })) } }).body;
    assert.match(html, /aria-label="Previous scene"/);
    assert.match(html, /aria-label="Next scene"/);
    assert.ok(html.includes(scenes[activeIndex].name));
    assert.doesNotMatch(html, / disabled(?:=|\s|>)/);
  }
});


test('disc and list navigation use only arrows with destinations that wrap across the collection', () => {
  const children = createRawSnippet(() => ({ render: () => '<div>Disc</div>' }));
  for (const view of ['disc', 'list']) {
    for (let activeIndex = 0; activeIndex < scenes.length; activeIndex++) {
      const html = render(SceneDeck, { props: { scenes, activeIndex, view, onchange() {}, children } }).body;
      const buttons = [...html.matchAll(/<button\b[^>]*>/g)].map(match => match[0]);
      assert.equal(buttons.length, 2, `${view}/${scenes[activeIndex].id}`);
      assert.match(buttons[0], /aria-label="Previous scene"/);
      assert.match(buttons[1], /aria-label="Next scene"/);
      const previous = scenes[(activeIndex + scenes.length - 1) % scenes.length];
      const next = scenes[(activeIndex + 1) % scenes.length];
      assert.ok(buttons[0].includes(`title="Previous scene: ${previous.name}"`));
      assert.ok(buttons[1].includes(`title="Next scene: ${next.name}"`));
      assert.doesNotMatch(html, /data-preview-scene=|neighbor-record|data-release-id=|role="button"/);
      assert.doesNotMatch(html, / disabled(?:=|\s|>)/);
    }
    const single = render(SceneDeck, { props: { scenes: [scenes[0]], activeIndex: 0, view, onchange() {}, children } }).body;
    assert.equal((single.match(/<button\b/g) ?? []).length, 2);
    assert.doesNotMatch(single, /data-preview-scene=|neighbor-record/);
    assert.equal((single.match(/ disabled(?:=|\s|>)/g) ?? []).length, 2);
  }
});

test('Sidhu’s black track and grooves stop at his death and remain stable under filtering', () => {
  const scene = scenes.find(scene => scene.id === 'punjabi');
  const scale = createTimeScale(scene);
  const html = draw(scene);
  const filtered = draw(scene, { artistId: 'sidhu', types: ['ep'] });
  const lane = (markup, id) => markup.split(`data-artist-id="${id}"`)[1].match(/\bd="([^"]*)"/)[1];
  for (const [index, artist] of scene.artists.entries()) {
    const start = dateToAngle(artist.anchor.date < scene.start ? scene.start : artist.anchor.date, scale);
    const end = dateToAngle(artist.id === 'sidhu' ? '2022-05-29' : scene.end, scale);
    const inner = 185 + index * 30;
    const expected = annularSector(410, 410, inner, inner + 27, start, end);
    assert.equal(lane(html, artist.id), expected, artist.id);
    if (artist.id === 'sidhu') {
      assert.equal(lane(filtered, artist.id), expected, 'filtering does not alter the activity endpoint');
      assert.notEqual(expected, annularSector(410, 410, inner, inner + 27, start, scale.startAngle + scale.sweep));
      for (const offset of [6.5, 13.5, 20.5]) {
        const groove = arcLine(410, 410, inner + offset, start, end);
        assert.ok(html.includes(`d="${groove}"`));
        assert.ok(filtered.includes(`d="${groove}"`));
      }
    }
  }
  assert.match(html, /Ring ends 29 May 2022/);
  assert.equal((filtered.match(/data-release-id=/g) ?? []).length, 1);
});

test('posthumous releases remain selectable without extending an artist’s black track', () => {
  const scene = structuredClone(scenes.find(scene => scene.id === 'punjabi'));
  const before = draw(scene, { artistId: 'sidhu' });
  scene.projects.push({ ...scene.projects.find(project => project.artistId === 'sidhu'), id: 'posthumous-test', title: 'Posthumous test fixture', date: '2024-01-01' });
  const after = draw(scene, { artistId: 'sidhu', selectedId: 'posthumous-test' });
  const lane = html => html.split('data-artist-id="sidhu"')[1].match(/\bd="([^"]+)"/)[1];
  assert.equal(lane(after), lane(before));
  const release = [...after.matchAll(/<g\s[^>]*data-release-id="([^"]+)"[^>]*>/g)].find(match => match[1] === 'posthumous-test')[0];
  assert.match(release, /role="button"/);
  assert.match(release, /tabindex="0"/);
  assert.match(release, /1 Jan 2024/);
  const expectedAngle = dateToAngle('2024-01-01', createTimeScale(scene));
  assert.ok(release.includes(`data-date-angle="${expectedAngle}"`));
});


test('MC Kash’s hiatus ends his ring in 2016 without inventing a retirement day', () => {
  const scene = scenes.find(scene => scene.id === 'koshur');
  const original = structuredClone(scene);
  const artist = scene.artists.find(artist => artist.id === 'mc-kash');
  assert.equal(artist.activityEnd.date, '2016-12-31');
  assert.equal(artist.activityEnd.precision, 'year');
  assert.match(artist.activityEnd.label, /Hiatus after 2016/);
  assert.match(artist.activityEnd.label, /guest appearances/);
  const scale = createTimeScale(scene);
  const expected = annularSector(350, 350, 185, 212, scale.startAngle, dateToAngle('2016-12-31', scale));
  const html = draw(scene);
  const filtered = draw(scene, { artistId: 'mc-kash', selectedId: 'mc-kash-rebel-republik' });
  for (const markup of [html, filtered]) {
    const lane = markup.split('data-artist-id="mc-kash"')[1].match(/\bd="([^"]+)"/)[1];
    assert.equal(lane, expected);
    for (const offset of [6.5, 13.5, 20.5]) {
      const groove = arcLine(350, 350, 185 + offset, scale.startAngle, dateToAngle('2016-12-31', scale));
      assert.ok(markup.includes(`d="${groove}"`));
    }
  }
  assert.match(html, /Ring ends 2016 \(year only\)/);
  assert.doesNotMatch(html, /31 Dec 2016|1 Jan 2016|retired|Retired/);
  assert.match(filtered, /tabindex="0"[^>]+data-release-id="mc-kash-rebel-republik"/);
  assert.match(filtered, /26 Nov 2012/);
  assert.equal((html.match(/data-release-id=/g) ?? []).length, scene.projects.length);
  assert.equal(scene.end, '2025-01-01');
  assert.deepEqual(scene, original);
});
