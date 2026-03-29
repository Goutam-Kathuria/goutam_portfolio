# Goutam Kathuria Portfolio — Premium Upgrade

## Current State
A single-file React portfolio (App.tsx) with dark-only theme using cyan/teal accent colors (oklch 0.78 0.12 195). Framer Motion animations, scroll-spy navbar, all 10 sections built. No light mode, no custom cursor, accent color doesn't match the spec (green #22C55E + blue #38BDF8).

## Requested Changes (Diff)

### Add
- **Dark/Light mode toggle** — button in navbar to switch themes. Default: dark. Persist to localStorage.
- **Custom cursor** — small dot (8px) as main pointer + larger trailing circle (32px) with smooth lag animation. On hover over buttons/links: scale up + color shifts to green accent. Hide on touch devices. Must use `useEffect` + `mousemove` listener + `motion.div`. No default cursor visible.
- **New accent color system** — Primary: #22C55E (green). Secondary: #38BDF8 (blue). Replace all cyan/teal references with the new green primary + blue secondary.
- **Light mode styles** — Background: #FFFFFF, Surface: #F9FAFB, Text Primary: #111827, Text Secondary: #6B7280, Border: #E5E7EB, Primary: #16A34A, Secondary: #0284C7.
- **Glassmorphism navbar** — `backdrop-blur-md`, semi-transparent background in both modes.
- **Loading animation** — minimal full-screen loader (spinner or progress bar) that fades out after 1s on mount.
- **Subtle gradient overlays** on hero and CTA sections.
- **Section separators** — thin `<hr>` or `border-b` dividers between major sections.

### Modify
- **All accent references** updated from oklch cyan to the new green (#22C55E dark / #16A34A light) + blue secondary (#38BDF8 dark / #0284C7 light).
- **index.css** — add CSS variables for both dark and light themes using the exact hex values mapped to OKLCH. Add `.dark` class toggle pattern (class-based theming on `<html>`).
- **App.tsx** — add theme state, toggle button in navbar, custom cursor component, loading screen component. Wrap in theme context or pass theme as prop.
- **Navbar** — add glassmorphism `bg-white/80 dark:bg-[#0B0F14]/90 backdrop-blur-md`, active indicator updates to green accent.
- **Hero** — glow ring around image uses green accent. Layout: text LEFT, image RIGHT on desktop (currently reversed). Mobile: image top.
- **Skill badges, project cards, contact cards** — hover effects use green accent instead of cyan.
- **Button hover** — `hover:scale-[1.03]` + subtle green glow. Secondary button border/text green.

### Remove
- Default browser cursor (via `cursor: none` on `*` — only on non-touch).
- All oklch cyan-specific hardcoded values; replace with CSS variable-driven theming.

## Implementation Plan
1. Refactor `index.css`: Define `:root` (light mode) and `.dark` (dark mode) CSS variable blocks using exact hex values converted to OKLCH for green + blue accents. Add `cursor: none` for non-touch.
2. In `App.tsx`: Add `useTheme` hook that reads/writes `localStorage` and toggles `.dark` class on `<html>`. Add sun/moon icon toggle button to Navbar.
3. Build `CustomCursor` component: two `motion.div`s — small dot follows mouse directly, larger circle follows with spring lag. On `[data-cursor-hover]` elements, scale up. Mount only on non-touch.
4. Build `LoadingScreen` component: centered spinner with green accent, `AnimatePresence` fade-out after 800ms.
5. Update all hardcoded oklch cyan strings to use Tailwind classes tied to CSS variables (e.g. `text-primary`, `border-primary`, `bg-primary`).
6. Fix hero layout: `flex-row` text-left image-right on desktop.
7. Add section `<hr>` separators and gradient overlays on hero/CTA.
8. Add `data-cursor-hover` attribute to all buttons and links for cursor effect.
