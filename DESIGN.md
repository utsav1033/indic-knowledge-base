# DESIGN.md — Indic Knowledge Base AI
## Design System: *Sanskrit Scholarly Base*

> **Theme:** Dark Mode | **Device:** Desktop | **Grid:** 12-column, 4px baseline

---

## Brand & Style

The design system is engineered for an academic and spiritual knowledge base dedicated to Sanskrit studies. The brand personality is **venerable, precise, and illuminating** — bridging ancient manuscript tradition with modern digital research tools.

The visual style is a sophisticated blend of **Minimalism** and **Tactile Modernism**: a deep dark mode inspired by the shadows of a quiet library, punctuated by vibrant **saffron** light sources representing enlightenment and discovery. Subtle 1px gradient borders simulate the gilded edges of sacred texts without compromising the efficiency of a high-performance SaaS platform.

---

## 🎨 Color Palette

### Brand Colors (Override)

| Role          | Name          | Hex       |
|---------------|---------------|-----------|
| Primary       | Anzac Saffron | `#DEA450` |
| Secondary     | Prairie Sand  | `#9B411F` |
| Tertiary      | Persian Plum  | `#6A1D2F` |
| Neutral       | Blackcurrant  | `#42354C` |

### Surface Scale (Dark Mode)

| Token                      | Hex       | Usage                              |
|----------------------------|-----------|------------------------------------|
| `surface`                  | `#1A0E23` | Base background                    |
| `surface-dim`              | `#1A0E23` | Dimmed background variant          |
| `surface-bright`           | `#41344B` | Elevated surface highlight         |
| `surface-container-lowest` | `#14091E` | Deepest container layer            |
| `surface-container-low`    | `#22172C` | Low-elevation container            |
| `surface-container`        | `#261B30` | Standard card/container            |
| `surface-container-high`   | `#31253B` | Higher elevation panel             |
| `surface-container-highest`| `#3C3046` | Topmost tonal surface              |
| `surface-variant`          | `#3C3046` | Alternate surface (borders, chips) |
| `surface-tint`             | `#F8BB65` | Tint for elevated surfaces         |

### Primary — Saffron

| Token                   | Hex       |
|-------------------------|-----------|
| `primary`               | `#FDBF68` |
| `on-primary`            | `#452B00` |
| `primary-container`     | `#DEA450` |
| `on-primary-container`  | `#5D3B00` |
| `inverse-primary`       | `#825500` |
| `primary-fixed`         | `#FFDDB3` |
| `primary-fixed-dim`     | `#F8BB65` |
| `on-primary-fixed`      | `#291800` |
| `on-primary-fixed-variant` | `#633F00` |

### Secondary — Prairie Sand

| Token                    | Hex       |
|--------------------------|-----------|
| `secondary`              | `#FFB59C` |
| `on-secondary`           | `#5C1900` |
| `secondary-container`    | `#7E2C0A` |
| `on-secondary-container` | `#FF9B79` |
| `secondary-fixed`        | `#FFDBCF` |
| `secondary-fixed-dim`    | `#FFB59C` |
| `on-secondary-fixed`     | `#390C00` |
| `on-secondary-fixed-variant` | `#7E2C0A` |

### Tertiary — Persian Plum

| Token                    | Hex       |
|--------------------------|-----------|
| `tertiary`               | `#FFB7C0` |
| `on-tertiary`            | `#5E1326` |
| `tertiary-container`     | `#FA8FA0` |
| `on-tertiary-container`  | `#752637` |
| `tertiary-fixed`         | `#FFD9DD` |
| `tertiary-fixed-dim`     | `#FFB2BC` |
| `on-tertiary-fixed`      | `#400013` |
| `on-tertiary-fixed-variant` | `#7B2A3C` |

### Surface Content & Outlines

| Token                  | Hex       |
|------------------------|-----------|
| `on-surface`           | `#EFDCFA` |
| `on-surface-variant`   | `#D4C4B2` |
| `inverse-surface`      | `#EFDCFA` |
| `inverse-on-surface`   | `#382B42` |
| `background`           | `#1A0E23` |
| `on-background`        | `#EFDCFA` |
| `outline`              | `#9D8E7E` |
| `outline-variant`      | `#504537` |

### Semantic — Error

| Token                | Hex       |
|----------------------|-----------|
| `error`              | `#FFB4AB` |
| `on-error`           | `#690005` |
| `error-container`    | `#93000A` |
| `on-error-container` | `#FFDAD6` |

### Functional Color Rules

- **Glows:** Use Anzac (`#DEA450`) at **10–15% opacity** for outer glows on active/focused components.
- **Borders:** 1px borders use a `linear-gradient` from **Persian Plum → Blackcurrant**.
- **Focus Ring:** Emit a soft Saffron aura (instead of a dark shadow) on focused elements.

---

## 🔤 Typography

**Strategy:** Dual-typeface — `Geist` for UI chrome; `Merriweather` for scholarly content.

> **Devanagari note:** Increase `line-height` by **20%** for lines containing Devanagari script to accommodate vowel markers (mātrās).

### Type Scale

