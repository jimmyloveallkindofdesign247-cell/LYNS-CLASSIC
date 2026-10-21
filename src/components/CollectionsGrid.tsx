import React, { useState } from 'react';
import { Product, ProductCategory } from '../types/fashion';
import { Eye, ShoppingBag, ArrowUpDown, Search, Check, Sparkles } from 'lucide-react';
import { filterProducts, SortOption } from '../utils/filter';
import { formatCurrency } from '../utils/cart';

interface CollectionsGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories: ProductCategory[] = [
    'All',
    'Evening Wear',
    'Streetwear Couture',
    'Tailored Suits',
  ];

  const filteredProducts = filterProducts(products, activeCategory, searchQuery, sortBy);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0]?.name || 'Noir';
    onAddToCart(product, defaultSize, defaultColor);

    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  const getBadgeStyle = (type: 'indigo' | 'yellow' | 'pink') => {
    switch (type) {
      case 'yellow':
        return 'bg-[#facc15] text-black font-semibold';
      case 'pink':
        return 'bg-[#ff007f] text-white font-semibold';
      case 'indigo':
      default:
        return 'bg-[#4f46e5] text-white font-semibold';
    }
  };

  return (
    <section id="collections" className="py-20 lg:py-28 bg-[#0e0e0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#facc15]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Haute Drops</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Outfit']">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#818cf8]">Collections</span>
            </h2>
            <p className="text-zinc-400 max-w-xl text-sm sm:text-base">
              Explore bespoke Evening Wear, avant-garde Streetwear Couture, and sharp Tailored Suits designed in the LYNS CLASSIC Atelier.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garments, fabrics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#ff007f] transition-colors"
            />
          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900/90 rounded-xl border border-white/10 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#4f46e5] to-[#ff007f] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-zinc-400">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <label htmlFor="sort-select" className="sr-only">
              Sort garments
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-zinc-900 border border-white/10 text-zinc-300 py-2 px-3 rounded-lg text-xs focus:outline-none focus:border-[#facc15] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-zinc-900/40 rounded-2xl border border-white/5">
            <p className="text-zinc-300 text-base">No pieces found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-white text-xs uppercase tracking-wider font-semibold hover:bg-zinc-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedProductId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => onQuickView(product)}
                  className="group relative rounded-2xl overflow-hidden bg-zinc-900/70 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-black/60"
                >
                  {/* Image Container (65% to 75% height) */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#141414]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Top Accent Badge */}
                    {product.badge && (
                      <div className="absolute top-3.5 left-3.5">
                        <span
                          className={`text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-md ${getBadgeStyle(
                            product.badge.type
                          )}`}
                        >
                          {product.badge.text}
                        </span>
                      </div>
                    )}

                    {/* Quick View Hover Trigger */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="px-4 py-2 rounded-lg bg-black/80 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 border border-white/20 shadow-xl">
                        <Eye className="w-3.5 h-3.5 text-[#facc15]" />
                        Quick View
                      </span>
                    </div>

                    {/* Available Sizes preview tag */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-zinc-300">
                      <span className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded font-mono">
                        {product.sizes.join(' · ')}
                      </span>
                    </div>
                  </div>

                  {/* Product Details Card Footer */}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-1.5">
                      {/* Unboxed Metadata: Category & Material */}
                      <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                        <span className="uppercase tracking-wider text-[#818cf8] font-mono text-[11px]">
                          {product.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{product.silhouette}</span>
                      </div>

                      {/* Product Title */}
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-zinc-100 transition-colors line-clamp-1">
                        {product.title}
                      </h3>

                      {/* Brief description */}
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Quick Add Button Row */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-mono">
                          Price
                        </span>
                        <span className="text-lg font-black text-white font-mono tabular-nums">
                          {formatCurrency(product.price)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-zinc-800 hover:bg-[#ff007f] text-zinc-100 hover:text-white border border-white/10 hover:border-transparent'
                        }`}
                        aria-label={`Quick add ${product.title} to bag`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#facc15]" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
