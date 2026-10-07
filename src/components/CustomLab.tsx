import { useState, useMemo } from 'react';
import { Product, PRODUCTS } from '../data/products';

interface CustomLabProps {
  onAddCustomBundleToCart: (bundle: {
    id: string;
    name: string;
    price: number;
    baseRacket: Product;
    stringModel: Product;
    tension: number;
    gripColor: string;
    gripStyle: string;
    specs: {
      power: number;
      control: number;
      spin: number;
      comfort: number;
    };
  }) => void;
}

export default function CustomLab({ onAddCustomBundleToCart }: CustomLabProps) {
  // Filter products
  const racketsList = useMemo(() => PRODUCTS.filter(p => p.category === 'rackets'), []);
  const stringsList = useMemo(() => PRODUCTS.filter(p => p.category === 'strings'), []);

  // Customized setups states
  const [selectedRacketId, setSelectedRacketId] = useState(racketsList[0]?.id || '');
  const [selectedStringId, setSelectedStringId] = useState(stringsList[0]?.id || '');
  const [tension, setTension] = useState(55); // tension in lbs
  const [gripColor, setGripColor] = useState('#253F36'); // default forest green
  const [gripStyle, setGripStyle] = useState('Ribbed');

  const selectedRacket = useMemo(() => 
    racketsList.find(r => r.id === selectedRacketId) || racketsList[0],
    [selectedRacketId, racketsList]
  );

  const selectedString = useMemo(() => 
    stringsList.find(s => s.id === selectedStringId) || stringsList[0],
    [selectedStringId, stringsList]
  );

  // Simple overgrip roll colors
  const gripColors = [
    { name: 'Forest Teal', hex: '#253F36' },
    { name: 'Ivory Cream', hex: '#F0EFEA' },
    { name: 'Charcoal Black', hex: '#1C2420' },
    { name: 'Volt Citrus', hex: '#A3E635' }
  ];

  // Calculated specs math
  const stats = useMemo(() => {
    let powerBase = selectedRacketId === 'racket-volt' ? 85 : selectedRacketId === 'racket-saber' ? 74 : 80;
    let controlBase = selectedRacketId === 'racket-volt' ? 75 : selectedRacketId === 'racket-saber' ? 85 : 86;
    let spinBase = selectedRacketId === 'racket-volt' ? 78 : selectedRacketId === 'racket-saber' ? 72 : 82;
    let comfortBase = selectedRacketId === 'racket-volt' ? 70 : selectedRacketId === 'racket-saber' ? 84 : 78;

    if (selectedStringId === 'string-chrono') {
      spinBase += 8;
      controlBase += 4;
      comfortBase -= 6;
    } else if (selectedStringId === 'string-vortex') {
      comfortBase += 10;
      powerBase += 5;
    }

    const tensionDelta = tension - 55;
    return {
      power: Math.min(100, Math.max(30, Math.round(powerBase - tensionDelta * 1.2))),
      control: Math.min(100, Math.max(30, Math.round(controlBase + tensionDelta * 1.5))),
      spin: Math.min(100, Math.max(30, Math.round(spinBase + tensionDelta * 0.6))),
      comfort: Math.min(100, Math.max(30, Math.round(comfortBase - tensionDelta * 1.0)))
    };
  }, [selectedRacketId, selectedStringId, tension]);

  // Assembly prices
  const laborFee = 15.00;
  const totalPrice = useMemo(() => {
    return selectedRacket.price + selectedString.price + 10.00 + laborFee;
  }, [selectedRacket, selectedString]);

  // Tension advisory
  const simpleAdvice = useMemo(() => {
    if (tension < 51) return "Low Tension: Generates higher trampoline effect for deep power and maximum arm comfort.";
    if (tension <= 57) return "Balanced Tension: The professional sweet spot for standard all-court control and feel.";
    return "High Tension: Extremely stiff string bed for maximum directional control and heavy slice bite.";
  }, [tension]);

  const handleAssembleAndBuy = () => {
    const gripColorObj = gripColors.find(c => c.hex === gripColor) || gripColors[0];
    onAddCustomBundleToCart({
      id: `custom-bundle-${Date.now()}`,
      name: `Lab Tuned Base Frame (${selectedRacket.name})`,
      price: totalPrice,
      baseRacket: selectedRacket,
      stringModel: selectedString,
      tension: tension,
      gripColor: gripColorObj.name,
      gripStyle: gripStyle,
      specs: stats
    });
  };

  return (
    <section className="flex-1 flex flex-col gap-6 h-[calc(100vh-2rem)] overflow-y-auto pr-2 select-none text-left">
      
      {/* Title */}
      <div className="border-b border-theme-border pb-3 flex items-end justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold text-theme-muted uppercase tracking-widest">TUNING LAB DECK</span>
          <h2 className="text-2xl font-bold uppercase text-theme-text font-display mt-0.5">Customizer Deck</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 items-start">
        
        {/* Left Column: Interactive Vector Racket Visual HUD */}
        <div className="lg:col-span-4 bg-theme-sidebar rounded-[24px] p-5 flex flex-col justify-between items-center relative overflow-hidden min-h-[460px] shadow-sm border border-theme-border/20">
          
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          {/* Clean Status HUD */}
          <div className="w-full flex items-center justify-between text-[9px] font-mono text-zinc-400 border-b border-theme-border/20 pb-2">
            <span>RACKET_MOCK_v4.5</span>
            <span className="text-theme-accent font-bold">STATUS: ACTIVE</span>
          </div>

          {/* Minimalist Racket SVG */}
          <div className="relative w-full h-64 flex items-center justify-center my-4">
            <svg className="h-full w-auto drop-shadow-md" viewBox="0 0 100 240" fill="none">
              
              {/* String Lines */}
              <g stroke={selectedStringId === 'string-chrono' ? '#22C55E' : '#EAB308'} strokeWidth="0.8" opacity="0.8">
                <line x1="38" y1="35" x2="62" y2="35" />
                <line x1="34" y1="45" x2="66" y2="45" />
                <line x1="32" y1="55" x2="68" y2="55" />
                <line x1="30" y1="65" x2="70" y2="65" />
                <line x1="30" y1="75" x2="70" y2="75" />
                <line x1="31" y1="85" x2="69" y2="85" />
                <line x1="33" y1="95" x2="67" y2="95" />
                
                <line x1="40" y1="35" x2="40" y2="105" />
                <line x1="45" y1="32" x2="45" y2="108" />
                <line x1="50" y1="30" x2="50" y2="110" />
                <line x1="55" y1="32" x2="55" y2="108" />
                <line x1="60" y1="35" x2="60" y2="105" />
              </g>

              {/* Racket Frame */}
              <path
                d="M50 20 C22 20 22 110 50 110 C78 110 78 20 50 20 Z"
                stroke={selectedRacketId === 'racket-volt' ? '#EA580C' : '#3B82F6'}
                strokeWidth="4"
                fill="none"
              />

              {/* Throat */}
              <line x1="38" y1="98" x2="47" y2="135" stroke="#333333" strokeWidth="4" />
              <line x1="62" y1="98" x2="53" y2="135" stroke="#333333" strokeWidth="4" />

              {/* Center Shaft */}
              <line x1="50" y1="135" x2="50" y2="180" stroke="#333333" strokeWidth="5" />

              {/* Handle with selected gripColor */}
              <rect x="46" y="180" width="8" height="42" rx="1" fill={gripColor} stroke="#222222" strokeWidth="2" />
              <line x1="46" y1="190" x2="54" y2="192" stroke="#111111" strokeWidth="0.5" opacity="0.3" />
              <line x1="46" y1="200" x2="54" y2="202" stroke="#111111" strokeWidth="0.5" opacity="0.3" />
              <line x1="46" y1="210" x2="54" y2="212" stroke="#111111" strokeWidth="0.5" opacity="0.3" />

              <rect x="45.5" y="222" width="9" height="4" rx="0.5" fill="#111111" />
            </svg>

            {/* Quick overlay specs info */}
            <div className="absolute right-2 top-6 bg-black/85 p-2.5 rounded-lg text-left text-[10px] text-white border border-white/10">
              <div className="font-bold text-theme-accent">{selectedRacket.name}</div>
              <div className="mt-1 font-mono text-zinc-300">{tension} lbs / {Math.round(tension * 0.453592)} kg</div>
            </div>
          </div>

          {/* Simple Specs Summary */}
          <div className="w-full bg-theme-dark border border-theme-border/20 rounded-xl p-3 flex justify-between items-center text-xs">
            <div className="text-white text-left font-semibold">
              <div>{selectedRacket.name}</div>
              <div className="text-[10px] text-theme-accent font-mono mt-0.5">{selectedString.name} @ {tension}lbs</div>
            </div>
            <div className="text-theme-accent font-mono font-bold text-sm">${totalPrice.toFixed(2)}</div>
          </div>
        </div>

        {/* Right Column: Customization Controls Panel */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          
          {/* Step 1: Base Racket Selection */}
          <div className="bg-theme-card rounded-[20px] border border-theme-border p-4 shadow-xs">
            <h3 className="text-xs font-mono font-bold text-theme-primary uppercase tracking-wider mb-3">
              1. Base Frame Racket
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {racketsList.map((racket) => (
                <div
                  key={racket.id}
                  onClick={() => setSelectedRacketId(racket.id)}
                  className={`border rounded-xl p-3.5 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedRacketId === racket.id
                      ? 'bg-theme-primary/10 border-theme-primary ring-1 ring-theme-primary'
                      : 'border-theme-border bg-theme-card hover:bg-theme-bg/50'
                  }`}
                >
                  <div className="text-left flex flex-col">
                    <h4 className="text-xs font-bold text-theme-text uppercase leading-tight">{racket.name}</h4>
                    <span className="text-[10px] font-mono text-theme-muted mt-1 uppercase font-semibold">Weight: {racket.specs['Weight']}</span>
                  </div>
                  <div className="text-left font-mono font-bold text-xs text-theme-primary mt-3 pt-2.5 border-t border-theme-border/50">
                    ${racket.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: String Selection */}
          <div className="bg-theme-card rounded-[20px] border border-theme-border p-4 shadow-xs">
            <h3 className="text-xs font-mono font-bold text-theme-primary uppercase tracking-wider mb-3">
              2. Precision String Spool
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stringsList.map((str) => (
                <div
                  key={str.id}
                  onClick={() => setSelectedStringId(str.id)}
                  className={`border rounded-xl p-3.5 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedStringId === str.id
                      ? 'bg-theme-primary/10 border-theme-primary ring-1 ring-theme-primary'
                      : 'border-theme-border bg-theme-card hover:bg-theme-bg/50'
                  }`}
                >
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-theme-text uppercase leading-tight">{str.name}</h4>
                    <span className="text-[10px] font-mono text-theme-muted mt-1 block uppercase font-semibold">Gauge: {str.specs['Gauge']}</span>
                  </div>
                  <div className="text-left font-mono font-bold text-xs text-theme-primary mt-3 pt-2.5 border-t border-theme-border/50">
                    +${str.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Sleek Simple Tension Slider */}
          <div className="bg-theme-card rounded-[20px] border border-theme-border p-4 shadow-xs">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-mono font-bold text-theme-primary uppercase tracking-wider">
                3. String Tension
              </h3>
              <span className="text-xs font-mono font-bold text-theme-primary tabular-nums">
                {tension} LBS / {Math.round(tension * 0.453592)} KG
              </span>
            </div>

            <div className="px-1">
              <input
                type="range"
                min="45"
                max="65"
                value={tension}
                onChange={(e) => setTension(parseInt(e.target.value))}
                className="w-full h-1 bg-theme-border rounded-lg appearance-none cursor-pointer accent-theme-primary"
              />
              <div className="flex justify-between text-[10px] text-theme-muted mt-1 font-semibold">
                <span>45 LBS (Power)</span>
                <span>65 LBS (Control)</span>
              </div>
            </div>

            <div className="text-[11px] text-theme-muted leading-relaxed mt-3 bg-theme-bg p-2.5 rounded-lg border border-theme-border/50 text-left italic font-medium">
              "{simpleAdvice}"
            </div>
          </div>

          {/* Step 4: Simple Overgrip Colors */}
          <div className="bg-theme-card rounded-[20px] border border-theme-border p-4 shadow-xs">
            <h3 className="text-xs font-mono font-bold text-theme-primary uppercase tracking-wider mb-2">
              4. Overgrip Color & Style
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Grip Color Circle Buttons */}
              <div className="flex items-center gap-2">
                {gripColors.map((col) => (
                  <button
                    key={col.hex}
                    onClick={() => setGripColor(col.hex)}
                    style={{ backgroundColor: col.hex }}
                    className={`w-8 h-8 rounded-full border border-theme-border cursor-pointer relative hover:scale-105 transition-transform ${
                      gripColor === col.hex ? 'ring-2 ring-theme-primary' : ''
                    }`}
                    title={col.name}
                  />
                ))}
              </div>

              {/* Quick Wrap style buttons */}
              <div className="flex items-center gap-1.5 bg-theme-bg p-1 rounded-lg border border-theme-border/50">
                {['Ribbed', 'Classic'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setGripStyle(style)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase rounded cursor-pointer transition-all ${
                      gripStyle === style
                        ? 'bg-theme-primary text-theme-primary-text font-black shadow-xs'
                        : 'text-theme-muted hover:text-theme-text'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Simple Technical Output & Add-to-bag Panel */}
          <div className="bg-theme-sidebar rounded-[20px] p-5 text-white border border-theme-border/20 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono mb-4 border-b border-theme-border/20 pb-3">
              <div className="text-left">
                <span className="text-zinc-400 block">Power</span>
                <span className="text-theme-accent font-bold text-sm tabular-nums">{stats.power}%</span>
              </div>
              <div className="text-left">
                <span className="text-zinc-400 block">Control</span>
                <span className="text-theme-accent font-bold text-sm tabular-nums">{stats.control}%</span>
              </div>
              <div className="text-left">
                <span className="text-zinc-400 block">Spin</span>
                <span className="text-theme-accent font-bold text-sm tabular-nums">{stats.spin}%</span>
              </div>
              <div className="text-left">
                <span className="text-zinc-400 block">Comfort</span>
                <span className="text-theme-accent font-bold text-sm tabular-nums">{stats.comfort}%</span>
              </div>
            </div>

            {/* Assemble & Add Panel */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="text-left">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Bundle Total</span>
                <div className="text-xl font-bold font-mono text-theme-accent mt-0.5 tabular-nums">
                  ${totalPrice.toFixed(2)}
                </div>
              </div>

              <button
                onClick={handleAssembleAndBuy}
                className="px-6 py-3 bg-theme-accent hover:bg-theme-accent-hover text-theme-accent-text text-xs font-black tracking-widest uppercase rounded-full transition-all cursor-pointer shadow-md text-center"
              >
                ASSEMBLE & ADD TO BAG
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
