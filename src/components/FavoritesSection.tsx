import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface FavoritesSectionProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigateToShop: () => void;
}

export default function FavoritesSection({
  favorites,
  onToggleFavorite,
  onProductClick,
  onAddToCart,
  onNavigateToShop
}: FavoritesSectionProps) {
  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <section className="flex-1 flex flex-col gap-6 h-[calc(100vh-2rem)] overflow-y-auto pr-2 select-none text-left">
      {/* Title */}
      <div className="border-b border-theme-border pb-4">
        <span className="text-xs font-bold font-mono tracking-widest text-theme-muted uppercase">PERSONAL SAVED GEAR</span>
        <h2 className="text-theme-text text-3xl font-black uppercase tracking-tight font-display mt-1">
          FAVORITES DECK ({favoriteProducts.length})
        </h2>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 bg-theme-card border border-theme-border border-dashed rounded-[32px] text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-3.5 shadow-sm border border-red-500/10 animate-pulse">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h3 className="text-lg font-bold text-theme-text uppercase font-display">Your Favorites Deck is Empty</h3>
          <p className="text-xs text-theme-muted mt-1.5 max-w-sm leading-relaxed font-medium">
            Browse our racket tuning catalog and save high-end items to your personal deck to monitor prices or make custom setups.
          </p>
          <button
            onClick={onNavigateToShop}
            className="mt-5 px-6 py-3 bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-black tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300"
          >
            DISCOVER HIGH-END GEAR
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5 pb-12">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="group bg-theme-card rounded-[28px] border border-theme-border p-4.5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden relative"
            >
              {/* Unsave button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(product.id);
                }}
                className="absolute top-7 right-7 w-9 h-9 rounded-full flex items-center justify-center bg-red-500 border border-red-500 text-white z-10 cursor-pointer shadow-sm"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>

              {/* Media image fallback */}
              <div className="w-full aspect-[4/3] rounded-[22px] bg-theme-bg overflow-hidden relative flex items-center justify-center mb-4 border border-theme-border">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${product.fallbackGradient} p-6 flex flex-col justify-between text-left relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
                    <span className="text-[10px] font-bold font-mono text-theme-accent uppercase tracking-widest">{product.category}</span>
                    <span className="text-[10px] font-bold tracking-widest text-theme-accent/50 font-mono text-center">HITHARD ARCHITECTS</span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-theme-muted font-semibold">
                  <span className="uppercase tracking-widest">{product.category}</span>
                  <span aria-hidden="true" className="text-theme-accent">•</span>
                  <div className="flex items-center gap-0.5 font-mono text-theme-text tabular-nums">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-theme-text text-[18px] font-extrabold tracking-tight leading-snug font-display line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-xs text-theme-muted line-clamp-2 leading-relaxed font-medium">
                  {product.description}
                </p>

                {/* Bottom Card Actions */}
                <div className="flex items-center justify-between mt-4.5 pt-3 border-t border-theme-border">
                  <span className="text-theme-text text-lg font-black font-mono tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, 1);
                    }}
                    className="h-9 rounded-full px-4 text-xs font-black uppercase tracking-wider bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>BAG IT</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
