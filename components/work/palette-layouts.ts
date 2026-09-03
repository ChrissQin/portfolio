/** Spontaneous ratios for placeholder cards without a set orientation. */
const SPONTANEOUS_RATIOS = [
  "4 / 5.45",
  "16 / 9.8",
  "5 / 6.35",
  "3 / 5.05",
  "7 / 5.1",
  "1 / 1.06",
  "11 / 7.2",
  "4 / 5.1",
  "9 / 5.2",
  "5 / 7.15",
  "3 / 2.15",
  "6 / 5.4",
] as const;

const RATIO_ORDER = [0, 6, 2, 9, 4, 1, 8, 3, 5, 10, 7, 11] as const;

const LANDSCAPE_RATIO_ORDER = [6, 4, 1, 10, 8, 11] as const;
const PORTRAIT_RATIO_ORDER = [0, 2, 3, 7, 9] as const;

export const HORIZONTAL_FRAME_RATIO = "16 / 9.8";
export const VERTICAL_FRAME_RATIO = "9 / 16";

function getLandscapeCardRatio(index: number): string {
  const pick =
    LANDSCAPE_RATIO_ORDER[index % LANDSCAPE_RATIO_ORDER.length]!;
  return SPONTANEOUS_RATIOS[pick % SPONTANEOUS_RATIOS.length]!;
}

function getPortraitCardRatio(index: number): string {
  const pick = PORTRAIT_RATIO_ORDER[index % PORTRAIT_RATIO_ORDER.length]!;
  return SPONTANEOUS_RATIOS[pick % SPONTANEOUS_RATIOS.length]!;
}

export function getPaletteCardRatio(index: number): string {
  const pick = RATIO_ORDER[index % RATIO_ORDER.length]!;
  return SPONTANEOUS_RATIOS[pick % SPONTANEOUS_RATIOS.length]!;
}

export function getWorkCardRatio(
  orientation: "horizontal" | "vertical" | undefined,
  index: number,
): string {
  if (orientation === "horizontal") return getLandscapeCardRatio(index);
  if (orientation === "vertical") return getPortraitCardRatio(index);
  return getPaletteCardRatio(index);
}

/** Fixed ratios for category filter views (not All works). */
export function getCategoryFilterFrameRatio(
  category: "product" | "narrative" | "short-form",
): string {
  if (category === "short-form") return VERTICAL_FRAME_RATIO;
  return HORIZONTAL_FRAME_RATIO;
}
