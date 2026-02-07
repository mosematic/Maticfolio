import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import PortfolioSection from './sections/PortfolioSection';
import FitnessSection from './sections/FitnessSection';
import BookclubSection from './sections/BookclubSection';
import DevotionalSection from './sections/DevotionalSection';
import MarketsSection from './sections/MarketsSection';
import AboutSection from './sections/AboutSection';
import FooterSection from './sections/FooterSection';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const snapTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      snapTriggerRef.current = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      if (snapTriggerRef.current) {
        snapTriggerRef.current.kill();
      }
    };
  }, []);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-charcoal min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        {/* Section 1: Hero - z-10 */}
        <HeroSection />

        {/* Section 2: Portfolio - z-20 */}
        <PortfolioSection />

        {/* Section 3: Fitness - z-30 */}
        <FitnessSection />

        {/* Section 4: Bookclub - z-40 */}
        <BookclubSection />

        {/* Section 5: Devotional - z-45 */}
        <DevotionalSection />

        {/* Section 6: Markets - z-50 */}
        <MarketsSection />

        {/* Section 7: About/Contact - z-60 */}
        <AboutSection />

        {/* Section 8: Footer - z-70 */}
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
