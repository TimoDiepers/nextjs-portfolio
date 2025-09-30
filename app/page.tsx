'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, type Variants, useAnimationControls, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import Hero from '@/components/hero';
import ContactSection from '@/components/contact-section';
import ContentCard from '@/components/content-card';
import CompactContentItem from '@/components/compact-content-item';
import CollapsibleSection from '@/components/collapsible-section';
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
  accentClass: string;
};

const MotionHeaderShell = motion.create('div');
const MotionAccent = motion.create('span');
const MotionTitle = motion.create('h2');
const MotionDescription = motion.create('p');
const MotionHighlightsShell = motion.create('div');
const MotionDividerShell = motion.create('div');
const MotionLinkShell = motion.create('div');
const MotionSection = motion.create('section');
const MotionGrid = motion.create('div');

const CARD_STAGGER_GROUP = 3;
const CARD_STAGGER_DELAY = 0.1;
const CARD_OVERLAP_DELAY = 0.2;
const COMPACT_PREVIEW_COUNT = 3;
const MORE_DIVIDER_DELAY = 0.1;
const COMPACT_BASE_DELAY_OFFSET = MORE_DIVIDER_DELAY;
const COMPACT_ITEM_STAGGER = 0.08;
const COLLAPSED_ITEM_STAGGER = 0.1;
const HEADER_CHILD_STAGGER = 0.08;

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

const headerChildVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut', delay },
  }),
};

