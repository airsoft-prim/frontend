# Design System

## Overview

This project is a modern airsoft community and forum.

The UI is built with **Mantine UI**.

The application supports two color schemes:

* `dark` — **Dark Field**
* `light` — **Sand Field**

Both themes are part of the same visual identity and must share:

* the same semantic colors;
* the same component structure;
* the same spacing and layout principles;
* the same visual hierarchy;
* the same tactical and outdoor atmosphere.

The project should feel:

* modern;
* community-oriented;
* structured;
* slightly tactical;
* outdoor-inspired;
* colorful but restrained.

The project is **not** a military website, military simulator, tactical equipment store, or aggressive gaming portal.

---

# Color Schemes

## Dark Theme — Dark Field

Dark theme is the primary visual identity of the project.

It should feel:

* dark;
* atmospheric;
* tactical;
* structured;
* calm;
* modern.

The dark theme uses deep green-gray surfaces with olive, sand, rust, and steel accents.

### Base Surfaces

| Token              | Value     | Usage                            |
| ------------------ | --------- | -------------------------------- |
| `background`       | `#171A17` | Application background           |
| `surface`          | `#20241F` | Main cards and sections          |
| `surface-elevated` | `#292E27` | Modals, popovers, elevated cards |
| `surface-hover`    | `#30362D` | Hovered interactive surfaces     |
| `border`           | `#3A4136` | Borders and separators           |

Do not use pure black as the primary background.

The base colors should feel slightly organic and outdoor-oriented rather than neutral gray.

### Dark Typography

| Token            | Value     | Usage                               |
| ---------------- | --------- | ----------------------------------- |
| `text-primary`   | `#E8E6DF` | Primary content                     |
| `text-secondary` | `#A8ADA2` | Secondary content                   |
| `text-muted`     | `#737A70` | Metadata and less important content |

Avoid pure white text where softer contrast is sufficient.

---

# Light Theme — Sand Field

The light theme must not be a generic white and gray interface.

It should feel:

* warm;
* natural;
* outdoor-inspired;
* clean;
* readable;
* slightly tactical.

The visual base is built around warm sand and muted gray-green tones.

The light theme should resemble:

> Field notebook + terrain map + modern community platform.

It must remain visually connected to the Dark Field theme.

## Base Surfaces

| Token              | Value     | Usage                            |
| ------------------ | --------- | -------------------------------- |
| `background`       | `#E9E7DE` | Application background           |
| `surface`          | `#F5F3EB` | Main cards and sections          |
| `surface-elevated` | `#FFFFFF` | Modals, popovers, elevated cards |
| `surface-hover`    | `#ECEADF` | Hovered interactive surfaces     |
| `border`           | `#D4D1C5` | Borders and separators           |

Avoid using pure white as the dominant application background.

Pure white may be used for elevated surfaces where additional separation is required.

The overall background should have a subtle warm or natural tint.

## Light Typography

| Token            | Value     | Usage                               |
| ---------------- | --------- | ----------------------------------- |
| `text-primary`   | `#252820` | Primary content                     |
| `text-secondary` | `#5E6259` | Secondary content                   |
| `text-muted`     | `#85887F` | Metadata and less important content |

Text should remain neutral and readable.

Avoid pure black unless required for accessibility.

---

# Brand Colors

Brand colors are shared between both color schemes.

Their shades may adapt to the current color scheme, but their semantic meaning must remain unchanged.

---

## Field

Primary brand color.

Base value:

```text
#6B7D3A
```

Semantic meaning:

* primary actions;
* active navigation;
* selected elements;
* important interactive elements;
* brand identity;
* primary links and highlights.

Field is the dominant accent color.

Do not apply Field to every component.

### Visual association

* olive;
* vegetation;
* terrain;
* outdoor;
* field operations.

---

## Sand

Secondary brand color.

Base value:

```text
#B89B62
```

Use for:

* secondary accents;
* categories;
* teams;
* badges;
* supporting visual elements.

### Visual association

* sand;
* equipment;
* outdoor;
* terrain;
* tactical gear.

---

## Rust

Accent color.

Base value:

```text
#C96A3D
```

Use sparingly for:

* important events;
* CQB-related content;
* important calls to action;
* attention-required elements.

Rust should create visual energy without becoming the dominant color.

---

## Steel

Information color.

Base value:

```text
#4F7C91
```

Use for:

* informational states;
* system information;
* locations;
* neutral highlights;
* informational badges.

Steel should remain muted and restrained.

