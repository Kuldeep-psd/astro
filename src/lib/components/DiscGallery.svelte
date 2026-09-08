<script lang="ts">
  import { discSheets } from '../data/discs';

  let selectedIndex = $state(Math.max(0, discSheets.findIndex(sheet => sheet.image === 'city3.jpg')));
  let isActualSize = $state(false);
  let viewer: HTMLDialogElement;
  const selected = $derived(discSheets[selectedIndex]);
  const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;

  function openViewer() {
    isActualSize = false;
    viewer.showModal();
  }
</script>

<section class="disc-section" id="original-scenes" aria-labelledby="scenes-heading">
  <div class="section-heading">
    <p class="eyebrow"><span>SIDE A</span> The local rotation</p>
    <div class="heading-grid">
      <h2 id="scenes-heading">Every scene has<br />its own rotation.</h2>
      <p class="section-intro">A closer look at the artists and releases across regional hip-hop scenes. Explore the original disc infographics, one sheet at a time.</p>
    </div>
  </div>

  <div class="gallery">
    <aside class="gallery-sidebar" aria-label="Choose a disc sheet">
      <p class="sidebar-label">Choose a scene</p>
      <div class="sheet-choices">
        {#each discSheets as sheet, index}
          <button
            class="sheet-choice"
            class:selected={selectedIndex === index}
            aria-pressed={selectedIndex === index}
            aria-controls="selected-disc-sheet"
            onclick={() => (selectedIndex = index)}
          >
            <span class="sheet-number">{sheet.number}</span>
            <span class="sheet-title">{sheet.title}</span>
            <span class="sheet-arrow" aria-hidden="true">↗</span>
          </button>
        {/each}
      </div>
      <div class="sidebar-note">
        <span class="mini-disc" aria-hidden="true"></span>
        <p>Different cities.<br />Different languages.<br />A shared rhythm.</p>
      </div>
    </aside>

    <figure class="disc-figure" id="selected-disc-sheet">
      <div class="figure-topline">
        <span aria-live="polite" aria-atomic="true">Sheet {selected.number} / 03 <span class="topline-divider">—</span> {selected.scenes}</span>
        <button class="expand-button" onclick={openViewer} aria-haspopup="dialog">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 2h4v4M14 2 9 7M6 14H2v-4m0 4 5-5" stroke="currentColor" stroke-width="1.3" /></svg>
          <span>View full size</span>
        </button>
      </div>
      <button class="image-button" onclick={openViewer} aria-label={`Open full-size ${selected.title} infographics`} aria-haspopup="dialog">
        <img
          class="disc-image"
          src={asset(selected.image)}
          alt={selected.alt}
          width={selected.width}
          height={selected.height}
          loading="lazy"
          decoding="async"
        />
      </button>
      <figcaption class="figure-caption">
        <p>Original disc infographics <span aria-hidden="true">·</span> {selected.scenes}</p>
        <a href="#original-reading-discs">How to read the discs <span aria-hidden="true">↓</span></a>
      </figcaption>
    </figure>
  </div>

  <div class="disc-guide" id="original-reading-discs" aria-labelledby="guide-heading">
    <div class="guide-intro">
      <p class="eyebrow">A quick guide</p>
      <h3 id="guide-heading">Read the record.</h3>
      <div class="legend" aria-label="Release type color legend">
        <span><i class="album" aria-hidden="true"></i> Album</span>
        <span><i class="mixtape" aria-hidden="true"></i> Mixtape</span>
        <span><i class="ep" aria-hidden="true"></i> EP</span>
      </div>
    </div>
    <ol class="guide-items">
      <li><span class="guide-number">01</span><div><h4>Follow an artist.</h4><p>The named rings represent artists within each scene.</p></div></li>
      <li><span class="guide-number">02</span><div><h4>Spot a release.</h4><p>Colored marks distinguish albums, mixtapes, and EPs.</p></div></li>
      <li><span class="guide-number">03</span><div><h4>Move through time.</h4><p>Use the dates printed on the inner ring to orient yourself.</p></div></li>
    </ol>
  </div>
</section>

<dialog bind:this={viewer} class="disc-viewer" aria-labelledby="viewer-heading" onclose={() => (isActualSize = false)}>
  <div class="viewer-toolbar">
    <div><p class="eyebrow">Original infographic · Sheet {selected.number}</p><h2 id="viewer-heading">{selected.title}</h2></div>
    <div class="viewer-actions">
      <button class="size-button" onclick={() => (isActualSize = !isActualSize)}>{isActualSize ? 'Fit to window' : 'Actual size'}</button>
      <button class="close-button" onclick={() => viewer.close()} aria-label="Close full-size infographic">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" stroke-width="1.5" /></svg>
      </button>
    </div>
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (A scrollable image region needs keyboard focus for arrow-key panning.) -->
  <div class="viewer-image-area" tabindex="0" role="region" aria-label="Infographic image. Scroll to explore when viewing at actual size.">
    <img class:actual-size={isActualSize} src={asset(selected.image)} alt={selected.alt} width={selected.width} height={selected.height} />
  </div>
  <p class="viewer-hint">{isActualSize ? 'Scroll to explore the full infographic.' : 'Choose actual size for a closer look at the artist names and release marks.'} <span>Esc to close</span></p>
</dialog>

<style>
  .disc-section { padding: 0; scroll-margin-top: 96px; }
  .eyebrow { display: flex; align-items: center; gap: 14px; margin: 0; font-size: 11px; font-weight: 600; letter-spacing: .13em; line-height: 1.5; text-transform: uppercase; }
  .eyebrow > span { color: var(--accent, #bb432c); }
  .heading-grid { display: grid; grid-template-columns: 1.3fr 1fr; align-items: end; gap: 60px; margin-top: 23px; }
  h2 { margin: 0; font-size: clamp(36px, 4.4vw, 62px); line-height: 1.03; letter-spacing: -.055em; font-weight: 500; }
  .section-intro { max-width: 365px; margin: 0 0 4px; font-size: 15px; line-height: 1.7; color: var(--muted, #5b625b); }
  .gallery { display: grid; grid-template-columns: 226px minmax(0, 1fr); margin-top: 42px; border-top: 1px solid var(--line, #d5d5c9); }
  .gallery-sidebar { padding: 24px 23px 24px 0; }
  .sidebar-label { margin: 0 0 17px; color: var(--muted, #5b625b); font-size: 10px; text-transform: uppercase; letter-spacing: .13em; font-weight: 600; }
  .sheet-choices { display: grid; gap: 6px; }
  button { font: inherit; color: inherit; cursor: pointer; }
  .sheet-choice { display: grid; grid-template-columns: 22px 1fr 12px; align-items: baseline; gap: 8px; width: 100%; min-height: 64px; padding: 18px 11px; text-align: left; background: transparent; border: 1px solid transparent; transition: background .2s, border-color .2s; }
  .sheet-choice:hover { background: #e9e8de; }
  .sheet-choice.selected { border-color: var(--line, #d5d5c9); background: #eae9df; }
  .sheet-number { font-size: 10px; color: var(--muted, #5b625b); font-variant-numeric: tabular-nums; }
  .sheet-title { font-size: 13px; line-height: 1.45; font-weight: 600; }
  .sheet-arrow { font-size: 16px; opacity: 0; color: var(--accent, #bb432c); }
  .sheet-choice.selected .sheet-arrow { opacity: 1; }
  .sidebar-note { margin: 82px 0 0 12px; }
  .sidebar-note p { margin: 17px 0 0; font-size: 12px; line-height: 1.75; color: var(--muted, #5b625b); }
  .mini-disc { display: block; width: 43px; height: 43px; border: 1px solid currentColor; border-radius: 50%; background: repeating-radial-gradient(circle, transparent 0 3px, var(--ink, #202521) 3.5px 4px, transparent 4.5px 7px); opacity: .6; }
  .disc-figure { margin: 0; min-width: 0; border-left: 1px solid var(--line, #d5d5c9); }
  .figure-topline { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 15px 0 15px 20px; min-height: 58px; font-size: 10px; font-weight: 500; line-height: 1.6; letter-spacing: .025em; }
  .topline-divider { margin: 0 8px; color: var(--muted, #5b625b); }
  .expand-button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; flex-shrink: 0; min-height: 32px; border: 0; padding: 4px 0 4px 8px; background: none; font-size: 10px; }
  .expand-button svg { width: 14px; height: 14px; }
  .expand-button:hover { color: var(--accent, #bb432c); }
  .image-button { display: block; width: 100%; padding: 0; border: 1px solid var(--line, #d5d5c9); border-left: 0; background: #fff; cursor: zoom-in; }
  .disc-image { display: block; width: 100%; height: auto; }
  .figure-caption { display: flex; justify-content: space-between; gap: 20px; padding: 15px 0 15px 20px; color: var(--muted, #5b625b); font-size: 10px; line-height: 1.6; }
  .figure-caption p { margin: 0; }
  .figure-caption p span { margin: 0 5px; }
  .figure-caption a { flex-shrink: 0; color: var(--ink, #202521); text-decoration: none; }
  .figure-caption a:hover { text-decoration: underline; }
  .figure-caption a span { margin-left: 5px; }
  .disc-guide { display: grid; grid-template-columns: 1fr 2fr; gap: 50px; padding: 33px 0 40px; margin-top: 32px; border-top: 1px solid var(--line, #d5d5c9); scroll-margin-top: 96px; }
  .guide-intro .eyebrow { font-size: 9px; color: var(--muted, #5b625b); }
  .guide-intro h3 { margin: 12px 0 20px; font-size: 24px; font-weight: 500; letter-spacing: -.04em; }
  .legend { display: flex; flex-wrap: wrap; gap: 17px; font-size: 10px; line-height: 1.5; }
  .legend span { display: inline-flex; align-items: center; gap: 6px; }
  .legend i { display: inline-block; width: 7px; height: 12px; }
  .album { background: #d1ac00; }
  .mixtape { background: #c700df; }
  .ep { background: #09b1ca; }
  .guide-items { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
  .guide-items li { display: flex; gap: 11px; }
  .guide-number { font-size: 9px; line-height: 22px; color: var(--accent, #bb432c); }
  .guide-items h4 { font-size: 12px; line-height: 1.65; margin: 0 0 10px; font-weight: 600; }
  .guide-items p { font-size: 11px; line-height: 1.75; margin: 0; color: var(--muted, #5b625b); }
  .disc-viewer { padding: 0; width: min(1400px, calc(100vw - 48px)); max-width: none; max-height: calc(100dvh - 48px); margin: auto; border: 1px solid var(--line, #d5d5c9); background: var(--paper, #f4f1e9); color: var(--ink, #202521); }
  .disc-viewer[open] { display: flex; flex-direction: column; }
  .disc-viewer::backdrop { background: rgb(12 18 15 / .78); backdrop-filter: blur(4px); }
  .viewer-toolbar { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; gap: 20px; padding: 18px 24px; border-bottom: 1px solid var(--line, #d5d5c9); }
  .viewer-toolbar .eyebrow { font-size: 9px; color: var(--muted, #5b625b); }
  .viewer-toolbar h2 { font-size: 22px; letter-spacing: -.025em; margin-top: 7px; }
  .viewer-actions { display: flex; align-items: center; gap: 20px; }
  .size-button { font-size: 11px; min-height: 40px; border: 1px solid var(--line, #d5d5c9); padding: 7px 12px; background: transparent; }
  .size-button:hover { background: #eae9df; }
  .close-button { width: 40px; height: 40px; display: grid; place-items: center; background: transparent; padding: 8px; border: 0; }
  .close-button:hover { background: #eae9df; }
  .close-button svg { width: 22px; height: 22px; }
  .viewer-image-area { overflow: auto; min-height: 0; background: #fff; }
  .viewer-image-area img { display: block; width: 100%; max-width: none; height: auto; margin: 0 auto; }
  .viewer-image-area img:not(.actual-size) { width: auto; max-width: 100%; max-height: calc(100dvh - 230px); object-fit: contain; }
  .viewer-image-area img.actual-size { width: 1707px; }
  .viewer-hint { display: flex; justify-content: space-between; gap: 20px; margin: 0; padding: 12px 24px; font-size: 10px; line-height: 1.5; flex-shrink: 0; color: var(--muted, #5b625b); border-top: 1px solid var(--line, #d5d5c9); }
  .viewer-hint span { flex-shrink: 0; }
  :is(button, a, .viewer-image-area):focus-visible { outline: 2px solid var(--accent, #bb432c); outline-offset: 4px; }
  @media (max-width: 900px) {
    .gallery { grid-template-columns: 190px minmax(0, 1fr); }
    .gallery-sidebar { padding-right: 15px; }
    .sheet-choice { padding: 14px 8px; gap: 5px; }
    .sheet-title { font-size: 12px; }
    .figure-topline { flex-wrap: wrap; gap: 4px 15px; padding-left: 15px; }
    .figure-caption { flex-direction: column; gap: 5px; padding-left: 15px; }
    .disc-guide { grid-template-columns: 1fr; gap: 28px; }
    .guide-intro { display: grid; grid-template-columns: 1fr 1fr; align-items: end; }
    .guide-intro .eyebrow { grid-column: 1 / -1; }
    .guide-intro h3 { margin-bottom: 0; }
    .legend { justify-content: flex-end; }
  }
  @media (max-width: 640px) {
    .disc-section { padding-top: 0; }
    .heading-grid { grid-template-columns: 1fr; gap: 22px; margin-top: 18px; }
    .section-intro { max-width: 390px; font-size: 14px; }
    .gallery { grid-template-columns: 1fr; margin-top: 29px; }
    .gallery-sidebar { padding: 18px 0; }
    .sidebar-label { margin-bottom: 12px; }
    .sheet-choices { display: flex; flex-wrap: wrap; gap: 6px; }
    .sheet-choice { display: flex; gap: 6px; width: auto; min-height: 44px; padding: 10px; }
    .sheet-title { font-size: 10px; }
    .sheet-number { font-size: 8px; }
    .sheet-arrow, .sidebar-note { display: none; }
    .disc-figure { border-left: 0; }
    .figure-topline { padding-left: 0; border-top: 1px solid var(--line, #d5d5c9); font-size: 9px; min-height: 50px; }
    .topline-divider { margin: 0 4px; }
    .expand-button { font-size: 9px; }
    .image-button { border-left: 1px solid var(--line, #d5d5c9); }
    .figure-caption { padding-left: 0; font-size: 9px; }
    .disc-guide { margin-top: 24px; padding-top: 26px; gap: 26px; }
    .guide-intro { display: block; }
    .guide-intro h3 { margin: 9px 0 18px; }
    .legend { justify-content: flex-start; }
    .guide-items { grid-template-columns: 1fr; gap: 18px; }
    .guide-items li { gap: 16px; }
    .guide-items h4 { margin-bottom: 3px; }
    .guide-items p { font-size: 12px; }
    .disc-viewer { width: calc(100vw - 20px); max-height: calc(100dvh - 20px); }
    .viewer-toolbar { padding: 15px; gap: 10px; }
    .viewer-toolbar h2 { font-size: 17px; }
    .viewer-toolbar .eyebrow { font-size: 7px; letter-spacing: .05em; }
    .viewer-actions { gap: 5px; }
    .size-button { font-size: 9px; padding: 6px 8px; }
    .close-button { width: 34px; }
    .viewer-hint { padding: 10px 15px; font-size: 9px; }
    .viewer-hint span { display: none; }
  }
  @media (prefers-reduced-motion: reduce) { .sheet-choice { transition: none; } }
</style>
