export type WorkCategory = "product" | "narrative" | "short-form";

export type WorkOrientation = "horizontal" | "vertical";

export type PlaceholderWork = {
  slug: string;
  title: string;
  category: WorkCategory;
  categoryLabel: string;
  /** Shown on /work cards instead of categoryLabel when set */
  subCategoryLabel?: string;
  /** Frame shape for real work — horizontal 16:9 or vertical 9:16 */
  orientation?: WorkOrientation;
  /** Override aspect ratio (e.g. "16 / 9") when it must match a poster exactly */
  frameRatio?: string;
  /** CSS gradient fallback when no thumbnail is set */
  gradient: string;
  /** Opens in a new tab when set */
  href?: string;
  /** Poster image — fills the card with object-fit: cover */
  thumbnail?: string | null;
  /** CSS object-position for the thumbnail (e.g. "35% center") */
  thumbnailPosition?: string;
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
    slug: "georgia-paint",
    title: "Georgia Paint",
    category: "product",
    categoryLabel: "Product",
    subCategoryLabel: "Intro",
    orientation: "horizontal",
    gradient: "linear-gradient(135deg, #F7F5F1 0%, #E6E1D8 100%)",
    href: "https://youtu.be/S3hpLnVWv_4",
    thumbnail: "/work/georgia-paint.jpg",
  },
  {
    slug: "peer-yc-s26",
    title: "Peer (YC S26)",
    category: "product",
    categoryLabel: "Product",
    subCategoryLabel: "Launch",
    orientation: "horizontal",
    gradient: "linear-gradient(135deg, #11110F 0%, #7B8188 100%)",
    href: "https://lnkd.in/p/dyMjWM2X",
    thumbnail: "/work/peer-yc-s26.jpg",
  },
  {
    slug: "twine-yc-s23",
    title: "Twine (YC S23)",
    category: "short-form",
    categoryLabel: "Short-form",
    subCategoryLabel: "Social",
    orientation: "vertical",
    gradient: "linear-gradient(135deg, #E6E1D8 0%, #FF573D 100%)",
    href: "https://www.linkedin.com/posts/anand-valavalkar_when-we-have-this-much-motion-at-twine-yc-ugcPost-7490471967561572352-kDxQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAADzgvwUBsxmZOC6Si1zacF_MoU4ELOWRO4w",
    thumbnail: "/work/twine-yc-s23.jpg",
  },
  {
    slug: "uni-uni-boba",
    title: "Uni Uni Boba",
    category: "short-form",
    categoryLabel: "Short-form",
    subCategoryLabel: "Product",
    orientation: "vertical",
    frameRatio: "428 / 449",
    gradient: "linear-gradient(135deg, #FF573D 0%, #11110F 100%)",
    href: "https://youtube.com/shorts/-dQCyRpg5Z0",
    thumbnail: "/work/uni-uni-boba.jpg",
  },
  {
    slug: "btrt-run-club",
    title: "BTRT Run Club",
    category: "short-form",
    categoryLabel: "Short-form",
    subCategoryLabel: "Social",
    orientation: "vertical",
    gradient: "linear-gradient(135deg, #F7F5F1 0%, #7B8188 55%, #E6E1D8 100%)",
    href: "https://www.instagram.com/reels/DbJzEz3PUN4/",
    thumbnail: "/work/btrt-run-club.jpg",
  },
  {
    slug: "houlai-chinese-immigration-story",
    title: "《后来》：A Chinese Immigration Story",
    category: "narrative",
    categoryLabel: "Narrative",
    subCategoryLabel: "Documentary",
    orientation: "horizontal",
    frameRatio: "16 / 9",
    gradient: "linear-gradient(135deg, #E6E1D8 0%, #FF573D 100%)",
    href: "https://youtu.be/snqOu5dtw1Q",
    thumbnail: "/work/houlai-chinese-immigration-story.jpg",
    thumbnailPosition: "25% center",
  },
  {
    slug: "thebaba-channel",
    title: "thebàbachannel",
    category: "narrative",
    categoryLabel: "Narrative",
    subCategoryLabel: "Branded",
    frameRatio: "16 / 9",
    gradient: "linear-gradient(135deg, #7B8188 0%, #11110F 100%)",
    href: "https://www.youtube.com/@wearebaba",
    thumbnail: "/work/thebaba-channel.jpg",
  },
  {
    slug: "brand-new-day",
    title: "Brand New Day",
    category: "narrative",
    categoryLabel: "Narrative",
    subCategoryLabel: "Experimental",
    orientation: "horizontal",
    gradient: "linear-gradient(135deg, #F7F5F1 0%, #FF573D 55%, #11110F 100%)",
    href: "https://youtu.be/gxolm1Ud3ss",
    thumbnail: "/work/brand-new-day.jpg",
    thumbnailPosition: "32% center",
  },
  {
    slug: "toppings-masshole-donuts",
    title: "Toppings x Masshole Donuts",
    category: "short-form",
    categoryLabel: "Short-form",
    subCategoryLabel: "Promotion",
    orientation: "vertical",
    gradient: "linear-gradient(135deg, #FF573D 0%, #E6E1D8 55%, #11110F 100%)",
    href: "https://www.instagram.com/toppingsapp/reel/CxMTSsmO3oj/",
    thumbnail: "/work/toppings-masshole-donuts.jpg",
  },
  {
    slug: "dreamcollege-ai",
    title: "DreamCollegeAI",
    category: "short-form",
    categoryLabel: "Short-form",
    subCategoryLabel: "Social",
    orientation: "vertical",
    gradient: "linear-gradient(135deg, #11110F 0%, #7B8188 55%, #F7F5F1 100%)",
    href: "https://www.instagram.com/dreamcollegeai/reel/DL8lcV5NRou/",
    thumbnail: "/work/dreamcollege-ai.jpg",
  },
  {
    slug: "dandre-mckenzie-polymarket",
    title: "D'Andre McKenzie x Polymarket",
    category: "short-form",
    categoryLabel: "Short-form",
    subCategoryLabel: "Promotion",
    orientation: "vertical",
    gradient: "linear-gradient(135deg, #11110F 0%, #FF573D 55%, #E6E1D8 100%)",
    href: "https://www.instagram.com/reel/DXaKPr8kTsd/",
    thumbnail: "/work/dandre-mckenzie-polymarket.jpg",
  },
  {
    slug: "anand-valavalkar",
    title: "Anand Valalvakar",
    category: "short-form",
    categoryLabel: "Short-form",
    subCategoryLabel: "Social",
    orientation: "vertical",
    gradient: "linear-gradient(135deg, #E6E1D8 0%, #7B8188 55%, #11110F 100%)",
    href: "https://www.instagram.com/anandvalavalkar/reel/DbjrxSRS_XS/",
    thumbnail: "/work/anand-valavalkar.jpg",
  },
];

