import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

let server, render, WorldSpreadMap, projectWorldLocation, worldLand;
before(async () => {
  server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' });
  ({ render } = await server.ssrLoadModule('svelte/server'));
  ({ default: WorldSpreadMap } = await server.ssrLoadModule('/src/lib/components/WorldSpreadMap.svelte'));
  ({ projectWorldLocation, worldLand } = await server.ssrLoadModule('/src/lib/maps/world-outline.ts'));
});
after(async () => { await server?.close(); });
const draw = (activeStep, reducedMotion = true) => render(WorldSpreadMap, { props: { activeStep, reducedMotion } }).body;

test('the world projection shares valid point coordinates with the sourced basemap', () => {
  assert.ok(worldLand.length > 170);
  assert.equal(new Set(worldLand.map(country => country.id)).size, worldLand.length);
  assert.ok(!worldLand.some(country => country.id === 'ATA'));
  const newYork = projectWorldLocation(-73.924, 40.847);
  const tokyo = projectWorldLocation(139.6917, 35.6895);
  assert.ok(newYork.x < tokyo.x && newYork.y < tokyo.y);
  for (const [longitude, latitude] of [[-73.924, 40.847], [-122.2712, 37.8044], [75.8573, 30.901], [72.8777, 19.076], [67.0104, 24.8608]]) {
    const point = projectWorldLocation(longitude, latitude);
    assert.ok(point.x > 0 && point.x < 1000 && point.y > 0 && point.y < 500);
  }
  assert.throws(() => projectWorldLocation(NaN, 0), /finite/);
  assert.throws(() => projectWorldLocation(181, 0), /valid/);
});

test('world-map stages reveal connections cumulatively and leave future places absent', () => {
  for (const [step, routes, hubs] of [[0, 0, 1], [1, 3, 4], [2, 5, 6], [3, 8, 10]]) {
    const html = draw(step);
    assert.equal((html.match(/data-connection=/g) ?? []).length, routes);
    assert.equal((html.match(/data-hub=/g) ?? []).length, hubs);
    assert.doesNotMatch(html, /(?:d|cx|cy|x|y|r|transform|viewBox)="[^"]*(?:NaN|Infinity)/);
  }
  assert.doesNotMatch(draw(0), /data-hub="(?:tokyo|mumbai|karachi)"/);
  assert.doesNotMatch(draw(2), /data-hub="(?:mumbai|karachi)"/);
  assert.match(draw(3), />New York<\/text>/);
  assert.match(draw(3), /data-hub="karachi"/);
  for (const destination of ['punjab', 'mumbai', 'karachi']) {
    assert.match(draw(3), new RegExp('data-to="' + destination + '" data-stage="3"'));
  }
});

test('out-of-range and non-finite steps resolve to a valid map chapter', () => {
  for (const [step, expected] of [[-1, 0], [9, 3], [NaN, 0], [Infinity, 0], [1.9, 1]]) {
    assert.match(draw(step), new RegExp(`data-map-step="${expected}"`));
  }
});

test('reduced motion keeps the complete accessible map without animation nodes', () => {
  const still = draw(3, true);
  const animated = draw(3, false);
  assert.equal((still.match(/data-connection=/g) ?? []).length, 8);
  assert.doesNotMatch(still, /<animateMotion/);
  assert.doesNotMatch(animated, /<animateMotion/);
  assert.match(still, /class="[^"]*reduced-motion/);
  assert.match(still, /routes are schematic/);
  assert.match(still, /aria-labelledby=/);
});
