import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="celestial-divider" />

            <div className="footer__content">
                {/* Greek meander border */}
                <div className="footer__meander" />

                <div className="footer__inner">
                    <div className="footer__brand">
                        <span className="footer__logo-icon">☉</span>
                        <span className="footer__logo-text">Equinox</span>
                        <p className="footer__tagline">
                            An ancient observatory reborn in the modern digital cosmos.
                        </p>
                    </div>

                    <div className="footer__links">
                        <div className="footer__col">
                            <h4 className="footer__col-title">Navigate</h4>
                            <a href="#about">About</a>
                            <a href="#tracks">Tracks</a>
                            <a href="#timeline">Timeline</a>
                            <a href="#register">Register</a>
                        </div>
                        <div className="footer__col">
                            <h4 className="footer__col-title">Connect</h4>
                            <a href="#" rel="noopener">Instagram</a>
                            <a href="#" rel="noopener">Twitter</a>
                            <a href="#" rel="noopener">Discord</a>
                            <a href="#" rel="noopener">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2026 Equinox by RoboVITics. All rights reserved.</p>
                    <p className="footer__motto accent-text">
                        "Balance in all things."
                    </p>
                </div>
            </div>
        </footer>
    );
}
