import React from 'react';
import { Truck, Banknote, ShieldCheck, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getWhatsAppUrl } from '../data/storeConfig';

export const TrustBadges: React.FC = () => {
  const { storeConfig } = useShop();

  const trustCards = [
    {
      icon: <Truck className="w-6 h-6 text-slate-900" />,
      title: 'Fast UAE Delivery',
      description: 'Delivering across Dubai, Sharjah, Abu Dhabi, and other UAE locations directly to your doorstep.',
    },
    {
      icon: <Banknote className="w-6 h-6 text-emerald-700" />,
      title: 'Cash on Delivery',
      description: 'Pay cash upon delivery at your home or villa across all 7 Emirates. Inspect before you accept.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-sky-700" />,
      title: 'Secure Checkout',
      description: '100% encrypted, risk-free ordering with instant SMS & WhatsApp confirmation updates.',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-emerald-600" />,
      title: 'WhatsApp Support',
      description: 'Instant customer assistance via direct WhatsApp hotline. We speak English & Arabic.',
      href: getWhatsAppUrl(storeConfig.whatsappNumber, 'general'),
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Built for UAE Shoppers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Choose BITUINE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {card.href && (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>Chat on WhatsApp →</span>
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
