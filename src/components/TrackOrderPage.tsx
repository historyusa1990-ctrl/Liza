import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  ArrowRight,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getWhatsAppUrl } from '../data/storeConfig';
import { Order } from '../data/types';

export const TrackOrderPage: React.FC = () => {
  const { placedOrders, storeConfig, navigateTo } = useShop();

  const [orderNumberInput, setOrderNumberInput] = useState('BIT-89214'); // prefilled with sample order
  const [mobileInput, setMobileInput] = useState('+971 55 987 6543');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(placedOrders[0] || null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanId = orderNumberInput.trim().toUpperCase().replace('#', '');
    const found = placedOrders.find(o => 
      o.id.toUpperCase() === cleanId || 
      o.id.toUpperCase().includes(cleanId)
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      setErrorMsg(`No active order found matching #${orderNumberInput}. Try demo order #BIT-89214`);
      setSearchedOrder(null);
    }
  };

  const steps: Array<{ title: string; desc: string; key: Order['status'] }> = [
    { title: 'Order Received', desc: 'Order received & logged in system', key: 'Received' },
    { title: 'Order Confirmed', desc: 'Customer verified for dispatch', key: 'Confirmed' },
    { title: 'Preparing', desc: 'Packed at Dubai Fulfillment Hub', key: 'Preparing' },
    { title: 'Out for Delivery', desc: 'Courier driver en route to your address', key: 'Out for Delivery' },
    { title: 'Delivered', desc: 'Package handed over and receipt signed', key: 'Delivered' },
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'Received': return 0;
      case 'Confirmed': return 1;
      case 'Preparing': return 2;
      case 'Out for Delivery': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = searchedOrder ? getStepIndex(searchedOrder.status) : 0;
  const whatsappUrl = getWhatsAppUrl(
    storeConfig.whatsappNumber, 
    'order', 
    searchedOrder ? { orderId: searchedOrder.id } : undefined
  );

  return (
    <div className="bg-slate-50/50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title */}
        <div className="text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Track Your UAE Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Check real-time courier status and estimated arrival across Dubai, Abu Dhabi, and Sharjah.
          </p>
        </div>

        {/* Tracking Input Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm max-w-2xl mx-auto">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Order Number *
                </label>
                <input
                  type="text"
                  value={orderNumberInput}
                  onChange={e => setOrderNumberInput(e.target.value)}
                  placeholder="e.g. BIT-89214"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-slate-900 uppercase"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobileInput}
                  onChange={e => setMobileInput(e.target.value)}
                  placeholder="+971 50 xxx xxxx"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>TRACK ORDER STATUS</span>
            </button>
          </form>
        </div>

        {/* Tracking Result Card */}
        {searchedOrder && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8 animate-in fade-in duration-200">
            
            {/* Top Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Order</span>
                  <span className="font-mono font-extrabold text-slate-900 text-lg">
                    #{searchedOrder.id}
                  </span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                    {searchedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Placed on {searchedOrder.date} · Destination: {searchedOrder.customerDetails.area}, {searchedOrder.customerDetails.emirate}
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>

            {/* Stepper Timeline */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
                Delivery Progress
              </h3>

              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden sm:block absolute top-5 left-6 right-6 h-0.5 bg-slate-200 z-0">
                  <div 
                    className="h-full bg-slate-900 transition-all duration-500"
                    style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div key={idx} className="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-3 sm:gap-2">
                        {/* Circle marker */}
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                            isCurrent
                              ? 'bg-slate-900 text-white ring-4 ring-slate-100 shadow-md'
                              : isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>

                        <div>
                          <h4 className={`text-xs font-bold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Package details preview */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-900 block">Courier Status Note</span>
                <p className="text-slate-600 mt-0.5">
                  Package assigned to Dubai Marina Last-Mile Courier Unit. ETA: {searchedOrder.estimatedDelivery}.
                </p>
              </div>
              <div className="text-right sm:text-right shrink-0">
                <span className="text-slate-400 block text-[11px]">Payment Total</span>
                <span className="font-extrabold text-slate-900 text-sm tabular-nums">
                  AED {searchedOrder.total} ({searchedOrder.customerDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid'})
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
