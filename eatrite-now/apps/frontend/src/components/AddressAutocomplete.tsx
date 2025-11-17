import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Loader2 } from 'lucide-react'

interface AddressComponents {
  streetNumber: string
  route: string
  city: string
  state: string
  zipCode: string
  country: string
  formattedAddress: string
}

interface AddressAutocompleteProps {
  value: string
  onChange: (address: string) => void
  onAddressSelect: (components: AddressComponents) => void
  placeholder?: string
  className?: string
  required?: boolean
}

declare global {
  interface Window {
    google: any
    initGooglePlaces: () => void
  }
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onAddressSelect,
  placeholder = 'Enter your address',
  className = '',
  required = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false)

  // Check if Google Maps is already loaded
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      setIsGoogleLoaded(true)
      initializeAutocomplete()
    } else {
      loadGoogleMapsScript()
    }
  }, [])

  const loadGoogleMapsScript = () => {
    // Check if script is already loaded or loading
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for the script to load
      const checkGoogle = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkGoogle)
          setIsGoogleLoaded(true)
          initializeAutocomplete()
        }
      }, 100)
      return
    }

    const script = document.createElement('script')
    // Using a demo key - replace with your actual Google Places API key
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initGooglePlaces`
    script.async = true
    script.defer = true

    window.initGooglePlaces = () => {
      setIsGoogleLoaded(true)
      initializeAutocomplete()
    }

    document.head.appendChild(script)
  }

  const initializeAutocomplete = () => {
    if (!inputRef.current || !window.google) return

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ['address'],
        componentRestrictions: { country: 'us' }, // Restrict to US addresses
        fields: ['address_components', 'formatted_address', 'geometry'],
      }
    )

    autocompleteRef.current = autocomplete

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      if (!place.address_components) {
        return
      }

      setIsLoading(true)

      // Parse address components
      const components: AddressComponents = {
        streetNumber: '',
        route: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        formattedAddress: place.formatted_address || '',
      }

      place.address_components.forEach((component: any) => {
        const types = component.types

        if (types.includes('street_number')) {
          components.streetNumber = component.long_name
        } else if (types.includes('route')) {
          components.route = component.long_name
        } else if (
          types.includes('locality') ||
          types.includes('sublocality')
        ) {
          components.city = component.long_name
        } else if (types.includes('administrative_area_level_1')) {
          components.state = component.short_name
        } else if (types.includes('postal_code')) {
          components.zipCode = component.long_name
        } else if (types.includes('country')) {
          components.country = component.long_name
        }
      })

      // Update the input value
      const fullAddress =
        `${components.streetNumber} ${components.route}`.trim()
      onChange(fullAddress || components.formattedAddress)

      // Call the callback with parsed components
      onAddressSelect(components)

      setIsLoading(false)
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4B46A] w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-12 pr-12 py-3 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50 ${className}`}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D4B46A] w-5 h-5 animate-spin" />
        )}
      </div>

      {!isGoogleLoaded && (
        <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading address suggestions...
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressAutocomplete
