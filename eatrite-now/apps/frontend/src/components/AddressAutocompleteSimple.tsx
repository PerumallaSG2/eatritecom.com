import React, { useState, useEffect, useRef } from 'react'
import { MapPin, X } from 'lucide-react'

interface AddressComponents {
  streetNumber: string
  route: string
  city: string
  state: string
  zipCode: string
  country: string
  formattedAddress: string
}

interface AddressAutocompleteSimpleProps {
  value: string
  onChange: (address: string) => void
  onAddressSelect: (components: AddressComponents) => void
  placeholder?: string
  className?: string
  required?: boolean
}

// Mock address database for demo purposes
const mockAddresses = [
  {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    formatted: '123 Main Street, New York, NY 10001',
  },
  {
    street: '456 Oak Avenue',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210',
    formatted: '456 Oak Avenue, Los Angeles, CA 90210',
  },
  {
    street: '789 Pine Road',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    formatted: '789 Pine Road, Chicago, IL 60601',
  },
  {
    street: '321 Elm Street',
    city: 'Houston',
    state: 'TX',
    zipCode: '77001',
    formatted: '321 Elm Street, Houston, TX 77001',
  },
  {
    street: '654 Maple Drive',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '85001',
    formatted: '654 Maple Drive, Phoenix, AZ 85001',
  },
  {
    street: '987 Cedar Lane',
    city: 'Philadelphia',
    state: 'PA',
    zipCode: '19101',
    formatted: '987 Cedar Lane, Philadelphia, PA 19101',
  },
  {
    street: '147 Birch Way',
    city: 'San Antonio',
    state: 'TX',
    zipCode: '78201',
    formatted: '147 Birch Way, San Antonio, TX 78201',
  },
  {
    street: '258 Willow Court',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92101',
    formatted: '258 Willow Court, San Diego, CA 92101',
  },
  {
    street: '369 Spruce Street',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75201',
    formatted: '369 Spruce Street, Dallas, TX 75201',
  },
  {
    street: '741 Ash Boulevard',
    city: 'San Jose',
    state: 'CA',
    zipCode: '95101',
    formatted: '741 Ash Boulevard, San Jose, CA 95101',
  },
]

const AddressAutocompleteSimple: React.FC<AddressAutocompleteSimpleProps> = ({
  value,
  onChange,
  onAddressSelect,
  placeholder = 'Start typing your address...',
  className = '',
  required = false,
}) => {
  const [suggestions, setSuggestions] = useState<typeof mockAddresses>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
        setActiveSuggestion(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    onChange(inputValue)

    if (inputValue.length > 2) {
      const filteredSuggestions = mockAddresses.filter(
        address =>
          address.formatted.toLowerCase().includes(inputValue.toLowerCase()) ||
          address.street.toLowerCase().includes(inputValue.toLowerCase()) ||
          address.city.toLowerCase().includes(inputValue.toLowerCase()) ||
          address.state.toLowerCase().includes(inputValue.toLowerCase()) ||
          address.zipCode.includes(inputValue)
      )

      setSuggestions(filteredSuggestions)
      setShowSuggestions(filteredSuggestions.length > 0)
      setActiveSuggestion(-1)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (address: (typeof mockAddresses)[0]) => {
    // Parse the street address to get components
    const streetParts = address.street.split(' ')
    const streetNumber = streetParts[0]
    const route = streetParts.slice(1).join(' ')

    const components: AddressComponents = {
      streetNumber,
      route,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: 'United States',
      formattedAddress: address.formatted,
    }

    onChange(address.street)
    onAddressSelect(components)
    setShowSuggestions(false)
    setActiveSuggestion(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveSuggestion(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveSuggestion(prev => (prev > 0 ? prev - 1 : 0))
        break
      case 'Enter':
        e.preventDefault()
        if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
          handleSuggestionClick(suggestions[activeSuggestion])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setActiveSuggestion(-1)
        break
    }
  }

  const clearInput = () => {
    onChange('')
    setShowSuggestions(false)
    setSuggestions([])
    inputRef.current?.focus()
  }

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4B46A] w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-12 pr-12 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 ${className}`}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D4B46A]/30 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((address, index) => (
            <div
              key={`${address.street}-${address.zipCode}`}
              onClick={() => handleSuggestionClick(address)}
              className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-[#F5EEDC] transition-colors ${
                index === activeSuggestion ? 'bg-[#F5EEDC]' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4B46A] mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-[#0F2B1E]">
                    {address.street}
                  </div>
                  <div className="text-sm text-gray-600">
                    {address.city}, {address.state} {address.zipCode}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {value.length > 2 && suggestions.length === 0 && showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D4B46A]/30 rounded-lg shadow-lg z-50 p-4">
          <div className="text-gray-500 text-center">
            No addresses found. Try a different search term.
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressAutocompleteSimple
