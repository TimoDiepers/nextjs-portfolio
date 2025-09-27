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
    id: 'generative-models-real-world',
    title: 'Time-explicit Life Cycle Assessment: A Flexible Framework for Coherent Consideration of Temporal Dynamics',
    meta: 'Müller & Diepers et al · IJLCA · 2025',
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
    id: 'interactive-visual-analytics',
    title: 'Interactive Visual Analytics for Biomedical Signals',
    meta: 'J. Doe · IEEE VIS 2023',
    description:
      'Introduces a lightweight toolkit that blends signal analysis with collaborative annotation workflows, empowering multi-disciplinary research teams.',
    topics: ['Visualization', 'Bioinformatics'],
    links: [
      { label: 'Paper', href: '#' },
      { label: 'Demo', href: '#' },
    ],
    featured: true,
  },
  {
    id: 'robotics-commonsense',
    title: 'Learning Commonsense for Robotics',
    meta: 'J. Doe · R. Chen · ICRA 2022',
    description:
      'Presents a transformer-based approach for teaching robots everyday commonsense reasoning through simulated household tasks and human feedback.',
    topics: ['Robotics', 'Transformer Models'],
    links: [
      { label: 'Paper', href: '#' },
      { label: 'Slides', href: '#' },
      { label: 'Video', href: '#' },
    ],
    featured: true,
  },
  {
    id: 'federated-safety-toolkit',
    title: 'Federated Safety Toolkit for Biomedical NLP',
    meta: 'J. Doe · MedNLP 2021',
    description:
      'Blueprint for privacy-preserving deployments that balance clinical accuracy with GDPR-compliant governance.',
    topics: ['Healthcare', 'Privacy', 'NLP'],
    links: [
      { label: 'Paper', href: '#' },
      { label: 'Toolkit', href: '#' },
    ],
  },
];

export const presentations: ContentItem[] = [
  {
    id: 'trustworthy-ai-keynote',
    title: 'Keynote · Designing Trustworthy AI Tooling',
    meta: 'Strata Data · 2024',
    description:
      'Explored the balance between model performance and human-centered design, sharing lessons from cross-functional product research.',
    topics: ['Keynote', 'AI Product'],
    links: [
      { label: 'Slides', href: '#' },
      { label: 'Event', href: '#' },
    ],
    imageLight: '/teasers/presentation.svg',
    imageDark: '/teasers/presentation-dark.svg',
    featured: true,
  },
  {
    id: 'framer-motion-workshop',
    title: 'Workshop · Rapid Prototyping with Framer Motion',
    meta: 'React Summit · 2023',
    description:
      'Hands-on session guiding engineers through motion design fundamentals and production-ready animation pipelines.',
    topics: ['Workshop', 'Motion Design', 'Frontend'],
    links: [
      { label: 'Slides', href: '#' },
      { label: 'Code Sandbox', href: '#' },
    ],
    imageLight: '/teasers/presentation.svg',
    imageDark: '/teasers/presentation-dark.svg',
    featured: true,
  },
  {
    id: 'open-source-panel',
    title: 'Panel · Open Sourcing Research Infrastructure',
    meta: 'SciPy · 2022',
    description:
      'Discussed sustainable governance models for open research tooling and how to grow contributor communities.',
    topics: ['Panel', 'Open Source', 'Governance'],
    links: [{ label: 'Recording', href: '#' }],
    imageLight: '/teasers/presentation.svg',
    imageDark: '/teasers/presentation-dark.svg',
  },
  {
    id: 'designing-for-clinicians',
    title: 'Designing for Clinicians in High-Stakes Contexts',
    meta: 'CHI · 2021',
    description:
      'Shared qualitative research guiding the creation of explainable AI affordances for diagnostic tools used in emergency departments.',
    topics: ['Healthcare', 'UX Research'],
    links: [
      { label: 'Case Study', href: '#' },
      { label: 'Slides', href: '#' },
    ],
    imageLight: '/teasers/presentation.svg',
    imageDark: '/teasers/presentation-dark.svg',
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
    id: 'neuro-sketch',
    title: 'NeuroSketch',
    meta: 'Co-author · Mozilla Builders',
    description:
      'Web-based sketching environment that uses on-device models to translate drawings into spatial audio cues.',
    topics: ['Web Audio', 'Creative Tech', 'Accessibility'],
    links: [
      { label: 'Repository', href: '#' },
      { label: 'Case Study', href: '#' },
      { label: 'Live Demo', href: '#' },
    ],
    imageLight: '/teasers/coding.svg',
    imageDark: '/teasers/coding-dark.svg',
  },
  {
    id: 'atlas-performance-kit',
    title: 'Atlas Performance Kit',
    meta: 'Contributor · Chrome Labs',
    description:
      'CLI utilities for profiling WebAssembly pipelines and generating optimized bundles for edge runtimes.',
    topics: ['Performance', 'WebAssembly', 'Tooling'],
    links: [
      { label: 'Repository', href: '#' },
      { label: 'Docs', href: '#' },
    ],
    imageLight: '/teasers/coding.svg',
    imageDark: '/teasers/coding-dark.svg',
  },
];
