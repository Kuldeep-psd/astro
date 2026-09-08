<script lang="ts">
  import OriginRecord from './lib/components/OriginRecord.svelte';
  import GlitchTitle from './lib/components/GlitchTitle.svelte';
  import ScrollJourney from './lib/components/ScrollJourney.svelte';
  import DiscStudy from './lib/components/DiscStudy.svelte';
  import { storySources } from './lib/data/story';
  import { scenePhotoCredits } from './lib/data/scene-profiles';
</script>

<a class="skip-link" href="#main">Skip to the story</a>

<main id="main">
  <section class="hero page-width" id="top" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow">FROM THE BRONX TO SOUTH ASIA</p>
      <h1 id="hero-title"><GlitchTitle /></h1>
      <p class="hero-description"><span>A local sound.</span><br />A world of different voices.</p>
      <p class="hero-detail">Follow the connections that carried hip-hop across borders. Then get closer to the artists and records that made it their own.</p>
      <a class="story-link" href="#story">Follow the story <span aria-hidden="true">↓</span></a>
    </div>
    <div class="hero-art"><OriginRecord /></div>
    <div class="hero-baseline"><span>A VISUAL NARRATIVE BY KULDEEP SINGH</span><a href="#scenes">Go straight to the records <span aria-hidden="true">↗</span></a></div>
  </section>

  <ScrollJourney />

  <div class="collection-stage page-width"><DiscStudy /></div>

  <section class="story-references page-width" id="sources" aria-label="Story sources">
    <details>
      <summary>Story sources <span aria-hidden="true">+</span></summary>
      <div class="source-intro"><p>The map follows selected milestones in hip-hop’s circulation. Its arrows connect documented exchanges and related scenes; they do not show a complete history or literal travel routes. The Karachi arrow links the scene to hip-hop’s New York roots schematically, rather than asserting a documented direct journey.</p><p>The records are a curated selection through 2024. Release dates, format decisions and artist anchors are documented with the collection above.</p></div>
      <ol>{#each storySources as source}<li id={"source-" + source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<span aria-hidden="true"> ↗</span><span class="sr-only"> (opens in a new tab)</span></a></li>{/each}</ol>
      <p class="map-credit">Map geometry: <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noreferrer">Natural Earth, public domain ↗</a>.</p>
      <p class="map-credit">MC Kash portrait: <a href="https://commons.wikimedia.org/wiki/File:TM202403122.jpg" target="_blank" rel="noreferrer">Wani Moomin / Wikimedia Commons ↗</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0 ↗</a>. Resized for display.</p>
      <p class="map-credit">Scene photographs are resized and cropped for display. Images retain their respective Creative Commons licences.</p>
      <ol>{#each scenePhotoCredits as photo}<li><a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.title} — {photo.author}</a> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></li>{/each}</ol>
    </details>
  </section>
</main>

<footer class="site-footer page-width"><a class="footer-name" href="#top">RISE OF HIPHOP</a><p>A visual narrative by Kuldeep Singh</p><a href="#top">Back to top <span aria-hidden="true">↑</span></a></footer>
