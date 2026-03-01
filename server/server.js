/**
 * Equinox — Express Server
 * Handles registration API
 */
const express = require('express');
const cors = require('cors');
const registerRoutes = require('./routes/register');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', registerRoutes);

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Equinox server running' });
});

app.listen(PORT, () => {
    console.log(`☉ Equinox server listening on port ${PORT}`);
});
