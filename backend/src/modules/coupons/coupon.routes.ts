import { Router } from 'express';

export const couponRoutes = Router();

// POST /api/coupons/validate — Validate a coupon code
couponRoutes.post('/validate', async (req, res) => {
  const { code, subtotal } = req.body;
  // TODO: Look up coupon, validate expiry, min order, usage
  res.json({ success: true, data: { valid: true, discount: 100 } });
});

// GET /api/coupons — List all coupons (admin)
couponRoutes.get('/', async (_req, res) => {
  res.json({ success: true, data: [] });
});

// POST /api/coupons — Create coupon (admin)
couponRoutes.post('/', async (req, res) => {
  res.json({ success: true, data: req.body });
});

// PUT /api/coupons/:id — Update coupon (admin)
couponRoutes.put('/:id', async (req, res) => {
  res.json({ success: true, data: req.body });
});

// DELETE /api/coupons/:id — Delete coupon (admin)
couponRoutes.delete('/:id', async (req, res) => {
  res.json({ success: true, message: 'Coupon deleted' });
});
