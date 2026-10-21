import React, { useState } from 'react';
import { CartItem } from '../types/fashion';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import {
  calculateSubtotal,
  calculateShipping,
  calculateTotal,
  formatCurrency,
  FREE_SHIPPING_THRESHOLD,
} from '../utils/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onExploreCollections: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCollections,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, shipping, discountPercent);
  const freeShippingDiff = FREE_SHIPPING_THRESHOLD - subtotal;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'LYNSVIP' || code === 'FIRSTLOOK') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "LYNSVIP" for 10% private salon discount.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag Drawer"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-[420px] max-w-md bg-[#0f0f0f] border-l border-white/10 shadow-2xl flex flex-col justify-between text-zinc-100 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#ff007f]" />
              <h2 className="text-lg font-bold uppercase tracking-wider font-['Outfit']">
                Garment Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Tracker */}
          <div className="px-5 py-3 bg-zinc-900/80 border-b border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-300">
                {freeShippingDiff <= 0
                  ? '✨ Complimentary White-Glove Shipping Unlocked'
                  : `Add ${formatCurrency(freeShippingDiff)} for Free Global Shipping`}
              </span>
              <span className="text-[#facc15] font-bold">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4f46e5] via-[#ff007f] to-[#facc15] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Your Garment Bag is Empty</p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                    Curate your wardrobe with our latest Evening Wear, Streetwear Couture, and Bespoke Suits.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreCollections();
                  }}
                  className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-[#ff007f] text-white text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex gap-3.5 items-center justify-between"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-16 h-20 object-cover object-top rounded-lg bg-zinc-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs text-[#818cf8] font-mono uppercase tracking-wider truncate">
                      {item.product.category}
                    </p>
                    <h3 className="text-sm font-bold text-white truncate">
                      {item.product.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Size: <span className="text-white font-mono font-semibold">{item.selectedSize}</span> · Shade: <span className="text-white">{item.selectedColor}</span>
                    </p>

                    {/* Stepper & Unit Price */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center bg-zinc-800 border border-white/10 rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white font-mono cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white font-mono cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-white font-mono tabular-nums">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                    aria-label={`Remove ${item.product.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#0c0c0c] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="VIP Code (e.g. LYNSVIP)"
                      disabled={promoApplied}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white uppercase font-mono placeholder-zinc-500 focus:outline-none focus:border-[#facc15]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-white disabled:opacity-50 cursor-pointer"
                  >
                    {promoApplied ? <Check className="w-4 h-4 text-emerald-400" /> : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-400 font-mono">
                    ✓ 10% Atelier Private Salon discount applied
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-400 font-mono">{promoError}</p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-200 tabular-nums">{formatCurrency(subtotal)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#facc15]">
                    <span>Salon Privilege (-{discountPercent}%)</span>
                    <span className="tabular-nums">
                      -{formatCurrency((subtotal * discountPercent) / 100)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-zinc-200 tabular-nums">
                    {shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span className="font-sans">Estimated Total</span>
                  <span className="font-mono tabular-nums text-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#facc15]">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#4f46e5] via-[#ff007f] to-[#ff007f] hover:from-[#4338ca] hover:to-[#e11d48] transition-all duration-300 shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted Atelier Checkout · Authenticity Guaranteed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
