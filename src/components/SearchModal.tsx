import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateTo, addToCart } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const quickPills = ['Organizer', 'Wireless', 'Kitchen', 'Dispenser', 'Facial', 'Dubai Bestseller'];

  const results = searchTerm.trim() === '' ? [] : products.filter(p => {
    const term = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.subcategory.toLowerCase().includes(term) ||
      p.sku.toLowerCase().includes(term) ||
      p.tags.some(t => t.toLowerCase().includes(term)) ||
      p.shortDescription.toLowerCase().includes(term)
    );
  });

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    navigateTo('product', slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[80vh]"
        role="dialog"
        aria-labelledby="search-modal-title"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search products by name, category, SKU, or keyword..."
            className="w-full text-base sm:text-lg placeholder:text-slate-400 text-slate-900 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Instant Suggestions or Results */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {searchTerm.trim() === '' ? (
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                Trending Searches in UAE
              </span>
              <div className="flex flex-wrap gap-2">
                {quickPills.map(pill => (
                  <button
                    key={pill}
                    onClick={() => setSearchTerm(pill)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-xl border border-slate-200/60 transition-colors"
                  >
                    <Tag className="w-3 h-3 text-slate-400" />
                    <span>{pill}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                  Popular Categories
                </span>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <button
                    onClick={() => { setIsSearchOpen(false); navigateTo('shop', undefined, 'home-kitchen'); }}
                    className="text-left p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between transition-colors"
                  >
                    <span>Home & Kitchen</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                  <button
                    onClick={() => { setIsSearchOpen(false); navigateTo('shop', undefined, 'electronics-gadgets'); }}
                    className="text-left p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between transition-colors"
                  >
                    <span>Electronics & Gadgets</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {results.length} {results.length === 1 ? 'Result' : 'Results'} found
                </span>
                <button
                  onClick={() => { setIsSearchOpen(false); navigateTo('shop'); }}
                  className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                >
                  View all in Shop →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {results.map(prod => (
                  <div
                    key={prod.id}
                    className="py-3 flex items-center justify-between gap-4 group"
                  >
                    <div 
                      onClick={() => handleSelectProduct(prod.slug)}
                      className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                        <img 
                          src={prod.images[0]} 
                          alt={prod.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                          {prod.category}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-amber-600 transition-colors">
                          {prod.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-slate-950 tabular-nums">
                            AED {prod.price}
                          </span>
                          <span className="text-[11px] text-slate-400 line-through tabular-nums">
                            AED {prod.compareAtPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(prod, 1, undefined, true)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-base font-semibold text-slate-800">No products found matching "{searchTerm}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "organizer", "dispenser", or "charger"</p>
              <button
                onClick={() => { setIsSearchOpen(false); navigateTo('shop'); }}
                className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
              >
                Browse All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
