# File map and done checks

Open this only after the change type is known.

## Files

| File | When it changes |
|---|---|
| `css/tokens.css` | Colour, type, space, radius, elevation, or a new semantic token. Refresh the audit date in the file comment. |
| `js/nav.js` | New page, Next link, Figma node ID in `HDS_FIGMA_NODES`, `deprecated: true` |
| `js/pages.js` | Copy, specimens, anatomy, do / do not |
| `css/components.css` | New or changed component chrome. Use `--ds-*` tokens. |
| `js/live.js` | Tappable specimens only |
| `assets/` | Library icons and lockups — never redrawn |

Search the site for an old hex after a token change and replace leftovers with the token.

## Token — done when

- Token name used everywhere; no new raw hex in `css/components.css`
- Foundation page shows the new value
- Audit date in `css/tokens.css` updated
- One consuming component still matches Figma

## New component — done when

- Figma node ID in `js/nav.js`
- Page has anatomy, variants, do / do not
- CSS uses tokens
- Every published axis has a specimen
- Next link from the previous page works

## Component update — done when

- Page matches current library axes
- Retired variants removed
- Root class name unchanged
- One unrelated specimen still matches

## Deprecate — done when

- Nav shows deprecated
- Page names the replacement
- Hash URL still works
- No new specimens that encourage use
