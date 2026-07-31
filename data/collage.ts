export type CollageSlot = {
  id: string;
  label: string;
  kind: "timeline" | "storyboard" | "bts" | "audio" | "still";
  src: string;
};

/** Production-style placeholders until real creative artifacts are supplied. */
export const collageSlots: CollageSlot[] = [
  {
    id: "timeline",
    label: "EDIT TIMELINE — ASSET NEEDED",
    kind: "timeline",
    src: "/collage/edit-timeline.svg",
  },
  {
    id: "storyboard",
    label: "STORYBOARD — ASSET NEEDED",
    kind: "storyboard",
    src: "/collage/storyboard.svg",
  },
  {
    id: "bts",
    label: "BTS PHOTO — ASSET NEEDED",
    kind: "bts",
    src: "/collage/bts-photo.svg",
  },
  {
    id: "audio",
    label: "MUSIC / AUDIO — ASSET NEEDED",
    kind: "audio",
    src: "/collage/music-audio.svg",
  },
];
