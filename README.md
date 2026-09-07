# Rise of HipHop

A focused Svelte 5 + TypeScript app for the Rise of HipHop visual narrative. Vite handles local development and static builds.

## Run

Use Node 20.19+ or 22.12+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. The server binds to this computer only and reports an error if that port is already occupied.

## Check and build

```sh
npm run check
npm test
npm run build
```

The static output is in `dist/`. Stop the dev server before running `npm run preview`, which uses the same port. To build for a subdirectory, run `npm run build -- --base=/your-path/`. No API keys or environment variables are needed.

## Where to work

- `src/lib/data/story.ts` — the current four narrative chapters. Replace this copy with the new draft.
- `src/lib/data/discs.ts` — scene sheet titles, descriptions, and image references.
- `src/lib/components/DiscGallery.svelte` — scene selector, reading guide, and full-size viewer.
- `src/App.svelte` — page composition.
- `src/app.css` — the visual foundation and responsive layout.
- `public/assets/` — the preserved original images.
- `docs/original-narrative.md` — unchanged source narrative, including its graph reference.
- `docs/content-guide.md` — notes for the next narrative pass.
- `docs/preserved-assets.json` — original image checksums checked by `npm test`.

## Migration

The Astro portfolio, unrelated projects, old layouts, Spotify API example, and Astro deployment workflow have been removed from the working app. They remain in Git history. This app opens directly on Rise of HipHop.

All seven hip-hop chart/map/disc assets are preserved byte for byte. The three circular infographic sheets are the main interactive gallery; they are images, not reconstructed datasets. The source chart is retained but is not presented as a verified new dataset. The next data narrative can be written independently of the components.

Fonts are bundled locally. There is no remote font dependency, scroll hijacking, autoplay, or third-party animation runtime. The CI workflow checks types/accessibility diagnostics, image preservation, and the production build. It does not publish the site.

## Vercel

The linked Vercel project uses the Vite preset, `npm ci`, `npm run build`, and the `dist/` output directory. These settings are versioned in `vercel.json`. The former `/work/nested/rise-of-hiphop` and `/hiphop` links redirect to the new home page.
