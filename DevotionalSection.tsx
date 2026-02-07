import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Heart, Share2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DevotionalEntry {
  date: string;
  verse: string;
  reference: string;
  translation: string;
  reflection: string;
  prayer: string;
}

const DevotionalSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const verseCardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReflection, setShowReflection] = useState(true);

  // Weekly devotional entries
  const devotionals: DevotionalEntry[] = [
    {
      date: 'Today',
      verse: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
      reference: 'Proverbs 3:5-6',
      translation: 'NIV',
      reflection: 'In the kitchen, as in life, we often try to control every outcome. But true mastery comes from surrender—trusting the process, the ingredients, and the timing. When we release our need for control and trust in divine guidance, we find clarity and purpose in every dish we create.',
      prayer: 'Lord, help me trust Your plan today. Guide my hands, my thoughts, and my decisions. May I find peace in surrendering control to You.',
    },
    {
      date: 'Yesterday',
      verse: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.',
      reference: 'Colossians 3:23',
      translation: 'NIV',
      reflection: 'Excellence is an act of worship. Every plate that leaves the pass, every ingredient prepped with care, every detail attended to—these are offerings. When we work with wholehearted devotion, we transform ordinary tasks into sacred acts.',
      prayer: 'Father, let my work today be an offering to You. Give me strength to pursue excellence in all I do.',
    },
    {
      date: '2 days ago',
      verse: 'Taste and see that the Lord is good; blessed is the one who takes refuge in him.',
      reference: 'Psalm 34:8',
      translation: 'NIV',
      reflection: 'As a chef, I understand the power of taste—it transforms, satisfies, and brings joy. God invites us to experience His goodness personally, not just intellectually. Take time today to savor His presence and find refuge in His love.',
      prayer: 'God, help me truly taste and experience Your goodness today. May I find my refuge in You.',
    },
    {
      date: '3 days ago',
      verse: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.',
      reference: 'Jeremiah 29:11',
      translation: 'NIV',
      reflection: 'In the heat of service, it is easy to lose sight of the bigger picture. God reminds us that He has a plan—one filled with hope and purpose. Even in the most challenging moments, we can trust that He is working for our good.',
      prayer: 'Lord, remind me of Your promises when I feel overwhelmed. Help me trust in Your plan for my life.',
    },
    {
      date: '4 days ago',
      verse: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary.',
      reference: 'Isaiah 40:31',
      translation: 'NIV',
      reflection: 'The long hours, the physical demands, the mental exhaustion—service takes its toll. But when we place our hope in God, He renews our strength. Like an eagle rising on thermal currents, we find energy beyond our own capacity.',
      prayer: 'Heavenly Father, renew my strength today. Help me soar above my limitations through Your power.',
    },
    {
      date: '5 days ago',
      verse: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
      reference: 'Romans 8:28',
      translation: 'NIV',
      reflection: 'Not every service goes perfectly. Mistakes happen, criticism comes, plans fall apart. But God promises to work ALL things for good—even the difficult moments. Trust that He is weaving your story into something beautiful.',
      prayer: 'Lord, help me see Your hand working in every situation today. Give me eyes of faith to trust Your purpose.',
    },
    {
      date: '6 days ago',
      verse: 'The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.',
      reference: 'Psalm 23:1-2',
      translation: 'NIV',
      reflection: 'In a world of constant motion and noise, God calls us to rest. Like a shepherd caring for his flock, He provides everything we need. Take a moment today to rest in His presence and allow Him to restore your soul.',
      prayer: 'Good Shepherd, lead me to places of rest and restoration today. Help me find peace in Your presence.',
    },
  ];

  const currentDevotional = devotionals[currentIndex];

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
        verseCardRef.current,
        { x: '55vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.06
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        verseCardRef.current,
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

  const nextDevotional = () => {
    setCurrentIndex((prev) => (prev + 1) % devotionals.length);
    setIsLiked(false);
  };

  const prevDevotional = () => {
    setCurrentIndex((prev) => (prev - 1 + devotionals.length) % devotionals.length);
    setIsLiked(false);
  };

  const shareVerse = () => {
    if (navigator.share) {
      navigator.share({
        title: `Daily Devotional - ${currentDevotional.reference}`,
        text: `${currentDevotional.verse} - ${currentDevotional.reference}`,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `${currentDevotional.verse} - ${currentDevotional.reference} (${currentDevotional.translation})`
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="devotional"
      className="section-pinned z-[45]"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/devotional_scene.jpg"
        alt="Devotional scene"
        className="bg-image"
      />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Left Card */}
      <div
        ref={cardRef}
        className="absolute left-[7vw] top-[18vh] w-[38vw] min-h-[54vh] glass-card p-8 md:p-10"
      >
        <span className="eyebrow block mb-4">DAILY DEVOTIONAL</span>
        <h2 className="font-heading font-black text-[clamp(32px,3.6vw,56px)] text-text-primary leading-[1.0] tracking-[-0.02em] mb-6">
          Verse of the Day
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-[90%]">
          Start each day with Scripture. Reflect, pray, and carry God's word into the kitchen and beyond.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://www.bible.com/verse-of-the-day"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <BookOpen size={18} />
            Open YouVersion
          </a>
          <button
            onClick={() => setShowReflection(!showReflection)}
            className="btn-secondary"
          >
            {showReflection ? 'Hide' : 'Show'} Reflection
          </button>
        </div>
      </div>

      {/* Right Verse Card */}
      <div
        ref={verseCardRef}
        className="absolute right-[7vw] top-[18vh] w-[40vw] min-h-[54vh] glass-card p-8 md:p-10 hidden lg:block"
      >
        {/* Date Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevDevotional}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-neon" />
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
              {currentDevotional.date}
            </span>
          </div>
          <button
            onClick={nextDevotional}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Scripture */}
        <div className="mb-6">
          <p className="text-text-primary text-lg md:text-xl leading-relaxed font-medium italic mb-4">
            "{currentDevotional.verse}"
          </p>
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-neon">
              {currentDevotional.reference}
            </span>
            <span className="font-mono text-xs text-text-secondary">
              {currentDevotional.translation}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isLiked
                ? 'bg-red-500/20 text-red-400'
                : 'bg-white/5 text-text-secondary hover:text-text-primary'
            }`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            <span className="text-sm">{isLiked ? 'Liked' : 'Like'}</span>
          </button>
          <button
            onClick={shareVerse}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-text-secondary hover:text-text-primary transition-all"
          >
            <Share2 size={16} />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Reflection & Prayer */}
        {showReflection && (
          <div className="space-y-4 border-t border-white/10 pt-6">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-2">
                Reflection
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed">
                {currentDevotional.reflection}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-2">
                Prayer
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed italic">
                {currentDevotional.prayer}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Verse Display */}
      <div className="absolute bottom-[10vh] left-[7vw] right-[7vw] lg:hidden">
        <div className="glass-card p-6">
          {/* Date Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevDevotional}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
              {currentDevotional.date}
            </span>
            <button
              onClick={nextDevotional}
              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Scripture */}
          <p className="text-text-primary text-base leading-relaxed italic mb-3">
            "{currentDevotional.verse}"
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="font-heading font-bold text-neon text-sm">
              {currentDevotional.reference}
            </span>
            <span className="font-mono text-[10px] text-text-secondary">
              {currentDevotional.translation}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
                isLiked
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-white/5 text-text-secondary'
              }`}
            >
              <Heart size={14} className={isLiked ? 'fill-current' : ''} />
            </button>
            <button
              onClick={shareVerse}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-text-secondary"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevotionalSection;
