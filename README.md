# Helfie Design System

**Team repo:** [github.com/azza808/helfie-ds-site](https://github.com/azza808/helfie-ds-site). Invite designers here.

Live site: [azza808.github.io/helfie-ds-site](https://azza808.github.io/helfie-ds-site/)

The shared language behind every Helfie surface — so the consumer app and Helfie One feel like one product. This site documents the published library. **Figma remains the source of truth.**

## How the team works

| Who | Does | Does not |
|---|---|---|
| Each designer | Asks Cursor to update a token or component, then reviews the live page | File edits, Git, GitHub Pages settings |
| Cursor | Measures Figma, updates the site, opens a share request | Ask the designer to edit files or run commands |
| Design lead | Invites collaborators and reviews the live page | A second copy of the site |

Day to day:

1. Open this project in Cursor.
2. Paste the change (token, new component, component update, or deprecate) plus the Figma URL.
3. Review the live page. Ask Cursor to share it with the team.

Designer steps, including copy-paste prompts: [docs/UPDATING_THE_SYSTEM.md](docs/UPDATING_THE_SYSTEM.md).

### A useful prompt

> Update the design system. Change type: token. Name: colour-fill-accent. Old → new: #0537FF → (published value). Figma: [library URL]. Published: yes. Do not ask me to edit files or run commands.

## Invite designers

Repo **Settings → Collaborators** → add their GitHub username → **Write**.

They clone this repository, not a fork and not the old preview.

## What’s in this folder

A new designer does not need to open these. Read this README and [docs/UPDATING_THE_SYSTEM.md](docs/UPDATING_THE_SYSTEM.md). Cursor uses the rest.

| Name | What it is | Who it’s for |
|---|---|---|
| **README.md** | This page — how the team works | Designers |
| **docs/** | How to add or edit the system, with prompts | Designers |
| **AGENTS.md** | Short instruction so Cursor follows the same workflow | Cursor, not people |
| **.cursor/** | The detailed playbook Cursor reads when you ask for a change | Cursor, not people |
| **assets/** | Pictures the site shows: logo and icons exported from Figma | The live site |
| **css/** | How the site looks. `tokens.css` is colour, type, space | The live site |
| **js/** | The actual pages (Start, Button, Colour…) and the menu | The live site |
| **index.html** | The empty shell that loads the site | The live site |
| **scripts/** | Helper jobs used when building the site | Cursor |

Hashed names inside `assets/` (for example `9c7986a0….svg`) are the Helfie logo files. `assets/icons/` is the icon set from the library.

## Design source

- [Helfie Component Library 2026](https://www.figma.com/design/f7lZix9shDCvJqpRXVWCcb)
