export type WorkCategory = "video" | "brand" | "product";

export type PlaceholderWork = {
  slug: string;
  title: string;
  category: WorkCategory;
  categoryLabel: string;
  /** CSS gradient for placeholder thumbnail */
  gradient: string;
};

export const placeholderClients: string[] = [
  "Client One",
  "Client Two",
  "Client Three",
  "Client Four",
  "Client Five",
  "Client Six",
  "Client Seven",
  "Client Eight",
  "Client Nine",
  "Client Ten",
  "Client Eleven",
  "Client Twelve",
  "Client Thirteen",
  "Client Fourteen",
  "Client Fifteen",
  "Client Sixteen",
  "Client Seventeen",
  "Client Eighteen",
  "Client Nineteen",
  "Client Twenty",
  "Client Twenty-One",
  "Client Twenty-Two",
  "Client Twenty-Three",
  "Client Twenty-Four",
  "Client Twenty-Five",
  "Client Twenty-Six",
  "Client Twenty-Seven",
  "Client Twenty-Eight",
  "Client Twenty-Nine",
  "Client Thirty",
  "Client Thirty-One",
  "Client Thirty-Two",
  "Client Thirty-Three",
  "Client Thirty-Four",
  "Client Thirty-Five",
  "Client Thirty-Six",
];

export const placeholderWork: PlaceholderWork[] = [
  {
    slug: "project-one",
    title: "Project One",
    category: "video",
    categoryLabel: "Video",
    gradient: "linear-gradient(135deg, #d4d0c8 0%, #8a8680 100%)",
  },
  {
    slug: "project-two",
    title: "Project Two",
    category: "video",
    categoryLabel: "Video",
    gradient: "linear-gradient(135deg, #c8cdd4 0%, #707880 100%)",
  },
  {
    slug: "project-three",
    title: "Project Three",
    category: "video",
    categoryLabel: "Video",
    gradient: "linear-gradient(135deg, #d4c8c8 0%, #887070 100%)",
  },
  {
    slug: "project-four",
    title: "Project Four",
    category: "video",
    categoryLabel: "Video",
    gradient: "linear-gradient(135deg, #ccd4c8 0%, #788070 100%)",
  },
  {
    slug: "project-five",
    title: "Project Five",
    category: "brand",
    categoryLabel: "Brand",
    gradient: "linear-gradient(135deg, #e0dcd4 0%, #9a9590 100%)",
  },
  {
    slug: "project-six",
    title: "Project Six",
    category: "video",
    categoryLabel: "Video",
    gradient: "linear-gradient(135deg, #d0d4dc 0%, #808890 100%)",
  },
  {
    slug: "project-seven",
    title: "Project Seven",
    category: "video",
    categoryLabel: "Video",
    gradient: "linear-gradient(135deg, #dcd0d4 0%, #908088 100%)",
  },
  {
    slug: "project-eight",
    title: "Project Eight",
    category: "brand",
    categoryLabel: "Brand",
    gradient: "linear-gradient(135deg, #d8d4cc 0%, #888480 100%)",
  },
  {
    slug: "project-nine",
    title: "Project Nine",
    category: "video",
    categoryLabel: "Video",
    gradient: "linear-gradient(135deg, #ccd0d8 0%, #808890 100%)",
  },
  {
    slug: "project-ten",
    title: "Project Ten",
    category: "video",
    categoryLabel: "Video",
    gradient: "linear-gradient(135deg, #d4d8d0 0%, #888880 100%)",
  },
  {
    slug: "project-eleven",
    title: "Project Eleven",
    category: "video",
    categoryLabel: "Video",
    gradient: "linear-gradient(135deg, #d0ccd8 0%, #808088 100%)",
  },
  {
    slug: "project-twelve",
    title: "Project Twelve",
    category: "video",
    categoryLabel: "Video",
    gradient: "linear-gradient(135deg, #d8d0cc 0%, #908880 100%)",
  },
];

export const aboutServices = {
  brand: [
    "Brand Strategy",
    "Brand Identity",
    "Deck Design",
    "Collateral Design",
    "Iconography",
    "Art Direction",
    "Illustration",
    "Motion / 3D",
  ],
  website: [
    "Web Design",
    "Web Development",
    "Content Layout",
    "Copywriting",
    "Interaction Design",
  ],
  product: [
    "User Research & Analysis",
    "UX & Architecture",
    "Interface Design",
    "Interactive Prototyping",
    "Design Systems",
    "Design Strategy",
  ],
  video: [
    "Launch Video",
    "Testimonial Video",
    "Scripted Video",
    "Product Video",
    "Animation",
    "Motion Design",
    "Post-Editing",
  ],
} as const;

export const aboutTeam = [
  "Team Member One",
  "Team Member Two",
  "Team Member Three",
  "Team Member Four",
  "Team Member Five",
  "Team Member Six",
  "Team Member Seven",
  "Team Member Eight",
  "Team Member Nine",
  "Team Member Ten",
  "Team Member Eleven",
  "Team Member Twelve",
];
