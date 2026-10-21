import React, { useState } from 'react';
import { Sparkles, ArrowRight, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface LookbookItem {
  id: string;
  season: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  accent: 'indigo' | 'yellow' | 'pink';
  quote: string;
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    season: 'Autumn/Winter Capsule 01',
    title: 'The Nocturne Empress',
    subtitle: 'Haute Couture Evening Wear',
    category: 'Runway Look 01',
    image: '/src/assets/images/collection_evening_wear_1792577339344.jpg',
    accent: 'pink',
    quote: 'Silk velvet fluid draped silhouette engineered for cinematic presence under gallery spotlight.',
  },
  {
    id: 'look-2',
    season: 'Autumn/Winter Capsule 02',
    title: 'Kinetic Brutalism Trench',
    subtitle: 'Streetwear Couture',
    category: 'Runway Look 02',
    image: '/src/assets/images/collection_streetwear_couture_1792577340670.jpg',
    accent: 'yellow',
    quote: 'Oversized virgin wool structured with tactical webbing and electric yellow chromatic impact.',
  },
  {
    id: 'look-3',
    season: 'Autumn/Winter Capsule 03',
    title: 'The Sovereign Peak Suit',
    subtitle: 'Bespoke Tailoring',
    category: 'Runway Look 03',
    image: '/src/assets/images/collection_tailored_suits_1792577341542.jpg',
    accent: 'indigo',
    quote: 'Super 150s charcoal double-breasted block calibrated to anatomical precision.',
  },
  {
    id: 'look-4',
    season: 'Autumn/Winter Capsule 04',
    title: 'Aura Peplum Harness',
    subtitle: 'Avant-Garde Tailoring',
    category: 'Runway Look 04',
    image: '/src/assets/images/hero_fashion_editorial_1792577338548.jpg',
    accent: 'pink',
    quote: 'Exaggerated sharp geometric shoulders with an asymmetric leather cinching framework.',
  },
];

interface LookbookShowcaseProps {
  onExploreGarment: (title: string) => void;
}

export const LookbookShowcase: React.FC<LookbookShowcaseProps> = ({ onExploreGarment }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = LOOKBOOK_ITEMS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? LOOKBOOK_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === LOOKBOOK_ITEMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="lookbook" className="py-24 bg-[#0a0a0a] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#818cf8]">
              <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
              <span>Editorial Lookbook & Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-2 font-['Outfit']">
              Runway <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#ff007f]">Exhibition</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              {String(currentIndex + 1).padStart(2, '0')} / {String(LOOKBOOK_ITEMS.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/30 text-white transition-colors cursor-pointer"
                aria-label="Previous runway look"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/30 text-white transition-colors cursor-pointer"
                aria-label="Next runway look"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Runway Slide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/40 rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          {/* Main Visual */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-950">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-top transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-sm text-xs font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#facc15] border border-white/10">
                {current.category}
              </span>
            </div>
          </div>

          {/* Editorial Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                {current.season}
              </p>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {current.title}
              </h3>
              <p className="text-sm text-[#ff007f] font-mono font-semibold">
                {current.subtitle}
              </p>
            </div>

            <blockquote className="border-l-2 border-[#facc15] pl-4 italic text-zinc-300 text-base sm:text-lg">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onExploreGarment(current.title)}
                className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs uppercase font-bold tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Piece in Catalog</span>
              </button>

              {/* Thumbnails row */}
              <div className="flex items-center gap-2.5">
                {LOOKBOOK_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-12 h-14 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'border-[#ff007f] ring-2 ring-[#ff007f]/40 scale-105'
                        : 'border-white/10 opacity-50 hover:opacity-100'
                    }`}
                    aria-label={`View ${item.title}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
