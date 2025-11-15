import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Edit3,
  Trash2,
  Shield,
  MapPin
} from 'lucide-react';
import { FadeIn, StaggeredAnimation } from './AnimationComponents';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  holderName: string;
  isDefault: boolean;
}

interface BillingAddress {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface NewPaymentMethod {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  holderName: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2026,
    holderName: 'John Doe',
    isDefault: true
  },
  {
    id: 'pm-2',
    type: 'mastercard',
    last4: '5555',
    expiryMonth: 8,
    expiryYear: 2025,
    holderName: 'John Doe',
    isDefault: false
  }
];

const mockBillingAddresses: BillingAddress[] = [
  {
    id: 'addr-1',
    firstName: 'John',
    lastName: 'Doe',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'US',
    isDefault: true
  }
];

export const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [billingAddresses, setBillingAddresses] = useState<BillingAddress[]>(mockBillingAddresses);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [_editingAddress, _setEditingAddress] = useState<string | null>(null);
  
  const [newPaymentMethod, setNewPaymentMethod] = useState<NewPaymentMethod>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: ''
  });

  const [newAddress, setNewAddress] = useState<Omit<BillingAddress, 'id' | 'isDefault'>>({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCardIcon = (type: string) => {
    const cardIcons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳'
    };
    return cardIcons[type as keyof typeof cardIcons] || '💳';
  };

  const getCardType = (cardNumber: string): PaymentMethod['type'] => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.match(/^4/)) return 'visa';
    if (cleaned.match(/^5[1-5]/)) return 'mastercard';
    if (cleaned.match(/^3[47]/)) return 'amex';
    if (cleaned.match(/^6011/)) return 'discover';
    return 'visa';
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19); // Max 16 digits + 3 spaces
  };

  const validatePaymentMethod = (method: NewPaymentMethod): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    const cleanedCardNumber = method.cardNumber.replace(/\s/g, '');
    if (!cleanedCardNumber) {
      errors.cardNumber = 'Card number is required';
    } else if (cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
      errors.cardNumber = 'Invalid card number';
    }

    if (!method.expiryMonth) {
      errors.expiryMonth = 'Month is required';
    } else if (parseInt(method.expiryMonth) < 1 || parseInt(method.expiryMonth) > 12) {
      errors.expiryMonth = 'Invalid month';
    }

    if (!method.expiryYear) {
      errors.expiryYear = 'Year is required';
    } else if (parseInt(method.expiryYear) < new Date().getFullYear()) {
      errors.expiryYear = 'Card is expired';
    }

    if (!method.cvv) {
      errors.cvv = 'CVV is required';
    } else if (method.cvv.length < 3 || method.cvv.length > 4) {
      errors.cvv = 'Invalid CVV';
    }

    if (!method.holderName.trim()) {
      errors.holderName = 'Cardholder name is required';
    }

    return errors;
  };

  const validateAddress = (address: Omit<BillingAddress, 'id' | 'isDefault'>): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    if (!address.firstName.trim()) errors.firstName = 'First name is required';
    if (!address.lastName.trim()) errors.lastName = 'Last name is required';
    if (!address.address1.trim()) errors.address1 = 'Address is required';
    if (!address.city.trim()) errors.city = 'City is required';
    if (!address.state.trim()) errors.state = 'State is required';
    if (!address.zipCode.trim()) errors.zipCode = 'ZIP code is required';
    
    return errors;
  };

  const handleAddPaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validatePaymentMethod(newPaymentMethod);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newCard: PaymentMethod = {
      id: `pm-${Date.now()}`,
      type: getCardType(newPaymentMethod.cardNumber),
      last4: newPaymentMethod.cardNumber.slice(-4),
      expiryMonth: parseInt(newPaymentMethod.expiryMonth),
      expiryYear: parseInt(newPaymentMethod.expiryYear),
      holderName: newPaymentMethod.holderName,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newCard]);
    setNewPaymentMethod({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      holderName: ''
    });
    setErrors({});
    setShowAddCard(false);
    setIsSubmitting(false);
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateAddress(newAddress);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const address: BillingAddress = {
      id: `addr-${Date.now()}`,
      ...newAddress,
      isDefault: billingAddresses.length === 0
    };

    setBillingAddresses([...billingAddresses, address]);
    setNewAddress({
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    });
    setErrors({});
    setShowAddAddress(false);
    setIsSubmitting(false);
  };

  const handleDeletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
  };

  const handleDeleteAddress = (id: string) => {
    setBillingAddresses(billingAddresses.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setBillingAddresses(billingAddresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Methods
          </h1>
          <p className="text-gray-600">
            Manage your payment methods and billing addresses securely
          </p>
        </div>
      </FadeIn>

      {/* Security Notice */}
      <FadeIn delay={0.1}>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Secure Payment Processing</h3>
              <p className="text-sm text-blue-600">
                Your payment information is encrypted and processed securely through our PCI-compliant payment processor.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Payment Methods Section */}
      <FadeIn delay={0.2}>
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
              <button
                onClick={() => setShowAddCard(!showAddCard)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
                <span>Add Card</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {paymentMethods.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No payment methods added yet</p>
              </div>
            ) : (
              <StaggeredAnimation className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border rounded-lg p-4 ${
                      method.isDefault ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{getCardIcon(method.type)}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium capitalize">{method.type}</span>
                            <span className="text-gray-600">•••• {method.last4}</span>
                            {method.isDefault && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                          </div>
                          <div className="text-sm text-gray-500">{method.holderName}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefaultPaymentMethod(method.id)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePaymentMethod(method.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </StaggeredAnimation>
            )}

            {/* Add Card Form */}
            {showAddCard && (
              <FadeIn>
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Payment Method</h3>
                  <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={newPaymentMethod.cardNumber}
                            onChange={(e) => setNewPaymentMethod({
                              ...newPaymentMethod,
                              cardNumber: formatCardNumber(e.target.value)
                            })}
                            placeholder="1234 5678 9012 3456"
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                            }`}
                            maxLength={19}
                          />
                          <CreditCard className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                        </div>
                        {errors.cardNumber && (
                          <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Month
                        </label>
                        <select
                          value={newPaymentMethod.expiryMonth}
                          onChange={(e) => setNewPaymentMethod({
                            ...newPaymentMethod,
                            expiryMonth: e.target.value
                          })}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.expiryMonth ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {(i + 1).toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        {errors.expiryMonth && (
                          <p className="text-red-600 text-sm mt-1">{errors.expiryMonth}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Year
                        </label>
                        <select
                          value={newPaymentMethod.expiryYear}
                          onChange={(e) => setNewPaymentMethod({
                            ...newPaymentMethod,
                            expiryYear: e.target.value
                          })}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.expiryYear ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                        {errors.expiryYear && (
                          <p className="text-red-600 text-sm mt-1">{errors.expiryYear}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={newPaymentMethod.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                            setNewPaymentMethod({
                              ...newPaymentMethod,
                              cvv: value
                            });
                          }}
                          placeholder="123"
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cvv ? 'border-red-300' : 'border-gray-300'
                          }`}
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={newPaymentMethod.holderName}
                          onChange={(e) => setNewPaymentMethod({
                            ...newPaymentMethod,
                            holderName: e.target.value
                          })}
                          placeholder="John Doe"
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.holderName ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.holderName && (
                          <p className="text-red-600 text-sm mt-1">{errors.holderName}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddCard(false);
                          setErrors({});
                        }}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Adding...' : 'Add Payment Method'}
                      </button>
                    </div>
                  </form>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Billing Addresses Section */}
      <FadeIn delay={0.3}>
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Billing Addresses</h2>
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {billingAddresses.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No billing addresses added yet</p>
              </div>
            ) : (
              <StaggeredAnimation className="space-y-4">
                {billingAddresses.map((address) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 ${
                      address.isDefault ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">
                            {address.firstName} {address.lastName}
                          </span>
                          {address.isDefault && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>{address.address1}</div>
                          {address.address2 && <div>{address.address2}</div>}
                          <div>{address.city}, {address.state} {address.zipCode}</div>
                          <div>{address.country}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => _setEditingAddress(address.id)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </StaggeredAnimation>
            )}

            {/* Add Address Form */}
            {showAddAddress && (
              <FadeIn>
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Billing Address</h3>
                  <form onSubmit={handleAddAddress} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={newAddress.firstName}
                          onChange={(e) => setNewAddress({
                            ...newAddress,
                            firstName: e.target.value
                          })}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.firstName ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={newAddress.lastName}
                          onChange={(e) => setNewAddress({
                            ...newAddress,
                            lastName: e.target.value
                          })}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.lastName ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          value={newAddress.address1}
                          onChange={(e) => setNewAddress({
                            ...newAddress,
                            address1: e.target.value
                          })}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.address1 ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.address1 && (
                          <p className="text-red-600 text-sm mt-1">{errors.address1}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 2 (Optional)
                        </label>
                        <input
                          type="text"
                          value={newAddress.address2}
                          onChange={(e) => setNewAddress({
                            ...newAddress,
                            address2: e.target.value
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({
                            ...newAddress,
                            city: e.target.value
                          })}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.city ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.city && (
                          <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({
                            ...newAddress,
                            state: e.target.value
                          })}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.state ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.state && (
                          <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={newAddress.zipCode}
                          onChange={(e) => setNewAddress({
                            ...newAddress,
                            zipCode: e.target.value
                          })}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.zipCode ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.zipCode && (
                          <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          value={newAddress.country}
                          onChange={(e) => setNewAddress({
                            ...newAddress,
                            country: e.target.value
                          })}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddAddress(false);
                          setErrors({});
                        }}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Adding...' : 'Add Address'}
                      </button>
                    </div>
                  </form>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default PaymentMethods;