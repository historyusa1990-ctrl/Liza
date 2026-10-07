import React from 'react';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const MobileBottomNav: React.FC = () => {
  const { 
    currentView, 
    navigateTo, 
    setIsSearchOpen, 
    setIsCartDrawerOpen, 
    cartItemCount, 
    wishlist 
  } = useShop();

  // If in full checkout view, hide bottom nav to minimize distraction and give max space for form inputs
  if (currentView === 'checkout') {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentView === 'home' ? 'text-slate-950 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => navigateTo('shop')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentView === 'shop' ? 'text-slate-950 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Shop</span>
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => navigateTo('wishlist')}
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            currentView === 'wishlist' ? 'text-slate-950 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-amber-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px]">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-slate-950 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm tabular-nums">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Cart</span>
        </button>

      </div>
    </div>
  );
};
