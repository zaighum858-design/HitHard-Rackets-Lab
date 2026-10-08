import { useState, useEffect } from 'react';
import { LogIn, UserPlus, User, LogOut } from 'lucide-react';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import CatalogSection from './components/CatalogSection';
import CustomLab from './components/CustomLab';
import FavoritesSection from './components/FavoritesSection';
import ProductDetailModal from './components/ProductDetailModal';
import ProfileModal from './components/ProfileModal';
import CartDrawer from './components/CartDrawer';
import { Product, PRODUCTS } from './data/products';

interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  options?: {
    tension?: string;
    grip?: string;
    gauge?: string;
    color?: string;
  };
  isCustomLab?: boolean;
  customDetails?: {
    stringModel: Product;
    tension: number;
    gripColor: string;
    gripStyle: string;
  };
  customPrice?: number;
}

export default function App() {
  // Global Theme State ('default' | 'orange' | 'mono')
  const [theme, setTheme] = useState<'default' | 'orange' | 'mono'>('default');

  // Navigation Routing States
  const [currentView, setView] = useState<'home' | 'catalog' | 'lab' | 'favorites'>('home');
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Coupon System States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoApplied, setPromoApplied] = useState<string | null>(null);

  // Favorites Saved List
  const [favorites, setFavorites] = useState<string[]>(['racket-volt', 'string-chrono']); // seed values

  // Authenticated User State (defaults to null so Login / Sign Up buttons are clearly visible)
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');

  const [playerProfile, setPlayerProfile] = useState({
    name: 'GUEST PLAYER',
    playStyle: 'Aggressive Baseline',
    hand: 'Right-Handed',
    gripSize: '4 3/8 (L3)',
    surface: 'Hard-Court'
  });

  const handleOpenSignIn = () => {
    setAuthModalTab('signin');
    setIsProfileOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthModalTab('signup');
    setIsProfileOpen(true);
  };

  const handleLogOut = () => {
    setCurrentUser(null);
  };

  // Modal & Drawer Toggle States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Apply HTML attribute on theme state change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync scroll to top on routing
  useEffect(() => {
    const mainSection = document.getElementById('main-viewport-pane');
    if (mainSection) {
      mainSection.scrollTop = 0;
    }
  }, [currentView, catalogCategory]);

  // Event Handlers
  const handleAddToCart = (product: Product, quantity: number = 1, options?: any) => {
    const existingIndex = cartItems.findIndex(
      item => 
        item.product.id === product.id && 
        !item.isCustomLab &&
        JSON.stringify(item.options) === JSON.stringify(options || {})
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartId: `${product.id}-${Date.now()}`,
        product,
        quantity,
        options,
        isCustomLab: false
      };
      setCartItems([...cartItems, newItem]);
    }
    setIsCartOpen(true);
  };

  const handleAddCustomBundleToCart = (bundle: {
    id: string;
    name: string;
    price: number;
    baseRacket: Product;
    stringModel: Product;
    tension: number;
    gripColor: string;
    gripStyle: string;
    specs: any;
  }) => {
    const virtualProduct: Product = {
      id: `custom-build-${Date.now()}`,
      name: bundle.name,
      category: 'rackets',
      price: bundle.price,
      rating: 5.0,
      reviewsCount: 1,
      description: `Lab calibrating ${bundle.baseRacket.name} base frame. Calibrating ${bundle.stringModel.name} strings set to ${bundle.tension} lbs. Finished with ${bundle.gripColor} (${bundle.gripStyle}) overgrip wrap. Custom engineering work complete.`,
      image: bundle.baseRacket.image,
      fallbackGradient: bundle.baseRacket.fallbackGradient,
      specs: {
        "Base Frame": bundle.baseRacket.name,
        "String Model": bundle.stringModel.name,
        "String Tension": `${bundle.tension} LBS`,
        "Grip Color": bundle.gripColor,
        "Grip Style": bundle.gripStyle
      },
      features: [
        "Individually hand-strung in our precision racket lab",
        "Tension pre-stretched to minimize tension creep",
        "Finished with custom high-absorbency base wrap layer"
      ],
      reviews: []
    };

    const newCartItem: CartItem = {
      cartId: `custom-cart-${Date.now()}`,
      product: virtualProduct,
      quantity: 1,
      isCustomLab: true,
      customDetails: {
        stringModel: bundle.stringModel,
        tension: bundle.tension,
        gripColor: bundle.gripColor,
        gripStyle: bundle.gripStyle
      },
      customPrice: bundle.price
    };

    setCartItems([...cartItems, newCartItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    setCartItems(
      cartItems.map(item => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setPromoApplied(null);
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setCatalogCategory('all');
    setView('catalog');
  };

  const handleNavigateToCatalog = (category: string = 'all') => {
    setCatalogCategory(category);
    setSearchQuery('');
    setView('catalog');
  };

  const handleOpenFilterDrawer = () => {
    setCatalogCategory('all');
    setSearchQuery('');
    setView('catalog');
  };

  const handleGetNewArrival = () => {
    const racketProduct = PRODUCTS.find(p => p.id === 'racket-volt');
    if (racketProduct) {
      setSelectedProduct(racketProduct);
    }
  };

  const handleApplyPromoCode = (code: string) => {
    setPromoApplied(code);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto min-h-screen flex flex-col md:flex-row gap-6 p-4 sm:p-6 lg:p-8 relative overflow-hidden items-start select-none bg-theme-bg text-theme-text transition-colors duration-300">
      
      {/* Ambient Theme-Sourced Background Glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-theme-primary/5 blur-3xl -top-40 -left-40 pointer-events-none z-0"></div>
      <div className="absolute w-[400px] h-[400px] rounded-full bg-theme-accent/3 blur-3xl -bottom-20 right-[-100px] pointer-events-none z-0"></div>

      {/* Global Segmented Theme Selector Pill (Bottom-Right aligned) */}
      <div className="fixed bottom-6 right-8 z-[80] flex items-center gap-2.5 bg-theme-card border-2 border-theme-border p-1.5 rounded-full shadow-xl transition-all duration-300">
        <span className="text-[10px] font-mono font-black text-theme-muted pl-2.5 uppercase tracking-wider hidden sm:inline select-none">Theme</span>
        <button
          onClick={() => setTheme('default')}
          className={`w-6 h-6 rounded-full bg-[#253F36] border cursor-pointer transition-transform hover:scale-110 ${
            theme === 'default' ? 'scale-110 ring-2 ring-[#AEEB99]' : 'border-black/5 opacity-70'
          }`}
          title="Default (Teal & Cream)"
        />
        <button
          onClick={() => setTheme('orange')}
          className={`w-6 h-6 rounded-full bg-[#EA580C] border cursor-pointer transition-transform hover:scale-110 ${
            theme === 'orange' ? 'scale-110 ring-2 ring-[#F97316]' : 'border-black/5 opacity-70'
          }`}
          title="Orange & Black"
        />
        <button
          onClick={() => setTheme('mono')}
          className={`w-6 h-6 rounded-full bg-[#FFFFFF] border border-black/35 cursor-pointer transition-transform hover:scale-110 ${
            theme === 'mono' ? 'scale-110 ring-2 ring-black/40' : 'opacity-70'
          }`}
          title="Black & White"
        />
      </div>

      {/* Vertical Navigation Sidebar Panel */}
      <Sidebar
        theme={theme}
        currentView={currentView}
        setView={(view) => {
          setView(view);
          setCatalogCategory('all');
        }}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        openProfile={() => setIsProfileOpen(true)}
        onGetNewArrival={handleGetNewArrival}
        currentUser={currentUser}
        onOpenSignIn={handleOpenSignIn}
        onOpenSignUp={handleOpenSignUp}
      />

      {/* Main Viewport Content Pane */}
      <main 
        id="main-viewport-pane"
        className="flex-1 rounded-[32px] p-2 md:p-0 z-10 w-full min-h-[calc(100vh-4rem)] relative"
      >
        {/* Top-Right Auth Pill Bar for Non-Home Views */}
        {currentView !== 'home' && (
          <div className="w-full flex justify-end items-center mb-2 pb-2">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-theme-card border border-theme-border px-3 py-1.5 rounded-full shadow-xs">
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase text-theme-text hover:text-theme-primary transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-theme-primary" />
                  <span>{currentUser.name}</span>
                  <span className="text-[9px] bg-theme-primary/10 text-theme-primary font-black px-1.5 py-0.5 rounded">PRO</span>
                </button>
                <div className="h-3 w-px bg-theme-border"></div>
                <button
                  onClick={handleLogOut}
                  className="text-[11px] text-theme-muted hover:text-theme-text font-bold uppercase cursor-pointer transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenSignIn}
                  className="bg-theme-card hover:bg-theme-card/80 text-theme-text border border-theme-border px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-theme-primary" />
                  <span>Log In</span>
                </button>
                <button
                  onClick={handleOpenSignUp}
                  className="bg-theme-primary hover:bg-theme-primary-hover text-theme-on-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        )}

        {currentView === 'home' && (
          <HeroSection
            theme={theme}
            onSearchSubmit={handleSearchSubmit}
            onNavigateToCatalog={handleNavigateToCatalog}
            onApplyPromoCode={handleApplyPromoCode}
            onOpenFilterDrawer={handleOpenFilterDrawer}
            currentUser={currentUser}
            onOpenSignIn={handleOpenSignIn}
            onOpenSignUp={handleOpenSignUp}
            onOpenProfile={() => setIsProfileOpen(true)}
            onLogOut={handleLogOut}
          />
        )}

        {currentView === 'catalog' && (
          <CatalogSection
            initialCategory={catalogCategory}
            onProductClick={setSelectedProduct}
            onAddToCart={handleAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentView === 'lab' && (
          <CustomLab 
            onAddCustomBundleToCart={handleAddCustomBundleToCart}
          />
        )}

        {currentView === 'favorites' && (
          <FavoritesSection
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onProductClick={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onNavigateToShop={() => setView('catalog')}
          />
        )}
      </main>

      {/* Overlaid Drawers and Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        promoApplied={promoApplied}
        onApplyPromo={setPromoApplied}
      />

      {isProfileOpen && (
        <ProfileModal
          onClose={() => setIsProfileOpen(false)}
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          initialAuthTab={authModalTab}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}
