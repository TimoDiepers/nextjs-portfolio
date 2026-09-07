'use client';

import { useEffect, useRef, useState } from 'react';

const LINES = [
  '> whoami',
  'Timo Diepers — Research Associate at RWTH Aachen, working on',
  'time-explicit LCA & Optimization. Open source first.',
];

const FULL_TEXT = LINES.join('\n');
const STORAGE_KEY = 'boot-intro-played';
const CHAR_DELAY_MS = 12;
const START_DELAY_MS = 200;

const BootIntro = () => {
  const [revealed, setRevealed] = useState(0);
  const [done, setDone] = useState(false);
  const skipRef = useRef(false);

  useEffect(() => {
    let alreadyPlayed = false;
    try {
      alreadyPlayed = window.sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      alreadyPlayed = false;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (alreadyPlayed || prefersReducedMotion) {
      setRevealed(FULL_TEXT.length);
      setDone(true);
      return;
    }

    const finish = () => {
      setRevealed(FULL_TEXT.length);
      setDone(true);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // sessionStorage unavailable; animation will simply replay next visit
      }
    };

    const skip = () => {
      skipRef.current = true;
    };

    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('pointerdown', skip, { once: true });

    let index = 0;
    let timeoutId: number;

    const step = () => {
      if (skipRef.current) {
        finish();
        return;
      }

      index += 1;
      setRevealed(index);

      if (index < FULL_TEXT.length) {
        timeoutId = window.setTimeout(step, CHAR_DELAY_MS);
      } else {
        finish();
      }
    };

    timeoutId = window.setTimeout(step, START_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, []);

  return (
    <div className="relative text-sm">
      <p className="sr-only">{FULL_TEXT}</p>
      {/* Invisible sizer reserving the full, wrapped height up front so the reveal below never shifts layout. */}
      <pre aria-hidden="true" className="invisible whitespace-pre-wrap font-[inherit] text-sm leading-relaxed">
        {FULL_TEXT}
      </pre>
      <pre
        aria-hidden="true"
        className="absolute inset-0 whitespace-pre-wrap font-[inherit] text-sm leading-relaxed text-foreground"
      >
        {FULL_TEXT.slice(0, revealed)}
        {!done ? <span className="boot-caret">_</span> : null}
      </pre>
      {/* Without JS the animated reveal above never advances past 0 characters; show the full text instead. */}
      <noscript>
        <pre className="absolute inset-0 whitespace-pre-wrap font-[inherit] text-sm leading-relaxed text-foreground">
          {FULL_TEXT}
        </pre>
      </noscript>
    </div>
  );
};

export default BootIntro;
