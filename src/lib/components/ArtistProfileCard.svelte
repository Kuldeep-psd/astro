<script lang="ts">
  import type { Artist, ArtistProfile } from '../charts/types';

  let { artist, profile }: { artist: Artist; profile: ArtistProfile } = $props();
  let failedImage = $state('');
</script>

<div class="artist-profile" data-artist-profile={artist.id}>
  <div class="portrait">
    {#if failedImage === profile.image}
      <span class="photo-fallback" role="img" aria-label={`Photo unavailable for ${artist.name}`}>
        {artist.name.split(/\s+/).slice(0, 2).map(word => word[0]).join('')}
      </span>
    {:else}
      <img src={`${import.meta.env.BASE_URL}${profile.image}`} alt={artist.name} width="600" height="600" decoding="async" onerror={() => (failedImage = profile.image)} />
    {/if}
  </div>
  <div class="artist-copy">
    <h3>{artist.name}</h3>
    <p>{profile.bio}</p>
    <a class="music-link" href={profile.musicUrl} target="_blank" rel="noreferrer" aria-label={`Listen to ${artist.name} on ${profile.platform} (opens in a new tab)`}>
      {profile.platform} <span aria-hidden="true">↗</span>
    </a>
  </div>
</div>

<style>
  .artist-profile { animation: artist-in 220ms ease-out both; }
  .portrait { width: 100%; aspect-ratio: 1; margin-bottom: 18px; overflow: hidden; border: 1px solid #192d2320; border-radius: 3px; background: #e2e8d9; box-shadow: 0 8px 16px -10px #15271f55; }
  img { display: block; width: 100%; height: 100%; object-fit: contain; }
  .photo-fallback { display: grid; place-items: center; width: 100%; height: 100%; font-family: 'Barlow Condensed', Impact, sans-serif; font-size: 64px; font-weight: 600; color: #61715e; }
  h3 { margin: 0; font-family: 'Barlow Condensed', Impact, sans-serif; font-size: 38px; line-height: 1; text-transform: uppercase; font-weight: 600; letter-spacing: -.02em; overflow-wrap: anywhere; color: #1e3025; }
  p { margin: 13px 0 0; color: #606958; font-size: 11px; line-height: 1.7; }
  .music-link { display: inline-flex; align-items: center; gap: 7px; margin-top: 13px; min-height: 36px; color: #276242; font-size: 11px; text-underline-offset: 3px; }
  .music-link:hover { color: #1e3025; }
  .music-link:focus-visible { outline: 2px solid #166b50; outline-offset: 4px; }
  @keyframes artist-in { from { opacity: .3; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  @media (min-width: 601px) and (max-width: 900px) {
    .artist-profile { display: grid; grid-template-columns: minmax(0, 180px) 1fr; gap: 22px; align-items: center; }
    .portrait { margin: 0; }
    .artist-copy { min-width: 0; }
  }
  @media (max-width: 600px) { .portrait { width: min(100%, 230px); } }
  @media (prefers-reduced-motion: reduce) { .artist-profile { animation: none; } }
</style>
