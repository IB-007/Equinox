import { useState } from 'react';
import './FAQ.css';

const QUESTIONS = [
    {
        q: 'What is Equinox?',
        a: 'Equinox is a 48-hour hackathon organized by RoboVITics. It brings together innovators, developers, and designers to build solutions across multiple tracks, all under the theme of cosmic balance and intellectual exploration.',
    },
    {
        q: 'Who can participate?',
        a: 'Equinox is open to all college students — undergraduates and postgraduates from any discipline. Teams of 2-4 members are ideal, though solo participants can also join and find teammates during the event.',
    },
    {
        q: 'Is there a registration fee?',
        a: 'Details about registration fees will be announced soon. Keep an eye on our official channels for the latest updates.',
    },
    {
        q: 'What should I bring?',
        a: 'Bring your laptop, charger, any hardware you plan to use, and your celestial ambition. We provide the Wi-Fi, workspace, meals, and caffeine to fuel your 48-hour journey.',
    },
    {
        q: 'Can I work on a pre-existing project?',
        a: 'No. All projects must be started from scratch during the hackathon. You may come with ideas and research, but no pre-written code is allowed. The celestial clock starts fair for everyone.',
    },
    {
        q: 'How will projects be judged?',
        a: 'Projects will be evaluated on innovation, technical complexity, design quality, real-world impact, and presentation. Our panel of expert judges — the Cosmic Council — will assess each submission with care.',
    },
    {
        q: 'Will there be prizes?',
        a: 'Yes! Exciting prizes will be awarded across all tracks as well as special categories. Detailed prize information will be revealed closer to the event.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section className="faq section" id="faq">
            <div className="section-title reveal">
                <h2>Frequently Asked</h2>
                <p className="accent-text" style={{ textAlign: 'center', margin: '0 auto' }}>
                    Seek and you shall find
                </p>
            </div>

            <div className="faq__list reveal">
                {QUESTIONS.map((item, i) => (
                    <div
                        className={`faq__item${openIndex === i ? ' faq__item--open' : ''}`}
                        key={i}
                    >
                        <button className="faq__question" onClick={() => toggle(i)}>
                            <span>{item.q}</span>
                            <span className="faq__icon">{openIndex === i ? '−' : '+'}</span>
                        </button>
                        <div className="faq__answer">
                            <p>{item.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
