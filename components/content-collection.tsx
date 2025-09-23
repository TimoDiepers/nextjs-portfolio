'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Filter } from 'lucide-react';
import ContentCard from '@/components/content-card';
import type { ContentItem } from '@/lib/content';

const sortTopics = (topics: string[]) =>
  [...new Set(topics)].sort((a, b) => a.localeCompare(b));

type ContentCollectionProps = {
  title: string;
  intro: string;
  items: ContentItem[];
  backHref: string;
  backLabel: string;
};

const ContentCollection = ({
  title,
  intro,
  items,
  backHref,
  backLabel,
}: ContentCollectionProps) => {
  const availableTopics = useMemo(() => {
    const allTopics = items.flatMap((item) => item.topics);
    return sortTopics(allTopics);
  }, [items]);

  const [activeTopics, setActiveTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setActiveTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((entry) => entry !== topic)
        : [...prev, topic]
    );
  };

  const filteredItems = useMemo(() => {
    if (activeTopics.length === 0) {
      return items;
    }

    return items.filter((item) =>
      activeTopics.every((topic) => item.topics.includes(topic))
    );
  }, [items, activeTopics]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <header className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">
              Curated work
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              {intro}
            </p>
          </div>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-semibold text-primary transition-colors duration-300 hover:border-primary/50 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {backLabel}
          </Link>
        </div>
        {availableTopics.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex flex-wrap gap-2">
              {availableTopics.map((topic) => {
                const isActive = activeTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleTopic(topic)}
                    className="relative inline-flex items-center rounded-full border border-border/60 px-3 py-1.5 transition-colors duration-300"
                    aria-pressed={isActive}
                  >
                    {isActive ? (
                      <span className="absolute inset-0 rounded-full bg-primary/15" />
                    ) : null}
                    <span className="relative z-10 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {topic}
                    </span>
                  </button>
                );
              })}
            </div>
            {activeTopics.length > 0 ? (
              <button
                type="button"
                onClick={() => setActiveTopics([])}
                className="ml-auto inline-flex items-center rounded-full border border-border/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary transition-colors duration-300 hover:border-primary/50 hover:bg-primary/10"
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredItems.map((item, index) => (
          <ContentCard key={item.id} item={item} delay={index * 0.04} />
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          No items match the selected topics.
        </p>
      ) : null}
    </div>
  );
};

export default ContentCollection;
