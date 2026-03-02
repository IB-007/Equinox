Scaffold a new page section for the Equinox site.

The section name is: $ARGUMENTS

Follow these exact conventions:

## File structure
Create two files:
- `client/src/components/$ARGUMENTS.jsx`
- `client/src/components/$ARGUMENTS.css`

## JSX template
```jsx
import './$ARGUMENTS.css';

export default function $ARGUMENTS() {
  return (
    <section className="[lowercase-name]" id="[lowercase-name]">
      <div className="section">
        <h2 className="section-title reveal">[Title]</h2>
        {/* content */}
      </div>
    </section>
  );
}
```

## CSS template
Start the CSS file with:
```css
/* ═══════════════════════════════════════════════
   [Section Name] Styles
   ═══════════════════════════════════════════════ */
```
Use only CSS custom properties from `variables.css` — no hard-coded colours or spacing values.

## Wiring up
1. Import the component in `client/src/App.jsx`
2. Add it between two `<div className="celestial-divider" />` elements in the correct position
3. Add a nav link entry in `Navbar.jsx` → `NAV_LINKS` array if it needs a nav item

## Reminders
- Add `reveal` class to elements that should animate in on scroll
- The section's root element should be transparent (body gradient shows through)
- Mobile styles at `768px` and `480px` breakpoints
