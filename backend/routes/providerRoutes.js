import express from 'express';
import Provider from '../models/Provider.js';

const router = express.Router();

// GET /api/providers - List all solar providers / installers
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json({ success: true, count: providers.length, data: providers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
