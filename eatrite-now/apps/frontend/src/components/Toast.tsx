import React, { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, Info, X, Zap } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastProps {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 2500,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 50)

    // Auto dismiss
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose(id)
    }, 300)
  }

  const getToastStyles = () => {
    const baseStyles = 'transform transition-all duration-300 ease-out'

    if (isExiting) {
      return `${baseStyles} translate-x-full opacity-0 scale-95`
    }

    if (isVisible) {
      return `${baseStyles} translate-x-0 opacity-100 scale-100`
    }

    return `${baseStyles} translate-x-full opacity-0 scale-95`
  }

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-white border border-green-200',
          borderColor: 'border-l-green-400',
          iconColor: 'text-green-600',
        }
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-gradient-to-r from-red-500 to-rose-600',
          borderColor: 'border-red-400',
          iconColor: 'text-red-100',
        }
      case 'warning':
        return {
          icon: Zap,
          bgColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          borderColor: 'border-yellow-400',
          iconColor: 'text-yellow-100',
        }
      case 'info':
      default:
        return {
          icon: Info,
          bgColor: 'bg-gradient-to-r from-[#0F2B1E] to-[#0A2418]',
          borderColor: 'border-[#D4B46A]',
          iconColor: 'text-[#D4B46A]',
        }
    }
  }

  const config = getTypeConfig()
  const IconComponent = config.icon

  return (
    <div
      className={`${getToastStyles()} fixed top-20 right-4 z-[9999] max-w-xs w-auto min-w-[280px]`}
    >
      <div
        className={`${config.bgColor} ${config.borderColor} border-l-4 p-3 rounded-lg shadow-lg backdrop-blur-sm`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
          </div>

          <div className="ml-3 flex-1">
            <h3
              className={`text-sm font-bold mb-1 ${type === 'success' ? 'text-gray-900' : 'text-white'}`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {title}
            </h3>
            {message && (
              <p
                className={`text-sm leading-relaxed ${type === 'success' ? 'text-gray-700' : 'text-white/90'}`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {message}
              </p>
            )}
          </div>

          <button
            onClick={handleClose}
            className={`flex-shrink-0 ml-3 p-1 rounded-full transition-colors duration-200 ${
              type === 'success'
                ? 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
                : 'hover:bg-white/20 text-white/70 hover:text-white'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast
