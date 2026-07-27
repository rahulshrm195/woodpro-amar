# Versioning — WoodPro

One version number, three places it has to match. Get these three in step and
the What's New modal, the cache bust and the Settings screen all take care of
themselves.

| Where | What to change |
|---|---|
| `index.html` | `const APP_VERSION = 'x.y.z'` |
| `index.html` | new `CHANGELOG` entry at the **top** of the array |
| `sw.js` | `const CACHE_NAME = 'woodpro-vx.y.z'` |

The app logs a console warning on load if `APP_VERSION` and `CHANGELOG[0].v`
disagree, so a half-done release is visible immediately.

## Numbering

`MAJOR.MINOR.PATCH`

- **PATCH** (1.0.0 → 1.0.1) — a bug fix, a wording change, a styling tweak. Nothing new to learn.
- **MINOR** (1.0.1 → 1.1.0) — a new feature or a visible change to how something works.
- **MAJOR** (1.x.x → 2.0.0) — a rebuild, or a change to the data shape that old sheets need migrating for.

## Release checklist

1. Make the change.
2. Bump `APP_VERSION`.
3. Add the `CHANGELOG` entry — newest first, with today's date.
4. Bump `CACHE_NAME` in `sw.js` to the same number.
5. Syntax check before pushing.
6. Commit with the version in the subject line: `v1.1.0 — sofa rate presets`.
7. Push. Open the live app, confirm the update toast appears and the modal shows the new entry.

## Writing changelog items

The modal is read by one person who was not looking at the code, six weeks later.
So: plain sentences about what changed *for the user*, not what changed in the file.

```js
// Good
'Costing sheets can now be duplicated from the list without opening them.'
'The timber head accepts inches for length as well as feet.'

// Not this
'Refactored renderSheet() and fixed the state bug.'
'Added dup handler + list item click target.'
```

Keep it to five or six items. If a release has more than that, it is really two
releases and they should have gone out separately.

## Skipping the modal

The modal fires once per version, tracked in `localStorage` under `wp_version_seen`.
On a genuinely first run it says "Welcome to WoodPro" instead of "What's new".
It can always be reopened from **Settings → What's new**, which shows the full
history with older versions collapsed.

## History

| Version | Date | Summary |
|---|---|---|
| 1.0.0 | 26 Jul 2026 | First release — costing tool and quotation tool, offline PWA. |
| 1.1.0 | 27 Jul 2026 | Dark mode, desktop-first layout, quotations moved to the home screen. |
| 1.2.0 | 27 Jul 2026 | Compact item cards, L×B×H dimension inputs with unit selectors, polish/cushion checkboxes, compact totals. |
