'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Fingerprint,
  Github,
  Linkedin,
  Sun,
  Moon,
  ArrowUpRight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ContentCard from '@/components/content-card';
import type { ContentItem } from '@/lib/content';
import {
  codingProjects,
  presentations,
  publications,
} from '@/lib/content';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type FeaturedSectionProps = {
  id: string;
  title: string;
  description: string;
  items: ContentItem[];
  seeAllHref: string;
  accentClass: string;
};

const MotionHeaderShell = motion.create('div');
const MotionLinkShell = motion.create('div');

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  id,
  title,
  description,
  items,
  seeAllHref,
  accentClass,
}) => {
  return (
    <section id={id} className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <MotionHeaderShell
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="flex items-center gap-3 sm:gap-4"
        >
          <span className={`inline-flex h-10 w-1.5 rounded-full ${accentClass}`} />
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>
        </MotionHeaderShell>
        <MotionLinkShell
          initial={false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
          className="inline-flex translate-x-4 opacity-0"
        >
          <a
            href={seeAllHref}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:translate-x-1 hover:text-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            View all
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
          </a>
        </MotionLinkShell>
      </div>
      <Carousel
        opts={{ align: 'start', containScroll: 'trimSnaps' }}
        className="relative w-full"
      >
        <CarouselContent
          viewportClassName="px-6 sm:px-2"
          className="ml-0 gap-4 py-4"
        >
          {items.map((item, index) => (
            <CarouselItem
              key={item.id}
              className="basis-full pl-0 sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
            >
              <ContentCard item={item} delay={index * 0.075} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden -left-8 md:inline-flex" />
        <CarouselNext className="hidden -right-8 md:inline-flex" />
      </Carousel>
    </section>
  );
};

const PersonalSite = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-90 transition-opacity duration-300 "
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <header className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-6 sm:items-center">
            <div className="flex items-center gap-5">
              <Image
                src="/profile_pic.jpeg"
                alt="Profile"
                width={160}
                height={160}
                priority
                className="h-32 w-32 rounded-full border border-border/60 object-cover shadow-lg sm:h-32 sm:w-32"
              />
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Timo Diepers
                </h1>
                <p className="text-sm text-muted-foreground">
                  Researcher · Software Developer
                </p>
                <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                  <a
                    href="https://orcid.org/0000-0000-0000-0000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary shadow-[0_4px_12px_rgba(0,84,159,0.08)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/20 hover:shadow-[0_12px_26px_rgba(0,84,159,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label="ORCID"
                  >
                    <Fingerprint className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary shadow-[0_4px_12px_rgba(0,84,159,0.08)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/20 hover:shadow-[0_12px_26px_rgba(0,84,159,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary shadow-[0_4px_12px_rgba(0,84,159,0.08)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/20 hover:shadow-[0_12px_26px_rgba(0,84,159,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/70 p-2 text-muted-foreground shadow-[0_4px_14px_rgba(18,38,63,0.12)] transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary/55 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          <p className="text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            Focused on crafting reliable AI-driven experiences and tools that empower researchers, product teams, and creative communities. Currently building human-centered infrastructure for multi-modal systems.
          </p>
        </header>

        <main className="space-y-14 pb-8">
          <FeaturedSection
            id="featured-publications"
            title="Publications"
            description="Select research highlights that shaped my current focus on trustworthy AI and collaborative tooling."
            items={publications}
            seeAllHref="/publications"
            accentClass="bg-chart-1/60"
          />
          <FeaturedSection
            id="featured-presentations"
            title="Presentations"
            description="Talks and workshops that explore how design, research, and engineering intersect in practice."
            items={presentations}
            seeAllHref="/presentations"
            accentClass="bg-chart-3/60"
          />
          <FeaturedSection
            id="featured-coding"
            title="Coding Projects"
            description="A sample of the systems and tools I build to help teams move faster with confidence."
            items={codingProjects}
            seeAllHref="/coding"
            accentClass="bg-chart-5/60"
          />
        </main>
      </div>
    </div>
  );
};

export default PersonalSite;
