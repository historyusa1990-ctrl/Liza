import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, toggleWishlist, navigateTo } = useShop();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Saved Items
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Wishlist ({wishlist.length})
            </h1>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto">
            <div className="w-14 h-14 bg-rose-50 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Your wishlist is empty</h3>
            <p className="text-xs text-slate-500 mt-1">
              Tap the heart icon on any product to save it here for later.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {wishlistProducts.map(product => (
                <div 
                  key={product.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Left Product Image & Title */}
                  <div 
                    onClick={() => navigateTo('product', product.slug)}
                    className="flex items-center gap-4 cursor-pointer flex-1 min-w-0"
                  >
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {product.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-extrabold text-slate-950 tabular-nums">
                          AED {product.price}
                        </span>
                        {product.compareAtPrice > product.price && (
                          <span className="text-xs text-slate-400 line-through tabular-nums">
                            AED {product.compareAtPrice}
                          </span>
                        )}
                        <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          In Stock ({product.stock} left)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <button
                      onClick={() => addToCart(product, 1, product.variants?.[0], true)}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2.5 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-slate-100 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
