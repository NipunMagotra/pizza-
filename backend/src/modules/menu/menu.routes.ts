import { Router } from 'express';

export const menuRoutes = Router();

// GET /api/menu — Get all menu items
menuRoutes.get('/', async (_req, res) => {
  // TODO: Replace with Prisma query
  res.json({ success: true, data: { items: [], categories: [] } });
});

// GET /api/menu/categories — Get categories
menuRoutes.get('/categories', async (_req, res) => {
  res.json({ success: true, data: [] });
});

// GET /api/menu/:slug — Get single item
menuRoutes.get('/:slug', async (req, res) => {
  res.json({ success: true, data: null });
});

// POST /api/menu — Create menu item (admin)
menuRoutes.post('/', async (req, res) => {
  res.json({ success: true, data: req.body });
});

// PUT /api/menu/:id — Update menu item (admin)
menuRoutes.put('/:id', async (req, res) => {
  res.json({ success: true, data: req.body });
});

// DELETE /api/menu/:id — Delete menu item (admin)
menuRoutes.delete('/:id', async (req, res) => {
  res.json({ success: true, message: 'Item deleted' });
});

// PATCH /api/menu/:id/availability — Toggle availability (admin)
menuRoutes.patch('/:id/availability', async (req, res) => {
  res.json({ success: true, message: 'Availability updated' });
});
