import { Home, ShoppingBag, Heart, User, Sparkles, Hammer } from 'lucide-react';

interface SidebarProps {
  theme: 'default' | 'orange' | 'mono';
  currentView: 'home' | 'catalog' | 'lab' | 'favorites';
  setView: (view: 'home' | 'catalog' | 'lab' | 'favorites') => void;
  cartCount: number;
  openCart: () => void;
  openProfile: () => void;
  onGetNewArrival: () => void;
}

export default function Sidebar({
  theme,
  currentView,
  setView,
  cartCount,
  openCart,
  openProfile,
  onGetNewArrival
}: SidebarProps) {

  // Dynamically calculate icon/button color schemes to ensure perfect contrast against the black sidebar
  const getButtonClass = (view: 'home' | 'catalog' | 'lab' | 'favorites') => {
    const isActive = currentView === view;
    
    if (theme === 'mono') {
      return isActive
        ? 'bg-white text-black shadow-md scale-105'
        : 'text-zinc-500 hover:text-white hover:bg-white/10';
    }
    
    if (theme === 'orange') {
      return isActive
        ? 'bg-[#EA580C] text-[#09090B] shadow-md shadow-[#EA580C]/20 scale-105 font-black'
        : 'text-zinc-500 hover:text-[#EA580C] hover:bg-white/10';
    }
    
    // Default theme
    return isActive
      ? 'bg-[#253F36] text-[#AEEB99] shadow-md shadow-[#253F36]/20 scale-105'
      : 'text-[#5C7166] hover:text-[#AEEB99] hover:bg-white/10';
  };

  const logoColorClass = () => {
    if (theme === 'mono') return 'text-white border-white/20';
    if (theme === 'orange') return 'text-[#EA580C] border-[#EA580C]/20';
    return 'text-[#AEEB99] border-[#3E5C4E]';
  };

  const cartBadgeClass = () => {
    if (theme === 'mono') return 'bg-white text-black ring-black';
    if (theme === 'orange') return 'bg-[#EA580C] text-black ring-[#EA580C]';
    return 'bg-theme-accent text-theme-dark ring-theme-sidebar';
  };

  return (
    <aside className="w-24 shrink-0 flex flex-col items-center gap-6 py-6 h-[calc(100vh-2rem)] sticky top-4 select-none z-30">
      
      {/* Main Navigation Pill - ALWAYS styled dark black/charcoal to fit premium boutique sports aesthetic */}
      <div className="w-full bg-[#111613] rounded-[40px] py-8 px-2 flex flex-col items-center flex-1 justify-between shadow-lg border border-white/5">
        
        {/* Top: Custom Brand Logo (Cross star in a circle from mockup) */}
        <div className="relative group cursor-pointer" onClick={() => setView('home')}>
          <div className={`w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border hover:bg-white/10 transition-all duration-300 ${logoColorClass()}`}>
            <svg className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
              <path d="M12 4v16M4 12h16" strokeLinecap="round" />
              <path d="M12 7c2 2 3 4 3 5s-1 3-3 5c-2-2-3-4-3-5s1-3 3-5z" fill="currentColor" opacity="0.3" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span className="absolute left-17 top-3 bg-theme-accent text-theme-dark text-[11px] font-black px-3.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-theme-accent/40 z-50 uppercase tracking-wider">
            Home Dashboard
          </span>
        </div>

        {/* Center: Main Icon List */}
        <nav className="flex flex-col gap-6 items-center w-full">
          {/* Home Tab */}
          <button
            onClick={() => setView('home')}
            aria-label="Home Dashboard"
            className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${getButtonClass('home')}`}
          >
            <Home className="w-5.5 h-5.5" />
            <span className="absolute left-17 bg-theme-accent text-theme-dark text-[11px] font-black px-3.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-theme-accent/40 z-50 uppercase tracking-wider">
              Home
            </span>
          </button>

          {/* Catalog / Racket List Tab */}
          <button
            onClick={() => setView('catalog')}
            aria-label="Product Catalog"
            className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${getButtonClass('catalog')}`}
          >
            <Sparkles className="w-5.5 h-5.5" />
            <span className="absolute left-17 bg-theme-accent text-theme-dark text-[11px] font-black px-3.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-theme-accent/40 z-50 uppercase tracking-wider">
              Racket & Gear Catalog
            </span>
          </button>

          {/* Custom Lab Tab */}
          <button
            onClick={() => setView('lab')}
            aria-label="Custom Tuning Lab"
            className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${getButtonClass('lab')}`}
          >
            <Hammer className="w-5.5 h-5.5" />
            <span className="absolute left-17 bg-theme-accent text-theme-dark text-[11px] font-black px-3.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-theme-accent/40 z-50 uppercase tracking-wider">
              Custom Racket Lab
            </span>
          </button>

          {/* Favorites Tab */}
          <button
            onClick={() => setView('favorites')}
            aria-label="Saved Favorites"
            className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${getButtonClass('favorites')}`}
          >
            <Heart className="w-5.5 h-5.5" />
            <span className="absolute left-17 bg-theme-accent text-[#111613] text-[11px] font-black px-3.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-theme-accent/40 z-50 uppercase tracking-wider">
              Favorites
            </span>
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={openCart}
            aria-label="Open Shopping Cart"
            className="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 text-zinc-500 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className={`absolute -top-1.5 -right-1.5 font-mono font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 animate-bounce ${cartBadgeClass()}`}>
                  {cartCount}
                </span>
              )}
            </div>
            <span className="absolute left-17 bg-theme-accent text-[#111613] text-[11px] font-black px-3.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-theme-accent/40 z-50 uppercase tracking-wider">
              Shopping Cart
            </span>
          </button>
        </nav>

        {/* Bottom: Player Profile Avatar Trigger (from mockup) */}
        <div className="relative group cursor-pointer" onClick={openProfile}>
          <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-white/10 hover:border-white transition-colors duration-300 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
              alt="Player Profile Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Fallback avatar */}
            <div className="w-full h-full bg-white/15 flex items-center justify-center text-white font-bold text-sm">
              PL
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#111613] shadow-sm"></div>
          <span className="absolute left-17 bottom-2 bg-theme-accent text-[#111613] text-[11px] font-black px-3.5 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl border border-theme-accent/40 z-50 uppercase tracking-wider">
            Player Tuning Specs
          </span>
        </div>
      </div>

      {/* Mini "NEW ARRIVALS" vertical capsule on sidebar */}
      <div className="w-full bg-[#1C221E] rounded-[24px] p-2 flex flex-col items-center gap-2 border border-white/5 shadow-md">
        <div className="text-[9px] tracking-widest font-black text-zinc-400 uppercase text-center mt-1 leading-none select-none">
          NEW
        </div>
        
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center p-1.5 shadow-inner group cursor-pointer relative overflow-hidden animate-pulse" onClick={onGetNewArrival}>
          <svg className="w-6 h-6 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L4 10l8 8 8-8-8-8z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18v4M10 22h4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <button 
          onClick={onGetNewArrival}
          className="w-full bg-white/10 hover:bg-white text-white hover:text-black text-[9px] font-black tracking-tight py-1.5 px-0.5 rounded-[12px] uppercase text-center transition-all duration-300 cursor-pointer"
        >
          GET NOW
        </button>
      </div>
    </aside>
  );
}