export const aboutServiceGroups = [
  {
    key: "creative",
    title: "Creative",
    glyph: "creative",
    items: [
      "Concept Development",
      "Creative Direction",
      "Scripting",
      "Pre-Production",
    ],
  },
  {
    key: "production",
    title: "Production",
    glyph: "production",
    items: [
      "Directing",
      "Cinematography",
      "Interviews",
      "Location Production",
    ],
  },
  {
    key: "post",
    title: "Post",
    glyph: "post",
    items: ["Editing", "Motion Design", "Sound Design", "Color"],
  },
  {
    key: "formats",
    title: "Formats",
    glyph: "formats",
    items: [
      "Launch Films",
      "Documentaries",
      "Branded Content",
      "Short-Form",
    ],
  },
] as const;

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

export type PlaceholderPhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  /** CSS aspect-ratio value derived from width / height */
  aspectRatio: string;
  alt: string;
};

export const placeholderPhotos: PlaceholderPhoto[] = [
  {
    id: "photo-02",
    src: "/photography/02-guess-street.jpg",
    width: 1024,
    height: 682,
    aspectRatio: "1024 / 682",
    alt: "Street portrait through a car windshield, Lafayette Street",
  },
  {
    id: "photo-06",
    src: "/photography/06-starry-night.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Star-filled night sky fading into teal light",
  },
  {
    id: "photo-12",
    src: "/photography/12-erhu-player.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Musician playing erhu on a park bench",
  },
  {
    id: "photo-16",
    src: "/photography/16-mountain-ridge.jpg",
    width: 1024,
    height: 768,
    aspectRatio: "1024 / 768",
    alt: "Hiker sitting on a ridge overlooking mountains",
  },
  {
    id: "photo-08",
    src: "/photography/08-night-doorway.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Man on his phone in a lit apartment doorway at night",
  },
  {
    id: "photo-10",
    src: "/photography/10-iceland-road.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Lone figure on a winding road above the sea, Iceland",
  },
  {
    id: "photo-01",
    src: "/photography/01-pigeon-statue.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Bronze statue with a pigeon perched on its head, Rockefeller Center",
  },
  {
    id: "photo-19",
    src: "/photography/19-golden-hour-hill.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Person resting on a grassy hill at golden hour as the sun sets on the horizon",
  },
  {
    id: "photo-03",
    src: "/photography/03-chinatown-street.jpg",
    width: 1024,
    height: 682,
    aspectRatio: "1024 / 682",
    alt: "Pedestrian crossing a sunlit Chinatown street",
  },
  {
    id: "photo-15",
    src: "/photography/15-canyon-path.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Moss-covered canyon path with a distant waterfall",
  },
  {
    id: "photo-05",
    src: "/photography/05-transamerica.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Silhouette looking toward the Transamerica Pyramid, San Francisco",
  },
  {
    id: "photo-11",
    src: "/photography/11-yellow-head-beach.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Yellow toy head on a stick against a black sand beach",
  },
  {
    id: "photo-13",
    src: "/photography/13-waterfall-from-behind.jpg",
    width: 1024,
    height: 682,
    aspectRatio: "1024 / 682",
    alt: "Photographer facing a basalt waterfall from behind",
  },
  {
    id: "photo-07",
    src: "/photography/07-aura-farming-sf.jpg",
    width: 671,
    height: 1024,
    aspectRatio: "671 / 1024",
    alt: "Backlit cityscape with the Transamerica Pyramid, San Francisco",
  },
  {
    id: "photo-14",
    src: "/photography/14-canyon-railing.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Hiker leaning on a railing above a mossy canyon",
  },
  {
    id: "photo-21",
    src: "/photography/21-gullfoss.jpg",
    width: 1024,
    height: 639,
    aspectRatio: "1024 / 639",
    alt: "Gullfoss waterfall cascading into a canyon under stormy skies, Iceland",
  },
  {
    id: "photo-04",
    src: "/photography/04-tunnel-frame.jpg",
    width: 1024,
    height: 682,
    aspectRatio: "1024 / 682",
    alt: "Figure framed through a stone arch overlooking green hills",
  },
  {
    id: "photo-17",
    src: "/photography/17-cabin-moon.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Wooden cabin under a cloudy night sky with a crescent moon",
  },
  {
    id: "photo-09",
    src: "/photography/09-waterfall-basalt.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Hiker smiling in front of a basalt-column waterfall",
  },
  {
    id: "photo-18",
    src: "/photography/18-iceland-gorge.jpg",
    width: 676,
    height: 1024,
    aspectRatio: "676 / 1024",
    alt: "Steep mossy gorge with a winding cliff-edge path",
  },
  {
    id: "photo-20",
    src: "/photography/20-misty-waterfall-portrait.jpg",
    width: 682,
    height: 1024,
    aspectRatio: "682 / 1024",
    alt: "Portrait in front of a misty waterfall at blue hour",
  },
];
