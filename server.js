/* =====================================================================
   server.js — Local Node.js Express backend
   Intelligent Crop Yield Forecasting & Agricultural Decision Support
   ---------------------------------------------------------------------
   - Serves the 4 frontend files (index.html, style.css, script.js, firebase.js)
   - Provides REST API for predictions, scenarios, and feedback
   - Persists data to data.json (file-based, survives restarts)
   - CORS enabled
   - Auto-seeds 3 sample predictions on first run

   Run:   npm install && npm start
   Open:  http://localhost:3000
   ===================================================================== */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// CORS — allow any origin (handy for development)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ---- Block sensitive files ----
const BLOCKED = new Set(['data.json', 'package.json', 'package-lock.json', 'server.js', 'README.md', 'node_modules']);
app.use((req, res, next) => {
  const seg = req.path.split('/').filter(Boolean)[0];
  if (seg && BLOCKED.has(seg)) return res.status(403).send('Forbidden');
  next();
});

// ---- Static frontend files ----
app.use(express.static(__dirname, {
  extensions: ['html'],
  setHeaders: (res) => {
    res.header('Cache-Control', 'no-store');
  }
}));

// ---- Request logger (small) ----
app.use((req, _res, next) => {
  if (!req.path.includes('favicon') && !req.path.includes('.css') && !req.path.includes('.js')) {
    const ts = new Date().toISOString().slice(11, 19);
    console.log(`  ${ts}  ${req.method.padEnd(6)} ${req.path}`);
  }
  next();
});

// ---- Data storage (file-based JSON) ----
const DATA_FILE = path.join(__dirname, 'data.json');

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.warn('[storage] load error:', e.message);
  }
  return { predictions: {}, scenarios: {}, feedback: {} };
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.warn('[storage] save error:', e.message);
  }
}

