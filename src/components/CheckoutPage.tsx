import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Banknote, 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  Check, 
  MapPin, 
  AlertCircle,
  Apple
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { UAE_EMIRATES, EMIRATE_DELIVERY_NOTES } from '../data/storeConfig';
import { CheckoutFormData, UAEEmirate } from '../data/types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShippingFee, 
    cartTotal, 
    storeConfig, 
    appliedCoupon, 
    placeOrder, 
    navigateTo,
    addToast
  } = useShop();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    mobile: '',
    email: '',
    emirate: 'Dubai',
    city: 'Dubai',
    area: '',
    buildingVilla: '',
    apartmentFlat: '',
    street: '',
    notes: '',
    deliveryMethod: 'standard',
    paymentMethod: 'cod',
    couponCode: appliedCoupon?.code || '',
    cardDetails: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // If cart is empty, redirect or display notice
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Truck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500">
            Add items to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const shippingCost = formData.deliveryMethod === 'express' ? storeConfig.expressShippingFee : cartShippingFee;
  const finalOrderTotal = Math.max(0, cartSubtotal - cartDiscount + shippingCost);

  const handleInputChange = (field: keyof CheckoutFormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleCardChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      cardDetails: {
        ...prev.cardDetails!,
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.mobile.trim()) {
      errors.mobile = 'UAE mobile number is required';
    } else if (!/^[0-9+ ]{7,15}$/.test(formData.mobile.trim())) {
      errors.mobile = 'Please enter a valid mobile number (+971 50 xxx xxxx)';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Valid email is required for receipt';
    }
    if (!formData.area.trim()) errors.area = 'Area/District is required (e.g. Dubai Marina, Al Barsha)';
    if (!formData.buildingVilla.trim()) errors.buildingVilla = 'Building or Villa name is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardDetails?.cardNumber || formData.cardDetails.cardNumber.length < 15) {
        errors.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.cardDetails?.expiryDate) errors.expiryDate = 'Expiry required (MM/YY)';
      if (!formData.cardDetails?.cvv || formData.cardDetails.cvv.length < 3) errors.cvv = 'CVV required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast('Please complete required shipping fields', 'warning');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    // Simulate secure order token processing
    setTimeout(() => {
      placeOrder(formData);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation & header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigateTo('cart')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Secure UAE Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Checkout Form (Lg: 7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Contact Information */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={e => handleInputChange('fullName', e.target.value)}
                      placeholder="e.g. Tariq Al Mansoori"
                      className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                        formErrors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                    />
                    {formErrors.fullName && <p className="text-[11px] text-rose-500 mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      UAE Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                        +971
                      </span>
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={e => handleInputChange('mobile', e.target.value)}
                        placeholder="50 123 4567"
                        className={`w-full text-sm pl-14 pr-3.5 py-2.5 rounded-xl border ${
                          formErrors.mobile ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                        } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                      />
                    </div>
                    {formErrors.mobile && <p className="text-[11px] text-rose-500 mt-1">{formErrors.mobile}</p>}
                    <p className="text-[10px] text-slate-400 mt-1">For delivery driver dispatch call & SMS update.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      placeholder="tariq@example.ae"
                      className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                        formErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                    />
                    {formErrors.email && <p className="text-[11px] text-rose-500 mt-1">{formErrors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Step 2: UAE Delivery Address */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    UAE Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Emirate *
                    </label>
                    <select
                      value={formData.emirate}
                      onChange={e => {
                        const em = e.target.value as UAEEmirate;
                        handleInputChange('emirate', em);
                        handleInputChange('city', em);
                      }}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    >
                      {UAE_EMIRATES.map(em => (
                        <option key={em} value={em}>{em}</option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-400 mt-1">{EMIRATE_DELIVERY_NOTES[formData.emirate]}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Area / Community *
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={e => handleInputChange('area', e.target.value)}
                      placeholder="e.g. Dubai Marina / Downtown / JVC"
                      className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                        formErrors.area ? 'border-rose-400' : 'border-slate-200'
                      } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                    />
                    {formErrors.area && <p className="text-[11px] text-rose-500 mt-1">{formErrors.area}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Building / Villa Name *
                    </label>
                    <input
                      type="text"
                      value={formData.buildingVilla}
                      onChange={e => handleInputChange('buildingVilla', e.target.value)}
                      placeholder="e.g. Princess Tower / Villa 42"
                      className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                        formErrors.buildingVilla ? 'border-rose-400' : 'border-slate-200'
                      } focus:outline-none focus:ring-2 focus:ring-slate-900`}
                    />
                    {formErrors.buildingVilla && <p className="text-[11px] text-rose-500 mt-1">{formErrors.buildingVilla}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Apartment / Flat / Unit #
                    </label>
                    <input
                      type="text"
                      value={formData.apartmentFlat}
                      onChange={e => handleInputChange('apartmentFlat', e.target.value)}
                      placeholder="e.g. Apt 1403"
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Name
                    </label>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={e => handleInputChange('street', e.target.value)}
                      placeholder="e.g. King Salman Bin Abdulaziz Al Saud St"
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Driver Delivery Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={e => handleInputChange('notes', e.target.value)}
                      placeholder="e.g. Please call before arriving or leave with concierge desk"
                      className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Delivery Speed Option */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    Delivery Speed
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label 
                    onClick={() => handleInputChange('deliveryMethod', 'standard')}
                    className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.deliveryMethod === 'standard'
                        ? 'border-slate-900 bg-slate-50/80 shadow-sm ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">Standard UAE Delivery</span>
                        <span className="text-xs text-slate-500 mt-0.5 block">
                          {cartSubtotal >= storeConfig.freeShippingThreshold ? 'Free on orders above AED 100' : '1–2 business days'}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        {cartShippingFee === 0 ? 'FREE' : `AED ${storeConfig.standardShippingFee}`}
                      </span>
                    </div>
                  </label>

                  <label 
                    onClick={() => handleInputChange('deliveryMethod', 'express')}
                    className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.deliveryMethod === 'express'
                        ? 'border-slate-900 bg-slate-50/80 shadow-sm ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-sm text-slate-900 block flex items-center gap-1.5">
                          <span>Express Same-Day Priority</span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">Fast</span>
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5 block">
                          Priority dispatch within hours in Dubai/Sharjah
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        AED {storeConfig.expressShippingFee}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 4: Payment Method */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    4
                  </div>
                  <h2 className="text-base font-bold text-slate-900">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <div 
                    onClick={() => handleInputChange('paymentMethod', 'cod')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50/30 ring-1 ring-emerald-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center">
                          <Banknote className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">
                            Cash on Delivery (COD)
                          </span>
                          <span className="text-xs text-slate-500">
                            Pay in cash or card to the courier when your order arrives.
                          </span>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                        {formData.paymentMethod === 'cod' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Credit / Debit Card */}
                  <div 
                    onClick={() => handleInputChange('paymentMethod', 'card')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-slate-900 bg-slate-50/50 ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">
                            Credit / Debit Card (Visa, MasterCard)
                          </span>
                          <span className="text-xs text-slate-500">
                            Encrypted 3D-Secure payment gateway.
                          </span>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center">
                        {formData.paymentMethod === 'card' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                        )}
                      </div>
                    </div>

                    {/* Expandable Mock Secure Card fields */}
                    {formData.paymentMethod === 'card' && (
                      <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-3 animate-in fade-in">
                        <div className="col-span-2">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            maxLength={19}
                            value={formData.cardDetails?.cardNumber}
                            onChange={e => handleCardChange('cardNumber', e.target.value)}
                            placeholder="4000 1234 5678 9010"
                            className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-xl font-mono focus:ring-1 focus:ring-slate-900 focus:outline-none"
                          />
                          {formErrors.cardNumber && <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.cardNumber}</p>}
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={formData.cardDetails?.expiryDate}
                            onChange={e => handleCardChange('expiryDate', e.target.value)}
                            placeholder="12/28"
                            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl font-mono focus:ring-1 focus:ring-slate-900 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={formData.cardDetails?.cvv}
                            onChange={e => handleCardChange('cvv', e.target.value)}
                            placeholder="123"
                            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl font-mono focus:ring-1 focus:ring-slate-900 focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Apple Pay / Digital Wallets */}
                  <div 
                    onClick={() => handleInputChange('paymentMethod', 'apple_pay')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'apple_pay'
                        ? 'border-slate-900 bg-slate-50/50 ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center">
                          <Apple className="w-5 h-5 fill-white" />
                        </div>
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">
                            Apple Pay
                          </span>
                          <span className="text-xs text-slate-500">
                            Fast biometric 1-touch checkout on supported Apple devices.
                          </span>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center">
                        {formData.paymentMethod === 'apple_pay' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white rounded-2xl text-base font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-slate-900/15 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing UAE Order...</span>
                  ) : (
                    <span>PLACE ORDER · AED {finalOrderTotal}</span>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2.5">
                  By clicking Place Order, you confirm acceptance of BITUINE UAE Terms and 7-day return policy.
                </p>
              </div>

            </form>
          </div>

          {/* RIGHT: Order Summary (Lg: 5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 sticky top-24">
            <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-slate-500 font-normal">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </h3>

            {/* Cart Items list */}
            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="py-3 flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    {item.selectedVariant && (
                      <span className="text-[10px] text-slate-400 block">
                        {item.selectedVariant.name}
                      </span>
                    )}
                    <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 tabular-nums">
                      AED {item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">AED {cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span className="font-semibold tabular-nums">-AED {cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>UAE Delivery ({formData.emirate})</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {shippingCost === 0 ? 'FREE' : `AED ${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                <span>Total to Pay</span>
                <span className="tabular-nums">AED {finalOrderTotal}</span>
              </div>
            </div>

            {/* UAE Delivery Guarantee */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Delivery Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Direct dispatch from Dubai fulfillment center. Cash on delivery accepted across all UAE locations.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
