import React, { useState, useEffect, useRef, useCallback } from 'react'
import { MapPin, X, Loader2 } from 'lucide-react'

interface AddressComponents {
  streetNumber: string
  route: string
  city: string
  state: string
  zipCode: string
  country: string
  formattedAddress: string
}

interface AddressResult {
  display_name: string
  address: {
    house_number?: string
    road?: string
    city?: string
    town?: string
    village?: string
    state?: string
    postcode?: string
    country?: string
  }
  lat: string
  lon: string
}

interface AddressAutocompleteAdvancedProps {
  value: string
  onChange: (address: string) => void
  onAddressSelect: (components: AddressComponents) => void
  placeholder?: string
  className?: string
  required?: boolean
}

const AddressAutocompleteAdvanced: React.FC<
  AddressAutocompleteAdvancedProps
> = ({
  value,
  onChange,
  onAddressSelect,
  placeholder = 'Start typing your address...',
  className = '',
  required = false,
}) => {
  const [suggestions, setSuggestions] = useState<AddressResult[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<number>()

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

  const searchAddresses = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    setIsLoading(true)

    try {
      // Using Nominatim API (OpenStreetMap) - free geocoding service
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=us&q=${encodeURIComponent(query)}`,
        {
          headers: {
            'User-Agent': 'EatRite-App/1.0', // Required by Nominatim
          },
        }
      )

      if (response.ok) {
        const results: AddressResult[] = await response.json()

        // Filter for addresses (not cities, countries, etc.)
        const addressResults = results.filter(
          result => result.address.house_number && result.address.road
        )

        setSuggestions(addressResults)
        setShowSuggestions(addressResults.length > 0)
        setActiveSuggestion(-1)
      }
    } catch (error) {
      console.error('Address search error:', error)
      setSuggestions([])
      setShowSuggestions(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    onChange(inputValue)

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Debounce the API call
    debounceRef.current = setTimeout(() => {
      searchAddresses(inputValue)
    }, 300)
  }

  const parseAddressComponents = (result: AddressResult): AddressComponents => {
    const { address } = result

    return {
      streetNumber: address.house_number || '',
      route: address.road || '',
      city: address.city || address.town || address.village || '',
      state: address.state || '',
      zipCode: address.postcode || '',
      country: address.country || '',
      formattedAddress: result.display_name,
    }
  }

  const handleSuggestionClick = (result: AddressResult) => {
    const components = parseAddressComponents(result)
    const streetAddress =
      `${components.streetNumber} ${components.route}`.trim()

    onChange(streetAddress)
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
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
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
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-[#D4B46A] animate-spin" />
          ) : value ? (
            <button
              type="button"
              onClick={clearInput}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          ) : null}
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D4B46A]/30 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((result, index) => {
            const components = parseAddressComponents(result)
            const streetAddress =
              `${components.streetNumber} ${components.route}`.trim()

            return (
              <div
                key={`${result.lat}-${result.lon}`}
                onClick={() => handleSuggestionClick(result)}
                className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-[#F5EEDC] transition-colors ${
                  index === activeSuggestion ? 'bg-[#F5EEDC]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4B46A] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-[#0F2B1E]">
                      {streetAddress}
                    </div>
                    <div className="text-sm text-gray-600">
                      {components.city && `${components.city}, `}
                      {components.state} {components.zipCode}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {value.length > 2 &&
        !isLoading &&
        suggestions.length === 0 &&
        showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D4B46A]/30 rounded-lg shadow-lg z-50 p-4">
            <div className="text-gray-500 text-center">
              No addresses found. Try a different search term.
            </div>
          </div>
        )}
    </div>
  )
}

export default AddressAutocompleteAdvanced
