'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import BootIntro from '@/components/boot-intro';
import FileTree from '@/components/file-tree';
import ThemeToggle from '@/components/theme-toggle';
import { codingProjects, presentations, publications, type ContentItem } from '@/lib/content';

const socialLinks = [
  { href: 'mailto:timo.diepers@rwth-aachen.de', label: 'Mail' },
  { href: 'https://www.linkedin.com/in/timo-diepers/', label: 'LinkedIn' },
  { href: 'https://github.com/TimoDiepers', label: 'GitHub' },
  { href: 'https://orcid.org/0009-0002-8566-8618', label: 'ORCID' },
];

const getFilteredItems = (items: ContentItem[], activeTopics: string[], query: string) => {
  let result = items;

  if (activeTopics.length > 0) {
    result = result.filter((item) => activeTopics.some((topic) => item.topics.includes(topic)));
  }

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.length > 0) {
    result = result.filter((item) =>
      [item.title, item.description, item.type ?? '']
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }

  return result;
};

const allTopics = Array.from(
  new Set([...publications, ...presentations, ...codingProjects].flatMap((item) => item.topics)),
).sort((a, b) => a.localeCompare(b));

const HomeOverview = () => {
  const router = useRouter();
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;

      if (
        (event.key === 'f' || event.key === 'F') &&
        !isTyping &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        event.preventDefault();
        searchRef.current?.focus();
        return;
      }

      if (event.key === 'Escape' && target === searchRef.current) {
        setQuery('');
        searchRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const routes = [
      ...publications.map((item) => `/publications/${item.id}`),
      ...presentations.map((item) => `/presentations/${item.id}`),
      ...codingProjects.map((item) => `/coding/${item.id}`),
    ];

    const prefetchRoutes = () => {
      routes.forEach((route) => router.prefetch(route));
    };

    if (typeof window === 'undefined') {
      return;
    }

    const win = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (win.requestIdleCallback && win.cancelIdleCallback) {
      const idleHandle = win.requestIdleCallback(prefetchRoutes, { timeout: 1500 });
      return () => win.cancelIdleCallback?.(idleHandle);
    }

    const timeoutHandle = globalThis.setTimeout(prefetchRoutes, 250);
    return () => globalThis.clearTimeout(timeoutHandle);
  }, [router]);

  const filteredPublications = useMemo(
    () => getFilteredItems(publications, activeTopics, query),
    [activeTopics, query],
  );
  const filteredPresentations = useMemo(
    () => getFilteredItems(presentations, activeTopics, query),
    [activeTopics, query],
  );
  const filteredCoding = useMemo(
    () => getFilteredItems(codingProjects, activeTopics, query),
    [activeTopics, query],
  );

  const toggleTopic = (topic: string) => {
    setActiveTopics((current) =>
      current.includes(topic) ? current.filter((activeTopic) => activeTopic !== topic) : [...current, topic],
    );
  };

  const trimmedQuery = query.trim();
  const hasActiveQuery = trimmedQuery.length > 0;
  const isEasterEgg = trimmedQuery.toLowerCase() === 'whoami';

  const emptyMessage = hasActiveQuery
    ? `no matches for "${trimmedQuery}"`
    : activeTopics.length > 0
      ? `no entries tagged ${activeTopics.map((topic) => `[${topic.toLowerCase()}]`).join(' ')}`
      : 'no matching entries';

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <main className="entrance mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-10 text-sm">
        <header className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-sm font-bold">Timo Diepers</h1>
            <ThemeToggle size="sm" />
          </div>

          <BootIntro />

          <div className="flex items-center gap-2 pt-4">
            <label htmlFor="site-search" className="text-sm opacity-70">
              &gt;
            </label>
            <div className="relative w-full min-w-0">
              <input
                id="site-search"
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="search…"
                className="w-full border border-foreground bg-transparent px-2 py-1 pr-9 text-sm placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
              />
              {!searchFocused && !hasActiveQuery ? (
                <kbd
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
                >
                  f
                </kbd>
              ) : null}
            </div>
          </div>

          <nav
            aria-label="Topic filters"
            className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-2 text-sm"
          >
            <span className="text-sm">Filter:</span>
            <button
              type="button"
              onClick={() => {
                setActiveTopics([]);
                setQuery('');
              }}
              aria-pressed={activeTopics.length === 0 && !hasActiveQuery}
              className={`cursor-pointer px-1 py-0.5 transition-opacity duration-150 ${
                activeTopics.length === 0 && !hasActiveQuery
                  ? 'font-medium underline underline-offset-4 decoration-1'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              all
            </button>
            {allTopics.map((filterTopic) => {
              const isActive = activeTopics.includes(filterTopic);

              return (
                <button
                  type="button"
                  key={filterTopic}
                  onClick={() => toggleTopic(filterTopic)}
                  aria-pressed={isActive}
                  className={`cursor-pointer px-1 py-0.5 transition-opacity duration-150 ${
                    isActive
                      ? 'font-medium underline underline-offset-4 decoration-1'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  [{filterTopic.toLowerCase()}]
                </button>
              );
            })}
          </nav>
        </header>

        <div id="main-content">
          {isEasterEgg ? (
            <section aria-labelledby="whoami-heading" className="space-y-3">
              <h2
                id="whoami-heading"
                className="border-b border-foreground pb-1 text-sm lowercase tracking-[0.2em]"
              >
                whoami
              </h2>
              <div className="border border-foreground px-3 py-2">
                <p className="font-bold">Timo Diepers</p>
                <p className="text-sm opacity-80">researcher · programmer · engineer</p>
              </div>
            </section>
          ) : (
            <FileTree
              folders={[
                {
                  id: 'publications',
                  label: 'publications',
                  basePath: '/publications',
                  fallbackType: 'Publication',
                  items: filteredPublications,
                },
                {
                  id: 'presentations',
                  label: 'presentations',
                  basePath: '/presentations',
                  fallbackType: 'Presentation',
                  items: filteredPresentations,
                },
                {
                  id: 'coding',
                  label: 'coding',
                  basePath: '/coding',
                  fallbackType: 'Coding',
                  items: filteredCoding,
                },
              ]}
              emptyMessage={emptyMessage}
            />
          )}
        </div>

        <footer className="border-t border-foreground pt-4 text-sm">
          <nav aria-label="Social links" className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="border border-foreground px-2 py-1 transition-colors duration-150 ease-out hover:bg-foreground hover:text-background"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </footer>
      </main>
    </>
  );
};

export default HomeOverview;
