import { useEffect, useRef } from "react";
import './Timeline.css';

const EVENTS = [
    { time: 'Day 0 — 6:00 PM', title: 'Opening Ceremony', desc: 'The celestial gates open. Welcome address and keynote.' },
    { time: 'Day 0 — 7:30 PM', title: 'Team Formation & Ideation', desc: 'Form your constellation. Brainstorm and strategize.' },
    { time: 'Day 0 — 9:00 PM', title: 'Hacking Begins', desc: 'The cosmic clock starts. 48 hours of innovation commences.' },
    { time: 'Day 1 — 10:00 AM', title: 'Mentor Sessions', desc: 'Navigate by the guiding stars. Expert sessions and reviews.' },
    { time: 'Day 1 — 8:00 PM', title: 'Mid-Hackathon Checkpoint', desc: 'The equinox moment. Progress reviews and pivots.' },
    { time: 'Day 2 — 12:00 PM', title: 'Final Submissions', desc: 'Seal your creation under the celestial dome.' },
    { time: 'Day 2 — 3:00 PM', title: 'Demos & Judging', desc: 'Present your work to the cosmic council.' },
    { time: 'Day 2 — 6:00 PM', title: 'Closing Ceremony', desc: 'Awards, reflections, and the alignment of stars.' },
];

export default function Timeline() {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const cards = track.querySelectorAll(".timeline__item");

        // observer for line animation
        const lineObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    track.classList.add("animate-line");
                    lineObserver.unobserve(track);
                }
            },
            { threshold: 0.05 }
        );

        lineObserver.observe(track);

        // observer for cards
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.25,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        cards.forEach(card => cardObserver.observe(card));

        return () => {
            lineObserver.disconnect();
            cardObserver.disconnect();
        };
    }, []);

    return (
        <section className="timeline section" id="timeline">
            <div className="timeline__bg-vector">
                <svg viewBox="0 0 1000 1000" fill="none">
                    <ellipse cx="500" cy="500" rx="480" ry="120" transform="rotate(45 500 500)" stroke="var(--gold-line)" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.3" />
                    <ellipse cx="500" cy="500" rx="480" ry="120" transform="rotate(-45 500 500)" stroke="var(--gold-line)" strokeWidth="0.5" opacity="0.2" />
                    <circle cx="500" cy="500" r="300" stroke="var(--gold-subtle)" strokeWidth="0.5" opacity="0.1" />
                </svg>
            </div>

            <div className="section-title">
                <h2>Timeline</h2>
                <p className="accent-text" style={{ textAlign: 'center', margin: '0 auto' }}>
                    The celestial schedule
                </p>
            </div>

            <div ref={trackRef} className="timeline__track">
                <div className="timeline__line" />

                {EVENTS.map((event, i) => (
                    <div
                        className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
                        key={i}
                    >
                        <div className="timeline__node">
                            <div className="timeline__node-ring" />
                        </div>

                        <div className="timeline__card">
                            <span className="timeline__time">{event.time}</span>
                            <h3 className="timeline__event-title">{event.title}</h3>
                            <p className="timeline__event-desc">{event.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}