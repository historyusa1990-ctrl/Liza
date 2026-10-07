import React from 'react';
import { 
  Home, 
  Cpu, 
  Sparkles, 
  Watch, 
  Smile, 
  Compass, 
  Flame, 
  Award,
  ArrowRight
} from 'lucide-react';
import { STORE_CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';

export const CategorySection: React.FC = () => {
  const { navigateTo } = useShop();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Home': return <Home className="w-5 h-5 text-amber-700" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-sky-700" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-rose-700" />;
      case 'Watch': return <Watch className="w-5 h-5 text-indigo-700" />;
      case 'Smile': return <Smile className="w-5 h-5 text-emerald-700" />;
      case 'Compass': return <Compass className="w-5 h-5 text-teal-700" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-600" />;
      case 'Award': return <Award className="w-5 h-5 text-purple-700" />;
      default: return <Home className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shop by Category
            </h2>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="mt-2 sm:mt-0 text-xs sm:text-sm font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Browse All Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid (2 col mobile, 4 col tablet/desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {STORE_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => navigateTo('shop', undefined, category.slug)}
              className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 hover:border-slate-300 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-amber-50 flex items-center justify-center transition-colors mb-4">
                {getIcon(category.iconName)}
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {category.description}
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-slate-400 group-hover:text-slate-600">
                  <span>{category.itemCount} products</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
