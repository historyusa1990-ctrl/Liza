import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Check, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVariant } from '../data/types';

export const WinningProductSpotlight: React.FC = () => {
  const { products, addToCart, buyNow, navigateTo } = useShop();

  // Find the trending winning product or default to the first one
  const product = products.find(p => p.isTrendingWinning) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  // Sync when product changes
  useEffect(() => {
    setSelectedVariant(product.variants?.[0]);
    setSelectedImage(product.images[0]);
  }, [product]);

  // Flash sale countdown timer simulation (e.g. 05:42:19 left today)
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 19 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, true);
  };

  const handleBuyNow = () => {
    buyNow(product, quantity, selectedVariant);
  };

  return (
    <section id="trending-product" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1.5">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
              <span>Social Media Favorite</span>
              <span aria-hidden="true">·</span>
              <span>Selling Fast in UAE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              🔥 Trending Now
            </h2>
          </div>

          {/* Flash Sale Countdown Timer */}
          <div className="mt-3 sm:mt-0 flex items-center gap-2 text-xs font-medium text-slate-600 bg-amber-50/80 px-3.5 py-2 rounded-2xl border border-amber-200/60 self-start sm:self-auto">
            <Clock className="w-4 h-4 text-amber-700" />
            <span className="text-amber-950 font-semibold">Special Offer Ends In:</span>
            <span className="font-mono font-bold text-amber-900 bg-white px-2 py-0.5 rounded-lg border border-amber-200/80 tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Large Featured Product Card */}
        <div className="bg-slate-50/60 rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 p-5 sm:p-8 lg:p-10 items-center">
            
            {/* Gallery Left (Lg: 6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div 
                onClick={() => navigateTo('product', product.slug)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm cursor-pointer group"
              >
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    {product.discount}
                  </span>
                  <span className="bg-slate-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    Verified Best Seller
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === img ? 'border-slate-900 shadow-sm scale-102' : 'border-slate-200 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} angle ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Purchase Module Right (Lg: 6 cols) */}
            <div className="lg:col-span-6 flex flex-col space-y-5">
              
              {/* Reviews & SKU */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">{product.rating}</span>
                  <span>({product.reviewsCount} UAE Reviews)</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <div>
                <h3 
                  onClick={() => navigateTo('product', product.slug)}
                  className="text-xl sm:text-3xl font-extrabold text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">
                  AED {product.price}
                </span>
                <span className="text-base sm:text-lg text-slate-400 line-through tabular-nums">
                  AED {product.compareAtPrice}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  Save AED {product.compareAtPrice - product.price}
                </span>
              </div>

              {/* Stock Urgency */}
              <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/50">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span>
                  🔥 <strong>Limited Stock:</strong> Only {product.stock} units remaining in Dubai fulfillment center.
                </span>
              </div>

              {/* Key Benefits Checklist */}
              <div className="space-y-1.5 text-xs text-slate-700">
                {product.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-800 mb-2">
                    Color Finish: <span className="font-normal text-slate-600">{selectedVariant?.name}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.variants.map(variant => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                          selectedVariant?.id === variant.id
                            ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {variant.colorHex && (
                          <span 
                            className="w-3 h-3 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                        )}
                        <span>{variant.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Action Buttons */}
              <div className="pt-3 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>BUY NOW</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-slate-600" />
                    Fast UAE Delivery Available
                  </span>
                  <button
                    onClick={() => navigateTo('product', product.slug)}
                    className="text-slate-900 font-semibold hover:text-amber-600 flex items-center gap-1 transition-colors"
                  >
                    <span>View full details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
