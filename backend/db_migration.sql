-- Database Migration & Seed Script for QuickBite

-- 1. Drop existing tables to establish the new schema
DROP TABLE IF EXISTS orderdetails CASCADE;
DROP TABLE IF EXISTS menuitems CASCADE;
DROP TABLE IF EXISTS menu_categories CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;

-- 2. Create restaurants table with extended portfolio fields
CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cuisine VARCHAR(100),
    address VARCHAR(255),
    city VARCHAR(100),
    rating NUMERIC(2, 1) DEFAULT 4.0,
    review_count INT DEFAULT 0,
    delivery_time VARCHAR(50) DEFAULT '20-30 min',
    price_range VARCHAR(10) DEFAULT '$$',
    hero_image TEXT,
    banner_image TEXT,
    featured BOOLEAN DEFAULT FALSE,
    owner_id INT REFERENCES users(user_id) ON DELETE CASCADE
);

-- 3. Create menu_categories table for proper menu normalization
CREATE TABLE menu_categories (
    id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT unique_restaurant_category UNIQUE (restaurant_id, name)
);

-- 4. Create menuitems table matching client specs and categories
CREATE TABLE menuitems (
    item_id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
    category_id INT REFERENCES menu_categories(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
    image_url TEXT,
    availability BOOLEAN DEFAULT TRUE
);

-- 5. Create orderdetails table referencing the new menuitems
CREATE TABLE orderdetails (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    item_id INT REFERENCES menuitems(item_id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Insert Seed Data
-- We assume owner_id = 9 (Aman - restaurant_owner) exists. 
-- In case it doesn't, we select a fallback from the users table.

-- Insert Restaurants
INSERT INTO restaurants (restaurant_id, name, description, cuisine, address, city, rating, review_count, delivery_time, price_range, hero_image, banner_image, featured, owner_id) VALUES
(1, 'Tasty Burgers', 'Delicious homemade burgers with fresh ingredients', 'American', '123 Burger St, Foodville', 'Foodville', 4.7, 47, '20-30 min', '$$', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', true, 9),
(2, 'Pizza Palace', 'Authentic Italian pizzas with a variety of toppings', 'Italian', '456 Pizza Lane, Foodville', 'Foodville', 4.5, 45, '30-40 min', '$$', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', true, 9),
(3, 'Sushi Spot', 'Fresh sushi made daily by experienced chefs', 'Japanese', '789 Sushi Ave, Foodville', 'Foodville', 4.8, 48, '25-35 min', '$$$', 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', true, 9),
(4, 'Taco Town', 'Authentic Mexican tacos and burritos', 'Mexican', '321 Taco Rd, Foodville', 'Foodville', 4.6, 26, '15-25 min', '$', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', false, 9),
(5, 'Curry House', 'Flavorful Indian curries and kebabs', 'Indian', '567 Curry St, Foodville', 'Foodville', 4.4, 38, '35-45 min', '$$', 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', false, 9),
(6, 'Noodle Bar', 'Variety of Asian noodles and dumplings', 'Asian', '890 Noodle Blvd, Foodville', 'Foodville', 4.3, 29, '20-30 min', '$$', 'https://images.unsplash.com/photo-1503392968123-cebbe9f26526?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1503392968123-cebbe9f26526?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80', false, 9);

-- Insert Menu Categories
INSERT INTO menu_categories (id, restaurant_id, name) VALUES
(1, 1, 'Burgers'),
(2, 1, 'Sides'),
(3, 1, 'Drinks'),
(4, 2, 'Pizzas'),
(5, 2, 'Sides'),
(6, 2, 'Salads'),
(7, 2, 'Drinks'),
(8, 3, 'Rolls'),
(9, 4, 'Tacos'),
(10, 5, 'Curries'),
(11, 6, 'Noodles');

-- Insert Menu Items
INSERT INTO menuitems (item_id, restaurant_id, category_id, name, description, price, image_url, availability) VALUES
-- Tasty Burgers Menu
(1, 1, 1, 'Classic Cheeseburger', 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce', 9.99, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(2, 1, 1, 'Bacon Burger', 'Beef patty with crispy bacon, cheddar cheese, lettuce, and BBQ sauce', 11.99, 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(3, 1, 1, 'Veggie Burger', 'Plant-based patty with lettuce, tomato, and vegan mayo', 10.99, 'https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(4, 1, 2, 'French Fries', 'Crispy golden fries with sea salt', 4.99, 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(5, 1, 2, 'Onion Rings', 'Crispy battered onion rings', 5.99, 'https://images.unsplash.com/photo-1639024471283-03518883512d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(6, 1, 3, 'Chocolate Milkshake', 'Thick chocolate milkshake with whipped cream', 6.99, 'https://images.unsplash.com/photo-1594488506255-a8bbadefc88e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),

-- Pizza Palace Menu
(7, 2, 4, 'Margherita Pizza', 'Classic pizza with tomato sauce, mozzarella, and basil', 12.99, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(8, 2, 4, 'Pepperoni Pizza', 'Pizza with tomato sauce, mozzarella, and pepperoni', 14.99, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(9, 2, 4, 'Vegetarian Pizza', 'Pizza with tomato sauce, mozzarella, bell peppers, mushrooms, and olives', 13.99, 'https://images.unsplash.com/photo-1573821663912-569905455b1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(10, 2, 5, 'Garlic Bread', 'Toasted bread with garlic butter and herbs', 5.99, 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(11, 2, 6, 'Caesar Salad', 'Romaine lettuce with Caesar dressing, croutons, and parmesan', 8.99, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(12, 2, 7, 'Soda', 'Your choice of soft drink', 2.99, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),

-- Sushi Spot Menu
(13, 3, 8, 'California Roll', 'Crab, avocado, and cucumber roll', 9.99, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),
(14, 3, 8, 'Spicy Tuna Roll', 'Roll with spicy tuna and cucumber', 10.99, 'https://images.unsplash.com/photo-1676037150408-4b59a542f691?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),

-- Taco Town Menu
(15, 4, 9, 'Beef Taco', 'Corn tortilla with seasoned beef, lettuce, cheese, and salsa', 3.99, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),

-- Curry House Menu
(16, 5, 10, 'Chicken Tikka Masala', 'Grilled chicken in a creamy tomato sauce', 15.99, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true),

-- Noodle Bar Menu
(17, 6, 11, 'Pad Thai', 'Stir-fried rice noodles with tofu, peanuts, and bean sprouts', 13.99, 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', true);

-- Fix Serial Sequence values in PostgreSQL
SELECT setval('restaurants_restaurant_id_seq', (SELECT MAX(restaurant_id) FROM restaurants));
SELECT setval('menu_categories_id_seq', (SELECT MAX(id) FROM menu_categories));
SELECT setval('menuitems_item_id_seq', (SELECT MAX(item_id) FROM menuitems));
