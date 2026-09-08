<script lang="ts">
  import { indiaOutline, projectLocation } from '../maps/india-outline';
  import { pakistanOutline, projectPakistanLocation } from '../maps/pakistan-outline';
  import type { SceneLocation } from '../charts/types';

  let { location }: { location: SceneLocation } = $props();
  const isPakistan = $derived(location.country === 'PK');
  const outline = $derived(isPakistan ? pakistanOutline : indiaOutline);
  const point = $derived((isPakistan ? projectPakistanLocation : projectLocation)(location.longitude, location.latitude));
</script>

<svg class="scene-locator" viewBox="0 0 100 110" role="img" aria-label={`${location.label}, ${isPakistan ? 'Pakistan' : 'India'}. Current scene location.`}>
  <path d={outline} class="country" />
  <circle cx={point.x} cy={point.y} r="5.5" class="marker-halo" />
  <circle cx={point.x} cy={point.y} r="3.1" class="marker" />
</svg>

<style>
  .scene-locator { display: block; width: 64px; height: auto; flex: 0 0 auto; }
  .country { fill: #e4e8dc; stroke: #b3beab; stroke-width: 1.1; stroke-linejoin: round; }
  .marker-halo { fill: #fafbf5; }
  .marker { fill: #4b674e; }
  @media (max-width: 600px) { .scene-locator { width: 54px; } }
</style>
