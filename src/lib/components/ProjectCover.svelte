<script lang="ts">
  let { src, sourceUrl, title }: { src: string; sourceUrl: string; title: string } = $props();
  let failed = $state(false);
</script>

<div class="project-cover">
  {#if failed}
    <div class="unavailable"><span>Cover unavailable</span><a href={sourceUrl} target="_blank" rel="noreferrer">View release ↗<span class="sr-only"> (opens in a new tab)</span></a></div>
  {:else}
    <a class="cover-link" href={sourceUrl} target="_blank" rel="noreferrer" aria-label={`View ${title} on its release page (opens in a new tab)`}>
      <img src={`${import.meta.env.BASE_URL}${src}`} alt={`${title} cover artwork`} width="600" height="600" decoding="async" onerror={() => (failed = true)} />
      <span class="open-cover" aria-hidden="true">↗</span>
    </a>
  {/if}
</div>

<style>
  .project-cover { aspect-ratio: 1; width: 100%; margin-bottom: 21px; background: #e2e8d9; border: 1px solid #192d2320; border-radius: 3px; overflow: hidden; box-shadow: 0 8px 16px -10px #15271f55; }
  .cover-link { display: block; position: relative; width: 100%; height: 100%; }
  img { display: block; width: 100%; height: 100%; aspect-ratio: 1; object-fit: contain; animation: cover-in 220ms ease-out; }
  .open-cover { position: absolute; right: 8px; bottom: 8px; display: grid; place-items: center; width: 27px; height: 27px; border-radius: 50%; background: #fafbf5ee; color: #173527; font-size: 16px; opacity: 0; transform: translateY(3px); transition: opacity 160ms, transform 160ms; }
  .cover-link:hover .open-cover, .cover-link:focus-visible .open-cover { opacity: 1; transform: translateY(0); }
  .cover-link:focus-visible { outline: 3px solid #42d6bb; outline-offset: -4px; }
  .unavailable { min-height: 100%; display: flex; flex-direction: column; gap: 12px; align-items: center; justify-content: center; color: #50604a; font-size: 11px; }
  .unavailable a { text-underline-offset: 3px; }
  @keyframes cover-in { from { opacity: .3; } to { opacity: 1; } }
  @media (max-width: 900px) { .project-cover { width: min(100%, 230px); } }
  @media (prefers-reduced-motion: reduce) { img { animation: none; } .open-cover { transition: none; } }
</style>
