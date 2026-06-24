import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pkg;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'food_ordering',
  password: 'aman1234',
  port: 5432,
});

// Middleware to check user role
const checkUserRole = (req, res, next) => {
  const role = req.headers["x-user-role"];
  if (!role) return res.status(403).json({ message: "Missing user role" });

  if (role !== "admin" && role !== "restaurant_owner") {
    return res.status(403).json({ message: "Access denied" });
  }

  req.userRole = role;
  next();
};

// AUTH ROUTES
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, name, email, role',
      [name, email, hashedPassword, role]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const { password: _, ...userData } = user;
    res.json({ user: userData });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Login failed' });
  }
});

// USERS ROUTES (protected)
app.get('/users', checkUserRole, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/users', checkUserRole, async (req, res) => {
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

app.put('/users/:id', checkUserRole, async (req, res) => {
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

app.delete('/users/:id', checkUserRole, async (req, res) => {
  const userId = req.params.id;

  try {
    await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).send('Server error');
  }
});

// RESTAURANTS ROUTES
app.get('/restaurants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants ORDER BY restaurant_id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching restaurants:', err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM restaurants WHERE restaurant_id = $1', [restaurantId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching restaurant details:', err.message);
    res.status(500).send('Server error');
  }
});

app.get('/restaurants/:id/menu', async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const result = await pool.query(`
      SELECT mi.item_id, mi.name, mi.description, mi.price, mi.availability, mi.image_url, mc.name as category_name
      FROM menuitems mi
      LEFT JOIN menu_categories mc ON mi.category_id = mc.id
      WHERE mi.restaurant_id = $1
      ORDER BY mi.item_id ASC
    `, [restaurantId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching menu:', err.message);
    res.status(500).send('Server error');
  }
});

app.post('/restaurants', async (req, res) => {
  const { name, description, cuisine, address, city, delivery_time, price_range, hero_image, banner_image, owner_id } = req.body;
  if (!name || !description || !cuisine || !address || !delivery_time || !price_range || !hero_image || !banner_image || !owner_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO restaurants (name, description, cuisine, address, city, delivery_time, price_range, hero_image, banner_image, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [name, description, cuisine, address, city || 'Foodville', delivery_time, price_range, hero_image, banner_image, owner_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding restaurant:', err.message);
    res.status(500).send('Server error');
  }
});

app.put('/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;
  const { name, description, cuisine, address, city, delivery_time, price_range, hero_image, banner_image, owner_id } = req.body;

  try {
    const result = await pool.query(
      'UPDATE restaurants SET name = $1, description = $2, cuisine = $3, address = $4, city = $5, delivery_time = $6, price_range = $7, hero_image = $8, banner_image = $9, owner_id = $10 WHERE restaurant_id = $11 RETURNING *',
      [name, description, cuisine, address, city || 'Foodville', delivery_time, price_range, hero_image, banner_image, owner_id, restaurantId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating restaurant:', err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/restaurants/:id', async (req, res) => {
  const restaurantId = req.params.id;

  try {
    await pool.query('DELETE FROM restaurants WHERE restaurant_id = $1', [restaurantId]);
    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    console.error('Error deleting restaurant:', err.message);
    res.status(500).send('Server error');
  }
});

// MENU ITEMS ROUTES
app.post('/menuitems', async (req, res) => {
  const { name, description, price, image_url, category, availability, restaurant_id } = req.body;
  if (!name || !price || !restaurant_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Get or create category_id
    let categoryId = null;
    if (category) {
      const catResult = await pool.query(
        'INSERT INTO menu_categories (restaurant_id, name) VALUES ($1, $2) ON CONFLICT (restaurant_id, name) DO UPDATE SET name = EXCLUDED.name RETURNING id',
        [restaurant_id, category]
      );
      categoryId = catResult.rows[0].id;
    }

    // 2. Insert menu item
    const result = await pool.query(
      'INSERT INTO menuitems (name, description, price, image_url, category_id, availability, restaurant_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, price, image_url, categoryId, availability !== undefined ? availability : true, restaurant_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding menu item:', err.message);
    res.status(500).send('Server error');
  }
});

app.put('/menuitems/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name, description, price, image_url, category, availability, restaurant_id } = req.body;

  try {
    // 1. Get or create category_id
    let categoryId = null;
    if (category && restaurant_id) {
      const catResult = await pool.query(
        'INSERT INTO menu_categories (restaurant_id, name) VALUES ($1, $2) ON CONFLICT (restaurant_id, name) DO UPDATE SET name = EXCLUDED.name RETURNING id',
        [restaurant_id, category]
      );
      categoryId = catResult.rows[0].id;
    }

    // 2. Update menu item
    const result = await pool.query(
      'UPDATE menuitems SET name = $1, description = $2, price = $3, image_url = $4, category_id = COALESCE($5, category_id), availability = $6 WHERE item_id = $7 RETURNING *',
      [name, description, price, image_url, categoryId, availability, itemId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating menu item:', err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/menuitems/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    await pool.query('DELETE FROM menuitems WHERE item_id = $1', [itemId]);
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error('Error deleting menu item:', err.message);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
