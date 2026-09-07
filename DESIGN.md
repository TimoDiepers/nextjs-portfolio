---
name: Timo Diepers — Personal Portfolio
description: A stark black-and-white, monospace, terminal-index academic portfolio.
colors:
  ink:
    light: "#111111"
    dark: "#f3f3f3"
  paper:
    light: "#ffffff"
    dark: "#0f0f0f"
typography:
  body:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "{typography.body.fontFamily}"
    fontSize: "0.875rem"
    fontWeight: 700
rounded:
  none: "0px"
spacing:
  row-x: "0.75rem"
  row-y: "0.5rem"
  page-x: "1.5rem"
  page-y: "2.5rem"
components:
  row-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.row-y} {spacing.row-x}"
  row-link-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  filter-tag-active:
    textColor: "{colors.ink}"
---

# Design System: Timo Diepers — Personal Portfolio

## Overview

**Creative North Star: "The Terminal Index"**

The live surface reads like a directory listing rendered in a shell: monospace type throughout, hard-edged bordered rows standing in for cards, lowercase bracket tags (`[topic]`) standing in for pills, and an underline standing in for an active/selected state. There is exactly one ink color and one paper color, swapped wholesale between light and dark — no accent hue, no gradient, no photography, no illustration. Depth is expressed only through the border and through inverting ink/paper on hover, never through shadow or blur.

This restraint is deliberate and load-bearing per `PRODUCT.md`: the site indexes a researcher's publications, talks, and open-source tools, and its job is to get a visitor from the list to the actual paper/repo/slide in one click. Nothing in the system should slow that down or dress it up.

**Confirmed rejection:** a glossy, decorative academic-site look — gradient hero bands, large rounded profile-photo frames, card-grid layouts with drop shadows and colored accent pills — was evaluated and explicitly rejected. Several components implementing that language exist in the codebase (`components/hero.tsx`, `components/content-card.tsx`, `components/compact-content-item.tsx`, `components/collapsible-section.tsx`, `components/contact-section.tsx`, `components/theme-provider.tsx`, and the shadcn `components/ui/button.tsx`, `ui/card.tsx`, `ui/carousel.tsx` primitives) but are **not imported by any route** — they are orphaned, not the system. Treat them as anti-reference, not as a second valid style to extend.

**Key Characteristics:**
- Pure two-tone ink/paper palette, no accent color
- Monospace type at a single size (`text-sm`) carrying every role — hierarchy comes from weight and border, not scale
- Square corners everywhere; zero `border-radius` on the live surface
- Zero shadows; depth = 1px border + full ink/paper inversion on hover/active
- Bracket notation (`[label]`) as the recurring tag/filter affordance
- Underline-with-offset as the only "selected/active" signal

## Colors

Two roles only, swapped as a pair between themes — there is no independent light/dark tuning of either token.

### Primary / Neutral
- **Ink** (`#111111` light / `#f3f3f3` dark): all text, all borders (`border-color` is set to the ink token globally), and the hover-fill background.
- **Paper** (`#ffffff` light / `#0f0f0f` dark): page background, and the hover-state text color (ink and paper trade places on hover).

### Named Rules
**The Two-Tone Rule.** The system never introduces a third color. No accent, no semantic red/green, no brand hue. If a future surface needs to signal something extra, do it with weight, brackets, or underline — not color.

## Typography

**Body/Display/Label Font:** `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` — one stack for the entire site, no serif or humanist sans anywhere on the live surface.

**Character:** Flat and utilitarian, like reading a log file. Weight (regular vs. bold) and structure (borders, brackets) carry hierarchy instead of a type scale.

### Hierarchy
- **Body** (400, 0.875rem / `text-sm`, 1.4 line-height): every paragraph, nav item, label, and list row body copy.
- **Label** (700, 0.875rem / `text-sm` + `font-bold`): page title (`Timo Diepers`), item titles inside rows, section headings.
- **Meta** (400, 0.875rem, `tracking-[0.2em]`, lowercase): section headers on the home page (`publications`, `presentations`, `coding`) — the one place letter-spacing is used to mark a heading role.

