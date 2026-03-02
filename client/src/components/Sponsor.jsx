import { useEffect, useRef } from "react";
import './Sponsor.css';

const SPONSORS = [
    { name: 'Sponsor Alpha', tier: 'Gold' },
    { name: 'Sponsor Beta', tier: 'Gold' },
    { name: 'Sponsor Gamma', tier: 'Silver' },
    { name: 'Sponsor Delta', tier: 'Silver' },
    { name: 'Sponsor Epsilon', tier: 'Silver' },
    { name: 'Sponsor Zeta', tier: 'Bronze' },
    { name: 'Sponsor Eta', tier: 'Bronze' },
    { name: 'Sponsor Theta', tier: 'Bronze' },
];

export default function Sponsor() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const cards = el.querySelectorAll(".sponsor__logo-card");

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add("show");
                        }, index * 100);
                    });
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const gold = SPONSORS.filter(s => s.tier === 'Gold');
    const silver = SPONSORS.filter(s => s.tier === 'Silver');
    const bronze = SPONSORS.filter(s => s.tier === 'Bronze');

    const renderTier = (label, sponsors, tierClass) => (
        <div className={`sponsor__tier ${tierClass}`}>
            <span className="sponsor__tier-label">{label}</span>
            <div className="sponsor__logos">
                {sponsors.map((s, i) => (
                    <div className="sponsor__logo-card" key={i}>
                        <div className="sponsor__logo-placeholder">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.25" />
                                <path d="M10 22l6-12 6 12" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                            </svg>
                            <span className="sponsor__logo-name">{s.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section ref={sectionRef} className="sponsor section" id="sponsors">
            <div className="section-title reveal">
                <h2>Sponsors</h2>
                <p className="accent-text" style={{ textAlign: 'center', margin: '0 auto' }}>
                    The pillars that uphold the dome
                </p>
            </div>

            {renderTier('Gold Partners', gold, 'sponsor__tier--gold')}
            {renderTier('Silver Partners', silver, 'sponsor__tier--silver')}
            {renderTier('Bronze Partners', bronze, 'sponsor__tier--bronze')}
        </section>
    );
}
