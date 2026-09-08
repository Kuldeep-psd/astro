<script lang="ts">
  import { projectWorldLocation, worldLand, worldViewBox } from '../maps/world-outline';

  let { activeStep = 0, reducedMotion = false }: { activeStep?: number; reducedMotion?: boolean } = $props();
  const uid = $props.id();
  const step = $derived(Number.isFinite(activeStep) ? Math.max(0, Math.min(3, Math.floor(activeStep))) : 0);

  // WGS84 longitude/latitude. The Bronx point is near 1520 Sedgwick Avenue;
  // later hubs are representative city centres. Punjab is a regional marker
  // near Ludhiana. These markers are not artist birthplaces.
  const hubs = [
    { id: 'bronx', name: 'The Bronx', longitude: -73.924, latitude: 40.847, step: 0, dx: 0, dy: 31, anchor: 'middle' },
    { id: 'london', name: 'London', longitude: -0.1276, latitude: 51.5072, step: 1, dx: -15, dy: -20, anchor: 'end' },
    { id: 'paris', name: 'Paris', longitude: 2.3522, latitude: 48.8566, step: 1, dx: -7, dy: 34, anchor: 'middle' },
    { id: 'tokyo', name: 'Tokyo', longitude: 139.6917, latitude: 35.6895, step: 1, dx: 15, dy: 11, anchor: 'start' },
    { id: 'heidelberg', name: 'Heidelberg', longitude: 8.6724, latitude: 49.3988, step: 2, dx: 16, dy: 29, anchor: 'start' },
    { id: 'seoul', name: 'Seoul', longitude: 126.978, latitude: 37.5665, step: 2, dx: -12, dy: -21, anchor: 'end' },
    { id: 'oakland', name: 'California', longitude: -122.2712, latitude: 37.8044, step: 3, dx: -5, dy: 31, anchor: 'middle' },
    { id: 'punjab', name: 'Punjab', longitude: 75.8573, latitude: 30.901, step: 3, dx: 14, dy: -18, anchor: 'start' },
    { id: 'mumbai', name: 'Bombay', longitude: 72.8777, latitude: 19.076, step: 3, dx: 16, dy: 34, anchor: 'start' },
    { id: 'karachi', name: 'Karachi', longitude: 67.0104, latitude: 24.8608, step: 3, dx: -17, dy: 30, anchor: 'end' },
  ].map(hub => ({ ...hub, ...projectWorldLocation(hub.longitude, hub.latitude) }));

  const hubById = new Map(hubs.map(hub => [hub.id, hub]));

  // Curves show selected cultural connections, not migration trajectories or
  // an exhaustive, one-way family tree. South Asian destinations have separate
  // arrows: the diaspora link, the New York/Mumbai label link, and a schematic
  // connection from hip-hop’s New York roots to the Karachi scene. The last
  // arrow does not claim a documented direct journey or artist collaboration.
  const connections = [
    { id: 'new-york-london', from: 'bronx', to: 'london', step: 1, lift: 65, delay: 0 },
    { id: 'new-york-tokyo', from: 'bronx', to: 'tokyo', step: 1, lift: 164, delay: 240 },
    { id: 'new-york-paris', from: 'bronx', to: 'paris', step: 1, lift: 29, delay: 480 },
    { id: 'new-york-heidelberg', from: 'bronx', to: 'heidelberg', step: 2, lift: 93, delay: 0 },
    { id: 'new-york-seoul', from: 'bronx', to: 'seoul', step: 2, lift: 119, delay: 260 },
    { id: 'california-punjab', from: 'oakland', to: 'punjab', step: 3, lift: 210, delay: 0 },
    { id: 'new-york-mumbai', from: 'bronx', to: 'mumbai', step: 3, lift: 75, delay: 320 },
    { id: 'new-york-karachi', from: 'bronx', to: 'karachi', step: 3, lift: 145, delay: 640 },
  ].map(connection => {
    const from = hubById.get(connection.from)!;
    const to = hubById.get(connection.to)!;
    const cx = (from.x + to.x) / 2;
    const cy = Math.min(from.y, to.y) - connection.lift;
    const startLength = Math.hypot(cx - from.x, cy - from.y);
    const endLength = Math.hypot(to.x - cx, to.y - cy);
    const start = { x: from.x + (cx - from.x) * 8 / startLength, y: from.y + (cy - from.y) * 8 / startLength };
    const end = { x: to.x - (to.x - cx) * 9 / endLength, y: to.y - (to.y - cy) * 9 / endLength };
    const format = (number: number) => number.toFixed(1);
    return { ...connection, path: `M${format(start.x)} ${format(start.y)} Q${format(cx)} ${format(cy)} ${format(end.x)} ${format(end.y)}` };
  });

  const descriptions = [
    'Hip-hop takes shape in the Bronx. The origin marker sits in New York City.',
    'Selected connections from New York to London, Paris and Tokyo during the 1980s, as records, film and performance carried hip-hop across borders.',
    'Heidelberg and Seoul join the map in 1992, illustrating how artists adapted rap to local languages and experiences. Earlier connections remain visible.',
    'Three arrows connect the South Asian scenes: California to Punjab, New York to Bombay, and a schematic link from hip-hop’s New York roots to Karachi. The Karachi arrow represents the wider cultural connection, not a documented direct journey. Earlier global connections remain visible.',
  ];
</script>

