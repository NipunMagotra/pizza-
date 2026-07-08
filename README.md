# Bro Pizza — Modern Restaurant Ordering & Management Platform

Bro Pizza is a production-ready, responsive, full-stack restaurant ordering and management web application designed for a local Indian fast-food restaurant selling Pizza, Momos, Burgers, and more. 

---

## 🚀 Key Features

* **Landing Page**: Visually rich home page with Hero section, category browser, popular items grid, latest offers, customer reviews, delivery area locator, and FAQs.
* **Menu Page**: Search, category filters (Veg, Non-Veg, Bestseller), sorting, and interactive product cards with spice levels, ratings, and inline quantity controls.
* **Seamless Cart & Checkout**: Live Zustand-managed cart with automated calculation of GST (5%), delivery fees (free above ₹499), and coupon code validations (WELCOME50, BRO20, FLAT100).
* **Order Tracking**: Vertical progress tracking timeline for customers to check order status (Confirmed, Preparing, Ready, Out for Delivery, Delivered) in real-time.
* **Customer Dashboard**: Historical order lists, rewards & points tracker, favorite items list, and saved addresses.
* **Admin Dashboard**:
  - Live statistics: revenue, order count, pending queue, average order values, and delivered/cancelled metrics.
  - Interactive charts: weekly revenue trends and peak ordering hour breakdowns.
  - Order Management: complete order pipeline tracking with statuses, inline action controllers, and full bill breakdowns.
  - Menu Management: edit prices, categories, tags, spice levels, veg/non-veg status, availability, and featured/recommended tags.
  - Coupon Management: create, update, toggle active status, and track coupon usages.
  - Customer & Inventory Management: block/unblock customers and receive low-stock alerts with one-click restocking options.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zustand.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL database schema.

---

## 📁 Project Structure

```
Bro Pizza/
├── frontend/                  # Next.js 16 Frontend
│   ├── src/
│   │   ├── app/               # Next.js App Router Routes
│   │   │   ├── (customer)/    # Customer views (Landing, Menu, Cart, Checkout, Track, Account)
│   │   │   ├── admin/         # Admin Panel pages (Orders, Menu, Coupons, Customers, Inventory, Reports)
│   │   │   └── globals.css    # Design tokens & Tailwind theme styling
│   │   ├── components/        # Reusable components (ui/, customer/, admin/, shared/)
│   │   ├── store/             # Zustand state stores (cart, auth)
│   │   ├── lib/               # Custom utils, formatters, and mock data
│   │   └── types/             # Common TypeScript interfaces
│   └── package.json
└── backend/                   # Express + Prisma Backend
    ├── prisma/
    │   └── schema.prisma      # PostgreSQL Database Schema
    ├── src/
    │   ├── middleware/        # Auth, error, and validation middlewares
    │   ├── modules/           # Module-based router setups
    │   ├── app.ts             # Express setup
    │   └── server.ts          # Backend entry point
    └── package.json
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18.x or v20.x+)
- PostgreSQL database (for backend schema setup)

### Setup Frontend
1. Open the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the web app at [http://localhost:3000](http://localhost:3000).

### Setup Backend
1. Open the backend folder:
   ```bash
   cd ../backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables file (create a `.env` in the backend directory):
   ```env
   PORT=4000
   DATABASE_URL="postgresql://user:password@localhost:5432/bropizza?schema=public"
   JWT_SECRET="your-super-secret-key-change-in-production"
   FRONTEND_URL="http://localhost:3000"
   ```
4. Validate the database schema:
   ```bash
   npx prisma validate
   ```
5. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```
6. Run the API server in development mode:
   ```bash
   npm run dev
   ```
   The API will start running at [http://localhost:4000/api/health](http://localhost:4000/api/health).
