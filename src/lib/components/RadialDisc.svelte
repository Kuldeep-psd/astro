<script lang="ts">
  import { createTimeScale, dateToAngle, annularSector, polarPoint, arcLine, artistTrackAngles } from '../charts/radial.js';
  import { layoutBands } from '../charts/band-layout.js';
  import { validateScene } from '../charts/validate-scene.js';
  import { releaseStyles, formatDate, formatActivityEnd } from '../charts/types';
  import type { RadialScene, ProjectRelease, ReleaseType } from '../charts/types';

  let { scene, selectedId = null, artistId = '', types = ['album', 'ep', 'mixtape'], fit = false, onselect, onartistselect }:
    { scene: RadialScene; selectedId?: string | null; artistId?: string; types?: ReleaseType[]; fit?: boolean; onselect: (release: ProjectRelease) => void; onartistselect: (id: string) => void } = $props();

  const uid = $props.id();
  const centerRadius = 146, calendarInner = 151, calendarOuter = 181;
  const cx = $derived(Math.max(320, 260 + scene.artists.length * 30));
  const cy = $derived(cx);
  // Trim blank vertical margins; 64 keeps every scene’s artist labels clear
  // while preserving disc scale in the tighter shared stage.
  const verticalInset = 64;
  const laneInner = 185, laneWidth = 27, lanePitch = 30;
  const artistLabelFontSize = 17;
  const checkedScene = $derived(validateScene(scene));
  const scale = $derived(createTimeScale({ start: checkedScene.start, end: checkedScene.end }));
  const outerRadius = $derived(laneInner + (scene.artists.length - 1) * lanePitch + laneWidth);
  const bandLayouts = $derived(new Map(scene.artists.flatMap(artist =>
    layoutBands(scene.projects.filter(p => p.artistId === artist.id).map(p => ({ id: p.id, date: p.date, width: releaseStyles[p.type].width })), scale)
  ).map(band => [band.id, band])));
  const finalAngle = $derived(scale.startAngle + scale.sweep);
  const projects = $derived(scene.projects.filter(p => (!artistId || p.artistId === artistId) && types.includes(p.type)));
  let focusedId = $state('');
  const tabbableId = $derived(projects.some(p => p.id === focusedId) ? focusedId : projects.some(p => p.id === selectedId) ? selectedId : projects[0]?.id);
  const calendarTicks = $derived.by(() => {
    const firstYear = Number(scene.start.slice(0, 4));
    const majorInterval = Math.max(4, Math.ceil((Number(scene.end.slice(0, 4)) - firstYear) / 3));
    const dates = [scene.start];
    for (let year = firstYear; year <= Number(scene.end.slice(0, 4)); year++) {
      const date = String(year).padStart(4, '0') + '-01-01';
      if (date > scene.start && date < scene.end) dates.push(date);
    }
    dates.push(scene.end);
    return dates.map((date, index) => ({
      date,
      angle: dateToAngle(date, scale),
      major: index === 0 || index === dates.length - 1 || (Number(date.slice(0, 4)) - firstYear) % majorInterval === 0,
      label: date.endsWith('-01-01') ? date.slice(0, 4) : formatDate(date),
      inset: index === 0 ? -5 : index === dates.length - 1 ? 5 : 0,
    }));
  });

  function labelPosition(angle: number, radius: number) {
    const point = polarPoint(cx, cy, radius, angle);
    const tangent = ((angle + 90 + 540) % 360) - 180;
    const flipped = tangent > 90 || tangent < -90;
    return { ...point, rotation: tangent + (flipped ? 180 : 0), anchor: flipped ? 'end' : 'start' };
  }
  function artistLabelPosition(artistId: string, startAngle: number, radius: number) {
    // Counterclockwise bands can extend before their artist anchor. Reserve
    // their actual edge, including hidden releases, before placing the name.
    let boundary = startAngle;
    for (const project of scene.projects) {
      if (project.artistId === artistId) {
        boundary = Math.max(boundary, bandLayouts.get(project.id)!.startAngle);
      }
    }
    // Half a text em plus four SVG pixels clears the text halo and band focus
    // outline. Convert pixels to angle so the physical gap survives new lanes.
    const clearance = Math.atan2(artistLabelFontSize / 2 + 4, radius) * 180 / Math.PI;
    return labelPosition(boundary + clearance, radius);
  }
  function activateArtist(event: KeyboardEvent, id: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onartistselect(id);
    }
  }
  function activate(event: KeyboardEvent, id: string) {
    const index = projects.findIndex(p => p.id === id);
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onselect(projects[index]);
      return;
    }
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % projects.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + projects.length) % projects.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = projects.length - 1;
    else return;
    event.preventDefault();
    focusedId = projects[next].id;
    document.getElementById(uid + '-' + focusedId)?.focus();
  }
