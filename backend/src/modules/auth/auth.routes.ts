import { Router } from 'express';

export const authRoutes = Router();

// POST /api/auth/register — Register with phone
authRoutes.post('/register', async (req, res) => {
  // TODO: Implement with Prisma
  const { name, phone } = req.body;
  res.json({
    success: true,
    message: 'OTP sent to your phone',
    data: { phone },
  });
});

// POST /api/auth/login — Login with phone
authRoutes.post('/login', async (req, res) => {
  const { phone } = req.body;
  // TODO: Send OTP via SMS
  res.json({
    success: true,
    message: 'OTP sent',
    data: { phone },
  });
});

// POST /api/auth/verify-otp — Verify OTP and return JWT
authRoutes.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  // TODO: Verify OTP, create/find user, return JWT
  res.json({
    success: true,
    data: {
      user: { id: '1', name: 'Customer', phone, role: 'CUSTOMER' },
      token: 'mock-jwt-token',
    },
  });
});

// POST /api/auth/admin/login — Admin login with email/password
authRoutes.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  // TODO: Verify credentials
  res.json({
    success: true,
    data: {
      user: { id: 'admin-1', name: 'Admin', email, role: 'ADMIN' },
      token: 'mock-admin-jwt-token',
    },
  });
});
