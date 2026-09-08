<script lang="ts">
  import { tick } from 'svelte';
  import RadialDisc from './RadialDisc.svelte';
  import SceneDeck from './SceneDeck.svelte';
  import ProjectCover from './ProjectCover.svelte';
  import ArtistProfileCard from './ArtistProfileCard.svelte';
  import SceneProfileCard from './SceneProfileCard.svelte';
  import { sceneProfiles } from '../data/scene-profiles';
  import { artistProfiles } from '../data/artist-profiles';
  import { projectArtwork } from '../data/artwork';
  import { scenes } from '../data/scenes';
  import { releaseStyles, formatDate, formatActivityEnd } from '../charts/types';
  import type { ReleaseType, ProjectRelease } from '../charts/types';

  const artistCount = scenes.reduce((total, scene) => total + scene.artists.length, 0);
  const releaseCount = new Set(Object.values(projectArtwork).map(artwork => artwork.sourceUrl.match(/\/(\d+)(?:\?|$)/)?.[1] ?? artwork.sourceUrl)).size;
  let activeIndex = $state(0);
  const scene = $derived(scenes[activeIndex]);
  const kinds: ReleaseType[] = ['album', 'ep', 'mixtape'];
  let artistId = $state('');
  let allArtistsButton: HTMLButtonElement;
  let detailsPanel: HTMLElement;
  let types = $state<ReleaseType[]>([...kinds]);
  let view = $state<'disc' | 'list'>('disc');
  let selectedId = $state<string | null>(null);
  const filtered = $derived(scene.projects.filter(p => (!artistId || p.artistId === artistId) && types.includes(p.type)));
  const selected = $derived(filtered.find(p => p.id === selectedId) ?? null);
  const selectedArtist = $derived(scene.artists.find(artist => artist.id === artistId) ?? null);
  function select(project: ProjectRelease) { selectedId = project.id; }
  function filterArtist(id: string) {
    artistId = id;
    selectedId = null;
  }
  async function openArtistProfile(id: string) {
    filterArtist(id);
    await tick();
    detailsPanel?.focus();
  }
  function toggleType(kind: ReleaseType) {
    types = types.includes(kind) ? types.filter(t => t !== kind) : [...types, kind];
  }
  function changeScene(index: number) {
    if (index === activeIndex) return;
    activeIndex = index;
    artistId = ''; types = [...kinds]; selectedId = null;
  }
  async function reset() {
    artistId = ''; types = [...kinds]; selectedId = null;
    await tick();
    allArtistsButton?.focus();
  }
</script>