Avoid bright saturated blue.

---

# Semantic Colors

## Success

Base value:

```text
#4E8B57
```

Use for:

* active games;
* open registrations;
* successful actions;
* positive statuses.

---

## Warning

Base value:

```text
#C99832
```

Use for:

* warnings;
* limited availability;
* important notices.

---

## Danger

Base value:

```text
#B85450
```

Use for:

* errors;
* destructive actions;
* cancelled events;
* closed or unavailable states.

Danger must not be used as a decorative accent.

---

# Theme Relationship

Dark and light themes must communicate the same semantic meaning.

Example:

| Meaning           | Dark Theme   | Light Theme  |
| ----------------- | ------------ | ------------ |
| Primary action    | Field Olive  | Field Olive  |
| Active state      | Olive accent | Olive accent |
| Team / category   | Sand         | Sand         |
| Event / CQB       | Rust         | Rust         |
| Information       | Steel        | Steel        |
| Open / active     | Success      | Success      |
| Warning           | Warning      | Warning      |
| Error / cancelled | Danger       | Danger       |

Do not assign different semantic meanings to the same color between themes.

The themes should differ primarily through:

* surface colors;
* background colors;
* border contrast;
* text colors;
* component elevation.

---

# Color Distribution

## Dark Theme

Target approximate distribution:

* 70% — dark neutral surfaces;
* 15% — Field / olive;
* 10% — Sand and Steel;
* 5% — Rust and semantic colors.

## Light Theme

Target approximate distribution:

* 70% — warm neutral surfaces;
* 15% — Field / olive;
* 10% — Sand and Steel;
* 5% — Rust and semantic colors.

These are guidelines, not strict mathematical requirements.

The interface should feel colorful enough to maintain clear hierarchy, but restrained enough to remain coherent.

---

# Visual Hierarchy

The interface must have clear visual separation between:

* application background;
* navigation;
* surfaces;
* elevated surfaces;
* interactive elements;
* active elements;
* semantic states.

Do not create interfaces where all components use nearly identical colors.

Cards, panels, navigation, borders, and interactive elements must remain visually distinguishable.

This requirement applies especially to the dark theme.

The dark interface must not become a collection of visually merged dark rectangles.

---

# Visual Style

The primary visual direction is:

> Modern community platform + subtle tactical and outdoor influences.

Preferred visual associations:

* outdoor;
* airsoft fields;
* terrain;
* maps;
* team activities;
* events;
* community;
* equipment;
* tactical organization.

Avoid:

* camouflage textures;
* weapon silhouettes as decoration;
* skulls;
* aggressive military insignia;
* excessive patches and chevrons;
* HUD-style interfaces;
* sci-fi military interfaces;
* neon cyberpunk colors;
* excessive gradients;
* excessive glow effects;
* purely black and white layouts.

---

# Mantine UI Requirements

The project uses **Mantine UI** as the primary component library.

Use Mantine components whenever an appropriate component exists.

Do not recreate existing Mantine components unnecessarily.

Examples include:

* `Button`
* `ActionIcon`
* `Card`
* `Badge`
* `Tabs`
* `Menu`
* `Modal`
* `Drawer`
* `Popover`
* `Avatar`
* `Table`
* `Pagination`
* `Select`
* `TextInput`
* `Textarea`
* `Notification`
* `ColorSchemeScript`
* `MantineProvider`

The visual system should be implemented through:

* Mantine theming;
* color schemes;
* reusable design tokens;
* semantic colors;
* reusable component styles.

Do not hardcode unrelated colors inside individual components unless the component requires a unique semantic state.

Preferred custom Mantine color names:

```text
field
sand
rust
steel
```

Example:

```tsx
<Button color="field">
    Create topic
</Button>

<Badge color="sand">
    Team
</Badge>

<Badge color="rust">
    CQB
</Badge>

<Badge color="steel">
    Information
</Badge>
```

Prefer semantic and reusable color names.

---

# Color Scheme Support

The application must support:

```text
light
dark
```

The user must be able to switch between color schemes.

Use Mantine color scheme functionality.

Theme switching must affect:

* application background;
* surfaces;
* elevated surfaces;
* borders;
* typography;
* hover states;
* navigation;
* component backgrounds.

Brand and semantic colors should preserve their meaning across themes.

Do not create separate component systems for dark and light themes.

Components must adapt through the active color scheme and theme tokens.

---

# Component Styling

## Cards

Cards should:

* have visible separation from the application background;
* use subtle borders;
* have moderate border radius;
* support clear hover states when interactive.

