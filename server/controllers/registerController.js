/**
 * Registration Controller
 * In-memory store for demo — swap with MongoDB/Mongoose for production
 */

const registrations = [];

function registerUser(req, res) {
    const { name, email, phone, college, teamName, track } = req.body;

    // Validate required fields
    const missing = [];
    if (!name) missing.push('name');
    if (!email) missing.push('email');
    if (!phone) missing.push('phone');
    if (!college) missing.push('college');
    if (!teamName) missing.push('teamName');
    if (!track) missing.push('track');

    if (missing.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Missing required fields: ${missing.join(', ')}`,
        });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.',
        });
    }

    // Check for duplicate email
    if (registrations.find((r) => r.email === email)) {
        return res.status(409).json({
            success: false,
            message: 'This email has already been registered.',
        });
    }

    const registration = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        name,
        email,
        phone,
        college,
        teamName,
        track,
        registeredAt: new Date().toISOString(),
    };

    registrations.push(registration);

    console.log(`✦ New registration: ${name} (${email}) — ${track}`);

    return res.status(201).json({
        success: true,
        message: 'Registration successful. Your celestial coordinates have been recorded.',
        data: { id: registration.id },
    });
}

module.exports = { registerUser };
