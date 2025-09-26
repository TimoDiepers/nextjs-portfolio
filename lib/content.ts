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
    image: '/teasers/presentation.svg',
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
    image: '/teasers/presentation.svg',
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
    image: '/teasers/presentation.svg',
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
    image: '/teasers/presentation.svg',
  },
];

export const codingProjects: ContentItem[] = [
  {
    id: 'studiokit',
    title: 'StudioKit · A Design System for Research Teams',
    meta: 'Maintainer · 2k stars',
    description:
      'A component library and token pipeline that keeps product and research prototypes visually aligned across platforms.',
    topics: ['TypeScript', 'Design Systems'],
    links: [
      { label: 'Repository', href: '#' },
      { label: 'Docs', href: '#' },
    ],
    image: '/teasers/coding.svg',
    featured: true,
  },
  {
    id: 'helios-ml-ops',
    title: 'Helios ML Ops Templates',
    meta: 'Creator · GCP + AWS',
    description:
      'Opinionated infrastructure templates that standardize experiment tracking, evaluation, and rollout for ML teams.',
    topics: ['Terraform', 'ML Ops', 'Cloud'],
    links: [
      { label: 'Repository', href: '#' },
      { label: 'Guide', href: '#' },
    ],
    image: '/teasers/coding.svg',
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
    image: '/teasers/coding.svg',
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
    image: '/teasers/coding.svg',
  },
];
