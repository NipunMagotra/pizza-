import { Router } from 'express';

export const customerRoutes = Router();

// GET /api/customers — List customers (admin)
customerRoutes.get('/', async (req, res) => {
  const { search, sort = 'spend', page = 1, limit = 20 } = req.query;
  res.json({ success: true, data: { customers: [], total: 0 } });
});

// GET /api/customers/:id — Customer detail (admin)
customerRoutes.get('/:id', async (req, res) => {
  res.json({ success: true, data: null });
});

// PATCH /api/customers/:id/block — Toggle block status (admin)
customerRoutes.patch('/:id/block', async (req, res) => {
  res.json({ success: true, message: 'Customer status updated' });
});

// PUT /api/customers/:id/notes — Update customer notes (admin)
customerRoutes.put('/:id/notes', async (req, res) => {
  res.json({ success: true, message: 'Notes updated' });
});
