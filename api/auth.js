import db from './db.js'
import crypto from 'crypto'

// Simple password hashing (in production, use bcrypt)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + process.env.AUTH_SECRET).digest('hex')
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { action, username, password } = req.body

    if (action === 'login') {
      return await login(username, password, res)
    } else if (action === 'verify') {
      return await verifyToken(req.body.token, res)
    } else if (action === 'setup') {
      return await setupAdmin(username, password, res)
    } else {
      return res.status(400).json({ error: 'Invalid action' })
    }
  } catch (error) {
    console.error('Auth error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function login(username, password, res) {
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  // Check environment variable for simple auth (for demo)
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  if (username === 'admin' && password === adminPassword) {
    // Generate simple token
    const token = crypto.randomBytes(32).toString('hex')
    const expiry = Date.now() + (24 * 60 * 60 * 1000) // 24 hours

    return res.status(200).json({
      success: true,
      token,
      expiry,
      message: 'Login successful'
    })
  }

  // Check database for admin user
  const stmt = db.prepare('SELECT * FROM admin_users WHERE username = ?')
  const user = stmt.get(username)

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const hashedPassword = hashPassword(password)

  if (user.password_hash !== hashedPassword) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expiry = Date.now() + (24 * 60 * 60 * 1000)

  return res.status(200).json({
    success: true,
    token,
    expiry,
    message: 'Login successful'
  })
}

async function verifyToken(token, res) {
  // Simple token verification (in production, use JWT)
  if (!token) {
    return res.status(401).json({ valid: false })
  }

  // For demo, we'll accept any non-empty token
  // In production, store tokens in database or use JWT
  return res.status(200).json({ valid: true })
}

async function setupAdmin(username, password, res) {
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  const hashedPassword = hashPassword(password)

  try {
    const stmt = db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)')
    stmt.run(username, hashedPassword)
    return res.status(201).json({ message: 'Admin user created successfully' })
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ error: 'Username already exists' })
    }
    throw error
  }
}
