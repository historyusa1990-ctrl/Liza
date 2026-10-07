import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  Sparkles, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShippingFee, 
    cartTotal, 
    storeConfig, 
    updateCartQuantity, 
    removeFromCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    navigateTo 
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const freeDeliveryProgress = Math.min(100, (cartSubtotal / storeConfig.freeShippingThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, storeConfig.freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="bg-slate-50/50 min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 max-w-md w-full text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Your cart is waiting for something great.</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Discover our curated home organizers, kitchen essentials, and charging accessories with fast Cash on Delivery.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
          >
            START SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Review Items
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shopping Cart ({cart.length})
            </h1>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Free Shipping Alert Banner */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-800 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600" />
              {remainingForFreeDelivery === 0 ? (
                <span className="text-emerald-700 font-bold">🎉 Congratulations! You qualify for FREE UAE Delivery</span>
              ) : (
                <span>
                  Add <strong className="text-slate-900 font-bold">AED {remainingForFreeDelivery}</strong> more to get <strong>FREE UAE Delivery</strong>
                </span>
              )}
            </span>
            <span className="font-bold text-slate-700">{Math.round(freeDeliveryProgress)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                remainingForFreeDelivery === 0 ? 'bg-emerald-500' : 'bg-slate-900'
              }`}
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Table / Cards (Lg: 8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {cart.map((item, idx) => (
                <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left: Product Info */}
                  <div 
                    onClick={() => navigateTo('product', item.product.slug)}
                    className="flex items-center gap-4 cursor-pointer flex-1 min-w-0"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {item.product.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate hover:text-amber-600 transition-colors">
                        {item.product.name}
                      </h3>
                      {item.selectedVariant && (
                        <span className="text-xs text-slate-500 block mt-0.5">
                          Variant: {item.selectedVariant.name}
                        </span>
                      )}
                      <span className="text-xs font-extrabold text-slate-950 mt-1 block tabular-nums">
                        AED {item.product.price} each
                      </span>
                    </div>
                  </div>

                  {/* Right: Quantity Stepper & Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                        className="p-1.5 text-slate-600 hover:text-slate-950 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                        className="p-1.5 text-slate-600 hover:text-slate-950 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
                        AED {item.product.price * item.quantity}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary & Checkout (Lg: 4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
            <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            {/* Coupon field */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl uppercase focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Apply
                </button>
              </div>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs px-3 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
                <span className="font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Code '{appliedCoupon.code}' ({appliedCoupon.discountPercentage}% OFF)
                </span>
                <button onClick={removeCoupon} className="text-rose-600 font-bold hover:underline">
                  Remove
                </button>
              </div>
            )}

            {/* Calculation rows */}
            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 tabular-nums">AED {cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-bold tabular-nums">-AED {cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>UAE Delivery</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {cartShippingFee === 0 ? 'FREE' : `AED ${cartShippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                <span>Estimated Total</span>
                <span className="tabular-nums">AED {cartTotal}</span>
              </div>
            </div>

            {/* UAE Delivery notice */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-600 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>🚚 UAE Delivery Available across all 7 Emirates</span>
            </div>

            {/* Checkout buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => navigateTo('checkout')}
                className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('shop')}
                className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 text-center transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
