import './About.css';

export default function About() {
    return (
        <section className="about section" id="about">
            {/* Background Astrolabe Vector */}
            <div className="about__bg-vector">
                <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="200" r="180" stroke="var(--gold-line)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                    <circle cx="200" cy="200" r="140" stroke="var(--gold-line)" strokeWidth="0.5" opacity="0.6" />
                    <circle cx="200" cy="200" r="100" stroke="var(--gold-subtle)" strokeWidth="1" opacity="0.3" />
                    <ellipse cx="200" cy="200" rx="180" ry="60" transform="rotate(30 200 200)" stroke="var(--gold-line)" strokeWidth="0.5" opacity="0.5" />
                    <ellipse cx="200" cy="200" rx="180" ry="60" transform="rotate(-30 200 200)" stroke="var(--gold-line)" strokeWidth="0.5" opacity="0.5" />
                    <path d="M200 20 L200 380 M20 200 L380 200" stroke="var(--gold-line)" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.5" />
                    <circle cx="200" cy="200" r="4" fill="var(--gold-subtle)" opacity="0.8" />
                </svg>
            </div>

            <div className="section-title reveal">
                <h2>About Equinox</h2>
            </div>

            <div className="about__grid reveal">
                <div className="about__text">
                    <p className="about__lead accent-text">
                        Where innovation meets infrastructure
                    </p>
                    <p>
                        Equinox '26 is a 3-day hackathon centered on the theme of <strong>Smart Infrastructure</strong>, 
                        challenging teams to build solutions that make cities, homes, roads, and communities more intelligent, connected, and resilient. 
                    </p>
                    <p>
                        
                        Organized by <strong>RoboVITics</strong> and hosted at <strong>VIT Vellore</strong>, Equinox brings together coders, designers,
                         and innovators from across the country for <strong>3 days</strong> of relentless building. Beyond the code and hardware, 
                         Equinox is an ecosystem of rapid prototyping and high-stakes problem-solving. 
                         It’s where theoretical concepts meet real-world constraints, pushing participants to transcend traditional engineering boundaries.
                    </p>
                </div>

                <div className="about__visual">
                    <div className="about__logo-container">
                        <div className="about__logo-placeholder">
                            <span className="about__logo-icon">⚙</span>
                            <span className="about__logo-label">RoboVITics</span>
                        </div>
                    </div>

                    <div className="about__stats">
                        <div className="about__stat">
                            <span className="about__stat-number">3</span>
                            <span className="about__stat-label">Days</span>
                        </div>
                        <div className="about__stat">
                            <span className="about__stat-number">6</span>
                            <span className="about__stat-label">Tracks</span>
                        </div>
                        <div className="about__stat">
                            <span className="about__stat-number">1500</span>
                            <span className="about__stat-label">Participants</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
