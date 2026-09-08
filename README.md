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

- `src/lib/data/story.ts` — four concise, source-linked historical chapters and their references.
- `src/lib/data/{bombay,punjabi,delhi,urdu,pune,goa,amd,koshur}.ts` — eight reconstructed, source-linked scene datasets.
- `src/lib/components/RadialDisc.svelte` — reusable SVG radial timeline; black artist rings and names activate artist filters, while coloured project bands open release details. The centre label returns to All artists and the scene overview. Geometry is generated from sourced data.
- `src/lib/components/DiscStudy.svelte` — turntable section, filters, release list, and source details.
- `src/lib/components/ArtistProfileCard.svelte` — compact artist portrait, one-sentence bio, and a direct music-profile link, opened from artist filters or the artist name in project details.
- `src/lib/data/artist-profiles.ts` — all 29 sourced artist profiles; portrait and bio provenance is kept in `docs/artist-profiles-*.json`.
- `src/lib/components/SceneProfileCard.svelte` — the All artists overview for each scene, with a local photograph and a short biography.
- `src/lib/data/scene-profiles.ts` and `scene-bios.ts` — all eight scene introductions; sources and photo licences are in `docs/scene-bio-sources.json` and `docs/scene-photos-*.json`, with photo attribution in the final source section.
- `src/lib/components/SceneLocator.svelte` — muted location map; sourced scene coordinates use the India or Pakistan outline and projection in `src/lib/maps/`.
- `src/lib/components/SceneDeck.svelte` — shared fixed-size Disc/Release list area and previous/next arrows that wrap through the collection. A single live disc settles briefly into place on a switch, with no overlapping record copies; reduced-motion preferences keep it static.
- `src/lib/data/artwork.ts` — local cover images matched to every project; catalog provenance is in `docs/project-artwork.json`.
- `src/lib/components/ProjectCover.svelte` — selected release artwork with a link to the catalog and an image-error fallback.
- `src/lib/data/scenes.ts` — eight registered scenes in original sheet order.
- `src/lib/charts/` — UTC geometry, overlap layout, scene validation, and types.
- `docs/scene-collection.md` — collection scope, dates, exceptions, and research notes.
- `docs/bombay-disc-study.md` — original reconstruction analysis and geometry.
- `src/lib/components/ScrollJourney.svelte` — native scrolling, sticky map and chapter navigation.
- `src/lib/components/WorldSpreadMap.svelte` — four sequential geographic stages, with static reduced-motion states.
- `src/lib/maps/world-outline.ts` — simplified Natural Earth country paths and projection metadata.
- `src/lib/components/OriginRecord.svelte` — code-drawn opening record graphic.
- `src/App.svelte` — page composition.
- `src/app.css` — the visual foundation and responsive layout.
- `public/assets/` — the preserved original images.
- `docs/original-narrative.md` — unchanged source narrative, including its graph reference.
- `docs/content-guide.md` — current narrative structure, source policy and editing notes.
- `docs/preserved-assets.json` — original image checksums checked by `npm test`.

## Migration

The Astro portfolio, unrelated projects, old layouts, Spotify API example, and Astro deployment workflow have been removed from the working app. They remain in Git history. This app opens directly on Rise of HipHop.

All seven hip-hop chart/map/disc assets are preserved byte for byte. All eight original scenes are reconstructed in SVG from sourced releases. Artist lanes share a continuous UTC time scale; project bands follow release order, with fixed display widths and gaps for easier selection; exact dates are shown in details and the release list. The original infographic sheets, large India map and world-map bitmaps are no longer rendered. The page progresses from a new opening record graphic through a four-stage animated world map, then into the eight-scene dashboard. Archived assets remain byte-identical research references; the old unsourced chart is not used as evidence.

The opening title uses exact Throwupz outlines with brief clipped-colour glitch bursts and pointer/focus interaction in `GlitchTitle.svelte`. It pauses offscreen and when the page is hidden, and remains static for reduced motion. The downloaded font’s standard licence requires permission for public use. The user confirmed permission to publish this project’s Throwupz title on 8 September 2026; this confirmation is recorded in the provenance file. The font binary is not bundled or committed. Provenance and the included license are in `docs/wordmark.json` and `docs/throwupz-license.txt`. The rest of the visual identity uses condensed Anton headlines, occasional Permanent Marker lettering, ink, acid yellow, orange and a code-drawn record sleeve. Display fonts are bundled locally with licenses in `public/licenses/` and provenance in `docs/display-fonts.json`. Album, EP and mixtape colours remain separate data encodings. Headline stamps and the sleeve use short, finite entrance motion. Fonts are bundled locally. There is no remote font dependency, scroll hijacking, audio autoplay, or third-party animation runtime. Map routes draw once as their chapter becomes active; reduced-motion preferences show completed routes immediately. The CI workflow checks types/accessibility diagnostics, geometry/data invariants, image preservation, and the production build. It does not publish the site.

## Vercel

The linked Vercel project uses the Vite preset, `npm ci`, `npm run build`, and the `dist/` output directory. These settings are versioned in `vercel.json`. The former `/work/nested/rise-of-hiphop` and `/hiphop` links redirect to the new home page.
