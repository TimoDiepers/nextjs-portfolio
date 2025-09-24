'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '@/components/hero';
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
const MotionSection = motion.create('section');

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: .35, ease: 'easeOut', delay },
  }),
};

const CARD_STAGGER = 0.2;
const CARD_INITIAL_OFFSET = 0;

const FeaturedSection: React.FC<FeaturedSectionProps & { isReady: boolean; delay: number }> = ({
  id,
  title,
  description,
  items,
  seeAllHref,
  accentClass,
  isReady,
  delay,
}) => {
  return (
    <MotionSection
      id={id}
      className="space-y-5"
      variants={sectionVariants}
      initial="hidden"
      animate={isReady ? 'visible' : 'hidden'}
      custom={delay}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <MotionHeaderShell
          animate={isReady ? { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut', delay: delay} } : { opacity: 0, y: -16 }}
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
          animate={isReady ? { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut', delay: delay} } : { opacity: 0, y: -16 }}
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
          {items.map((item, index) => {
            const cardDelay = isReady
              ? delay + CARD_INITIAL_OFFSET + index * CARD_STAGGER
              : 0;

            return (
              <CarouselItem
                key={item.id}
                className="basis-full pl-0 sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
              >
                <ContentCard item={item} delay={cardDelay} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden -left-8 md:inline-flex" />
        <CarouselNext className="hidden -right-8 md:inline-flex" />
      </Carousel>
    </MotionSection>
  );
};

const PersonalSite = () => {
  const [isDark, setIsDark] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  const handleExploreClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById('featured-publications');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
        <Hero
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          onReady={() => setHeroReady(true)}
          onExploreClick={handleExploreClick}
        />

        <main className="space-y-14 pb-8">
          <FeaturedSection
            id="featured-publications"
            title="Publications"
            description="Select research highlights that shaped my current focus on trustworthy AI and collaborative tooling."
            items={publications}
            seeAllHref="/publications"
            accentClass="bg-chart-1/60"
            isReady={heroReady}
            delay={heroReady ? 0.05 : 0}
          />
          <FeaturedSection
            id="featured-presentations"
            title="Presentations"
            description="Talks and workshops that explore how design, research, and engineering intersect in practice."
            items={presentations}
            seeAllHref="/presentations"
            accentClass="bg-chart-3/60"
            isReady={heroReady}
            delay={heroReady ? 0.15 : 0}
          />
          <FeaturedSection
            id="featured-coding"
            title="Coding Projects"
            description="A sample of the systems and tools I build to help teams move faster with confidence."
            items={codingProjects}
            seeAllHref="/coding"
            accentClass="bg-chart-5/60"
            isReady={heroReady}
            delay={heroReady ? 0.25 : 0}
          />
        </main>
      </div>
    </div>
  );
};

export default PersonalSite;
