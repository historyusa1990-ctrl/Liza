import React, { useState } from 'react';
import { Mail, Check, Sparkles, Copy } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { trackMarketingEvent } from '../data/storeConfig';

export const NewsletterSection: React.FC = () => {
  const { addToast, applyCoupon } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address', 'warning');
      return;
    }

    setSubscribed(true);
    applyCoupon('BITUINE10');
    trackMarketingEvent('Lead', { email, source: 'newsletter_banner' });
    addToast('🎉 Welcome to BITUINE! Coupon BITUINE10 applied to your cart!', 'success');
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 text-amber-300 rounded-full text-xs font-semibold mb-4 border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>UAE Welcome Gift</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Get 10% OFF Your First Order
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
          Join the BITUINE family and receive exclusive UAE flash offers, VIP discounts, and new product drop alerts.
        </p>

        {subscribed ? (
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl max-w-md mx-auto animate-in zoom-in-95 duration-200">
            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">You're in! Use coupon code:</h3>
            <div className="mt-2 flex items-center justify-center gap-2 bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-700 font-mono text-base font-extrabold text-amber-400">
              <span>BITUINE10</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Discount applied automatically at checkout!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-amber-500/20 shrink-0"
            >
              GET MY DISCOUNT
            </button>
          </form>
        )}

        <p className="text-[11px] text-slate-400 mt-4">
          No spam. Unsubscribe anytime with 1 click.
        </p>
      </div>
    </section>
  );
};
