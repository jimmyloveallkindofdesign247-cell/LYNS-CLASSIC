import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#0a0a0a] to-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            aria-label="LYNS CLASSIC Fashion Hub Home"
          >
            <div className="w-8 h-8 rounded-sm bg-gradient-to-tr from-[#4f46e5] via-[#ff007f] to-[#facc15] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center font-bold text-xs tracking-widest text-white">
                LC
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-zinc-200 transition-colors uppercase font-['Outfit'] whitespace-nowrap">
                LYNS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-300">CLASSIC</span>
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => handleNavClick('home')}
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#ff007f] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#facc15] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap cursor-pointer"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('lookbook')}
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#6366f1] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap cursor-pointer"
            >
              Portfolio & Runway
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#ff007f] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap cursor-pointer"
            >
              About Atelier
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-zinc-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#facc15] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap cursor-pointer"
            >
              Bespoke Fitting
            </button>
          </nav>

          {/* Zone 3: Primary Action + Shopping Bag */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Bag Icon Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-zinc-900/80 border border-white/10 hover:border-white/25 text-zinc-200 hover:text-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#ff007f]"
              aria-label={`View cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-[#ff007f] text-white text-[11px] font-bold rounded-full flex items-center justify-center font-mono shadow-lg shadow-[#ff007f]/40 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Shop Now Accent Button */}
            <button
              onClick={() => handleNavClick('collections')}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#4f46e5] via-[#ff007f] to-[#ff007f] hover:from-[#4338ca] hover:to-[#e11d48] transition-all duration-300 shadow-md shadow-indigo-500/20 hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
            >
              Shop Now
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-base font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 text-zinc-200 hover:text-white transition-colors border-b border-white/5 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className="text-left py-2 text-zinc-200 hover:text-white transition-colors border-b border-white/5 cursor-pointer flex items-center justify-between"
            >
              <span>Collections</span>
              <span className="text-xs text-[#facc15] font-mono">Evening / Streetwear / Suits</span>
            </button>
            <button
              onClick={() => handleNavClick('lookbook')}
              className="text-left py-2 text-zinc-200 hover:text-white transition-colors border-b border-white/5 cursor-pointer"
            >
              Portfolio & Runway
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 text-zinc-200 hover:text-white transition-colors border-b border-white/5 cursor-pointer"
            >
              About Atelier
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 text-zinc-200 hover:text-white transition-colors border-b border-white/5 cursor-pointer"
            >
              Bespoke Fitting & Contact
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('collections')}
              className="w-full py-3 px-4 rounded-lg text-center text-sm uppercase tracking-wider font-bold text-white bg-gradient-to-r from-[#4f46e5] via-[#ff007f] to-[#ff007f] cursor-pointer"
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
