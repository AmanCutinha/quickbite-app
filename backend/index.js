// backend/index.js

import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'food_ordering',  // replace with actual db name
  password: 'aman1234',       // replace with your password
  port: 5432,
});

// Routes
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send('Server Error');
  }
});
app.post('/users', async (req, res) => {
    const { name, email, role } = req.body;
  
    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
        [name, email, role]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error adding user:', err.message);
      res.status(500).send('Server error');
    }
  });
  

app.get('/restaurants', async (req, res) => {
    console.log('GET /restaurants was called');
    try {
      const result = await pool.query('SELECT * FROM restaurants');
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching restaurants:', err.message);
      res.status(500).send('Server Error');
    }
  });
  app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err.message);
      res.status(500).send('Server error');
    }
  });
  app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, email, role } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE users SET name = $1, email = $2, role = $3 WHERE user_id = $4 RETURNING *',
        [name, email, role, userId]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating user:', err.message);
      res.status(500).send('Server error');
    }
  });
  
  
  // Start server
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
  });

