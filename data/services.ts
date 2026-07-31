export type ServiceItem = {
  id: "editing" | "videography" | "production";
  title: string;
  emphasis: "primary" | "secondary";
  summary: string;
  areas: string[];
};

export const services: ServiceItem[] = [
  {
    id: "editing",
    title: "Video Editing",
    emphasis: "primary",
    summary:
      "My strongest focus. I shape short-form and long-form footage with pacing, sound, and visual detail built for how people actually watch.",
    areas: [
      "Short-form content",
      "Long-form YouTube",
      "Social media",
      "Lifestyle and personality-driven content",
      "Pacing and retention",
      "Sound design",
      "Captions and motion graphics",
    ],
  },
  {
    id: "videography",
    title: "Videography",
    emphasis: "secondary",
    summary:
      "I also shoot when a project needs it—capturing clean, usable footage for creators and everyday production needs as this side of my work continues to grow.",
    areas: [
      "Interviews",
      "Creator-focused shoots",
      "Social content",
      "Events",
      "Lifestyle footage",
      "Behind-the-scenes content",
    ],
  },
  {
    id: "production",
    title: "Creative Production",
    emphasis: "secondary",
    summary:
      "From early concepts through delivery, I help organize shoots and adapt content so it feels right for each platform and creator voice.",
    areas: [
      "Content concepts",
      "Pre-production planning",
      "Shoot organization",
      "Platform adaptation",
      "End-to-end content creation",
    ],
  },
];
