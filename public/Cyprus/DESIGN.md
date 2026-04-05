# Design System Specification: The Academic Curator

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Academic Curator."** 

In the high-stakes world of global education, users are not looking for a "tech platform"; they are seeking an elite, institutional partner. This system rejects the cluttered, "noisy" interface of traditional education portals in favor of a high-end editorial experience. We achieve this through **Soft Minimalism**: a design language characterized by generous whitespace, intentional asymmetry, and the complete removal of structural lines. 

By treating the UI as a series of layered, premium surfaces rather than a flat grid, we create an environment that feels authoritative, polished, and profoundly credible.

---

## 2. Colors: Tonal Depth & Soul
We use a sophisticated palette to move beyond "standard blue." This system relies on background shifts rather than lines to define the user journey.

### The Palette
- **Primary (`#001E39` to `#173351`):** Represents the "Deep Blue" of heritage institutions. Use for core branding and high-importance headers.
- **Secondary (`#1960A2`):** Our functional blue. Used for primary navigation and interactive elements.
- **Tertiary (`#F38118`):** The "Urgency Orange." This is reserved *strictly* for the final Call to Action (CTA). It should never be used for decoration.
- **Surface Tiers:** 
    - `surface_container_lowest`: Pure `#FFFFFF` for primary content cards.
    - `surface_container_low`: `#F2F4F7` for section backgrounds.
    - `surface`: `#F7F9FC` for the global canvas.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders (`#E5E7EB`) for sectioning or card containment. Boundaries must be defined solely through background color shifts. For example, a `surface_container_lowest` card sits on a `surface_container_low` section background. This creates a "soft edge" that feels more premium and less like a template.

### The "Glass & Gradient" Rule
To add visual "soul," use a subtle linear gradient on primary CTAs and Hero sections transitioning from `primary` (`#173351`) to `secondary` (`#2F6FB2`). For floating navigation bars or modal overlays, use **Glassmorphism**: apply `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur.

---

## 3. Typography: Editorial Authority
We utilize **Inter** across the board to ensure a cohesive, modern-institutional feel. The key is in the scale and weight contrast.

- **Display Scales (`display-lg` to `display-sm`):** Bold (700 weight) with tight letter-spacing (`-0.02em`). These are our "Editorial Statements." Use them sparingly to lead major sections.
- **Headline & Title:** Used for content grouping. These should feel grounded and stable.
- **Body (`body-lg`):** Our workhorse. 1rem (16px) is the minimum for readability. 
- **The Contrast Principle:** Pair a `display-md` headline with a `body-md` text block. The large gap in size conveys an authoritative, curated hierarchy that mimics high-end print magazines.

---

## 4. Elevation & Depth: Tonal Layering
We do not use structural lines. We use **Physicality.**

- **The Layering Principle:** Depth is achieved by "stacking" surface tiers. Place `surface_container_highest` elements (like search bars) inside `surface_container_lowest` cards to create a natural, recessed look.
- **Ambient Shadows:** Standard drop shadows are forbidden. Use "Ambient Glows": 
    - *Values:* `X: 0, Y: 12px, Blur: 40px, Spread: -5px`.
    - *Color:* Use `on_surface` (`#191C1E`) at **4% to 6% opacity**. The shadow should be felt, not seen.
- **The "Ghost Border" Fallback:** If a layout absolutely requires a border for accessibility (e.g., input fields), use `outline_variant` at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `secondary`), `8px` rounded corners. No border. White text.
- **Secondary:** `surface_container_high` background with `secondary` text. 
- **Tertiary (CTA):** `tertiary_container` (`#F38118`) only for the final conversion point.

### Cards & Lists
- **The Divider Rule:** Forbid the use of horizontal divider lines. Separate list items using the spacing scale (e.g., `spacing.4` or `1.4rem`). If separation is visually required, use a 1-pixel height `surface_container_high` strip that doesn't touch the edges of the container.
- **Card Styling:** `16px` (xl) corner radius. No border. Use the Ambient Shadow for "hover" states only; static cards should rely on tonal shifts.

### Input Fields
- Avoid the "box" look. Use `surface_container_highest` as a subtle background fill with a `Ghost Border` that turns `secondary` blue only on focus. Label text should be `label-md` and placed above the field, never inside.

### Signature Component: The "Institutional Badge"
For accreditation and global partner logos, use a `surface_container_low` pill-shaped chip with a `sm` (4px) roundedness and `body-sm` typography. This anchors the brand's credibility without cluttering the UI.

---

## 6. Do's and Don'ts

### Do:
- **Do use "The 80/20 Rule" for Whitespace:** 80% of the page should feel "breathable." Content should be condensed into the remaining 20% in high-impact clusters.
- **Do use Asymmetric Layouts:** Shift a text block slightly to the left and an image slightly to the right of the center-line to create a bespoke, non-templated feel.
- **Do use High-Quality Photography:** Only use editorial-style imagery with natural lighting. Avoid "stock-photo" smiles.

### Don't:
- **Don't use 1px Borders:** This is the quickest way to make the design look "cheap" or "bootstrap."
- **Don't use Pure Black:** Always use `on_surface` (`#191C1E`) for text to maintain the soft-minimalist aesthetic.
- **Don't Overuse the Accent Orange:** If the orange is everywhere, it loses its power as a signal for conversion. Use it once per scroll-depth maximum.