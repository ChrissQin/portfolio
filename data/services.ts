export type Capability = {
  id: "edit" | "shoot" | "build";
  index: string;
  title: string;
  emphasis: "primary" | "secondary";
  lines: string[];
};

export const capabilities: Capability[] = [
  {
    id: "edit",
    index: "01",
    title: "Edit",
    emphasis: "primary",
    lines: [
      "Short-form, YouTube, social, lifestyle.",
      "Pacing, sound, structure, captions, motion.",
    ],
  },
  {
    id: "shoot",
    index: "02",
    title: "Shoot",
    emphasis: "secondary",
    lines: [
      "Interviews, creators, events, behind-the-scenes.",
      "Small-footprint production with editing already in mind.",
    ],
  },
  {
    id: "build",
    index: "03",
    title: "Build",
    emphasis: "secondary",
    lines: [
      "Concepts, pre-production, shoot planning,",
      "and turning one idea into content across platforms.",
    ],
  },
];
