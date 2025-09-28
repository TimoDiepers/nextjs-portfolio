'use client';

import React, { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ContentItem } from '@/lib/content';

type CompactContentItemProps = {
  item: ContentItem;
  delay?: number;
  isActive?: boolean;
};

const CompactContentItem: React.FC<CompactContentItemProps> = ({
  item,
  delay = 0,
  isActive = false,
}) => {
  const shouldAnimate = delay > 0 || isActive;

  const variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.25, 
        ease: 'easeOut' as const, 
        delay: shouldAnimate ? delay : 0 
      } 
    },
  };

  const itemContent = (
    <div className="group flex items-start gap-3 rounded-lg bg-card/50 p-3 transition-all duration-200 hover:bg-card/80 hover:shadow-sm">
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h4>
            {item.meta && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.meta}
              </p>
            )}
          </div>
          <div className="flex gap-1.5 ml-2">
            {item.links.slice(0, 2).map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary/70 hover:text-primary transition-colors"
              >
                {link.label}
                <ArrowUpRight className="h-2.5 w-2.5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {item.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center rounded-full bg-background/80 px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {topic}
            </span>
          ))}
          {item.topics.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-background/80 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
              +{item.topics.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (!shouldAnimate) {
    return itemContent;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      className="will-change-transform"
    >
      {itemContent}
    </motion.div>
  );
};

export default memo(CompactContentItem);