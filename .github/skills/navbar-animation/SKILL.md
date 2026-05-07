---
name: navbar-animation
description: 'Create a navbar animation .jsx for this portfolio project. Use when asked to add, create, or build a navbar animation for a project card. Accepts a project name and a prompt describing the desired animation concept. Outputs a new file in src/components/animations/ following the project style.'
argument-hint: '<ProjectName> — <animation concept prompt>'
---

# Navbar Animation

## When to Use
- User asks to create a navbar animation for a project
- User provides a project name and an animation concept/prompt
- Adding an animation to a new entry in `repos.js`

## Style Rules (non-negotiable)

1. **Container**: Always use `<span className="nav-anim ...">` or `<svg className="nav-anim ...">` as the root. Width and height must be `26px`.
2. **Colors**:
   - Use `currentColor` for neutral/muted strokes (axis lines, grid lines, borders).
   - Use `var(--accent)` for a single highlight element — sparingly.
   - For computed/dynamic colors, use muted HSL: `hsl(214 42% 28%)` to `hsl(214 42% 52%)` range. Do **not** use saturated or bright colors.
   - Opacity overlays (`opacity: 0.25–0.35`) are preferred over color changes for dimming.
3. **Speed**: Slow and calm. CSS-only cycles: **12–16s total duration**. State-based ticks: **250–350ms intervals**.
4. **Simplicity**: Max ~80 lines. No external libraries. No props. Self-contained styles via `<style>` tag or inline.
5. **Export**: Default export, no props: `export default function MyAnim() { ... }`

## Procedure

### 1. Read existing animations for reference
Read at least one of the following before writing any code:
- [GraphAnim.jsx](../../react-app/src/components/animations/GraphAnim.jsx) — pure CSS, SVG paths, stroke-dashoffset reveal
- [SortingAnim.jsx](../../react-app/src/components/animations/SortingAnim.jsx) — stateful tick loop, DOM bars, dynamic color
- [PathfindingAnim.jsx](../../react-app/src/components/animations/PathfindingAnim.jsx) — stateful tick loop, SVG grid cells

### 2. Understand the project
Check [repos.js](../../react-app/src/repos.js) for the project entry to understand its tags and existing metadata. Use that to inform what the animation should visually represent.

### 3. Choose an approach
| Project type | Recommended approach |
|---|---|
| Visual/graph/equation | Pure CSS SVG (like GraphAnim) |
| Algorithm step-by-step | Stateful tick loop (like SortingAnim/PathfindingAnim) |
| Network/connectivity | Pure CSS SVG with opacity/dash animations |
| Other | Simplest approach that conveys the concept |

### 4. Write the animation
- Filename: `<DescriptiveName>Anim.jsx` in `src/components/animations/`
- CSS class on root: `nav-anim nav-anim-<kebab-name>`
- SVG viewBox: `"0 0 26 26"` (for SVG-based)
- Keyframe names must be unique — prefix with the animation name to avoid collisions
- Keep `aria-hidden="true"` on the root element

### 5. Register in repos.js
Add the import and set `animation:` on the matching project entry in [repos.js](../../react-app/src/repos.js).

## Quality Checklist
- [ ] Root element has `nav-anim` class and is 26×26
- [ ] No bright or saturated colors — muted only
- [ ] Animation is slow (≥12s CSS cycle or ≥250ms tick)
- [ ] File is ≤80 lines
- [ ] Default export, no props
- [ ] Registered in `repos.js`
- [ ] Keyframe/class names are unique (prefixed)
