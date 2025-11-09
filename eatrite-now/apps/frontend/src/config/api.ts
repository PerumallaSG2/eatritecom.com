// API Configuration - automatically detects backend URL
const getApiBaseUrl = (): string => {
  // In development, try different common backend ports
  if (import.meta.env.DEV) {
    // Check if VITE_API_URL is set in environment
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL
    }
    
    // Default to backend port (usually 4005)
    const backendPort = '4005' // Backend typically runs on 4005
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    
    return `${protocol}//${hostname}:${backendPort}`
  }
  
  // In production, use relative path or environment variable
  return import.meta.env.VITE_API_URL || '/api'
}

export const API_BASE_URL = getApiBaseUrl()

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${baseUrl}${cleanEndpoint}`
}

// Export for debugging
if (import.meta.env.DEV) {
  console.log('🔗 API Base URL:', API_BASE_URL)
}