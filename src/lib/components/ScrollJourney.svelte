<script lang="ts">
  import { onMount } from 'svelte';
  import WorldSpreadMap from './WorldSpreadMap.svelte';
  import { chapters } from '../data/story';
  import { storyStepAt, storyViewport } from '../charts/story-progress.js';

  let container: HTMLDivElement;
  let visual: HTMLDivElement;
  let activeStep = $state(0);
  let reducedMotion = $state(false);
  let anchorMargin = $state(0);

  onMount(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => { reducedMotion = motion.matches; };
    updateMotion();
    motion.addEventListener('change', updateMotion);
    const steps = [...container.querySelectorAll<HTMLElement>('[data-story-step]')];
    let frame = 0;
    const measure = () => {
      frame = 0;
      const viewport = storyViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        mapHeight: visual.getBoundingClientRect().height,
        stickyTop: parseFloat(getComputedStyle(visual).top) || 0,
        scrollPadding: parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0,
      });
      anchorMargin = viewport.anchorMargin;
      activeStep = storyStepAt(steps.map(step => step.getBoundingClientRect().top), viewport.readingLine);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    resizeObserver?.observe(visual);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', updateMotion);
      window.cancelAnimationFrame(frame);
    };
  });
</script>

<section class="journey" id="story" aria-labelledby="journey-title">
  <div class="journey-opening page-width">
    <p class="eyebrow"><span>01</span> / THE CONNECTIONS</p>
    <h2 id="journey-title"><span>The sound travels.</span><em>The story changes.</em></h2>
    <p>Records, films and people carried it.<br />Each new scene gave it another voice.</p>
  </div>
  <div class="journey-grid page-width" bind:this={container} style:--story-anchor-margin={anchorMargin + "px"}>
    <div class="map-sticky" bind:this={visual}>
      <div class="map-dateline"><span>{chapters[activeStep].period}</span><p>{chapters[activeStep].place}</p></div>
      <WorldSpreadMap {activeStep} {reducedMotion} />
      <nav class="map-progress" aria-label="Explore the journey">
        {#each chapters as chapter, index}
          <a href={"#" + chapter.id} aria-label={chapter.period + ": " + chapter.title} aria-current={index === activeStep ? 'step' : undefined} onclick={() => { activeStep = index; }}><span></span><small>{String(index + 1).padStart(2, '0')}</small></a>
        {/each}
      </nav>
    </div>
    <div class="journey-steps">
      {#each chapters as chapter, index}
        <article class="story-step" class:active={index === activeStep} id={chapter.id} data-story-step={index} aria-labelledby={"title-" + chapter.id}>
          <p class="step-kicker"><span>{String(index + 1).padStart(2, '0')}</span>{chapter.label}</p>
          <h3 id={"title-" + chapter.id}>{chapter.title}</h3>
          <p class="step-copy">{chapter.copy}</p>
          <p class="step-detail">{chapter.detail}</p>
        </article>
      {/each}
    </div>
  </div>
  <div class="journey-end page-width"><span>THE FORM TRAVELS.</span><span>THE VOICE BECOMES LOCAL.</span><span aria-hidden="true">↓</span></div>
</section>

<style>
  .journey { position: relative; color: #f4f1e7; background: #14271f; padding-top: 88px; scroll-margin-top: 0; border-top: 5px solid #142018; }
  .journey::before { content: ''; position: absolute; top: 0; right: 0; width: min(25vw, 320px); height: 155px; background: radial-gradient(#b6c49d 1px, transparent 1.5px) 0 0 / 7px 7px; opacity: .12; mask-image: linear-gradient(135deg, transparent 10%, #000); pointer-events: none; }
  .journey-opening { position: relative; display: grid; grid-template-columns: 1.7fr 1fr; gap: 26px; align-items: end; padding-bottom: 35px; }
  .journey-opening .eyebrow { grid-column: 1 / -1; display: flex; align-items: center; gap: 12px; color: #d3ddc9; }
  .journey-opening .eyebrow span { display: inline-grid; place-items: center; width: 34px; height: 28px; background: #f15a29; color: #142018; font-family: var(--font-display, 'Barlow Condensed'), sans-serif; font-size: 17px; font-weight: 400; letter-spacing: 0; transform: rotate(-4deg); }
  .journey-opening h2 { font-family: var(--font-display, 'Barlow Condensed'), Impact, sans-serif; font-size: clamp(42px, 5.6vw, 79px); line-height: 1.05; font-weight: 400; letter-spacing: -.012em; text-transform: uppercase; }
  .journey-opening h2 > span { display: block; }
  .journey-opening h2 em { display: block; width: fit-content; margin-top: 11px; color: #e9ff55; font-family: var(--font-mark, 'Barlow Condensed'), sans-serif; font-size: .56em; line-height: 1.3; font-weight: 400; font-style: normal; letter-spacing: -.025em; text-transform: none; transform: rotate(-2deg); }
  .journey-opening > p:last-child { justify-self: end; font-size: 14px; line-height: 1.75; color: #c1ceba; padding: 0 0 3px 16px; border-left: 3px solid #f15a29; }
  .journey-grid { display: grid; grid-template-columns: minmax(0, 1.9fr) minmax(250px, 1fr); gap: 60px; align-items: start; }
  .map-sticky { position: sticky; top: 12px; height: calc(100svh - 34px); max-height: 900px; min-height: 460px; display: flex; flex-direction: column; justify-content: center; min-width: 0; container-type: inline-size; }
  .map-dateline { display: flex; align-items: baseline; justify-content: space-between; gap: 18px; margin-bottom: 24px; border-bottom: 2px solid #526650; padding-bottom: 18px; }
  .map-dateline > span { font-family: var(--font-display, 'Barlow Condensed'), Impact, sans-serif; font-weight: 400; font-size: clamp(40px, 5.1vw, 72px); letter-spacing: -.02em; line-height: 1; white-space: nowrap; flex-shrink: 0; color: #e9ff55; }
  .map-dateline p { color: #d1dac5; font-size: 10px; font-weight: 600; letter-spacing: .04em; text-align: right; line-height: 1.4; white-space: nowrap; flex-shrink: 0; }
  .map-progress { display: flex; gap: 11px; margin-top: 30px; }
  .map-progress a { position: relative; display: flex; gap: 9px; align-items: center; justify-content: center; min-width: 61px; min-height: 38px; text-decoration: none; padding: 7px 9px; color: #bacaaf; border: 1px solid #526650; transition: background 180ms, color 180ms, border-color 180ms; }
  .map-progress a:hover { color: #f4f1e7; border-color: #d1dac5; }
  .map-progress span { display: block; width: 16px; height: 3px; background: currentColor; }
  .map-progress small { font-family: var(--font-display, 'Barlow Condensed'), sans-serif; font-size: 16px; font-weight: 400; }
  .map-progress a[aria-current='step'] { color: #142018; background: #e9ff55; border-color: #e9ff55; box-shadow: 3px 3px 0 #08140e; }
  .story-step { min-height: 76svh; display: flex; flex-direction: column; justify-content: center; padding: 100px 0; scroll-margin-top: var(--story-anchor-margin, 22svh); }
  .story-step:first-child { min-height: calc(100svh - 16px); }
  .story-step:last-child { padding-bottom: 150px; }
  .step-kicker { display: flex; gap: 15px; align-items: center; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .11em; color: #bccdb2; margin-bottom: 24px; }
  .step-kicker span { display: grid; place-items: center; flex-shrink: 0; width: 40px; height: 35px; border: 1px solid #6d805f; font-family: var(--font-display, 'Barlow Condensed'), sans-serif; font-size: 22px; font-weight: 400; letter-spacing: 0; transform: rotate(-4deg); clip-path: polygon(0 0, 100% 0, 100% 83%, 84% 100%, 0 100%); }
  .story-step.active .step-kicker span { background: #f15a29; color: #142018; border-color: #f15a29; animation: stamp-in 300ms cubic-bezier(.2, .7, .2, 1) both; }
  .story-step h3 { font-family: var(--font-display, 'Barlow Condensed'), Impact, sans-serif; font-size: clamp(34px, 3.6vw, 51px); line-height: 1.07; font-weight: 400; letter-spacing: -.008em; text-transform: uppercase; max-width: 14ch; }
  .story-step.active h3 { animation: headline-in 340ms cubic-bezier(.2, .7, .2, 1) both; }
  .step-copy { font-size: 15px; line-height: 1.8; color: #e1e8d9; margin-top: 25px; }
  .step-detail { color: #b2c4af; font-size: 12px; line-height: 1.8; margin-top: 16px; }
  .journey-end { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding-block: 28px; border-top: 2px solid #53664f; font-family: var(--font-display, 'Barlow Condensed'), Impact, sans-serif; font-size: clamp(17px, 2.4vw, 31px); line-height: 1.1; letter-spacing: .015em; color: #f4f1e7; }
  .journey-end span:nth-child(2) { color: #e9ff55; }
  .journey-end span:last-child { display: grid; place-items: center; flex-shrink: 0; width: 38px; height: 40px; background: #f15a29; color: #142018; font-family: 'DM Sans', sans-serif; font-size: 28px; transform: rotate(5deg); }
  @keyframes headline-in { from { opacity: .4; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes stamp-in { from { opacity: .5; transform: rotate(3deg) scale(1.08); } to { opacity: 1; transform: rotate(-4deg) scale(1); } }
  @media (max-width: 1050px) { .journey-grid { gap: 30px; grid-template-columns: minmax(0, 1.55fr) minmax(240px, 1fr); } .step-copy { font-size: 14px; } }
  @media (max-width: 760px) {
    .journey { padding-top: 48px; }
    .journey-opening { grid-template-columns: 1fr; gap: 21px; padding-bottom: 30px; }
    .journey-opening h2 { font-size: clamp(37px, 9vw, 65px); }
    .journey-opening > p:last-child { justify-self: start; font-size: 12px; }
    .journey-grid { display: block; }
    .map-sticky { top: 0; height: auto; min-height: 0; padding: 15px 0 9px; background: #14271f; z-index: 2; box-shadow: 0 14px 20px #14271f; }
    .map-dateline { margin-bottom: 8px; padding-bottom: 9px; }
    .map-dateline > span { font-size: 34px; }
    .map-dateline p { font-size: 9px; }
    .map-progress { gap: 10px; margin-top: 8px; }
    .map-progress a { min-width: 53px; min-height: 32px; padding-block: 4px; }
    .map-progress span { width: 13px; }
    .map-progress small { font-size: 15px; }
    .story-step, .story-step:first-child { min-height: 70svh; padding: 65px 10px 90px; }
    .story-step:last-child { padding-bottom: 100px; }
    .story-step h3 { font-size: 39px; max-width: 15ch; }
    .step-kicker { margin-bottom: 18px; }
    .step-copy { max-width: 42ch; font-size: 15px; margin-top: 20px; }
    .step-detail { max-width: 50ch; }
    .journey-end { gap: 14px; font-size: clamp(14px, 3.3vw, 23px); letter-spacing: 0; }
    .journey-end span:last-child { width: 29px; height: 33px; font-size: 23px; }
  }
  @media (max-height: 600px) {
    .map-sticky { min-height: 0; }
    .map-dateline { margin-bottom: 7px; padding-bottom: 9px; }
    .map-dateline > span { font-size: 32px; }
    .map-dateline p { font-size: 8px; }
    .map-sticky :global(.spread-map svg) { max-height: max(105px, calc(100svh - 160px)); }
    .map-progress { margin-top: 4px; }
    .map-progress a { min-height: 24px; padding-block: 3px; }
    .map-progress small { font-size: 14px; }
  }
  @media (min-width: 600px) and (max-width: 760px) and (max-height: 600px) {
    .journey-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 24px; }
    .map-sticky { top: 7px; height: calc(100svh - 22px); padding: 0; box-shadow: none; }
    .story-step, .story-step:first-child { min-height: 100svh; padding: 70px 0; }
    .story-step h3 { font-size: 28px; }
    .step-copy { font-size: 13px; }
    .step-detail { font-size: 11px; }
  }
  @container (max-width: 400px) {
    .map-dateline { display: grid; grid-template-columns: minmax(0, 1fr); row-gap: 7px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .map-progress a { transition: none; }
    .story-step.active h3, .story-step.active .step-kicker span { animation: none; }
  }
</style>
