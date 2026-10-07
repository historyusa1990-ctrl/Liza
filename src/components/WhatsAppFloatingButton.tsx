import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getWhatsAppUrl } from '../data/storeConfig';

export const WhatsAppFloatingButton: React.FC = () => {
  const { storeConfig, currentView, currentProduct, activeOrder } = useShop();

  let context: 'general' | 'product' | 'cart' | 'order' = 'general';
  let details: { productName?: string; productPrice?: number; orderId?: string } | undefined;

  if (currentView === 'product') {
    context = 'product';
    details = {
      productName: currentProduct.name,
      productPrice: currentProduct.price,
    };
  } else if (currentView === 'cart' || currentView === 'checkout') {
    context = 'cart';
  } else if (currentView === 'order-confirmation' && activeOrder) {
    context = 'order';
    details = {
      orderId: activeOrder.id,
    };
  }

  const url = getWhatsAppUrl(storeConfig.whatsappNumber, context, details);

  return (
    <aside 
      aria-label="WhatsApp customer support"
      className="fixed z-30 bottom-18 lg:bottom-6 right-4 sm:right-6 flex items-center group pointer-events-auto"
    >
      {/* Contextual hover pill tooltip */}
      <span className="hidden sm:inline-block mr-2.5 px-3 py-1.5 bg-slate-900/90 text-white text-xs font-medium rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-2 pointer-events-none">
        {context === 'product' ? 'Inquire on WhatsApp' : 'Chat with UAE Support'}
      </span>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact BITUINE on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(16,185,129,0.35)] hover:shadow-[0_10px_28px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-[2.2]" />
        
        {/* Pulsing online indicator */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-emerald-600"></span>
        </span>
      </a>
    </aside>
  );
};
