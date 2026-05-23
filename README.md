# 🛍️ Aura Commerce

> A modern full-stack e-commerce platform built with the **PERN Stack**.

Aura Commerce is a scalable and production-ready e-commerce application featuring secure authentication, responsive UI, advanced state management, product management, shopping cart functionality, analytics dashboards, Redis caching, and modern developer tooling.

Designed for speed ⚡, scalability 📈, clean architecture 🏗️, and seamless user experience ✨.

---

# 🚀 Tech Stack

## 🎨 Frontend
- ⚛️ React 19
- 🟦 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS v4
- 🐻 Zustand
- 🔄 TanStack Query
- 📝 React Hook Form
- ✅ Zod
- 🎬 Framer Motion

---

## 🛠️ Backend
- 🟢 Node.js
- 🚂 Express.js
- 🟦 TypeScript
- 🐘 Neon PostgreSQL
- ⚡ Redis
- 🔐 JWT Authentication
- ✅ Zod Validation
- 📜 Winston Logger

---

# ✨ Features

## 🔐 Authentication & Authorization
- JWT Authentication
- Refresh & Access Tokens
- Role-Based Access Control (RBAC)
- Secure Password Hashing
- Protected Routes
- HTTP-only Cookies

---

## 🛒 E-Commerce Features
- Product Management
- Product Variants
- Notifications System
- Categories
- Shopping Cart
- Wishlist
- Inventory Management
- Order Processing
- Admin Dashboard

---

## 💻 Frontend Features
- Fully Responsive UI
- Dark / Light Mode Ready
- Smooth Animations
- Real-Time State Management
- Optimized API Fetching
- Error Boundaries
- Multi-Step / Wizard Forms
- Form Validation

---

## ⚙️ Backend Features
- RESTful API
- Redis Caching
- Modular Architecture
- Centralized Error Handling
- Rate Limiting
- Security Middleware
- Logging & Monitoring

---

# 🏗️ Tech Architecture

```bash
Frontend (React + Vite)
        ↓
API Requests (Axios + React Query)
        ↓
Backend (Express + TypeScript)
        ↓
Database (Neon PostgreSQL)
        ↓
Redis Cache Layer
```

---

# 📁 Project Structure

```bash
aura-commerce/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── layouts/
│   │   ├── providers/
│   │   ├── lib/
│   │   └── main.tsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── db/
│   │   ├── utils/
│   │   ├── types/
│   │   └── server.ts
│
└── README.md
```

---

# ⚡ Installation

## 📥 Clone Repository

```bash
git clone https://github.com/yourusername/aura-commerce.git
```

---

## 📂 Navigate Into Project

```bash
cd Aura
```

---

# 🎨 Frontend Setup

## 📁 Navigate To Frontend

```bash
cd frontend
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## 🚀 Start Frontend Development Server

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🛠️ Backend Setup

## 📁 Navigate To Backend

```bash
cd backend
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## 🔑 Create Environment Variables

Create a `.env` file:

```env
PORT=3000

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_jwt_secret

REDIS_URL=your_redis_url

CLIENT_URL=http://localhost:5173

NODE_ENV=development
```

---

## 🚀 Start Backend Development Server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:3000
```

---

# 📜 Available Scripts

## 🎨 Frontend

| Script | Description |
|---|---|
| npm run dev | Start Vite development server |
| npm run build | Build frontend for production |

---

## 🛠️ Backend

| Script | Description |
|---|---|
| npm run dev | Start backend development server |
| npm run build | Build TypeScript backend |

---

# 🧠 State Management

Aura Commerce uses modern state management solutions for scalability and performance.

## 🐻 Zustand
Used for:
- UI State
- Cart State
- Product State
- Client State

---

## 🔄 TanStack Query
Used for:
- API Requests
- Server State
- Data Caching
- Data Synchronization

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Helmet Middleware
- Rate Limiting
- CORS Protection
- Input Validation
- Centralized Error Handling

---

# ⚡ Redis Caching

Redis is used for:
- Session Caching
- Product Caching
- Performance Optimization
- Reduced Database Queries

---

# 📊 Monitoring & Logging

## 📜 Winston Logger
Used for:
- Request Logging
- Error Logging
- Production Debugging

---

# 🌍 Deployment

Aura Commerce can be deployed on:

## 🎨 Frontend
- Vercel
- Netlify

---

## 🛠️ Backend
- Railway
- Render
- VPS
- Docker
- AWS

---

# 🚀 Performance Optimizations

- React Query Caching
- Redis Caching
- Lazy Loading
- Optimized API Calls
- Bundle Optimization
- Code Splitting

---

# 🔮 Future Improvements

- 💳 Payment Gateway Integration
- 📧 Email Notifications
- 🤖 AI Recommendations
- 🏪 Multi-Vendor Marketplace
- ⭐ Product Reviews
- 🔍 Search & Filtering
- 🔔 Real-Time Notifications
- 📈 Analytics Dashboard
- 📱 Mobile Application

---

# 📸 Screenshots

Add screenshots for:
- 🏠 Homepage
- 📦 Product Page
- 🛒 Cart Page
- 📊 Admin Dashboard
- 🔐 Authentication Pages

---

# 👨‍💻 Author

## Sana — Full Stack Developer

Built with passion ❤️ using modern web technologies.

---