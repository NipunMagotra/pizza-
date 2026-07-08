import { Router } from 'express';

export const orderRoutes = Router();

// POST /api/orders — Create order
orderRoutes.post('/', async (req, res) => {
  // TODO: Validate items, calculate totals, create order in DB
  res.json({
    success: true,
    data: {
      id: 'order-new',
      orderNumber: `BRO-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'PENDING',
    },
  });
});

// GET /api/orders/my — Get customer's orders
orderRoutes.get('/my', async (_req, res) => {
  res.json({ success: true, data: [] });
});

// GET /api/orders/:id — Get order detail
orderRoutes.get('/:id', async (req, res) => {
  res.json({ success: true, data: null });
});

// PATCH /api/orders/:id/status — Update order status (admin)
orderRoutes.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  res.json({ success: true, data: { id: req.params.id, status } });
});

// GET /api/orders — All orders for admin (paginated)
orderRoutes.get('/', async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  res.json({
    success: true,
    data: { orders: [], total: 0, page: Number(page), limit: Number(limit) },
  });
});
