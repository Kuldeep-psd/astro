/**
 * India silhouette from Natural Earth 1:110m admin-0 countries, ADM0_A3=IND.
 * Source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson
 * License: public domain, https://www.naturalearthdata.com/about/terms-of-use/
 * Source file SHA-256: 6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f
 * The source's already-generalized exterior ring is retained (135 vertices),
 * projected below and rounded to 0.01 SVG units. This scale includes no islands.
 * No internal borders, hand-traced coordinates, or additional simplification.
 */
export const indiaOutlineSource = {
  dataset: 'Natural Earth 1:110m admin-0 countries',
  feature: 'ADM0_A3=IND',
  url: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
  license: 'Public domain',
  licenseUrl: 'https://www.naturalearthdata.com/about/terms-of-use/',
  sha256: '6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f',
} as const;

export const indiaOutlineViewBox = '0 0 100 110';
export const indiaOutline = 'M95.76 32.87L96 34.15L94.9 34.77L95.15 36.86L92.91 36.24L88.83 38.59L88.93 40.53L87.19 43.37L87.03 45.02L85.63 47.81L83.16 47.04L83.04 50.55L82.33 51.7L82.66 53.14L81.11 53.94L79.45 48.57L78.58 48.58L78.07 50.75L76.35 48.99L77.32 47.06L78.73 46.86L80.18 44L78.36 43.42L75.44 43.47L72.45 43L72.17 40.65L70.67 40.48L68.17 39.02L67.06 41.32L69.33 43.11L67.37 44.37L66.67 45.61L68.61 46.51L68.07 48.56L69.16 51.11L69.65 53.9L69.2 55.13L67.06 55.09L63.18 55.79L63.36 58.34L61.68 60.35L57.15 62.63L53.62 66.62L51.26 68.75L48.12 70.97L48.12 72.53L46.55 73.37L43.71 74.58L42.24 74.76L41.3 77.34L41.95 81.75L42.12 84.56L40.79 87.78L40.77 93.54L39.14 93.7L37.71 96.29L38.67 97.4L35.8 98.36L34.74 100.67L33.47 101.64L30.49 98.48L29.04 93.73L27.83 90.32L26.73 88.71L25.05 85.46L24.27 81.22L23.73 79.1L20.86 74.45L19.56 67.88L18.62 63.54L18.63 59.44L18.02 56.27L13.44 58.29L11.22 57.89L7.11 53.78L8.62 52.56L7.69 51.23L4 48.35L6.1 46.09L13.02 46.1L12.4 43.19L10.63 41.47L10.27 38.86L8.21 37.34L11.68 33.79L15.34 34.05L18.63 30.49L20.6 27.05L23.66 23.65L23.61 21.24L26.29 19.28L23.75 17.61L22.66 15.31L21.54 12.34L23.09 10.88L27.86 11.71L31.37 11.21L34.41 8.36L37.79 12.33L37.48 15.09L38.73 16.83L38.63 18.56L36.37 18.1L37.25 21.84L40.34 23.98L44.72 26.35L42.72 27.89L41.5 31.06L44.55 32.34L47.51 34L51.62 35.91L55.94 36.34L57.75 38.07L60.18 38.39L63.97 39.18L66.59 39.12L66.95 37.78L66.54 35.63L66.78 34.17L68.7 33.46L68.96 36.13L69.03 36.81L71.89 38.09L73.87 37.56L76.53 37.79L79.1 37.69L79.32 35.61L78.04 34.53L80.58 34.1L83.44 31.58L87.07 29.42L89.71 30.26L91.96 28.83L93.43 30.94L92.37 32.36Z';

const bounds = { west: 68.176645, south: 7.965535, east: 97.402561, north: 35.49401 } as const;
const width = 100, height = 110, padding = 4;
const standardParallel = (bounds.south + bounds.north) / 2;
const longitudeFactor = Math.cos(standardParallel * Math.PI / 180);
const scale = Math.min(
  (width - 2 * padding) / ((bounds.east - bounds.west) * longitudeFactor),
  (height - 2 * padding) / (bounds.north - bounds.south),
);
const offsetX = (width - (bounds.east - bounds.west) * longitudeFactor * scale) / 2;
const offsetY = (height - (bounds.north - bounds.south) * scale) / 2;

/**
 * Project WGS84 degrees onto the silhouette's exact equirectangular projection.
 * Longitude scales by cos(midpoint latitude); north maps upward. Locations
 * outside the feature bounds are intentionally not clamped to the map edge.
 * @param longitude Longitude in degrees east, between -180 and 180.
 * @param latitude Latitude in degrees north, between -90 and 90.
 * @returns SVG coordinates within the exported viewBox for locations in India.
 */
export function projectLocation(longitude: number, latitude: number): { x: number; y: number } {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    throw new TypeError('Location coordinates must be finite numbers');
  }
  if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
    throw new RangeError('Location coordinates must be valid longitude and latitude');
  }
  return {
    x: offsetX + (longitude - bounds.west) * longitudeFactor * scale,
    y: offsetY + (bounds.north - latitude) * scale,
  };
}
