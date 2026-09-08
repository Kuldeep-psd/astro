import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

let server, render, RadialDisc, bombayScene;
before(async () => {
  // Render the real Svelte component without a browser or network listener.
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
  ({ render } = await server.ssrLoadModule('svelte/server'));
  ({ default: RadialDisc } = await server.ssrLoadModule('/src/lib/components/RadialDisc.svelte'));
  ({ bombayScene } = await server.ssrLoadModule('/src/lib/data/bombay.ts'));
});
after(async () => { await server?.close(); });
const draw = (props = {}) => render(RadialDisc, { props: { scene: bombayScene, onselect() {}, onartistselect() {}, ...props } }).body;
const releaseControls = html => [...html.matchAll(/<g\s[^>]*data-release-id="[^"]+"[^>]*>/g)].map(match => match[0]);
const artistControls = html => [...html.matchAll(/<g\s[^>]*data-artist-id="([^"]+)"[^>]*>/g)].map(match => ({ id: match[1], tag: match[0] }));
const band = (html, id) => [...html.matchAll(/<g\s[^>]*data-release-id="([^"]+)"[^>]*>/g)].find(m => m[1] === id)?.[0];

test('render includes the sourced releases and one release keyboard entry point', () => {
  const html = draw();
  assert.equal((html.match(/data-release-id=/g) ?? []).length, 23);
  assert.equal(releaseControls(html).filter(tag => /tabindex="0"/.test(tag)).length, 1);
  assert.match(html, /Time runs counterclockwise/);
  assert.doesNotMatch(html, /\bNaN\b|\bInfinity\b/);
});

test('artist rings are separate filter buttons, including dimmed rings with no visible releases', () => {
  for (const props of [{}, { artistId: 'divine' }, { artistId: 'divine', types: [] }]) {
    const html = draw(props);
    const controls = artistControls(html);
    assert.deepEqual(controls.map(control => control.id), bombayScene.artists.map(artist => artist.id));
    for (const artist of bombayScene.artists) {
      const { tag } = controls.find(control => control.id === artist.id);
      assert.match(tag, /role="button"/);
      assert.match(tag, /tabindex="0"/);
      assert.ok(tag.includes(`aria-label="Filter by ${artist.name}"`));
      assert.ok(tag.includes(`aria-pressed="${props.artistId === artist.id}"`));
      assert.doesNotMatch(tag, /aria-hidden="true"|aria-disabled="true"/);
      if (props.artistId && props.artistId !== artist.id) assert.match(tag, /opacity="0?\.22"/);
    }
    if (props.types) assert.equal(releaseControls(html).length, 0);
    // All interactive SVG groups must be independent, so a release activation
    // cannot bubble through an enclosing artist filter button.
    const stack = [];
    for (const match of html.matchAll(/<\/?g\b[^>]*>/g)) {
      const tag = match[0];
      if (tag.startsWith('</')) { stack.pop(); continue; }
      const interactive = /role="button"/.test(tag);
      if (interactive) assert.ok(!stack.some(Boolean), `nested button: ${tag}`);
      stack.push(interactive);
    }
    assert.equal(stack.length, 0);
  }
});

test('restored selection becomes the keyboard entry point; hidden selections fall back', () => {
  const selectedId = 'naezy-2014';
  assert.match(band(draw({ selectedId }), selectedId), /tabindex="0"/);
  assert.match(band(draw({ selectedId }), selectedId), /aria-pressed="true"/);
  const filtered = draw({ selectedId, artistId: 'divine', types: ['album'] });
  assert.equal((filtered.match(/data-release-id=/g) ?? []).length, 4);
  assert.equal(band(filtered, selectedId), undefined);
  assert.match(band(filtered, 'divine-kohinoor'), /tabindex="0"/);
});

test('partial-year domains render their actual endpoints and support another artist lane', () => {
  const scene = structuredClone(bombayScene);
  scene.start = '2013-06-01';
  scene.end = '2025-06-01';
  scene.artists.push({ ...structuredClone(scene.artists[0]), id: 'sixth', name: 'Sixth artist' });
  const html = draw({ scene });
  assert.match(html, /1 Jun 2013/);
  assert.match(html, /1 Jun 2025/);
  assert.match(html, /Sixth artist/);
  assert.doesNotMatch(html, /\bNaN\b|\bInfinity\b/);
});

test('approximate artist starts keep year precision without grey hatching', () => {
  const scene = structuredClone(bombayScene);
  scene.artists[0].anchor = { ...scene.artists[0].anchor, date: '2013-01-01', precision: 'year' };
  const html = draw({ scene });
  assert.doesNotMatch(html, /<pattern|hatching marks|fill="url\(#[^"]+-year\)/);
  assert.match(html, /Starting year: 2013; exact day unknown/);
  assert.equal(scene.artists[0].anchor.precision, 'year');
});

