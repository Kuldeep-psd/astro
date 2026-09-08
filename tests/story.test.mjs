import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { storyStepAt, storyViewport } from '../src/lib/charts/story-progress.js';

let server, render, App, chapters, storySources;
before(async () => {
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
  ({ render } = await server.ssrLoadModule('svelte/server'));
  ({ default: App } = await server.ssrLoadModule('/src/App.svelte'));
  ({ chapters, storySources } = await server.ssrLoadModule('/src/lib/data/story.ts'));
});
after(async () => { await server?.close(); });

test('the story leads into one complete dashboard without old infographic images', () => {
  const html = render(App).body;
  assert.equal((html.match(/id="scenes"/g) ?? []).length, 1);
  assert.ok(html.indexOf('id="story"') < html.indexOf('id="scenes"'));
  assert.ok(html.indexOf('id="south-asia"') < html.indexOf('id="scenes"'));
  assert.doesNotMatch(html, /(?:src|href)="[^" ]*assets\/(?:city[123]\.jpg|india\.jpg|world\.(?:jpg|png)|Graph\.jpg)/);
  assert.match(html, /29 artists\. 111 sourced releases/);
  assert.match(html, /data-release-id="divine-kohinoor"/);
  assert.match(html, /aria-label="Filter releases by artist"/);
  const story = html.slice(html.indexOf('id="story"'), html.indexOf('id="scenes"'));
  assert.doesNotMatch(story, /evidence-link|href="https:/);
  assert.ok(html.indexOf('id="sources"') > html.indexOf('id="scenes"'));
  for (const source of storySources) assert.ok(html.includes('href="' + source.url.replaceAll('&', '&amp;') + '"'));
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(target), 'Missing link target: ' + target);
});

test('all four chapters remain readable before scroll scripts run and retain their sources', () => {
  const html = render(App).body;
  assert.equal(chapters.length, 4);
  assert.equal((html.match(/data-story-step=/g) ?? []).length, 4);
  const sources = new Map(storySources.map(source => [source.id, source]));
  for (const chapter of chapters) {
    assert.ok(html.includes(chapter.title));
    assert.ok(html.includes(chapter.copy));
    assert.ok(html.includes(chapter.detail));
    assert.ok((chapter.copy + ' ' + chapter.detail).split(/\s+/).length < 75);
    for (const id of chapter.sourceIds) assert.equal(new URL(sources.get(id).url).protocol, 'https:');
  }
});

test('scroll progression advances, reverses and clamps naturally without intercepting scroll', () => {
  assert.equal(storyStepAt([100, 500, 900, 1300], 50), 0);
  assert.equal(storyStepAt([100, 500, 900, 1300], 500), 1);
  assert.equal(storyStepAt([-900, -500, -100, 300], 500), 3);
  assert.equal(storyStepAt([-400, 0, 400, 800], 500), 2);
  assert.equal(storyStepAt([-100, 300, 700, 1100], 500), 1);
  assert.equal(storyStepAt([-1300, -900, -500, -100], 500), 3);
  assert.equal(storyStepAt([], 500), 0);
});

test('progress anchors activate the requested chapter on portrait and short landscape screens', () => {
  for (const viewport of [
    { width: 320, height: 568, mapHeight: 260, stickyTop: 0, scrollPadding: 12 },
    { width: 390, height: 844, mapHeight: 295, stickyTop: 0, scrollPadding: 12 },
    { width: 740, height: 400, mapHeight: 378, stickyTop: 7, scrollPadding: 12 },
    { width: 1440, height: 900, mapHeight: 866, stickyTop: 12, scrollPadding: 12 },
  ]) {
    const { readingLine, anchorMargin } = storyViewport(viewport);
    const anchoredTop = viewport.scrollPadding + anchorMargin;
    assert.ok(anchoredTop < readingLine);
    assert.equal(storyStepAt([anchoredTop - 500, anchoredTop, anchoredTop + 500], readingLine), 1);
    assert.ok(readingLine < viewport.height);
  }
});
