Build Equinox for production.

Run the Vite production build:
```bash
cd client && npm run build
```

Output goes to `client/dist/`. The Express server in `server/server.js` already serves this directory as static files and handles the SPA catch-all route, so after building you can run:
```bash
cd server && node server.js
```
and visit http://localhost:5000 to verify the production build.
