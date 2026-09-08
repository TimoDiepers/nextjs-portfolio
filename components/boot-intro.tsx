const LINES = [
  '> whoami',
  'Timo Diepers — Research Associate at RWTH Aachen, working on',
  'time-explicit LCA & Optimization. Open source first.',
];

const BootIntro = () => (
  <pre className="whitespace-pre-wrap font-[inherit] text-sm leading-relaxed text-foreground">
    {LINES.join('\n')}
  </pre>
);

export default BootIntro;
