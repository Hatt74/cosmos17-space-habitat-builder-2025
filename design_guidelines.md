# Design Guidelines: Space Habitat Planning & Simulation Tool

## Design Approach
**Selected Approach:** Design System + Sci-Fi Aesthetic Fusion

**Justification:** This is a utility-focused, data-heavy application requiring functional clarity over visual flair. Drawing inspiration from Carbon Design System for enterprise-grade data displays, combined with sci-fi game UI aesthetics (Factorio, Oxygen Not Included) for thematic consistency.

**Key Design Principles:**
- Information clarity over decoration
- Functional hierarchy for quick scanning
- Space/tech aesthetic without compromising usability
- Persistent dark mode for extended use sessions

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background: 220 25% 8% (deep space blue-black)
- Surface: 220 20% 12% (elevated panels)
- Surface Elevated: 220 18% 16% (cards, modals)
- Border: 220 15% 25% (subtle dividers)

**Functional Colors:**
- Primary: 195 85% 55% (cyan-blue for actions)
- Success: 142 70% 50% (healthy systems, connected)
- Warning: 35 95% 60% (resource warnings)
- Danger: 355 85% 55% (damaged buildings, disasters)
- Energy: 280 75% 60% (power indicators)

**Building Type Colors:**
- Houses: 220 15% 40%
- Food Stations: 142 40% 45%
- Water Systems: 195 60% 50%
- Waste Management: 35 50% 45%
- Communication Towers: 280 55% 55%

**Pipe/Connection:** 195 70% 45% (active), 220 10% 30% (inactive)

### B. Typography
**Font Stack:** 'Inter' for UI, 'JetBrains Mono' for numerical data/stats

**Hierarchy:**
- Page Headers: 2xl/3xl, font-semibold (mode titles, panel headers)
- Section Headers: lg/xl, font-medium (building categories, stats sections)
- Body/Labels: sm/base, font-normal (building names, descriptions)
- Data/Stats: sm mono, font-medium (resource counts, coordinates)
- Micro Copy: xs, font-normal (tooltips, helper text)

### C. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm

**Grid Structure:**
- Main canvas: Flex-1 central area with fixed sidebars
- Left Sidebar: 280px building palette and controls
- Right Sidebar: 320px resource stats and simulation controls
- Top Bar: 64px height for mode toggle and global actions
- Bottom Bar: 48px for status messages and quick stats

### D. Component Library

**Navigation/Controls:**
- Top Bar: Dark surface with mode toggle (Design/Simulation), undo/redo, save/load buttons
- Mode Toggle: Segmented button control with active state highlighting
- Action Buttons: Primary cyan for main actions, subtle outline for secondary

**Building Palette (Left Sidebar):**
- Scrollable grid of building cards (2 columns)
- Each card: 120px square with icon, name, resource requirements
- Drag indicator on hover
- Category headers with collapse/expand

**Canvas Area:**
- Grid overlay (toggleable) with coordinate system
- Building placement indicators showing valid/invalid zones
- Pipe connection lines with animated flow when active
- Zoom controls (bottom-right corner)
- Minimap (top-right corner, 180px square)

**Building Components:**
- Building tiles: Square/rectangular with type-specific colors
- Status indicators: Corner badges for health (green/yellow/red)
- Connection points: Visible dots for pipe attachment
- Damage overlay: Red diagonal lines when damaged
- Selection state: Bright border when selected

**Resource Panel (Right Sidebar):**
- Stat cards for water/food/waste/energy
- Horizontal progress bars for resource levels
- Connected buildings list with status icons
- Pipe network diagram (simplified tree view)

**Simulation Controls:**
- Scenario selector: Dropdown with disaster types
- Intensity slider: Visual indicator for disaster strength
- Timeline scrubber: Play/pause simulation
- Event log: Scrollable list of events with timestamps

**Modal/Overlays:**
- Building details modal: Semi-transparent backdrop, centered card
- Confirmation dialogs: Compact with clear action buttons
- Damage reports: Alert-style with affected systems list

**Status Indicators:**
- Toast notifications: Top-right, auto-dismiss
- Building health: Color-coded outlines (green/yellow/red)
- Pipe flow: Animated dashed lines showing direction
- Energy status: Pulsing glow on communication towers

### E. Animations
**Minimal, Functional Only:**
- Pipe flow animation: Subtle dashed-line movement (2s duration)
- Building placement: Quick fade-in (150ms)
- Mode transition: Smooth opacity shift (200ms)
- Disaster effects: Brief flash/shake (300ms) then persistent damage state
- No hover animations on canvas to reduce distraction

---

## Images
**No Hero Image** - This is a utility application, not a marketing page.

**In-App Icons:**
- Building type icons: Use Font Awesome icons (fa-home, fa-utensils, fa-tint, fa-recycle, fa-broadcast-tower)
- Status icons: Simple SVG circles/triangles for health indicators
- Control icons: Material Icons for UI controls (play, pause, settings, zoom)

---

## Interaction Patterns
- Drag-and-drop with ghost preview
- Click-to-connect pipe routing
- Right-click context menus for building options
- Hover tooltips for all interactive elements showing requirements/stats
- Keyboard shortcuts displayed in tooltips (e.g., "Press 'S' to simulate")