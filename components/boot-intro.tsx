'use client';

import { useEffect, useRef, useState } from 'react';

const LINES = [
  '> whoami',
  'Timo Diepers — Research Associate at RWTH Aachen, working on',
  'time-explicit Life Cycle Assessment & Optimization. Open source first.',
];

// Sustainable Web Design Model constants (the same methodology behind
// websitecarbon.com): average energy intensity of data transfer, and a
// global-average grid carbon intensity. Both are widely-cited estimates,
// not exact figures — hence "(estimated)" in the output.
const ENERGY_PER_GB_KWH = 0.81;
const GRID_INTENSITY_G_PER_KWH = 442;
const COUNT_DURATION_MS = 900;

const measurePageFootprint = () => {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

  const totalBytes =
    (nav?.transferSize ?? 0) + resources.reduce((sum, resource) => sum + (resource.transferSize ?? 0), 0);

  const gigabytes = totalBytes / 1_000_000_000;
  const grams = gigabytes * ENERGY_PER_GB_KWH * GRID_INTENSITY_G_PER_KWH;

  return { kilobytes: totalBytes / 1000, grams };
};

// Same word shapes and spacing at every step, so counting the numbers up
// never changes where the line wraps — no layout shift during the reveal.
const formatFootprint = (kilobytes: number, grams: number, isFinal: boolean) => {
  const co2 = isFinal && grams < 0.01 ? '<0.01' : grams.toFixed(2);
  return `~${Math.round(kilobytes)} KB transferred, ~${co2} g CO2e this visit (estimated)`;
};

const BootIntro = () => {
  const [display, setDisplay] = useState(() => formatFootprint(0, 0, false));
  const frameRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const reveal = () => {
      const target = measurePageFootprint();

      if (prefersReducedMotion) {
        setDisplay(formatFootprint(target.kilobytes, target.grams, true));
        return;
      }

      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / COUNT_DURATION_MS, 1);
        const eased = 1 - (1 - progress) ** 3;
        const isFinal = progress >= 1;

        setDisplay(formatFootprint(target.kilobytes * eased, target.grams * eased, isFinal));

        if (!isFinal) {
          frameRef.current = requestAnimationFrame(step);
        }
      };

      frameRef.current = requestAnimationFrame(step);
    };

    // Small delay lets the page's own resources finish loading before summing them.
    const timeoutId = window.setTimeout(reveal, 800);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <pre className="whitespace-pre-wrap font-[inherit] text-sm leading-relaxed text-foreground">
      {LINES.join('\n')}
      <span className="lca-self">
        {'\n\n> lca --self\n'}
        {display}
      </span>
      {/* Without JS this would freeze at the "0 KB" placeholder forever, which reads as a false
          claim rather than an estimate. Hide the block entirely instead. */}
      <noscript>
        <style>{'.lca-self { display: none; }'}</style>
      </noscript>
    </pre>
  );
};

export default BootIntro;
