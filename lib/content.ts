export type ContentLink = {
  label: string;
  href: string;
};

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  meta?: string;
  topics: string[];
  links: ContentLink[];
  image?: string;
  imageLight?: string;
  imageDark?: string;
  featured?: boolean;
};

export const publications: ContentItem[] = [
  {
    id: 'timex-paper',
    title: 'Time-explicit Life Cycle Assessment: A Flexible Framework for Coherent Consideration of Temporal Dynamics',
    meta: 'The International Journal of Life Cycle Assessment · 2025',
    description:
      'We propose a time-explicit LCA framework that captures when processes and emissions occur, enabling dynamic assessments of evolving product systems.',
    topics: ['Journal Paper', 'Life Cycle Assessment', 'Methodology', 'Time dynamics'],
    links: [
      { label: 'Paper', href: '#' },
      { label: 'Code', href: '#' },
    ],
    featured: true,
  },
  {
    id: 'welding',
    title: 'DVS Focus Report: Sustainability in Welding Manufacturing',
    meta: 'Schweissen und Schneiden · 2025',
    description:
      'Investigation on the state of sustainability considerations in welding manufacturing. By conducting Life Cycle Assessments on two representative welding parts, we identify the main drivers of environmental impacts in welding manufacturing and highlight opportunities for future improvements within the sector. Report available in German language only.',
    topics: ['Focus Report', 'Life Cycle Assessment', 'Welding', 'Case Study'],
    links: [
      { label: 'Report', href: 'https://publications.rwth-aachen.de/record/1011748' },
    ],
    featured: true,
  },
  {
    id: 'conference-paper-1',
    title: 'Temporal Dynamics in Environmental Impact Assessment',
    meta: 'Environmental Science & Technology · 2024',
    description: 'A comprehensive analysis of time-dependent environmental impacts in industrial processes.',
    topics: ['Conference Paper', 'Environmental Impact', 'Industrial Processes'],
    links: [
      { label: 'Paper', href: '#' },
    ],
    featured: false,
  },
  {
    id: 'workshop-paper-1',
    title: 'Optimization Methods for Sustainable Manufacturing',
    meta: 'CIRP Workshop · 2023',
    description: 'Workshop paper on mathematical optimization approaches for sustainable manufacturing processes.',
    topics: ['Workshop Paper', 'Optimization', 'Manufacturing'],
    links: [
      { label: 'Paper', href: '#' },
    ],
    featured: false,
  },
];

export const presentations: ContentItem[] = [
  {
    id: "ieday-2024",
    title: "IE Day Session · What year is it? Navigating time in LCA",
    meta: "Industrial Ecology Day · 2024",
    description:
      "We chaired a session on temporal aspects of Life Cycle Assessment, discussing recent advances and open challenges.",
    topics: ["Session", "Life Cycle Assessment", "Industrial Ecology"],
    links: [
      { label: "Recording", href: "https://www.youtube.com/watch?v=H2oPMH1mPFM" },
      { label: "Slides", href: "https://zenodo.org/records/14198448" },
      { label: "Event", href: "https://is4ie.org/events/event/international-industrial-ecology-day-2024" },
    ],
    imageLight: "/teasers/ieday_logo.png",
    imageDark: "/teasers/ieday_logo.png",
    featured: true,
  },
  {
    id: "brightcon-2024",
    title: "Interactive Presentation · Time-explicit LCA with bw_timex",
    meta: "BrightCon Conference · 2024",
    description:
      "Presenting the concept of time-explicit LCA and showcasing bw_timex, our time-explicit LCA python package based on Brightway",
    topics: ["Conference Presentation", "Life Cycle Assessment"],
    links: [
      {
        label: "Recording",
        href: "https://www.youtube.com/watch?v=5ksD0_f3fiA&t=1539s",
      },
      {
        label: "Slides",
        href: "https://github.com/Depart-de-Sentier/brightcon-2024-material/blob/main/talks/Thursday/bw_timex/0_bw_timex_presentation.pdf",
      },
      {
        label: "Further Material",
        href: "https://github.com/Depart-de-Sentier/brightcon-2024-material/tree/main/talks/Thursday/bw_timex",
      },
      { label: "Event", href: "https://2024.brightcon.link" },
    ],
    imageLight: "/teasers/brightcon.png",
    imageDark: "/teasers/brightcon.png",
    featured: true,
  },
  {
    id: "workshop-2023",
    title: "Sustainable Process Design Workshop",
    meta: "RWTH Aachen University · 2023",
    description: "Workshop on sustainable process design methodologies.",
    topics: ["Workshop", "Process Design", "Sustainability"],
    links: [
      { label: "Materials", href: "#" },
    ],
    featured: false,
  },
  {
    id: "guest-lecture-2024", 
    title: "Guest Lecture: LCA in Industry",
    meta: "TU Delft · 2024",
    description: "Guest lecture on practical applications of Life Cycle Assessment in industrial settings.",
    topics: ["Guest Lecture", "Life Cycle Assessment", "Industry"],
    links: [
      { label: "Slides", href: "#" },
    ],
    featured: false,
  },
];

export const codingProjects: ContentItem[] = [
  {
    id: 'bw_timex',
    title: 'bw_timex · Time-explicit Life Cycle Assessment Framework',
    meta: 'Creator',
    description:
      'Assess environmental impacts considering the temporal distribution and temporal evolution of processes and their supply chains.',
    topics: ['Python', 'Brightway'],
    links: [
      { label: 'Repository', href: 'https://github.com/brightway-lca/bw_timex' },
      { label: 'Documentation', href: 'https://docs.brightway.dev/projects/bw-timex/en/latest/' },
      { label: 'JOSS Paper', href: 'https://joss.theoj.org/papers/eb9021af0207b86e02439768a4841670' },
    ],
    imageLight: '/teasers/bw_timex_light_rtd.svg',
    imageDark: '/teasers/bw_timex_dark_rtd.svg',
    featured: true,
  },
  {
    id: 'optimex',
    title: 'optimex  · Time-explicit Transition Pathway Optimization',
    meta: 'Creator',
    description:
      'Opinionated infrastructure templates that standardize experiment tracking, evaluation, and rollout for ML teams.',
    topics: ['Python', 'Brightway', 'Pyomo'],
    links: [
      { label: 'Repository', href: 'https://github.com/TimoDiepers/optimex' },
      { label: 'Documentation', href: 'https://optimex.readthedocs.io/en/latest/' },
    ],
    imageLight: '/teasers/optimex_light_rtd.svg',
    imageDark: '/teasers/optimex_dark_rtd.svg',
    featured: true,
  },
  {
    id: 'data-analysis-scripts',
    title: 'LCA Data Analysis Scripts',
    meta: 'Contributor',
    description: 'Collection of Python scripts for analyzing Life Cycle Assessment data and generating reports.',
    topics: ['Python', 'Data Analysis', 'Scripts'],
    links: [
      { label: 'Repository', href: '#' },
    ],
    featured: false,
  },
  {
    id: 'web-calculator',
    title: 'Environmental Impact Calculator',
    meta: 'Creator',
    description: 'Web-based calculator for quick environmental impact assessments.',
    topics: ['JavaScript', 'Web App', 'Calculator'],
    links: [
      { label: 'Demo', href: '#' },
      { label: 'Code', href: '#' },
    ],
    featured: false,
  },
];
