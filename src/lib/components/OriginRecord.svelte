<script lang="ts">
  import { onMount } from 'svelte';

  const grooves = Array.from({ length: 22 }, (_, index) => 100 + index * 6.3);
  let artwork: HTMLDivElement;
  let entered = $state(false);
  let inView = $state(false);

  onMount(() => {
    if (!('IntersectionObserver' in window)) { entered = true; inView = true; return; }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) entered = true;
    }, { threshold: 0.25 });
    observer.observe(artwork);
    return () => observer.disconnect();
  });
</script>

<div class="origin-record" class:entered class:in-view={inView} bind:this={artwork} aria-hidden="true">
  <svg viewBox="0 0 620 620" fill="none">
    <defs>
      <pattern id="origin-halftone" width="7" height="7" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#142018" />
      </pattern>
      <linearGradient id="origin-vinyl" x1="174" y1="50" x2="572" y2="503" gradientUnits="userSpaceOnUse">
        <stop stop-color="#344336" />
        <stop offset=".4" stop-color="#142018" />
        <stop offset="1" stop-color="#0b120d" />
      </linearGradient>
      <clipPath id="origin-sleeve-clip">
        <path d="M 44 214 L 447 204 L 453 558 L 50 568 Z" />
      </clipPath>
    </defs>

    <g class="vinyl">
      <circle cx="365" cy="273" r="240" fill="#142018" fill-opacity=".12" transform="translate(0 7)" />
      <g class="vinyl-disc">
        <circle cx="365" cy="273" r="240" fill="url(#origin-vinyl)" />
        <circle cx="365" cy="273" r="235" stroke="#64715a" stroke-opacity=".45" stroke-width="1.5" />
        {#each grooves as radius}
          <circle cx="365" cy="273" r={radius} stroke="#a7b89c" stroke-opacity=".19" stroke-width=".8" />
        {/each}
        <path d="M 365 273 L 255 60 A 240 240 0 0 1 415 38 Z" fill="#edf3dc" fill-opacity=".035" />
        <path d="M 365 273 L 580 378 A 240 240 0 0 1 501 471 Z" fill="#edf3dc" fill-opacity=".055" />
        <circle cx="365" cy="273" r="92" fill="#f15a29" />
        <circle cx="365" cy="273" r="82" stroke="#142018" stroke-opacity=".45" />
        <path d="M 280 253 H 450 V 293 H 280 Z" fill="#f4f1e7" />
        <circle cx="365" cy="273" r="22" fill="#142018" />
        <circle cx="365" cy="273" r="7" fill="#f4f1e7" />
        <path d="M 456 72 L 460 80 M 467 80 L 471 89 M 477 90 L 481 98" stroke="#f4f1e7" stroke-width="2" stroke-linecap="square" stroke-opacity=".55" />
      </g>
    </g>

    <g class="sleeve">
      <g transform="rotate(-8 248 387)">
        <path d="M 48 226 L 455 216 L 461 566 L 58 578 Z" fill="#142018" fill-opacity=".12" />
        <path d="M 44 214 L 447 204 L 453 558 L 50 568 Z" fill="#e9ff55" />
        <g clip-path="url(#origin-sleeve-clip)">
          <path d="M 22 446 L 248 401 L 304 588 H 18 Z" fill="url(#origin-halftone)" opacity=".2" />
          <path d="M 406 196 L 459 197 L 462 573 L 421 563 Z" fill="#142018" fill-opacity=".055" />
          <path d="M 48 238 L 71 236 M 424 535 L 448 533 M 119 562 L 161 560" stroke="#142018" stroke-opacity=".28" stroke-width="2" />
          <text x="69" y="390" textLength="340" lengthAdjust="spacingAndGlyphs" class="year">1973</text>
          <path d="M 75 415 C 159 409 276 408 410 401 L 405 410 C 301 413 190 417 81 421 Z" fill="#f15a29" />
          <text x="72" y="532" textLength="337" lengthAdjust="spacingAndGlyphs" class="place">BRONX</text>
        </g>
        <path d="M 49 215 L 444 205" stroke="#f4f1e7" stroke-opacity=".7" stroke-width="2" />
      </g>
    </g>
  </svg>
</div>

<style>
  .origin-record { position: relative; width: 100%; }
  svg { display: block; width: 100%; height: auto; overflow: visible; }
  .year { font: 400 173px var(--font-display, 'Anton', Impact, sans-serif); letter-spacing: -4px; fill: #142018; }
  .place { font: 400 88px var(--font-display, 'Anton', Impact, sans-serif); letter-spacing: -1px; fill: #142018; }
  .vinyl, .vinyl-disc { transform-box: view-box; transform-origin: 365px 273px; }
  .sleeve { transform-origin: 248px 387px; }
  .entered .vinyl { animation: scratch-settle 1.15s cubic-bezier(.22, .7, .3, 1) both; }
  .entered .vinyl-disc { animation: vinyl-spin 18s linear 1.15s infinite; animation-play-state: paused; }
  .entered.in-view .vinyl-disc { animation-play-state: running; }
  .entered .sleeve { animation: sleeve-settle .8s cubic-bezier(.22, .7, .3, 1) both; }
  @keyframes scratch-settle {
    0% { transform: translate(-16px, 18px) rotate(-13deg); }
    37% { transform: translate(2px, -2px) rotate(6deg); }
    62% { transform: translate(0, 0) rotate(-3deg); }
    82% { transform: rotate(1.5deg); }
    100% { transform: rotate(0); }
  }
  @keyframes vinyl-spin {
    from { transform: rotate(0); }
    to { transform: rotate(360deg); }
  }
  @keyframes sleeve-settle {
    from { transform: translate(8px, 10px) rotate(3deg); }
    to { transform: translate(0, 0) rotate(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .entered .vinyl, .entered .vinyl-disc, .entered .sleeve { animation: none; }
  }
</style>
