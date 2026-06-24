# 🍔 QuickBite

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1-000000.svg?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.0-4169E1.svg?logo=postgresql)](https://www.postgresql.org/)
[![Axios](https://img.shields.io/badge/Axios-1.8-5A29E4.svg?logo=axios)](https://axios-http.com/)

QuickBite is a modern, responsive, full-stack online food ordering platform. It provides a cohesive experience connecting hungry customers, restaurant owners, and platform administrators. Built with a robust React SPA frontend, an Express.js backend, and a relational PostgreSQL database, it delivers smooth interactions from browsing menus to placing virtual orders.

---

## 💼 The Business Problem Solved

Traditional local dining experiences often suffer from fragmented workflows. Customers find it difficult to browse menus digitially, restaurant owners struggle to manage menu offerings without technical assistance, and platform administrators have no direct visibility over user roles.

QuickBite consolidates these interactions into a single, unified interface:
*   **For Customers**: Offers a streamlined, visually rich digital catalog where users can find local restaurants, browse categories, maintain a persistent shopping cart, and place orders.
*   **For Restaurant Owners**: Provides self-service menu management panels and real-time dashboard analytics to view pending, preparing, and completed orders.
*   **For Administrators**: Grants absolute user management controls to create, update, delete, and audit account credentials and roles.

---

## ⚙️ Architecture Overview

QuickBite uses a classic three-tier architecture that segregates presentation, application logic, and data storage.

```
+-------------------------------------------------------------+
|                        Client Layer                         |
|   +-----------------------------------------------------+   |
|   |                  React Frontend                     |   |
|   |   (Axios Client, React Context, Tailwind CSS)       |   |
|   +-----------------------------------------------------+   |
+------------------------------|------------------------------+
                               |
                     HTTP Requests (JSON)
                               |
                               v
+-------------------------------------------------------------+
|                        Server Layer                         |
|   +-----------------------------------------------------+   |
|   |                  Express.js API                     |   |
|   |        (Cors, Express JSON Parser, bcrypt)          |   |
|   +-----------------------------------------------------+   |
+------------------------------|------------------------------+
                               |
                        SQL Queries (pg)
                               |
                               v
+-------------------------------------------------------------+
|                       Database Layer                        |
|   +-----------------------------------------------------+   |
|   |                   PostgreSQL                        |   |
|   |   (users, restaurants, menuitems, orderdetails)     |   |
|   +-----------------------------------------------------+   |
+-------------------------------------------------------------+
```

---

## 🛠️ Tech Stack Details

*   **Frontend**: 
    *   `React` & `TypeScript` for structured, type-safe interactive components.
    *   `Vite` for ultra-fast module bunding and build processing.
    *   `Tailwind CSS` & `shadcn/ui` (Radix UI primitives) for responsive styling and customized modern components.
    *   `React Router Dom` for dynamic client-side SPA routing.
*   **Backend**: 
    *   `Node.js` & `Express.js` for lightweight RESTful API route dispatching.
    *   `bcrypt` for secure hashing of user credentials.
*   **Database**: 
    *   `PostgreSQL` relational database management.
    *   `pg` (node-postgres) connection pool manager for high-performance querying.
*   **HTTP Client**: 
    *   `Axios` for custom client interceptors and HTTP requests.

---

## 📂 Folder Structure

```
quick-bite/
├── backend/
│   └── index.js             # Express API Server (DB Pool & Route Endpoints)
├── public/                  # Static assets and public images
├── src/
│   ├── components/          # Reusable UI component library (shadcn, form controls)
│   │   └── ui/              # Radix UI wrapper primitives (buttons, inputs, dialogs)
│   ├── contexts/            # React AuthContext and CartContext states
│   ├── data/                # Static mock data fallback profiles
│   ├── hooks/               # Custom hooks (toast systems, mobile state checks)
│   ├── lib/                 # Core helper scripts (utility styles consolidator)
│   ├── pages/               # Application page views (Home, Dashboard, Details)
│   ├── App.tsx              # Application entry component and routing layout
│   └── main.tsx             # DOM rendering entry point
├── package.json             # Root dependency configuration
├── tailwind.config.ts       # Tailwind CSS design tokens and style config
├── tsconfig.json            # TypeScript compiler options
└── vite.config.ts           # Vite compilation profile
```

---

## 🗄️ Database Schema Overview

The database layer consists of four highly constrained tables inside PostgreSQL:

### 1. `users`
Stores user profile information and authentication credentials.
*   `user_id` (SERIAL PRIMARY KEY)
*   `name` (VARCHAR(100), NOT NULL)
*   `email` (VARCHAR(100), UNIQUE, NOT NULL)
*   `role` (VARCHAR(20), CHECK role IN ('customer', 'restaurant_owner', 'admin'))
*   `password` (TEXT, Nullable for admin-created placeholders)

### 2. `restaurants`
Stores restaurant profiles linked to platform owner accounts.
*   `restaurant_id` (SERIAL PRIMARY KEY)
*   `name` (VARCHAR(100), NOT NULL)
*   `location` (VARCHAR(255), NOT NULL)
*   `owner_id` (INT, FOREIGN KEY referencing `users(user_id)` ON DELETE CASCADE)
*   `image_url` (TEXT)

### 3. `menuitems`
Stores the individual dishes available across restaurants.
*   `item_id` (SERIAL PRIMARY KEY)
*   `restaurant_id` (INT, FOREIGN KEY referencing `restaurants(restaurant_id)` ON DELETE CASCADE)
*   `name` (VARCHAR(100), NOT NULL)
*   `price` (NUMERIC(10,2), NOT NULL CHECK price > 0)
*   `availability` (BOOLEAN, DEFAULT true)

### 4. `orderdetails`
Stores line items for submitted virtual orders.
*   `order_id` (SERIAL PRIMARY KEY)
*   `user_id` (INT, FOREIGN KEY referencing `users(user_id)` ON DELETE CASCADE)
*   `item_id` (INT, FOREIGN KEY referencing `menuitems(item_id)` ON DELETE CASCADE)
*   `quantity` (INT, NOT NULL CHECK quantity > 0)
*   `order_date` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

---

## 🛣️ API Endpoints Summary

### Authentication
*   `POST /api/auth/signup` - Registers a new user account (hashes credentials and stores in database).
*   `POST /api/auth/login` - Validates user password hashes and initiates local storage sessions.

### User Management (Protected)
*   `GET /users` - Fetches all registered users (Admin and Owner access only).
*   `POST /users` - Directly inserts a new user record.
*   `PUT /users/:id` - Updates specific user credentials and metadata.
*   `DELETE /users/:id` - Deletes a user profile from the database.

### Restaurant Management
*   `GET /restaurants` - Retrieves a list of all active restaurants.
*   `POST /restaurants` - Registers a new restaurant profile linked to an owner ID.
*   `PUT /restaurants/:id` - Updates location and naming credentials of a restaurant.
*   `DELETE /restaurants/:id` - Removes a restaurant profile and cascades deletions to its menu.

---

## 🛠️ Installation & Setup

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18.0.0 or higher)
*   [PostgreSQL](https://www.postgresql.org/) (v14.0 or higher)

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/quickbite.git
cd quickbite
```

### Step 2: Install Dependencies
Install all package requirements in the project root:
```bash
npm install
```

### Step 3: Database Setup
Login to your PostgreSQL terminal, create the database, and execute the migration file:
```bash
# Create the database
psql -U postgres -h localhost -c "CREATE DATABASE food_ordering;"

# Run the schema migration and insert initial seeds
psql -U postgres -h localhost -d food_ordering -f backend/db_migration.sql
```

### Step 4: Environment Configurations
By default, the Express server connects to the database via direct settings inside the pool. Update [backend/index.js](file:///home/amancutinha/Projects/quickbite/quick-bite-order-online-main/backend/index.js) with your local database credentials:
```javascript
const pool = new Pool({
  user: 'your-postgres-user',
  host: 'localhost',
  database: 'food_ordering',
  password: 'your-postgres-password',
  port: 5432,
});
```

---

## 🏃 Running the Application

### 1. Launch the Backend API Server
```bash
node backend/index.js
```
The server will start running at `http://localhost:5000`.

### 2. Launch the React Frontend (Vite Dev Server)
In a separate terminal, execute:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🚀 Key Technical Achievements & Learning Outcomes

*   **Role-Based Access Control (RBAC)**: Implemented front-end view protections that hide dashboards and settings unless a user holds explicit matching credentials (`admin` or `restaurant_owner`).
*   **Dual Data Handling**: Designed views that dynamically connect to live database endpoints when available, while providing fallback visual options to demonstrate interface integrity.
*   **Relational Schema Integrity**: Established cascading database keys that clean up corresponding menu items and order details when a restaurant or user account is deleted.

---

## 🔮 Future Enhancements
*   **Production Token Security**: Implement JSON Web Tokens (JWT) inside HTTP-only cookies to eliminate reliance on raw storage states.
*   **Global Axios Interceptors**: Refactor standard `fetch` methods to run via a centralized Axios client handling errors globally.
*   **Live Order Tracking**: Implement WebSocket channels to push status updates ("preparing", "out for delivery") to customers dynamically.

---

## 👤 Author
*   **Aman Cutinha**
*   [GitHub Profile](https://github.com/AmanCutinha)
*   [LinkedIn Profile](https://linkedin.com/in/amancutinha)
