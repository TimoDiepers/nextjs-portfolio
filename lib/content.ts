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
];

export const presentations: ContentItem[] = [
  {
    id: "ieday-2024",
    title: "IE Day Session · What year is it? Navigating time in LCA",
    meta: "Industrial Ecology Day · Online · 2024",
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
    featured: false,
  },
  {
    id: "brightcon-2024",
    title: "Conference Workshop · Time-explicit LCA with bw_timex",
    meta: "BrightCon Conference · Hamburg, DE · 2024",
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
    id: "isie-2025",
    title: "Conference Presentation: Optimizing Transition Pathways using Time-Explicit Life Cycle Assessment",
    meta: "ISIE25 · 12. International Conference on Industrial Ecology · Singapore · 2025",
    description: "Conference Presentation on the new tool optimex for transition pathway optimization based on time-explicit LCA.",
    topics: ["Conference Presentation", "Industrial Ecology", "Optimization", "Life Cycle Assessment"],
    links: [
      { label: "Abstract", href: "https://isie2025.exordo.com/programme/presentation/372" },
      { label: "Slides", href: "https://publications.rwth-aachen.de/record/1015673/files/1015673.pdf" },
    ],
    imageLight: "/teasers/isie25.png",
    imageDark: "/teasers/isie25.png",
    featured: true,
  },
  {
    id: "timex-setac",
    title: "Poster Presentation: Dynamic-Prospective Life Cycle Assessment using Time-Explicit Life Cycle Inventory: Methodology and Implementation",
    meta: "SETAC Europe 34th Annual Meeting · Seville, ES · 2024",
    description: "Poster presenting the background of dynamic-prospective LCA and its implementation in the bw_timex software package.",
    topics: ["Poster Presentation", "Life Cycle Assessment", "Industry"],
    links: [
      { label: "Abstract", href: "https://setac.confex.com/setac/europe2024/meetingapp.cgi/Paper/22593" },
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
    id: 'dynamic-characterization',
    title: 'dynamic_characterization · Functions for dynamic LCIA',
    meta: 'Creator',
    description: 'Functions for dynamic characterization of life cycle inventories with temporal information.',
    topics: ['Python', 'Brightway', 'Dynamic LCIA'],
    links: [
      { label: 'Repository', href: 'https://github.com/brightway-lca/dynamic_characterization' },
      { label: 'Documentation', href: 'https://dynamic-characterization.readthedocs.io/en/latest/' },
    ],
    featured: false,
  },
  {
    id: 'timex-app',
    title: 'bw_timex_app · Streamlit WebApp for Time-explicit LCA',
    meta: 'Creator',
    description: 'A streamlit web application for performing time-explicit life cycle assessments using bw_timex.',
    topics: ['Python', 'Brightway', 'WebApp', 'Streamlit'],
    links: [
      { label: 'Repository', href: 'https://github.com/TimoDiepers/bw_timex_app' },
      { label: 'WebApp', href: 'https://bw-timex.streamlit.app/' },
    ],
    featured: false,
  },
  {
    id: 'grid-expansion-impacts',
    title: 'grid-expansion-impacts · Demo · Interactive Visualization of Grid Expansion Impacts',
    meta: 'Creator',
    description: 'A static website for scroll-based visualization of the impacts of electricity grid expansion.',
    topics: ['Website', 'JavaScript', 'Visualization'],
    links: [
      { label: 'Repository', href: 'https://github.com/TimoDiepers/grid-expansion-impacts' },
      { label: 'Website', href: 'https://timodiepers.github.io/grid-expansion-impacts/' },
    ],
    featured: false,
  },
];
