<script lang="ts">
  import DiscGallery from './lib/components/DiscGallery.svelte';
  import { chapters } from './lib/data/story';
  const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
</script>

<a class="skip-link" href="#main">Skip to the story</a>

<header class="site-header">
  <a class="wordmark" href="#top" aria-label="Rise of HipHop, back to top">
    <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="currentColor"/><circle cx="20" cy="20" r="13" fill="none" stroke="var(--paper)" stroke-width=".7"/><circle cx="20" cy="20" r="7" fill="var(--accent)"/><circle cx="20" cy="20" r="2" fill="var(--paper)"/></svg>
    <span>RISE OF<br />HIPHOP</span>
  </a>
  <nav aria-label="Main navigation">
    <a href="#story">The story</a>
    <a href="#scenes">The scenes</a>
    <a href="#reading-discs">Reading the discs <span aria-hidden="true">↗</span></a>
  </nav>
  <span class="header-note">A VISUAL EXPLORATION</span>
</header>

<main id="main">
  <section class="hero page-width" id="top" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow"><span class="small-rule"></span> FROM THE BRONX TO EVERY BLOCK</p>
      <h1 id="hero-title">RISE OF<br /><span>HIP-HOP.</span></h1>
      <p class="hero-description">Born in the streets. Carried across borders.<br class="desktop-break" /> Made local, everywhere.</p>
      <p class="hero-detail">Follow a culture in constant motion through the sounds, scenes, and records that gave it a voice.</p>
      <a class="primary-link" href="#scenes">Explore the scenes <span aria-hidden="true">↘</span></a>
    </div>
    <div class="hero-art">
      <div class="sleeve-note"><span>THE RECORD TELLS A STORY</span><span aria-hidden="true">↙</span></div>
      <a href="#scenes" class="record-sleeve" aria-label="Explore the original Bombay and Punjabi hip-hop disc infographics">
        <div class="sleeve-header"><span>THE SCENE COLLECTION</span><span>VOL. 01</span></div>
        <img src={asset('city3.jpg')} alt="Circular disc infographics for Bombay and Punjabi hip-hop, showing artists and releases around coloured rings." width="1707" height="1161" fetchpriority="high" />
        <div class="sleeve-footer"><span>BOMBAY / PUNJABI</span><span>ARTISTS · RECORDS · ROOTS</span></div>
      </a>
      <p class="art-caption"><span class="accent-dot"></span> Many scenes. A shared language.</p>
    </div>
  </section>

  <div class="chapter-band">
    <div class="chapter-index page-width" aria-label="Story chapters">
      {#each chapters as chapter}
        <a href={`#${chapter.id}`}>
          <span class="chapter-no">{chapter.number}</span>
          <span><small>{chapter.period}</small><strong>{chapter.title}</strong></span>
          <span class="index-arrow" aria-hidden="true">↗</span>
        </a>
      {/each}
    </div>
  </div>

  <div class="page-width gallery-wrap"><DiscGallery /></div>

  <section id="story" class="story page-width" aria-labelledby="story-title">
    <div class="story-heading">
      <p class="eyebrow">SIDE B / THE STORY</p>
      <h2 id="story-title">One culture.<br /><em>Countless voices.</em></h2>
      <p>A journey from the first block parties to the scenes that made the sound their own.</p>
    </div>
    {#each chapters as chapter}
      <article id={chapter.id} class="story-chapter" aria-labelledby={`title-${chapter.id}`}>
        <div class="chapter-meta"><span>{chapter.number}</span><p>{chapter.period}</p></div>
        <div class="chapter-content">
          <div class="chapter-text">
            <h3 id={`title-${chapter.id}`}>{chapter.title}</h3>
            <p class="chapter-intro">{chapter.intro}</p>
            {#each chapter.paragraphs as paragraph}<p>{paragraph}</p>{/each}
          </div>
          {#if chapter.image}
            <figure class:india-map={chapter.id === 'india'}>
              <a href={chapter.image.src} target="_blank" rel="noreferrer" aria-label={`Open ${chapter.image.alt} in a new tab`}>
                <img src={chapter.image.src} alt={chapter.image.alt} loading="lazy" />
              </a>
              <figcaption>{chapter.image.caption} <a href={chapter.image.src} target="_blank" rel="noreferrer">View full image <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></figcaption>
            </figure>
          {/if}
        </div>
      </article>
    {/each}
  </section>

  <section class="closing page-width" aria-label="The story continues">
    <p class="eyebrow">THE STORY KEEPS SPINNING</p>
    <p class="closing-title">Same roots.<br /><em>Different voices.</em></p>
    <a class="text-link" href="#scenes">Back to the records <span aria-hidden="true">↑</span></a>
  </section>
</main>

<footer class="site-footer page-width">
  <span>RISE OF HIPHOP</span>
  <p>A visual narrative by Kuldeep Singh</p>
  <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
</footer>