{#snippet route(connection: (typeof connections)[number])}
  <g class="connection" class:current={connection.step === step} data-connection={connection.id} data-from={connection.from} data-to={connection.to} data-stage={connection.step} style={`--route-delay: ${connection.delay}ms`} aria-hidden="true">
    <path
      d={connection.path}
      class="route-line"
      pathLength="1"
      marker-end={`url(#${uid}-arrow-${connection.step === step ? 'current' : 'past'})`}
    />
  </g>
{/snippet}

<figure class="spread-map" class:reduced-motion={reducedMotion} data-map-step={step}>
  <svg viewBox={worldViewBox} role="img" aria-labelledby={`${uid}-title ${uid}-description`}>
    <title id={`${uid}-title`}>Hip-hop across borders</title>
    <desc id={`${uid}-description`}>{descriptions[step]} Selected connections; all routes are schematic.</desc>
    <defs>
      <marker id={`${uid}-arrow-current`} markerWidth="5" markerHeight="5" refX="4.2" refY="2.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0 .4L4.5 2.5L0 4.6" class="arrow-current" />
      </marker>
      <marker id={`${uid}-arrow-past`} markerWidth="4.5" markerHeight="4.5" refX="4.1" refY="2.25" orient="auto" markerUnits="strokeWidth">
        <path d="M0 .4L4.3 2.25L0 4.1" class="arrow-past" />
      </marker>
      <radialGradient id={`${uid}-origin-glow`}>
        <stop offset="0" stop-color="var(--map-accent, #eeff95)" stop-opacity=".1" />
        <stop offset="1" stop-color="var(--map-accent, #eeff95)" stop-opacity="0" />
      </radialGradient>
    </defs>

    <g class="land" aria-hidden="true">
      {#each worldLand as country (country.id)}
        <path d={country.path} fill-rule="evenodd" />
      {/each}
    </g>

    {#each connections.filter(connection => connection.step < step) as connection (connection.id)}
      {@render route(connection)}
    {/each}

    {#each hubs.filter(hub => hub.step <= step) as hub (hub.id)}
      {@const current = hub.step === step}
      <g class="hub" class:current class:origin={hub.id === 'bronx'} data-hub={hub.id}>
        {#if current}
          <circle cx={hub.x} cy={hub.y} r="55" fill={`url(#${uid}-origin-glow)`} aria-hidden="true" />
          <circle cx={hub.x} cy={hub.y} r="10" class="hub-halo" aria-hidden="true" />
        {/if}
        <circle cx={hub.x} cy={hub.y} r={current || hub.id === 'bronx' ? 4.5 : 2.8} class="hub-dot" />
      </g>
    {/each}

    {#each connections.filter(connection => connection.step === step) as connection (connection.id)}
      {@render route(connection)}
    {/each}

    {#each hubs.filter(hub => hub.step === step || hub.id === 'bronx') as hub (hub.id)}
      <g class="hub-label" class:origin={hub.id === 'bronx'}>
        <text x={hub.x + hub.dx} y={hub.y + hub.dy} text-anchor={hub.anchor} class="hub-name">{hub.id === 'bronx' && step === 3 ? 'New York' : hub.name}</text>
      </g>
    {/each}
  </svg>
  <figcaption>Selected cultural connections <span aria-hidden="true">·</span> routes are schematic</figcaption>
</figure>

<style>
  .spread-map { width: 100%; margin: 0; color: var(--map-accent, #eeff95); }
  svg { display: block; width: 100%; height: auto; overflow: visible; }
  .land { fill: var(--map-land, #30483b); stroke: var(--map-border, #3c5748); stroke-width: .65; stroke-linejoin: round; }
  .route-line { fill: none; stroke: var(--map-past, #6b927c); stroke-width: 1.5; opacity: .42; stroke-linecap: round; }
  .connection.current .route-line { stroke: var(--map-route, #f5bf2f); stroke-width: 2.2; opacity: .95; stroke-dasharray: 1; animation: trace-route 1.35s cubic-bezier(.3, 0, .25, 1) var(--route-delay) both; }
  .arrow-current, .arrow-past { fill: none; stroke-linecap: round; stroke-linejoin: round; }
  .arrow-current { stroke: var(--map-route, #f5bf2f); stroke-width: .9; }
  .arrow-past { stroke: var(--map-past, #6b927c); stroke-width: .9; }
  .hub-dot { fill: var(--map-past, #6b927c); stroke: var(--map-background, #14271f); stroke-width: 2; }
  .hub.current .hub-dot, .hub.origin .hub-dot { fill: var(--map-accent, #eeff95); }
  .hub-halo { fill: none; stroke: var(--map-accent, #eeff95); stroke-width: 1; opacity: .28; }
  .hub-name { fill: var(--map-label, #f0f2dc); font-family: inherit; font-size: 18px; font-weight: 550; paint-order: stroke; stroke: var(--map-background, #14271f); stroke-width: 6; stroke-linejoin: round; }
  .hub-label.origin .hub-name { fill: var(--map-accent, #eeff95); font-weight: 650; }
  figcaption { margin-top: .3rem; color: var(--map-muted, #a7b5a5); font-size: .69rem; letter-spacing: .015em; text-align: center; }
  figcaption span { padding-inline: .4em; }
  @keyframes trace-route { from { stroke-dashoffset: 1; opacity: 0; } 12% { opacity: .95; } to { stroke-dashoffset: 0; opacity: .95; } }
  .reduced-motion .route-line { animation: none !important; stroke-dashoffset: 0; }
  @media (max-width: 600px) {
    .hub-name { font-size: 25px; stroke-width: 7; }
    .route-line { stroke-width: 2; }
    .connection.current .route-line { stroke-width: 3; }
    .hub-dot { stroke-width: 1.4; }
    figcaption { font-size: .6rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .route-line { animation: none !important; stroke-dashoffset: 0; }
  }
</style>
