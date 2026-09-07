# Editing the Rise of Hip-Hop narrative

This Svelte rebuild keeps only the Rise of Hip-Hop project. The displayed copy is a concise adaptation of the previous outline, ready to be replaced with the next editorial draft. The complete previous narrative is preserved in [original-narrative.md](./original-narrative.md).

## Where the content lives

Edit `src/lib/data/story.ts` to change the four chapters. Each chapter contains:

- `id`: a stable section anchor used by navigation.
- `number` and `period`: the chapter label and historical context.
- `title` and `intro`: the heading and opening line.
- `paragraphs`: an array of body paragraphs.
- `image` (optional): an asset URL, descriptive alternative text and a visible caption.

Keep the existing ids (`origins`, `global`, `streaming`, `india`) when replacing copy unless navigation is updated with them. Image paths use `import.meta.env.BASE_URL`, allowing Vite to serve the same assets when a base path is configured.

## What is preserved

The original image files remain in `public/assets`. The city disk infographics are preserved as images so their artist portraits, labels and circular compositions remain intact. The world and India maps accompany the adapted narrative.

`Graph.jpg` is retained but is not displayed in the chapter data. Its labels describe hip-hop's share of top-100 albums and revenue from 2000 to 2020, but the previous project does not identify the chart's dataset, market or methodology. Add a verifiable source and those definitions before using the chart as evidence in the next narrative. Do not infer an underlying dataset from its pixels.

## Editorial status

This pass preserves the original topics and examples without adding statistics or a new research layer. It removes the unsupported claim that hip-hop is the world's dominant streaming genre and replaces subjective distinctions between “commercial” and “authentic” artists with neutral descriptions of different scenes.

The maps are inherited illustrations, not a new geographic dataset or a complete inventory of scenes. Review their dates, labels and supporting sources alongside the user's next draft. Replace captions and alternative text whenever an illustration changes.
