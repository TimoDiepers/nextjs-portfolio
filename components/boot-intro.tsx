'use client';

import { useEffect, useState } from 'react';

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

const measurePageFootprint = () => {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

  const totalBytes =
    (nav?.transferSize ?? 0) + resources.reduce((sum, resource) => sum + (resource.transferSize ?? 0), 0);

  const gigabytes = totalBytes / 1_000_000_000;
  const grams = gigabytes * ENERGY_PER_GB_KWH * GRID_INTENSITY_G_PER_KWH;

  return {
    kilobytes: Math.round(totalBytes / 1000),
    co2: grams < 0.01 ? '<0.01' : grams.toFixed(2),
  };
};

// Same word shapes and spacing as the real result, so filling in the numbers
// in place never changes where the line wraps — no layout shift on reveal.
const PLACEHOLDER = { kilobytes: 0, co2: '0.00' };

const BootIntro = () => {
  const [footprint, setFootprint] = useState(PLACEHOLDER);

  useEffect(() => {
    // Small delay lets the page's own resources finish loading before summing them.
    const timeoutId = window.setTimeout(() => {
      setFootprint(measurePageFootprint());
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <pre className="whitespace-pre-wrap font-[inherit] text-sm leading-relaxed text-foreground">
      {LINES.join('\n')}
      <span className="lca-self">
        {'\n\n> lca --self\n'}
        {`~${footprint.kilobytes} KB transferred, ~${footprint.co2} g CO2e this visit (estimated)`}
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
