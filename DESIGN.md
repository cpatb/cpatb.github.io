# Design

Visual system for cpatb.github.io (Jekyll / academic-pages fork). The custom design
layer lives in `_sass/_custom.scss` (imported last in `assets/css/main.scss`), with
canonical color tokens in `_sass/_variables.scss` (`$site-*`). Font is loaded in
`_includes/head/custom.html`. The home-hero canvas is drawn by `assets/js/suspension.js`.

## Concept

**Evening lab.** Dark, atmospheric, warm — a near-black warm ground with bone-white
typography and a single copper accent, like instrument light in a dark room. Structure
comes from a left-rail grammar (quiet label left, content right) rather than a plain
stacked column. One signature detail: a slow 2-D suspension of polydisperse particles
drifting behind the home hero — the physics the site is about.

## Color

| Token | Value | Use | Contrast on bg |
|-------|-------|-----|----------------|
| `$site-bg` | `#131110` | Page ground | — |
| `$site-surface` | `#1c1917` | Inputs, code blocks, nav dropdown | — |
| `$site-ink` | `#ece7df` | Headings, names, primary text | 15.3:1 |
| `$site-body` | `#b8b1a6` | Body prose | 8.9:1 |
| `$site-muted` | `#8f887c` | Rail labels, metadata, excerpts (floor — never lighter) | 5.4:1 |
| `$site-rule` | `#2a2620` | Hairline separators, pill borders | — |
| `$site-accent` | `#d99a5b` | Copper: links, arrow actions, active dots, button | 7.8:1 |
| `$site-accent-bright` | `#e8b478` | Link/button hover | 9.0:1 |

Strategy: **dark-committed, one warm accent.** Copper appears only where it means
something (links, actions, active-status dots, the Enter button). Atmosphere comes from
a single fixed radial glow (`body::before`, copper at 5.5%) and the hero canvas — never
from tinted panels, gradient text, or glassmorphism. The masthead is the one translucent
blur (functional, fixed nav). No purple anywhere.

## Typography

- **Family:** Schibsted Grotesk (Google Fonts, variable 400–900 + italics), system sans fallback. One family, committed weight contrast.
- **Home hero name:** `clamp(2.3rem, 6vw, 3.3rem)`, weight 800, tracking −0.03em.
- **Page titles:** `clamp(1.9rem, 4vw, 2.5rem)`, weight 800, tracking −0.025em.
- **Rail labels (home h2):** 1rem, weight 600, `$site-muted`, sentence case — never uppercase/tracked.
- **Body:** ~1rem / 1.75–1.8 (dark bg gets the taller line-height), `$site-body`.
- `text-wrap: balance` on h1–h3, `pretty` on content paragraphs.

## Layout

- Frame: masthead inner and footer cap at **58rem**. `#main` defaults to **44rem**
  (posts, CV, 404) and widens to 58rem via `#main:has(...)` on rail pages (home,
  research, publications, blog). No-`:has` browsers degrade to the narrow column.
- **Rail grammar** (≥940px): `grid-template-columns: 10.5rem 1fr`, 3rem gap.
  - Home sections: muted h2 label left, `.home-section__body` right.
  - Research: status dot left, title + prose right.
  - Blog list: date left, title + excerpt right (calendar icon hidden — position says "date").
- Entries separated by hairline `border-top: 1px solid $site-rule`; sections by whitespace.
- **Never**: cards with borders+shadows for content lists, side-stripes, eyebrow kickers, icon-card grids.

## Components

- **Hero** (`.home-hero`): 132px circular photo (hairline ring), name, muted tagline, bio, pill contact links (hairline → copper on hover). Suspension canvas absolutely positioned behind, full-bleed (`100vw`), masked to fade out at its bottom edge.
- **Suspension canvas** (`#suspension`): ~110 polydisperse particles (55 under 700px), dim bone + ~7% copper tracers, Brownian drift in a weak flow. Slow cursor → particles yield; fast cursor → local jam (a shear-thickening nod). JS ramps its own draw alpha (no CSS entrance — CSS-gated visibility breaks in headless/paused tabs). Static single frame under reduced motion; paused on hidden tabs; deterministic seeded LCG.
- **Arrow links** (`.more-link`): weight-600 copper text + `→` nudging 3px on hover.
- **Project status** (`.project__status`): dot + text; `.active` copper with a faint glow, `.completed` muted.
- **Password gate**: `$site-surface` input, copper button with `$site-bg` text (7.8:1).
- **Content images**: `img:not([class])` gets white ground + hairline + 8px radius (white-background plots on a dark page). Classed images (hero photo) exempt.

## Motion

One staggered hero entrance (photo → name → tagline → bio → links, 0.7s
ease-out-quint, 60ms steps); the canvas fades via its own draw loop. Hovers ≤0.18s.
Everything off under `prefers-reduced-motion: reduce`. No scroll-triggered reveals.

## Accessibility

WCAG AA on dark: all text tokens ≥4.5:1 on `$site-bg` (table above); `:focus-visible`
gets a 2px copper outline; muted text never lighter than `$site-muted`;
`<meta name="color-scheme" content="dark">` for native form controls.

## Build & verify

GitHub Pages builds via the `github-pages` gem (no local Ruby). Verify by:
1. `npx sass --load-path=_sass` on a front-matter-stripped copy of `assets/css/main.scss`.
2. Splice compiled CSS + changed markup into fetched live HTML (see scratchpad
   `build_preview.mjs` pattern) and screenshot with headless Chrome.
3. **Headless gotcha:** `--virtual-time-budget` + the rAF canvas stalls painting —
   pages screenshot blank. Use real-time mode with
   `*{animation-duration:0.02s!important}` injected instead. This is a headless
   artifact only; real browsers are unaffected.