| Token        | Font          | Size  | Weight | Line Height | Letter Spacing | Usage                                      |
|--------------|---------------|-------|--------|-------------|----------------|--------------------------------------------|
| `display-lg` | Geist         | 48px  | 700    | 56px        | −0.02em        | Page titles, hero headings                 |
| `headline-lg`| Geist         | 32px  | 600    | 40px        | —              | Section headers                            |
| `headline-md`| Geist         | 24px  | 600    | 32px        | —              | Sub-section headers                        |
| `body-lg`    | Merriweather  | 18px  | 400    | 30px        | —              | Primary article text, transliterations     |
| `body-md`    | Merriweather  | 16px  | 400    | 26px        | —              | Standard body content                      |
| `body-sm`    | Merriweather  | 14px  | 400    | 22px        | —              | Captions, footnotes, commentary            |
| `label-lg`   | Geist         | 14px  | 500    | 20px        | +0.05em        | Navigation labels, uppercase metadata      |
| `label-md`   | Geist         | 12px  | 500    | 16px        | +0.05em        | Tags, chips, status indicators             |
| `ui-mono`    | Geist         | 13px  | 400    | 18px        | —              | Sanskrit snippets, transliteration code    |

### Font Families

| Role         | Family       | Source         |
|--------------|--------------|----------------|
| Headline     | Geist        | Vercel / CDN   |
| Body         | Merriweather | Google Fonts   |
| Label / UI   | Geist        | Vercel / CDN   |

---

## 📐 Layout & Spacing

| Token              | Value   |
|--------------------|---------|
| `unit`             | 4px     |
| `gutter`           | 24px    |
| `margin-mobile`    | 16px    |
| `margin-desktop`   | 64px    |
| `container-max`    | 1280px  |
| `reading-column`   | 720px   |

- **Grid:** 12-column fixed grid on desktop; single-column fluid on mobile.
- **Reading Column:** 720px centered width for knowledge base articles (optimised for Merriweather line length).
- **Data Views:** Full 12-column grid for dictionary tables and grammatical breakdowns.
- **Baseline Grid:** 4px vertical rhythm.

---

## 📦 Shapes & Roundness

| Token       | Value       | Usage                          |
|-------------|-------------|--------------------------------|
| `sm`        | 0.125rem    | Fine details                   |
| `DEFAULT`   | 0.25rem     | Base roundness                 |
| `md`        | 0.375rem    | Subtle round                   |
| `lg`        | 0.5rem (4px)| Buttons, Inputs                |
| `xl`        | 0.75rem     | Cards, containers              |
| `full`      | 9999px      | Pills, avatars                 |

- **Interactive Elements** (Buttons/Inputs): `4px` corner radius.
- **Container Surfaces** (Cards/Sections): `8px` (`rounded-lg`) corner radius.
- **Contextual Markers** (Chips/Tags): `12px` (`rounded-xl`) for organic softness.

---

## 🗂️ Elevation & Depth

Hierarchy is expressed through **Tonal Layers** and **Luminous Accents** — no traditional shadows.

| Level | Description             | Surface Color | Border / Effect                          |
|-------|-------------------------|---------------|------------------------------------------|
| 0     | Background              | `#1A0E23`     | None                                     |
| 1     | Cards / Containers      | `#42354C`     | 1px gradient border (Persian Plum → Blackcurrant) |
| 2     | Popovers / Modals       | Lighter Blackcurrant | Anzac outer shadow (blur: 20px, opacity: 0.1) |

> **Focus State:** Elements emit a soft Saffron aura — `box-shadow: 0 0 20px rgba(222, 164, 80, 0.15)` — rather than a dark shadow.

---

## 🧩 Components

### Buttons

| Variant   | Background         | Text       | Border                        |
|-----------|--------------------|------------|-------------------------------|
| Primary   | `#DEA450` (Anzac)  | `#452B00`  | None                          |
| Secondary | Transparent        | `#FDBF68`  | 1px gradient border           |

### Cards

- Background: `surface-container` (`#261B30`)
- Border: 1px `linear-gradient(Persian Plum, Blackcurrant)`
- **On hover:** Border-top transitions to solid Anzac `#DEA450`
- Corner radius: `8px`

### Input Fields

- Background: Dark-filled (Blackcurrant tones)
- Default border: Blackcurrant
- **On focus:** Border → Anzac `#DEA450` + soft saffron outer glow

### Chips & Tags

- Categories: "Vedic", "Upanishadic", "Grammar", etc.
- Colors: Low-opacity `Prairie Sand` (`#9B411F`) or Tom Thumb green
- Text: High-contrast, `label-md` style (uppercase + tracking)
- Corner radius: `12px`

### Manuscripts / Code Blocks (Sanskrit Snippets)

- Container background: Persian Plum `#6A1D2F` at **10% opacity**
- Font: `ui-mono` (Geist monospaced)
- Used for: Original Sanskrit, IAST transliterations, grammatical data

---

## 🌐 Stitch Project Reference

| Field         | Value                                 |
|---------------|---------------------------------------|
| Project Name  | Indic Knowledge Base AI               |
| Project ID    | `7275696570977634227`                 |
| Design System | Sanskrit Scholarly Base               |
| Color Mode    | Dark                                  |
| Roundness     | `ROUND_FOUR` (4px)                    |
| Primary Font  | Geist                                 |
| Body Font     | Merriweather                          |
| Label Font    | Geist                                 |
| Device Type   | Desktop                               |

---

*Auto-generated from the Stitch MCP — Indic Knowledge Base AI project design theme.*
