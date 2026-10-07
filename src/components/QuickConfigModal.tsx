import React, { useState } from 'react';
import { X, Save, Sliders, Check, MessageSquare, Truck, DollarSign, Store } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickConfigModal: React.FC = () => {
  const { storeConfig, updateStoreConfig, isConfigDrawerOpen, setIsConfigDrawerOpen } = useShop();

  const [announcementText, setAnnouncementText] = useState(storeConfig.announcementText);
  const [whatsappNumber, setWhatsappNumber] = useState(storeConfig.whatsappNumber);
  const [phoneDisplay, setPhoneDisplay] = useState(storeConfig.phoneDisplay);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(storeConfig.freeShippingThreshold);
  const [standardShippingFee, setStandardShippingFee] = useState(storeConfig.standardShippingFee);
  const [brandName, setBrandName] = useState(storeConfig.brandName);
  const [tagline, setTagline] = useState(storeConfig.tagline);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isConfigDrawerOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreConfig({
      announcementText,
      whatsappNumber,
      phoneDisplay,
      freeShippingThreshold: Number(freeShippingThreshold),
      standardShippingFee: Number(standardShippingFee),
      brandName,
      tagline,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsConfigDrawerOpen(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-100"
        role="dialog"
        aria-labelledby="store-config-title"
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 id="store-config-title" className="font-bold text-slate-900 text-base">Store Configuration Panel</h3>
              <p className="text-xs text-slate-500">Live global variables (UAE market settings)</p>
            </div>
          </div>
          <button 
            onClick={() => setIsConfigDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          
          {/* Brand Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-slate-500" />
              Store Brand Name
            </label>
            <input
              type="text"
              value={brandName}
              onChange={e => setBrandName(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
              required
            />
          </div>

          {/* Announcement Bar Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-slate-500" />
              Top Announcement Bar Message
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={e => setAnnouncementText(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
              placeholder="e.g. FREE UAE DELIVERY ON ORDERS ABOVE AED 100"
            />
            <p className="text-[11px] text-slate-400 mt-1">Displays across the top sticky banner of the storefront.</p>
          </div>

          {/* WhatsApp Number (Global variable) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp API Number
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                placeholder="971501234567"
                required
              />
              <p className="text-[10px] text-slate-400 mt-0.5">International format without + or spaces</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Display Phone
              </label>
              <input
                type="text"
                value={phoneDisplay}
                onChange={e => setPhoneDisplay(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                placeholder="+971 50 123 4567"
              />
            </div>
          </div>

          {/* Free Shipping & Standard Fee */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                Free Delivery Above (AED)
              </label>
              <input
                type="number"
                min="0"
                value={freeShippingThreshold}
                onChange={e => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Standard UAE Fee (AED)
              </label>
              <input
                type="number"
                min="0"
                value={standardShippingFee}
                onChange={e => setStandardShippingFee(Number(e.target.value))}
                className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Store Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsConfigDrawerOpen(false)}
              className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Update Settings</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
