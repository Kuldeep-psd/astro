import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { validateScene } from '../src/lib/charts/validate-scene.js';

// Canonical scene files import only types; transpile them without build artifacts.
async function loadScene(name) {
  const source = await readFile(new URL(`../src/lib/data/${name}.ts`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const [{ bombayScene }, { punjabiScene }] = await Promise.all([loadScene('bombay'), loadScene('punjabi')]);
const freshScene = () => structuredClone(bombayScene);

function rejectsChange(change, expected) {
  const scene = freshScene();
  change(scene);
  assert.throws(() => validateScene(scene), expected);
}

test('canonical Bombay catalog validates with 23 sourced releases: 10 albums and 13 EPs', () => {
  const original = structuredClone(bombayScene);
  assert.equal(validateScene(bombayScene), bombayScene);
  assert.deepEqual(bombayScene, original);
  assert.equal(bombayScene.artists.length, 5);
  assert.equal(bombayScene.projects.length, 23);
  assert.equal(bombayScene.projects.filter(p => p.type === 'album').length, 10);
  assert.equal(bombayScene.projects.filter(p => p.type === 'ep').length, 13);
});

test('catalog corrections stay distinct from titles and the original bitmap colors', () => {
  const byId = Object.fromEntries(bombayScene.projects.map(p => [p.id, p]));
  assert.equal(byId['naezy-2014'].title, '2014');
  assert.equal(byId['naezy-2014'].date, '2020-06-30');
  assert.equal(byId['divine-street-dreams'].type, 'album');
  assert.equal(byId['siege-slightly-better-days'].type, 'ep');
  assert.equal(byId['siege-slightly-better-days'].sources.length, 2);
});

test('scene date range must use valid dates and increase', () => {
  rejectsChange(scene => { scene.start = '2013-02-29'; }, /Invalid calendar date/);
  rejectsChange(scene => { scene.end = '2025-1-01'; }, /YYYY-MM-DD/);
  rejectsChange(scene => { scene.end = scene.start; }, /end must be after/);
  rejectsChange(scene => { scene.end = '2012-01-01'; }, /end must be after/);
});

test('scene, artist, and project identity and display fields must be nonempty', () => {
  for (const change of [
    scene => { scene.id = ''; },
    scene => { scene.name = '   '; },
    scene => { scene.artists[0].id = ''; },
    scene => { scene.artists[0].name = '\n'; },
    scene => { scene.projects[0].id = null; },
    scene => { scene.projects[0].title = ''; },
    scene => { scene.projects[0].artistId = ' '; },
    scene => { scene.artists[0].anchor.label = ''; },
  ]) rejectsChange(change, /nonempty string/);
});

test('artist and project IDs must each be unique', () => {
  rejectsChange(scene => { scene.artists.push(structuredClone(scene.artists[0])); }, /Duplicate artist ID/);
  rejectsChange(scene => { scene.projects.push(structuredClone(scene.projects[0])); }, /Duplicate project ID/);
});

test('release references and classifications must be recognized', () => {
  rejectsChange(scene => { scene.projects[0].artistId = 'missing-artist'; }, /unknown artist/);
  rejectsChange(scene => { scene.projects[0].type = 'single'; }, /unknown release type/);
  const scene = freshScene();
  scene.projects[0].type = 'mixtape';
  assert.equal(validateScene(scene), scene);
});

test('release range includes the start and excludes the cutoff', () => {
  const scene = freshScene();
  scene.artists[0].anchor.date = '2012-01-01';
  scene.projects[0].date = scene.start;
  scene.projects[1].date = '2024-12-31';
  assert.equal(validateScene(scene), scene);
  rejectsChange(data => { data.projects[0].date = data.end; }, /exclusive cutoff/);
  rejectsChange(data => { data.projects[0].date = '2026-01-01'; }, /exclusive cutoff/);
  rejectsChange(data => { data.projects[0].date = '2012-12-31'; }, /scene window/);
  rejectsChange(data => { data.projects[0].date = '2024-02-30'; }, /Invalid calendar date/);
});

test('anchors may precede the window but must be strictly before its end', () => {
  const scene = freshScene();
  scene.artists[0].anchor.date = '2010-05-12';
  assert.equal(validateScene(scene), scene);
  rejectsChange(data => { data.artists[0].anchor.date = data.end; }, /anchor must be before/);
  rejectsChange(data => { data.artists[0].anchor.date = '2026-01-01'; }, /anchor must be before/);
  rejectsChange(data => { data.artists[0].anchor.date = '2013-04-31'; }, /Invalid calendar date/);
});

test('year-only anchors use January 1 and constrain releases with that lower bound', () => {
  const scene = freshScene();
  scene.artists[0].anchor.date = '2019-01-01';
  scene.artists[0].anchor.precision = 'year';
  scene.projects[0].date = '2019-01-01';
  assert.equal(validateScene(scene), scene);
  scene.projects[0].date = '2018-12-31';
  assert.throws(() => validateScene(scene), /precede its artist anchor/);
  rejectsChange(data => { data.artists[0].anchor.precision = 'year'; }, /must use January 1/);
  rejectsChange(data => { data.artists[0].anchor.precision = 'month'; }, /precision must be day or year/);
});

test('day-precision releases can equal an anchor but cannot predate it', () => {
  const scene = freshScene();
  scene.projects[0].date = scene.artists[0].anchor.date;
  assert.equal(validateScene(scene), scene);
  scene.projects[0].date = '2013-03-20';
  assert.throws(() => validateScene(scene), /precede its artist anchor/);
});

test('every anchor and every project must retain labeled HTTPS evidence', () => {
  rejectsChange(scene => { scene.projects[0].sources = []; }, /at least one source/);
  rejectsChange(scene => { scene.projects[0].sources = null; }, /at least one source/);
  rejectsChange(scene => { scene.artists[0].anchor.source = null; }, /source label and HTTPS URL/);
  rejectsChange(scene => { scene.projects[0].sources[0].label = ' '; }, /nonempty string/);
  rejectsChange(scene => { scene.artists[0].anchor.source.label = ''; }, /nonempty string/);
  for (const url of ['http://example.com/source', 'javascript:alert(1)', '/relative-source', 'https://', 'not a url']) {
    rejectsChange(scene => { scene.projects[0].sources[0].url = url; }, /HTTPS URL/);
    rejectsChange(scene => { scene.artists[0].anchor.source.url = url; }, /HTTPS URL/);
  }
  rejectsChange(scene => { scene.projects[0].sources.push({ label: 'Additional source', url: 'http://example.com' }); }, /HTTPS URL/);
});

test('malformed collections are rejected while an empty project selection is valid', () => {
  rejectsChange(scene => { scene.artists = null; }, /artists must be an array/);
  rejectsChange(scene => { scene.projects = {}; }, /projects must be an array/);
  rejectsChange(scene => { scene.artists[0] = null; }, /Artist must be an object/);
  rejectsChange(scene => { scene.projects[0] = null; }, /Project must be an object/);
  const scene = freshScene();
  scene.projects = [];
  assert.equal(validateScene(scene), scene);
});


test('Sidhu’s activity ends on his sourced death date without changing project dates', () => {
  const original = structuredClone(punjabiScene);
  assert.equal(validateScene(punjabiScene), punjabiScene);
  assert.deepEqual(punjabiScene, original);
  const sidhu = punjabiScene.artists.find(artist => artist.id === 'sidhu');
  assert.equal(sidhu.activityEnd.date, '2022-05-29');
  assert.equal(sidhu.activityEnd.label, 'Died 29 May 2022');
  assert.equal(sidhu.activityEnd.source.url, 'https://indianexpress.com/article/cities/amritsar/punjabi-singer-congress-leader-sidhu-moose-wala-shot-dead-7942590/');
  assert.deepEqual(punjabiScene.projects.filter(project => project.artistId === 'sidhu').map(project => [project.id, project.date]), [
    ['sidhu-pbx-1', '2018-10-18'],
    ['sidhu-snitches-get-stitches', '2020-05-09'],
    ['sidhu-moosetape', '2021-05-15'],
    ['sidhu-no-name', '2022-04-25'],
  ]);
});

const activityEnd = date => ({
  date,
  label: 'Documented activity endpoint',
  source: { label: 'Activity record', url: 'https://example.com/artist-history' },
});

test('activity endpoints require a real date at or after the artist anchor', () => {
  rejectsChange(scene => { scene.artists[0].activityEnd = activityEnd('2022-02-30'); }, /Invalid calendar date/);
  rejectsChange(scene => { scene.artists[0].activityEnd = activityEnd('2022-5-29'); }, /YYYY-MM-DD/);
  rejectsChange(scene => { scene.artists[0].activityEnd = activityEnd('2000-01-01'); }, /activity end must not precede its anchor/);
  const scene = freshScene();
  scene.artists[0].activityEnd = activityEnd(scene.artists[0].anchor.date);
  assert.equal(validateScene(scene), scene);
});

test('activity endpoints may be outside the scene window and do not constrain posthumous releases', () => {
  const scene = freshScene();
  scene.artists[0].anchor.date = '2010-01-01';
  scene.artists[0].activityEnd = activityEnd('2012-01-01');
  assert.ok(scene.projects.some(project => project.artistId === scene.artists[0].id && project.date > scene.artists[0].activityEnd.date));
  assert.equal(validateScene(scene), scene);
  scene.artists[0].activityEnd.date = '2026-01-01';
  assert.equal(validateScene(scene), scene);
});

test('every activity endpoint must retain a nonempty label and labeled HTTPS evidence', () => {
  for (const malformed of [null, false, '2022-05-29']) {
    rejectsChange(scene => { scene.artists[0].activityEnd = malformed; }, /activity end must include/);
  }
  for (const change of [
    end => { end.label = ' '; },
    end => { end.source.label = ''; },
  ]) {
    rejectsChange(scene => {
      scene.artists[0].activityEnd = activityEnd('2022-05-29');
      change(scene.artists[0].activityEnd);
    }, /nonempty string/);
  }
  rejectsChange(scene => { scene.artists[0].activityEnd = { ...activityEnd('2022-05-29'), source: null }; }, /source label and HTTPS URL/);
  for (const url of ['http://example.com', 'javascript:alert(1)', '/relative', 'https://']) {
    rejectsChange(scene => {
      scene.artists[0].activityEnd = activityEnd('2022-05-29');
      scene.artists[0].activityEnd.source.url = url;
    }, /HTTPS URL/);
  }
});


test('year-only activity endpoints use the end of the year without claiming an exact day', () => {
  const scene = freshScene();
  scene.artists[0].activityEnd = { ...activityEnd('2016-12-31'), precision: 'year' };
  assert.equal(validateScene(scene), scene);
  rejectsChange(data => { data.artists[0].activityEnd = { ...activityEnd('2016-01-01'), precision: 'year' }; }, /must use December 31/);
  rejectsChange(data => { data.artists[0].activityEnd = { ...activityEnd('2016-12-31'), precision: 'month' }; }, /precision must be day or year/);
});
