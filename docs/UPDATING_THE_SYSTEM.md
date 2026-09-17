# Add or edit the design system

You are updating the Helfie Design System site, not creating a second copy.

**Figma is the source of truth.** Publish the change in [Component Library 2026](https://www.figma.com/design/f7lZix9shDCvJqpRXVWCcb) first. Then describe it here. Cursor updates the site to match.

You do not edit files or run commands.

**Team repo:** [github.com/azza808/helfie-ds-site](https://github.com/azza808/helfie-ds-site)  
**Live site:** [azza808.github.io/helfie-ds-site](https://azza808.github.io/helfie-ds-site/)

## What you do

1. Publish the token or component in Figma.
2. Open your local copy of **this** project in Cursor — the folder for the design system site, not Helfie Labs.
3. Ask Cursor to make sure the project is up to date.
4. Paste one of the prompts below, with the Figma URL.
5. Review the live page against Figma. Ask Cursor for any changes.
6. When it looks right, ask Cursor to share it with the team.

After the share request is accepted, the change is on the live site.

## Useful prompts

### A colour or other token

> Update the design system. Change type: token. Name: colour-fill-accent. Old → new: #0537FF → (published value). Modes: Light (and Dark if it changed). Figma: [library URL]. Published: yes. Do not ask me to edit files or run commands.

### A new component

> Add this to the design system. Change type: new component. Name: [component]. Axes: [size × status × type]. Figma: [file URL]?node-id=[id]. Published in library: yes. What it is for: [one sentence]. What it is not: [one sentence]. Do not ask me to edit files or run commands.

### An existing component

> Update the design system. Change type: component update. Name: [component]. What changed: [added / removed / renamed variant]. Figma: [file URL]?node-id=[id]. Keep existing class names: yes. Do not ask me to edit files or run commands.

### Stop using a component

> Update the design system. Change type: deprecate. Name: [component]. Replace with: [component]. Legacy screens may keep it: yes. Do not ask me to edit files or run commands.

That is the whole designer path.

## A new designer on another Mac

They are not joining another designer’s Cursor chat. They use the **team repo**: [github.com/azza808/helfie-ds-site](https://github.com/azza808/helfie-ds-site).

They need:

1. Access to this repository (ask the design lead to invite them — **Settings → Collaborators → Write**)
2. Cursor installed
3. This project opened in Cursor — not a fork, not Helfie Labs, not the old preview

They can then ask Cursor to make the project current and paste a prompt above. Cursor reads the workflow stored in the project.

## What “good” looks like

- The site matches the published library. If they disagree, Figma wins — unless the page is marked site-only.
- Token names are used, never a one-off hex on a component.
- A new component page has anatomy, variants, and do / do not.
- A deprecated component stays on the site, names its replacement, and is not used for new work.

## Do not

- Edit the site files yourself
- Fork this repo or keep using [Imtiazbahar/helfie-ds-site](https://github.com/Imtiazbahar/helfie-ds-site)
- Invent a colour or size that is not in the library
- Detach a Figma component and ship the one-off
- Ask Cursor to put this site inside Helfie Labs

## For Cursor, not designers

Follow `.cursor/skills/helfie-ds-site/SKILL.md`. Measure Figma, update the site, compare, and open a pull request when asked to share. Never ask the designer to edit files or run git commands.
