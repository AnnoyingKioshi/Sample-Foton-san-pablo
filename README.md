# Foton Philippines San Pablo — dealership site

A portfolio demo for a Foton commercial-vehicle dealership in San Pablo City,
Laguna. Single-page, hash-routed, no build step and no dependencies: the whole
site is one `index.html` plus a folder of images.

## Running it

Open `index.html` directly in a browser, or serve the folder:

```bash
node server.mjs      # http://localhost:4173
```

A static server is only needed so the images resolve over `http://` rather than
`file://`; there is nothing to compile.

## Structure

| Path | What it is |
|---|---|
| `index.html` | The entire site — markup, styles and behaviour |
| `images/*.webp` | Vehicle cut-outs and the dealership logo |
| `server.mjs` | Minimal static file server for local preview |

Routes (`#/`, `#/models`, `#/financing`, `#/service`, `#/about`, `#/contact`)
are sections toggled in one document, so the site works on any static host with
no rewrite rules.

## Notes

- **This is a demo.** The address, phone numbers, prices and financing figures
  are placeholders, and the inquiry form does not submit anywhere. It is not an
  official Foton Motor Philippines property.
- **Vehicle photography** is Foton Philippines' own product imagery. Standard
  practice for a dealer site, but confirm asset use with the distributor before
  running this as a live business site.
- Images are WebP with alpha. Every current browser supports this; there is no
  PNG fallback.

## Accessibility

The build targets WCAG AA: colour tokens are contrast-checked against every
surface they land on, the vehicle cards and filter rail are keyboard-operable,
route changes move focus and update the title, and all motion is gated behind
`prefers-reduced-motion`.
