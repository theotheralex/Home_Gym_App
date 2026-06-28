# Decisions

Append-only record of choices and their rationale. Read before reversing anything deliberate.

---

## 2026-06-17 — Single-file PWA with strict version-stamp discipline
**Decision:** Whole app is one `index.html` + `sw.js`; every release bumps six version stamps together, and `sw.js` must stay byte-identical to the SW blob inside index.html.
**Rationale:** Captured from CLAUDE.md. Out-of-sync stamps break the service-worker cache — this ritual is non-negotiable on each change.

## 2026-06-17 — Notes bootstrapped under vault continuity system
**Decision:** Adopt the `notes/` structure.
**Rationale:** Cross-session continuity via the vault-wide SessionStart hook.

## 2026-06-28 — UI/UX redesign: "Hybrid" direction (cinema glass + brutal numerals)
**Decision:** Redesign to the hybrid look — glass surfaces + deep black, condensed Bebas Neue numerals on signature numbers, Space Grotesk headings, DM Sans body, red accent + all semantic colors kept. Chosen from 5 mockups in `mockups/` (01). Aesthetic sourced from the `ui-ux-pro-max` skill catalog as reference only; its Python engine was NOT run.
**Rationale:** Only direction that gives the app an identity matching the name; 05 "natural progression" was the safe runner-up. Alex picked hybrid.

## 2026-06-28 — Implement as token + layered-override CSS, not a rewrite
**Decision:** Keep existing component classes (JS keeps emitting them); reskin via extended `:root` tokens + two appended override blocks + embedded base64 fonts. Built on branch `redesign-hybrid`.
**Rationale:** 491KB single file with semantically-loaded CSS (RPE feedback colors etc.) — surgical rewrite too risky. Override layer is reversible, diff stays readable. Embedded subset woff2 (~122KB) preserves offline-first.

## 2026-06-28 — Version-bump command is now unsafe (base64 collision)
**Decision:** Bump version stamps via context patterns (`· vN`, `toji-vN`, `APP_VERSION='vN'`, `set-row-value">vN<`), NOT the CLAUDE.md global `sed s/vOLD/vNEW/g`.
**Rationale:** Embedded base64 fonts contain coincidental `vNN` substrings, so a global sed corrupts font data and "exactly 6 hits" now reports 8. CLAUDE.md's bump section is stale — flagged to Alex; not yet edited (checked-in project doc).
