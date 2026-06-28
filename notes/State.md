# State

> Living snapshot. Overwrite as reality changes — NOT a log.
> A fresh session should read only this note and know where to pick up.

**Last updated:** 2026-06-28

## Current status
**v100 hybrid UI/UX redesign built on branch `redesign-hybrid`** (not yet merged to `main` or shipped). App boots clean, validation ritual passes, verified across screens in-browser. Awaiting final review + ship decision from Alex.

## What the redesign is
"Hybrid — Cinema base + brutal numerals": cinematic glass surfaces + deep black for everyday calm; oversized condensed **Bebas Neue** numerals on the signature numbers (Strength Score, e1RM, working set, the landscape lift name). **Space Grotesk** headings, **DM Sans** body. Blood-red accent and ALL semantic RPE/state colors (green/blue/yellow/red) preserved. Five direction mockups live in `mockups/` (01 hybrid was chosen).

## How it was implemented (architecture)
- **Token-driven layered override**, not a rewrite. Existing component classes kept emitting from JS; the look changed via CSS.
- `:root` extended with `--glass*`, `--accent-hot/-dim`, `--font-body/-head/-display` vars (existing tokens untouched).
- **3 fonts embedded** as base64 woff2 (latin subset, ~122KB) in `@font-face` right after `<style>` — preserves offline-first.
- Two "HYBRID REDESIGN" override blocks appended before `</style>` (shared components + screen-specific surfaces/inputs/hero-glow) + an `@supports` solid-surface fallback for no-backdrop-filter devices.
- Glass intensity locked at midpoint (blur 21px, fill ~0.06–0.095) after Alex tuned it down from frosted.

## ⚠️ Version-bump gotcha (IMPORTANT — CLAUDE.md is now stale on this)
Embedded base64 fonts contain coincidental `v99`/`v100` substrings. The CLAUDE.md bump command `sed -i 's/vOLD/vNEW/g'` + "verify exactly 6 hits" is **no longer safe** — a global sed corrupts the font data. Bump via **context patterns** instead: `· vN`, `toji-vN`, `APP_VERSION='vN'`, `set-row-value">vN<`. See [[Decisions]].

## Next steps
- [ ] Alex final review of v100 on branch (local server: `python3 -m http.server 8731` then localhost:8731 — or merge & open).
- [ ] Decide ship: merge `redesign-hybrid` → `main`.
- [ ] Optional: update CLAUDE.md version-bump section to the context-pattern method (flagged to Alex, not yet done).

## How to run / test
- Local: `cd` project, `python3 -m http.server 8731`, open `http://localhost:8731/index.html`. Onboarding gates the app; seed `localStorage['toji-method-state-v2']` with a profile to skip it (see session log).
- Validation ritual (all passing on branch): inline-script eval, SW-blob eval, `node -c sw.js`, CSS brace balance (864/864), sw.js byte-identical to blob.

## Open questions / blockers
- None blocking. Ship is Alex's call.