### Named Rules
**The One Size Rule.** There is no larger/smaller type step anywhere on the live pages. Do not introduce a display or headline size without a confirmed product reason — the flatness is the point.

## Layout

Single-column, centered, capped at `max-w-3xl` (48rem), with `px-6` horizontal and generous vertical rhythm (`py-10` on the overview, `gap-10` between major sections). Detail pages use the same shell (`max-w-3xl`, `px-6 py-10`) with `gap-8`. No grid, no sidebar, no multi-column layout on any live route — content is a single vertical list at every breakpoint; responsiveness is handled by the container narrowing, not by reflowing columns.

## Elevation & Depth

Flat by design. There are no shadows anywhere in the live CSS or components. Depth and interactivity are communicated by a 1px border (`border border-foreground`) around every row/card-equivalent, and by a full background/foreground color swap on hover (`hover:bg-foreground hover:text-background`) plus a matching `hover:ring-1 hover:ring-foreground/60`.

### Named Rules
**The Invert-Not-Lift Rule.** Interactive rows respond to hover/focus by inverting ink and paper, never by adding shadow, scale, or blur.

## Shapes

Every bordered element is a sharp-cornered rectangle — no `border-radius` is used anywhere on the live surface. Borders are always 1px, solid, in the ink color (`border-color: var(--foreground)` is set globally via the universal selector in `app/globals.css`).

### Named Rules
**The Square Rule.** Radius is 0 everywhere on the live surface. Do not introduce rounded corners (`rounded-*`) into the shipped system — that language belongs to the orphaned card components and is explicitly not part of this identity.

## Components

### List Row (the signature component)
The system's one true "card": a `border border-foreground` rectangle containing a bold title line and a lighter meta line (`year · type`), used identically for publications, presentations, and coding entries.
- **Shape:** square corners, 1px solid ink border, `px-3 py-2` internal padding.
- **Default:** transparent background, ink text.
- **Hover/Active (when linked):** background and text fully invert (`hover:bg-foreground hover:text-background`) plus a matching 1px ring.
- **Non-interactive variant:** same border/padding, no hover state, used when an item has no link.

### Bracket Tag
Topic filters and detail-page topic labels are rendered as lowercase text wrapped in literal brackets (`[lca]`, `[optimization]`) rather than a pill/chip — no background fill, no rounded shape.
- **Default:** `opacity-70`, no underline.
- **Active/Selected:** `font-medium`, `underline underline-offset-4 decoration-1`, full opacity.
- **Hover (inactive):** `opacity-100` with no underline change until selected.

### Theme Toggle
A `[light] [dark]` radio-group pair, styled identically to a bracket tag set: the active option gets the underline treatment, the inactive option sits at reduced opacity. No switch/slider control is used.

### Navigation (Back link, detail pages)
Plain underlined text link (`text-sm !underline`), no border, no button chrome — intentionally lighter-weight than the list rows since it's a wayfinding action, not content.

## Do's and Don'ts

### Do:
- **Do** keep every interactive surface a 1px square-cornered border with full ink/paper inversion on hover — that is the system's entire interaction vocabulary.
- **Do** use lowercase bracket notation (`[topic]`) for tags/filters instead of colored pills.
- **Do** keep type to the single monospace stack at `text-sm`; use weight and letter-spacing, not size, to differentiate roles.
- **Do** keep layout single-column and capped at `max-w-3xl` on every page.

### Don't:
- **Don't** introduce `border-radius`, `box-shadow`, or an accent color into any live page — that is the orphaned card/hero language (`content-card.tsx`, `hero.tsx`, `compact-content-item.tsx`, `collapsible-section.tsx`, `contact-section.tsx`, the shadcn `ui/*` primitives) and is explicitly rejected, not a fallback style.
- **Don't** add a display/headline type size. The flat one-size hierarchy is intentional.
- **Don't** add photography, illustration, or gradient backgrounds to the overview or detail pages.
- **Don't** extend or wire up `theme-provider.tsx`'s context — the live theme toggle manages `<html class="dark">` and `localStorage` directly in `theme-toggle.tsx`; the two implementations currently disagree and should not both be built out further without reconciling them first.
