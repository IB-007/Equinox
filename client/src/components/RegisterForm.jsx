import { useState } from 'react';
import './RegisterForm.css';

const TRACK_OPTIONS = [
    'Orion Track — AI & ML',
    'Atlas Track — Web3 & Blockchain',
    'Lyra Track — Healthcare & Biotech',
    'Vega Track — Sustainability',
    'Perseus Track — Cybersecurity',
    'Andromeda Track — Open Innovation',
];

export default function RegisterForm() {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', college: '', teamName: '', track: '',
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', phone: '', college: '', teamName: '', track: '' });
            } else {
                setStatus('error');
                setErrorMsg(data.message || 'Registration failed.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Could not connect to the server.');
        }
    };

    return (
        <section className="register section" id="register">
            <div className="section-title reveal">
                <h2>Register Now</h2>
                <p className="accent-text" style={{ textAlign: 'center', margin: '0 auto' }}>
                    Align yourself with the stars
                </p>
            </div>

            <div className="register__container reveal">
                {status === 'success' ? (
                    <div className="register__success fade-in-up">
                        <div className="register__success-icon">✦</div>
                        <h3>Registration Complete</h3>
                        <p>Your celestial coordinates have been recorded. See you at Equinox.</p>
                        <button className="btn" onClick={() => setStatus('idle')}>
                            Register Another
                        </button>
                    </div>
                ) : (
                    <form className="register__form" onSubmit={handleSubmit}>
                        <div className="register__row">
                            <div className="register__field">
                                <label htmlFor="reg-name">Full Name</label>
                                <input
                                    id="reg-name"
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="register__field">
                                <label htmlFor="reg-email">Email</label>
                                <input
                                    id="reg-email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="register__row">
                            <div className="register__field">
                                <label htmlFor="reg-phone">Phone</label>
                                <input
                                    id="reg-phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>
                            <div className="register__field">
                                <label htmlFor="reg-college">College</label>
                                <input
                                    id="reg-college"
                                    name="college"
                                    type="text"
                                    required
                                    value={form.college}
                                    onChange={handleChange}
                                    placeholder="Your institution"
                                />
                            </div>
                        </div>

                        <div className="register__row">
                            <div className="register__field">
                                <label htmlFor="reg-team">Team Name</label>
                                <input
                                    id="reg-team"
                                    name="teamName"
                                    type="text"
                                    required
                                    value={form.teamName}
                                    onChange={handleChange}
                                    placeholder="Your team name"
                                />
                            </div>
                            <div className="register__field">
                                <label htmlFor="reg-track">Track</label>
                                <select
                                    id="reg-track"
                                    name="track"
                                    required
                                    value={form.track}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select a track</option>
                                    {TRACK_OPTIONS.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {status === 'error' && (
                            <p className="register__error">{errorMsg}</p>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary register__submit"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Submitting...' : 'Register'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
