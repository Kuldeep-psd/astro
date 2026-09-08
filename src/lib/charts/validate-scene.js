import { parseDate } from './radial.js';

/** @typedef {import('./types').RadialScene} RadialScene */

/** @param {unknown} value @param {string} label @returns {asserts value is string} */
function requireText(value, label) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new TypeError(`${label} must be a nonempty string`);
  }
}

/** @param {unknown} source @param {string} label */
function validateSource(source, label) {
  if (!source || typeof source !== 'object' || !('label' in source) || !('url' in source)) {
    throw new TypeError(`${label} must include a source label and HTTPS URL`);
  }
  requireText(source.label, `${label} label`);
  requireText(source.url, `${label} URL`);
  let url;
  try {
    url = new URL(source.url);
  } catch {
    throw new TypeError(`${label} must have a valid HTTPS URL`);
  }
  if (url.protocol !== 'https:' || !url.hostname) {
    throw new TypeError(`${label} must have a valid HTTPS URL`);
  }
}

/**
 * Validate chart data at its boundary. The cutoff is exclusive for releases;
 * an artist anchor may precede the displayed window but cannot reach its end.
 * Activity endpoints may lie outside the window; release dates remain independent.
 * Returns the same scene object without modifying source data.
 * @param {RadialScene} scene
 * @returns {RadialScene}
 */
export function validateScene(scene) {
  if (!scene || typeof scene !== 'object') throw new TypeError('Scene must be an object');
  requireText(scene.id, 'Scene ID');
  requireText(scene.name, 'Scene name');
  if (scene.location) {
    requireText(scene.location.label, 'Scene location label');
    if (scene.location.country !== undefined && !['IN', 'PK'].includes(scene.location.country)) throw new TypeError('Scene location country must be IN or PK');
    const { latitude, longitude } = scene.location;
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      throw new RangeError('Scene location must have valid latitude and longitude');
    }
    validateSource(scene.location.source, 'Scene location source');
  }
  const start = parseDate(scene.start);
  const end = parseDate(scene.end);
  if (start >= end) throw new RangeError('Scene end must be after its start');
  if (!Array.isArray(scene.artists)) throw new TypeError('Scene artists must be an array');
  if (!Array.isArray(scene.projects)) throw new TypeError('Scene projects must be an array');

  /** @type {Map<string, number>} */
  const anchors = new Map();
  for (const artist of scene.artists) {
    if (!artist || typeof artist !== 'object') throw new TypeError('Artist must be an object');
    requireText(artist.id, 'Artist ID');
    requireText(artist.name, `Artist ${artist.id} name`);
    if (anchors.has(artist.id)) throw new RangeError(`Duplicate artist ID: ${artist.id}`);
    if (!artist.anchor || typeof artist.anchor !== 'object') throw new TypeError(`Artist ${artist.id} requires an anchor`);
    const anchor = parseDate(artist.anchor.date);
    if (anchor >= end) throw new RangeError(`Artist ${artist.id} anchor must be before the scene cutoff`);
    if (artist.anchor.precision !== 'day' && artist.anchor.precision !== 'year') {
      throw new TypeError(`Artist ${artist.id} anchor precision must be day or year`);
    }
    if (artist.anchor.precision === 'year' && !artist.anchor.date.endsWith('-01-01')) {
      throw new RangeError(`Artist ${artist.id} year-precision anchor must use January 1`);
    }
    requireText(artist.anchor.label, `Artist ${artist.id} anchor label`);
    validateSource(artist.anchor.source, `Artist ${artist.id} anchor source`);
    if (artist.activityEnd !== undefined) {
      const activityEnd = artist.activityEnd;
      if (!activityEnd || typeof activityEnd !== 'object') {
        throw new TypeError(`Artist ${artist.id} activity end must include a date, label, and source`);
      }
      if (parseDate(activityEnd.date) < anchor) {
        throw new RangeError(`Artist ${artist.id} activity end must not precede its anchor`);
      }
      if (activityEnd.precision !== undefined && activityEnd.precision !== 'day' && activityEnd.precision !== 'year') {
        throw new TypeError(`Artist ${artist.id} activity end precision must be day or year`);
      }
      if (activityEnd.precision === 'year' && !activityEnd.date.endsWith('-12-31')) {
        throw new RangeError(`Artist ${artist.id} year-precision activity end must use December 31`);
      }
      requireText(activityEnd.label, `Artist ${artist.id} activity end label`);
      validateSource(activityEnd.source, `Artist ${artist.id} activity end source`);
    }
    anchors.set(artist.id, anchor);
  }

  const knownTypes = new Set(['album', 'ep', 'mixtape']);
  const projectIds = new Set();
  for (const project of scene.projects) {
    if (!project || typeof project !== 'object') throw new TypeError('Project must be an object');
    requireText(project.id, 'Project ID');
    requireText(project.title, `Project ${project.id} title`);
    requireText(project.artistId, `Project ${project.id} artist ID`);
    if (projectIds.has(project.id)) throw new RangeError(`Duplicate project ID: ${project.id}`);
    projectIds.add(project.id);
    const anchor = anchors.get(project.artistId);
    if (anchor === undefined) throw new RangeError(`Project ${project.id} references unknown artist: ${project.artistId}`);
    if (!knownTypes.has(project.type)) throw new TypeError(`Project ${project.id} has an unknown release type`);
    const date = parseDate(project.date);
    if (date < start || date >= end) throw new RangeError(`Project ${project.id} date must be within the scene window, before its exclusive cutoff`);
    if (date < anchor) throw new RangeError(`Project ${project.id} date must not precede its artist anchor`);
    if (!Array.isArray(project.sources) || project.sources.length === 0) {
      throw new TypeError(`Project ${project.id} requires at least one source`);
    }
    for (const source of project.sources) validateSource(source, `Project ${project.id} source`);
    const dateSource = project.dateSource;
    if (dateSource) {
      validateSource(dateSource, `Project ${project.id} date source`);
      if (!project.sources.some(source => source.url === dateSource.url)) throw new TypeError(`Project ${project.id} date source must be included in its sources`);
    }
  }
  return scene;
}
