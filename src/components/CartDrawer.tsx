import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    storeConfig,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeDeliveryProgress = Math.min(100, (cartSubtotal / storeConfig.freeShippingThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, storeConfig.freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div 
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
          role="dialog"
          aria-labelledby="cart-drawer-title"
        >
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 id="cart-drawer-title" className="font-bold text-slate-900 text-base">Your Cart</h3>
                <span className="text-xs text-slate-500 tabular-nums">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-slate-700 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                {remainingForFreeDelivery === 0 ? (
                  <span className="text-emerald-700 font-semibold">🎉 You have unlocked FREE UAE Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-slate-900 font-bold tabular-nums">AED {remainingForFreeDelivery}</strong> more for <strong>FREE UAE Delivery</strong>
                  </span>
                )}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
                {Math.round(freeDeliveryProgress)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  remainingForFreeDelivery === 0 ? 'bg-emerald-500' : 'bg-slate-900'
                }`}
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Your cart is waiting for something great</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Discover our trending UAE home organizers and smart gadgets with cash on delivery.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-6 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div 
                  key={`${item.product.id}-${item.selectedVariant?.id || 'default'}-${index}`}
                  className="flex gap-3.5 pb-4 border-b border-slate-100 last:border-b-0"
                >
                  {/* Thumbnail */}
                  <div 
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigateTo('product', item.product.slug);
                    }}
                    className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 cursor-pointer"
                  >
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            navigateTo('product', item.product.slug);
                          }}
                          className="text-xs sm:text-sm font-semibold text-slate-900 truncate hover:text-amber-600 cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          Variant: {item.selectedVariant.name}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                          className="p-1 sm:p-1.5 text-slate-600 hover:text-slate-950 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                          className="p-1 sm:p-1.5 text-slate-600 hover:text-slate-950 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 tabular-nums">
                          AED {item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 space-y-3.5">
              
              {/* Coupon Field */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  placeholder="Coupon code (try BITUINE10)"
                  className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none uppercase bg-white"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200/60">
                  <span className="font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    Coupon '{appliedCoupon.code}' ({appliedCoupon.discountPercentage}% OFF)
                  </span>
                  <button 
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 font-semibold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Calculations breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 tabular-nums">AED {cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-semibold tabular-nums">-AED {cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>UAE Delivery</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {cartShippingFee === 0 ? 'FREE' : `AED ${cartShippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="tabular-nums">AED {cartTotal}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="text-[11px] text-slate-500 flex items-center justify-center gap-2 pt-1 font-medium">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                <span>Fast UAE Delivery · Cash on Delivery</span>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all active:scale-[0.99]"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 text-center transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
