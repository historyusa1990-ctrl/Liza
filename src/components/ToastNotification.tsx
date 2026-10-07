import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <aside 
      aria-label="Notifications"
      className="fixed z-50 bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none"
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 text-sm animate-in fade-in slide-in-from-bottom-2 duration-200 border border-slate-800"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span className="font-medium text-slate-100">{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </aside>
  );
};
