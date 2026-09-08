<script lang="ts">
  import { onMount } from 'svelte';
  import { throwupzPaths } from '../marks/throwupz-wordmark';

  const id = $props.id();
  let titleLink: HTMLAnchorElement;
  let inView = $state(false);
  let documentVisible = $state(false);
  let reducedMotion = $state(true);
  let driftX = $state(0);
  let driftY = $state(0);
  const moving = $derived(inView && documentVisible && !reducedMotion);

  function resetDrift() {
    driftX = 0;
    driftY = 0;
  }

  function followPointer(event: PointerEvent) {
    if (!moving || event.pointerType === 'touch') return;
    const box = titleLink.getBoundingClientRect();
    driftX = Math.max(-3, Math.min(3, ((event.clientX - box.left) / box.width - 0.5) * 6));
    driftY = Math.max(-3, Math.min(3, ((event.clientY - box.top) / box.height - 0.5) * 6));
  }

  onMount(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      reducedMotion = preference.matches;
      if (reducedMotion) resetDrift();
    };
    const updateVisibility = () => {
      documentVisible = document.visibilityState === 'visible';
      if (!documentVisible) resetDrift();
    };
    updatePreference();
    updateVisibility();
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updateVisibility);

    let observer: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) resetDrift();
      }, { threshold: 0.08 });
      observer.observe(titleLink);
    } else {
      inView = true;
    }

    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  });
</script>

<a
  class="title-link"
  class:moving
  class:reduced-motion={reducedMotion}
  href="#scenes"
  aria-label="Rise of HipHop — explore the records"
  bind:this={titleLink}
  onpointermove={followPointer}
  onpointerleave={resetDrift}
  onpointercancel={resetDrift}
  style:--drift-x={driftX + 'px'}
  style:--drift-y={driftY + 'px'}
>
  <span class="title-text">Rise of HipHop</span>
  <svg viewBox="0 0 700 380" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <g id={id + '-letters'}>
        {#each throwupzPaths as path}
          <path d={path} />
        {/each}
      </g>
      <clipPath id={id + '-orange-slices'} clipPathUnits="userSpaceOnUse">
        <rect x="0" y="64" width="700" height="24" />
        <rect x="0" y="138" width="700" height="14" />
        <rect x="0" y="267" width="700" height="32" />
      </clipPath>
      <clipPath id={id + '-teal-slices'} clipPathUnits="userSpaceOnUse">
        <rect x="0" y="105" width="700" height="13" />
        <rect x="0" y="216" width="700" height="28" />
        <rect x="0" y="322" width="700" height="17" />
      </clipPath>
    </defs>

    <g class="lettering">
      <use href={'#' + id + '-letters'} class="ink" />
      <g clip-path={'url(#' + id + '-orange-slices)'}>
        <use href={'#' + id + '-letters'} class="glitch-fragment orange" />
      </g>
      <g clip-path={'url(#' + id + '-teal-slices)'}>
        <use href={'#' + id + '-letters'} class="glitch-fragment teal" />
      </g>
    </g>
  </svg>
</a>

<style>
  .title-link {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 700 / 380;
    color: var(--ink, #142018);
    text-decoration: none;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }
  .title-link:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 6px;
  }
  .title-text {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
  svg { display: block; width: 100%; height: auto; }
  .lettering {
    transform: translate(var(--drift-x, 0px), var(--drift-y, 0px));
    transition: transform 180ms ease-out;
  }
  .ink { fill: currentColor; }
  .glitch-fragment { opacity: 0; animation-play-state: paused; }
  .orange { fill: #f15a29; animation: orange-loop 6.8s steps(1, end) infinite paused; }
  .teal { fill: #00cfc1; animation: teal-loop 6.8s steps(1, end) infinite paused; }
  .moving .glitch-fragment { animation-play-state: running; }
  .title-link.moving:is(:hover, :focus-visible) .orange { animation-name: orange-burst; animation-duration: 620ms; animation-iteration-count: 1; animation-fill-mode: both; }
  .title-link.moving:is(:hover, :focus-visible) .teal { animation-name: teal-burst; animation-duration: 620ms; animation-iteration-count: 1; animation-fill-mode: both; }

  @keyframes orange-loop {
    0%, 91%, 98%, 100% { opacity: 0; transform: translate(0); }
    92% { opacity: .85; transform: translate(-7px, 1px); }
    93.5% { opacity: .7; transform: translate(5px, 0); }
    95% { opacity: .85; transform: translate(-3px, -1px); }
    96.5% { opacity: .55; transform: translate(6px, 0); }
  }
  @keyframes teal-loop {
    0%, 92%, 99%, 100% { opacity: 0; transform: translate(0); }
    93% { opacity: .8; transform: translate(7px, -1px); }
    94.5% { opacity: .7; transform: translate(-4px, 0); }
    96% { opacity: .85; transform: translate(5px, 1px); }
    97.5% { opacity: .5; transform: translate(-2px, 0); }
  }
  @keyframes orange-burst {
    0% { opacity: .9; transform: translate(-9px, 1px); }
    16% { opacity: .75; transform: translate(6px, 0); }
    34% { opacity: .9; transform: translate(-5px, -1px); }
    53% { opacity: .7; transform: translate(9px, 0); }
    74% { opacity: .6; transform: translate(-3px, 1px); }
    100% { opacity: 0; transform: translate(0); }
  }
  @keyframes teal-burst {
    0% { opacity: .85; transform: translate(8px, -1px); }
    20% { opacity: .7; transform: translate(-7px, 0); }
    39% { opacity: .9; transform: translate(4px, 1px); }
    58% { opacity: .75; transform: translate(-8px, 0); }
    78% { opacity: .55; transform: translate(3px, -1px); }
    100% { opacity: 0; transform: translate(0); }
  }

  .title-link:not(.moving) .lettering { transition: none; }
  .reduced-motion .lettering { transform: none; transition: none; }
  .reduced-motion .glitch-fragment { animation: none; }
  @media (prefers-reduced-motion: reduce) {
    .lettering { transform: none; transition: none; }
    .title-link .glitch-fragment { animation: none; }
  }
</style>
