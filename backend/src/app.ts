import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './modules/auth/auth.routes';
import { menuRoutes } from './modules/menu/menu.routes';
import { orderRoutes } from './modules/orders/order.routes';
import { couponRoutes } from './modules/coupons/coupon.routes';
import { customerRoutes } from './modules/customers/customer.routes';
import { inventoryRoutes } from './modules/inventory/inventory.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Bro Pizza API', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/inventory', inventoryRoutes);

// Admin dashboard stats
app.get('/api/admin/dashboard', (_req, res) => {
  // TODO: Replace with real Prisma queries
  res.json({
    todayRevenue: 12450,
    todayOrders: 34,
    pendingOrders: 5,
    avgOrderValue: 366,
    weeklyRevenue: [8200, 9100, 11300, 10800, 12450, 14200, 13600],
    monthlyRevenue: 285000,
    deliveredToday: 26,
    cancelledToday: 2,
  });
});

// Error handling
app.use(errorHandler);

export default app;