</script>

<div class="chart-frame" class:fit>
  <svg viewBox={`0 ${verticalInset} ${cx * 2} ${cy * 2 - verticalInset * 2}`} preserveAspectRatio="xMidYMid meet" role="group" aria-labelledby={uid + '-title'} aria-describedby={uid + '-description'}>
    <title id={uid + '-title'}>{scene.name} hip-hop: radial release timeline</title>
    <desc id={uid + '-description'}>Time runs counterclockwise from {formatDate(scene.start)} to {formatDate(scene.end)}. Each artist has a separate ring, ending at a documented activity endpoint when known. Later releases do not extend that ring. Coloured bands represent releases in chronological order, not durations. Nearby bands are spaced apart for easier selection; exact dates appear in the release details and list. Select an artist ring or name to filter their releases and show their profile. Tab to a ring and press Enter or Space to select it. Tab into a release, then use arrow keys to move between releases. The release list provides the same data in text.</desc>
    <defs>
      <linearGradient id={uid + '-vinyl'} gradientUnits="userSpaceOnUse" x1={cx - outerRadius} y1={cy - outerRadius} x2={cx + outerRadius} y2={cy + outerRadius}>
        <stop offset="0" stop-color="#111b16" />
        <stop offset=".24" stop-color="#344139" />
        <stop offset=".44" stop-color="#142019" />
        <stop offset=".65" stop-color="#080f0b" />
        <stop offset=".82" stop-color="#29372e" />
        <stop offset="1" stop-color="#131d17" />
      </linearGradient>
    </defs>

    <circle cx={cx} cy={cy} r={centerRadius} fill="#f3ff9c" stroke="#17271b" stroke-width="3" />
    <g aria-hidden="true" pointer-events="none">
      <circle cx={cx} cy={cy} r={centerRadius - 11} fill="none" stroke="#627437" stroke-opacity=".38" stroke-width="1" />
      <circle cx={cx} cy={cy} r="16" fill="#42d6bb" stroke="#17271b" stroke-width="1.5" />
      <circle cx={cx} cy={cy} r="9" fill="#18261c" />
      <circle cx={cx - 1.5} cy={cy - 1.5} r="3.5" fill="#fbfff0" />
    </g>
    <path d={annularSector(cx, cy, calendarInner, calendarOuter, scale.startAngle, finalAngle)} fill={scene.color} />
    {#each calendarTicks as tick}
      {@const a = polarPoint(cx, cy, calendarInner, tick.angle)}
      {@const b = polarPoint(cx, cy, calendarInner + (tick.major ? 7 : 4), tick.angle)}
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#123e30" stroke-width={tick.major ? 1.8 : .8} />
      {#if tick.major}
        {@const angle = tick.angle + tick.inset}
        {@const pos = polarPoint(cx, cy, 166, angle)}
        {@const rotation = ((angle + 90 + 540) % 360) - 180}
        <text x={pos.x} y={pos.y} text-anchor="middle" dominant-baseline="central" class="year" transform={`rotate(${rotation > 90 || rotation < -90 ? rotation + 180 : rotation} ${pos.x} ${pos.y})`}>{tick.label}</text>
      {/if}
    {/each}

    {#each scene.artists as artist, index}
      {@const inner = laneInner + index * lanePitch}
      {@const outer = inner + laneWidth}
      {@const start = artist.anchor.date < scene.start ? scene.start : artist.anchor.date}
      {@const { startAngle, endAngle } = artistTrackAngles(artist, scale)}
      {@const label = artistLabelPosition(artist.id, startAngle, inner + laneWidth / 2)}
      <g class="artist-track" data-artist-id={artist.id} opacity={!artistId || artistId === artist.id ? 1 : .22}
        role="button" tabindex="0" aria-pressed={artistId === artist.id} aria-label={`Filter by ${artist.name}`}
        onclick={() => onartistselect(artist.id)} onkeydown={event => activateArtist(event, artist.id)}>
        <path class="artist-lane" d={annularSector(cx, cy, inner, outer, startAngle, endAngle)} fill={`url(#${uid}-vinyl)`}>
          <title>{artist.name}: {artist.anchor.label}. {artist.anchor.precision === 'year' ? `Starting year: ${artist.anchor.date.slice(0, 4)}; exact day unknown.` : formatDate(start)}.{artist.activityEnd ? ` ${artist.activityEnd.label}. Ring ends ${formatActivityEnd(artist.activityEnd)}.` : ''}</title>
        </path>
        <g class="vinyl-grooves" aria-hidden="true" pointer-events="none">
          {#each [6.5, 13.5, 20.5] as offset}
            <path d={arcLine(cx, cy, inner + offset, startAngle, endAngle)} fill="none" stroke="#e5f4d5" stroke-opacity=".14" stroke-width=".7" />
          {/each}
        </g>
        <text class="artist-name" style:font-size={`${artistLabelFontSize}px`} x={label.x} y={label.y} text-anchor={label.anchor} dominant-baseline="central" transform={`rotate(${label.rotation} ${label.x} ${label.y})`}>{artist.name}</text>
      </g>
    {/each}

    {#each projects as project (project.id)}
      {@const index = scene.artists.findIndex(a => a.id === project.artistId)}
      {@const artist = scene.artists[index]}
      {@const angles = bandLayouts.get(project.id)!}
      {@const laneStart = laneInner + index * lanePitch}
      {@const inner = laneStart}
      {@const outer = laneStart + laneWidth}
      {@const style = releaseStyles[project.type]}
      <g class="project" class:chosen={selectedId === project.id} style:--band-color={style.color} id={uid + '-' + project.id} role="button"
        tabindex={tabbableId === project.id ? 0 : -1}
        aria-pressed={selectedId === project.id}
        aria-label={`${artist.name}, ${project.title}, ${style.label}, ${formatDate(project.date)}. Show release details.`}
        onclick={() => onselect(project)} onkeydown={event => activate(event, project.id)}
        onfocus={() => { focusedId = project.id; onselect(project); }}
        data-release-id={project.id} data-date-angle={angles.dateAngle} data-display-angle={angles.centerAngle}>
        <title>{artist.name} · {project.title} · {style.label} · {formatDate(project.date)}</title>
        <path class="band" d={annularSector(cx, cy, inner, outer, angles.startAngle, angles.endAngle)} fill={style.color} />
        <path class="focus-outline" d={annularSector(cx, cy, inner + 1, outer - 1, angles.startAngle + Math.sign(scale.sweep) * .35, angles.endAngle - Math.sign(scale.sweep) * .35)} fill="none" stroke="#fbfff0" stroke-width="1.6" pointer-events="none" />
      </g>
    {/each}

    <text x={cx} y={cy - 34} text-anchor="middle" class="center-name">{scene.name.toUpperCase()}</text>
    <text x={cx} y={cy + 78} text-anchor="middle" class="center-name">HIPHOP</text>
    <text x={cx + outerRadius + 26} y={cy + 5} text-anchor="middle" class="end-label">{scene.end.endsWith('-01-01') ? scene.end.slice(0, 4) : formatDate(scene.end)}</text>
  </svg>
</div>

<style>
  .chart-frame { width: 100%; min-width: 0; }
  .chart-frame.fit { height: 100%; min-height: 0; }
  .fit svg { height: 100%; }
  svg { width: 100%; height: auto; display: block; overflow: visible; }
  .center-name { font-family: 'Barlow Condensed', Impact, sans-serif; font-size: 59px; font-weight: 800; letter-spacing: -1.8px; fill: #19251a; }
  .artist-track { cursor: pointer; outline: none; transition: opacity 180ms ease; }
  .artist-track:hover, .artist-track:focus-visible { opacity: 1; }
  .artist-lane { transition: filter 160ms ease; }
  .artist-track:hover .artist-lane { filter: brightness(1.25); }
  .artist-track:focus-visible .artist-lane { stroke: #f15bff; stroke-width: 2; }
  .artist-name { font-family: 'Barlow Condensed', Impact, sans-serif; font-weight: 600; letter-spacing: .1px; fill: #17291d; paint-order: stroke; stroke: #fafbf5; stroke-width: 4px; stroke-linejoin: round; }
  .year { font-size: 15px; font-weight: 600; fill: #103c2b; }
  .end-label { font-size: 12px; fill: #273e2e; font-weight: 700; }
  .project { cursor: pointer; outline: none; }
  .band { transition: filter 160ms ease; }
  .focus-outline { opacity: 0; transition: opacity 160ms ease, stroke 160ms ease; }
  .project:hover .band, .project:focus-visible .band, .project.chosen .band { filter: brightness(1.08); }
  .project:hover .focus-outline { opacity: .7; }
  .project:focus-visible .focus-outline, .project.chosen .focus-outline { opacity: 1; }
  .project:focus-visible .focus-outline { stroke: #f15bff; stroke-width: 2; }
  @media (prefers-reduced-motion: reduce) {
    .artist-track, .artist-lane, .band, .focus-outline { transition: none; }
  }
</style>
