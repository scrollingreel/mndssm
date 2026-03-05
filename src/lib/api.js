// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Helper for API calls
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }
  
  // Add auth token if available
  const token = sessionStorage.getItem('adminToken')
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || 'Request failed')
  }
  
  return response.json()
}

// Products API
export const productsAPI = {
  // Get all products (optionally filter by category)
  getAll: async (category = null) => {
    const params = new URLSearchParams()
    if (category && category !== 'All') {
      params.append('category', category)
    }
    const query = params.toString() ? `?${params.toString()}` : ''
    return fetchAPI(`/products${query}`)
  },
  
  // Get custom products only (admin added)
  getCustom: async () => {
    return fetchAPI('/products?custom_only=true')
  },
  
  // Get single product
  getById: async (id) => {
    return fetchAPI(`/products?id=${id}`)
  },
  
  // Create new product
  create: async (product) => {
    return fetchAPI('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    })
  },
  
  // Update product
  update: async (id, product) => {
    return fetchAPI(`/products?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    })
  },
  
  // Delete product
  delete: async (id) => {
    return fetchAPI(`/products?id=${id}`, {
      method: 'DELETE',
    })
  },
}

// Auth API
export const authAPI = {
  // Login
  login: async (username, password) => {
    const response = await fetchAPI('/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'login', username, password }),
    })
    
    if (response.success) {
      sessionStorage.setItem('adminToken', response.token)
      sessionStorage.setItem('adminAuth', 'true')
    }
    
    return response
  },
  
  // Logout
  logout: () => {
    sessionStorage.removeItem('adminToken')
    sessionStorage.removeItem('adminAuth')
  },
  
  // Check if authenticated
  isAuthenticated: () => {
    return sessionStorage.getItem('adminAuth') === 'true'
  },
  
  // Verify token
  verify: async () => {
    const token = sessionStorage.getItem('adminToken')
    if (!token) return false
    
    try {
      const response = await fetchAPI('/auth', {
        method: 'POST',
        body: JSON.stringify({ action: 'verify', token }),
      })
      return response.valid
    } catch {
      return false
    }
  },
}

// Initialize database
export const initDatabase = async () => {
  return fetchAPI('/init', { method: 'POST' })
}
