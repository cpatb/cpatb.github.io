# Dark redesign — design spec (2026-07-06)

## Context

Charlie's verdict on the 2026-07-05 redesign: too purple; palette and structure boring.
Direction chosen by Charlie before delegating overnight: drop purple entirely, dark &
atmospheric. Remaining decisions delegated; hard requirement: nothing may read as
AI-generated (no slop tropes, no generic copy — all existing first-person content kept
verbatim).

## Decisions

- **Palette:** warm near-black `#131110`, bone ink `#ece7df`, body `#b8b1a6`, muted
  `#8f887c`, copper accent `#d99a5b`. All ≥4.5:1 on the ground (computed, not eyeballed).
  Rationale: "evening lab" — dark without the electric-blue dev-portfolio reflex.
- **Typography:** Schibsted Grotesk retained (committed identity; changing fonts was
  not the complaint).
- **Structure:** left-rail grammar (10.5rem label/meta rail + content column, 58rem
  frame) on home, research, and blog list; 44rem reading column for posts. Replaces the
  uniform stacked column that read as boring.
- **Signature:** `assets/js/suspension.js` — a quiet canvas suspension behind the home
  hero (polydisperse particles, copper tracers; slow cursor yields, fast cursor jams —
  shear thickening). Reduced-motion → static frame; hidden tab → paused.
- **Kept:** all copy, page inventory, password gate, Minimal Mistakes bones.

## Verification

SCSS compiled clean via `npx sass`; all four pages screenshot-verified at 1440px and
620px by splicing compiled CSS into live HTML shells (headless Chrome, real-time mode —
see DESIGN.md "Build & verify" for the virtual-time-budget/rAF gotcha this surfaced).
Full detail: DESIGN.md (system) and PRODUCT.md (brand) at repo root.
