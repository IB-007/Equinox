Start the Equinox development environment.

Run both servers:

1. Start the Vite frontend dev server:
```bash
cd client && npm run dev
```

2. In a separate process, start the Express backend:
```bash
cd server && node server.js
```

Frontend runs on http://localhost:5173
Backend runs on http://localhost:5000

Remind the user that the backend is optional unless testing the registration form (`POST /api/register`).
