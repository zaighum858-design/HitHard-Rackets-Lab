import { useState, useMemo } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Percent, Check, Truck } from 'lucide-react';
import { Product } from '../data/products';

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

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  promoApplied: string | null;
  onApplyPromo: (code: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  promoApplied,
  onApplyPromo
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccessMsg, setPromoSuccessMsg] = useState<string | null>(null);

  // Checkout states
  const [showCheckout, setShowCheckout] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD'>('COD');
  
  // Credit card simulation states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Post-order success states
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');

  const shippingCost = useMemo(() => {
    if (cartItems.length === 0) return 0;
    if (promoApplied === 'FREESHIP') return 0;
    
    // Free shipping threshold on orders over $50
    const rawSubtotal = cartItems.reduce((acc, item) => {
      const price = item.isCustomLab ? (item.customPrice || 0) : item.product.price;
      return acc + (price * item.quantity);
    }, 0);

    return rawSubtotal >= 50 ? 0 : 5.99;
  }, [cartItems, promoApplied]);

  // Pricing calculations
  const priceCalculations = useMemo(() => {
    let subtotal = 0;
    let discount = 0;

    cartItems.forEach(item => {
      const price = item.isCustomLab ? (item.customPrice || 0) : item.product.price;
      const itemSubtotal = price * item.quantity;
      subtotal += itemSubtotal;

      // Apply 40OFF promo strictly on racket frames or custom setups
      if (promoApplied === '40OFF') {
        if (item.product.category === 'rackets' || item.isCustomLab) {
          // 40% discount on racket bases or complete lab units
          discount += itemSubtotal * 0.4;
        }
      }
    });

    const tax = subtotal * 0.05; // 5% GST
    const total = subtotal - discount + tax + shippingCost;

    return {
      subtotal,
      discount,
      tax,
      total
    };
  }, [cartItems, promoApplied, shippingCost]);

  const handleApplyPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    setPromoSuccessMsg(null);

    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === '40OFF') {
      onApplyPromo('40OFF');
      setPromoSuccessMsg('PROMO CODE VALID: 40% OFF RACKET BASE UNITS APPLIED!');
      setPromoInput('');
    } else if (code === 'FREESHIP') {
      onApplyPromo('FREESHIP');
      setPromoSuccessMsg('PROMO CODE VALID: FREE DELIVERY CALIBRATED!');
      setPromoInput('');
    } else {
      setPromoError('INVALID PROMO CODE. TRY "40OFF" OR "FREESHIP".');
    }
  };

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !postalCode.trim()) return;

    if (paymentMethod === 'CARD' && (!cardNumber.trim() || !cardExpiry.trim() || !cardCVV.trim())) {
      setPromoError('PLEASE FILL OUT COMPLETE SECURE CARD PAYMENT SPECS.');
      return;
    }

    // Process order simulation
    const randomOrderNum = `HH-${2026}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOrderNumber(randomOrderNum);
    setIsOrderComplete(true);
  };

  const handleResetCartState = () => {
    onClearCart();
    setIsOrderComplete(false);
    setShowCheckout(false);
    setFullName('');
    setPhone('');
    setAddress('');
    setPostalCode('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex justify-end select-none">
      
      {/* Backdrop Close Zone */}
      <div className="flex-1" onClick={onClose}></div>

      {/* Slide Out Panel */}
      <div className="w-full max-w-lg bg-theme-card h-full shadow-2xl flex flex-col justify-between border-l border-theme-border relative overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Panel Header */}
        <div className="bg-theme-sidebar text-white p-5.5 flex items-center justify-between border-b border-theme-border/20 shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5.5 h-5.5 text-theme-accent" />
            <h2 className="text-lg font-black uppercase tracking-tight font-display text-left">
              Shopping Bag <span className="text-theme-accent font-mono tabular-nums text-xs">({cartItems.length} items)</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-theme-primary text-theme-primary-text hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Dynamic Inner Body View */}
        {isOrderComplete ? (
          /* CELEBRATORY ORDER SUCCESS RECEIPT */
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between items-center text-center bg-theme-bg">
            <div className="flex flex-col items-center my-6">
              {/* Star badge */}
              <div className="w-18 h-18 rounded-full bg-theme-primary border border-theme-border/20 flex items-center justify-center text-theme-primary-text shadow-lg animate-bounce mb-4">
                <ShoppingBag className="w-9 h-9" />
              </div>
              
              <span className="text-[10px] font-mono font-bold text-theme-primary tracking-widest uppercase bg-theme-primary/10 px-3 py-1 rounded-full border border-theme-primary/10 mb-2">
                ORDER PLACED SUCCESSFULLY
              </span>
              <h3 className="text-theme-text text-2xl font-black uppercase font-display leading-tight">
                HIT HARD WIN BIG!
              </h3>
              <p className="text-sm text-theme-muted mt-1.5 max-w-xs font-medium">
                Your high-performance setup has been securely checked in and submitted to the tuning deck.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="w-full bg-theme-card border border-theme-border rounded-2xl p-5 text-left shadow-sm">
              <div className="flex justify-between items-center border-b border-theme-border/50 pb-2.5 mb-3.5">
                <span className="text-xs font-mono font-bold text-theme-text">ORDER NUMBER</span>
                <span className="text-xs font-mono font-bold text-theme-primary tabular-nums">{generatedOrderNumber}</span>
              </div>

              {/* Customer details verification */}
              <div className="text-xs text-theme-muted flex flex-col gap-1.5 border-b border-theme-border/50 pb-3.5 mb-3.5">
                <span className="font-bold text-theme-text uppercase font-mono text-[9px]">SHIP-TO CUSTOMER</span>
                <div>Name: <strong className="text-theme-text">{fullName.toUpperCase()}</strong></div>
                <div>Phone contact: <strong className="text-theme-text">{phone}</strong></div>
                <div>Address: <span className="text-theme-text">{address.toUpperCase()}, {postalCode}</span></div>
                <div>Payment Method: <strong className="text-theme-text">{paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Prepaid Secure Card'}</strong></div>
              </div>

              {/* Itemized spec build highlights */}
              <div className="flex flex-col gap-2 border-b border-theme-border/50 pb-3.5 mb-3.5">
                <span className="font-bold text-theme-text uppercase font-mono text-[9px] block">RACKET LAB WORK ORDER</span>
                {cartItems.map((item) => (
                  <div key={item.cartId} className="text-xs text-theme-muted flex justify-between items-start gap-2">
                    <div className="text-left font-medium">
                      <span className="font-semibold text-theme-text">{item.quantity}x {item.product.name}</span>
                      {item.isCustomLab && item.customDetails && (
                        <div className="text-[10px] text-theme-primary mt-0.5 leading-tight italic font-semibold">
                          Tension: {item.customDetails.tension} lbs · String: {item.customDetails.stringModel.name} · Grip: {item.customDetails.gripColor} ({item.customDetails.gripStyle})
                        </div>
                      )}
                    </div>
                    <span className="font-mono tabular-nums font-semibold text-theme-text">
                      ${((item.isCustomLab ? (item.customPrice || 0) : item.product.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total summary */}
              <div className="flex justify-between items-center text-sm font-bold text-theme-text">
                <span>FINAL SETTLEMENT TOTAL</span>
                <span className="font-mono text-base text-theme-primary tabular-nums">${priceCalculations.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Dispatch Timeline Indicator */}
            <div className="w-full bg-theme-sidebar text-white rounded-xl p-4 mt-4 border border-theme-border/20 text-left flex gap-3">
              <Truck className="w-5 h-5 text-theme-accent shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-theme-accent font-black tracking-widest block uppercase leading-none">PREPARING EXPRESS RUN</span>
                <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed font-medium">
                  Our lab technicians are stringing your racket frame using precision tension calibration. Your delivery has been routed and will arrive in <strong>2-3 business days</strong> with full tracking.
                </p>
              </div>
            </div>

            <button
              onClick={handleResetCartState}
              className="mt-6 w-full py-4 bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 text-center cursor-pointer shadow-md"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          /* STANDING SHOPPING BAG AND CHECKOUT PANEL */
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* Scrollable list items */}
            <div className="flex-1 overflow-y-auto p-5 text-left bg-theme-card">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-theme-muted mb-3 opacity-60" />
                  <h3 className="text-base font-bold text-theme-text uppercase font-display">Your Shopping Bag is Empty</h3>
                  <p className="text-xs text-theme-muted mt-1 max-w-xs font-medium">
                    Choose premium rackets, custom strings, and adhesive grip tapes from the catalog or build your dream racket in the lab.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-5 px-5 py-2.5 bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-bold uppercase tracking-wider rounded-full cursor-pointer transition-all duration-300"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : !showCheckout ? (
                /* SECTION 1: CART LIST & PROMO */
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-mono text-theme-muted font-bold tracking-widest uppercase block mb-1">YOUR CURRENT CUSTOM SELECTIONS</span>
                  
                  {cartItems.map((item) => {
                    const price = item.isCustomLab ? (item.customPrice || 0) : item.product.price;
                    
                    return (
                      <div
                        key={item.cartId}
                        className="flex gap-3.5 border-b border-theme-border/50 pb-4 relative group text-left"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-theme-bg border border-theme-border overflow-hidden shrink-0 flex items-center justify-center relative">
                          {item.product.image ? (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${item.product.fallbackGradient} flex items-center justify-center text-white`}>
                              <span className="text-[9px] font-mono font-bold">SPEC</span>
                            </div>
                          )}

                          {item.isCustomLab && (
                            <div className="absolute top-0 left-0 bg-theme-accent text-theme-accent-text text-[8px] font-mono font-black py-0.5 px-1 rounded-br-lg leading-none">
                              LAB
                            </div>
                          )}
                        </div>

                        {/* Copywriting */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-theme-text uppercase font-display leading-tight truncate">
                            {item.product.name}
                          </h4>

                          {/* Zero-Pill option specs metadata */}
                          {item.isCustomLab && item.customDetails ? (
                            <div className="text-[10px] text-theme-primary font-bold mt-1 flex flex-wrap gap-x-1.5 gap-y-0.5 items-center leading-none">
                              <span>Tension: {item.customDetails.tension} lbs</span>
                              <span aria-hidden="true" className="text-theme-muted">•</span>
                              <span className="truncate">String: {item.customDetails.stringModel.name}</span>
                              <span aria-hidden="true" className="text-theme-muted">•</span>
                              <span>Grip: {item.customDetails.gripColor}</span>
                            </div>
                          ) : item.options && Object.keys(item.options).length > 0 ? (
                            <div className="text-[10px] text-theme-muted font-semibold mt-1 flex flex-wrap gap-x-1.5 gap-y-0.5 items-center leading-none">
                              {Object.entries(item.options).map(([k, v], idx) => (
                                <span key={k} className="flex items-center gap-1.5">
                                  {idx > 0 && <span aria-hidden="true" className="text-theme-border">•</span>}
                                  <span>{k}: {v}</span>
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="text-[10px] text-theme-muted font-medium mt-1 uppercase tracking-wider font-mono">
                              Category: {item.product.category}
                            </div>
                          )}

                          {/* Price & Quantity stepper row */}
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs font-bold font-mono text-theme-text tabular-nums">
                              ${price.toFixed(2)} each
                            </span>

                            {/* Quantity buttons */}
                            <div className="flex items-center bg-theme-bg border border-theme-border rounded-full p-0.5 shrink-0">
                              <button
                                onClick={() => onUpdateQuantity(item.cartId, Math.max(1, item.quantity - 1))}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-theme-muted hover:text-theme-text cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-[11px] font-mono font-bold text-theme-text tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-theme-muted hover:text-theme-text cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          aria-label="Remove item"
                          className="text-theme-muted hover:text-red-500 hover:scale-105 transition-all duration-200 self-center pl-2 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* SECTION 2: CUSTOMER CHECKOUT VERIFICATION COD CARD FORM */
                <form id="checkout-form" onSubmit={handlePlaceOrderSubmit} className="flex flex-col gap-4.5 text-left">
                  <div className="border-b border-theme-border/50 pb-3 mb-1">
                    <span className="text-[10px] font-mono text-theme-muted font-bold tracking-widest uppercase block mb-1">SECURE VERIFICATION MODULE</span>
                    <h3 className="text-sm font-black text-theme-text uppercase font-display">Customer Delivery Details</h3>
                  </div>

                  {/* COD Total Notice */}
                  <div className="bg-theme-primary/10 border border-theme-border rounded-xl p-3.5 text-xs text-theme-text text-left">
                    <div className="font-bold uppercase font-mono text-[9px] leading-none text-theme-primary">TOTAL AMOUNT DUE ON COLLECTION</div>
                    <div className="text-lg font-mono font-black mt-1 tabular-nums text-theme-text">${priceCalculations.total.toFixed(2)}</div>
                    <p className="mt-1.5 leading-relaxed text-theme-muted font-medium">
                      We support Cash on Delivery (COD). Prepare cash or digital app scans upon home courier collection.
                    </p>
                  </div>

                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-bold text-theme-muted uppercase tracking-wider">Full Delivery Name</label>
                    <input
                      type="text"
                      required
                      placeholder="ENTER FIRST & LAST NAME"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-theme-bg border border-theme-border text-xs font-bold rounded-xl p-3 outline-none text-theme-text uppercase placeholder-theme-muted/50"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-bold text-theme-muted uppercase tracking-wider">Active Mobile Number (Courier Contact)</label>
                    <input
                      type="tel"
                      required
                      placeholder="E.G. +1 (555) 382-0192"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-theme-bg border border-theme-border text-xs font-bold rounded-xl p-3 outline-none text-theme-text uppercase placeholder-theme-muted/50"
                    />
                  </div>

                  {/* Address field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-bold text-theme-muted uppercase tracking-wider">Street Address & Apartment</label>
                    <input
                      type="text"
                      required
                      placeholder="E.G. 142 ELM ROAD, APARTMENT 4B"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-theme-bg border border-theme-border text-xs font-bold rounded-xl p-3 outline-none text-theme-text uppercase placeholder-theme-muted/50"
                    />
                  </div>

                  {/* Postal Code field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-bold text-theme-muted uppercase tracking-wider">Postal / ZIP Code</label>
                    <input
                      type="text"
                      required
                      placeholder="E.G. 90210"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-theme-bg border border-theme-border text-xs font-bold rounded-xl p-3 outline-none text-theme-text uppercase placeholder-theme-muted/50"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-bold text-theme-muted uppercase tracking-wider">Payment Protocol</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('COD')}
                        className={`py-3 rounded-xl border text-xs font-black uppercase transition-all duration-300 cursor-pointer ${
                          paymentMethod === 'COD'
                            ? 'bg-theme-primary text-theme-primary-text border-theme-primary'
                            : 'bg-theme-bg border-theme-border text-theme-muted hover:bg-theme-bg/50'
                        }`}
                      >
                        Cash On Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('CARD')}
                        className={`py-3 rounded-xl border text-xs font-black uppercase transition-all duration-300 cursor-pointer ${
                          paymentMethod === 'CARD'
                            ? 'bg-theme-primary text-theme-primary-text border-theme-primary'
                            : 'bg-theme-bg border-theme-border text-theme-muted hover:bg-theme-bg/50'
                        }`}
                      >
                        Secure Card
                      </button>
                    </div>
                  </div>

                  {/* Secure card detail simulation */}
                  {paymentMethod === 'CARD' && (
                    <div className="bg-theme-bg border border-theme-border rounded-2xl p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
                      <div className="text-[9px] font-mono text-theme-primary font-bold uppercase block leading-none">TEST CARD EMULATOR (SAFE FOR DEMO)</div>
                      
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          placeholder="CARD NUMBER (4111 2222 3333 4444)"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="bg-theme-card border border-theme-border text-xs font-bold rounded-xl p-2.5 outline-none text-theme-text placeholder-theme-muted/50"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="EXP (MM/YY)"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="bg-theme-card border border-theme-border text-xs font-bold rounded-xl p-2.5 outline-none text-theme-text placeholder-theme-muted/50"
                          required
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          className="bg-theme-card border border-theme-border text-xs font-bold rounded-xl p-2.5 outline-none text-theme-text placeholder-theme-muted/50"
                          required
                        />
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Shopping summary bottom calculation footer Display */}
            <div className="bg-theme-bg border-t border-theme-border p-5.5 shrink-0 text-left">
              
              {/* Promo input form */}
              {!showCheckout && (
                <div className="mb-4">
                  <form onSubmit={handleApplyPromoSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER PROMO CODE (E.G. 40OFF)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-theme-card border border-theme-border text-xs font-bold rounded-xl px-3.5 py-2.5 outline-none text-theme-text uppercase placeholder-theme-muted/50 tracking-wider"
                    />
                    <button
                      type="submit"
                      className="px-4 bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      APPLY
                    </button>
                  </form>

                  {promoError && (
                    <div className="text-[10px] text-red-500 font-mono font-bold mt-1.5 uppercase">
                      {promoError}
                    </div>
                  )}

                  {promoSuccessMsg && (
                    <div className="text-[10px] text-green-500 font-mono font-bold mt-1.5 uppercase flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      <span>{promoSuccessMsg}</span>
                    </div>
                  )}

                  {promoApplied && (
                    <div className="flex items-center justify-between text-xs font-mono text-theme-primary font-bold mt-2 bg-theme-primary/10 px-3 py-1.5 rounded-xl border border-theme-primary/10">
                      <span>CODE IN WORKLIST: {promoApplied}</span>
                      <button 
                        onClick={() => onApplyPromo('')}
                        className="underline text-[10px] hover:text-theme-text cursor-pointer"
                      >
                        REMOVE
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Subtotal, delivery, applied coupon displays */}
              <div className="flex flex-col gap-2 border-b border-theme-border pb-4 text-xs font-semibold text-theme-muted">
                <div className="flex justify-between items-center">
                  <span>Cart Items Subtotal</span>
                  <span className="font-mono text-theme-text tabular-nums">${priceCalculations.subtotal.toFixed(2)}</span>
                </div>

                {priceCalculations.discount > 0 && (
                  <div className="flex justify-between items-center text-red-500">
                    <span className="flex items-center gap-1">
                      <Percent className="w-3.5 h-3.5" /> Coupon Discount (40% OFF rackets)
                    </span>
                    <span className="font-mono tabular-nums">-${priceCalculations.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Standard Delivery fee</span>
                  <span className="font-mono text-theme-text tabular-nums font-bold">
                    {shippingCost === 0 ? (
                      <span className="text-green-500 font-bold font-mono">FREE DISPATCH</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Racket tuning GST Tax (5%)</span>
                  <span className="font-mono text-theme-text tabular-nums">${priceCalculations.tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-center mt-4 mb-5">
                <span className="text-theme-text text-sm font-black uppercase font-display">GRAND SETTLEMENT TOTAL</span>
                <span className="text-theme-primary text-xl font-black font-mono tabular-nums">${priceCalculations.total.toFixed(2)}</span>
              </div>

              {/* Action checkout triggers */}
              {!showCheckout ? (
                <button
                  onClick={() => setShowCheckout(true)}
                  disabled={cartItems.length === 0}
                  className="w-full py-4 bg-theme-primary hover:bg-theme-primary-hover disabled:bg-theme-border disabled:text-theme-muted disabled:cursor-not-allowed text-theme-primary-text text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  PROCEED TO SECURE CHECKOUT
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-3">
                  {/* Cancel/Back button */}
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="w-1/3 py-4 border border-theme-border text-theme-text text-xs font-bold uppercase rounded-full transition-all duration-300 text-center cursor-pointer hover:bg-theme-card"
                  >
                    BACK
                  </button>

                  {/* Trigger main submit */}
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-4 bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-black tracking-widest uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    CONFIRM & DISPATCH ORDER
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
