'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { ContentItem } from '@/lib/content';
import { getItemType, getItemYear, orderByDateDesc } from '@/lib/content-helpers';

export type TreeFolder = {
  id: string;
  label: string;
  basePath: string;
  fallbackType: string;
  items: ContentItem[];
};

type ChildNode =
  | {
      kind: 'file';
      id: string;
      folderId: string;
      item: ContentItem;
      fallbackType: string;
      basePath: string;
      prefix: string;
      focusable: true;
    }
  | { kind: 'empty'; id: string; folderId: string; message: string; prefix: string; focusable: false };

type FocusableNode =
  | { kind: 'folder'; id: string; folderId: string; focusable: true }
  | Extract<ChildNode, { focusable: true }>;

const folderPrefix = (isLastFolder: boolean) => (isLastFolder ? '`-- ' : '|-- ');
const childPrefix = (parentIsLastFolder: boolean, isLastChild: boolean) =>
  (parentIsLastFolder ? '    ' : '|   ') + (isLastChild ? '`-- ' : '|-- ');

const ROW_CLASSNAME =
  'flex items-baseline gap-0 rounded-none px-1 py-1 mb-1 outline-none transition-colors duration-150 ease-out hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background';

const FileTree = ({ folders, emptyMessage }: { folders: TreeFolder[]; emptyMessage: string }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(folders.map((folder) => [folder.id, true])),
  );
  const [activeId, setActiveId] = useState<string>(folders[0]?.id ?? '');
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});

  const orderedByFolder = useMemo(
    () => Object.fromEntries(folders.map((folder) => [folder.id, orderByDateDesc(folder.items)])),
    [folders],
  );

  // Always-present children per folder, independent of expanded state — used for rendering,
  // so the collapse/expand transition has real content to animate to and from.
  const childrenByFolder = useMemo(() => {
    const map: Record<string, ChildNode[]> = {};

    folders.forEach((folder, folderIndex) => {
      const isLastFolder = folderIndex === folders.length - 1;
      const items = orderedByFolder[folder.id] ?? [];

      if (items.length === 0) {
        map[folder.id] = [
          {
            kind: 'empty',
            id: `${folder.id}__empty`,
            folderId: folder.id,
            message: emptyMessage,
            prefix: childPrefix(isLastFolder, true),
            focusable: false,
          },
        ];
        return;
      }

      map[folder.id] = items.map((item, itemIndex) => ({
        kind: 'file',
        id: item.id,
        folderId: folder.id,
        item,
        fallbackType: folder.fallbackType,
        basePath: folder.basePath,
        prefix: childPrefix(isLastFolder, itemIndex === items.length - 1),
        focusable: true,
      }));
    });

    return map;
  }, [folders, orderedByFolder, emptyMessage]);

  // Nav-relevant nodes only: children of collapsed folders are excluded so arrow keys skip them.
  const focusableNodes = useMemo(() => {
    const nodes: FocusableNode[] = [];

    folders.forEach((folder) => {
      nodes.push({ kind: 'folder', id: folder.id, folderId: folder.id, focusable: true });

      if (!expanded[folder.id]) {
        return;
      }

      childrenByFolder[folder.id]?.forEach((child) => {
        if (child.focusable) nodes.push(child);
      });
    });

    return nodes;
  }, [folders, expanded, childrenByFolder]);

  useEffect(() => {
    if (focusableNodes.length > 0 && !focusableNodes.some((node) => node.id === activeId)) {
      setActiveId(focusableNodes[0].id);
    }
  }, [focusableNodes, activeId]);

  const focusNode = (id: string) => {
    setActiveId(id);
    nodeRefs.current[id]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent, node: FocusableNode) => {
    const index = focusableNodes.findIndex((candidate) => candidate.id === node.id);

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const next = focusableNodes[index + 1];
        if (next) focusNode(next.id);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const previous = focusableNodes[index - 1];
        if (previous) focusNode(previous.id);
        break;
      }
      case 'ArrowRight': {
        event.preventDefault();
        if (node.kind === 'folder') {
          if (!expanded[node.folderId]) {
            setExpanded((current) => ({ ...current, [node.folderId]: true }));
          } else {
            const next = focusableNodes[index + 1];
            if (next && next.folderId === node.folderId) focusNode(next.id);
          }
        } else {
          router.push(`${node.basePath}/${node.item.id}`);
        }
        break;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        if (node.kind === 'folder' && expanded[node.folderId]) {
          setExpanded((current) => ({ ...current, [node.folderId]: false }));
        } else {
          focusNode(node.folderId);
        }
        break;
      }
      case 'Home': {
        event.preventDefault();
        if (focusableNodes[0]) focusNode(focusableNodes[0].id);
        break;
      }
      case 'End': {
        event.preventDefault();
        const last = focusableNodes[focusableNodes.length - 1];
        if (last) focusNode(last.id);
        break;
      }
      case 'Enter':
      case ' ': {
        if (node.kind === 'folder') {
          event.preventDefault();
          setExpanded((current) => ({ ...current, [node.folderId]: !current[node.folderId] }));
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div role="tree" aria-label="Content index" className="text-sm">
      <p aria-hidden="true" className="opacity-50">
        .
      </p>
      {folders.map((folder, folderIndex) => {
        const isLastFolder = folderIndex === folders.length - 1;
        const isExpanded = expanded[folder.id];
        const count = (orderedByFolder[folder.id] ?? []).length;

        return (
          <div key={folder.id}>
            <div
              id={`${folder.id}-heading`}
              ref={(el) => {
                nodeRefs.current[folder.id] = el;
              }}
              role="treeitem"
              aria-expanded={isExpanded}
              aria-selected={activeId === folder.id}
              aria-level={1}
              tabIndex={activeId === folder.id ? 0 : -1}
              onFocus={() => setActiveId(folder.id)}
              onClick={() => setExpanded((current) => ({ ...current, [folder.id]: !current[folder.id] }))}
              onKeyDown={(event) => handleKeyDown(event, { kind: 'folder', id: folder.id, folderId: folder.id, focusable: true })}
              className={`${ROW_CLASSNAME} cursor-pointer ${
                folderIndex > 0 ? 'mt-3 border-t border-foreground pt-3' : ''
              }`}
            >
              <span aria-hidden="true" className="shrink-0 opacity-50">
                {folderPrefix(isLastFolder)}
              </span>
              <span className="font-bold tracking-[0.1em]">{folder.label}/</span>
              <span className="tabular-nums pl-2 opacity-60">{count}</span>
              <span aria-hidden="true" className="pl-2 opacity-50">
                {isExpanded ? '[-]' : '[+]'}
              </span>
            </div>

            <div
              className="tree-branch"
              style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
              aria-hidden={!isExpanded}
            >
              <div style={{ opacity: isExpanded ? 1 : 0 }}>
                {childrenByFolder[folder.id]?.map((node) => {
                  if (node.kind === 'empty') {
                    return (
                      <div key={node.id} className="flex items-baseline gap-0 px-1 py-1 mb-1 opacity-60">
                        <span aria-hidden="true" className="shrink-0">
                          {node.prefix}
                        </span>
                        <span>{node.message}</span>
                      </div>
                    );
                  }

                  const { item } = node;
                  const year = getItemYear(item);
                  const hasYear = year !== '—';

                  return (
                    <Link
                      key={node.id}
                      href={`${node.basePath}/${item.id}`}
                      prefetch
                      ref={(el) => {
                        nodeRefs.current[node.id] = el;
                      }}
                      role="treeitem"
                      aria-level={2}
                      aria-selected={activeId === node.id}
                      tabIndex={isExpanded && activeId === node.id ? 0 : -1}
                      onFocus={() => setActiveId(node.id)}
                      onKeyDown={(event) => handleKeyDown(event, node)}
                      className={ROW_CLASSNAME}
                    >
                      <span aria-hidden="true" className="shrink-0 opacity-50">
                        {node.prefix}
                      </span>
                      <span className="min-w-0">
                        <span className="font-bold">{item.title}</span>{' '}
                        <span className="opacity-70">
                          {hasYear ? <span className="tabular-nums">{year}</span> : null}
                          {hasYear ? ' · ' : ''}
                          {getItemType(item, node.fallbackType)}
                          {item.featured ? ' · [featured]' : ''}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileTree;
