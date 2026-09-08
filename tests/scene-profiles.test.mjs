import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createServer } from 'vite';

let server, scenes, sceneProfiles, SceneProfileCard, DiscStudy, render;
before(async () => {
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
  ({ scenes } = await server.ssrLoadModule('/src/lib/data/scenes.ts'));
  ({ sceneProfiles } = await server.ssrLoadModule('/src/lib/data/scene-profiles.ts'));
  ({ default: SceneProfileCard } = await server.ssrLoadModule('/src/lib/components/SceneProfileCard.svelte'));
  ({ default: DiscStudy } = await server.ssrLoadModule('/src/lib/components/DiscStudy.svelte'));
  ({ render } = await server.ssrLoadModule('svelte/server'));
});
after(async () => { await server?.close(); });

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

test('every scene has a compact sourced biography and a verified local place photo', async () => {
  const photos = (await Promise.all(['west-north', 'regional'].map(async group => JSON.parse(await readFile(new URL(`../docs/scene-photos-${group}.json`, import.meta.url), 'utf8'))))).flat();
  const bios = JSON.parse(await readFile(new URL('../docs/scene-bio-sources.json', import.meta.url), 'utf8'));
  const ids = scenes.map(scene => scene.id).sort();
  assert.equal(ids.length, 8);
  assert.deepEqual(Object.keys(sceneProfiles).sort(), ids);
  assert.deepEqual(photos.map(photo => photo.sceneId).sort(), ids);
  assert.deepEqual(bios.map(bio => bio.sceneId).sort(), ids);
  for (const scene of scenes) {
    const profile = sceneProfiles[scene.id];
    const photo = photos.find(item => item.sceneId === scene.id);
    const bio = bios.find(item => item.sceneId === scene.id);
    assert.equal(profile.image, photo.image);
    assert.equal(profile.imageAlt, photo.alt);
    assert.match(profile.image, /^assets\/scenes\/[a-z-]+\.jpg$/);
    assert.ok(profile.imageAlt.length > 15);
    const words = profile.bio.split(/\s+/).length;
    assert.ok(words >= 25 && words <= 75, `${scene.id} needs a short scene bio (${words} words)`);
    assert.ok(bio.bioSources.length > 0);
    for (const source of bio.bioSources) assert.equal(new URL(source.url).protocol, 'https:');
    for (const key of ['sourceUrl', 'sourceImageUrl', 'licenseUrl']) assert.equal(new URL(photo[key]).protocol, 'https:');
    assert.ok(photo.author && photo.license);
    const bytes = await readFile(new URL('../public/' + profile.image, import.meta.url));
    assert.equal(bytes.readUInt16BE(0), 0xffd8);
    assert.equal(bytes.readUInt16BE(bytes.length - 2), 0xffd9);
    assert.equal(bytes.length, photo.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), photo.sha256);
  }
});

test('scene cards show their own photo and description without links or extra controls', () => {
  for (const scene of scenes) {
    const profile = sceneProfiles[scene.id];
    const html = render(SceneProfileCard, { props: { scene, profile } }).body;
    assert.ok(html.includes(`data-scene-profile="${scene.id}"`));
    assert.ok(html.includes(`src="/${profile.image}"`));
    assert.ok(html.includes(`alt="${escapeHtml(profile.imageAlt)}"`));
    assert.ok(html.includes(escapeHtml(profile.bio)));
    assert.equal((html.match(/<img\b/g) ?? []).length, 1);
    assert.doesNotMatch(html, /<a\b|<button\b|Every band|keyboard-hint|record-stamp/);
  }
});

test('the initial All artists selection shows the scene overview in the details panel', () => {
  const html = render(DiscStudy).body;
  const panel = html.match(/<aside\b[\s\S]*?<\/aside>/)?.[0];
  assert.ok(panel);
  assert.match(panel, /aria-label="Bombay scene overview"/);
  assert.match(panel, /data-scene-profile="bombay"/);
  assert.doesNotMatch(panel, /data-artist-profile|Every band|<a\b/);
  assert.match(html, /<button\b[^>]*aria-pressed="true"[^>]*>All artists<\/button>/);
});
