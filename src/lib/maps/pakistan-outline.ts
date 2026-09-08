/** Pakistan outline: Natural Earth 1:110m, ADM0_A3=PAK, public domain.
 * Same source dataset and projection method as india-outline.ts.
 * https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson
 */
export const pakistanOutline = "M96.00 23.04L90.76 28.33L84.72 29.26L76.49 27.73L73.83 30.44L75.75 35.95L77.64 40.21L82.01 43.31L77.39 46.95L77.47 51.43L72.21 57.74L68.81 64.12L63.13 70.72L56.84 70.24L50.86 76.83L54.41 79.66L55.03 84.50L58.07 87.69L59.15 93.08L47.22 93.07L43.60 97.26L39.63 95.67L38.01 91.15L33.82 86.36L23.83 87.55L15.02 87.66L7.38 88.55L9.42 81.24L17.25 77.99L16.80 75.10L14.20 74.08L14.05 68.54L8.87 65.77L6.68 61.98L4.00 58.67L13.09 61.88L18.51 60.94L21.76 61.74L22.85 60.36L26.63 60.91L33.68 58.30L33.87 52.95L36.89 49.39L40.93 49.40L41.52 47.64L45.67 46.82L47.67 47.41L49.79 45.64L49.49 41.86L51.80 38.06L55.25 36.47L53.12 32.31L58.28 32.51L59.77 30.24L59.54 27.83L62.24 25.19L61.62 22.06L60.34 19.39L63.51 16.65L69.33 15.33L75.55 14.60L78.31 13.44L81.47 12.74L85.48 15.67L87.08 20.50L96.00 23.04Z";
const bounds = {"west": 60.874248, "east": 77.837451, "south": 23.691965, "north": 37.133031};
const longitudeFactor = Math.cos((bounds.south + bounds.north) / 2 * Math.PI / 180);
const scale = Math.min(92 / ((bounds.east - bounds.west) * longitudeFactor), 102 / (bounds.north - bounds.south));
const offsetX = (100 - (bounds.east - bounds.west) * longitudeFactor * scale) / 2;
const offsetY = (110 - (bounds.north - bounds.south) * scale) / 2;
export function projectPakistanLocation(longitude: number, latitude: number) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) throw new RangeError('Location must be valid WGS84 coordinates');
  return { x: offsetX + (longitude - bounds.west) * longitudeFactor * scale, y: offsetY + (bounds.north - latitude) * scale };
}