test('nearby releases fill the ring with separate click areas and filter-stable spacing', () => {
  const scene = structuredClone(bombayScene);
  scene.projects.unshift({ ...structuredClone(scene.projects[0]), id: 'same-day-ep', type: 'ep' });
  const complete = draw({ scene });
  const filtered = draw({ scene, types: ['ep'] });
  const path = (html, id) => html.split(`data-release-id="${id}"`)[1].match(/<path[^>]*class="band[^>]*d="([^"]+)"/)[1];
  const thickness = (html, id) => {
    const radii = [...path(html, id).matchAll(/\bA ([\d.]+)/g)].map(match => Number(match[1]));
    return radii[0] - radii.at(-1);
  };
  const angle = (id, name) => Number(band(complete, id).match(new RegExp('data-' + name + '-angle="([^\"]+)"'))[1]);
  assert.equal(thickness(complete, 'divine-kohinoor'), 27);
  assert.equal(thickness(complete, 'same-day-ep'), 27);
  assert.equal(thickness(complete, 'divine-punya-paap'), 27);
  assert.equal(angle('divine-kohinoor', 'date'), angle('same-day-ep', 'date'));
  const distance = Math.abs(angle('divine-kohinoor', 'display') - angle('same-day-ep', 'display'));
  assert.ok(distance >= (7.2 + 3.6) / 2 + 1.4 - 1e-8, 'both full-width bands have a clear gap');
  assert.equal(path(filtered, 'same-day-ep'), path(complete, 'same-day-ep'));
  assert.match(band(complete, 'same-day-ep'), /9 Oct 2019/);
  assert.doesNotMatch(complete, /data-layer|data-slot|overlapping/);
});

test('artist names clear the pre-anchor edge of their first release without moving dates', () => {
  const html = draw();
  const filtered = draw({ types: ['ep'] });
  const name = markup => [...markup.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].find(match => match[2] === 'The Siege');
  const label = name(html);
  assert.ok(label, 'The Siege label is rendered');
  assert.match(label[1], /font-size:\s*17px/);
  assert.equal(name(filtered)[1], label[1], 'filtering out Bubblecars does not move the artist name');
  const center = Number(html.match(/viewBox="0 [\d.]+ ([\d.]+) [\d.]+"/)[1]) / 2;
  const x = Number(label[1].match(/\bx="([^"]+)"/)[1]);
  const y = Number(label[1].match(/\by="([^"]+)"/)[1]);
  const labelAngle = Math.atan2(y - center, x - center);
  const radius = Math.hypot(x - center, y - center);
  const releaseMarkup = html.split('data-release-id="siege-bubblecars"')[1];
  const bandStart = releaseMarkup.match(/<path\b[^>]*class="band[^"]*"[^>]*d="M ([\d.-]+) ([\d.-]+)/);
  assert.ok(bandStart, 'first release band is rendered');
  const bandAngle = Math.atan2(Number(bandStart[2]) - center, Number(bandStart[1]) - center);
  const clearPixels = Math.sin(labelAngle - bandAngle) * radius;
  assert.ok(clearPixels >= 10, `artist text needs a physical gap before the band; received ${clearPixels}px`);
  assert.match(releaseMarkup, /26 Aug 2019/);
});
