import { Search, ShoppingCart, Heart, Check, Star, ArrowUpDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Product, PRODUCTS } from '../data/products';

interface CatalogSectionProps {
  initialCategory?: string;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, options?: any) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function CatalogSection({
  initialCategory = 'all',
  onProductClick,
  onAddToCart,
  favorites,
  onToggleFavorite,
  searchQuery,
  setSearchQuery
}: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // List of interactive category buttons
  const categories = [
    { id: 'all', label: 'All Gear & Tuning' },
    { id: 'rackets', label: 'Rackets' },
    { id: 'strings', label: 'Strings' },
    { id: 'grips', label: 'Overgrips' },
    { id: 'accessories', label: 'Accessories' }
  ];

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' retains original array order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1500);
  };

  return (
    <section className="flex-1 flex flex-col gap-6 h-[calc(100vh-2rem)] overflow-y-auto pr-2 select-none text-left">
      
      {/* Catalog Title Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-theme-border pb-4">
        <div>
          <span className="text-xs font-bold font-mono tracking-widest text-theme-muted uppercase">HIGH PERFORMANCE DECK</span>
          <h2 className="text-theme-text text-3xl font-black uppercase tracking-tight font-display mt-1">
            RACKET ACCESSORIES & TUNING LAB
          </h2>
        </div>

        <div className="text-xs font-mono text-theme-muted font-bold">
          SHOWING <span className="text-theme-text font-black font-mono tabular-nums">{filteredProducts.length}</span> PREMIUM SQUADS
        </div>
      </div>

      {/* Filter and Sorting Row */}
      <div className="flex flex-col gap-4">
        
        {/* Category Buttons Row - Segmented Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-theme-card border border-theme-border rounded-[20px] max-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold tracking-tight rounded-[16px] transition-all duration-300 cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-theme-primary text-theme-accent shadow-sm font-black'
                  : 'text-theme-muted hover:text-theme-text hover:bg-theme-primary/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search, Sort & Clear Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-theme-card border border-theme-border p-3 rounded-[24px]">
          {/* Inner Search Field */}
          <div className="w-full sm:w-72 flex items-center gap-2 bg-theme-bg border border-theme-border rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-theme-muted" />
            <input
              type="text"
              placeholder="SEARCH CATALOG..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-bold placeholder-theme-muted/50 w-full uppercase tracking-wider text-theme-text"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs font-mono text-theme-muted hover:text-theme-text cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Sort Selection */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 text-xs text-theme-muted font-semibold">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>SORT BY:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-theme-bg border border-theme-border text-xs font-bold rounded-xl px-3 py-2 outline-none text-theme-text cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated Quality</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-theme-card border border-theme-border border-dashed rounded-[32px] text-center">
          <svg className="w-12 h-12 text-theme-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-bold text-theme-text uppercase font-display">No Gear Matches Found</h3>
          <p className="text-sm text-theme-muted mt-1 max-w-sm">
            We couldn't find matches for "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-5 py-2.5 bg-theme-primary text-theme-accent text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
          >
            RESET DISCOVER DECK
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5 pb-12">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            const isAdded = addedAnimationId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="group bg-theme-card rounded-[28px] border border-theme-border p-4.5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer overflow-hidden relative"
              >
                {/* Save to Favorites Pin */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(product.id);
                  }}
                  aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                  className={`absolute top-7 right-7 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 cursor-pointer border ${
                    isFav
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'bg-theme-bg border-theme-border text-theme-muted hover:text-red-500 hover:scale-110'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {/* Card Header Media - 65% height on neutral backdrop */}
                <div className="w-full aspect-[4/3] rounded-[22px] bg-theme-bg overflow-hidden relative flex items-center justify-center mb-4 border border-theme-border">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${product.fallbackGradient} p-6 flex flex-col justify-between text-left relative overflow-hidden`}>
                      <span className="text-[10px] font-bold font-mono text-theme-accent uppercase tracking-widest">{product.category}</span>
                      <span className="text-[10px] font-bold tracking-widest text-theme-accent/50 font-mono">HITHARD SPEC</span>
                    </div>
                  )}

                  {product.originalPrice && (
                    <div className="absolute bottom-3 left-3 bg-theme-dark text-theme-accent font-mono text-[9px] font-black tracking-widest px-2.5 py-1 rounded-[8px] uppercase">
                      SALE PRO-DEAL
                    </div>
                  )}
                </div>

                {/* Card Copywriting */}
                <div className="flex flex-col gap-2 text-left">
                  
                  {/* Clean unboxed category & rating metadata */}
                  <div className="flex items-center gap-2 text-xs text-theme-muted font-semibold">
                    <span className="uppercase tracking-widest">{product.category}</span>
                    <span aria-hidden="true" className="text-theme-accent">•</span>
                    <div className="flex items-center gap-0.5 font-mono text-theme-text tabular-nums">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-theme-muted">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-theme-text text-[20px] font-black tracking-tight leading-snug group-hover:text-theme-primary transition-colors font-display line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Micro specs bullet */}
                  <p className="text-sm text-theme-muted line-clamp-1 italic font-semibold">
                    {Object.entries(product.specs).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                  </p>

                  <p className="text-sm text-theme-muted line-clamp-2 leading-relaxed mt-1 font-medium">
                    {product.description}
                  </p>

                  {/* Card Bottom Panel - Price & Quick Buy */}
                  <div className="flex items-center justify-between mt-4.5 pt-3 border-t border-theme-border">
                    
                    {/* Price panel */}
                    <div className="flex items-baseline gap-1.5 text-left">
                      <span className="text-theme-text text-xl font-extrabold font-mono tabular-nums">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-theme-muted/60 line-through text-xs font-mono tabular-nums">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Quick Add To Bag Button */}
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`h-9 rounded-full px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        isAdded
                          ? 'bg-theme-accent text-theme-dark'
                          : 'bg-theme-primary hover:bg-theme-dark text-theme-accent hover:text-theme-bg'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>QUICK ADD</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
