import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createServer } from 'vite';

let server, scenes, projectArtwork;
before(async () => {
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
  ({ scenes } = await server.ssrLoadModule('/src/lib/data/scenes.ts'));
  ({ projectArtwork } = await server.ssrLoadModule('/src/lib/data/artwork.ts'));
});
after(async () => { await server?.close(); });
const evidence = JSON.parse(await readFile(new URL('../docs/project-artwork.json', import.meta.url), 'utf8'));

test('every scene project has verified local artwork, a catalog link and documented date exceptions', async () => {
  const projects = scenes.flatMap(scene => scene.projects);
  assert.deepEqual(Object.keys(projectArtwork).sort(), projects.map(project => project.id).sort());
  assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
  assert.equal(new Set(evidence.map(item => item.projectId)).size, projects.length);
  const sharedCovers = new Map();
  for (const project of projects) {
    const cover = projectArtwork[project.id];
    assert.match(cover.src, /^assets\/covers\/[a-z0-9-]+\.jpg$/);
    const source = evidence.find(item => item.projectId === project.id);
    assert.ok(source, `Missing provenance for ${project.id}`);
    assert.equal(cover.sourceUrl, source.sourceUrl);
    assert.equal(new URL(cover.sourceUrl).hostname, 'music.apple.com');
    if (source.catalogReleaseDate !== project.date) {
      assert.ok(project.dateSource?.url, `${project.id} needs original-date evidence`);
      assert.ok(project.note, `${project.id} must explain its edition difference`);
      assert.ok(project.sources.some(item => item.url === project.dateSource.url));
    }
    const previous = sharedCovers.get(cover.src);
    if (previous) assert.equal(previous.catalogId, source.catalogId, 'shared artwork must be the same collaborative project');
    sharedCovers.set(cover.src, source);
    const image = await readFile(new URL('../public/' + cover.src, import.meta.url));
    assert.equal(image.readUInt16BE(0), 0xffd8, `${project.id} must be a JPEG`);
    assert.equal(image.readUInt16BE(image.length - 2), 0xffd9);
    assert.equal(createHash('sha256').update(image).digest('hex'), source.sha256);
  }
});
