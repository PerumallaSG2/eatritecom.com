import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X, Zap } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 4000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 50);

    // Auto dismiss
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles = "transform transition-all duration-300 ease-out";
    
    if (isExiting) {
      return `${baseStyles} translate-x-full opacity-0 scale-95`;
    }
    
    if (isVisible) {
      return `${baseStyles} translate-x-0 opacity-100 scale-100`;
    }
    
    return `${baseStyles} translate-x-full opacity-0 scale-95`;
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
          borderColor: 'border-green-400',
          iconColor: 'text-green-100'
        };
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-gradient-to-r from-red-500 to-rose-600',
          borderColor: 'border-red-400',
          iconColor: 'text-red-100'
        };
      case 'warning':
        return {
          icon: Zap,
          bgColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          borderColor: 'border-yellow-400',
          iconColor: 'text-yellow-100'
        };
      case 'info':
      default:
        return {
          icon: Info,
          bgColor: 'bg-gradient-to-r from-[#0F2B1E] to-[#0A2418]',
          borderColor: 'border-[#D4B46A]',
          iconColor: 'text-[#D4B46A]'
        };
    }
  };

  const config = getTypeConfig();
  const IconComponent = config.icon;

  return (
    <div className={`${getToastStyles()} fixed top-6 right-6 z-[9999] max-w-sm w-full`}>
      <div className={`${config.bgColor} ${config.borderColor} border-l-4 text-white p-4 rounded-lg shadow-2xl backdrop-blur-sm`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <IconComponent className={`w-6 h-6 ${config.iconColor} animate-pulse`} />
          </div>
          
          <div className="ml-3 flex-1">
            <h3 
              className="text-sm font-bold text-white mb-1"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {title}
            </h3>
            {message && (
              <p 
                className="text-sm text-white/90 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {message}
              </p>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
          >
            <X className="w-4 h-4 text-white/70 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;