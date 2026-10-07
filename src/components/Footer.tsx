import React from 'react';
import { 
  Instagram, 
  Video, 
  Facebook, 
  MessageCircle, 
  MapPin, 
  Mail, 
  Phone,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getWhatsAppUrl } from '../data/storeConfig';

export const Footer: React.FC = () => {
  const { storeConfig, navigateTo } = useShop();

  const whatsappUrl = getWhatsAppUrl(storeConfig.whatsappNumber, 'general');

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center font-bold text-lg">
                B
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {storeConfig.brandName}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Smart products for better everyday living. Engineered for contemporary homes and workspaces across Dubai and the UAE.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{storeConfig.dubaiOfficeLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{storeConfig.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{storeConfig.emailContact}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white transition-colors text-left"
                >
                  All Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('shop', undefined, 'new-arrivals')}
                  className="hover:text-white transition-colors text-left"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('shop', undefined, 'best-sellers')}
                  className="hover:text-white transition-colors text-left"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('shop', undefined, 'home-kitchen')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home & Kitchen
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('shop', undefined, 'electronics-gadgets')}
                  className="hover:text-white transition-colors text-left"
                >
                  Electronics & Gadgets
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('track-order')}
                  className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1 text-left"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Track Order</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Follow Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Follow Us
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href={storeConfig.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href={storeConfig.socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Facebook className="w-4 h-4 text-blue-400" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a 
                  href={storeConfig.socials.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Video className="w-4 h-4 text-slate-300" />
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 text-emerald-400"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 BITUINE. All Rights Reserved. Dubai, United Arab Emirates.</p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SSL 256-Bit Encrypted</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[11px]">UAE Dirham (AED)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
