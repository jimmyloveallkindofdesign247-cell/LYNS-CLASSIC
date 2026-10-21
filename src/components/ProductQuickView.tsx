import React, { useState } from 'react';
import { Product } from '../types/fashion';
import { X, ShoppingBag, ShieldCheck, Check, Sparkles, Scissors } from 'lucide-react';
import { formatCurrency } from '../utils/cart';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onOpenBespokeFitting: (productTitle: string) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenBespokeFitting,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Noir');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#111111] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close product quick view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Product Media Column */}
          <div className="relative bg-[#161616] flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full min-h-[380px] md:min-h-[500px] object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none md:hidden" />
            
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="text-[10px] tracking-wider uppercase px-3 py-1 rounded bg-[#ff007f] text-white font-bold shadow-lg">
                  {product.badge.text}
                </span>
              </div>
            )}
          </div>

          {/* Details & Purchase Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-[#818cf8] font-bold uppercase">{product.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">In Atelier Production</span>
              </div>

              {/* Title & Price */}
              <div>
                <h2 id="quickview-title" className="text-2xl sm:text-3xl font-extrabold text-white">
                  {product.title}
                </h2>
                <div className="mt-2 text-2xl font-black text-white font-mono tabular-nums flex items-baseline gap-2">
                  <span>{formatCurrency(product.price)}</span>
                  <span className="text-xs text-zinc-400 font-sans font-normal">
                    (Complimentary white-glove shipping)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Material & Silhouette specs */}
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase font-mono">Fabric</span>
                  <span className="text-zinc-200 font-medium text-right">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase font-mono">Silhouette</span>
                  <span className="text-zinc-200 font-medium text-right">{product.silhouette}</span>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400 flex items-center justify-between">
                  <span>Selected Shade</span>
                  <span className="text-white font-bold">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                        selectedColor === color.name
                          ? 'border-[#ff007f] bg-zinc-900 text-white ring-1 ring-[#ff007f]'
                          : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="uppercase text-zinc-400">Atelier Sizing</span>
                  <button
                    onClick={() => onOpenBespokeFitting(product.title)}
                    className="text-[#facc15] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Scissors className="w-3 h-3" />
                    <span>Need Custom Measurements?</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-center rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#facc15] text-black font-extrabold shadow-md'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-mono uppercase text-zinc-400">Quantity</span>
                <div className="flex items-center bg-zinc-900 border border-white/10 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-zinc-300 hover:text-white font-mono cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-zinc-300 hover:text-white font-mono cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[#4f46e5] via-[#ff007f] to-[#ff007f] text-white hover:from-[#4338ca] hover:to-[#e11d48] shadow-lg shadow-pink-500/20'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Garment Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#facc15]" />
                    <span>Add to Shopping Bag • {formatCurrency(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenBespokeFitting(product.title);
                }}
                className="w-full py-2.5 text-xs text-zinc-300 hover:text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
                <span>Or Request Made-to-Measure In Atelier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
