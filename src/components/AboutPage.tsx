import React from 'react';
import { ShieldCheck, Truck, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import heroImage from '../assets/images/hero_lifestyle_showcase_1791409538506.jpg';

export const AboutPage: React.FC = () => {
  const { storeConfig, navigateTo } = useShop();

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Story Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
            About {storeConfig.brandName}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Smart Products for Better Everyday Living
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded in Dubai, UAE, BITUINE curates practical, premium yet affordable everyday essentials engineered for modern homes and workspaces.
          </p>
        </div>

        {/* Hero image showcase */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-xl border border-slate-100 bg-slate-100">
          <img
            src={heroImage}
            alt="BITUINE Dubai workspace and lifestyle products"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Local UAE Dispatch</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every item is physically inventoried and inspected in our Dubai warehouse before dispatch, ensuring rapid 24-hour deliveries across the UAE.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Cash on Delivery First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We respect how UAE customers love to shop. Pay with cash or card upon receiving and inspecting your package at your doorstep.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Direct WhatsApp Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No robotic phone menus. Chat with friendly customer support directly on WhatsApp for sizing advice, product questions, or tracking updates.
            </p>
          </div>
        </div>

        {/* Dubai Office & Contact */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Have questions about an order?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our team operates 7 days a week from our Business Bay, Dubai hub.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors shrink-0"
          >
            Explore BITUINE Store
          </button>
        </div>

      </div>
    </div>
  );
};
