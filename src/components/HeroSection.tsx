import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Headphones, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import heroImage from '../assets/images/hero_lifestyle_showcase_1791409538506.jpg';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/70 to-white pt-6 pb-12 sm:pt-10 sm:pb-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* High-Intent Eyebrow (No pill box, clean metadata) */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Dubai & UAE Verified Direct Store</span>
              <span aria-hidden="true">·</span>
              <span>Same/Next Day Dispatch</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Smart Products. <br className="hidden sm:inline" />
              <span className="text-slate-900">Better Everyday.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
              Discover useful, stylish and affordable products delivered across Dubai, Abu Dhabi, Sharjah and all UAE Emirates with Cash on Delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/15 transition-all"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('trending-product');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigateTo('shop');
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl text-sm font-semibold transition-all hover:border-slate-300"
              >
                EXPLORE PRODUCTS
              </button>
            </div>

            {/* Small Trust Badges */}
            <div className="pt-4 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>UAE Delivery</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Customer Support</span>
              </div>
            </div>

          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-100 aspect-[4/3] lg:aspect-[4/3.5] group">
              <img
                src={heroImage}
                alt="BITUINE smart lifestyle products in UAE"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle glass float badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Trending in UAE</h4>
                  <p className="text-[11px] text-slate-500">Over 1,200+ households upgraded this month</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
