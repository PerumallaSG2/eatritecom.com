import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast, { ToastType, ToastProps } from '../components/Toast';

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Omit<ToastProps, 'onClose'>[]>([]);

  const showToast = (type: ToastType, title: string, message?: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, type, title, message, duration };
    
    setToasts(prev => [...prev, newToast]);
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-0 right-0 z-[9999] p-6 pointer-events-none">
        <div className="space-y-4">
          {toasts.map((toast, index) => (
            <div 
              key={toast.id} 
              className="pointer-events-auto"
              style={{ 
                transform: `translateY(${index * 10}px)`,
                zIndex: 9999 - index
              }}
            >
              <Toast {...toast} onClose={hideToast} />
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};