import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Dumbbell, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FitnessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const stats = [
    { label: 'Weekly distance', value: '42.6 km', icon: Activity, accent: false },
    { label: 'Lift volume', value: '18,400 kg', icon: Dumbbell, accent: true },
    { label: 'Active days', value: '5 / 7', icon: Calendar, accent: false },
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

      scrollTl.fromTo(
        statsRef.current,
        { x: '55vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.06
      );

      // Stats values stagger
      const statValues = statsRef.current?.querySelectorAll('.stat-row');
      if (statValues) {
        statValues.forEach((stat, index) => {
          scrollTl.fromTo(
            stat,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.14 + index * 0.04
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

      scrollTl.fromTo(
        statsRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

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
      id="fitness"
      className="section-pinned z-30"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/fitness_gym.jpg"
        alt="Fitness training"
        className="bg-image"
      />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Left Card */}
      <div
        ref={cardRef}
        className="absolute left-[7vw] top-[18vh] w-[38vw] min-h-[54vh] glass-card p-8 md:p-10"
      >
        <span className="eyebrow block mb-4">FITNESS DASHBOARD</span>
        <h2 className="font-heading font-black text-[clamp(32px,3.6vw,56px)] text-text-primary leading-[1.0] tracking-[-0.02em] mb-6">
          Train with data
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-[90%]">
          Weekly mileage, lift progress, recovery trends—tracked and tuned like a menu.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-primary flex items-center gap-2">
            <Activity size={18} />
            Connect Strava
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-white/20" />
            Google Fit
          </button>
        </div>
      </div>

      {/* Stats Panel */}
      <div
        ref={statsRef}
        className="absolute right-[7vw] top-[18vh] w-[34vw] min-h-[54vh] glass-card p-8 md:p-10 hidden lg:block"
      >
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-text-secondary mb-8">
          This Week
        </h3>
        <div className="space-y-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-row flex items-center justify-between py-4 border-b border-white/10 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <stat.icon size={20} className="text-text-secondary" />
                </div>
                <span className="stat-label">{stat.label}</span>
              </div>
              <span
                className={`stat-value ${
                  stat.accent ? 'text-neon' : 'text-text-primary'
                }`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="absolute bottom-[10vh] left-[7vw] right-[7vw] lg:hidden">
        <div className="glass-card p-6">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-2">
                  <stat.icon size={16} className="text-text-secondary" />
                </div>
                <span
                  className={`block font-heading font-bold text-lg ${
                    stat.accent ? 'text-neon' : 'text-text-primary'
                  }`}
                >
                  {stat.value}
                </span>
                <span className="stat-label text-[10px]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessSection;
