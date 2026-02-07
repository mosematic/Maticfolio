import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const filmstripImages = [
    { src: '/portfolio_filmstrip_01.jpg', angle: -12, top: '0%' },
    { src: '/portfolio_filmstrip_02.jpg', angle: 2, top: '25%' },
    { src: '/portfolio_filmstrip_03.jpg', angle: 14, top: '50%' },
  ];

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
        },
      });

      // ENTRANCE (0% - 30%)
      // Left card enters from left
      scrollTl.fromTo(
        cardRef.current,
        { x: '-55vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Filmstrip cards enter from right with stagger
      const filmstripCards = filmstripRef.current?.querySelectorAll('.filmstrip-card');
      if (filmstripCards) {
        filmstripCards.forEach((card, index) => {
          const baseAngle = filmstripImages[index].angle;
          scrollTl.fromTo(
            card,
            { x: '60vw', opacity: 0, rotation: baseAngle + 18 },
            { x: 0, opacity: 1, rotation: baseAngle, ease: 'none' },
            0.05 + index * 0.03
          );
        });
      }

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (filmstripCards) {
        filmstripCards.forEach((card) => {
          scrollTl.fromTo(
            card,
            { x: 0, opacity: 1 },
            { x: '18vw', opacity: 0, ease: 'power2.in' },
            0.7
          );
        });
      }

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.05, opacity: 0.35, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/portfolio_kitchen_action.jpg"
        alt="Kitchen action"
        className="bg-image"
      />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Left Card */}
      <div
        ref={cardRef}
        className="absolute left-[7vw] top-[18vh] w-[38vw] min-h-[54vh] glass-card p-8 md:p-10"
      >
        <span className="eyebrow block mb-4">CULINARY PORTFOLIO</span>
        <h2 className="font-heading font-black text-[clamp(32px,3.6vw,56px)] text-text-primary leading-[1.0] tracking-[-0.02em] mb-6">
          Selected work
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-[90%]">
          A tight edit of plates, prep, and process—shot like campaigns, cooked like service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-primary">View projects</button>
          <button className="btn-secondary">Browse by cuisine</button>
        </div>
      </div>

      {/* Filmstrip Stack */}
      <div
        ref={filmstripRef}
        className="absolute right-[10vw] top-[22vh] w-[22vw] h-[60vh] hidden lg:block"
      >
        {filmstripImages.map((img, index) => (
          <div
            key={index}
            className="filmstrip-card"
            style={{
              transform: `rotate(${img.angle}deg)`,
              top: img.top,
              zIndex: 3 - index,
            }}
          >
            <img src={img.src} alt={`Portfolio ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Mobile Filmstrip - Horizontal scroll */}
      <div className="absolute bottom-[10vh] left-[7vw] right-[7vw] lg:hidden">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {filmstripImages.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[60vw] h-[25vh] rounded-card overflow-hidden shadow-card"
            >
              <img
                src={img.src}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
