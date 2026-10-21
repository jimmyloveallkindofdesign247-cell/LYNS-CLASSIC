/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollectionsGrid } from './components/CollectionsGrid';
import { AboutUs } from './components/AboutUs';
import { LookbookShowcase } from './components/LookbookShowcase';
import { BespokeConsultation } from './components/BespokeConsultation';
import { Footer } from './components/Footer';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types/fashion';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  // Initialize with 1 iconic signature garment so the cart is instantly tangible
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: `${PRODUCTS[0].id}-S-Midnight Onyx`,
      product: PRODUCTS[0],
      selectedSize: 'S',
      selectedColor: 'Midnight Onyx',
      quantity: 1,
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [bespokeGarmentPref, setBespokeGarmentPref] = useState<string>('Tailored Suits');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number = 1
  ) => {
    const itemKey = `${product.id}-${size}-${color}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
        },
      ];
    });

    showToast(`Added ${quantity}x "${product.title}" (${size}) to Garment Bag`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBespokeFitting = (productTitle?: string) => {
    if (productTitle) {
      setBespokeGarmentPref(productTitle);
    }
    handleNavigate('contact');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#ff007f] selection:text-white">
      {/* Sticky Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCollections={() => handleNavigate('collections')}
          onBookFitting={() => handleNavigate('contact')}
        />

        {/* Collections Grid & Gallery */}
        <CollectionsGrid
          products={PRODUCTS}
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddToCart={(product, size, color) => handleAddToCart(product, size, color, 1)}
        />

        {/* Runway Lookbook & Portfolio Showcase */}
        <LookbookShowcase
          onExploreGarment={(title) => {
            const found = PRODUCTS.find((p) => p.title.toLowerCase().includes(title.toLowerCase()));
            if (found) {
              setQuickViewProduct(found);
            } else {
              handleNavigate('collections');
            }
          }}
        />

        {/* About Us / Atelier Craftsmanship */}
        <AboutUs onBookFitting={() => handleNavigate('contact')} />

        {/* Bespoke Fitting & Contact Section */}
        <BespokeConsultation initialGarment={bespokeGarmentPref} />
      </main>

      {/* Footer with Prominent Social Media */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Overlays */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenBespokeFitting={handleOpenBespokeFitting}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreCollections={() => handleNavigate('collections')}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={() => {
          setCartItems([]);
          showToast('Order confirmed! Receipt sent to your email.');
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-900 border border-[#ff007f]/50 text-white text-xs font-semibold shadow-2xl shadow-pink-500/20 animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-[#ff007f] flex items-center justify-center text-white shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-[#facc15] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Bag</span>
          </button>
        </div>
      )}
    </div>
  );
}