function genId(prefix = 'rec') {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

// ---- Seed sample data on first run ----
function seedSampleData() {
  const data = loadData();
  if (Object.keys(data.predictions || {}).length > 0) return;

  const now = Date.now();
  const samples = [
    {
      crop: 'Rice', state: 'Punjab', district: 'Ludhiana', season: 'Kharif', year: 2024,
      soil: 'Alluvial', ph: 6.5, nitrogen: 120, phosphorus: 60, potassium: 40,
      rainfall: 1100, temperature: 27, humidity: 70, irrigation: 'Rainfed', area: 2.5,
      predictedYield: 3.85, totalProduction: 9.62, category: 'Excellent', suitability: 'Highly Suitable',
      method: 'Deterministic demo estimator', source: 'sample', createdAt: now - 86400000
    },
    {
      crop: 'Wheat', state: 'Uttar Pradesh', district: 'Meerut', season: 'Rabi', year: 2024,
      soil: 'Alluvial', ph: 7.0, nitrogen: 120, phosphorus: 60, potassium: 40,
      rainfall: 700, temperature: 22, humidity: 65, irrigation: 'Sprinkler', area: 3.0,
      predictedYield: 2.94, totalProduction: 8.82, category: 'Excellent', suitability: 'Highly Suitable',
      method: 'Deterministic demo estimator', source: 'sample', createdAt: now - 43200000
    },
    {
      crop: 'Sugarcane', state: 'Maharashtra', district: 'Pune', season: 'Perennial', year: 2024,
      soil: 'Black', ph: 7.0, nitrogen: 150, phosphorus: 75, potassium: 60,
      rainfall: 1800, temperature: 28, humidity: 75, irrigation: 'Drip', area: 4.0,
      predictedYield: 44.38, totalProduction: 177.52, category: 'Good', suitability: 'Highly Suitable',
      method: 'Deterministic demo estimator', source: 'sample', createdAt: now - 3600000
    }
  ];

  data.predictions = {};
  samples.forEach((s, i) => {
    const id = `sample-${i + 1}`;
    data.predictions[id] = { ...s, id, _demo: false };
  });
  saveData(data);
  console.log('[storage] Seeded 3 sample predictions.');
}
seedSampleData();

// =====================================================================
// API routes
// =====================================================================

// Health check
app.get('/api/status', (_req, res) => {
  res.json({
    ok: true,
    demo: false,
    message: 'Backend running',
    time: Date.now(),
    counts: {
      predictions: Object.keys(loadData().predictions || {}).length,
      scenarios: Object.keys(loadData().scenarios || {}).length,
      feedback: Object.keys(loadData().feedback || {}).length
    }
  });
});

// ----- Predictions -----
app.get('/api/predictions', (_req, res) => {
  const data = loadData();
  res.json({
    ok: true,
    demo: false,
    data: data.predictions || {},
    count: Object.keys(data.predictions || {}).length
  });
});

app.post('/api/predictions', (req, res) => {
  const data = loadData();
  const id = genId('pred');
  const record = {
    ...req.body,
    id,
    _demo: false,
    createdAt: req.body.createdAt || Date.now()
  };
  data.predictions[id] = record;
  saveData(data);
  console.log(`[predictions] saved ${id} (${record.crop || 'unknown'} / ${record.state || '?'})`);
  res.json({ ok: true, demo: false, id, record });
});

app.delete('/api/predictions/:id', (req, res) => {
  const data = loadData();
  const id = req.params.id;
  if (data.predictions && data.predictions[id]) {
    delete data.predictions[id];
    saveData(data);
    console.log(`[predictions] deleted ${id}`);
    res.json({ ok: true, demo: false });
  } else {
    res.status(404).json({ ok: false, error: 'Prediction not found' });
  }
});

// Clear all predictions (handy for demos)
app.delete('/api/predictions', (_req, res) => {
  const data = loadData();
  data.predictions = {};
  saveData(data);
  console.log('[predictions] cleared all');
  res.json({ ok: true, demo: false, cleared: true });
});

// ----- Scenarios -----
app.get('/api/scenarios', (_req, res) => {
  const data = loadData();
  res.json({
    ok: true,
    demo: false,
    data: data.scenarios || {},
    count: Object.keys(data.scenarios || {}).length
  });
});

app.post('/api/scenarios', (req, res) => {
  const data = loadData();
  const id = genId('scen');
  const record = {
    ...req.body,
    id,
    createdAt: req.body.createdAt || Date.now()
  };
  data.scenarios[id] = record;
  saveData(data);
  console.log(`[scenarios] saved ${id} (${record.crop || '?'})`);
  res.json({ ok: true, demo: false, id });
});

// ----- Feedback -----
app.get('/api/feedback', (_req, res) => {
  const data = loadData();
  res.json({ ok: true, demo: false, data: data.feedback || {} });
});

app.post('/api/feedback', (req, res) => {
  const data = loadData();
  const id = genId('fb');
  const record = {
    ...req.body,
    id,
    createdAt: req.body.createdAt || Date.now()
  };
  data.feedback[id] = record;
  saveData(data);
  console.log(`[feedback] saved ${id}`);
  res.json({ ok: true, demo: false, id });
});

// 404 for unknown /api routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ ok: false, error: 'Endpoint not found: ' + req.path });
});

// SPA fallback — serve index.html for any non-API, non-static path
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend files not found. Make sure index.html is in the same directory as server.js.');
  }
});

// =====================================================================
// Start server
// =====================================================================
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════════╗');
  console.log('  ║  🌱 Intelligent Crop Yield — Backend Ready        ║');
  console.log('  ╠══════════════════════════════════════════════════╣');
  console.log(`  ║  Server:  http://localhost:${PORT}                    ║`);
  console.log(`  ║  Network: http://${getLocalIp()}:${PORT}                  ║`);
  console.log('  ╚══════════════════════════════════════════════════╝');
  console.log('');
  console.log('  API endpoints:');
  console.log('    GET    /api/status            — health check');
  console.log('    GET    /api/predictions       — list all predictions');
  console.log('    POST   /api/predictions       — save new prediction');
  console.log('    DELETE /api/predictions/:id   — delete a prediction');
  console.log('    GET    /api/scenarios         — list scenarios');
  console.log('    POST   /api/scenarios         — save a scenario');
  console.log('    GET    /api/feedback          — list feedback');
  console.log('    POST   /api/feedback          — save feedback');
  console.log('');
  console.log('  Data file:  ' + DATA_FILE);
  console.log('  Frontend:   ' + __dirname);
  console.log('');
  console.log('  Press Ctrl+C to stop the server.');
  console.log('');
});

function getLocalIp() {
  const os = require('os');
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}
