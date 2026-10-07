import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_CATEGORIES } from '../data/categories';

export const Header: React.FC = () => {
  const { 
    storeConfig, 
    cartItemCount, 
    wishlist, 
    navigateTo, 
    currentView, 
    setIsSearchOpen, 
    setIsCartDrawerOpen,
    setIsConfigDrawerOpen,
    categoryFilter
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'shop' | 'about', catSlug?: string) => {
    navigateTo(view, undefined, catSlug);
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      {/* Announcement Bar */}
      {storeConfig.announcementText && (
        <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center justify-center gap-2 mx-auto tracking-wide font-medium">
              <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{storeConfig.announcementText}</span>
              <span className="hidden sm:inline text-slate-400">·</span>
              <span className="hidden sm:inline text-amber-400 font-semibold">CASH ON DELIVERY AVAILABLE</span>
            </div>
            
            {/* Store config trigger for quick preview/demo */}
            <button 
              onClick={() => setIsConfigDrawerOpen(true)}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors ml-2 shrink-0"
              title="Store Configuration (WhatsApp, Announcement, Fees)"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden md:inline">Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Top Navigation Bar (Strict 3-zone contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Brand Wordmark & Icon */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg sm:text-xl tracking-tighter shadow-sm group-hover:bg-amber-600 transition-colors">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                  {storeConfig.brandName}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button 
              onClick={() => handleNavClick('home')}
              className={`hover:text-slate-900 transition-colors py-1 ${currentView === 'home' ? 'text-slate-950 font-semibold border-b-2 border-slate-900' : ''}`}
            >
              Home
            </button>

            <button 
              onClick={() => handleNavClick('shop')}
              className={`hover:text-slate-900 transition-colors py-1 ${currentView === 'shop' && !categoryFilter ? 'text-slate-950 font-semibold border-b-2 border-slate-900' : ''}`}
            >
              Shop
            </button>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                className="hover:text-slate-900 transition-colors py-1 flex items-center gap-1"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:rotate-180" />
              </button>

              <div 
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
                className={`absolute left-0 top-full pt-2 w-72 transition-all duration-200 ${
                  categoriesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 py-3 grid gap-1">
                  {STORE_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleNavClick('shop', cat.slug)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors text-left"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] text-slate-400">{cat.itemCount} items</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleNavClick('shop', 'new-arrivals')}
              className="hover:text-slate-900 transition-colors py-1"
            >
              New Arrivals
            </button>

            <button 
              onClick={() => handleNavClick('shop', 'best-sellers')}
              className="hover:text-slate-900 transition-colors py-1 flex items-center gap-1"
            >
              <span>Best Sellers</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            </button>

            <button 
              onClick={() => handleNavClick('about')}
              className={`hover:text-slate-900 transition-colors py-1 ${currentView === 'about' ? 'text-slate-950 font-semibold border-b-2 border-slate-900' : ''}`}
            >
              About Us
            </button>
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className="p-2 sm:p-2.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('wishlist')}
              aria-label="Wishlist"
              className="relative p-2 sm:p-2.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-colors hidden sm:flex"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 sm:p-2.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-colors flex items-center"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-slate-900 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-sm tabular-nums">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-slate-700 hover:text-slate-950 rounded-lg lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1 text-base font-medium text-slate-800">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              All Products
            </button>
            
            <div className="border-t border-slate-100 my-1 pt-1">
              <span className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Categories</span>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {STORE_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleNavClick('shop', cat.slug)}
                    className="text-left px-3 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 my-1 pt-1">
              <button
                onClick={() => handleNavClick('about')}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                About BITUINE Dubai
              </button>
              <button
                onClick={() => {
                  navigateTo('track-order');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-amber-700 font-semibold flex items-center justify-between"
              >
                <span>Track UAE Order</span>
                <Truck className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
