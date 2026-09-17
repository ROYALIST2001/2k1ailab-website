# Design source

`XXXXX Website.dc.html` is the original Claude Design export this site was
ported from, kept here so the implementation can be checked against its source.
`preview.webp` is the design tool's own thumbnail of it.

**It is reference material, not build input.** Nothing in `src/` imports it.

## Reading the source

The `.dc.html` format is a design-tool preview file, not a web page. It needs
two runtime scripts that were **deliberately not** carried into this project:

| File            | What it did                                                            |
| --------------- | ---------------------------------------------------------------------- |
| `support.js`    | Parsed `<x-dc>`, `{{ }}` bindings, `style-hover`, `<sc-if>`             |
| `image-slot.js` | Defined `<image-slot>`, a drag-and-drop image placeholder for designers |

Both are editor tooling. Shipping them would have meant ~135 KB of design-tool
runtime on every page load to reproduce behaviour the framework already gives
us. The *semantics* were ported instead:

| Design construct                | Ported to                                                    |
| ------------------------------- | ------------------------------------------------------------ |
| `style-hover="…"`               | Tailwind `hover:` variants                                    |
| `<sc-if value="…">`             | Normal JSX conditional (`siteConfig.showAvailability`)        |
| `{{ contactEmail }}` props      | `apps/web/src/config/site.ts`                                 |
| `handleTilt` / `resetTilt`      | `apps/web/src/hooks/use-tilt.ts`                              |
| `componentDidMount` observer    | `apps/web/src/hooks/use-scroll-reveal.ts`                     |
| `reduceMotion` prop             | `prefers-reduced-motion` + `hooks/use-reduced-motion.ts`      |
| `<image-slot>`                  | `packages/ui/src/components/image-slot.tsx`                   |
| Inline `style="…"` (every node) | Tailwind utilities + `packages/ui/src/styles/tokens.css`      |

## Intentional deviations

These differ from the design on purpose:

- **Responsive layout.** The design was fixed-width desktop; its header nav
  overflowed below ~900px. Breakpoints and a mobile menu were added.
- **Focus states.** The design had none, making the site unusable by keyboard.
  A visible `:focus-visible` ring and a skip link were added.
- **Contact and careers pages.** The design offered only a `mailto:` link. Real
  pages with validated forms were added; the `mailto:` is kept alongside them.
- **Fonts.** Loaded from the Google Fonts CDN in the design; self-hosted via
  `next/font` here, which removes a third-party connection and visitor IP leak.
- **Company name.** The design is redacted — `XXXXX`, `hello@xxxxx.com`. Both
  live in `apps/web/src/config/site.ts` and must be replaced.
