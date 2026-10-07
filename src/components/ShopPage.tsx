import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  Star, 
  Search, 
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_CATEGORIES } from '../data/categories';
import { ProductCard } from './ProductCard';

export const ShopPage: React.FC = () => {
  const { products, categoryFilter, setCategoryFilter } = useShop();

  const [sortOption, setSortOption] = useState<'featured' | 'newest' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'all');
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync category filter if changed from outside
  React.useEffect(() => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
  }, [categoryFilter]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setCategoryFilter(null);
    setMaxPrice(250);
    setMinRating(0);
    setOnlyInStock(false);
    setOnlyDiscounted(false);
    setSearchFilter('');
    setSortOption('featured');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'all') {
        const catSlug = p.category.toLowerCase().replace(/\s+/g, '-');
        if (selectedCategory === 'new-arrivals') {
          if (!p.isNewArrival) return false;
        } else if (selectedCategory === 'best-sellers') {
          if (!p.isBestSeller) return false;
        } else if (catSlug !== selectedCategory && !p.category.toLowerCase().includes(selectedCategory.replace(/-/g, ' '))) {
          return false;
        }
      }

      // Price filter
      if (p.price > maxPrice) return false;

      // Rating filter
      if (p.rating < minRating) return false;

      // Stock
      if (onlyInStock && p.stock <= 0) return false;

      // Discounted
      if (onlyDiscounted && (!p.discount || p.discount === '')) return false;

      // Search
      if (searchFilter.trim() !== '') {
        const term = searchFilter.toLowerCase();
        const match = 
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.tags.some(t => t.toLowerCase().includes(term));
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, maxPrice, minRating, onlyInStock, onlyDiscounted, searchFilter, sortOption]);

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) +
    (maxPrice < 250 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlyDiscounted ? 1 : 0) +
    (searchFilter ? 1 : 0);

  return (
    <div className="bg-slate-50/40 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              UAE Store Catalog
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              All Products
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore useful, tested products with Cash on Delivery across the UAE.
            </p>
          </div>

          {/* Search and Sort controls */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            {/* Inline search */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Filter by keyword..."
                className="pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 w-full sm:w-56"
              />
            </div>

            {/* Mobile Filter toggle button */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 bg-white border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value as typeof sortOption)}
                className="text-xs sm:text-sm font-semibold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filter (Desktop) + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (Lg: 3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-slate-400 hover:text-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                Category
              </span>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => { setSelectedCategory('all'); setCategoryFilter(null); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {STORE_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.slug); setCategoryFilter(cat.slug); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] opacity-75">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Max Price
                </span>
                <span className="text-xs font-bold text-slate-900 tabular-nums">
                  AED {maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="250"
                step="5"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>AED 40</span>
                <span>AED 250</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Minimum Rating
              </span>
              <div className="space-y-1">
                {[0, 4.5, 4.8].map(r => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-2 ${
                      minRating === r ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {r === 0 ? (
                      <span>All Ratings</span>
                    ) : (
                      <>
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{r} Stars & Above</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>In Stock only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={onlyDiscounted}
                  onChange={e => setOnlyDiscounted(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span>On Sale / Discounted</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area (Lg: 9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Results count & active tags */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>

              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No matching products found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your price range, selected category, or search term.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Filter Products</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Category */}
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-2">Category</span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => { setSelectedCategory('all'); setCategoryFilter(null); }}
                  className={`p-2 rounded-xl text-left border ${
                    selectedCategory === 'all' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  All Products
                </button>
                {STORE_CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedCategory(c.slug); setCategoryFilter(c.slug); }}
                    className={`p-2 rounded-xl text-left border text-xs truncate ${
                      selectedCategory === c.slug ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-slate-800">Max Price:</span>
                <span className="font-mono font-bold text-slate-900">AED {maxPrice}</span>
              </div>
              <input
                type="range"
                min="40"
                max="250"
                step="5"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-slate-900"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
