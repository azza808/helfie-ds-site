---
name: helfie-ds-site
description: >-
  Updates the Helfie Design System docs site when a designer adds or edits a
  token, component, or deprecation. Use when they mention the design system
  site, helfie-ds, a token or colour change, a new component page, a component
  update, or deprecate; or when editing helfie-ds-site css/, js/, or docs/.
---

# Helfie Design System site

This repo is the docs site for the published Helfie library. The designer describes the change in chat. You measure Figma and update the site.

**Figma is the source of truth** — Component Library 2026 (`f7lZix9shDCvJqpRXVWCcb`). If Figma and the site disagree, Figma wins unless the page is marked `site only; library unchanged`.

**Designers never edit files or run commands.** Do not mention `js/pages.js` or `css/tokens.css` unless they ask how it works. Ask them only when a value or node is genuinely missing.

Designer-facing steps: `docs/UPDATING_THE_SYSTEM.md`.

## When this runs

Read this skill as soon as someone asks to add, edit, update, or deprecate something on the design system site. Then open only the reference that matches the change type.

## Do this

1. Classify the change: **token**, **new component**, **component update**, or **deprecate**. If unclear, ask once.
2. Confirm the Figma URL / node (and token name for colour). Do not invent a hex or size.
3. Measure from Figma. Follow the matching file in [references](references.md).
4. Update the site. Use token names in CSS, never a one-off paint value.
5. Compare the changed page (and one consumer, for tokens) to Figma before saying it is done.
6. When they ask to share, open a pull request to `azza808/helfie-ds-site`. Do not ask them to push.

Do not put this site inside Helfie Labs. Do not fork. Do not create a second docs site.

## Change types

| Type | Touch |
|---|---|
| Token | `css/tokens.css` first; foundation page in `js/pages.js` if the token is new |
| New component | `js/nav.js`, `js/pages.js`, `css/components.css`; `js/live.js` and `assets/` only if needed |
| Component update | Existing page + CSS; keep the root `ds-*` class |
| Deprecate | `deprecated: true` in `js/nav.js`; rewrite the page to name the replacement (Bottom bar is the template) |

Page shape for a new or updated component: masthead, lead, anatomy, variants, live playground, do / do not, footer. Match Button, Fields, or Chips.

## Do not

- Ask the designer to edit files, run git, or turn on GitHub Pages
- Invent tokens, variants, or icons
- Rename a root class that product may already use
- Delete a deprecated route — keep the hash URL
