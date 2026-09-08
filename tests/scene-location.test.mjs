import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { validateScene } from '../src/lib/charts/validate-scene.js';

async function loadData(file) {
  const source = await readFile(new URL(file, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { bombayScene } = await loadData('../src/lib/data/bombay.ts');
const { projectLocation } = await loadData('../src/lib/maps/india-outline.ts');

test('the locator places the sourced Mumbai point in western India and responds to new coordinates', () => {
  const { longitude, latitude } = bombayScene.location;
  assert.equal(longitude, 72.8777);
  assert.equal(latitude, 19.076);
  const mumbai = projectLocation(longitude, latitude);
  assert.ok(mumbai.x > 4 && mumbai.x < 30 && mumbai.y > 55 && mumbai.y < 80);
  const delhi = projectLocation(77.209, 28.6139);
  assert.ok(delhi.x > mumbai.x && delhi.y < mumbai.y);
  const chennai = projectLocation(80.2707, 13.08);
  assert.ok(chennai.x > mumbai.x && chennai.y > mumbai.y);
});

test('scene locations require valid coordinates and source evidence when provided', () => {
  for (const change of [location => location.latitude = NaN, location => location.latitude = 91, location => location.longitude = -181, location => location.label = '', location => location.source.url = '']) {
    const scene = structuredClone(bombayScene);
    change(scene.location);
    assert.throws(() => validateScene(scene));
  }
  const unlocated = structuredClone(bombayScene);
  delete unlocated.location;
  assert.equal(validateScene(unlocated), unlocated);
});
