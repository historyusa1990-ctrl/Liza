import React from 'react';
import { Instagram, Video, Heart, MessageCircle, Play } from 'lucide-react';
import { useShop } from '../context/ShopContext';

// Use our high fidelity generated images
import img1 from '../assets/images/product_smart_organizer_lifestyle_1791409561575.jpg';
import img2 from '../assets/images/hero_lifestyle_showcase_1791409538506.jpg';
import img3 from '../assets/images/product_wireless_charger_1791409572894.jpg';
import img4 from '../assets/images/product_kitchen_dispenser_1791409582973.jpg';
import img5 from '../assets/images/product_smart_organizer_main_1791409549971.jpg';

export const SocialMediaFeed: React.FC = () => {
  const { storeConfig, navigateTo } = useShop();

  const posts = [
    {
      id: 1,
      image: img1,
      type: 'Reel',
      likes: '1.4k',
      comments: '84',
      caption: 'Morning routine in Dubai Marina with our Smart Home Organizer ✨',
    },
    {
      id: 2,
      image: img2,
      type: 'UGC',
      likes: '960',
      comments: '42',
      caption: 'Unboxing day! Delivery arrived under 24 hours in Downtown Dubai.',
    },
    {
      id: 3,
      image: img3,
      type: 'Product',
      likes: '2.1k',
      comments: '115',
      caption: 'One charging stand for Phone, Watch, and AirPods. No more wires.',
    },
    {
      id: 4,
      image: img4,
      type: 'Promo',
      likes: '820',
      comments: '39',
      caption: 'Zero drips on luxury marble counters. Chef-approved!',
    },
    {
      id: 5,
      image: img5,
      type: 'Reel',
      likes: '3.4k',
      comments: '210',
      caption: 'How to organize your bedside table in 30 seconds flat ⚡',
    },
    {
      id: 6,
      image: img1,
      type: 'Customer',
      likes: '1.1k',
      comments: '63',
      caption: 'Customer photo from Abu Dhabi: Clean desk setup goals 🇦🇪',
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>@bituine.ae on Social Media</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Follow BITUINE
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Join thousands of UAE followers watching viral product demos, reels, and tips.
            </p>
          </div>

          {/* Social Channels Pills/Links */}
          <div className="mt-4 sm:mt-0 flex items-center gap-2 self-start sm:self-auto">
            <a
              href={storeConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-600" />
              <span>Instagram</span>
            </a>
            <a
              href={storeConfig.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Video className="w-3.5 h-3.5 text-slate-900" />
              <span>TikTok</span>
            </a>
            <a
              href={storeConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors hidden sm:flex"
            >
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* 6-Grid Posts */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map(post => (
            <div
              key={post.id}
              onClick={() => navigateTo('shop')}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Reel indicator icon if applicable */}
              {post.type === 'Reel' && (
                <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
              )}

              {/* Hover Overlay with stats & caption */}
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  {post.type}
                </span>

                <p className="text-[11px] font-medium leading-tight line-clamp-3">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 pt-1 border-t border-white/20">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
