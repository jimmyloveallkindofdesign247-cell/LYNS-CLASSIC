import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Ruler, Globe } from 'lucide-react';

interface HeroProps {
  onExploreCollections: () => void;
  onBookFitting: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollections, onBookFitting }) => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden bg-dark-gradient"
    >
      {/* Subtle ambient lighting glows (Indigo & Hot Pink) */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-24 w-96 h-96 rounded-full bg-[#ff007f]/15 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-yellow-400/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Top brand kicker */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs text-zinc-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#facc15]" />
              <span className="tracking-widest uppercase font-mono text-[11px] text-zinc-300">
                Autumn / Winter Haute Capsule
              </span>
              <span className="text-zinc-600" aria-hidden="true">/</span>
              <span className="text-[#ff007f] font-semibold">Atelier Edition</span>
            </div>

            {/* Bold Headline: Redefining Modern Elegance */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] text-balance font-['Outfit']">
              Redefining <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                Modern
              </span>{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] via-[#ff007f] to-[#facc15]">
                  Elegance
                </span>
                <span
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#4f46e5] via-[#ff007f] to-[#facc15] rounded-full"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Where high-precision bespoke tailoring converges with avant-garde streetwear couture. 
              Crafted in limited atelier drops for those who demand uncompromising silhouette, tactile mastery, and bold identity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreCollections}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[#4f46e5] via-[#ff007f] to-[#ff007f] hover:from-[#4338ca] hover:to-[#e11d48] transition-all duration-300 shadow-xl shadow-pink-500/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onBookFitting}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm uppercase tracking-wider text-zinc-200 hover:text-white bg-zinc-900/80 hover:bg-zinc-800/90 border border-white/15 hover:border-yellow-400/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Ruler className="w-4 h-4 text-[#facc15]" />
                <span>Book Bespoke Fitting</span>
              </button>
            </div>

            {/* Trust Markers Strip */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% In-House Atelier Craftsmanship</span>
              </div>
              <span className="text-zinc-700 hidden sm:inline" aria-hidden="true">•</span>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#facc15]" />
                <span>Italian & Japanese Luxury Textiles</span>
              </div>
              <span className="text-zinc-700 hidden sm:inline" aria-hidden="true">•</span>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>Worldwide White-Glove Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gradient frame */}
              <div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-[#4f46e5]/40 via-[#ff007f]/30 to-[#facc15]/30 blur-sm opacity-70 transition-opacity"
                aria-hidden="true"
              />

              <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 shadow-2xl">
                <img
                  src="/src/assets/images/hero_fashion_editorial_1792577338548.jpg"
                  alt="LYNS CLASSIC Avant-Garde Tailored Jacket Editorial"
                  className="w-full h-[440px] sm:h-[520px] lg:h-[560px] object-cover object-top transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent pointer-events-none" />

                {/* Floating Fashion Badge */}
                <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#ff007f]" />
                  <span>Runway Look 01</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#121212]/90 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#facc15] font-mono font-semibold">
                        Aura Harness Blazer
                      </p>
                      <h2 className="text-white text-base font-bold">Sculptural Midnight Collection</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-400 font-mono">Bespoke</p>
                      <p className="text-lg font-bold text-white font-mono tabular-nums">$780</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-1 border-t border-white/5">
                    <span>French Satin · Leather Harness</span>
                    <button
                      onClick={onExploreCollections}
                      className="text-[#ff007f] hover:text-pink-300 font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      View Piece <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
