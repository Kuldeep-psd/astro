<script lang="ts">
  import type { RadialScene, SceneProfile } from '../charts/types';

  let { scene, profile }: { scene: RadialScene; profile: SceneProfile } = $props();
  let failedImage = $state('');
</script>

<div class="scene-profile" data-scene-profile={scene.id}>
  <div class="scene-photo">
    {#if failedImage === profile.image}
      <span class="photo-fallback" role="img" aria-label={`Photo unavailable for ${scene.name}`}>
        {scene.name}
      </span>
    {:else}
      <img src={`${import.meta.env.BASE_URL}${profile.image}`} alt={profile.imageAlt} width="800" height="600" loading="lazy" decoding="async" onerror={() => (failedImage = profile.image)} />
    {/if}
  </div>
  <div class="scene-copy">
    <h3>{scene.name} hip-hop</h3>
    <p>{profile.bio}</p>
  </div>
</div>

<style>
  .scene-profile { animation: scene-in 220ms ease-out both; }
  .scene-photo { width: 100%; aspect-ratio: 4 / 3; margin-bottom: 18px; overflow: hidden; border: 1px solid #192d2320; border-radius: 3px; background: #e2e8d9; box-shadow: 0 8px 16px -10px #15271f55; }
  img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .photo-fallback { display: grid; place-items: center; width: 100%; height: 100%; font-family: 'Barlow Condensed', Impact, sans-serif; font-size: 38px; font-weight: 600; text-transform: uppercase; color: #61715e; }
  h3 { margin: 0; font-family: 'Barlow Condensed', Impact, sans-serif; font-size: 38px; line-height: 1; text-transform: uppercase; font-weight: 600; letter-spacing: -.02em; overflow-wrap: anywhere; color: #1e3025; }
  p { margin: 13px 0 0; color: #606958; font-size: 11px; line-height: 1.7; }
  @keyframes scene-in { from { opacity: .3; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  @media (min-width: 601px) and (max-width: 900px) {
    .scene-profile { display: grid; grid-template-columns: minmax(0, 200px) 1fr; gap: 22px; align-items: center; }
    .scene-photo { margin: 0; }
    .scene-copy { min-width: 0; }
  }
  @media (max-width: 600px) { .scene-photo { max-width: 320px; } }
  @media (prefers-reduced-motion: reduce) { .scene-profile { animation: none; } }
</style>
