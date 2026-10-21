import React, { useState } from 'react';
import { CartItem } from '../types/fashion';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Building2, Sparkles, ArrowRight } from 'lucide-react';
import { calculateSubtotal, calculateShipping, calculateTotal, formatCurrency } from '../utils/cart';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState({
    fullName: 'Lady Vivienne Sterling',
    email: 'vivienne.sterling@luxurycouture.com',
    phone: '+1 (555) 728-9102',
    address: '742 Haute Avenue, Suite 12B',
    city: 'New York',
    postalCode: '10021',
    country: 'United States',
    paymentMethod: 'card', // 'card' | 'cod' | 'concierge'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, shipping);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrder = `LC-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onOrderCompleted();
    }, 900);
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={orderConfirmed ? handleFinish : onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-[#121212] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={orderConfirmed ? handleFinish : onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {orderConfirmed ? (
          /* Confirmation Screen */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#facc15]">
                Order Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Thank You for Choosing LYNS CLASSIC
              </h2>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Your order <span className="font-mono font-bold text-white">#{orderNumber}</span> has been dispatched to our master tailors for garment preparation.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-5 rounded-xl bg-zinc-900/80 border border-white/10 text-left space-y-3 text-xs">
              <div className="flex justify-between font-mono pb-2 border-b border-white/10">
                <span className="text-zinc-400">Delivery Address:</span>
                <span className="text-white text-right">
                  {formData.address}, {formData.city} {formData.postalCode}
                </span>
              </div>
              <div className="flex justify-between font-mono pb-2 border-b border-white/10">
                <span className="text-zinc-400">Payment Option:</span>
                <span className="text-white uppercase font-bold text-right">
                  {formData.paymentMethod === 'card' ? 'Encrypted Card' : 'Atelier In-Person / COD'}
                </span>
              </div>
              <div className="flex justify-between font-mono text-sm pt-1 font-bold text-white">
                <span>Total Amount Paid:</span>
                <span className="text-[#facc15] font-mono tabular-nums">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleFinish}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#ff007f] text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
              >
                Return to Fashion Hub
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center gap-2 pb-4 border-b border-white/10">
              <Sparkles className="w-5 h-5 text-[#facc15]" />
              <h2 id="checkout-modal-title" className="text-xl font-bold uppercase tracking-wider text-white font-['Outfit']">
                Express Atelier Checkout
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Info */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-wider text-zinc-400">
                  1. Recipient Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1 font-mono">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ff007f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1 font-mono">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ff007f]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-zinc-400 mb-1 font-mono">Delivery Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ff007f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1 font-mono">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ff007f]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1 font-mono">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#ff007f]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-wider text-zinc-400">
                  2. Select Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#ff007f] bg-zinc-900 text-white'
                        : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="sr-only"
                    />
                    <CreditCard className="w-4 h-4 text-[#818cf8]" />
                    <span className="text-xs font-semibold">Credit / Debit Card</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#facc15] bg-zinc-900 text-white'
                        : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="sr-only"
                    />
                    <Truck className="w-4 h-4 text-[#facc15]" />
                    <span className="text-xs font-semibold">Atelier In-Person / COD</span>
                  </label>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Selected Pieces ({items.length})</span>
                  <span className="font-mono tabular-nums">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>White-Glove Shipping</span>
                  <span className="font-mono text-emerald-400">
                    {shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                  <span>Total Due</span>
                  <span className="text-[#facc15] font-mono tabular-nums">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#4f46e5] via-[#ff007f] to-[#ff007f] hover:from-[#4338ca] hover:to-[#e11d48] shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Confirm Order • {formatCurrency(total)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-bit SSL Guaranteed Security · LYNS CLASSIC Atelier Certificate</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
