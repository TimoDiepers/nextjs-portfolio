# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Mixed audience: academic peers and collaborators (LCA/optimization researchers, conference contacts) evaluating work to cite or collaborate on, alongside general visibility visitors (students, LinkedIn/social contacts, casual browsers) exploring publications, talks, and open-source projects.

## Product Purpose

Personal academic portfolio for Timo Diepers, Research Associate at RWTH Aachen University. Surfaces publications, presentations, and coding projects; success means visitors can quickly find and access his research output and open-source tools, and get in touch.

## Positioning

A general researcher in LCA (Life Cycle Assessment) and LCO (Life Cycle Optimization), with a specific methodological focus on time-explicit/time-dynamic approaches, who also builds and maintains the open-source tooling (bw_timex, optimex, dynamic_characterization) that implements that research. The combination of research-plus-shipped-open-source-code, with time dynamics as the throughline, is the differentiator.

## Operating Context

Content is authored as structured data in `lib/content.ts` (publications, presentations, codingProjects — each with title, type, description, topics, links, optional images, featured flag, year). The home page (`components/home-overview.tsx`) lists and filters these by topic. Detail routes exist under `/publications`, `/presentations`, `/coding`. A `talks` route and `presentations` route both exist in `app/`. Deployed as a Next.js app (likely Vercel, per README boilerplate).

## Capabilities and Constraints

- Built with Next.js 15 (App Router, Turbopack), React 19, Tailwind v4, shadcn/ui components, framer-motion/motion, GSAP.
- Home page renders a minimal, terminal/monospace-inspired list UI (bordered list items, lowercase bracketed topic filters, underline-active state) — this is the current visual identity for the overview page.
- A `components/hero.tsx` exists (rounded profile photo, gradient-capable, animated typing text) but is not currently imported/used anywhere in `app/` or `components/` — dead code, not part of the live surface.
- Theme toggle (light/dark) is present and functional (`components/theme-toggle.tsx`, `theme-provider.tsx`).
- Social links: Mail (timo.diepers@rwth-aachen.de), LinkedIn, GitHub, ORCID.

## Brand Commitments

- Name: Timo Diepers.
- Affiliation: Research Associate, RWTH Aachen University.
- Minimal/terminal aesthetic on the home overview (monospace-leaning, bordered list rows, lowercase bracket topic tags, underline-active filter state) is an intentional, load-bearing design choice — not a placeholder to be replaced with a more conventional/decorative portfolio look.

## Evidence on Hand

- Real publications, presentations, and coding projects are enumerated in `lib/content.ts` with working external links (journal pages, GitHub repos, docs sites, slides, recordings). No testimonials, case studies, or press exist and none should be fabricated.
- Profile photos available in `public/` (`profile_pic_cut.jpeg`, `profile_pic.jpeg`, etc.) and teaser images in `public/teasers/`.

## Product Principles

- Time dynamics in LCA/optimization is the throughline; content and framing should reinforce this niche rather than presenting as a generic sustainability researcher.
- Open-source output (packages, docs, notebooks) is treated as equally important evidence as papers — surface code/tooling links alongside publications, not as an afterthought.
- Preserve the minimal/terminal visual identity on the home overview; any redesign work should intensify or refine this direction rather than replace it with a conventional decorative academic-site look.
- Keep the site functioning as a fast, low-friction index — visitors should reach the actual paper/repo/slides in one click, not be routed through unnecessary intermediate pages.
