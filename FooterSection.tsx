import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, MapPin, BookOpen, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: MapPin, label: 'Strava', href: 'https://strava.com' },
    { icon: BookOpen, label: 'Goodreads', href: 'https://goodreads.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative bg-charcoal py-16 z-[70]"
    >
      <div ref={contentRef} className="px-[7vw]">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <h2 className="font-mono text-2xl uppercase tracking-[0.14em] text-text-primary mb-4">
            MOSEMATIC
          </h2>

          {/* Tagline */}
          <p className="text-text-secondary text-lg mb-8">
            Chef. Curator. Contrarian.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 mb-12">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-white/10 mb-8" />

          {/* Legal */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-text-secondary text-sm">
            <span>&copy; {new Date().getFullYear()} MOSEMATIC. All rights reserved.</span>
            <span className="hidden sm:block">•</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-text-primary transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
