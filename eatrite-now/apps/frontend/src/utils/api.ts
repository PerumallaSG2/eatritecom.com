// API utility functions and helpers

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedApiResponse<T = any> extends ApiResponse<T[]> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  timeout?: number
  retries?: number
  retryDelay?: number
}

// Base API configuration
const DEFAULT_CONFIG: RequestConfig = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
}

// Get API base URL
export const getApiBaseUrl = (): string => {
  // Client-side (Vite environment)
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
}

// Build full URL
export const buildUrl = (endpoint: string, params?: Record<string, any>): string => {
  const baseUrl = getApiBaseUrl()
  const url = new URL(endpoint.startsWith('/') ? endpoint : `/${endpoint}`, baseUrl)
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        url.searchParams.append(key, String(value))
      }
    })
  }
  
  return url.toString()
}

// HTTP client with retry logic
export const httpClient = async <T = any>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  const fullConfig = { ...DEFAULT_CONFIG, ...config }
  const url = buildUrl(endpoint)

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= (fullConfig.retries || 0); attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), fullConfig.timeout)

      const requestConfig: RequestInit = {
        method: fullConfig.method,
        headers: fullConfig.headers,
        signal: controller.signal,
      }

      if (fullConfig.body && fullConfig.method !== 'GET') {
        requestConfig.body = 
          typeof fullConfig.body === 'string' 
            ? fullConfig.body 
            : JSON.stringify(fullConfig.body)
      }

      const response = await fetch(url, requestConfig)
      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type')
      let data: T

      if (contentType?.includes('application/json')) {
        data = await response.json()
      } else {
        data = (await response.text()) as unknown as T
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      lastError = error as Error
      
      if (attempt < (fullConfig.retries || 0)) {
        await new Promise(resolve => 
          setTimeout(resolve, fullConfig.retryDelay || 1000)
        )
        continue
      }
    }
  }

  return {
    success: false,
    error: lastError?.message || 'Unknown error occurred',
  }
}

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string, params?: Record<string, any>, config?: Omit<RequestConfig, 'method'>) =>
    httpClient<T>(buildUrl(endpoint, params), { ...config, method: 'GET' }),

  post: <T = any>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>) =>
    httpClient<T>(endpoint, { ...config, method: 'POST', body }),

  put: <T = any>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>) =>
    httpClient<T>(endpoint, { ...config, method: 'PUT', body }),

  patch: <T = any>(endpoint: string, body?: any, config?: Omit<RequestConfig, 'method'>) =>
    httpClient<T>(endpoint, { ...config, method: 'PATCH', body }),

  delete: <T = any>(endpoint: string, config?: Omit<RequestConfig, 'method'>) =>
    httpClient<T>(endpoint, { ...config, method: 'DELETE' }),
}

// Specific API endpoints
export const mealsApi = {
  getAll: (params?: { category?: string; limit?: number; search?: string }) =>
    api.get('/api/meals', params),

  getById: (id: string) => api.get(`/api/meals/${id}`),

  getByCategory: (category: string, limit?: number) =>
    api.get(`/api/meals/category/${category}`, { limit }),
}

export const ordersApi = {
  create: (orderData: any) => api.post('/api/orders', orderData),

  getAll: (email?: string) => api.get('/api/orders', email ? { email } : undefined),

  getById: (id: string) => api.get(`/api/orders/${id}`),

  updateStatus: (id: string, status: string) =>
    api.patch(`/api/orders/${id}`, { status }),
}

export const usersApi = {
  register: (userData: any) => api.post('/api/users/register', userData),

  login: (credentials: { email: string; password: string }) =>
    api.post('/api/users/login', credentials),

  getProfile: () => api.get('/api/users/profile'),

  updateProfile: (profileData: any) =>
    api.put('/api/users/profile', profileData),

  updatePreferences: (preferences: any) =>
    api.put('/api/users/preferences', preferences),
}

export const plansApi = {
  getAll: () => api.get('/api/plans'),

  subscribe: (planData: any) => api.post('/api/subscriptions', planData),

  updateSubscription: (id: string, updates: any) =>
    api.patch(`/api/subscriptions/${id}`, updates),

  cancelSubscription: (id: string) =>
    api.delete(`/api/subscriptions/${id}`),
}

// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const handleApiError = (error: any): string => {
  if (error instanceof ApiError) {
    return error.message
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  
  if (error?.message) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}

// Request/Response interceptors
type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>
type ResponseInterceptor = (response: any) => any | Promise<any>

class ApiClient {
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor)
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor)
  }

  private async applyRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let result = config
    for (const interceptor of this.requestInterceptors) {
      result = await interceptor(result)
    }
    return result
  }

  private async applyResponseInterceptors(response: any): Promise<any> {
    let result = response
    for (const interceptor of this.responseInterceptors) {
      result = await interceptor(result)
    }
    return result
  }

  async request<T = any>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    try {
      const processedConfig = await this.applyRequestInterceptors(config)
      const response = await httpClient<T>(endpoint, processedConfig)
      return await this.applyResponseInterceptors(response)
    } catch (error) {
      throw new ApiError(handleApiError(error))
    }
  }
}

// Create default client instance
export const apiClient = new ApiClient()

// Add common interceptors
apiClient.addRequestInterceptor((config) => {
  // Add auth token if available
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return config
})

apiClient.addResponseInterceptor((response) => {
  // Log successful requests in development
  if (import.meta.env.DEV) {
    console.log('API Response:', response)
  }
  return response
})

// Cache utilities
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

export const cacheApi = {
  set: (key: string, data: any, ttlMs = 5 * 60 * 1000) => {
    cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    })
  },

  get: (key: string) => {
    const cached = cache.get(key)
    if (!cached) return null

    if (Date.now() - cached.timestamp > cached.ttl) {
      cache.delete(key)
      return null
    }

    return cached.data
  },

  clear: (pattern?: string) => {
    if (pattern) {
      for (const key of cache.keys()) {
        if (key.includes(pattern)) {
          cache.delete(key)
        }
      }
    } else {
      cache.clear()
    }
  },
}

// Cached API wrapper
export const cachedApi = {
  get: async <T = any>(
    endpoint: string,
    params?: Record<string, any>,
    ttlMs = 5 * 60 * 1000
  ) => {
    const cacheKey = `${endpoint}?${JSON.stringify(params || {})}`
    const cached = cacheApi.get(cacheKey)
    
    if (cached) {
      return { success: true, data: cached } as ApiResponse<T>
    }

    const response = await api.get<T>(endpoint, params)
    
    if (response.success && response.data) {
      cacheApi.set(cacheKey, response.data, ttlMs)
    }

    return response
  },
}

// Upload utilities
export const uploadApi = {
  uploadFile: async (file: File, endpoint = '/api/upload'): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData()
    formData.append('file', file)

    return httpClient(endpoint, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    })
  },

  uploadMultiple: async (files: FileList, endpoint = '/api/upload/multiple') => {
    const formData = new FormData()
    Array.from(files).forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    return httpClient(endpoint, {
      method: 'POST',
      body: formData,
      headers: {},
    })
  },
}