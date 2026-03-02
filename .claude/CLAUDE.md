# Equinox — Project Context

## What is this?
Landing page for **Equinox**, a 48-hour hackathon by RoboVITics at VIT.
Full-stack: React + Vite frontend, Express backend.

---

## Stack
| Layer | Tech |
|---|---|
| Frontend | React 19, Vite 7, Three.js 0.183 |
| Styling | Plain CSS + CSS custom properties (no Tailwind, no CSS-in-JS) |
| Backend | Express 5, CommonJS, in-memory store |
| Build | `cd client && npm run dev` (5173) · `cd server && node server.js` (5000) |

---

## Directory map
```
client/src/
  App.jsx                   Root — scroll-reveal observer
  components/
    Navbar.jsx / .css       Fixed; transparent on hero, solid on scroll
    Hero.jsx / .css         Three.js canvas + countdown timer + CTA
    About.jsx / .css        Event description + stats
    Tracks.jsx / .css       6 tracks: Orion, Atlas, Lyra, Vega, Perseus, Andromeda
    Timeline.jsx / .css     Day-by-day schedule (Day 0–2)
    Sponsor.jsx / .css      Tiered sponsor display
    RegisterForm.jsx / .css Form → POST /api/register
    FAQ.jsx / .css          Accordion FAQ (7 questions)
    Footer.jsx / .css       Links + socials + copyright
    CustomCursor.jsx / .css Gold dot + rotating celestial ring
  three/
    CelestialScene.js       Three.js circumpolar star field (main scene)
  styles/
    variables.css           All design tokens
    global.css              Reset, body gradient, typography, utilities
    animations.css          Keyframes

server/
  server.js                 Entry — static serve + API
  routes/register.js        POST /api/register
  controllers/registerController.js
  models/Registration.js    In-memory store (MongoDB placeholder)
```

---

## Colour tokens
```
--equinox-dark   #0B1120   darkest (left side of body gradient)
--primary-dark   #0F1523
--primary-mid    #1A2238
--equinox-mid    #1E2A42
--primary-light  #2F3A55
--equinox-light  #3D4E6E   lightest (right side of body gradient)
--gold-subtle    #C9A96E   primary accent
--mist           #F5F6F3   headings
--marble         #E7E2DE   body text
```
Body gradient: `105deg` left-dark → right-light, `background-attachment: fixed`.

---

## Critical rules — do not violate

### 1. Navbar + CustomCursor live OUTSIDE `.app`
In `App.jsx` the structure is:
```jsx
<>
  <CustomCursor />   {/* outside .app */}
  <Navbar />         {/* outside .app */}
  <div className="app page-enter">
    ...sections...
  </div>
</>
```
**Why:** `.page-enter` animates opacity, which creates a CSS stacking context during animation. Any CSS stacking context on a parent traps `position: fixed` children — the cursor and navbar break on all sections below the hero. They must stay in the root stacking context.

### 2. cursor: none coverage
Applied in two places — both are needed:
- `html { cursor: none }` in `global.css`
- `@media (pointer: fine) { *, *::before, *::after { cursor: none !important } }` in `global.css` AND `CustomCursor.css`

### 3. scroll-padding-top
`html { scroll-padding-top: var(--nav-height) }` in `global.css` — keeps anchor targets from hiding under the fixed navbar.

### 4. No transform in pageLoad animation
`animations.css` `@keyframes pageLoad` uses opacity only (no transform). A `transform` in the final `forwards` keyframe permanently creates a stacking context on `.app`.

### 5. CSS variables only
Never hard-code colours, spacing, or transition values in component CSS. Always use tokens from `variables.css`.

---

## CelestialScene.js — design notes
- **8 speed tiers** with intentionally overlapping radius ranges (no obvious ring bands)
- Each star = `THREE.Line` (curved arc trail) + `THREE.Points` (canvas glow dot)
- `AdditiveBlending` on all star materials
- `Math.sqrt(Math.random())` for radius within each tier → biases toward outer edge
- Density ramp: inner tier counts are tiny (12–45), outer tiers are large (160–380)
- Pole-star: 3-layer sprite (wide halo + mid + bright core) at scene origin
- Differential rotation: each tier's `THREE.Group` rotates at its own `.userData.speed`

---

## Styling conventions
- Component CSS co-located with JSX (`Foo.jsx` + `Foo.css`)
- Global utilities only in `global.css` — don't duplicate resets in component files
- Section root elements are transparent — body gradient shows through
- Breakpoints: `768px` (tablet), `480px` (phone)
- `--nav-height: clamp(60px, 8vw, 72px)` — use this variable wherever navbar height matters
- Add class `reveal` to elements that should animate on scroll (handled by `IntersectionObserver` in `App.jsx`)

---

## Available slash commands
| Command | Purpose |
|---|---|
| `/dev` | Start frontend + backend dev servers |
| `/build` | Production build + verification |
| `/new-section <Name>` | Scaffold a new section component |
| `/check` | Lint + build check + key file review |
