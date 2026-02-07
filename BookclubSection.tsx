import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BookclubSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bookstackRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const bookImages = [
    { src: '/book_stack_01.jpg', angle: 12, top: '0%' },
    { src: '/book_stack_02.jpg', angle: -2, top: '25%' },
    { src: '/book_stack_03.jpg', angle: -14, top: '50%' },
  ];

  const weeklyBooks = [
    { title: 'Architectonic Futures', author: 'Lara Chen', category: 'Design' },
    { title: 'The Artful Kitchen', author: 'Chef Anna Pascal', category: 'Culinary' },
    { title: 'Strategy Unleashed', author: 'Various', category: 'Business' },
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
      scrollTl.fromTo(
        cardRef.current,
        { x: '-55vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Book stack cards enter from right
      const bookCards = bookstackRef.current?.querySelectorAll('.book-card');
      if (bookCards) {
        bookCards.forEach((card, index) => {
          const baseAngle = bookImages[index].angle;
          scrollTl.fromTo(
            card,
            { x: '60vw', opacity: 0, rotation: baseAngle + 18 },
            { x: 0, opacity: 1, rotation: baseAngle, ease: 'none' },
            0.05 + index * 0.03
          );
        });
      }

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (bookCards) {
        bookCards.forEach((card) => {
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
      id="books"
      className="section-pinned z-40"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/reading_scene.jpg"
        alt="Reading scene"
        className="bg-image"
      />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Left Card */}
      <div
        ref={cardRef}
        className="absolute left-[7vw] top-[18vh] w-[38vw] min-h-[54vh] glass-card p-8 md:p-10"
      >
        <span className="eyebrow block mb-4">BOOK CLUB</span>
        <h2 className="font-heading font-black text-[clamp(32px,3.6vw,56px)] text-text-primary leading-[1.0] tracking-[-0.02em] mb-6">
          Now reading
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-[90%]">
          A weekly shelf—design, systems, and the occasional novel that tastes like dessert.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-primary flex items-center gap-2">
            <BookOpen size={18} />
            See this week's list
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <ExternalLink size={16} />
            Suggest a title
          </button>
        </div>
      </div>

      {/* Book Stack */}
      <div
        ref={bookstackRef}
        className="absolute right-[10vw] top-[22vh] w-[22vw] h-[60vh] hidden lg:block"
      >
        {bookImages.map((img, index) => (
          <div
            key={index}
            className="book-card filmstrip-card"
            style={{
              transform: `rotate(${img.angle}deg)`,
              top: img.top,
              zIndex: 3 - index,
            }}
          >
            <img src={img.src} alt={`Book ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Mobile Book List */}
      <div className="absolute bottom-[10vh] left-[7vw] right-[7vw] lg:hidden">
        <div className="glass-card p-6">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-text-secondary mb-4">
            This Week's Shelf
          </h3>
          <div className="space-y-3">
            {weeklyBooks.map((book, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
              >
                <div>
                  <span className="block text-text-primary font-medium text-sm">
                    {book.title}
                  </span>
                  <span className="text-text-secondary text-xs">{book.author}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-neon px-2 py-1 bg-neon/10 rounded">
                  {book.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookclubSection;
