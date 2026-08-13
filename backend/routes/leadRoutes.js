import express from 'express';
import Lead from '../models/Lead.js';

const router = express.Router();

// GET /api/leads/stats - Summary counts for KPI overview cards
router.get('/stats', async (req, res) => {
  try {
    const { providerId } = req.query;
    const filter = providerId ? { providerId } : {};

    const [total, hot, warm, education] = await Promise.all([
      Lead.countDocuments(filter),
      Lead.countDocuments({ ...filter, leadTier: 'Hot' }),
      Lead.countDocuments({ ...filter, leadTier: 'Warm' }),
      Lead.countDocuments({ ...filter, leadTier: 'Education' }),
    ]);

    res.json({
      success: true,
      stats: {
        total,
        hot,
        warm,
        education,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/leads - Paginated & filtered list of leads
router.get('/', async (req, res) => {
  try {
    const { providerId, tier, search, page = 1, limit = 6 } = req.query;
    
    let query = {};
    if (providerId) {
      query.providerId = providerId;
    }
    if (tier && tier !== 'All Lead Tiers' && tier !== 'All') {
      query.leadTier = tier;
    }
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { 'location.cityOrMunicipality': { $regex: search, $options: 'i' } },
        { 'location.province': { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [leads, totalCount] = await Promise.all([
      Lead.find(query)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Lead.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: leads,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(totalCount / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/leads/:id - Single lead detail
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/leads/:id/status - Update lead status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST /api/leads/:id/notes - Add note to lead
router.post('/:id/notes', async (req, res) => {
  try {
    const { author, text } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    lead.notes.push({ author: author || 'Installer', text });
    await lead.save();
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST /api/leads - Create lead (mobile app submission integration endpoint)
router.post('/', async (req, res) => {
  try {
    const newLead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: newLead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
