import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Re-map req.query to Express's req.query
app.use((req, res, next) => {
  // Express already parses req.query correctly, so nothing needed here.
  next();
});

import authRoute from './api/auth.js';
app.all('/api/auth', async (req, res) => {
  try {
    await authRoute(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

import initRoute from './api/init.js';
app.all('/api/init', async (req, res) => {
  try {
    await initRoute(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

import productsRoute from './api/products.js';
app.all('/api/products', async (req, res) => {
  try {
    await productsRoute(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Local API Dev Server running on http://localhost:${PORT}`);
});
