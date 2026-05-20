# Thomson Reserve - Website Design Specifications
**Theme:** The Sanctuary (Nature-Adjacent Resort Living)
**Aesthetic Focus:** Quiet Luxury, Warmth, Sophistication, Editorial Layout

## 1. Color Palette

* **Background (Primary Canvas):** `#FFFFFF` (Pure White)
    * *Usage:* The dominant background color for all main sections to create a clean, high-contrast, gallery-like feel that makes photography pop.
* **Primary Brand & Headings:** `#2A5D67` (MacRitchie Teal)
    * *Usage:* Primary headers (H1, H2), dominant UI elements, footer background. Conveys natural authority, stability, and calm.
* **Accent Color:** `#D4AF37` (Burnished Brass)
    * *Usage:* Subtle luxury highlights, hover states, thin divider lines, and secondary call-to-action buttons.
* **Body Text:** `#333333` (Slate Charcoal)
    * *Usage:* Standard paragraph text, ensuring clear and professional readability without the harshness of pure black.

## 2. Typography

* **Primary / Headline Font:** `Cormorant Garamond` (Serif)
    * *Role:* Evokes resort tranquility and classic elegance.
    * *Application:* `h1`, `h2`, `h3`, blockquotes.
    * *Styling:* Keep font weights moderate (400-600) to maintain its calligraphic flair.
* **Secondary / Body Font:** `Montserrat` (Sans-Serif)
    * *Role:* Provides clean, geometric, modern readability to balance the serif.
    * *Application:* `p`, `a`, `li`, button text, navigation, small caps subtitles.
    * *Styling:* Use standard weights for body copy. For subheadings or meta-labels, use uppercase with increased letter-spacing (tracking).

## 3. UI Styling & Component Guidelines

* **Layout & Spacing (Whitespace):** Emphasize generous macro-whitespace. Sections should feel airy and uncrowded, mimicking the expansive feeling of a nature reserve. Do not cramp text blocks.
* **Imagery:** Full-bleed, cinematic photography. Visuals should highlight high-saturation lush greens (forests) and natural lighting.
* **Buttons (Calls to Action):**
    * *Primary Button:* Solid background `#2A5D67` with `#FFFFFF` text. Font: Montserrat, medium weight, uppercase.
    * *Secondary/Outline Button:* Transparent background with a 1px solid `#D4AF37` border and `#2A5D67` text.
* **Borders & Shadows:** Keep the UI extremely flat. Avoid heavy box shadows. Rely on typography scale and whitespace for visual hierarchy. If dividers are needed, use a delicate 1px `#EAEAEA` line or a thin `#D4AF37` accent line.
* **Navigation:** Minimalist, transparent header that transitions to solid `#FFFFFF` on scroll. Navigation links in Montserrat, `#333333`, turning `#D4AF37` on hover.

## 4. Prompting Note for AI (Claude)
When generating HTML/CSS or React components from this brief, prioritize semantic HTML and an "editorial" CSS layout. Ensure that typography scales elegantly on mobile devices (e.g., Cormorant Garamond should remain legible and not too small on narrow viewports).
