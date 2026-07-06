# Design

Visual system for cpatb.github.io (Jekyll / academic-pages fork). The custom design
layer lives in `_sass/_custom.scss` and is imported last in `assets/css/main.scss`,
overriding the Minimal Mistakes theme. Font is loaded in `_includes/head/custom.html`.

## Concept

Clean, modern, confident. A single narrow centered column of committed typography,
bracketed by a Northwestern-purple masthead and a deep purple-black footer. Hierarchy
comes from type size/weight and hairline rules — never boxes, badges, or uppercase
tracked labels.

## Color

| Token | Value | Use |
|-------|-------|-----|
| `$accent` (`$northwestern-purple`) | `#4E2A84` | Links, actions, status dots, masthead bg. 10.6:1 on white. |
| `$ink` | `#17161c` | Headings, primary text (`$text-color` in `_variables.scss`). |
| `$ink-soft` | `#45444d` | Body prose. |
| `$ink-muted` | `#63616c` | Metadata, excerpts only (5.9:1 — never below this). |
| `$rule` | `#e9e7ef` | Hairline separators, pill borders (purple-tinted). |
| `$footer-bg` | `#1a1425` | Footer frame. |
| Body bg | `#ffffff` | Page. |

Strategy: **restrained with a committed frame** — purple carries the masthead and the
footer closes the page dark; inside the column, purple appears only where it means
something (links, arrow actions, active-status dots). Do not add badges, tinted panels,
or colored stripes.

## Typography

- **Family:** Schibsted Grotesk (Google Fonts, variable 400–900 + italics), system sans fallback. One family, committed weight contrast — no second family.
- **Page titles:** `clamp(1.9rem, 4vw, 2.4rem)`, weight 800, tracking −0.025em.
- **Home hero name:** `clamp(2rem, 5vw, 2.7rem)`, weight 800, tracking −0.03em.
- **Section h2:** 1.35rem, weight 700, tracking −0.015em. No borders, no uppercase.
- **Body:** ~1rem / 1.7–1.75, `$ink-soft`. html base is 16px, 18px ≥768px (theme reset).
- `text-wrap: balance` on h1–h3, `pretty` on content paragraphs.

## Layout

- One centered column: `#main`, `.masthead__inner-wrap`, and `.page__footer footer` all cap at **44rem** so the nav, content, and footer align.
- Sections separated by whitespace (3.25rem) and single hairline rules; entries in lists (projects, publications, posts) separated by `border-top: 1px solid $rule`.
- Research interests: unboxed `repeat(auto-fit, minmax(180px, 1fr))` grid of h3 + p.
- **Never**: cards with borders+shadows for content lists, side-stripe borders, eyebrow kickers, icon-card grids.

## Components

- **Hero** (`.home-hero`): 140px circular photo with offset hairline ring, name, purple tagline, bio, pill contact links (hairline border → purple on hover).
- **Arrow links** (`.more-link`): weight-600 purple text links with `→` that nudges 3px right on hover. Use instead of buttons for navigation.
- **Project entries** (`.project`): h2 title, dot + text status (`.project__status.active` purple / `.completed` gray), prose body. Ruled list, not cards.
- **Password gate** (`.password-gate`): input + purple button, styled in `_custom.scss` (layout: `_layouts/password.html`).

## Motion

One quiet entrance: `.home-hero` rises 10px / fades in over 0.55s `cubic-bezier(0.25, 1, 0.5, 1)`. Hover transitions ≤0.18s. All animation disabled under `prefers-reduced-motion: reduce`. No scroll-triggered reveals.

## Accessibility

WCAG AA. All text tokens ≥4.5:1 on white; `a:focus-visible` gets a 2px purple outline; muted text never lighter than `$ink-muted`.

## Build note

GitHub Pages builds via the `github-pages` gem (no local Ruby). Validate SCSS changes
with `npx sass --load-path=_sass` on a front-matter-stripped copy of
`assets/css/main.scss` before pushing.