<section class="disc-study" id="scenes" aria-labelledby="study-title">
  <header class="study-heading">
    <div><p class="eyebrow"><span>02</span> / THE LOCAL ROTATION</p><h2 id="study-title">Eight scenes.<br /><em>Find your rotation.</em></h2></div>
    <p>{artistCount} artists. {releaseCount} sourced releases.<br />A selection of South Asian scenes, through 2024.</p>
  </header>

  <div class="turntable">
    <div class="study-workspace">
      <div class="visual-column">
        <SceneDeck {scenes} {activeIndex} {view} onchange={changeScene}>
          {#snippet controls()}
            <div class="artist-filters" role="group" aria-label="Filter releases by artist">
              <button type="button" bind:this={allArtistsButton} aria-pressed={artistId === ''} onclick={() => filterArtist('')}>All artists</button>
              {#each scene.artists as artist (artist.id)}
                <button type="button" aria-pressed={artistId === artist.id} onclick={() => filterArtist(artist.id)}>{artist.name}</button>
              {/each}
            </div>
          {/snippet}
          {#if view === 'disc'}
            <RadialDisc {scene} {artistId} {types} fit selectedId={selected?.id ?? null} onselect={select} onartistselect={filterArtist} />
          {:else if filtered.length === 0}
            <div class="empty"><span class="empty-record" aria-hidden="true">◎</span><h3>No releases in this mix.</h3><p>{artistId && !scene.projects.some(project => project.artistId === artistId) ? 'No verified albums, EPs or mixtapes in this snapshot.' : 'Try another artist or release type.'}</p><button onclick={reset}>Show all projects</button></div>
          {:else}
            <div class="release-list">
              <table>
                <caption class="sr-only">Verified release dates, matching the disc</caption>
                <thead><tr><th scope="col">Project / artist</th><th scope="col">Released</th><th scope="col">Format</th></tr></thead>
                <tbody>{#each [...filtered].sort((a, b) => a.date.localeCompare(b.date)) as project}
                  <tr class:active={selected?.id === project.id}>
                    <td><button class="project-name" aria-pressed={selected?.id === project.id} onclick={() => select(project)}>{project.title}</button><span>{scene.artists.find(a => a.id === project.artistId)?.name}</span></td>
                    <td>{formatDate(project.date)}</td><td><i style:background={releaseStyles[project.type].color} aria-hidden="true"></i>{releaseStyles[project.type].label}</td>
                  </tr>
                {/each}</tbody>
              </table>
            </div>
          {/if}
        </SceneDeck>
      </div>

      <aside class="release-panel" bind:this={detailsPanel} tabindex="-1" aria-label={selected ? 'Project details' : selectedArtist ? selectedArtist.name + ' artist profile' : scene.name + ' scene overview'} style:--cue-color={selected ? releaseStyles[selected.type].color : scene.color}>
        <div class="detail-body" aria-live="polite" aria-atomic="true">
          {#key selected?.id ?? selectedArtist?.id ?? scene.id}
            {#if selected}
              <div class="release-info">
                {#if projectArtwork[selected.id]}<ProjectCover {...projectArtwork[selected.id]} title={selected.title} />{/if}
                <p class="selected-artist"><button class="artist-profile-link" onclick={() => openArtistProfile(selected.artistId)} aria-label={`View ${scene.artists.find(a => a.id === selected.artistId)?.name} artist profile`}>{selected.credits ?? scene.artists.find(a => a.id === selected.artistId)?.name}</button></p>
                <h3>{selected.title}</h3>
                <dl><div><dt>{selected.dateSource ? 'Release date' : 'Catalog release'}</dt><dd>{formatDate(selected.date)}</dd></div><div><dt>Format</dt><dd><i style:background={releaseStyles[selected.type].color} aria-hidden="true"></i>{releaseStyles[selected.type].label}</dd></div></dl>
                {#if projectArtwork[selected.id]}
                  <a class="apple-music-link" href={projectArtwork[selected.id].sourceUrl} target="_blank" rel="noreferrer" aria-label={`Open ${selected.title} on Apple Music (opens in a new tab)`}>
                    Apple Music <span aria-hidden="true">↗</span>
                  </a>
                {/if}
              </div>
            {:else if selectedArtist && artistProfiles[selectedArtist.id]}
              <ArtistProfileCard artist={selectedArtist} profile={artistProfiles[selectedArtist.id]} />
            {:else}
              <SceneProfileCard {scene} profile={sceneProfiles[scene.id]} />
            {/if}
          {/key}
        </div>
      </aside>
    </div>

    <div class="study-toolbar">
      <div class="kind-filters" role="group" aria-label="Filter release types">
        {#each kinds as kind}
          <button aria-pressed={types.includes(kind)} class:enabled={types.includes(kind)} style:--format-color={releaseStyles[kind].color} onclick={() => toggleType(kind)}><i aria-hidden="true"></i>{releaseStyles[kind].label}<span>{scene.projects.filter(p => p.type === kind).length}</span></button>
        {/each}
      </div>
      <div class="view-toggle" role="group" aria-label="Chart view">
        <button aria-pressed={view === 'disc'} onclick={() => (view = 'disc')}><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" /><circle cx="8" cy="8" r="2" /></svg>Disc</button>
        <button aria-pressed={view === 'list'} onclick={() => (view = 'list')}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 4h10M3 8h10M3 12h10" /></svg>Release list</button>
      </div>
    </div>
  </div>

  <div class="reading-guide" id="reading-discs">
    <h3>How the disc works</h3>
    <ol>
      <li><span>01</span><div><h4>A shared clock.</h4><p>Follow time counterclockwise. Every artist uses the same date scale.</p></div></li>
      <li><span>02</span><div><h4>Artists are the tracks.</h4><p>Each black ring begins at a documented release anchor, not a claimed career beginning.</p></div></li>
      <li><span>03</span><div><h4>Projects are the bands.</h4><p>Colour means format. Bands follow release order, with gaps for easy selection. Find exact dates in the details or list.</p></div></li>
    </ol>
  </div>

  <details class="methodology">
    <summary>Sources, corrections, and what this chart can tell us <span aria-hidden="true">+</span></summary>
    <div class="method-body">
      <div><h3>Read the dates carefully.</h3><p>One ring per artist. Bands follow release order, with a visible gap between projects. Albums use 7.2° bands; EPs and mixtapes use 3.6°. Nearby bands move slightly along the ring so each stays fully visible and clickable. Exact dates remain in the details and release list.</p><p>Ring beginnings are documented release anchors, not definitive career starts. Approximate starting years are identified in the source notes. Known activity endpoints stop the black ring; later releases keep their own dates. The snapshot ends before 2025 releases.</p></div>
      <div><h3>About this selection.</h3><p>{scene.coverage}</p><p>The original images name artists but do not label projects. These sourced selections reconstruct the scenes; they do not claim an exact match to every original mark. Artist and label descriptions take priority when a streaming catalog groups an EP or mixtape under albums.</p></div>
      {#if scene.projects.some(project => project.note)}
        <div class="catalog-notes"><h3>Catalog notes.</h3>{#each scene.projects.filter(project => project.note) as project}<p><strong>{project.title}</strong> · {project.note} {#each project.sources as source}<a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>{/each}</p>{/each}</div>
      {/if}
      <div class="anchors"><h3>Artist ring dates</h3>{#each scene.artists as artist}<p><strong>{artist.name}</strong> · {artist.anchor.precision === 'year' ? artist.anchor.date.slice(0, 4) + ' (year only)' : formatDate(artist.anchor.date)} · {artist.anchor.label} <a href={artist.anchor.source.url} target="_blank" rel="noreferrer">Source ↗<span class="sr-only"> (opens in a new tab)</span></a>{#if artist.activityEnd}<br />Ring ends {formatActivityEnd(artist.activityEnd)} · {artist.activityEnd.label} <a href={artist.activityEnd.source.url} target="_blank" rel="noreferrer">Source ↗<span class="sr-only"> (opens in a new tab)</span></a>{/if}</p>{/each}</div>
    </div>
  </details>
</section>

<style>
  .disc-study { max-width: 1120px; margin-inline: auto; --deck-ink: #1e3025; --deck-muted: #606958; --deck-line: #dce1d2; --deck-paper: #fafbf5; --accent: #17694f; scroll-margin-top: 24px; }
  .study-heading { display: flex; align-items: end; justify-content: space-between; gap: 32px; margin-bottom: 30px; }
  .study-heading .eyebrow { display: flex; align-items: center; gap: 12px; color: #47633e; font-size: 10px; margin-bottom: 15px; }
  .study-heading .eyebrow span { display: grid; place-items: center; width: 34px; height: 28px; background: var(--punch); color: var(--ink); font-family: var(--font-display); font-size: 17px; font-weight: 400; letter-spacing: 0; transform: rotate(-4deg); }
  .study-heading h2 { font-size: clamp(38px, 4.7vw, 65px); line-height: 1.07; text-transform: uppercase; }
  .study-heading h2 em { display: inline-block; font-size: .55em; line-height: 1.45; text-transform: none; letter-spacing: -.025em; color: var(--accent); transform: rotate(-2deg); }
  .study-heading > p { font-size: 13px; line-height: 1.75; color: var(--muted); padding-bottom: 3px; }
  .turntable { max-width: 1120px; margin: auto; color: var(--deck-ink); background: var(--deck-paper); border: 1px solid #9ba894; border-radius: 4px; box-shadow: 5px 5px 0 #26372b; overflow: hidden; }
  .study-workspace { display: grid; grid-template-columns: minmax(0, 1fr) 250px; gap: 28px; align-items: start; padding: 16px 28px 12px; }
  .visual-column { min-width: 0; }
  .release-panel { min-width: 0; margin-top: 42px; border: 1px solid #dce2d0; border-top: 3px solid var(--cue-color); border-radius: 2px; background: #f0f3e7; padding: 21px; transition: border-color 180ms; }
  .release-panel:focus-visible { outline: 2px solid #166b50; outline-offset: 4px; }
  .release-info { animation: cue-in 240ms ease-out both; }
  .selected-artist { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #276242; }
  .artist-profile-link { padding: 3px 0; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; text-transform: inherit; letter-spacing: inherit; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
  .artist-profile-link:hover { color: var(--deck-ink); }
  .release-info h3 { font-family: 'Barlow Condensed', Impact, sans-serif; font-size: 38px; line-height: .98; text-transform: uppercase; font-weight: 600; letter-spacing: -.02em; margin-top: 11px; overflow-wrap: anywhere; }
  dl { display: grid; grid-template-columns: 1fr auto; gap: 15px; margin: 23px 0 0; padding-top: 15px; border-top: 1px solid #d5deca; }
  .apple-music-link { display: inline-flex; align-items: center; gap: 7px; margin-top: 18px; padding-block: 5px; color: #276242; font-size: 11px; text-underline-offset: 3px; }
  .apple-music-link:hover { color: var(--deck-ink); }
  dt { font-size: 9px; color: var(--deck-muted); margin-bottom: 6px; }
  dd { display: flex; align-items: center; gap: 6px; margin: 0; font-size: 11px; font-weight: 500; }
  i { display: inline-block; width: 7px; height: 11px; flex-shrink: 0; border-radius: 1px; }
  .study-toolbar { display: flex; align-items: center; flex-wrap: wrap; gap: 18px; padding: 12px 28px; border-top: 1px solid var(--deck-line); background: #f3f5ec; }
  .artist-filters { display: flex; flex-wrap: wrap; gap: 8px; padding: 14px 20px 6px; }
  .artist-filters button { min-height: 44px; padding: 10px 15px; border: 1px solid #cbd5c2; border-radius: 2px; background: #fffef8; color: var(--deck-ink); font-size: 12px; font-weight: 600; line-height: 1.25; transition: background 160ms, border-color 160ms, box-shadow 160ms, transform 160ms; }
  .artist-filters button:hover { border-color: #648d70; background: #e7f1df; transform: translateY(-1px); }
  .artist-filters button[aria-pressed='true'] { border-color: #142018; background: #142018; color: #e9ff55; box-shadow: inset 0 -3px 0 #42d6bb; }
  .artist-filters button:active { transform: translateY(0); }
  button:focus-visible { outline: 2px solid #166b50; outline-offset: 4px; }
  .kind-filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .kind-filters button { display: flex; align-items: center; gap: 7px; font-size: 10px; color: #697260; background: transparent; padding: 10px 11px; min-height: 40px; border: 1px solid #d4dbc9; border-radius: 2px; transition: background 160ms, color 160ms, transform 160ms; }
  .kind-filters button.enabled { color: #f6f9ee; border-color: #243728; background: #243728; }
  .kind-filters button:hover { transform: translateY(-2px); }
  .kind-filters button i { background: var(--format-color); }
  .kind-filters button:not(.enabled) i { opacity: .3; }
  .kind-filters button > span { font-size: 9px; opacity: .7; }
  .view-toggle { display: flex; margin-left: auto; border: 1px solid #ccd5c0; padding: 3px; border-radius: 3px; background: #e7ecdf; }
  .view-toggle button { display: flex; align-items: center; gap: 6px; border: 0; color: #5b6852; background: transparent; border-radius: 2px; min-height: 32px; padding: 8px 11px; font-size: 10px; transition: background 160ms, color 160ms; }
  .view-toggle button[aria-pressed='true'] { background: #fffef8; color: #193a29; box-shadow: 0 1px 3px #29432214; }
  .view-toggle svg { width: 13px; height: 13px; stroke: currentColor; stroke-width: 1.1; fill: none; }
  .reading-guide { display: grid; grid-template-columns: 180px 1fr; gap: 24px; margin-block: 28px 0; padding-block: 20px 25px; border-bottom: 1px solid var(--line); scroll-margin-top: 30px; }
  .reading-guide h3 { font-size: 20px; font-weight: 500; line-height: 1.2; letter-spacing: -.035em; }
  ol { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; list-style: none; padding: 0; margin: 0; }
  li { display: flex; gap: 10px; }
  li > span { color: #2b7554; font-size: 9px; line-height: 20px; }
  h4 { font-size: 12px; margin: 0 0 8px; font-weight: 600; }
  li p { font-size: 11px; line-height: 1.7; color: var(--muted); }
  .methodology { border-bottom: 1px solid var(--line); }
  summary { display: flex; align-items: center; justify-content: space-between; gap: 25px; cursor: pointer; padding: 18px 0; font-size: 12px; list-style: none; }
  summary::-webkit-details-marker { display: none; }
  summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
  summary > span { font-size: 20px; }
  details[open] summary > span { transform: rotate(45deg); }
  .method-body { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; padding-block: 14px 30px; }
  .method-body h3 { font-size: 14px; margin-bottom: 12px; font-weight: 600; }
  .method-body p { font-size: 12px; line-height: 1.8; color: var(--muted); margin-top: 10px; }
  .method-body .anchors, .catalog-notes { grid-column: 1 / -1; }
  .anchors a, .catalog-notes a { text-underline-offset: 3px; margin-left: 5px; }
  .empty { height: 100%; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; }
  .empty-record { font-size: 65px; color: #719361; margin-bottom: 18px; }
  .empty h3 { font-size: 22px; font-weight: 500; letter-spacing: -.03em; }
  .empty p { font-size: 12px; color: var(--deck-muted); margin-top: 10px; }
  .empty button { font-size: 11px; color: #18311e; background: #edff36; border: 1px solid #91a23c; border-radius: 5px; padding: 12px 17px; margin-top: 20px; }
  .release-list { height: 100%; min-height: 0; min-width: 0; overflow: auto; background: #fffef9; border: 1px solid #dee4d3; border-radius: 6px; }
  table { width: 100%; border-collapse: collapse; text-align: left; font-size: 10px; }
  th { position: sticky; top: 0; background: #f0f4e7; font-size: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; padding: 14px 10px; }
  td { padding: 13px 10px; border-top: 1px solid #e1e6d8; }
  td:nth-child(2), td:nth-child(3) { white-space: nowrap; }
  td > span { display: block; font-size: 9px; color: var(--deck-muted); margin-top: 5px; }
  td i { margin-right: 5px; vertical-align: middle; }
  tr.active { background: #f2f8d4; }
  .project-name { padding: 0; border: 0; background: transparent; font-size: 11px; color: var(--deck-ink); font-weight: 600; text-align: left; text-decoration: underline; text-underline-offset: 3px; }
  @keyframes cue-in { from { opacity: .3; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @media (max-width: 1050px) {
    .study-workspace { grid-template-columns: minmax(0, 1fr) 220px; gap: 10px; padding: 16px 16px 12px; }
    .release-panel { padding: 18px; }
    .study-toolbar { gap: 12px; padding: 12px 20px; }
    .kind-filters button { padding-inline: 9px; }
    .reading-guide { grid-template-columns: 1fr; }
  }
  @media (max-width: 900px) {
    .study-workspace { grid-template-columns: minmax(0, 1fr); padding: 16px 22px; gap: 22px; }
    .release-panel { margin: 0 20px; }
    .study-heading { align-items: start; flex-direction: column; gap: 17px; }
    .study-heading > p br { display: none; }
  }
  @media (max-width: 600px) {
    .study-heading { margin-bottom: 23px; }
    .study-heading h2 { font-size: 38px; }
    .study-heading .eyebrow { margin-bottom: 12px; }
    .turntable { border-radius: 4px; box-shadow: 3px 3px 0 #26372b; }
    .study-workspace { padding: 16px 9px; gap: 22px; }
    .release-panel { margin: 0 7px; padding: 18px; }
    .study-toolbar { gap: 12px; padding: 12px 16px; }
    .artist-filters { gap: 7px; padding: 12px 8px 7px; }
    .artist-filters button { flex: 1 0 auto; padding-inline: 12px; font-size: 11px; }
    .kind-filters { gap: 5px; flex: 1; }
    .kind-filters button { min-height: 44px; padding-inline: 9px; }
    .view-toggle { margin-left: 0; }
    .view-toggle button { min-height: 36px; }
    .reading-guide { gap: 21px; margin-block: 20px 0; }
    ol { grid-template-columns: 1fr; gap: 20px; }
    .method-body { grid-template-columns: 1fr; }
    .method-body .anchors, .catalog-notes { grid-column: auto; }
  }
  @media (prefers-reduced-motion: reduce) {
    .release-info { animation: none; }
    .release-panel, .artist-filters button, .kind-filters button, .view-toggle button { transition: none; }
  }
</style>
