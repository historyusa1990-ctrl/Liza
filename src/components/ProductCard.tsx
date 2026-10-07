import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const hasSecondImage = product.images.length > 1;
  const displayImage = isHovered && hasSecondImage ? product.images[1] : product.images[0];

  const handleCardClick = () => {
    navigateTo('product', product.slug);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, product.variants?.[0], true);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] sm:aspect-square bg-slate-50 overflow-hidden">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discount && (
            <span className="bg-amber-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md shadow-sm">
              {product.discount}
            </span>
          )}
          {product.stock <= 15 && (
            <span className="bg-slate-900/90 text-white text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded backdrop-blur-sm">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlistClick}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 flex items-center justify-center shadow-sm backdrop-blur-sm transition-all z-10"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              inWishlist ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
            }`} 
          />
        </button>

        {/* Quick Add Overlay on desktop hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-slate-800 tabular-nums">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div className="mt-3 pt-2.5 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-slate-950 tabular-nums">
              AED {product.price}
            </span>
            {product.compareAtPrice > product.price && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                AED {product.compareAtPrice}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            aria-label="Add to Cart"
            className="sm:hidden w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
