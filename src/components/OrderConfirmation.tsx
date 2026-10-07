import React from 'react';
import { 
  CheckCircle2, 
  Truck, 
  MapPin, 
  MessageCircle, 
  ArrowRight, 
  Package, 
  Calendar,
  Share2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getWhatsAppUrl } from '../data/storeConfig';

export const OrderConfirmation: React.FC = () => {
  const { activeOrder, storeConfig, navigateTo } = useShop();

  if (!activeOrder) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 max-w-md w-full text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-900">No active order found</h2>
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const whatsappOrderUrl = getWhatsAppUrl(storeConfig.whatsappNumber, 'order', {
    orderId: activeOrder.id,
  });

  return (
    <div className="bg-slate-50/60 min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm text-center space-y-6">
          
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              🎉 Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We've received your order and our Dubai warehouse team is already preparing your package.
            </p>
          </div>

          {/* Order ID & Date Pills */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-wrap items-center justify-around gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Order Number</span>
              <strong className="text-slate-900 font-mono font-extrabold text-sm sm:text-base">
                #{activeOrder.id}
              </strong>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div>
              <span className="text-slate-400 block text-[11px]">Date</span>
              <span className="text-slate-800 font-medium">{activeOrder.date}</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div>
              <span className="text-slate-400 block text-[11px]">Payment</span>
              <span className="text-slate-800 font-medium">
                {activeOrder.customerDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (Confirmed)'}
              </span>
            </div>
          </div>

          {/* Delivery Timeline Card */}
          <div className="bg-amber-50/50 rounded-2xl p-4 sm:p-5 border border-amber-200/60 text-left space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Truck className="w-4 h-4 text-amber-700" />
              <span>Estimated Delivery: {activeOrder.estimatedDelivery}</span>
            </div>
            <p className="text-xs text-amber-950/80 leading-relaxed">
              Our courier will send an SMS and call <strong className="text-slate-900">{activeOrder.customerDetails.mobile}</strong> approximately 15–30 minutes before arrival at {activeOrder.customerDetails.area}, {activeOrder.customerDetails.emirate}.
            </p>
          </div>

          {/* Delivery Information Summary */}
          <div className="text-left border-t border-slate-100 pt-6 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-bold text-slate-900 text-sm">Delivery Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Recipient</span>
                <span className="font-bold text-slate-900">{activeOrder.customerDetails.fullName}</span>
                <span className="block text-slate-600 mt-0.5">{activeOrder.customerDetails.mobile}</span>
                <span className="block text-slate-600">{activeOrder.customerDetails.email}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[11px]">Destination</span>
                <span className="font-bold text-slate-900">{activeOrder.customerDetails.buildingVilla}, {activeOrder.customerDetails.apartmentFlat}</span>
                <span className="block text-slate-600 mt-0.5">{activeOrder.customerDetails.area}, {activeOrder.customerDetails.city}</span>
                <span className="block text-slate-600 font-medium text-amber-800">{activeOrder.customerDetails.emirate}, UAE</span>
              </div>
            </div>
          </div>

          {/* Items Summary */}
          <div className="text-left border-t border-slate-100 pt-6 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Items Ordered</h3>
            <div className="divide-y divide-slate-100">
              {activeOrder.items.map((item, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-10 h-10 object-cover rounded-lg border border-slate-100"
                    />
                    <div>
                      <span className="font-semibold text-slate-900 block">{item.product.name}</span>
                      <span className="text-slate-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    AED {item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
              <span>Total Amount:</span>
              <span className="tabular-nums">AED {activeOrder.total}</span>
            </div>
          </div>

          {/* WhatsApp Support Button */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp Order Support</span>
            </a>

            <button
              onClick={() => navigateTo('track-order')}
              className="flex-1 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span>Track Order Live</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← Continue Shopping at BITUINE
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
