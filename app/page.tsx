'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants, useAnimationControls, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
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
const MotionGrid = motion.create('div');

const CARD_STAGGER_GROUP = 3;
const CARD_STAGGER_DELAY = 0.075;
const CARD_OVERLAP_DELAY = 0.1;

// Reset the stagger every few cards so carousel slides stay snappy.
const getCardStaggerDelay = (index: number) =>
  (index % CARD_STAGGER_GROUP) * CARD_STAGGER_DELAY;

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut', delay },
  }),
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut', delay },
  }),
};

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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const shouldAnimate = isReady && isSectionInView;
  const itemCount = items.length;
  const shouldPeekNextCard = itemCount >= 3;
  const headerControls = useAnimationControls();
  const linkControls = useAnimationControls();
  const hasStartedAnimationRef = useRef(false);
  const [cardsActive, setCardsActive] = useState(false);

  useEffect(() => {
    if (!shouldAnimate || hasStartedAnimationRef.current) {
      return;
    }

    hasStartedAnimationRef.current = true;

    void headerControls.start('visible');
    void linkControls.start('visible');

    const startDelayMs = Math.max(0, (delay + CARD_OVERLAP_DELAY) * 1000);
    const timer = window.setTimeout(() => setCardsActive(true), startDelayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [shouldAnimate, headerControls, linkControls, delay]);

  // Full-bleed carousel that extends to screen edges while aligning first card with section text
  const carouselViewportClass = '-mx-4 sm:-mx-6 lg:-mx-8';
  const carouselContentClass = cn(
    'ml-4 gap-4 py-4 sm:ml-6 lg:ml-8',
    shouldPeekNextCard ? 'pr-16' : 'pr-0'
  );

  const carouselItemClass = shouldPeekNextCard
    ? 'basis-[70vw] pl-0 sm:basis-[65vw] md:basis-[45%]'
    : itemCount === 2
      ? 'basis-[70vw] pl-0 sm:basis-[65vw] md:basis-[calc(50%-0.5rem)]'
      : 'basis-full pl-0 sm:basis-full md:basis-full';

  return (
    <MotionSection
      ref={sectionRef}
      id={id}
      className="space-y-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <MotionHeaderShell
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
          custom={delay}
          className="flex items-center gap-3 sm:gap-6 opacity-0"
        >
          <span className={`inline-flex pl-2 h-10 w-1.5 rounded-full ${accentClass}`} />
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
          variants={linkVariants}
          initial="hidden"
          animate={linkControls}
          custom={delay}
          className="inline-flex opacity-0"
        >
          <a
            href={seeAllHref}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:translate-x-1 hover:text-primary/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            View all
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </MotionLinkShell>
      </div>
      <Carousel
        opts={{ align: 'start', containScroll: 'trimSnaps' }}
        className="relative w-full lg:hidden"
      >
        <CarouselContent
          viewportClassName={carouselViewportClass}
          className={carouselContentClass}
        >
          {items.map((item, index) => (
            <CarouselItem
              key={item.id}
              className={carouselItemClass}
            >
              <ContentCard
                item={item}
                delay={getCardStaggerDelay(index)}
                isActive={cardsActive}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <MotionGrid className="hidden w-full items-stretch gap-4 lg:flex lg:flex-nowrap">
        {items.map((item, index) => (
          <div key={`grid-${item.id}`} className="flex-1 min-w-0">
            <ContentCard
              item={item}
              delay={getCardStaggerDelay(index)}
              isActive={cardsActive}
            />
          </div>
        ))}
      </MotionGrid>
    </MotionSection>
  );
};

const featuredPublications = publications.filter((item) => item.featured);
const featuredPresentations = presentations.filter((item) => item.featured);
const featuredCodingProjects = codingProjects.filter((item) => item.featured);

const PersonalSite = () => {
  const [heroReady, setHeroReady] = useState(false);

  const handleExploreClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById('featured-publications');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-90 transition-opacity duration-300 "
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <Hero
          onReady={() => setHeroReady(true)}
          onExploreClick={handleExploreClick}
        />

        <main className="space-y-14 pb-8">
          <FeaturedSection
            id="featured-publications"
            title="Publications"
            description="Explore my journal papers, scientific reports and conference publications."
            items={featuredPublications}
            seeAllHref="/publications"
            accentClass="bg-chart-1/60"
            isReady={heroReady}
            delay={0}
          />
          <FeaturedSection
            id="featured-presentations"
            title="Presentations"
            description="Conference talks and workshops that showcase my research and some software tools I have developed."
            items={featuredPresentations}
            seeAllHref="/presentations"
            accentClass="bg-chart-3/60"
            isReady={heroReady}
            delay={0}
          />
          <FeaturedSection
            id="featured-coding"
            title="Coding Projects"
            description="Software packages, scripts, web applications and other tools I've worked on."
            items={featuredCodingProjects}
            seeAllHref="/coding"
            accentClass="bg-chart-5/60"
            isReady={heroReady}
            delay={0}
          />
        </main>
      </div>
    </div>
  );
};

export default PersonalSite;
