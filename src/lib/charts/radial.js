/**
 * Radial timeline geometry. Angles use SVG coordinates: zero is three o'clock,
 * and positive angles turn clockwise. Dates are UTC to avoid timezone drift.
 *
 * @typedef {string | number} DateInput ISO YYYY-MM-DD or UTC epoch milliseconds.
 * @typedef {{start: number, end: number, startAngle: number, sweep: number}} TimeScale
 */

/** @param {unknown} value @param {string} name @returns {asserts value is number} */
function finiteNumber(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number`);
  }
}

/** Parse a real Gregorian date without JavaScript's rollover behavior.
 * @param {string} isoDate @returns {number} UTC epoch milliseconds.
 */
export function parseDate(isoDate) {
  if (typeof isoDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw new TypeError('Date must use YYYY-MM-DD format');
  }
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(0);
  // setUTCFullYear preserves years 0000–0099, unlike Date.UTC.
  date.setUTCFullYear(year, month - 1, day);
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new RangeError(`Invalid calendar date: ${isoDate}`);
  }
  return date.getTime();
}

/** @param {DateInput} date @returns {number} */
function epoch(date) {
  if (typeof date === 'string') return parseDate(date);
  finiteNumber(date, 'Date');
  if (!Number.isFinite(new Date(date).getTime())) throw new RangeError('Date is outside the supported calendar range');
  return date;
}

/** @param {number} sweep @param {boolean} [allowZero] */
function validateSweep(sweep, allowZero = true) {
  finiteNumber(sweep, 'Sweep');
  if (Math.abs(sweep) > 360 || (!allowZero && sweep === 0)) {
    throw new RangeError(`Sweep must ${allowZero ? '' : 'be nonzero and '}span at most 360 degrees`);
  }
}

/** Create a continuous scale using elapsed UTC time, including leap days.
 * @param {{start: DateInput, end: DateInput, startAngle?: number, sweep?: number}} options
 * @returns {TimeScale}
 */
export function createTimeScale({ start, end, startAngle = -36, sweep = -324 }) {
  const first = epoch(start);
  const last = epoch(end);
  finiteNumber(startAngle, 'Start angle');
  validateSweep(sweep, false);
  if (last <= first) throw new RangeError('Timeline end must be after its start');
  return { start: first, end: last, startAngle, sweep };
}

/** @param {TimeScale} scale */
function validateScale(scale) {
  finiteNumber(scale.start, 'Timeline start');
  finiteNumber(scale.end, 'Timeline end');
  finiteNumber(scale.startAngle, 'Start angle');
  validateSweep(scale.sweep, false);
  if (scale.end <= scale.start) throw new RangeError('Timeline end must be after its start');
}

/** Map a date onto the scale; both domain endpoints are inclusive.
 * @param {DateInput} date @param {TimeScale} scale @returns {number}
 */
export function dateToAngle(date, scale) {
  validateScale(scale);
  const time = epoch(date);
  if (time < scale.start || time > scale.end) throw new RangeError('Date is outside the timeline domain');
  return scale.startAngle + ((time - scale.start) / (scale.end - scale.start)) * scale.sweep;
}

/** Artist activity is independent of release dates, including posthumous releases.
 * Clip the documented span to this scene without extending it to fit glyphs.
 * @param {import('./types').Artist} artist @param {TimeScale} scale
 * @returns {{startAngle: number, endAngle: number}}
 */
export function artistTrackAngles(artist, scale) {
  const clamp = (/** @type {number} */ date) => Math.max(scale.start, Math.min(scale.end, date));
  return {
    startAngle: dateToAngle(clamp(parseDate(artist.anchor.date)), scale),
    endAngle: dateToAngle(clamp(artist.activityEnd ? parseDate(artist.activityEnd.date) : scale.end), scale),
  };
}

/** @param {number} cx @param {number} cy @param {number} radius @param {number} angle */
export function polarPoint(cx, cy, radius, angle) {
  finiteNumber(cx, 'Center x');
  finiteNumber(cy, 'Center y');
  finiteNumber(radius, 'Radius');
  finiteNumber(angle, 'Angle');
  if (radius < 0) throw new RangeError('Radius must be nonnegative');
  const radians = (angle * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

/** Avoid tiny scientific-notation coordinates at quadrants.
 * @param {number} value @returns {string}
 */
function coordinate(value) {
  return String(Number(value.toFixed(6)));
}

/** @param {{x: number, y: number}} point */
function pointText(point) {
  return `${coordinate(point.x)} ${coordinate(point.y)}`;
}

/** SVG needs two arcs for a full circle.
 * @param {number} cx @param {number} cy @param {number} radius
 * @param {number} startAngle @param {number} endAngle
 */
function arcCommands(cx, cy, radius, startAngle, endAngle) {
  const delta = endAngle - startAngle;
  const stops = Math.abs(delta) === 360 ? [startAngle + delta / 2, endAngle] : [endAngle];
  let current = startAngle;
  return stops.map((stop) => {
    const span = stop - current;
    current = stop;
    return `A ${coordinate(radius)} ${coordinate(radius)} 0 ${Math.abs(span) > 180 ? 1 : 0} ${span > 0 ? 1 : 0} ${pointText(polarPoint(cx, cy, radius, stop))}`;
  }).join(' ');
}

/** Draw a closed band, or a pie sector when innerRadius is zero.
 * @param {number} cx @param {number} cy @param {number} innerRadius @param {number} outerRadius
 * @param {number} startAngle @param {number} endAngle @returns {string}
 */
export function annularSector(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
  finiteNumber(innerRadius, 'Inner radius');
  finiteNumber(outerRadius, 'Outer radius');
  finiteNumber(startAngle, 'Start angle');
  finiteNumber(endAngle, 'End angle');
  if (innerRadius < 0 || outerRadius <= innerRadius) throw new RangeError('Radii must satisfy 0 ≤ inner < outer');
  validateSweep(endAngle - startAngle);
  const first = polarPoint(cx, cy, outerRadius, startAngle);
  if (endAngle === startAngle) return '';
  const outer = `M ${pointText(first)} ${arcCommands(cx, cy, outerRadius, startAngle, endAngle)}`;
  if (innerRadius === 0) return `${outer} L ${pointText({ x: cx, y: cy })} Z`;
  return `${outer} L ${pointText(polarPoint(cx, cy, innerRadius, endAngle))} ${arcCommands(cx, cy, innerRadius, endAngle, startAngle)} Z`;
}

/** Draw an open circular arc for a guide or curved text baseline.
 * @param {number} cx @param {number} cy @param {number} radius
 * @param {number} startAngle @param {number} endAngle @returns {string}
 */
export function arcLine(cx, cy, radius, startAngle, endAngle) {
  finiteNumber(radius, 'Radius');
  finiteNumber(startAngle, 'Start angle');
  finiteNumber(endAngle, 'End angle');
  if (radius <= 0) throw new RangeError('Arc radius must be positive');
  validateSweep(endAngle - startAngle);
  const first = polarPoint(cx, cy, radius, startAngle);
  if (startAngle === endAngle) return '';
  return `M ${pointText(first)} ${arcCommands(cx, cy, radius, startAngle, endAngle)}`;
}

/**
 * A release is a point in time, not a duration. Its display band is centered on
 * that date and clipped at the domain edges without moving the event center.
 * The returned start/end follow the direction of the timeline.
 * @param {DateInput} date @param {TimeScale} scale @param {number} [widthDegrees]
 * @returns {{startAngle: number, endAngle: number, centerAngle: number}}
 */
export function releaseMarkerAngles(date, scale, widthDegrees = 3.6) {
  finiteNumber(widthDegrees, 'Marker width');
  if (widthDegrees <= 0 || widthDegrees > 360) throw new RangeError('Marker width must be greater than zero and at most 360 degrees');
  const centerAngle = dateToAngle(date, scale);
  const direction = Math.sign(scale.sweep);
  const position = direction * (centerAngle - scale.startAngle);
  const first = Math.max(0, position - widthDegrees / 2);
  const last = Math.min(Math.abs(scale.sweep), position + widthDegrees / 2);
  return {
    startAngle: scale.startAngle + direction * first,
    endAngle: scale.startAngle + direction * last,
    centerAngle,
  };
}
