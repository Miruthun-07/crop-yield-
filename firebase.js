/* =====================================================================
   firebase.js — Backend API client
   Intelligent Crop Yield Forecasting & Agricultural Decision Support
   ---------------------------------------------------------------------
   Replaces the Firebase SDK with calls to the local Node.js backend
   (server.js). If the backend is unreachable (e.g. user opened the
   page directly via file://), falls back to localStorage demo mode
   so every button still works.

   Exposes window.IcyFirebase with the same API as before, so script.js
   does not need any changes.
   ===================================================================== */

const DEMO_LS_KEY = 'icy_demo_store_v1';

// ---- Demo storage helpers (used only if backend is down) -----------
function _demoLoad() {
  try { return JSON.parse(localStorage.getItem(DEMO_LS_KEY) || '{}'); }
  catch { return {}; }
}
function _demoSave(store) {
  try { localStorage.setItem(DEMO_LS_KEY, JSON.stringify(store)); }
  catch (e) { console.warn('[api] localStorage save failed', e); }
}
function _demoId() {
  return 'demo-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// ---- Backend reachability check -------------------------------------
async function checkBackendStatus() {
  try {
    const res = await fetch('/api/status', { cache: 'no-store' });
    if (!res.ok) return { ready: false, demo: true };
    const json = await res.json();
    return { ready: json.ok === true, demo: json.ok !== true };
  } catch (err) {
    return { ready: false, demo: true };
  }
}

// ---- Predictions ----------------------------------------------------
async function savePrediction(record) {
  record.createdAt = record.createdAt || Date.now();
  record.source = record.source || 'backend';
  try {
    const res = await fetch('/api/predictions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    return { ok: true, demo: false, id: json.id };
  } catch (err) {
    console.warn('[api] savePrediction backend down — using local demo', err);
    const store = _demoLoad();
    if (!store.predictions) store.predictions = {};
    const id = _demoId();
    record._demo = true;
    store.predictions[id] = record;
    _demoSave(store);
    return { ok: true, demo: true, id };
  }
}

async function getPredictions() {
  try {
    const res = await fetch('/api/predictions', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    return { ok: true, demo: false, data: json.data || {} };
  } catch (err) {
    console.warn('[api] getPredictions backend down — using local demo', err);
    const store = _demoLoad();
    return { ok: true, demo: true, data: store.predictions || {} };
  }
}

async function deletePrediction(id) {
  try {
    const res = await fetch('/api/predictions/' + encodeURIComponent(id), { method: 'DELETE' });
    if (!res.ok && res.status !== 404) throw new Error('HTTP ' + res.status);
    return { ok: true, demo: false };
  } catch (err) {
    console.warn('[api] deletePrediction backend down — using local demo', err);
    const store = _demoLoad();
    if (store.predictions) delete store.predictions[id];
    _demoSave(store);
    return { ok: true, demo: true };
  }
}

// ---- Scenarios ------------------------------------------------------
async function saveScenario(record) {
  record.createdAt = record.createdAt || Date.now();
  try {
    const res = await fetch('/api/scenarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    return { ok: true, demo: false, id: json.id };
  } catch (err) {
    console.warn('[api] saveScenario backend down — using local demo', err);
    const store = _demoLoad();
    if (!store.scenarios) store.scenarios = {};
    const id = _demoId();
    record._demo = true;
    store.scenarios[id] = record;
    _demoSave(store);
    return { ok: true, demo: true, id };
  }
}

async function getScenarios() {
  try {
    const res = await fetch('/api/scenarios', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    return { ok: true, demo: false, data: json.data || {} };
  } catch (err) {
    console.warn('[api] getScenarios backend down — using local demo', err);
    const store = _demoLoad();
    return { ok: true, demo: true, data: store.scenarios || {} };
  }
}

// ---- Feedback -------------------------------------------------------
async function saveFeedback(record) {
  record.createdAt = record.createdAt || Date.now();
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    return { ok: true, demo: false, id: json.id };
  } catch (err) {
    console.warn('[api] saveFeedback backend down — using local demo', err);
    const store = _demoLoad();
    if (!store.feedback) store.feedback = {};
    const id = _demoId();
    record._demo = true;
    store.feedback[id] = record;
    _demoSave(store);
    return { ok: true, demo: true, id };
  }
}

// ---- Status alias (kept for backward compat with script.js) ---------
async function checkFirebaseStatus() {
  return await checkBackendStatus();
}

// ---- Expose on window (used by script.js) ----------------------------
window.IcyFirebase = {
  savePrediction,
  getPredictions,
  deletePrediction,
  saveScenario,
  getScenarios,
  saveFeedback,
  checkFirebaseStatus
};
