import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Info, ExternalLink, X } from 'lucide-react';
import type { ToastType } from '@/lib/toast';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  progress?: number;
  link?: string;
}

/**
 * Drop this once in your layout. Listens for 'admin-toast' events fired by triggerToast().
 */
export default function Toast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const detail = (e as CustomEvent).detail as Omit<ToastItem, 'id'>;
      const item: ToastItem = { id: `${Date.now()}-${Math.random()}`, ...detail };

      if (item.type === 'progress') {
        setToasts(prev => {
          const exists = prev.find(t => t.type === 'progress');
          return exists
            ? prev.map(t => (t.type === 'progress' ? { ...t, ...item } : t))
            : [...prev, item];
        });
      } else {
        setToasts(prev => [...prev.filter(t => t.type !== 'progress'), item]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== item.id)), 6000);
      }
    };

    window.addEventListener('admin-toast', handleToast);
    return () => window.removeEventListener('admin-toast', handleToast);
  }, []);

  const remove = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-admin-surface border border-admin-primary/10 shadow-2xl shadow-admin-primary/10 rounded-admin-xl w-80 overflow-hidden transition-all duration-300"
        >
          <div className="p-4 flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success'  && <CheckCircle2 className="w-5 h-5 text-admin-success" />}
              {toast.type === 'error'    && <AlertCircle  className="w-5 h-5 text-admin-danger" />}
              {toast.type === 'info'     && <Info         className="w-5 h-5 text-admin-primary" />}
              {toast.type === 'progress' && <Loader2      className="w-5 h-5 text-admin-primary animate-spin" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-admin-text leading-snug">{toast.message}</p>
              {toast.link && (
                <a
                  href={toast.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-admin-primary-light text-admin-primary hover:bg-admin-primary hover:text-white rounded-admin-md text-xs font-bold transition-colors"
                >
                  Ver alteração ao vivo <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            {toast.type !== 'progress' && (
              <button
                onClick={() => remove(toast.id)}
                className="shrink-0 text-slate-400 hover:text-admin-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {toast.type === 'progress' && toast.progress !== undefined && (
            <div className="w-full h-1.5 bg-slate-100">
              <div
                className="h-full bg-admin-primary transition-all duration-700 ease-out"
                style={{ width: `${toast.progress}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
