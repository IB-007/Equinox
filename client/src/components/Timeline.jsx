import { useEffect, useRef } from "react";
import './Timeline.css';

const EVENTS = [
    /* ── Pre-event ── */
    { time: 'Before April 1', title: 'Online Screening (Review 0)', desc: '~150 teams shortlisted via Google Forms for on-site participation.' },

    /* ── Day 1 — April 1, Wednesday ── */
    { time: 'Apr 1 · 08:00 – 10:00 AM', title: 'Check-in & Registration', desc: 'Participants arrive at Anna Auditorium and collect their event kits.' },
    { time: 'Apr 1 · 10:00 – 11:00 AM', title: 'Inauguration', desc: 'Welcome address, Panasonic Roma introduction, and ceremonial lamp lighting.' },
    { time: 'Apr 1 · 11:00 AM', title: 'Hack Commences', desc: '72 hours of ideation, engineering, and innovation — the build phase begins.' },
    { time: 'Apr 1 · 05:30 – 07:30 PM', title: 'Review 1', desc: 'Organizer-led progress evaluation; underperforming teams are eliminated.' },

    /* ── Day 2 — April 2, Thursday ── */
    { time: 'Apr 2 · 10:00 AM – 12:00 PM', title: 'Review 2', desc: 'Faculty assesses architecture, technical feasibility, and problem-solution fit.' },
    { time: 'Apr 2 · 05:00 – 06:00 PM', title: 'Speaker Session', desc: 'Industry expert shares perspectives on smart infrastructure and emerging tech.' },

    /* ── Day 3 — April 3, Friday ── */
    { time: 'Apr 3 · 10:00 AM – 12:00 PM', title: 'Review 3 & Code Freeze', desc: 'Submissions locked; judges shortlist the top teams for final stage.' },
    { time: 'Apr 3 · 02:15 – 06:00 PM', title: 'Final Pitches', desc: 'Finalists present and defend their solutions before the judging panel.' },
    { time: 'Apr 3 · 06:30 – 07:15 PM', title: 'Prize Distribution & Closing Ceremony', desc: 'Winners announced, prizes awarded, and Equinox \'26 concludes.' },
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