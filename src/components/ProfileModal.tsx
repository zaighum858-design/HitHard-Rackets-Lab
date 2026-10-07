import { useState, useMemo } from 'react';
import { X, Check } from 'lucide-react';

interface ProfileModalProps {
  onClose: () => void;
  playerProfile: {
    name: string;
    playStyle: string;
    hand: string;
    gripSize: string;
    surface: string;
  };
  setPlayerProfile: (profile: any) => void;
}

export default function ProfileModal({
  onClose,
  playerProfile,
  setPlayerProfile
}: ProfileModalProps) {
  const [name, setName] = useState(playerProfile.name);
  const [playStyle, setPlayStyle] = useState(playerProfile.playStyle);
  const [hand, setHand] = useState(playerProfile.hand);
  const [gripSize, setGripSize] = useState(playerProfile.gripSize);
  const [surface, setSurface] = useState(playerProfile.surface);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const stylesList = [
    { id: 'Aggressive Baseline', label: 'Aggressive Baseline (Power & Spin)' },
    { id: 'All-Court Attacker', label: 'All-Court Attacker (Touch & Volley)' },
    { id: 'Defensive Retriever', label: 'Defensive Retriever (Comfort & Depth)' }
  ];

  const gripSizesList = [
    { id: '4 1/4 (L2)', label: '4 1/4 in (Size 2 - Standard)' },
    { id: '4 3/8 (L3)', label: '4 3/8 in (Size 3 - Large)' }
  ];

  const surfacesList = [
    { id: 'Hard-Court', label: 'Acrylic Hard-Court' },
    { id: 'Clay-Court', label: 'Red Clay Court' },
    { id: 'Grass-Court', label: 'Lawn Grass Court' }
  ];

  // Clean, simplified recommendation formula
  const recommendationSummary = useMemo(() => {
    if (playStyle === 'Aggressive Baseline') {
      return {
        racket: 'Carbon-Volt Pro 100',
        tension: '55 lbs',
        string: 'Chrono-Spun Polyester',
        tip: 'Perfect for deep baseline groundstrokes with heavy top-spin.'
      };
    } else if (playStyle === 'All-Court Attacker') {
      return {
        racket: 'Hexa-Carbon Padel Elite',
        tension: '52 lbs',
        string: 'Vortex Natural Gut 16',
        tip: 'Enhances pocketing feel, touch, and reaction speed around the net.'
      };
    } else {
      return {
        racket: 'Saber Featherweight Speed',
        tension: '49 lbs',
        string: 'Vortex Natural Gut 16',
        tip: 'Excellent trampoline depth and premium joint shock protection.'
      };
    }
  }, [playStyle]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPlayerProfile({
      name,
      playStyle,
      hand,
      gripSize,
      surface
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-[100] p-4">
      <div className="bg-theme-card rounded-[24px] max-w-xl w-full border border-theme-border shadow-xl relative overflow-hidden flex flex-col max-h-[85vh] text-left animate-in fade-in zoom-in-95 duration-200">
        
        {/* Simple Close Icon */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-theme-bg border border-theme-border text-theme-text hover:bg-theme-bg/50 flex items-center justify-center transition-all cursor-pointer z-50"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Clean, Simple Header */}
        <div className="p-6 pb-2 border-b border-theme-border">
          <span className="text-[10px] font-mono font-bold text-theme-muted uppercase tracking-widest">PLAYER SPECS</span>
          <h2 className="text-xl font-bold uppercase text-theme-text font-display mt-0.5">Profile Advisory</h2>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-theme-card">
          {saveSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs py-2.5 px-4 rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Specs saved successfully! Tuning advisor updated.</span>
            </div>
          )}

          <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
            
            {/* Player Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-theme-muted uppercase">Player Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-theme-bg border border-theme-border text-sm font-semibold rounded-xl p-2.5 outline-none text-theme-text uppercase placeholder-theme-muted/50"
                required
              />
            </div>

            {/* Play Style */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-theme-muted uppercase">Preferred Play Style</label>
              <select
                value={playStyle}
                onChange={(e) => setPlayStyle(e.target.value)}
                className="w-full bg-theme-bg border border-theme-border text-sm font-semibold rounded-xl p-2.5 outline-none text-theme-text cursor-pointer"
              >
                {stylesList.map((st) => (
                  <option key={st.id} value={st.id}>{st.label}</option>
                ))}
              </select>
            </div>

            {/* Dominant Hand Selection */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              {['Right-Handed', 'Left-Handed'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setHand(item)}
                  className={`py-2 rounded-xl border text-xs font-bold uppercase transition-all cursor-pointer ${
                    hand === item
                      ? 'bg-theme-primary text-theme-primary-text border-theme-primary'
                      : 'bg-theme-bg border-theme-border text-theme-muted hover:bg-theme-bg/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Grip Size */}
            <div className="flex flex-col gap-1 mt-1">
              <label className="text-xs font-bold text-theme-muted uppercase">Grip Size</label>
              <select
                value={gripSize}
                onChange={(e) => setGripSize(e.target.value)}
                className="w-full bg-theme-bg border border-theme-border text-sm font-semibold rounded-xl p-2.5 outline-none text-theme-text cursor-pointer"
              >
                {gripSizesList.map((g) => (
                  <option key={g.id} value={g.id}>{g.label}</option>
                ))}
              </select>
            </div>

            {/* Main Court Surface */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-theme-muted uppercase">Main Court Surface</label>
              <select
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                className="w-full bg-theme-bg border border-theme-border text-sm font-semibold rounded-xl p-2.5 outline-none text-theme-text cursor-pointer"
              >
                {surfacesList.map((surf) => (
                  <option key={surf.id} value={surf.id}>{surf.label}</option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="mt-2 py-3 bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-black tracking-widest uppercase rounded-full transition-all cursor-pointer text-center shadow-md"
            >
              SAVE SPECS & ALIGN SHOP
            </button>
          </form>

          {/* Simple Clean Recommendation Panel */}
          <div className="border-t border-theme-border pt-5">
            <h3 className="text-xs font-mono font-bold text-theme-primary uppercase tracking-wide mb-3">
              RECOMMENDED CONFIGURATION
            </h3>
            
            <div className="bg-theme-bg rounded-xl p-4 border border-theme-border text-xs flex flex-col gap-2">
              <div className="flex justify-between items-center py-1 border-b border-theme-border/50">
                <span className="text-theme-muted font-medium">Optimal Frame</span>
                <span className="font-bold text-theme-text">{recommendationSummary.racket}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-theme-border/50">
                <span className="text-theme-muted font-medium">Optimal String</span>
                <span className="font-bold text-theme-text">{recommendationSummary.string}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-theme-muted font-medium">Tension</span>
                <span className="font-bold text-theme-primary">{recommendationSummary.tension}</span>
              </div>
              <p className="text-[11px] text-theme-muted leading-relaxed mt-2 italic bg-theme-card p-2.5 rounded-lg border border-theme-border/50 text-center font-medium">
                "{recommendationSummary.tip}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
