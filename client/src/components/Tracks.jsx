import './Tracks.css';

const TRACKS = [
    {
        name: 'Orion Track',
        subtitle: 'AI & Machine Learning',
        icon: '⚝',
        description: 'Navigate the vast neural cosmos. Build intelligent systems that learn, adapt, and illuminate new paths through data.',
    },
    {
        name: 'Atlas Track',
        subtitle: 'Web3 & Blockchain',
        icon: '◈',
        description: 'Carry the weight of decentralization. Forge trustless systems and reshape the architecture of digital trust.',
    },
    {
        name: 'Lyra Track',
        subtitle: 'Healthcare & Biotech',
        icon: '❋',
        description: 'Harmonize technology with the human form. Create solutions that heal, predict, and protect life itself.',
    },
    {
        name: 'Vega Track',
        subtitle: 'Sustainability & CleanTech',
        icon: '✧',
        description: 'Shine bright for the planet. Engineer solutions that preserve our world for generations yet unborn.',
    },
    {
        name: 'Perseus Track',
        subtitle: 'Cybersecurity',
        icon: '⛊',
        description: 'Defend the digital realm. Build shields, uncover vulnerabilities, and protect the constellation of connected systems.',
    },
    {
        name: 'Andromeda Track',
        subtitle: 'Open Innovation',
        icon: '✦',
        description: 'Reach beyond the known galaxy. No constraints, no limits — just pure, unbounded innovation.',
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
                    <div className="tracks__card" key={track.name}>
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
