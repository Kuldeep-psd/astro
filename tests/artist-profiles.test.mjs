import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createServer } from 'vite';

let server, scenes, artistProfiles, ArtistProfileCard, render;
before(async () => {
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
  ({ scenes } = await server.ssrLoadModule('/src/lib/data/scenes.ts'));
  ({ artistProfiles } = await server.ssrLoadModule('/src/lib/data/artist-profiles.ts'));
  ({ default: ArtistProfileCard } = await server.ssrLoadModule('/src/lib/components/ArtistProfileCard.svelte'));
  ({ render } = await server.ssrLoadModule('svelte/server'));
});
after(async () => { await server?.close(); });

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

test('all 29 artists have sourced portraits, short bios and direct music-profile links', async () => {
  const artists = scenes.flatMap(scene => scene.artists);
  const evidence = (await Promise.all(['bombay-punjabi', 'delhi-urdu', 'regional'].map(async group => JSON.parse(await readFile(new URL(`../docs/artist-profiles-${group}.json`, import.meta.url), 'utf8'))))).flat();
  assert.equal(artists.length, 29);
  assert.deepEqual(Object.keys(artistProfiles).sort(), artists.map(artist => artist.id).sort());
  assert.deepEqual(evidence.map(item => item.artistId).sort(), artists.map(artist => artist.id).sort());
  for (const artist of artists) {
    const profile = artistProfiles[artist.id];
    const source = evidence.find(item => item.artistId === artist.id);
    assert.match(profile.image, /^assets\/artists\/[a-z0-9-]+\.jpg$/);
    assert.ok(profile.bio.length >= 35 && profile.bio.length <= 240, `${artist.id} needs a compact factual bio`);
    assert.equal(profile.musicUrl, source.profileUrl);
    const url = new URL(profile.musicUrl);
    assert.equal(url.protocol, 'https:');
    if (profile.platform === 'Apple Music') {
      assert.equal(url.hostname, 'music.apple.com');
      assert.match(url.pathname, /\/artist\/[^/]+\/\d+$/);
    } else {
      assert.equal(profile.platform, 'Spotify');
      assert.equal(url.hostname, 'open.spotify.com');
      assert.match(url.pathname, /^\/artist\/[a-zA-Z0-9]+$/);
    }
    assert.equal(source.artistName, artist.name);
    assert.equal(source.localPath.replace(/^public\//, ''), profile.image);
    assert.equal(new URL(source.imageSourceUrl).protocol, 'https:');
    assert.ok(source.bioSources.length > 0, `${artist.id} needs bio evidence`);
    for (const bioSource of source.bioSources) assert.equal(new URL(bioSource.url).protocol, 'https:');
    const photo = await readFile(new URL('../public/' + profile.image, import.meta.url));
    assert.equal(photo.readUInt16BE(0), 0xffd8);
    assert.equal(photo.readUInt16BE(photo.length - 2), 0xffd9);
    assert.equal(createHash('sha256').update(photo).digest('hex'), source.sha256);
    assert.equal(photo.length, source.bytes);
  }
});

test('each artist card renders its own portrait and biography with an accessible external artist link', () => {
  for (const artist of scenes.flatMap(scene => scene.artists)) {
    const profile = artistProfiles[artist.id];
    const html = render(ArtistProfileCard, { props: { artist, profile } }).body;
    assert.ok(html.includes(`data-artist-profile="${artist.id}"`));
    assert.ok(html.includes(`src="/${profile.image}"`));
    assert.ok(html.includes(`alt="${escapeHtml(artist.name)}"`));
    assert.ok(html.includes(escapeHtml(profile.bio)));
    assert.ok(html.includes(`href="${escapeHtml(profile.musicUrl)}"`));
    assert.match(html, /target="_blank" rel="noreferrer"/);
    assert.match(html, /opens in a new tab/);
    assert.equal((html.match(/<img\b/g) ?? []).length, 1);
    assert.equal((html.match(/<a\b/g) ?? []).length, 1);
    assert.doesNotMatch(html, /data-release-id|Cover unavailable|album cover/i);
  }
});
