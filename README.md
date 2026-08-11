# 🍔 QuickBite – Online Food Ordering Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-Latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Axios](https://img.shields.io/badge/Axios-1.8-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT Authentication](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Git](https://img.shields.io/badge/Git-VCS-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)

A full-stack web application designed for online food ordering. QuickBite connects customers with local dining establishments through an intuitive digital ordering pipeline and provides restaurant managers and platform administrators with granular administrative tools.

---

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [API Overview](#-api-overview)
- [Future Improvements](#-future-improvements)
- [Learning Outcomes](#-learning-outcomes)
- [Contributing](#-contributing)

---

## 📌 Project Overview

**QuickBite** is a full-stack online food ordering web application that allows users to browse restaurants, explore menus, add food items to a shopping cart, securely place orders, and manage their profiles. Restaurant owners and administrators can manage restaurants, menus, and incoming orders through a centralized administrative dashboard.

### Core Objectives & Engineering Highlights
- **Full-Stack Integration**: Built with a decoupled React SPA frontend and a Node.js/Express REST backend backed by PostgreSQL.
- **Role-Based Authorization (RBAC)**: Enforces access restrictions across Customer, Restaurant Owner, and Admin permissions.
- **RESTful API Architecture**: Strict separation of concerns using standardized HTTP methods, JSON responses, and stateless JWT authentication.
- **Responsive UI/UX System**: Interface styled using Tailwind CSS and ShadCN UI primitives for dynamic interactions across mobile and desktop devices.

---

## ✨ Key Features

### 🛒 Customer Features
- **User Registration & Login**: Account creation and authentication flow with session persistence.
- **Secure JWT Authentication**: Protected client routes and persistent user sessions.
- **Browse Restaurants**: Dynamic listing of available restaurants with metadata and visual badges.
- **View Restaurant Menus**: Detailed menu view categorized by dish types and availability.
- **Search Food Items**: Client-side and backend search capabilities for instant food lookup.
- **Cart Management**: Add items to cart, update item quantities dynamically, or remove items.
- **Place Orders**: Checkout pipeline for order confirmation and virtual order creation.
- **Order History**: Historical overview of past user orders and status updates.
- **User Profile Management**: View and edit user details and account preferences.

### 🛡️ Admin & Owner Features
- **Restaurant Management**: Create, update, and remove restaurant listings.
- **Menu Management**: Add, update, toggle availability, and delete menu items per restaurant.
- **Order Management**: Monitor incoming customer orders, track processing lifecycle, and update order statuses.
- **User Management**: Administrative overview to view, modify roles, or delete registered user accounts.

### 🔒 Security Features
- **JWT Authentication**: Stateless token generation and verification for authorized endpoints.
- **Password Hashing**: Salted password hashing powered by `bcrypt` prior to database persistence.
- **Protected API Routes**: Server-side middleware validation preventing unauthenticated endpoint access.
- **Input Validation**: Strict request body validation ensuring schema compliance.
- **Role-Based Authorization**: Route-level and UI-level permission barriers (`Customer`, `Restaurant Owner`, `Admin`).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)

### Database
- **Database Engine**: [PostgreSQL](https://www.postgresql.org/)

### Authentication & Security
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: `bcrypt`

### Infrastructure & Tools
- **Containerization**: [Docker](https://www.docker.com/)
- **Version Control**: [Git](https://git-scm.com/) & [GitHub](https://github.com/)

---

## 🏗️ System Architecture

QuickBite follows a classic client-server multi-tier architecture with stateless REST endpoints and relational data persistence.

```
+-------------------------------------------------------------------+
|                           CLIENT TIER                             |
|  React 18 + TypeScript SPA | Vite | Tailwind CSS | ShadCN UI      |
|  - Auth Context & Cart State Management                            |
|  - Axios Client with Request Interceptors                         |
+---------------------------------|---------------------------------+
                                  |
                        HTTPS / JSON Requests
                                  |
                                  v
+-------------------------------------------------------------------+
|                           SERVER TIER                             |
|  Node.js + Express REST API Gateway                               |
|  - Authentication Middleware (JWT Validation)                     |
|  - Role-Based Access Control (RBAC Enforcement)                   |
|  - Input Validation & Controller Handlers                         |
+---------------------------------|---------------------------------+
                                  |
                       SQL Queries (node-postgres)
                                  |
                                  v
+-------------------------------------------------------------------+
|                          DATABASE TIER                            |
|  PostgreSQL Relational Database Engine                             |
|  - Tables: users, restaurants, menuitems, orderdetails            |
|  - Foreign Key Constraints & Cascading Referential Integrity      |
+-------------------------------------------------------------------+
```

---

## 📂 Folder Structure

```
quickbite/
├── backend/
│   ├── index.js                # Express API server entry point & REST endpoints
│   └── db_migration.sql        # Database schema definitions & initial seeds
├── public/                     # Public static assets & favicon assets
├── src/
│   ├── components/             # Reusable UI component modules
│   │   └── ui/                 # ShadCN UI primitive components (Button, Dialog, etc.)
│   ├── contexts/               # React Context providers (AuthContext, CartContext)
│   ├── data/                   # Mock data and fallback static profiles
│   ├── hooks/                  # Custom React hooks (toast system, UI utility hooks)
│   ├── lib/                    # Core utility functions (Tailwind merge helpers)
│   ├── pages/                  # Page-level view components (Home, Restaurant, Cart, Admin)
│   ├── App.tsx                 # Main application component & React Router setup
│   ├── index.css               # Global Tailwind CSS definitions & design tokens
│   └── main.tsx                # Application DOM entry mount point
├── .env.example                # Template for backend environment configuration
├── docker-compose.yml          # Container configuration for backend & database
├── package.json                # Project dependencies and script definitions
├── tailwind.config.ts          # Tailwind design system configuration
├── tsconfig.json               # TypeScript compiler options
└── vite.config.ts              # Vite bundler build settings
```

---

## ⚙️ Installation Guide

Follow these step-by-step instructions to clone, configure, and run QuickBite locally.

### Prerequisites
- **Node.js** (`v18.0.0` or higher)
- **npm** (`v9.0.0` or higher)
- **PostgreSQL** (`v14.0` or higher)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/quickbite.git
cd quickbite
```

---

### Step 2: Backend Setup & Database Migration

1. **Navigate to the root and install backend dependencies:**
   ```bash
   npm install
   ```

2. **Setup the PostgreSQL Database:**
   Ensure PostgreSQL is running locally, then create the target database and execute the SQL schema script:
   ```bash
   # Create database
   psql -U postgres -c "CREATE DATABASE quickbite_db;"

   # Run schema migration and initial seeds
   psql -U postgres -d quickbite_db -f backend/db_migration.sql
   ```

3. **Configure Backend Environment Variables:**
   Create a `.env` file inside the project root:
   ```bash
   cp .env.example .env
   ```

4. **Launch the Backend API Server:**
   ```bash
   node backend/index.js
   ```
   The backend server will start at `http://localhost:5000`.

---

### Step 3: Frontend Setup

1. **Start the Frontend Development Server:**
   Open a separate terminal window and run:
   ```bash
   npm run dev
   ```

2. **Access the Web Application:**
   Open your browser and navigate to `http://localhost:5173`.

---

## 🔑 Environment Variables

Create a `.env` file in your root folder following this structure:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/quickbite_db

# Security & Authentication
JWT_SECRET=your_super_secret_jwt_key_change_in_production

# Server Port Configuration
PORT=5000
```

---

## 📡 API Overview

QuickBite exposes a RESTful HTTP API following standard endpoint conventions. 

<details>
<summary><strong>🔍 Click to expand API Endpoint Reference</strong></summary>

<br />

| Category | HTTP Method | Endpoint Path | Description | Access Level |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/signup` | Register a new user account | Public |
| **Auth** | `POST` | `/api/auth/login` | Authenticate user and issue JWT token | Public |
| **Restaurants** | `GET` | `/restaurants` | Retrieve list of all available restaurants | Public |
| **Restaurants** | `POST` | `/restaurants` | Create a new restaurant listing | Admin / Owner |
| **Restaurants** | `PUT` | `/restaurants/:id` | Update restaurant details | Admin / Owner |
| **Restaurants** | `DELETE` | `/restaurants/:id` | Delete restaurant listing | Admin |
| **Menu** | `GET` | `/restaurants/:id/menu` | Retrieve menu items for a restaurant | Public |
| **Menu** | `POST` | `/menu` | Add a new food item to a menu | Admin / Owner |
| **Orders** | `POST` | `/orders` | Submit a new food order | Authenticated |
| **Orders** | `GET` | `/orders/user/:userId` | Get order history for a specific customer | Authenticated |
| **Admin** | `GET` | `/users` | List all registered user accounts | Admin |
| **Admin** | `DELETE` | `/users/:id` | Remove a user account | Admin |

</details>

---

## 🚀 Future Improvements

- 💳 **Online Payments**: Integration with Stripe or PayPal payment gateways for automated transaction processing.
- 🔔 **Notifications**: Real-time push and email notifications for order confirmation and status updates.
- ⭐ **Reviews & Ratings**: Customer rating and feedback module for restaurants and dish items.
- 📍 **Live Order Tracking**: Interactive map integration with WebSockets for real-time delivery status updates.
- 🤖 **Recommendation System**: ML-assisted food recommendation engine based on user preference history.
- 🐳 **Docker Compose Deployment**: Single-command container orchestration for backend, frontend, and PostgreSQL database.
- 🔄 **CI/CD Pipeline**: GitHub Actions workflows for automated testing, linting, and cloud deployments.

---

## 🎯 Learning Outcomes

Building **QuickBite** provided practical hands-on experience in full-stack engineering principles required for scalable web products:

- **End-to-End Type Safety**: Designing React interfaces backed by TypeScript interfaces to reduce runtime bugs.
- **RESTful API Engineering**: Designing stateless backend endpoints adhering to standard HTTP verbs and status codes.
- **Authentication & RBAC**: Implementing JWT validation middleware and securing routes based on user role authorizations.
- **Relational Schema Normalization**: Designing PostgreSQL tables with primary/foreign keys and cascading operational constraints.
- **Modern UI Component Systems**: Utilizing Tailwind CSS and ShadCN UI to craft responsive components.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve QuickBite, please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your Changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the Branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**
