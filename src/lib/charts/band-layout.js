import { dateToAngle } from './radial.js';

/**
 * @typedef {import('./radial.js').TimeScale} TimeScale
 * @typedef {{id: string, date: string, width: number}} ReleaseGlyph
 * @typedef {{id: string, startAngle: number, endAngle: number, centerAngle: number, dateAngle: number}} LaidOutBand
 */

/**
 * Keep every release at its full display width, with clear space between bands.
 * Nearby releases may move along the artist lane; dateAngle retains the actual
 * date while centerAngle describes the clickable glyph. Compute from the full
 * artist catalog so filtering does not reposition the remaining releases.
 *
 * In chronological order, subtracting the packed widths and gaps transforms
 * the spacing constraints into nondecreasing offsets. Pool-adjacent-violators
 * finds the offsets with the smallest total squared movement. Only colliding
 * groups move, and common bounds keep the complete bands inside the timeline.
 * Output order matches the input; equal dates are ordered by stable release ID.
 * @param {ReleaseGlyph[]} releases
 * @param {TimeScale} scale
 * @param {number} [gapDegrees]
 * @returns {LaidOutBand[]}
 */
export function layoutBands(releases, scale, gapDegrees = 1.4) {
  if (typeof gapDegrees !== 'number' || !Number.isFinite(gapDegrees) || gapDegrees < 0) {
    throw new RangeError('Band gap must be a finite nonnegative number');
  }
  // Validate the scale even when this artist has no eligible releases.
  dateToAngle(scale.start, scale);
  const ids = new Set();
  const direction = Math.sign(scale.sweep);
  const sweep = Math.abs(scale.sweep);
  const intervals = releases.map((release, index) => {
    if (typeof release.id !== 'string' || release.id.trim().length === 0) {
      throw new TypeError('Release ID must be a nonempty string');
    }
    if (ids.has(release.id)) throw new RangeError(`Duplicate release ID: ${release.id}`);
    ids.add(release.id);
    if (typeof release.width !== 'number' || !Number.isFinite(release.width) || release.width <= 0 || release.width > 360) {
      throw new RangeError('Marker width must be a finite number greater than zero and at most 360 degrees');
    }
    const dateAngle = dateToAngle(release.date, scale);
    return {
      id: release.id,
      index,
      width: release.width,
      dateAngle,
      position: direction * (dateAngle - scale.startAngle),
      packedOffset: 0,
      desiredOffset: 0,
    };
  });
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a.position - b.position || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  let packedWidth = 0;
  for (const interval of intervals) {
    interval.packedOffset = packedWidth;
    interval.desiredOffset = interval.position - interval.width / 2 - packedWidth;
    packedWidth += interval.width + gapDegrees;
  }
  packedWidth -= gapDegrees;
  if (packedWidth > sweep) {
    throw new RangeError('Release bands and gaps exceed the timeline sweep');
  }
  const slack = sweep - packedWidth;

  /** @type {{first: number, last: number, total: number, count: number}[]} */
  const blocks = [];
  for (let index = 0; index < intervals.length; index += 1) {
    blocks.push({ first: index, last: index, total: intervals[index].desiredOffset, count: 1 });
    while (blocks.length > 1) {
      const right = blocks[blocks.length - 1];
      const left = blocks[blocks.length - 2];
      if (left.total / left.count <= right.total / right.count) break;
      left.last = right.last;
      left.total += right.total;
      left.count += right.count;
      blocks.pop();
    }
  }

  /** @type {LaidOutBand[]} */
  const output = new Array(releases.length);
  for (const block of blocks) {
    const offset = Math.max(0, Math.min(slack, block.total / block.count));
    for (let index = block.first; index <= block.last; index += 1) {
      const interval = intervals[index];
      const from = interval.packedOffset + offset;
      output[interval.index] = {
        id: interval.id,
        startAngle: scale.startAngle + direction * from,
        endAngle: scale.startAngle + direction * (from + interval.width),
        centerAngle: scale.startAngle + direction * (from + interval.width / 2),
        dateAngle: interval.dateAngle,
      };
    }
  }
  return output;
}
