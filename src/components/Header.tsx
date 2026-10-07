import React from 'react';

interface HeaderProps {
  theme: 'default' | 'orange' | 'mono';
  setTheme: (theme: 'default' | 'orange' | 'mono') => void;
}

export default function Header({ theme, setTheme }: HeaderProps) {
  return (
    <header className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 pt-1 border-b border-theme-border/50 mb-6 select-none relative z-20">
      
      {/* Brand Logo Group - Moved to prominent position as requested */}
      <div className="flex items-center gap-3 text-left">
        <div className="w-11 h-11 rounded-xl bg-theme-primary flex items-center justify-center border border-theme-border/20 shadow-sm transition-transform duration-300 hover:rotate-6">
          {/* Custom Brand Logo Star SVG */}
          <svg className="w-6.5 h-6.5 text-theme-primary-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <path d="M12 4v16M4 12h16" strokeLinecap="round" />
            <path d="M12 7c2 2 3 4 3 5s-1 3-3 5c-2-2-3-4-3-5s1-3 3-5z" fill="currentColor" opacity="0.4" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </div>
        
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-black tracking-tight uppercase text-theme-text font-display">
              HITHARD
            </h1>
            <span className="text-[9px] font-mono font-bold tracking-widest bg-theme-primary/10 text-theme-primary px-2 py-0.5 rounded-full border border-theme-primary/10">
              LAB v4.5
            </span>
          </div>
          <p className="text-[10px] font-semibold text-theme-muted uppercase tracking-wider leading-none mt-0.5">
            Premium Rackets & Custom Tuning
          </p>
        </div>
      </div>

      {/* Segmented Theme Switcher - Placed beautifully in the header canvas "white space" */}
      <div className="flex items-center gap-2 bg-theme-card border border-theme-border/80 rounded-2xl p-1 shadow-sm max-w-max self-start sm:self-auto">
        <span className="text-[9px] font-mono font-black text-theme-muted uppercase px-2 tracking-widest">
          THEME:
        </span>
        
        <div className="flex items-center gap-1">
          {/* Default Theme Button */}
          <button
            onClick={() => setTheme('default')}
            className={`px-3 py-1.5 text-[10px] font-black tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer ${
              theme === 'default'
                ? 'bg-theme-primary text-theme-primary-text shadow-xs'
                : 'text-theme-muted hover:text-theme-text hover:bg-theme-primary/5'
            }`}
          >
            DEFAULT
          </button>

          {/* Orange Theme Button */}
          <button
            onClick={() => setTheme('orange')}
            className={`px-3 py-1.5 text-[10px] font-black tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer ${
              theme === 'orange'
                ? 'bg-theme-primary text-theme-primary-text shadow-xs'
                : 'text-theme-muted hover:text-theme-text hover:bg-theme-primary/5'
            }`}
          >
            ORANGE
          </button>

          {/* Mono Theme Button */}
          <button
            onClick={() => setTheme('mono')}
            className={`px-3 py-1.5 text-[10px] font-black tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer ${
              theme === 'mono'
                ? 'bg-theme-primary text-theme-primary-text shadow-xs'
                : 'text-theme-muted hover:text-theme-text hover:bg-theme-primary/5'
            }`}
          >
            MONO
          </button>
        </div>
      </div>

    </header>
  );
}
