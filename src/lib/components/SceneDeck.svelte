<script lang="ts">
  import { onMount } from 'svelte';
  import SceneLocator from './SceneLocator.svelte';
  import type { Snippet } from 'svelte';
  import type { RadialScene } from '../charts/types';

  let { scenes, activeIndex, onchange, controls, children, view = 'disc' }: {
    scenes: RadialScene[];
    activeIndex: number;
    onchange: (index: number) => void;
    controls?: Snippet;
    view?: 'disc' | 'list';
    children: Snippet;
  } = $props();
  const scene = $derived(scenes[activeIndex]);
  const canChange = $derived(scenes.length > 1);
  const previousScene = $derived(scenes[(activeIndex - 1 + scenes.length) % scenes.length]);
  const nextScene = $derived(scenes[(activeIndex + 1) % scenes.length]);
  let deck: HTMLDivElement;
  let entered = $state(false);
  let direction = $state(1);
  let hasSwitched = $state(false);

  function move(step: number) {
    if (!canChange) return;
    direction = step;
    hasSwitched = true;
    onchange((activeIndex + step + scenes.length) % scenes.length);
  }

  onMount(() => {
    if (!('IntersectionObserver' in window)) { entered = true; return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        entered = true;
        observer.disconnect();
      }
    }, { threshold: .18 });
    observer.observe(deck);
    return () => observer.disconnect();
  });
</script>

<div class="scene-deck" bind:this={deck} class:entered role="region" aria-roledescription="carousel" aria-label="Hip-hop scenes">
  <header class="scene-title">
    <div class="scene-name" aria-live="polite" aria-atomic="true"><span class="scene-number">{String(activeIndex + 1).padStart(2, '0')}</span><h3>{scene.name}<span> / HIP-HOP</span></h3></div>
  </header>
  {@render controls?.()}
  <div class="deck-stage" class:disc-view={view === 'disc'} class:has-switched={hasSwitched} style:--direction={direction}>
    <button type="button" class="scene-arrow previous" disabled={!canChange} onclick={() => move(-1)} aria-label="Previous scene" title={canChange ? 'Previous scene: ' + previousScene.name : 'Previous scene'}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 5-7 7 7 7M7 12h14" /></svg>
    </button>
    {#key scene.id}<div class="platter-content">{@render children()}</div>{/key}
    <button type="button" class="scene-arrow next" disabled={!canChange} onclick={() => move(1)} aria-label="Next scene" title={canChange ? 'Next scene: ' + nextScene.name : 'Next scene'}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 5 7 7-7 7M17 12H3" /></svg>
    </button>
  </div>
  <div class="scene-context">
    <span class="scene-window">{scene.start.slice(0, 4)}—{scene.end.slice(0, 4)}</span>
    {#if scene.location}<SceneLocator location={scene.location} />{/if}
  </div>
</div>

<style>
  .scene-deck { min-width: 0; --scene-view-height: 520px; --scene-view-gap: 20px; --record-shift: 24px; }
  .scene-title { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 2px 20px 0; }
  .scene-name { display: flex; align-items: center; gap: 12px; }
  .scene-number { width: 30px; height: 30px; display: grid; place-items: center; border: 1px solid #26372b; background: #e9ff55; font-family: var(--font-display); font-size: 15px; font-weight: 400; }
  h3 { margin: 0; font-size: 20px; letter-spacing: -.055em; font-weight: 600; }
  h3 span { font-size: 8px; font-weight: 500; letter-spacing: .11em; margin-left: 6px; color: #62665d; }
  .scene-context { display: flex; align-items: center; justify-content: flex-end; gap: 14px; padding: 0 20px; }
  .scene-window { white-space: nowrap; font-size: 12px; font-variant-numeric: tabular-nums; color: #585e53; }
  .deck-stage { position: relative; isolation: isolate; padding: var(--scene-view-gap) 46px 0; }
  .platter-content { position: relative; z-index: 2; display: grid; grid-template-rows: minmax(0, 1fr); width: min(100%, 560px); height: var(--scene-view-height); margin: 0 auto; transform-origin: center; }
  .entered .platter-content { animation: settle 240ms cubic-bezier(.16, 1, .3, 1) both; }
  .disc-view.has-switched .platter-content { animation: record-cue 300ms cubic-bezier(.16, 1, .3, 1) both; }

  .scene-arrow { position: absolute; z-index: 4; top: calc(var(--scene-view-gap) + var(--scene-view-height) / 2); transform: translateY(-50%); width: 44px; height: 44px; border: 1px solid #26372b; border-radius: 50%; display: grid; place-items: center; padding: 11px; color: #26372b; background: #fffef8; transition: background 160ms, border-color 160ms, translate 160ms; }
  .previous { left: 0; }
  .next { right: 0; }
  .scene-arrow svg { width: 100%; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
  .scene-arrow:not(:disabled):hover { background: #edff36; border-color: #8b9d49; translate: 0 -2px; }
  .scene-arrow:disabled { color: #a2aa97; border-color: #dee3d6; background: transparent; cursor: default; }
  @keyframes settle {
    from { transform: translateY(6px); }
    to { transform: translateY(0); }
  }
  @keyframes record-cue {
    from { transform: translateX(calc(var(--direction) * var(--record-shift))) rotate(calc(var(--direction) * 2deg)); }
    to { transform: translateX(0) rotate(0); }
  }
  @media (max-width: 600px) {
    .scene-deck { --scene-view-height: 360px; --scene-view-gap: 12px; --record-shift: 14px; }
    .scene-title { padding: 0 8px 8px; }
    .scene-name { gap: 8px; }
    .scene-context { gap: 7px; padding-inline: 8px; }
    h3 { font-size: 19px; }
    h3 span { display: none; }
    .deck-stage { padding-inline: 0; padding-bottom: calc(74px + var(--scene-view-gap)); }

    .scene-arrow { top: auto; bottom: 17px; transform: none; }
    .previous { left: 8px; }
    .next { right: 8px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .entered .platter-content, .disc-view.has-switched .platter-content { animation: none; }
    .scene-arrow { transition: none; }
  }
</style>