### Dark Theme

Prefer separation through:

* surface contrast;
* subtle borders;
* minimal elevation.

### Light Theme

Prefer separation through:

* warm surface contrast;
* subtle borders;
* restrained shadows where necessary.

Avoid excessive floating-card effects.

---

## Buttons

Primary actions should use `field`.

Secondary actions should use:

* neutral variants;
* subtle outlined variants;
* `sand` where semantic meaning allows.

Destructive actions should use `danger`.

Important event-related actions may use `rust`.

Do not create multiple competing primary actions within the same visual area.

---

## Badges

Badges are important for the forum and should communicate semantic information.

Typical usage:

* user roles;
* teams;
* game type;
* event status;
* location;
* content categories.

Examples:

```text
Field   → primary / active
Sand    → team / category
Rust    → CQB / event
Steel   → information / location
Green   → open / active
Red     → closed / cancelled
```

Badges should improve scanning of information.

Do not use badges purely as decoration.

---

## Navigation

Active navigation should be clearly visible in both themes.

Preferred active treatment:

* Field accent;
* subtle background contrast;
* clear text state;
* optional left indicator or underline.

Do not rely only on tiny color differences to indicate the active item.

---

## Borders

Borders should create structure without dominating the interface.

### Dark Theme

Use a muted green-gray border.

Base reference:

```text
#3A4136
```

### Light Theme

Use a warm neutral border.

Base reference:

```text
#D4D1C5
```

Avoid:

* pure white borders;
* excessive thick borders;
* borders around every small element.

---

# Interaction States

Interactive elements must have clear states:

* default;
* hover;
* active;
* selected;
* disabled;
* loading;
* error where applicable.

Hover states should increase clarity without excessive animation.

Prefer subtle transitions.

Avoid:

* large scaling animations;
* aggressive glow;
* excessive movement;
* distracting transitions.

---

# Layout

Prefer:

* clear spacing;
* consistent vertical rhythm;
* strong grouping of related content;
* readable content density.

The forum should support:

* topic lists;
* categories;
* posts;
* user profiles;
* teams;
* games and events;
* notifications;
* administration.

The design must remain scalable as new sections are added.

Do not optimize the entire system around the current small scope of the forum.

---

# Border Radius

Use moderate rounding.

The interface should feel modern but not overly soft.

Avoid:

* completely square legacy UI;
* excessive pill-shaped components;
* excessive `border-radius`.

Pills are appropriate primarily for:

* badges;
* tags;
* compact filters;
* small status indicators.

---

# Shadows

Use shadows sparingly.

Preferred:

* subtle elevation;
* clear layering for modals and popovers;
* minimal visual noise.

### Dark Theme

Prefer surface contrast and borders over shadows.

### Light Theme

Subtle shadows may be used to create elevation where surface contrast alone is insufficient.

Avoid strong floating-card effects across the entire interface.

---

# Accessibility

Maintain sufficient contrast between:

* text and background;
* surfaces;
* borders;
* active states;
* semantic colors.

Do not communicate important information using color alone.

Interactive elements must remain identifiable through:

* shape;
* text;
* icons;
* borders;
* state changes.

Both light and dark themes must independently satisfy accessibility requirements.

---

# Design Decision Rules

When creating or modifying UI, follow this order of priority:

1. Reuse Mantine components.
2. Reuse existing project design tokens.
3. Respect the active color scheme.
4. Preserve semantic color meaning.
5. Maintain visual hierarchy.
6. Prefer consistency over novelty.
7. Add custom styling only when necessary.
8. Avoid introducing new colors without a semantic reason.

Before introducing a new visual pattern, check whether an existing component or pattern already solves the problem.

---

# Final Design Goal

The final product should feel like:

> A modern airsoft community platform with dark and light themes, clear visual hierarchy, natural tactical colors, and subtle outdoor influences.

The dark theme should feel like:

> **Dark Field** — deep, atmospheric, olive, structured.

The light theme should feel like:

> **Sand Field** — warm, clean, natural, readable.

The product should **not** feel like:

* a military portal;
* a weapon store;
* a camouflage-themed website;
* a generic gray SaaS dashboard;
* a neon gaming interface;
* a corporate administration panel.

The unified visual identity is built around:

> **Field + Sand + Rust + Steel**

with:

* dark green-gray surfaces in Dark Field;
* warm sand-neutral surfaces in Sand Field;
* consistent semantic colors;
* strong visual hierarchy;
* restrained use of accents.
