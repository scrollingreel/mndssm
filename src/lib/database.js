// Simple JSONBin.io Database
// Free tier: 10,000 requests/month, unlimited storage

const JSONBIN_API = 'https://api.jsonbin.io/v3'

// You'll set these after creating your JSONBin account
let API_KEY = localStorage.getItem('jsonbin_api_key') || ''
let BIN_ID = localStorage.getItem('jsonbin_bin_id') || ''

export const db = {
  // Check if database is configured
  isConfigured: () => {
    return API_KEY && BIN_ID
  },

  // Configure database with API key
  configure: async (apiKey) => {
    API_KEY = apiKey
    localStorage.setItem('jsonbin_api_key', apiKey)
    
    // Create a new bin for products
    try {
      const response = await fetch(`${JSONBIN_API}/b`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey,
          'X-Bin-Name': 'saree-store-products'
        },
        body: JSON.stringify({ products: [] })
      })
      
      if (!response.ok) throw new Error('Failed to create database')
      
      const data = await response.json()
      BIN_ID = data.metadata.id
      localStorage.setItem('jsonbin_bin_id', BIN_ID)
      
      return { success: true, binId: BIN_ID }
    } catch (error) {
      console.error('Database config error:', error)
      throw error
    }
  },

  // Connect to existing bin
  connect: (apiKey, binId) => {
    API_KEY = apiKey
    BIN_ID = binId
    localStorage.setItem('jsonbin_api_key', apiKey)
    localStorage.setItem('jsonbin_bin_id', binId)
  },

  // Get all products
  getProducts: async () => {
    if (!API_KEY || !BIN_ID) {
      // Fallback to localStorage
      const local = localStorage.getItem('customProducts')
      return local ? JSON.parse(local) : []
    }

    try {
      const response = await fetch(`${JSONBIN_API}/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': API_KEY
        }
      })
      
      if (!response.ok) throw new Error('Failed to fetch products')
      
      const data = await response.json()
      return data.record.products || []
    } catch (error) {
      console.error('Fetch error:', error)
      // Fallback to localStorage
      const local = localStorage.getItem('customProducts')
      return local ? JSON.parse(local) : []
    }
  },

  // Save all products
  saveProducts: async (products) => {
    // Always save to localStorage as backup
    localStorage.setItem('customProducts', JSON.stringify(products))

    if (!API_KEY || !BIN_ID) {
      return { success: true, source: 'local' }
    }

    try {
      const response = await fetch(`${JSONBIN_API}/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        },
        body: JSON.stringify({ products })
      })
      
      if (!response.ok) throw new Error('Failed to save products')
      
      return { success: true, source: 'cloud' }
    } catch (error) {
      console.error('Save error:', error)
      return { success: true, source: 'local' }
    }
  },

  // Add a product
  addProduct: async (product) => {
    const products = await db.getProducts()
    const newProduct = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    products.push(newProduct)
    await db.saveProducts(products)
    return newProduct
  },

  // Update a product
  updateProduct: async (id, updates) => {
    const products = await db.getProducts()
    const index = products.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Product not found')
    
    products[index] = { ...products[index], ...updates }
    await db.saveProducts(products)
    return products[index]
  },

  // Delete a product
  deleteProduct: async (id) => {
    const products = await db.getProducts()
    const filtered = products.filter(p => p.id !== id)
    await db.saveProducts(filtered)
    return { success: true }
  },

  // Clear database config (logout)
  disconnect: () => {
    API_KEY = ''
    BIN_ID = ''
    localStorage.removeItem('jsonbin_api_key')
    localStorage.removeItem('jsonbin_bin_id')
  },

  // Get current config
  getConfig: () => ({
    isConfigured: db.isConfigured(),
    binId: BIN_ID
  })
}
