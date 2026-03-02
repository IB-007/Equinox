import { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tracks from './components/Tracks';
import Timeline from './components/Timeline';
import Sponsor from './components/Sponsor';
import FAQ from './components/FAQ';
import RegisterForm from './components/RegisterForm';
import Footer from './components/Footer';

export default function App() {
  /* ── Scroll-based reveal observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));

    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      {/* Rendered outside the animated app div so position:fixed elements
          live in the root stacking context — not trapped by transform/opacity */}
      <CustomCursor />
      <Navbar />

      <div className="app page-enter">
        {/* Fixed subtle star texture */}
        <div className="star-overlay" />

        <Hero />

        <div className="celestial-divider" />
        <About />

        <div className="celestial-divider" />
        <Tracks />

        <div className="celestial-divider" />
        <Timeline />

        <div className="celestial-divider" />
        <Sponsor />

        <div className="celestial-divider" />
        <RegisterForm />

        <div className="celestial-divider" />
        <FAQ />

        <Footer />
      </div>
    </>
  );
}
