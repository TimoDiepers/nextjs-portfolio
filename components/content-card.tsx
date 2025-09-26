'use client';

import Image from 'next/image';
import { memo, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import type { ContentItem } from '@/lib/content';

type ContentCardProps = {
  item: ContentItem;
  delay?: number;
  disableAnimation?: boolean;
  isActive?: boolean;
};

const ContentCard = ({
  item,
  delay = 0,
  disableAnimation = false,
  isActive,
}: ContentCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !(disableAnimation || shouldReduceMotion);
  const usesParentTrigger = shouldAnimate && typeof isActive === 'boolean';

  const transition = useMemo(
    () => ({
      duration: 0.35,
      ease: 'easeOut' as const,
      delay: shouldAnimate ? delay : 0,
    }),
    [delay, shouldAnimate]
  );

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition },
    }),
    [transition]
  );

  const containerClassName = shouldAnimate
    ? 'h-full will-change-transform opacity-0'
    : 'h-full will-change-transform';

  const cardBody = (
    <Card className="group relative flex h-full flex-col rounded-3xl bg-card transition-colors transition-transform duration-500 hover:scale-[1.02]">
      <CardContent className="flex h-full flex-col gap-4 p-5 sm:p-6">
        {item.image ? (
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
            <Image
              src={item.image}
              alt={`${item.title} teaser`}
              width={640}
              height={400}
              loading="lazy"
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
              className="h-40 w-full object-cover"
            />
          </div>
        ) : null}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-snug transition-colors duration-200 group-hover:text-primary sm:text-xl">
              {item.title}
            </h3>
            {item.meta ? (
              <p className="text-xs uppercase tracking-wide text-muted-foreground pt-2">
                {item.meta}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {item.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-3 text-sm">
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary transition-colors duration-350 hover:text-white hover:bg-primary"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (!shouldAnimate) {
    return (
      <motion.div initial={false} className="h-full will-change-transform">
        {cardBody}
      </motion.div>
    );
  }

  if (usesParentTrigger) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        className={containerClassName}
      >
        {cardBody}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className={containerClassName}
    >
      {cardBody}
    </motion.div>
  );
};

export default memo(ContentCard);
