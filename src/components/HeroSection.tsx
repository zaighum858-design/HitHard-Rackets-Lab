import { Search, SlidersHorizontal, Instagram, ArrowUpRight, Flame, Trophy, Percent } from 'lucide-react';
import { useState, useMemo } from 'react';

interface HeroSectionProps {
  theme: 'default' | 'orange' | 'mono';
  onSearchSubmit: (query: string) => void;
  onNavigateToCatalog: (category?: string) => void;
  onApplyPromoCode: (code: string) => void;
  onOpenFilterDrawer: () => void;
}

export default function HeroSection({
  theme,
  onSearchSubmit,
  onNavigateToCatalog,
  onApplyPromoCode,
  onOpenFilterDrawer
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onSearchSubmit(searchQuery);
    }
  };

  const triggerSearch = () => {
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
    }
  };

  const handleClaimPromo = () => {
    onApplyPromoCode('40OFF');
    onNavigateToCatalog('rackets');
  };

  // Dynamically select simple graphics based on selected theme
  const heroImage = useMemo(() => {
    if (theme === 'orange') return "/src/assets/images/hero_racket_orange_graphic_1791386196227.jpg";
    if (theme === 'mono') return "/src/assets/images/hero_racket_mono_graphic_1791386219401.jpg";
    return "/src/assets/images/hero_racket_simple_graphic_1791382648876.jpg";
  }, [theme]);

  const promoImage = useMemo(() => {
    if (theme === 'orange') return "/src/assets/images/promo_racket_orange_graphic_1791386209811.jpg";
    if (theme === 'mono') return "/src/assets/images/promo_racket_mono_graphic_1791386230568.jpg";
    return "/src/assets/images/promo_racket_simple_graphic_1791382668655.jpg";
  }, [theme]);

  return (
    <section className="flex-1 flex flex-col gap-6 select-none h-[calc(100vh-2rem)] overflow-y-auto pr-2">
      {/* Top Banner (Slim & Muted, Section 2.C Rule) */}
      <div className="bg-theme-sidebar text-theme-bg text-xs font-semibold py-2.5 px-6 rounded-[16px] flex items-center justify-between border border-theme-border/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-theme-accent animate-ping"></span>
          <span className="text-theme-accent font-mono tracking-wide uppercase">Tuning Lab Active</span>
          <span className="text-theme-muted">·</span>
          <span>Order today for free express delivery on orders over $50</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-theme-accent">
          <span>CODE: <strong className="underline decoration-dotted font-bold">40OFF</strong> (40% OFF RACKETS)</span>
        </div>
      </div>

      {/* Main Grid matching the uploaded design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
        
        {/* Left Primary Hero Container (lg:col-span-8) - Sage Green Panel */}
        <div className="lg:col-span-8 bg-theme-primary rounded-[36px] p-8 flex flex-col justify-between relative overflow-hidden min-h-[480px] shadow-lg border border-theme-border/20 group">
          
          {/* Background Illustration Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

          {/* Top Controls Bar inside the teal panel */}
          <div className="flex items-center justify-between w-full relative z-10 gap-4">
            
            {/* Instagram Social Handler Badge */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 text-theme-bg hover:text-theme-accent transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-theme-dark/25 flex items-center justify-center border border-theme-border/20 backdrop-blur-md">
                <Instagram className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-semibold tracking-tight hidden sm:inline">@hithard_rackets</span>
            </a>

            {/* Search Input and Filter button Group */}
            <div className="flex items-center gap-2 max-w-md w-full sm:w-auto">
              {/* Search Capsule */}
              <div className="flex-1 sm:w-64 flex items-center gap-2 bg-theme-dark/35 border border-theme-border/10 rounded-full px-4.5 py-2.5 backdrop-blur-md focus-within:border-theme-accent/50 focus-within:ring-1 focus-within:ring-theme-accent/30 transition-all">
                <input
                  type="text"
                  placeholder="SEARCH ACCESSORIES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyPress}
                  className="bg-transparent border-none outline-none text-white text-xs font-semibold placeholder-theme-muted/50 w-full uppercase tracking-wider"
                />
                <button 
                  onClick={triggerSearch}
                  aria-label="Submit search"
                  className="text-theme-muted hover:text-theme-accent transition-colors"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Advanced Filter Adjustments Button */}
              <button 
                onClick={onOpenFilterDrawer}
                aria-label="Open filter options"
                className="w-11.5 h-11.5 rounded-full bg-theme-dark/35 border border-theme-border/10 text-theme-bg hover:text-theme-accent hover:bg-theme-dark/55 flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer shrink-0"
              >
                <SlidersHorizontal className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end relative z-10 flex-1 mt-6">
            
            {/* Standing Manga Tennis Player (Left) */}
            <div className="sm:col-span-5 h-full flex items-end relative min-h-[300px] sm:min-h-0">
              <div className="absolute inset-0 bottom-0 flex items-end justify-center">
                {/* Visual Glow behind character */}
                <div className="absolute w-44 h-44 rounded-full bg-theme-accent/20 blur-3xl -bottom-8 pointer-events-none"></div>
                
                <img
                  src={heroImage}
                  alt="HitHard Custom Athlete"
                  className="h-[105%] max-h-[380px] sm:max-h-[420px] object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:scale-103 select-none rounded-[24px]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Fallback stylized block if image is not loaded */}
                <div className="hidden absolute bottom-0 inset-x-0 h-72 bg-gradient-to-t from-black/20 to-transparent rounded-2xl flex items-center justify-center">
                  <span className="text-theme-accent font-black tracking-widest text-[11px] uppercase">ATHLETE AVATAR</span>
                </div>
              </div>
            </div>

            {/* Campaign Giant Text (Center / Right) */}
            <div className="sm:col-span-7 flex flex-col justify-center pb-6 pl-0 sm:pl-4 text-left">
              <h1 className="text-white text-[56px] sm:text-[76px] lg:text-[88px] font-black leading-[0.85] tracking-tighter uppercase font-display select-none">
                HIT <span className="text-theme-accent">HARD</span><br />
                WIN <span className="text-theme-bg">BIG</span>
              </h1>
              
              <p className="mt-5 text-theme-bg/80 text-base font-medium leading-relaxed max-w-sm">
                Uncompromising engineering for racket sports. Explore precision strings, specialized micro-grip rolls, and customized performance tuning packages.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button 
                  onClick={() => onNavigateToCatalog()}
                  className="px-6 py-3.5 bg-theme-accent hover:bg-theme-accent/90 text-theme-dark text-sm font-black tracking-widest uppercase rounded-full flex items-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
                >
                  EXPLORE SHOP
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onNavigateToCatalog('strings')}
                  className="px-5 py-3.5 bg-theme-dark/40 hover:bg-theme-dark/60 text-white border border-theme-border/10 text-sm font-black tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer"
                >
                  CUSTOM STRINGS
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Bento Promo & Fast Links (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
          
          {/* Black Promo Card (40% OFF ON RACKET from mockup) */}
          <div className="bg-theme-sidebar rounded-[32px] p-6.5 flex flex-col justify-between relative overflow-hidden flex-1 min-h-[220px] border border-theme-border/30 shadow-lg group/promo">
            
            {/* Background Accent Grid / Glow */}
            <div className="absolute w-32 h-32 rounded-full bg-theme-accent/10 blur-3xl -top-10 -right-10 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-1 text-left">
              <div className="flex items-center gap-1.5 text-theme-accent font-mono text-xs uppercase font-bold tracking-widest">
                <Percent className="w-3.5 h-3.5" />
                <span>LIMITED RUN OFFER</span>
              </div>
              
              <h2 className="text-theme-bg text-4xl font-black leading-tight tracking-tight uppercase font-display mt-2">
                40% OFF<br />
                ON RACKET
              </h2>
              
              <p className="text-theme-muted text-sm font-medium max-w-[190px] mt-2 leading-relaxed">
                Get up to 40% discount on professional base frames when configuring your custom setup.
              </p>
            </div>

            {/* Shop Now Button */}
            <div className="relative z-10 mt-6 text-left">
              <button 
                onClick={handleClaimPromo}
                className="px-5 py-2.5 bg-theme-primary hover:bg-theme-primary-hover text-theme-accent hover:text-theme-bg text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer border border-theme-border/20"
              >
                SHOP NOW
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dynamic Running Athlete Manga Illustration (Right side of card) */}
            <div className="absolute right-[-15px] bottom-[-10px] w-[50%] h-[110%] flex items-end pointer-events-none select-none">
              <img
                src={promoImage}
                alt="HitHard Athlete In Action"
                className="w-full h-full object-contain object-right-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover/promo:scale-105 rounded-[20px]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Bottom Customizer Spotlight Quick Link Card */}
          <div className="bg-theme-primary/10 rounded-[32px] p-6 flex flex-col justify-between border border-theme-border/30 shadow-md group/spot">
            <div className="flex items-center justify-between w-full">
              <span className="w-10 h-10 rounded-full bg-theme-sidebar flex items-center justify-center text-theme-accent border border-theme-border/20 shadow-inner font-mono text-sm font-bold">
                LAB
              </span>
              <div className="flex items-center gap-1 bg-theme-sidebar px-2.5 py-1 rounded-full border border-theme-border/20">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                <span className="text-[10px] font-mono text-theme-accent font-bold uppercase">HOT SPOT</span>
              </div>
            </div>

            <div className="mt-4 text-left">
              <h3 className="text-theme-text text-lg font-bold uppercase tracking-tight font-display">
                Interactive Customizer
              </h3>
              <p className="text-theme-muted text-xs mt-1">
                Tune string tension, choose premium gut gauges, customize dampener weights, and view realtime power-spin analysis metrics!
              </p>
            </div>

            <button 
              onClick={() => onNavigateToCatalog()}
              className="mt-4.5 w-full bg-theme-sidebar hover:bg-theme-sidebar/95 border border-theme-border text-theme-accent hover:text-theme-bg py-2 px-4 rounded-[16px] text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              LAUNCH TUNING DECK
              <Trophy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