const dividerVariants: Variants = {
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
  accentClass,
  isReady,
  delay,
}) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const highlightsRef = useRef<HTMLDivElement | null>(null);
  const moreSectionRef = useRef<HTMLDivElement | null>(null);

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.7 });
  const isHighlightsInView = useInView(highlightsRef, { once: true, amount: 0.15 });
  const isMoreSectionInView = useInView(moreSectionRef, { once: true, amount: 0.3 });

  const shouldAnimateHeader = isReady && isHeaderInView;
  const shouldAnimateHighlights = isReady && isHighlightsInView;
  const shouldAnimateMore = isReady && isMoreSectionInView;

  // Separate featured and non-featured items
  const featuredItems = items.filter(item => item.featured);
  const nonFeaturedItems = items.filter(item => !item.featured);
  
  const shouldPeekNextCard = featuredItems.length >= 3;
  const headerControls = useAnimationControls();
  const linkControls = useAnimationControls();
  const highlightsControls = useAnimationControls();
  const dividerControls = useAnimationControls();
  const hasStartedHeaderRef = useRef(false);
  const hasStartedHighlightsRef = useRef(false);
  const hasTriggeredDividerRef = useRef(false);
  const [cardsActive, setCardsActive] = useState(false);
  const [moreItemsActive, setMoreItemsActive] = useState(false);
  
  useEffect(() => {
    if (!shouldAnimateHeader || hasStartedHeaderRef.current) {
      return;
    }

    hasStartedHeaderRef.current = true;

    void headerControls.start('visible');
    void linkControls.start('visible');
  }, [shouldAnimateHeader, headerControls, linkControls]);

  useEffect(() => {
    if (!shouldAnimateHighlights || hasStartedHighlightsRef.current) {
      return;
    }

    hasStartedHighlightsRef.current = true;

    void highlightsControls.start('visible');

    const startDelayMs = Math.max(0, (delay + CARD_OVERLAP_DELAY) * 1000);
    const timer = window.setTimeout(() => setCardsActive(true), startDelayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [shouldAnimateHighlights, highlightsControls, delay]);

  useEffect(() => {
    if (!shouldAnimateMore || hasTriggeredDividerRef.current) {
      return;
    }

    hasTriggeredDividerRef.current = true;
    void dividerControls.start('visible');

    setMoreItemsActive(true);
  }, [shouldAnimateMore, dividerControls]);

  const carouselViewportClass = 'px-4 sm:px-6 lg:px-8';
  const carouselContentClass = cn(
    'ml-0 gap-4 py-4',
    shouldPeekNextCard ? 'pr-16' : 'pr-0'
  );

  const carouselItemClass = shouldPeekNextCard
    ? 'basis-[80vw] pl-0 sm:basis-[65vw] md:basis-[45%]'
    : featuredItems.length === 2
      ? 'basis-[80vw] pl-0 sm:basis-[65vw] md:basis-[calc(50%-0.5rem)]'
      : 'basis-full pl-0 sm:basis-full md:basis-full';

  return (
    <MotionSection
      id={id}
      className="space-y-5"
    >
      <div
        ref={headerRef}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <MotionHeaderShell
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
          custom={delay}
          className="flex items-center gap-3 sm:gap-6 opacity-0"
        >
          <MotionAccent
            variants={headerChildVariants}
            custom={delay}
            className={`inline-flex pl-2 h-12 w-2 rounded-full ${accentClass}`}
          />
          <div>
            <MotionTitle
              variants={headerChildVariants}
              custom={delay + HEADER_CHILD_STAGGER}
              className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl pt-4"
            >
              {title}
            </MotionTitle>
            <MotionDescription
              variants={headerChildVariants}
              custom={delay + HEADER_CHILD_STAGGER * 2}
              className="max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              {description}
            </MotionDescription>
          </div>
        </MotionHeaderShell>
      </div>
      
      {/* Featured items in full card format */}
      {featuredItems.length > 0 && (
        <div ref={highlightsRef} className="space-y-5">
          {/* Animated highlights indicator */}
          <MotionHighlightsShell
            variants={headerVariants}
            initial="hidden"
            animate={highlightsControls}
            custom={delay + 0.1}
            className="flex items-center justify-center gap-3 opacity-0"
          >
            <div className="h-px flex-1 bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center">
                <svg
                  className="h-4 w-4 fill-current text-muted-foreground"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2L13.09 8.26L20 9L15 13.74L16.18 20.02L10 16.77L3.82 20.02L5 13.74L0 9L6.91 8.26L10 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Highlights
              </span>
            </div>
            <div className="h-px flex-1 bg-border" />
          </MotionHighlightsShell>
          
          <Carousel
            opts={{ align: 'start', containScroll: 'trimSnaps' }}
            className="relative w-screen lg:hidden -mx-4 sm:-mx-6 lg:-mx-8"
          >
            <CarouselContent
              viewportClassName={carouselViewportClass}
              className={carouselContentClass}
            >
              {featuredItems.map((item, index) => (
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
            {featuredItems.map((item, index) => (
              <div key={`grid-${item.id}`} className="flex-1 min-w-0">
                <ContentCard
                  item={item}
                  delay={getCardStaggerDelay(index)}
                  isActive={cardsActive}
                />
              </div>
            ))}
          </MotionGrid>
        </div>
      )}
      
      {/* Non-featured items in compact format with collapsibility */}
      {nonFeaturedItems.length > 0 && (
        <div ref={moreSectionRef} className="space-y-3">
          {featuredItems.length > 0 && (
            <MotionDividerShell
              variants={dividerVariants}
              initial="hidden"
              animate={dividerControls}
              custom={delay + MORE_DIVIDER_DELAY}
              className="flex items-center justify-center gap-3 pt-2 opacity-0"
            >
              <div className="h-px flex-1 bg-border" />
              <span className="px-2 text-sm font-medium text-muted-foreground">
                More {title}
              </span>
              <div className="h-px flex-1 bg-border" />
            </MotionDividerShell>
          )}
          
          {/* Always show first 3 non-featured items */}
          <div className="grid gap-2">
            {nonFeaturedItems.slice(0, COMPACT_PREVIEW_COUNT).map((item, index) => (
              <CompactContentItem
                key={item.id}
                item={item}
                delay={delay + COMPACT_BASE_DELAY_OFFSET + index * COMPACT_ITEM_STAGGER}
                isActive={moreItemsActive}
              />
            ))}
          </div>
          
          {/* Collapsible section for remaining items */}
          {nonFeaturedItems.length > COMPACT_PREVIEW_COUNT && (
              <CollapsibleSection 
                expandText={`Show ${nonFeaturedItems.length - COMPACT_PREVIEW_COUNT} more`}
                collapseText="Show less"
                isActive={moreItemsActive}
                delay={delay + 0.3}
              >
                <div className="grid gap-2">
                  {nonFeaturedItems.slice(COMPACT_PREVIEW_COUNT).map((item, index) => (
                    <CompactContentItem
                      key={item.id}
                      item={item}
                      delay={index * COLLAPSED_ITEM_STAGGER}
                      isActive={moreItemsActive}
                    />
                  ))}
              </div>
            </CollapsibleSection>
          )}
        </div>
      )}
    </MotionSection>
  );
};

// Remove the filtering - pass all items to show both featured and non-featured
const PersonalSite = () => {
  const [heroReady, setHeroReady] = useState(false);

  const handleExploreClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById('featured-publications');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleContactClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById('contact');
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
          onContactClick={handleContactClick}
        />

        <main className="space-y-14 pb-8">
          <FeaturedSection
            id="featured-publications"
            title="Publications"
            description="Explore my journal papers and scientific reports."
            items={publications}
            accentClass="bg-chart-1/60"
            isReady={heroReady}
            delay={0}
          />
          <FeaturedSection
            id="featured-coding"
            title="Coding Projects"
            description="Software packages, scripts, web applications and other tools I've worked on."
            items={codingProjects}
            accentClass="bg-chart-3/60"
            isReady={heroReady}
            delay={0}
          />
          <FeaturedSection
            id="featured-presentations"
            title="Presentations"
            description="Conference talks and workshops that showcase my research and some software tools I have developed."
            items={presentations}
            accentClass="bg-chart-5/60"
            isReady={heroReady}
            delay={0}
          />
        </main>
        
        <ContactSection isReady={heroReady} />
      </div>
    </div>
  );
};

export default PersonalSite;
