Run a quick health check on the Equinox codebase.

Do all of the following:

1. **Lint** — run ESLint and report any errors:
```bash
cd client && npm run lint
```

2. **Build check** — verify the production build compiles without errors:
```bash
cd client && npm run build
```

3. **Dependency audit** — check for any missing or mismatched packages:
```bash
cd client && npm install --dry-run
```

4. **Key file review** — quickly read and flag any obvious issues in:
   - `client/src/App.jsx` (Navbar + CustomCursor must be outside `.app` div)
   - `client/src/three/CelestialScene.js` (check for console errors or dispose leaks)
   - `server/server.js` (check routes are wired correctly)

Report a summary of findings.
