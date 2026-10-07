import { useState } from 'react';
import { X, Star, ShoppingCart, Check, Heart, MessageSquare } from 'lucide-react';
import { Product, Review } from '../data/products';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, options?: any) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);

  // Form states for new review
  const [reviewerName, setReviewerName] = useState('');
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Variant choices depending on category
  const [racketTension, setRacketTension] = useState(53);
  const [stringGauge, setStringGauge] = useState('16L (1.25mm)');
  const [gripColorChoice, setGripColorChoice] = useState('Forest Teal');

  const handleAddToCartClick = () => {
    let chosenOptions: any = {};
    if (product.category === 'rackets') {
      chosenOptions = { tension: `${racketTension} lbs`, grip: gripColorChoice };
    } else if (product.category === 'strings') {
      chosenOptions = { gauge: stringGauge };
    } else if (product.category === 'grips') {
      chosenOptions = { color: gripColorChoice };
    }

    onAddToCart(product, quantity, chosenOptions);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !commentInput.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: reviewerName,
      rating: ratingInput,
      date: new Date().toISOString().split('T')[0],
      comment: commentInput
    };

    setReviewsList([newReview, ...reviewsList]);
    setReviewerName('');
    setCommentInput('');
    setRatingInput(5);
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto select-none">
      <div className="bg-theme-card rounded-[32px] max-w-4xl w-full border border-theme-border shadow-2xl relative overflow-hidden flex flex-col md:flex-row max-h-[90vh] text-left animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button (Absolute) */}
        <button
          onClick={onClose}
          aria-label="Close details modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-theme-card/90 border border-theme-border text-theme-text hover:text-theme-primary hover:scale-105 flex items-center justify-center transition-all duration-200 z-50 cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Media Backdrop */}
        <div className="md:w-1/2 bg-theme-bg p-8 flex flex-col justify-between relative overflow-y-auto min-h-[300px] md:min-h-0 border-r border-theme-border">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          {/* Header metadata */}
          <div className="relative z-10 flex justify-between items-center w-full">
            <span className="text-[10px] font-mono font-bold text-theme-primary tracking-widest uppercase bg-theme-primary/10 px-3 py-1 rounded-full border border-theme-primary/10">
              {product.category} PRO SPEC
            </span>
            
            <button
              onClick={() => onToggleFavorite(product.id)}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isFavorite
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'bg-theme-card border-theme-border text-theme-muted hover:text-red-500 hover:scale-105'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Primary image render or Fallback visual */}
          <div className="relative flex-1 flex items-center justify-center my-6">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[320px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] rounded-2xl"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${product.fallbackGradient} p-6 flex flex-col justify-between text-[#F8F9F5] shadow-lg relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                <div className="text-[10px] font-mono font-bold text-theme-accent uppercase tracking-widest leading-none">HITHARD ARCHITECTURE</div>
                
                <div className="flex flex-col items-center justify-center flex-1 my-4">
                  <svg className="w-16 h-16 text-theme-accent/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 2L4 10l8 8 8-8-8-8zM12 18v4M10 22h4" />
                  </svg>
                  <span className="text-xs font-bold tracking-widest text-theme-accent uppercase font-display">CUSTOM CALIBRATION DECK</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Specifications List */}
          <div className="relative z-10 bg-theme-card/75 border border-theme-border rounded-2xl p-4 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-theme-muted uppercase font-extrabold block mb-2 leading-none">Physical Breakdown specs</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center border-b border-theme-border/50 py-1">
                  <span className="text-theme-muted">{key}</span>
                  <span className="font-bold text-theme-text font-mono tabular-nums">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Copywriting & Shopping options */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-none bg-theme-card">
          <div>
            {/* Title & Brand heading */}
            <div className="flex flex-col gap-1 text-left">
              <span className="text-xs font-mono text-theme-muted font-bold tracking-widest uppercase">HIT HARD // ACTIVE LAB</span>
              <h2 className="text-theme-text text-2xl font-black uppercase tracking-tight font-display mt-0.5 leading-snug">
                {product.name}
              </h2>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center gap-4 mt-3">
              <span className="text-theme-text text-2xl font-black font-mono tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-theme-muted/65 line-through font-mono text-sm tabular-nums">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              
              <div className="flex items-center gap-1 font-mono text-xs text-theme-text">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold tabular-nums">{product.rating.toFixed(1)}</span>
                <span className="text-theme-muted">({reviewsList.length} reviews)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-theme-muted text-sm leading-relaxed mt-4">
              {product.description}
            </p>

            {/* Key Engineering Features */}
            <div className="mt-5.5 text-left">
              <span className="text-[10px] font-mono text-theme-text uppercase font-extrabold tracking-widest block mb-2 leading-none">Engineering Attributes</span>
              <ul className="flex flex-col gap-1.5 text-xs text-theme-muted font-medium pl-1">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-theme-primary mt-1.5 shrink-0"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Variants Configuration Fields */}
            <div className="mt-6 pt-5 border-t border-theme-border text-left">
              <span className="text-[10px] font-mono text-theme-text uppercase font-extrabold tracking-widest block mb-3.5 leading-none">Calibrate your setup</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Racket Tension selection */}
                {product.category === 'rackets' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-theme-muted font-semibold">Pre-strung Tension</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="48"
                        max="62"
                        value={racketTension}
                        onChange={(e) => setRacketTension(parseInt(e.target.value))}
                        className="w-full accent-theme-primary"
                      />
                      <span className="text-xs font-mono font-bold text-theme-text shrink-0 tabular-nums">{racketTension} lbs</span>
                    </div>
                  </div>
                )}

                {/* String Gauge selection */}
                {product.category === 'strings' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-theme-muted font-semibold">String Gauge Thickness</label>
                    <select
                      value={stringGauge}
                      onChange={(e) => setStringGauge(e.target.value)}
                      className="bg-theme-bg border border-theme-border text-xs font-bold rounded-xl p-2.5 outline-none text-theme-text cursor-pointer"
                    >
                      <option value="16L (1.25mm)">16L Gauge (1.25mm) — High Spin</option>
                      <option value="16 (1.30mm)">16 Gauge (1.30mm) — Durability</option>
                      <option value="17 (1.20mm)">17 Gauge (1.20mm) — Supreme Touch</option>
                    </select>
                  </div>
                )}

                {/* Overgrip Colors */}
                {(product.category === 'rackets' || product.category === 'grips') && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-theme-muted font-semibold">Overgrip Accent Color</label>
                    <select
                      value={gripColorChoice}
                      onChange={(e) => setGripColorChoice(e.target.value)}
                      className="bg-theme-bg border border-theme-border text-xs font-bold rounded-xl p-2.5 outline-none text-theme-text cursor-pointer"
                    >
                      <option value="Forest Teal">Forest Teal (Tacky)</option>
                      <option value="Ivory Cream">Ivory Cream (Classic)</option>
                      <option value="Charcoal Black">Charcoal Black (Dry-Feel)</option>
                      <option value="Volt Citrus">Volt Citrus (Neon High-Vis)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Purchase actions footer */}
          <div className="mt-8 pt-5 border-t border-theme-border">
            <div className="flex items-center gap-4">
              
              {/* Quantity Stepper */}
              <div className="flex items-center bg-theme-bg border border-theme-border rounded-full p-1 shrink-0">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-theme-muted hover:text-theme-text cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono font-bold text-theme-text tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-theme-muted hover:text-theme-text cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add To Cart CTA */}
              <button
                onClick={handleAddToCartClick}
                className={`flex-1 h-12 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  added
                    ? 'bg-green-500 text-white shadow-md shadow-emerald-400/20'
                    : 'bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text shadow-lg'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 animate-bounce" />
                    <span>CALIBRATED & ADDED</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>ADD ACCESSORY TO BAG</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Reviews Section */}
          <div className="mt-8 pt-6 border-t border-theme-border text-left">
            <h3 className="text-xs font-mono font-bold text-theme-text uppercase tracking-widest mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-theme-primary" />
              <span>Customer Reviews & Calibration Feedback ({reviewsList.length})</span>
            </h3>

            {/* List of current reviews */}
            <div className="flex flex-col gap-4 max-h-[220px] overflow-y-auto pr-2 mb-6.5">
              {reviewsList.length === 0 ? (
                <div className="text-center py-6 text-xs text-theme-muted italic bg-theme-bg rounded-xl border border-dashed border-theme-border">
                  No verified player reviews yet. Be the first to submit setup feedback!
                </div>
              ) : (
                reviewsList.map((rev) => (
                  <div key={rev.id} className="border-b border-theme-border/50 pb-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-theme-text">{rev.author}</span>
                      <span className="text-[10px] font-mono text-theme-muted tabular-nums">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                           key={i}
                           className={`w-3.5 h-3.5 ${
                             i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-zinc-300'
                           }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-theme-muted mt-1.5 leading-relaxed font-medium">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleReviewSubmit} className="bg-theme-bg border border-theme-border p-4 rounded-2xl">
              <span className="text-[10px] font-mono text-theme-text uppercase font-extrabold tracking-widest block mb-3.5">Submit Performance Review</span>
              
              {reviewSuccess && (
                <div className="mb-3 text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Review logged successfully. Thank you for your feedback!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="PLAYER NAME"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="bg-theme-card border border-theme-border text-xs font-bold rounded-xl p-2.5 outline-none text-theme-text uppercase placeholder-theme-muted/50"
                  required
                />
                
                <div className="flex items-center gap-2 bg-theme-card border border-theme-border rounded-xl p-2.5">
                  <span className="text-[10px] font-mono text-theme-muted font-bold uppercase">Rating:</span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRatingInput(num)}
                        className="text-amber-500 hover:scale-115 transition-transform cursor-pointer"
                      >
                        <Star className={`w-4 h-4 ${num <= ratingInput ? 'fill-current' : 'text-zinc-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                placeholder="WRITE REVIEW FEEDBACK ON THE TENSION, WRAP, AND FEEL..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                rows={2}
                className="w-full bg-theme-card border border-theme-border text-xs font-bold rounded-xl p-2.5 outline-none text-theme-text uppercase placeholder-theme-muted/50 resize-none mb-3"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-black tracking-widest uppercase rounded-xl transition-all duration-300 cursor-pointer"
              >
                LOG FEEDBACK SPEC
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
