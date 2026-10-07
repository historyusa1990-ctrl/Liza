import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Check, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  MessageCircle, 
  Clock, 
  ChevronRight, 
  Plus, 
  Minus, 
  Heart,
  Share2,
  Play,
  Pause,
  SlidersHorizontal,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVariant } from '../data/types';
import { getWhatsAppUrl, EMIRATE_DELIVERY_NOTES, UAE_EMIRATES } from '../data/storeConfig';
import { ProductCard } from './ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    currentProduct, 
    products, 
    addToCart, 
    buyNow, 
    toggleWishlist, 
    isInWishlist, 
    storeConfig,
    navigateTo,
    addToast
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    currentProduct.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'features' | 'specs' | 'how' | 'shipping' | 'returns'>('desc');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedVariant(currentProduct.variants?.[0]);
    setQuantity(1);
    setActiveTab('desc');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentProduct]);

  const inWishlist = isInWishlist(currentProduct.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentProduct.name,
        text: currentProduct.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const whatsappUrl = getWhatsAppUrl(storeConfig.whatsappNumber, 'product', {
    productName: currentProduct.name,
    productPrice: currentProduct.price,
  });

  const relatedProducts = products
    .filter(p => p.id !== currentProduct.id)
    .slice(0, 4);

  return (
    <div className="bg-white min-h-screen pb-28 lg:pb-16 pt-4 sm:pt-8">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
          <button 
            onClick={() => navigateTo('home')} 
            className="hover:text-slate-900 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <button 
            onClick={() => navigateTo('shop', undefined, currentProduct.category.toLowerCase().replace(/\s+/g, '-'))}
            className="hover:text-slate-900 transition-colors"
          >
            {currentProduct.category}
          </button>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 font-medium truncate max-w-xs">{currentProduct.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* LEFT: Product Gallery (Lg: 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] sm:aspect-[1/1] rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden shadow-sm group">
              <img
                src={currentProduct.images[activeImageIndex] || currentProduct.images[0]}
                alt={currentProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Discount badge */}
              {currentProduct.discount && (
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-600 text-white text-xs sm:text-sm font-extrabold px-3 py-1 rounded-xl shadow-md">
                    {currentProduct.discount}
                  </span>
                </div>
              )}

              {/* Wishlist & Share floating actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(currentProduct.id)}
                  aria-label="Toggle wishlist"
                  className="w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-sm transition-all"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
                </button>

                <button
                  onClick={handleShare}
                  aria-label="Share product"
                  className="w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-sm transition-all"
                >
                  <Share2 className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Thumbnail Row */}
            {currentProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {currentProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-slate-900 shadow-md ring-2 ring-slate-900/10'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${currentProduct.name} preview ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Video Showcase Section (Section 16: Facebook Reels / TikTok / Shorts preview) */}
            {currentProduct.video && (
              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                    <h3 className="text-sm font-bold text-slate-900">
                      Product Video & Social Reel
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400">As seen on TikTok / Instagram</span>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-slate-800 group shadow-md">
                  <video
                    src={currentProduct.video.url}
                    poster={currentProduct.video.poster}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                {currentProduct.video.caption && (
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    {currentProduct.video.caption}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Contiguous Purchase Module (Lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Title & Ratings */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider mb-2">
                <span>{currentProduct.category}</span>
                <span className="font-mono text-slate-500">SKU: {currentProduct.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {currentProduct.name}
              </h1>

              {/* Rating and review counter */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-900 tabular-nums">{currentProduct.rating}</span>
                <span className="text-xs text-slate-500">
                  · ({currentProduct.reviewsCount} verified UAE reviews)
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-950 tabular-nums">
                  AED {currentProduct.price}
                </span>
                {currentProduct.compareAtPrice > currentProduct.price && (
                  <span className="text-lg text-slate-400 line-through tabular-nums">
                    AED {currentProduct.compareAtPrice}
                  </span>
                )}
                {currentProduct.discount && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-lg">
                    {currentProduct.discount}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Inclusive of all UAE taxes. Free shipping on orders over AED {storeConfig.freeShippingThreshold}.
              </p>
            </div>

            {/* Limited Stock Urgency */}
            <div className="flex items-center gap-2.5 text-xs font-medium text-amber-900 bg-amber-50/80 p-3 rounded-xl border border-amber-200/60">
              <Flame className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                🔥 <strong>Limited Stock:</strong> Only {currentProduct.stock} left in Dubai warehouse. High demand.
              </span>
            </div>

            {/* Short Benefits */}
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              {currentProduct.features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Variants Selector */}
            {currentProduct.variants && currentProduct.variants.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-900">Select Option / Color:</span>
                  <span className="text-slate-600">{selectedVariant?.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                        selectedVariant?.id === variant.id
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {variant.colorHex && (
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                      )}
                      <span>{variant.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-900">Quantity:</label>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white w-32 justify-between p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-600 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-slate-600 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => addToCart(currentProduct, quantity, selectedVariant, true)}
                className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={() => buyNow(currentProduct, quantity, selectedVariant)}
                className="w-full py-4 px-6 bg-amber-600 hover:bg-amber-500 active:scale-[0.99] text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-600/15 transition-all"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>BUY NOW (CASH ON DELIVERY)</span>
              </button>

              {/* Order Via WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                <span>ORDER VIA WHATSAPP</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs text-slate-600">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-700 shrink-0" />
                <span>Fast UAE Delivery</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cash on Delivery</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Secure Checkout</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-slate-700 shrink-0" />
                <span>Easy UAE Returns</span>
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Product Tabs Section (Section 15) */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="flex border-b border-slate-200 overflow-x-auto gap-2 sm:gap-6 pb-px">
            {[
              { id: 'desc', label: 'Description' },
              { id: 'features', label: 'Features' },
              { id: 'specs', label: 'Specifications' },
              { id: 'how', label: 'How To Use' },
              { id: 'shipping', label: 'UAE Shipping' },
              { id: 'returns', label: 'Returns & Guarantee' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-3 px-2 text-xs sm:text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 sm:py-8 max-w-4xl text-slate-700 text-sm leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p className="text-base font-medium text-slate-900">
                  {currentProduct.shortDescription}
                </p>
                <p>{currentProduct.description}</p>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-4">
                  <h4 className="font-bold text-slate-900 mb-2">Designed for UAE Living</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Engineered with premium moisture-resistant finishes tailored to regional indoor air-conditioned environments. All BITUINE items undergo quality inspection before leaving our Dubai fulfillment hub.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentProduct.features.map((feat, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody className="divide-y divide-slate-200/60">
                    {Object.entries(currentProduct.specifications).map(([key, value]) => (
                      <tr key={key} className="hover:bg-slate-100/50">
                        <td className="py-3 px-4 font-semibold text-slate-900 w-1/3">{key}</td>
                        <td className="py-3 px-4 text-slate-700 font-mono text-xs">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'how' && (
              <div className="space-y-3">
                {(currentProduct.howToUse || [
                  'Unbox your item and inspect components.',
                  'Place in your chosen room or surface.',
                  'Enjoy the modern convenience of BITUINE smart essentials.',
                ]).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-800 mt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <div className="p-4 bg-amber-50/70 border border-amber-200/70 rounded-2xl">
                  <h4 className="font-bold text-amber-950 text-sm mb-1">
                    Free UAE Delivery on orders above AED {storeConfig.freeShippingThreshold}
                  </h4>
                  <p className="text-xs text-amber-900">
                    Standard delivery is AED {storeConfig.standardShippingFee} for smaller orders. Express courier option available at checkout.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {UAE_EMIRATES.map(emirate => (
                    <div key={emirate} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                      <span className="font-bold text-slate-900">{emirate}</span>
                      <span className="text-slate-600">{EMIRATE_DELIVERY_NOTES[emirate]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-3 text-xs sm:text-sm">
                <p>
                  We offer a hassle-free <strong>7-Day UAE Return & Exchange Policy</strong>. If your item arrives damaged or does not meet your expectations, simply reach out to our WhatsApp customer support team.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                  <li>Item must be in its original packaging with all included accessories.</li>
                  <li>Our courier will collect the item directly from your address in UAE.</li>
                  <li>Full refund processed via original payment or cash upon courier pickup.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Grid */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              You May Also Like
            </h3>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-amber-600"
            >
              Browse All →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

      </div>

      {/* MOBILE STICKY BOTTOM BAR (Requirement 34) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Price</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-slate-950 tabular-nums">
              AED {currentProduct.price * quantity}
            </span>
            {currentProduct.compareAtPrice > currentProduct.price && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                AED {currentProduct.compareAtPrice * quantity}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-[220px]">
          <button
            onClick={() => addToCart(currentProduct, quantity, selectedVariant, true)}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl transition-colors active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>

          <button
            onClick={() => buyNow(currentProduct, quantity, selectedVariant)}
            className="flex-1 py-3 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>BUY NOW</span>
          </button>
        </div>
      </div>

    </div>
  );
};
