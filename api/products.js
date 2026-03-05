import db from './db.js'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    switch (req.method) {
      case 'GET':
        return await getProducts(req, res)
      case 'POST':
        return await createProduct(req, res)
      case 'PUT':
        return await updateProduct(req, res)
      case 'DELETE':
        return await deleteProduct(req, res)
      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Database error:', error)
    return res.status(500).json({ error: 'Internal server error', details: error.message })
  }
}

async function getProducts(req, res) {
  const { id, category, custom_only } = req.query

  let query = 'SELECT * FROM products'
  const params = []
  const conditions = []

  if (id) {
    conditions.push(`id = ?`)
    params.push(id)
  }

  if (category && category !== 'All') {
    conditions.push(`category = ?`)
    params.push(category)
  }

  if (custom_only === 'true') {
    conditions.push('is_custom = 1')
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ')
  }

  query += ' ORDER BY created_at DESC'

  const stmt = db.prepare(query)
  const rows = stmt.all(...params)

  // Transform to frontend format
  const products = rows.map(row => ({
    id: row.id,
    name: row.name,
    category: row.category,
    price: parseFloat(row.price),
    originalPrice: row.original_price ? parseFloat(row.original_price) : null,
    image: row.image,
    badge: row.badge,
    description: row.description,
    isCustom: row.is_custom === 1,
    createdAt: row.created_at
  }))

  return res.status(200).json(products)
}

async function createProduct(req, res) {
  const { name, category, price, originalPrice, image, badge, description } = req.body

  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Name, category, and price are required' })
  }

  const stmt = db.prepare(`
    INSERT INTO products (name, category, price, original_price, image, badge, description, is_custom)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    RETURNING *
  `)

  const row = stmt.get(
    name,
    category,
    price,
    originalPrice || null,
    image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop',
    badge || null,
    description || null
  )

  const product = {
    id: row.id,
    name: row.name,
    category: row.category,
    price: parseFloat(row.price),
    originalPrice: row.original_price ? parseFloat(row.original_price) : null,
    image: row.image,
    badge: row.badge,
    description: row.description,
    isCustom: row.is_custom === 1,
    createdAt: row.created_at
  }

  return res.status(201).json(product)
}

async function updateProduct(req, res) {
  const { id } = req.query
  const { name, category, price, originalPrice, image, badge, description } = req.body

  if (!id) {
    return res.status(400).json({ error: 'Product ID is required' })
  }

  const stmt = db.prepare(`
    UPDATE products 
    SET name = COALESCE(?, name),
        category = COALESCE(?, category),
        price = COALESCE(?, price),
        original_price = ?,
        image = COALESCE(?, image),
        badge = ?,
        description = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    RETURNING *
  `)

  const row = stmt.get(name, category, price, originalPrice || null, image, badge || null, description || null, id)

  if (!row) {
    return res.status(404).json({ error: 'Product not found' })
  }

  const product = {
    id: row.id,
    name: row.name,
    category: row.category,
    price: parseFloat(row.price),
    originalPrice: row.original_price ? parseFloat(row.original_price) : null,
    image: row.image,
    badge: row.badge,
    description: row.description,
    isCustom: row.is_custom === 1
  }

  return res.status(200).json(product)
}

async function deleteProduct(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Product ID is required' })
  }

  const stmt = db.prepare('DELETE FROM products WHERE id = ? RETURNING id')
  const row = stmt.get(id)

  if (!row) {
    return res.status(404).json({ error: 'Product not found' })
  }

  return res.status(200).json({ message: 'Product deleted successfully', id: parseInt(id) })
}
