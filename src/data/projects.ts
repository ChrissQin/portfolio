export type Project = {
  id: string
  title: string
  client: string
  category: string
  year: string
  description: string
  role: string
  image: string
  video: string
  duration: string
}

export const categories = [
  'All',
  'Short-form',
  'Ads & Reels',
  'Documentary',
  'Long-form',
] as const

export type Category = (typeof categories)[number]

export const projects: Project[] = [
  {
    id: 'table-side',
    title: 'Table Side',
    client: 'Local Kitchen Co.',
    category: 'Ads & Reels',
    year: '2025',
    description:
      'A social-first restaurant spot—steam, plating, and quick cuts timed to the beat so the dish sells itself in under 30 seconds.',
    role: 'Director · Editor',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '00:28',
  },
  {
    id: 'first-light',
    title: 'First Light',
    client: 'Harbor Startup',
    category: 'Short-form',
    year: '2025',
    description:
      'Product launch reel for a young startup. Clean openers, founder soundbites, and a paced close that points to the CTA.',
    role: 'Filmmaker · Editor',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '00:45',
  },
  {
    id: 'open-doors',
    title: 'Open Doors',
    client: 'Community Roots',
    category: 'Documentary',
    year: '2024',
    description:
      'Short nonprofit piece built on interviews and quiet B-roll. The cut stays simple so the people and mission stay front and center.',
    role: 'Director · Editor',
    image:
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '03:20',
  },
  {
    id: 'creator-week',
    title: 'Creator Week',
    client: 'Personal Brand',
    category: 'Short-form',
    year: '2024',
    description:
      'A week-in-the-life series for a personal media brand—hooks in the first second, captions-ready framing, and platform-native pacing.',
    role: 'Editor · Color',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '00:55',
  },
  {
    id: 'after-hours',
    title: 'After Hours',
    client: 'Independent',
    category: 'Long-form',
    year: '2024',
    description:
      'Longer narrative cut exploring night-shift life in the city. Room to breathe between scenes, with sound design carrying the mood.',
    role: 'Editor · Sound',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '06:10',
  },
  {
    id: 'pour-over',
    title: 'Pour Over',
    client: 'Eastside Cafe',
    category: 'Ads & Reels',
    year: '2025',
    description:
      'Vertical ad for a neighborhood cafe—macro pour shots, soft grade, and a loop-friendly ending for paid social.',
    role: 'Filmmaker · Editor',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: '00:15',
  },
]

export const services = [
  {
    title: 'Video Editing',
    detail: 'Cutting · Color · Sound design',
    text: 'Tight edits for social, ads, and longer stories—paced so people stay through the last frame.',
  },
  {
    title: 'Creative Production',
    detail: 'Concept · Filming · Delivery',
    text: 'From a rough idea to a finished file. I help shape the brief, shoot when needed, and land the final cut.',
  },
  {
    title: 'Multimedia Storytelling',
    detail: 'Reels · Docs · Brand films',
    text: 'Short-form hooks, documentary moments, and client ads that feel human—not template-made.',
  },
]

export const tools = [
  'Premiere Pro',
  'DaVinci Resolve',
  'After Effects',
  'CapCut',
  'Frame.io',
]
