export type CollageSlot = {
  id: string;
  label: string;
  hint: string;
  kind: "timeline" | "storyboard" | "bts" | "audio" | "still";
  motif: "timeline" | "frame" | "portrait" | "audio";
  aspectRatio: string;
  /** Real asset path when available. Null = CSS placeholder only. */
  src: string | null;
};

/** Production-style slots until real creative artifacts are supplied. */
export const collageSlots: CollageSlot[] = [
  {
    id: "timeline",
    label: "Edit timeline",
    hint: "Asset needed",
    kind: "timeline",
    motif: "timeline",
    aspectRatio: "16 / 10",
    src: null,
  },
  {
    id: "storyboard",
    label: "Storyboard",
    hint: "Asset needed",
    kind: "storyboard",
    motif: "frame",
    aspectRatio: "4 / 5",
    src: null,
  },
  {
    id: "bts",
    label: "BTS photo",
    hint: "Asset needed",
    kind: "bts",
    motif: "portrait",
    aspectRatio: "4 / 5",
    src: null,
  },
  {
    id: "audio",
    label: "Music / audio",
    hint: "Asset needed",
    kind: "audio",
    motif: "audio",
    aspectRatio: "21 / 9",
    src: null,
  },
];
