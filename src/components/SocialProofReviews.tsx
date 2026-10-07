import React from 'react';
import { Star, CheckCircle2, MapPin, Quote } from 'lucide-react';
import { STORE_REVIEWS } from '../data/reviews';

export const SocialProofReviews: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
            <span>UAE Verified Buyers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by customers across the UAE
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Read real feedback from Dubai, Abu Dhabi, and Sharjah homeowners who shop with BITUINE.
          </p>
        </div>

        {/* 6-Review Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {STORE_REVIEWS.map(review => (
            <div
              key={review.id}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/70 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 tabular-nums">{review.date}</span>
                </div>

                {/* Review Title */}
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  "{review.title}"
                </h3>

                {/* Content */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {review.content}
                </p>
              </div>

              {/* Author and location lockup */}
              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{review.author}</span>
                    <span title="Verified UAE Purchase">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{review.location}</span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200/60 truncate max-w-[110px]">
                  {review.productName}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
