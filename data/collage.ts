export type CollageSlot = {
  id: string;
  label: string;
  hint: string;
  kind: "timeline" | "storyboard" | "bts" | "audio" | "still";
  src: string;
};

/** Production-style placeholders until real creative artifacts are supplied. */
export const collageSlots: CollageSlot[] = [
  {
    id: "timeline",
    label: "Edit timeline",
    hint: "Asset needed",
    kind: "timeline",
    src: "/collage/edit-timeline.svg",
  },
  {
    id: "storyboard",
    label: "Storyboard",
    hint: "Asset needed",
    kind: "storyboard",
    src: "/collage/storyboard.svg",
  },
  {
    id: "bts",
    label: "BTS photo",
    hint: "Asset needed",
    kind: "bts",
    src: "/collage/bts-photo.svg",
  },
  {
    id: "audio",
    label: "Music / audio",
    hint: "Asset needed",
    kind: "audio",
    src: "/collage/music-audio.svg",
  },
];
