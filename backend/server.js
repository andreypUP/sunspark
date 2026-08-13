import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import Provider from './models/Provider.js';
import Lead from './models/Lead.js';
import providerRoutes from './routes/providerRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import { sampleProviders, generateFullDataset } from './utils/seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Auto-seed function to ensure dataset is always ready
const autoSeed = async () => {
  try {
    const providerCount = await Provider.countDocuments();
    if (providerCount === 0) {
      console.log('[Seed] Database empty. Seeding initial providers and leads...');
      const createdProviders = await Provider.insertMany(sampleProviders);
      const defaultProvider = createdProviders[0];

      const fullLeads = generateFullDataset(defaultProvider._id);
      await Lead.insertMany(fullLeads);
      console.log(`[Seed] Successfully seeded ${createdProviders.length} providers and ${fullLeads.length} leads!`);
    } else {
      const leadCount = await Lead.countDocuments();
      console.log(`[Seed] Database active: ${providerCount} providers, ${leadCount} leads existing.`);
    }
  } catch (err) {
    console.error(`[Seed Error] ${err.message}`);
  }
};

// Connect Database & Seed
await connectDB();
await autoSeed();

// API Routes
app.use('/api/providers', providerRoutes);
app.use('/api/leads', leadRoutes);

// Seed API endpoint for manual reset
app.post('/api/seed', async (req, res) => {
  try {
    await Provider.deleteMany({});
    await Lead.deleteMany({});
    const createdProviders = await Provider.insertMany(sampleProviders);
    const defaultProvider = createdProviders[0];
    const fullLeads = generateFullDataset(defaultProvider._id);
    await Lead.insertMany(fullLeads);
    res.json({ success: true, message: `Re-seeded ${createdProviders.length} providers & ${fullLeads.length} leads` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Root API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Sunspark Solar Installer API', version: '1.0.0' });
});

// Serve frontend in production build if built
const frontendDist = path.join(__dirname, '../sunspark-fe/build');
app.use(express.static(frontendDist));
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
      if (err) {
        res.send('Sunspark API Backend Running on Port 5000');
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 [Sunspark Server] Running at http://localhost:${PORT}`);
});