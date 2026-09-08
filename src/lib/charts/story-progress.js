/**
 * Choose the last story step whose top has crossed the viewport reading line.
 * The first step stays active above the story and the last stays active below.
 * @param {number[]} tops
 * @param {number} readingLine
 * @returns {number}
 */
export function storyStepAt(tops, readingLine) {
  if (!tops.length) return 0;
  let active = 0;
  for (let index = 0; index < tops.length; index++) {
    if (tops[index] <= readingLine) active = index;
  }
  return active;
}

/**
 * Match anchor destinations to the same reading line that activates a chapter.
 * Short landscape screens put map and prose side by side.
 * @param {{width:number, height:number, mapHeight:number, stickyTop:number, scrollPadding:number}} viewport
 */
export function storyViewport(viewport) {
  const sideBySide = viewport.width > 760 || (viewport.width >= 600 && viewport.height <= 600);
  const readingLine = sideBySide ? viewport.height * .55
    : Math.min(viewport.height * .85, viewport.stickyTop + viewport.mapHeight + 80);
  return { readingLine, anchorMargin: Math.max(0, readingLine - viewport.scrollPadding - 24) };
}
