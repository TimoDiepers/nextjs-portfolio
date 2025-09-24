'use client';

import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Fingerprint,
  Github,
  Linkedin,
  Moon,
  Sun,
} from 'lucide-react';
import TextFlip from './animata/text/text-flip';
import AnimatedGradientText from './animata/text/animated-gradient-text';
import TypingText from './ui/shadcn-io/typing-text';

type HeroProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  onReady?: () => void;
  onExploreClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const MotionHeroSection = motion.create('section');
const MotionBackground = motion.create('div');
const MotionBlob = motion.create('div');
const MotionHeroContent = motion.create('div');
const MotionHeroHeading = motion.create('h1');
const MotionHeroSubcopy = motion.create('p');
const MotionHeroActions = motion.create('div');
const MotionHeroIconLink = motion.create('a');
const MotionHeroImageShell = motion.create('div');
const MotionHeroFrame = motion.create('div');
const MotionThemeToggle = motion.create('button');

const SOCIAL_LINKS = [
  { href: 'https://orcid.org/0000-0000-0000-0000', label: 'ORCID', icon: Fingerprint },
  { href: 'https://github.com/username', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com/in/username', label: 'LinkedIn', icon: Linkedin },
];

const Hero = ({ isDark, onToggleTheme, onReady, onExploreClick }: HeroProps) => {
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      onReady?.();
    }, 450);
    return () => window.clearTimeout(timer);
  }, [onReady]);

  return (
    <header className="relative">
      <MotionHeroSection
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/90 p-6 shadow-[0_16px_42px_rgba(8,20,34,0.22)] backdrop-blur-xl sm:p-10"
      >
        {/* <MotionBackground
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-primary/1 via-chart-1/13 to-background/15"
        >
          <MotionBlob
            aria-hidden
            initial={{ opacity: 0.38, x: 0 }}
            animate={{ x: ['-4rem', '4rem', '-4rem'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[70%] top-1/2 -translate-y-1/2 h-52 w-52 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.7),transparent_50%)] blur-3xl"
          />
        </MotionBackground> */}

        <MotionThemeToggle
          initial={{ opacity: 0, scale: 0.9, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
          onClick={onToggleTheme}
          className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/55 bg-background/85 text-muted-foreground shadow-[0_4px_8px_rgba(12,23,35,0.075)] transition-colors duration-300 hover:border-primary/35 hover:text-primary hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Sun className="h-4 w-4" />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Moon className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </MotionThemeToggle>

        <div className="relative z-10 grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center">
          <MotionHeroImageShell
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.16 }}
            className="mx-auto flex w-44 flex-col items-center gap-4 sm:w-48 md:order-2"
          >
            <MotionHeroFrame
              // animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
              // transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex items-center justify-center rounded-full border border-border/55 bg-background/90 p-2 shadow-[0_12px_24px_rgba(8,20,34,0.24)] backdrop-blur-2xl"
            >
              <div className="relative h-40 w-40 overflow-hidden rounded-full border border-border/45 sm:h-48 sm:w-48">
                <Image
                  src="/profile_pic_cut.jpeg"
                  alt="Profile portrait of Timo Diepers"
                  width={320}
                  height={320}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </MotionHeroFrame>

            <motion.div
              className="flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.32 }}
            >
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }, index) => (
                <MotionHeroIconLink
                  key={`hero-${label}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.075 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 z-2 items-center justify-center rounded-full border border-border/50 bg-background/80 text-primary shadow-[0_4px_8px_rgba(0,84,159,0.2)] transition-transform duration-300 hover:-translate-y-1 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </MotionHeroIconLink>
              ))}
            </motion.div>
          </MotionHeroImageShell>

          <MotionHeroContent
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
            className="flex flex-col gap-6 md:order-1"
          >
            <MotionHeroHeading
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
              className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Timo Diepers
              <br />
              <span className="text-4xl font-bold">I'm working on </span>
              <TypingText
                // text={["researcher", "software developer", "doctoral candidate"]}
                text={["Sustainability", "Optimization", "LCA", "Energy Systems", "Time-dynamics"]}
                typingSpeed={85}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-4xl font-bold " //font-mono
                textColors={['#006fd0ff', '#8b5cf6', '#06b6d4']}
                variableSpeed={{ min: 50, max: 120 }}
              />
            </MotionHeroHeading>

            <MotionHeroSubcopy
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.26 }}
              className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I design reliable, humane AI experiences that help teams explore complex ideas faster. From research pipelines to production-grade tools, I focus on clarity, collaboration, and trust.
            </MotionHeroSubcopy>

            {/* <MotionHeroActions
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.32 }}
              className="flex flex-col gap-4 md:flex-row md:items-center md:gap-3"
            >
              <a
                href="#featured-publications"
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_20px_40px_rgba(0,84,159,0.25)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Explore highlighted work
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="/publications"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-5 py-2.5 text-sm font-semibold text-foreground transition-transform duration-300 hover:-translate-y-1 hover:border-primary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
              >
                Browse publications
              </a>
            </MotionHeroActions> */}
          </MotionHeroContent>
        </div>
      </MotionHeroSection>
    </header>
  );
};

export default Hero;
