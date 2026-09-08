'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import ThemeToggle from '@/components/theme-toggle';
import type { ContentItem } from '@/lib/content';
import { getItemType, getItemYear, orderByDateDesc } from '@/lib/content-helpers';

type ContentDetailPageProps = {
  item: ContentItem;
  collection: ContentItem[];
  categoryLabel: string;
  categoryAnchor: string;
  basePath: string;
};

const ContentDetailPage = ({
  item,
  collection,
  categoryLabel,
  categoryAnchor,
  basePath,
}: ContentDetailPageProps) => {
  const router = useRouter();
  const itemType = getItemType(item, 'Item');
  const itemYear = getItemYear(item);
  const hasYear = itemYear !== '—';

  const orderedCollection = orderByDateDesc(collection);
  const currentIndex = orderedCollection.findIndex((collectionItem) => collectionItem.id === item.id);
  const previousItem = currentIndex > 0 ? orderedCollection[currentIndex - 1] : undefined;
  const nextItem =
    currentIndex >= 0 && currentIndex < orderedCollection.length - 1
      ? orderedCollection[currentIndex + 1]
      : undefined;

  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (event.key === 'ArrowLeft' && previousItem) {
        router.push(`${basePath}/${previousItem.id}`);
      }

      if (event.key === 'ArrowRight' && nextItem) {
        router.push(`${basePath}/${nextItem.id}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, basePath, previousItem, nextItem]);

  useEffect(() => {
    const node = mainRef.current;
    if (!node) return;

    const SWIPE_DISTANCE_PX = 64;
    const SWIPE_MAX_DURATION_MS = 600;
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const elapsed = Date.now() - startTime;

      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.5;
      const isDecisive = Math.abs(deltaX) > SWIPE_DISTANCE_PX && elapsed < SWIPE_MAX_DURATION_MS;

      if (!isHorizontal || !isDecisive) return;

      if (deltaX < 0 && nextItem) {
        router.push(`${basePath}/${nextItem.id}`);
      } else if (deltaX > 0 && previousItem) {
        router.push(`${basePath}/${previousItem.id}`);
      }
    };

    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchend', handleTouchEnd);
    };
  }, [router, basePath, previousItem, nextItem]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <main
        ref={mainRef}
        className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-10 text-sm"
      >
        <div className="flex items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="text-sm">
            <Link href="/" className="!underline opacity-90 transition-opacity duration-150 hover:opacity-100">
              Overview
            </Link>
            <span aria-hidden="true"> / </span>
            <Link
              href={`/#${categoryAnchor}`}
              className="!underline opacity-90 transition-opacity duration-150 hover:opacity-100"
            >
              {categoryLabel}
            </Link>
          </nav>
          <ThemeToggle size="sm" />
        </div>

        <article id="main-content" className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-sm font-bold">{item.title}</h1>
            <p className="text-sm">
              {itemType}
              {hasYear ? (
                <>
                  {' · '}
                  <span className="tabular-nums">{itemYear}</span>
                </>
              ) : null}
            </p>

            {item.topics.length > 0 ? (
              <ul className="flex flex-wrap gap-2 pt-2">
                {item.topics.map((topic) => (
                  <li key={topic}>
                    <span className="inline-flex items-center text-sm">
                      [{topic.toLowerCase()}]
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <p>{item.description}</p>

          {item.links.length > 0 ? (
            <section className="space-y-2">
              <h2 className="text-sm uppercase tracking-wide">Links</h2>
              <ul className="list-disc space-y-1 pl-5">
                {item.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 underline decoration-1 underline-offset-4"
                      style={{ textDecoration: 'underline', textUnderlineOffset: '0.2em' }}
                    >
                      {link.label}
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>

        {previousItem || nextItem ? (
          <nav
            aria-label={`More ${categoryLabel.toLowerCase()}`}
            className="space-y-1 border-t border-foreground pt-4 text-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {previousItem ? (
                  <Link
                    href={`${basePath}/${previousItem.id}`}
                    prefetch
                    className="!underline opacity-90 transition-opacity duration-150 hover:opacity-100"
                  >
                    ← {previousItem.title}
                  </Link>
                ) : (
                  <span className="opacity-60">start of {categoryLabel.toLowerCase()}</span>
                )}
              </div>
              <div className="min-w-0 text-right">
                {nextItem ? (
                  <Link
                    href={`${basePath}/${nextItem.id}`}
                    prefetch
                    className="!underline opacity-90 transition-opacity duration-150 hover:opacity-100"
                  >
                    {nextItem.title} →
                  </Link>
                ) : (
                  <span className="opacity-60">end of {categoryLabel.toLowerCase()}</span>
                )}
              </div>
            </div>
            <p className="hidden text-sm opacity-60 sm:block">use ← / → to browse</p>
            <p className="text-sm opacity-60 sm:hidden">swipe to browse</p>
          </nav>
        ) : null}
      </main>
    </>
  );
};

export default ContentDetailPage;
