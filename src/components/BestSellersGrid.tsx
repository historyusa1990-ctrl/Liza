import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const BestSellersGrid: React.FC = () => {
  const { products, navigateTo } = useShop();

  // Take the first 4 products for desktop 4-per-row grid
  const bestSellers = products.slice(0, 4);

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Best Sellers
            </h2>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="mt-2 sm:mt-0 text-xs sm:text-sm font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View All ({products.length} Products)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Grid: 4 desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
