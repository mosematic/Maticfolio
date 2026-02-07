import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MarketsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tickersRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  // Simulated live market data
  const [marketData, setMarketData] = useState([
    { symbol: 'BTC', name: 'Bitcoin', price: 67240, change: 2.4, positive: true },
    { symbol: 'ETH', name: 'Ethereum', price: 3520, change: 1.8, positive: true },
    { symbol: 'SPY', name: 'S&P 500 ETF', price: 585.1, change: -0.3, positive: false },
  ]);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => {
          const changePercent = (Math.random() - 0.5) * 0.5;
          const newPrice = item.price * (1 + changePercent / 100);
          const newChange = item.change + (Math.random() - 0.5) * 0.2;
          return {
            ...item,
            price: newPrice,
            change: newChange,
            positive: newChange >= 0,
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
        tickersRef.current,
        { x: '55vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.06
      );

      // Ticker rows stagger
      const tickerRows = tickersRef.current?.querySelectorAll('.ticker-row');
      if (tickerRows) {
        tickerRows.forEach((row, index) => {
          scrollTl.fromTo(
            row,
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
        tickersRef.current,
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

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <section
      ref={sectionRef}
      id="markets"
      className="section-pinned z-50"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/markets_trading.jpg"
        alt="Trading desk"
        className="bg-image"
      />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Left Card */}
      <div
        ref={cardRef}
        className="absolute left-[7vw] top-[18vh] w-[38vw] min-h-[54vh] glass-card p-8 md:p-10"
      >
        <span className="eyebrow block mb-4">MARKETS DASHBOARD</span>
        <h2 className="font-heading font-black text-[clamp(32px,3.6vw,56px)] text-text-primary leading-[1.0] tracking-[-0.02em] mb-6">
          Watchlist
        </h2>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-[90%]">
          Stocks, crypto, macro signals—tracked with the same rigor as a prep list.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-primary flex items-center gap-2">
            <BarChart3 size={18} />
            View full watchlist
          </button>
          <button className="btn-secondary">Set alerts</button>
        </div>
      </div>

      {/* Tickers Panel */}
      <div
        ref={tickersRef}
        className="absolute right-[7vw] top-[18vh] w-[34vw] min-h-[54vh] glass-card p-8 md:p-10 hidden lg:block"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-text-secondary">
            Live Prices
          </h3>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            <span className="font-mono text-[10px] text-text-secondary">LIVE</span>
          </span>
        </div>
        <div>
          {marketData.map((item, index) => (
            <div key={index} className="ticker-row">
              <div className="flex items-center gap-3">
                <span className="ticker-symbol">{item.symbol}</span>
                <span className="text-text-secondary text-sm">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="ticker-price">${formatPrice(item.price)}</span>
                <span
                  className={`ticker-change flex items-center gap-1 ${
                    item.positive ? 'positive' : 'negative'
                  }`}
                >
                  {item.positive ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {item.positive ? '+' : ''}
                  {item.change.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Tickers */}
      <div className="absolute bottom-[10vh] left-[7vw] right-[7vw] lg:hidden">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-text-secondary">
              Live Prices
            </h3>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="font-mono text-[10px] text-text-secondary">LIVE</span>
            </span>
          </div>
          <div className="space-y-3">
            {marketData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
              >
                <div>
                  <span className="block text-text-primary font-heading font-bold">
                    {item.symbol}
                  </span>
                  <span className="text-text-secondary text-xs">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="block text-text-primary font-mono">
                    ${formatPrice(item.price)}
                  </span>
                  <span
                    className={`text-xs font-mono ${
                      item.positive ? 'text-neon' : 'text-red-400'
                    }`}
                  >
                    {item.positive ? '+' : ''}
                    {item.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketsSection;
