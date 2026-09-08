# Editing the Rise of Hip-Hop narrative

The page now follows one arc: Bronx beginnings → international circulation → local languages → South Asia and its diaspora → the disc dashboard. The source outline remains archived in [original-narrative.md](original-narrative.md).

## Components and data

- `src/lib/data/story.ts` contains four historical chapters, each under 70 words, and labeled reference URLs.
- `ScrollJourney.svelte` measures each chapter against a viewport reading line. Scroll events are passive and batched with requestAnimationFrame; scrolling is never intercepted. The map is sticky alongside desktop copy and above mobile copy. The stage links are ordinary fragment links and all text remains in the document.
- `WorldSpreadMap.svelte` exposes activeStep 0–3 and a reducedMotion flag. Only reached routes/nodes render; prior paths are retained, current paths draw sequentially. CSS also honors the system reduced-motion preference.
- `world-outline.ts` contains simplified Natural Earth geometry, its source/hash and projection. Map arrows show selected connections, not literal routes or a comprehensive origin tree.
- `OriginRecord.svelte` draws a new opening graphic with SVG. It is decorative; the factual 1973 origin appears in the story text.
- `DiscStudy.svelte` remains the interactive final section. Its desktop/mobile viewport dimensions, project covers, release links, artist controls, golden album bands are preserved. Nearby release markers are spaced apart with clear gaps for separate click targets; exact dates remain in details and the list. Small scene locators remain; the large India map is removed.

## Editorial rules

Treat 1973 as a commemorated landmark in a wider community history. Do not present the map as a single chain from one country to the next. The California/Punjabi connection and New York/Mumbai label partnership are distinct. Karachi has its own schematic arrow from the New York origin so each South Asian destination has a visible connection; this is not a claim of a documented direct journey. Source links are collected at the end of the page, outside the scroll chapters.

The eight scenes, 29 artists and 111 distinct linked releases describe this curated collection through 2024, not a census of South Asian hip-hop. Original release editions and date exceptions remain in scene data and artwork provenance.

Avoid unsupported global genre-dominance statistics, charts reconstructed without data, and subjective commercial/authentic rankings. Keep the narrative short and make source details available below the main experience.

## Archived materials

The old city sheets, India/world illustrations and Graph.jpg are no longer displayed. Their files remain unchanged as research references, checked by preservation tests. Graph.jpg lacks a usable source dataset and is not used to support a factual claim. DiscGallery.svelte and discs.ts are legacy source modules, no longer imported by the application.
