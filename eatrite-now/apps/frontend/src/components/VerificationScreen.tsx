import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Mail, Smartphone, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

interface VerificationScreenProps {
  email?: string;
  phone?: string;
  onVerificationComplete: () => void;
  onBack: () => void;
  verificationType: 'email' | 'phone';
}

export default function VerificationScreen({
  email,
  phone,
  onVerificationComplete,
  onBack,
  verificationType
}: VerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (otpCode?: string) => {
    const code = otpCode || otp.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const endpoint = verificationType === 'email' ? '/api/users/verify-email' : '/api/users/verify-phone';
      const body = verificationType === 'email' 
        ? { email, otp: code }
        : { phone, otp: code };

      const response = await fetch(`http://192.168.1.28:4005${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      // Success animation
      setTimeout(() => {
        onVerificationComplete();
      }, 1000);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsResending(true);
    setError('');

    try {
      const endpoint = verificationType === 'email' 
        ? '/api/users/resend-email-verification' 
        : '/api/users/resend-phone-verification';
      
      const body = verificationType === 'email' 
        ? { email }
        : { phone };

      const response = await fetch(`http://192.168.1.28:4005${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend code');
      }

      // Reset timer and disable resend
      setTimeLeft(600);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err) {
      console.error('Resend error:', err);
      setError(err instanceof Error ? err.message : 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isVerifying}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {verificationType === 'email' ? (
                <Mail className="w-8 h-8 text-orange-600" />
              ) : (
                <Smartphone className="w-8 h-8 text-orange-600" />
              )}
            </div>
          </div>
          <div className="w-9" /> {/* Spacer */}
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your {verificationType === 'email' ? 'Email' : 'Phone'}
          </h1>
          <p className="text-gray-600">
            We sent a 6-digit code to
          </p>
          <p className="font-semibold text-gray-900">
            {verificationType === 'email' ? email : phone}
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <div className="flex justify-center gap-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg transition-all duration-200 ${
                  digit
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-300 focus:border-orange-500 focus:bg-orange-50'
                } focus:outline-none`}
                maxLength={1}
                disabled={isVerifying}
                autoComplete="off"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center text-sm text-gray-600 mb-4">
            {timeLeft > 0 ? (
              <>Code expires in {formatTime(timeLeft)}</>
            ) : (
              <span className="text-red-600">Code expired</span>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={() => handleVerify()}
          disabled={!isComplete || isVerifying}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            isComplete && !isVerifying
              ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isVerifying ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Verify Code
            </>
          )}
        </button>

        {/* Resend Code */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResendCode}
            disabled={!canResend || isResending}
            className={`text-sm font-semibold transition-colors flex items-center justify-center gap-1 mx-auto ${
              canResend && !isResending
                ? 'text-orange-600 hover:text-orange-700'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            {isResending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Resend Code
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}