import './Tracks.css';

const TRACKS = [
    {
        name: 'Healthcare',
        subtitle: 'Smart Infrastructure for Health',
        icon: '✚',
        description: 'Build solutions that leverage smart infrastructure to bridge gaps in healthcare delivery, resource management, and patient wellness across communities.',
    },
    {
        name: 'Road Safety',
        subtitle: 'Intelligent Transportation Systems',
        icon: '⊕',
        description: 'Design systems that make roads smarter, safer, and more efficient — from collision prevention to adaptive traffic management and urban mobility.',
    },
    {
        name: 'Social Wellness',
        subtitle: 'Tech-Enabled Communities',
        icon: '⊙',
        description: 'Create technology-powered solutions that improve how communities live, interact, and thrive — transforming public spaces into inclusive, connected environments.',
    },
    {
        name: 'Smart Security',
        subtitle: 'Protection & Cyber Resilience',
        icon: '⊗',
        description: 'Build solutions that protect smart infrastructure from physical and digital threats — securing connected systems, data pipelines, and public utilities.',
    },
    {
        name: 'Smart Home',
        subtitle: 'Home Automation & Intelligent Living',
        icon: '⌂',
        description: 'Develop solutions that transform homes into responsive, efficient, and connected living spaces.',
        sponsored: true,
    },
    {
        name: 'Open Innovation',
        subtitle: 'Smart Infrastructure — Your Way',
        icon: '∞',
        description: 'No domain constraints — just the theme of Smart Infrastructure. Reach beyond defined boundaries and build whatever the future demands.',
    },
];

export default function Tracks() {
    return (
        <section className="tracks section" id="tracks">
            {/* Background Constellation Map */}
            <div className="tracks__bg-vector">
                <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 150 L250 80 L350 200 L550 120 L700 250 L600 450 L400 350 L200 400 Z" stroke="var(--gold-line)" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.4" />
                    <path d="M250 80 L400 350 M350 200 L700 250 M100 150 L200 400" stroke="var(--gold-line)" strokeWidth="0.5" opacity="0.2" />
                    <circle cx="100" cy="150" r="3" fill="var(--marble)" opacity="0.6" />
                    <circle cx="250" cy="80" r="4" fill="var(--mist)" opacity="0.8" />
                    <circle cx="350" cy="200" r="2" fill="var(--marble)" opacity="0.5" />
                    <circle cx="550" cy="120" r="5" fill="var(--gold-subtle)" opacity="0.7" />
                    <circle cx="700" cy="250" r="3" fill="var(--marble)" opacity="0.6" />
                    <circle cx="600" cy="450" r="4" fill="var(--mist)" opacity="0.8" />
                    <circle cx="400" cy="350" r="3" fill="var(--gold-subtle)" opacity="0.6" />
                    <circle cx="200" cy="400" r="2" fill="var(--marble)" opacity="0.5" />
                </svg>
            </div>

            <div className="section-title reveal">
                <h2>Tracks</h2>
                <p className="accent-text" style={{ textAlign: 'center', margin: '0 auto' }}>
                    Choose your constellation
                </p>
            </div>

            <div className="tracks__grid reveal stagger">
                {TRACKS.map((track) => (
                    <div className={`tracks__card${track.sponsored ? ' tracks__card--sponsored' : ''}`} key={track.name}>
                        <span className="tracks__icon">{track.icon}</span>
                        <h3 className="tracks__name">{track.name}</h3>
                        <span className="tracks__subtitle accent-text">{track.subtitle}</span>
                        <p className="tracks__desc">{track.description}</p>
                        <div className="tracks__line" />
                    </div>
                ))}
            </div>
        </section>
    );
}
