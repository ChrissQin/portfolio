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

export const projects: Project[] = [
  {
    id: 'northline',
    title: 'Northline',
    client: 'Atlas Outdoor',
    category: 'Brand Film',
    year: '2025',
    description:
      'A cold-open brand film built around rhythm and restraint—long holds, hard cuts, and a sound bed that does the selling.',
    role: 'Lead Editor · Sound Design',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '01:42',
  },
  {
    id: 'afterglow',
    title: 'Afterglow',
    client: 'Maison Lume',
    category: 'Commercial',
    year: '2025',
    description:
      'Product-forward commercial with a slow-burn open and a kinetic mid-section. Color graded warm tungsten throughout.',
    role: 'Editor · Color',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '00:45',
  },
  {
    id: 'signal-loss',
    title: 'Signal Loss',
    client: 'Independent',
    category: 'Narrative Short',
    year: '2024',
    description:
      'A quiet thriller cut on reaction and silence. Pace designed to make every glance land before the cut arrives.',
    role: 'Editor · Picture Lock',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: '08:12',
  },
  {
    id: 'pulse',
    title: 'Pulse',
    client: 'Velocity Sports',
    category: 'Sports Spot',
    year: '2024',
    description:
      'High-tempo athletic spot with matched-action cuts and a heartbeat sound motif that drives the final push.',
    role: 'Lead Editor',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=80',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '00:30',
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Watch everything',
    text: 'I start by living with the footage—not cutting. Patterns, performances, and accidental moments surface first.',
  },
  {
    number: '02',
    title: 'Find the spine',
    text: 'Every piece needs one clear through-line. I build a rough that protects emotion and tempo before polish.',
  },
  {
    number: '03',
    title: 'Cut with intention',
    text: 'Pacing, sound, and color arrive together. The goal is invisible craft that still feels unmistakably authored.',
  },
]

export const tools = [
  'Premiere Pro',
  'DaVinci Resolve',
  'After Effects',
  'Pro Tools',
  'Frame.io',
]
