import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Download, Instagram, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );

      // Background parallax
      gsap.fromTo(
        bgRef.current,
        { y: 0 },
        {
          y: '-6vh',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[140vh] z-[60]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={bgRef}
          src="/about_portrait.jpg"
          alt="Chef portrait"
          className="w-full h-[120%] object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-[7vw] py-[18vh]">
        {/* About Content */}
        <div ref={contentRef} className="max-w-[42vw] md:max-w-[500px]">
          <span className="eyebrow block mb-4">ABOUT</span>
          <h2 className="font-heading font-black text-[clamp(28px,3vw,48px)] text-text-primary leading-[1.05] tracking-[-0.02em] mb-6">
            I cook. I track. I read the footnotes.
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8">
            Based between kitchens and screens. Open to collaborations, guest menus, and strange ideas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="btn-primary flex items-center gap-2">
              <Send size={18} />
              Send a message
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Download size={18} />
              Download CV
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <Instagram size={20} />
              <span className="font-mono text-xs uppercase tracking-wider">Instagram</span>
            </a>
            <a
              href="https://strava.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <MapPin size={20} />
              <span className="font-mono text-xs uppercase tracking-wider">Strava</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div
          ref={formRef}
          className="mt-16 max-w-[42vw] md:max-w-[500px] glass-card p-8 md:p-10"
        >
          <h3 className="font-heading font-bold text-xl text-text-primary mb-6">
            Get in touch
          </h3>
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-neon/20 flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-neon" />
              </div>
              <p className="text-text-primary font-medium">Message sent!</p>
              <p className="text-text-secondary text-sm">I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input min-h-[120px] resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send size={18} />
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
