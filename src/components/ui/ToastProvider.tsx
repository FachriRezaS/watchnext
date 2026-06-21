'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastContextType = {
  error: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  const error = useCallback((message: string) => {
    setToast({ message, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ error }}>
      {children}
      {toast && (
        <div className="fixed bottom-4 right-4 z-[100] bg-red-600 text-white px-4 py-3 rounded-md shadow-lg transition-all animate-in slide-in-from-bottom-5">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
