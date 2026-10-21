import React from 'react';
import { Scissors, Sparkles, Feather, Compass, CheckCircle2 } from 'lucide-react';

interface AboutUsProps {
  onBookFitting: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onBookFitting }) => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-dark-gradient relative overflow-hidden">
      {/* Background radial accent glow */}
      <div
        className="absolute top-1/2 -right-40 w-96 h-96 bg-[#4f46e5]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Atelier Craftsmanship Media */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 shadow-2xl">
              <img
                src="/src/assets/images/about_atelier_craftsmanship_1792577341043.jpg"
                alt="LYNS CLASSIC Master Tailor Working at the Cutting Table"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent pointer-events-none" />

              {/* Floating Stat Overlay */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-mono text-[#facc15] uppercase tracking-wider">
                    Precision Heritage
                  </p>
                  <p className="text-white text-sm font-bold">Over 48 Hours Per Garment</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-[#ff007f]">
                  <Scissors className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Accent Border Badge */}
            <div className="hidden sm:flex absolute -top-4 -left-4 px-4 py-2 rounded-xl bg-[#4f46e5] text-white text-xs font-bold tracking-wider uppercase items-center gap-1.5 shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
              <span>Bespoke Atelier</span>
            </div>
          </div>

          {/* Right Column: Brand Story & Craftsmanship Pillars */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ff007f]">
                <FeastIcon />
                <span>The Brand Story</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
                Crafting Confidence Through <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#facc15]">
                  Unapologetic Tailoring
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                Founded on the premise that true modern luxury must be fearless, <strong className="text-white font-semibold">LYNS CLASSIC Fashion Hub</strong> bridges the rarefied discipline of savile-row tailoring with the energetic pulse of international streetwear couture.
              </p>
              <p>
                Every silhouette is drafted from original anatomical blocks, hand-cut from ethically sourced European wools and Japanese technical silks, and constructed to command every room you enter. We do not mass-produce; we build wearable sculpture.
              </p>
            </div>

            {/* Three Craftsmanship Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Scissors className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Unique Tailoring</h3>
                <p className="text-xs text-zinc-400">
                  Anatomical draping and sharp geometric shoulder lines calibrated for poise and dynamic ease.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 text-[#ff007f] flex items-center justify-center">
                  <Feather className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Rare Textiles</h3>
                <p className="text-xs text-zinc-400">
                  Custom-milled Super 150s Merino wools, heavy silk charmeuse, and waterproof bonded twills.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-[#facc15] flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Bold Modern Style</h3>
                <p className="text-xs text-zinc-400">
                  High-fashion dark aesthetic punctuated by strategic electric accents and modular accessories.
                </p>
              </div>
            </div>

            {/* Private Fitting Button */}
            <div className="pt-2">
              <button
                onClick={onBookFitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 hover:border-yellow-400/40 text-white text-xs uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-[#facc15]" />
                <span>Schedule a Private Atelier Fitting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeastIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);
