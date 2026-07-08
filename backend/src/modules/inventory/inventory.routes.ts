import { Router } from 'express';

export const inventoryRoutes = Router();

// GET /api/inventory — List all inventory items
inventoryRoutes.get('/', async (_req, res) => {
  res.json({ success: true, data: [] });
});

// PATCH /api/inventory/:id — Update stock quantity
inventoryRoutes.patch('/:id', async (req, res) => {
  const { quantity } = req.body;
  res.json({ success: true, data: { id: req.params.id, quantity } });
});

// POST /api/inventory — Add inventory item
inventoryRoutes.post('/', async (req, res) => {
  res.json({ success: true, data: req.body });
});

// GET /api/inventory/low-stock — Get low stock alerts
inventoryRoutes.get('/low-stock', async (_req, res) => {
  res.json({ success: true, data: [] });
});
