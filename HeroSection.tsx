import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Headline
      tl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.8'
      );

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.5'
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5 },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
              opacity: 1,
              x: 0,
            });
            gsap.set(bgRef.current, { opacity: 1, scale: 1 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        [headlineRef.current, subheadlineRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.35, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/hero_chef_plating.jpg"
        alt="Chef plating"
        className="bg-image"
      />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-[7vw]">
        <h1
          ref={headlineRef}
          className="font-heading font-black text-[clamp(44px,8vw,120px)] text-text-primary uppercase leading-[0.95] tracking-[-0.02em]"
        >
          CHEF
        </h1>
        <p
          ref={subheadlineRef}
          className="mt-6 text-lg md:text-xl text-text-secondary max-w-[34vw] md:max-w-[400px] leading-relaxed"
        >
          Michelin-trained. Studio-lit. Obsessive about detail.
        </p>
        <button
          ref={ctaRef}
          onClick={scrollToPortfolio}
          className="btn-primary mt-8 w-fit"
        >
          Explore the portfolio
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
