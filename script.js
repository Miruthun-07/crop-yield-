/* =====================================================================
   script.js — Intelligent Crop Yield Forecasting & Decision Support
   Vanilla JS · Chart.js · Firebase Realtime DB (via firebase.js globals)
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. Embedded dataset summary (derived from 19,689 historical records)
   --------------------------------------------------------------------- */
window.CROP_DATASET = {"totalRecords":19689,"filteredRecords":17420,"years":["1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"],"cropStats":{"Pulses":{"avg":0.75,"min":0.043,"max":69.367,"count":7094},"Cotton":{"avg":1.808,"min":0.084,"max":95.994,"count":473},"Tomato":{"avg":7.882,"min":0.111,"max":178.653,"count":3057},"Maize":{"avg":2.417,"min":0.124,"max":22.38,"count":973},"Rice":{"avg":2.218,"min":0.017,"max":8.778,"count":1197},"Millet":{"avg":1.351,"min":0.004,"max":74.303,"count":2165},"Sugarcane":{"avg":51.727,"min":0.29,"max":165.0,"count":605},"Wheat":{"avg":2.012,"min":0.095,"max":5.069,"count":543},"Groundnut":{"avg":1.361,"min":0.204,"max":3.673,"count":725},"Banana":{"avg":27.072,"min":6.934,"max":126.388,"count":243},"Soybean":{"avg":1.096,"min":0.162,"max":2.845,"count":345}},"seasonStats":{"Kharif":{"avg":2.28,"min":0.004,"max":165.0,"count":7423},"Whole Year":{"avg":16.466,"min":0.07,"max":178.653,"count":2720},"Rabi":{"avg":2.006,"min":0.048,"max":80.268,"count":5334},"Autumn":{"avg":1.357,"min":0.157,"max":32.657,"count":393},"Summer":{"avg":3.044,"min":0.046,"max":69.367,"count":1161},"Winter":{"avg":5.287,"min":0.113,"max":68.23,"count":389}},"stateStats":{"Assam":{"avg":3.525,"min":0.238,"max":41.897,"count":605},"Karnataka":{"avg":4.288,"min":0.067,"max":102.486,"count":1243},"Kerala":{"avg":8.962,"min":0.213,"max":90.19,"count":379},"Meghalaya":{"avg":2.832,"min":0.44,"max":11.427,"count":525},"West Bengal":{"avg":3.901,"min":0.046,"max":107.921,"count":931},"Puducherry":{"avg":8.44,"min":0.237,"max":165.0,"count":590},"Goa":{"avg":8.378,"min":0.27,"max":70.115,"count":181},"Andhra Pradesh":{"avg":5.096,"min":0.075,"max":126.388,"count":1117},"Tamil Nadu":{"avg":8.7,"min":0.08,"max":136.075,"count":697},"Odisha":{"avg":3.088,"min":0.077,"max":67.762,"count":722},"Bihar":{"avg":3.309,"min":0.441,"max":65.488,"count":789},"Gujarat":{"avg":7.277,"min":0.153,"max":82.903,"count":740},"Madhya Pradesh":{"avg":3.649,"min":0.077,"max":48.048,"count":777},"Maharashtra":{"avg":3.149,"min":0.048,"max":95.994,"count":758},"Mizoram":{"avg":2.745,"min":0.114,"max":32.858,"count":373},"Punjab":{"avg":5.229,"min":0.251,"max":84.373,"count":349},"Uttar Pradesh":{"avg":5.465,"min":0.088,"max":70.97,"count":723},"Haryana":{"avg":6.275,"min":0.004,"max":178.653,"count":546},"Himachal Pradesh":{"avg":1.991,"min":0.072,"max":26.191,"count":567},"Tripura":{"avg":4.0,"min":0.247,"max":55.443,"count":402},"Nagaland":{"avg":3.544,"min":0.084,"max":55.632,"count":630},"Chhattisgarh":{"avg":2.117,"min":0.051,"max":74.303,"count":813},"Uttarakhand":{"avg":3.941,"min":0.123,"max":81.54,"count":699},"Jharkhand":{"avg":3.631,"min":0.367,"max":68.23,"count":268},"Delhi":{"avg":9.784,"min":0.16,"max":92.0,"count":178},"Manipur":{"avg":5.414,"min":0.29,"max":59.264,"count":424},"Jammu and Kashmir":{"avg":1.423,"min":0.017,"max":17.04,"count":548},"Telangana":{"avg":5.847,"min":0.069,"max":84.727,"count":351},"Arunachal Pradesh":{"avg":3.735,"min":0.475,"max":23.748,"count":292},"Sikkim":{"avg":1.252,"min":0.425,"max":5.343,"count":203}},"cropSeason":{"Pulses|Kharif":{"avg":0.725,"min":0.043,"max":21.38,"count":3081},"Cotton|Kharif":{"avg":1.598,"min":0.084,"max":5.295,"count":405},"Tomato|Whole Year":{"avg":7.52,"min":0.111,"max":178.653,"count":1704},"Pulses|Rabi":{"avg":0.755,"min":0.048,"max":32.589,"count":3303},"Maize|Kharif":{"avg":2.27,"min":0.124,"max":22.38,"count":513},"Pulses|Whole Year":{"avg":0.781,"min":0.07,"max":6.209,"count":160},"Rice|Autumn":{"avg":1.638,"min":0.515,"max":4.185,"count":158},"Rice|Summer":{"avg":2.556,"min":0.077,"max":4.53,"count":244},"Rice|Winter":{"avg":1.993,"min":0.531,"max":4.139,"count":147},"Millet|Kharif":{"avg":0.977,"min":0.004,"max":4.394,"count":1439},"Sugarcane|Kharif":{"avg":61.885,"min":0.863,"max":165.0,"count":70},"Wheat|Rabi":{"avg":2.049,"min":0.095,"max":5.069,"count":514},"Millet|Summer":{"avg":1.68,"min":0.476,"max":3.0,"count":148},"Tomato|Kharif":{"avg":7.07,"min":0.13,"max":32.25,"count":629},"Tomato|Rabi":{"avg":9.376,"min":0.125,"max":80.268,"count":552},"Groundnut|Kharif":{"avg":1.172,"min":0.204,"max":3.02,"count":423},"Groundnut|Rabi":{"avg":1.862,"min":0.752,"max":3.673,"count":133},"Millet|Rabi":{"avg":1.181,"min":0.075,"max":4.337,"count":427},"Maize|Rabi":{"avg":3.063,"min":1.1,"max":7.638,"count":218},"Maize|Summer":{"avg":2.303,"min":0.941,"max":5.097,"count":143},"Rice|Kharif":{"avg":2.177,"min":0.017,"max":8.778,"count":505},"Rice|Rabi":{"avg":2.695,"min":0.86,"max":4.39,"count":139},"Sugarcane|Whole Year":{"avg":50.544,"min":0.29,"max":136.075,"count":507},"Banana|Whole Year":{"avg":27.045,"min":6.934,"max":126.388,"count":195},"Soybean|Kharif":{"avg":1.081,"min":0.162,"max":2.845,"count":322},"Groundnut|Whole Year":{"avg":1.483,"min":0.996,"max":2.374,"count":18},"Millet|Whole Year":{"avg":9.79,"min":0.194,"max":74.303,"count":73},"Maize|Whole Year":{"avg":2.216,"min":0.5,"max":5.226,"count":21},"Pulses|Summer":{"avg":0.924,"min":0.046,"max":69.367,"count":362},"Millet|Autumn":{"avg":0.664,"min":0.32,"max":1.137,"count":60},"Cotton|Summer":{"avg":1.405,"min":0.615,"max":3.656,"count":14},"Tomato|Summer":{"avg":10.536,"min":0.605,"max":28.464,"count":114},"Tomato|Autumn":{"avg":2.188,"min":0.608,"max":5.207,"count":9},"Groundnut|Summer":{"avg":1.609,"min":0.75,"max":3.23,"count":104},"Tomato|Winter":{"avg":8.952,"min":0.5,"max":20.734,"count":49},"Pulses|Autumn":{"avg":0.374,"min":0.157,"max":1.472,"count":73},"Pulses|Winter":{"avg":0.922,"min":0.113,"max":68.23,"count":115},"Cotton|Whole Year":{"avg":5.29,"min":0.198,"max":95.994,"count":26},"Banana|Kharif":{"avg":23.317,"min":10.124,"max":64.511,"count":32},"Cotton|Rabi":{"avg":1.916,"min":0.343,"max":3.393,"count":26},"Maize|Autumn":{"avg":1.862,"min":0.812,"max":3.674,"count":60},"Soybean|Rabi":{"avg":1.322,"min":0.746,"max":2.0,"count":16},"Soybean|Whole Year":{"avg":1.269,"min":1.0,"max":1.5,"count":5},"Wheat|Whole Year":{"avg":1.686,"min":1.0,"max":3.0,"count":7},"Wheat|Kharif":{"avg":0.527,"min":0.12,"max":1.0,"count":4},"Groundnut|Autumn":{"avg":0.99,"min":0.706,"max":1.51,"count":29},"Groundnut|Winter":{"avg":1.138,"min":0.885,"max":1.509,"count":18},"Maize|Winter":{"avg":1.781,"min":0.717,"max":2.656,"count":18},"Millet|Winter":{"avg":0.578,"min":0.42,"max":0.858,"count":18},"Sugarcane|Winter":{"avg":57.008,"min":32.845,"max":67.762,"count":20},"Rice|Whole Year":{"avg":1.528,"min":0.906,"max":1.942,"count":4},"Sugarcane|Rabi":{"avg":19.798,"min":12.52,"max":33.0,"count":5},"Banana|Summer":{"avg":40.003,"min":12.916,"max":55.184,"count":13},"Wheat|Summer":{"avg":1.435,"min":0.95,"max":2.387,"count":17}}};

/* ---------------------------------------------------------------------
   2. Crop configurations — optimal environmental ranges
   --------------------------------------------------------------------- */
const CROP_CONFIG = {
  Rice:       { rainMin: 1100, rainMax: 2000, tempMin: 22, tempMax: 32, phMin: 5.5, phMax: 7.0, nOpt: 120, pOpt: 60, kOpt: 40, water: "high" },
  Wheat:      { rainMin: 600,  rainMax: 900,  tempMin: 15, tempMax: 25, phMin: 6.0, phMax: 7.5, nOpt: 120, pOpt: 60, kOpt: 40, water: "medium" },
  Maize:      { rainMin: 500,  rainMax: 800,  tempMin: 20, tempMax: 30, phMin: 5.5, phMax: 7.5, nOpt: 120, pOpt: 60, kOpt: 40, water: "medium" },
  Cotton:     { rainMin: 700,  rainMax: 1100, tempMin: 25, tempMax: 32, phMin: 6.0, phMax: 8.0, nOpt: 90,  pOpt: 45, kOpt: 40, water: "medium" },
  Sugarcane:  { rainMin: 1500, rainMax: 2500, tempMin: 25, tempMax: 32, phMin: 6.0, phMax: 7.5, nOpt: 150, pOpt: 75, kOpt: 60, water: "high" },
  Groundnut:  { rainMin: 500,  rainMax: 800,  tempMin: 25, tempMax: 30, phMin: 5.5, phMax: 7.5, nOpt: 30,  pOpt: 45, kOpt: 30, water: "low" },
  Soybean:    { rainMin: 600,  rainMax: 900,  tempMin: 20, tempMax: 28, phMin: 6.0, phMax: 7.0, nOpt: 30,  pOpt: 60, kOpt: 40, water: "medium" },
  Millet:     { rainMin: 400,  rainMax: 700,  tempMin: 25, tempMax: 32, phMin: 6.0, phMax: 7.5, nOpt: 60,  pOpt: 30, kOpt: 30, water: "low" },
  Pulses:     { rainMin: 600,  rainMax: 900,  tempMin: 18, tempMax: 28, phMin: 6.0, phMax: 7.0, nOpt: 25,  pOpt: 60, kOpt: 30, water: "low" },
  Tomato:     { rainMin: 600,  rainMax: 1000, tempMin: 18, tempMax: 28, phMin: 6.0, phMax: 6.8, nOpt: 120, pOpt: 75, kOpt: 60, water: "medium" },
  Banana:     { rainMin: 1500, rainMax: 2500, tempMin: 25, tempMax: 30, phMin: 5.5, phMax: 7.0, nOpt: 150, pOpt: 60, kOpt: 200, water: "high" },
  Coconut:    { rainMin: 1500, rainMax: 2500, tempMin: 27, tempMax: 32, phMin: 5.5, phMax: 8.0, nOpt: 120, pOpt: 60, kOpt: 200, water: "high" }
};

// Coconut baseline (tonnes/ha equivalent) — dataset doesn't include it directly
const COCONUT_BASELINE = 6.0;

// Soil type multiplier (illustrative)
const SOIL_MULT = {
  Alluvial: 1.08, Black: 1.05, Red: 0.98, Laterite: 0.92,
  Arid: 0.85, Mountain: 0.95, Sandy: 0.88, Clay: 0.95, Loamy: 1.10
};

// Irrigation multiplier
const IRRIGATION_MULT = {
  Rainfed: 0.92, Drip: 1.12, Sprinkler: 1.08, Flood: 1.02, Furrow: 1.0
};

// Global average yield (used to normalise state multipliers)
const GLOBAL_AVG = 4.2;

/* ---------------------------------------------------------------------
   3. Utility helpers
   --------------------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
function fmt(n, d = 2) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  const r = Number(n).toFixed(d);
  // strip trailing zeros but keep at least 1 decimal where useful
  return r.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1") || "0";
}
function fmtInt(n) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return Math.round(Number(n)).toLocaleString("en-IN");
}
function pct(n) { return (n >= 0 ? "+" : "") + (Number(n)).toFixed(1) + "%"; }

function timeAgo(ts) {
  if (!ts) return "—";
  const diff = (Date.now() - Number(ts)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  if (diff < 604800) return Math.floor(diff / 86400) + "d ago";
  try { return new Date(ts).toLocaleDateString(); }
  catch { return "—"; }
}

/* ---------------------------------------------------------------------
   4. Toast notifications
   --------------------------------------------------------------------- */
function toast(message, opts = {}) {
  const container = $("#toast-container");
  const el = document.createElement("div");
  el.className = "toast " + (opts.type || "info");
  const iconMap = { success: "check-circle-2", error: "alert-circle", warn: "alert-triangle", info: "info" };
  const icon = iconMap[opts.type || "info"];
  el.innerHTML = `
    <i data-lucide="${icon}" class="toast-icon"></i>
    <div class="toast-body">
      <p class="toast-title">${opts.title || (opts.type === "success" ? "Success" : opts.type === "error" ? "Error" : opts.type === "warn" ? "Heads up" : "Notice")}</p>
      <p class="toast-msg">${message}</p>
    </div>
    <button class="toast-close" aria-label="Close">×</button>
  `;
  container.appendChild(el);
  if (window.lucide) window.lucide.createIcons({ root: el });

  const remove = () => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 250);
  };
  el.querySelector(".toast-close").addEventListener("click", remove);
  setTimeout(remove, opts.duration || 4200);
}

/* ---------------------------------------------------------------------
   5. Prediction algorithm — transparent deterministic demo estimator
   --------------------------------------------------------------------- */
function computePrediction(input) {
  const cfg = CROP_CONFIG[input.crop] || CROP_CONFIG.Maize;
  const ds = window.CROP_DATASET;

  // 1. Baseline yield (tonnes/ha)
  let baseline;
  if (input.crop === "Coconut") {
    baseline = COCONUT_BASELINE;
  } else if (ds.cropStats[input.crop]) {
    baseline = ds.cropStats[input.crop].avg;
  } else {
    baseline = 2.0;
  }

  // 2. Crop+season adjustment (use more specific average if available)
  const seasonKey = input.season === "Perennial" ? "Whole Year" : input.season;
  const cropSeasonKey = input.crop + "|" + seasonKey;
  if (ds.cropSeason[cropSeasonKey]) {
    baseline = ds.cropSeason[cropSeasonKey].avg;
  } else if (input.crop === "Coconut") {
    baseline = COCONUT_BASELINE; // no coconut stats in filtered set
  }

  // 3. State multiplier — compare state avg to global avg
  let stateMult = 1.0;
  if (input.state && ds.stateStats[input.state]) {
    stateMult = clamp(ds.stateStats[input.state].avg / GLOBAL_AVG, 0.6, 1.6);
  }

  // 4. Soil pH modifier — Gaussian centred on optimal midpoint
  const phMid = (cfg.phMin + cfg.phMax) / 2;
  const phSpread = (cfg.phMax - cfg.phMin) / 2 || 0.6;
  const phDev = (input.ph - phMid) / phSpread;
  let phMod = Math.exp(-0.5 * phDev * phDev); // 1.0 at centre, decays outward
  phMod = clamp(phMod, 0.35, 1.0);

  // 5. Rainfall modifier — Gaussian on optimal band, with hard penalty at extremes
  const rainMid = (cfg.rainMin + cfg.rainMax) / 2;
  const rainSpread = (cfg.rainMax - cfg.rainMin) / 2 || 200;
  const rainDev = (input.rainfall - rainMid) / rainSpread;
  let rainMod = Math.exp(-0.5 * rainDev * rainDev);
  rainMod = clamp(rainMod, 0.3, 1.05);
  // severe drought penalty
  if (input.rainfall < cfg.rainMin * 0.5) rainMod = Math.min(rainMod, 0.5);

  // 6. Temperature modifier — Gaussian on optimal band
  const tempMid = (cfg.tempMin + cfg.tempMax) / 2;
  const tempSpread = (cfg.tempMax - cfg.tempMin) / 2 || 4;
  const tempDev = (input.temp - tempMid) / tempSpread;
  let tempMod = Math.exp(-0.5 * tempDev * tempDev);
  tempMod = clamp(tempMod, 0.4, 1.05);

  // 7. Humidity modifier — optimal 60-80%
  let humidityMod = 1.0;
  if (input.humidity < 40 || input.humidity > 90) humidityMod = 0.85;
  else if (input.humidity >= 60 && input.humidity <= 80) humidityMod = 1.0;
  else humidityMod = 0.93;

  // 8. Nutrient (NPK) bonus — diminishing returns up to optimum, plateau beyond
  const nFactor = input.n > 0 ? (1 - Math.exp(-input.n / (cfg.nOpt * 0.7))) : 0;
  const pFactor = input.p > 0 ? (1 - Math.exp(-input.p / (cfg.pOpt * 0.7))) : 0;
  const kFactor = input.k > 0 ? (1 - Math.exp(-input.k / (cfg.kOpt * 0.7))) : 0;
  const npkBonus = 0.20 * (nFactor * 0.5 + pFactor * 0.3 + kFactor * 0.2);

  // 9. Soil type multiplier
  const soilMult = SOIL_MULT[input.soil] || 1.0;

  // 10. Irrigation multiplier
  const irrigMult = IRRIGATION_MULT[input.irrigation] || 1.0;

  // 11. Combine — final yield
  let predictedYield = baseline
    * stateMult
    * phMod
    * rainMod
    * tempMod
    * humidityMod
    * soilMult
    * irrigMult
    * (1 + npkBonus);

  // Floor at 5% of baseline so we never produce zero
  predictedYield = Math.max(predictedYield, baseline * 0.05);
  predictedYield = Math.round(predictedYield * 100) / 100;

  // Total production = yield × farm area
  const totalProduction = Math.round(predictedYield * input.area * 100) / 100;

  // Yield category
  let category;
  if (predictedYield >= baseline * 1.10) category = "Excellent";
  else if (predictedYield >= baseline * 0.85) category = "Good";
  else if (predictedYield >= baseline * 0.60) category = "Moderate";
  else category = "Low";

  // Environmental suitability
  const avgMod = (phMod + rainMod + tempMod + humidityMod) / 4;
  let suitability;
  if (avgMod >= 0.88) suitability = "Highly Suitable";
  else if (avgMod >= 0.70) suitability = "Suitable";
  else if (avgMod >= 0.55) suitability = "Marginal";
  else suitability = "Stress Conditions";

  // Build factor list with quantitative details
  const factors = [];
  factors.push({
    name: "Baseline (crop · season · state)",
    detail: `${baseline.toFixed(2)} t/ha from ${ds.totalRecords.toLocaleString()} historical records`,
    direction: "info",
    impact: stateMult.toFixed(2) + "× state factor"
  });
  factors.push({
    name: "Soil pH",
    detail: input.ph + " pH — optimal band " + cfg.phMin + "–" + cfg.phMax,
    direction: phMod >= 0.95 ? "good" : phMod >= 0.75 ? "neutral" : "warn",
    impact: phMod.toFixed(2) + "×"
  });
  factors.push({
    name: "Rainfall",
    detail: input.rainfall + " mm — optimal band " + cfg.rainMin + "–" + cfg.rainMax + " mm",
    direction: rainMod >= 0.95 ? "good" : rainMod >= 0.75 ? "neutral" : "warn",
    impact: rainMod.toFixed(2) + "×"
  });
  factors.push({
    name: "Temperature",
    detail: input.temp + "°C — optimal band " + cfg.tempMin + "–" + cfg.tempMax + "°C",
    direction: tempMod >= 0.95 ? "good" : tempMod >= 0.75 ? "neutral" : "warn",
    impact: tempMod.toFixed(2) + "×"
  });
  factors.push({
    name: "Humidity",
    detail: input.humidity + "% — optimal 60–80%",
    direction: humidityMod >= 0.95 ? "good" : humidityMod >= 0.85 ? "neutral" : "warn",
    impact: humidityMod.toFixed(2) + "×"
  });
  factors.push({
    name: "NPK Nutrients",
    detail: `N ${input.n} · P ${input.p} · K ${input.k} kg/ha`,
    direction: npkBonus >= 0.15 ? "good" : npkBonus >= 0.08 ? "neutral" : "warn",
    impact: "+" + (npkBonus * 100).toFixed(0) + "%"
  });
  factors.push({
    name: "Soil Type",
    detail: input.soil + " soil",
    direction: soilMult >= 1.05 ? "good" : soilMult >= 0.95 ? "neutral" : "warn",
    impact: soilMult.toFixed(2) + "×"
  });
  factors.push({
    name: "Irrigation",
    detail: input.irrigation + " irrigation",
    direction: irrigMult >= 1.05 ? "good" : irrigMult >= 0.95 ? "neutral" : "warn",
    impact: irrigMult.toFixed(2) + "×"
  });

  return {
    baselineYield: Math.round(baseline * 100) / 100,
    predictedYield,
    totalProduction,
    category,
    suitability,
    method: "Deterministic demo estimator (historical average × environmental modifiers)",
    factors,
    config: cfg
  };
}

/* ---------------------------------------------------------------------
   6. Recommendations generator (rule-based)
   --------------------------------------------------------------------- */
function generateRecommendations(input) {
  const cfg = CROP_CONFIG[input.crop] || CROP_CONFIG.Maize;
  const recs = [];

  // pH-based
  if (input.ph < cfg.phMin - 0.5 || input.ph > cfg.phMax + 0.5) {
    recs.push({
      title: "Conduct a soil test",
      body: `Soil pH of ${input.ph} is outside the optimal ${cfg.phMin}–${cfg.phMax} band for ${input.crop}. Request a lab soil test and consult your extension officer about lime (to raise pH) or gypsum/sulphur (to lower pH).`
    });
  } else if (input.ph < cfg.phMin || input.ph > cfg.phMax) {
    recs.push({
      title: "Monitor soil pH",
      body: `Soil pH of ${input.ph} is slightly outside the optimal ${cfg.phMin}–${cfg.phMax} band for ${input.crop}. A light application of amendments may help — confirm with a soil test.`
    });
  }

  // Rainfall
  if (input.rainfall < cfg.rainMin * 0.7) {
    recs.push({
      title: "Rainfall is well below optimum",
      body: `${input.rainfall} mm is significantly below the ${cfg.rainMin}–${cfg.rainMax} mm optimal band for ${input.crop}. Consider supplemental irrigation, drought-tolerant varieties, or rainwater harvesting.`
    });
  } else if (input.rainfall > cfg.rainMax * 1.3) {
    recs.push({
      title: "Rainfall exceeds optimal range",
      body: `${input.rainfall} mm is well above the ${cfg.rainMax} mm ceiling for ${input.crop}. Check drainage, raise beds, and watch for waterlogging or fungal pressure.`
    });
  } else if (input.rainfall < cfg.rainMin || input.rainfall > cfg.rainMax) {
    recs.push({
      title: "Rainfall slightly off optimum",
      body: `${input.rainfall} mm is just outside the optimal ${cfg.rainMin}–${cfg.rainMax} mm band. Monitor soil moisture and adjust irrigation accordingly.`
    });
  }

  // Temperature
  if (input.temp < cfg.tempMin - 3) {
    recs.push({
      title: "Temperature stress (cold)",
      body: `${input.temp}°C is below the comfortable ${cfg.tempMin}–${cfg.tempMax}°C band for ${input.crop}. Consider protective cover, delayed sowing, or cold-tolerant varieties.`
    });
  } else if (input.temp > cfg.tempMax + 3) {
    recs.push({
      title: "Temperature stress (heat)",
      body: `${input.temp}°C is above the comfortable ${cfg.tempMin}–${cfg.tempMax}°C band for ${input.crop}. Use mulch, shade nets, or heat-tolerant varieties and watch for pollen damage.`
    });
  }

  // Nutrients
  const lowNutrients = [];
  if (input.n < cfg.nOpt * 0.4) lowNutrients.push("Nitrogen");
  if (input.p < cfg.pOpt * 0.4) lowNutrients.push("Phosphorus");
  if (input.k < cfg.kOpt * 0.4) lowNutrients.push("Potassium");
  if (lowNutrients.length) {
    recs.push({
      title: "Nutrient levels are low",
      body: `${lowNutrients.join(", ")} appear below ~40% of the typical optimum for ${input.crop}. Apply only after a soil test and follow local extension dosage — never guess fertilizer quantities.`
    });
  }

  // Irrigation
  if (input.irrigation === "Rainfed" && cfg.water === "high") {
    recs.push({
      title: "Consider supplemental irrigation",
      body: `${input.crop} benefits from reliable moisture. Pure rainfed farming in this crop is risky — explore drip or sprinkler irrigation if water is available.`
    });
  }
  if (input.irrigation === "Flood" && cfg.water !== "high") {
    recs.push({
      title: "Check irrigation and drainage",
      body: `Flood irrigation on ${input.crop} can waterlog the roots and leach nutrients. Verify drainage and consider switching to drip or sprinkler.`
    });
  }

  // Humidity
  if (input.humidity > 88) {
    recs.push({
      title: "High humidity — watch for fungal disease",
      body: `Humidity of ${input.humidity}% increases fungal disease pressure. Improve airflow, avoid overhead watering, and scout for blight and mildew.`
    });
  } else if (input.humidity < 40) {
    recs.push({
      title: "Low humidity — watch for water stress",
      body: `Humidity of ${input.humidity}% accelerates transpiration. Mulch around plants and irrigate in the early morning or late evening to reduce stress.`
    });
  }

  // Always-on advice
  recs.push({
    title: "Consult your local agricultural extension service",
    body: "Extension officers can confirm crop-specific calendar, certified varieties, integrated pest management, and region-specific agronomic advice that no online demo can replace."
  });

  recs.push({
    title: "These are advisory suggestions, not prescriptions",
    body: "No specific fertilizer dosage, pesticide, or guaranteed yield improvement is implied. Always confirm with a qualified agronomist."
  });

  return recs;
}

/* ---------------------------------------------------------------------
   7. Navigation
   --------------------------------------------------------------------- */
const PAGE_TITLES = {
  dashboard:      ["Dashboard",            "A live snapshot of your forecasting activity."],
  predict:         ["Yield Prediction",     "Forecast crop yield from field and weather inputs."],
  models:          ["Model Lab",            "Reference explanations of ML regressors used in yield forecasting."],
  simulator:       ["Scenario Simulator",   "Compare baseline vs modified rainfall and temperature."],
  xai:             ["Explainable AI",       "Illustrative heuristic influences of each input factor."],
  regional:        ["Regional Analytics",   "Filter saved or sample records and export to CSV."],
  history:         ["Prediction History",   "Search, filter, sort, view, and delete your records."],
  recommendations: ["Recommendations",       "Rule-based advisory suggestions from your inputs."],
  about:           ["About Project",        "Objective, methodology, and honest limitations."]
};

function showSection(sectionId) {
  $$(".page-section").forEach(s => s.classList.remove("active"));
  $$(".nav-item").forEach(n => n.classList.remove("active"));
  const sec = $("#section-" + sectionId);
  const nav = $(`.nav-item[data-section="${sectionId}"]`);
  if (sec) sec.classList.add("active");
  if (nav) nav.classList.add("active");
  const title = PAGE_TITLES[sectionId] || ["Intelligent Crop Yield", ""];
  $("#page-title").textContent = title[0];
  $("#page-subtitle").textContent = title[1];
  // Close mobile sidebar
  $("#sidebar").classList.remove("open");
  $("#sidebar-overlay").classList.remove("show");
  // Lazy-load section data
  if (sectionId === "dashboard") refreshDashboard();
  if (sectionId === "history") refreshHistory();
  if (sectionId === "regional") refreshRegional();
  if (sectionId === "xai") ensureXAIChart();
  if (sectionId === "simulator") ensureSimulator();
  // Scroll to top of main panel
  $("#main-panel").scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------------------------------------------------------------------
   8. Dropdown population
   --------------------------------------------------------------------- */
function populateDropdowns() {
  const crops = ["Rice","Wheat","Maize","Cotton","Sugarcane","Groundnut","Soybean","Millet","Pulses","Tomato","Banana","Coconut"];
  const states = Object.keys(window.CROP_DATASET.stateStats).sort();
  const years = window.CROP_DATASET.years;

  // populate all crop selects
  $$("#f-crop, #s-crop, #ra-crop, #rec-crop").forEach(sel => {
    if (!sel) return;
    const existing = sel.value;
    sel.innerHTML = '<option value="">Select crop…</option>' +
      crops.map(c => `<option value="${c}">${c}</option>`).join("");
    if (existing) sel.value = existing;
  });

  // populate all state selects
  $$("#f-state, #s-state, #ra-state").forEach(sel => {
    if (!sel) return;
    const existing = sel.value;
    sel.innerHTML = '<option value="">Select state…</option>' +
      states.map(s => `<option value="${s}">${s}</option>`).join("");
    if (existing) sel.value = existing;
  });

  // populate year select for regional filters
  const raYear = $("#ra-year");
  if (raYear) {
    raYear.innerHTML = '<option value="">All years</option>' +
      years.map(y => `<option value="${y}">${y}</option>`).join("");
  }

  // Default year = current
  const fYear = $("#f-year");
  if (fYear && !fYear.value) fYear.value = new Date().getFullYear();
}

/* ---------------------------------------------------------------------
   9. Form validation
   --------------------------------------------------------------------- */
function validatePredictForm() {
  const fields = [
    { id: "f-crop",    msg: "Please choose a crop." },
    { id: "f-state",   msg: "Please choose a state." },
    { id: "f-district",msg: "Please enter a district." },
    { id: "f-season", msg: "Please choose a season." },
    { id: "f-year",   msg: "Please enter a valid year (1997–2030).", min: 1997, max: 2030 },
    { id: "f-soil",   msg: "Please choose a soil type." },
    { id: "f-ph",     msg: "Soil pH must be 0–14.", min: 0, max: 14 },
    { id: "f-n",      msg: "Nitrogen must be ≥ 0.", min: 0 },
    { id: "f-p",      msg: "Phosphorus must be ≥ 0.", min: 0 },
    { id: "f-k",      msg: "Potassium must be ≥ 0.", min: 0 },
    { id: "f-rainfall", msg: "Rainfall must be ≥ 0.", min: 0 },
    { id: "f-temp",   msg: "Temperature must be between −10 and 55.", min: -10, max: 55 },
    { id: "f-humidity",msg: "Humidity must be 0–100.", min: 0, max: 100 },
    { id: "f-irrigation", msg: "Please choose an irrigation type." },
    { id: "f-area",   msg: "Farm area must be > 0.", min: 0.1 }
  ];
  let ok = true;
  for (const f of fields) {
    const el = $("#" + f.id);
    if (!el) continue;
    const errEl = $(`.field-error[data-for="${f.id}"]`);
    let val = el.value.trim();
    let bad = false;
    if (!val) bad = true;
    else if (f.min !== undefined || f.max !== undefined) {
      const num = Number(val);
      if (isNaN(num)) bad = true;
      else if (f.min !== undefined && num < f.min) bad = true;
      else if (f.max !== undefined && num > f.max) bad = true;
    }
    if (bad) {
      ok = false;
      el.classList.add("invalid");
      if (errEl) errEl.textContent = f.msg;
    } else {
      el.classList.remove("invalid");
      if (errEl) errEl.textContent = "";
    }
  }
  return ok;
}

/* ---------------------------------------------------------------------
   10. Prediction form handling
   --------------------------------------------------------------------- */
let currentPrediction = null;

function readPredictInput() {
  return {
    crop: $("#f-crop").value,
    state: $("#f-state").value,
    district: $("#f-district").value.trim(),
    season: $("#f-season").value,
    year: Number($("#f-year").value),
    soil: $("#f-soil").value,
    ph: Number($("#f-ph").value),
    n: Number($("#f-n").value),
    p: Number($("#f-p").value),
    k: Number($("#f-k").value),
    rainfall: Number($("#f-rainfall").value),
    temp: Number($("#f-temp").value),
    humidity: Number($("#f-humidity").value),
    irrigation: $("#f-irrigation").value,
    area: Number($("#f-area").value)
  };
}

function renderPrediction(result, input) {
  $("#predict-empty").hidden = true;
  $("#predict-content").hidden = false;

  $("#r-yield").textContent = fmt(result.predictedYield, 2);
  $("#r-production").textContent = fmtInt(result.totalProduction);
  $("#r-formula").textContent = `= ${fmt(result.predictedYield, 2)} × ${fmt(input.area, 2)} ha`;
  $("#r-category").textContent = result.category;
  $("#r-method").textContent = "Demo estimator";
  $("#r-suitability").textContent = result.suitability;
  $("#r-timestamp").textContent = new Date().toLocaleString();

  // Factors list
  const factorsList = $("#r-factors");
  factorsList.innerHTML = "";
  for (const f of result.factors) {
    const li = document.createElement("li");
    const dirIcon = f.direction === "good" ? "↑" : f.direction === "warn" ? "↓" : "•";
    li.innerHTML = `<span>${dirIcon}</span><div>
      <strong>${f.name}</strong><br>
      <span style="color:var(--muted);font-size:12px;">${f.detail}</span><br>
      <span style="color:var(--botanical);font-weight:600;font-size:12px;">Impact: ${f.impact}</span>
    </div>`;
    factorsList.appendChild(li);
  }

  // Recommendations
  const recs = generateRecommendations(input);
  const recList = $("#r-recommendations");
  recList.innerHTML = "";
  for (const r of recs) {
    const li = document.createElement("li");
    li.innerHTML = `<i data-lucide="check" style="width:16px;height:16px;color:var(--botanical);flex-shrink:0;margin-top:2px;"></i>
      <div><strong>${r.title}</strong><br><span style="color:var(--muted);font-size:12.5px;">${r.body}</span></div>`;
    recList.appendChild(li);
  }
  if (window.lucide) window.lucide.createIcons({ root: recList });
}

function handlePredictSubmit(e) {
  e.preventDefault();
  if (!validatePredictForm()) {
    toast("Please fix the highlighted fields before predicting.", { type: "warn", title: "Validation error" });
    return;
  }
  const input = readPredictInput();
  // show loading
  $("#predict-loading").hidden = false;
  $("#predict-empty").hidden = true;
  $("#predict-content").hidden = true;

  setTimeout(() => {
    const result = computePrediction(input);
    currentPrediction = { input, result, createdAt: Date.now() };
    renderPrediction(result, input);
    $("#predict-loading").hidden = true;
    toast("Demo estimate computed. Review the factors below before saving.", { type: "info", title: "Prediction ready" });
  }, 120); // tiny delay so the loading spinner shows briefly
}

async function handleSavePrediction() {
  if (!currentPrediction) {
    toast("Compute a prediction first.", { type: "warn" });
    return;
  }
  const record = {
    crop: currentPrediction.input.crop,
    state: currentPrediction.input.state,
    district: currentPrediction.input.district,
    season: currentPrediction.input.season,
    year: currentPrediction.input.year,
    soil: currentPrediction.input.soil,
    ph: currentPrediction.input.ph,
    nitrogen: currentPrediction.input.n,
    phosphorus: currentPrediction.input.p,
    potassium: currentPrediction.input.k,
    rainfall: currentPrediction.input.rainfall,
    temperature: currentPrediction.input.temp,
    humidity: currentPrediction.input.humidity,
    irrigation: currentPrediction.input.irrigation,
    area: currentPrediction.input.area,
    predictedYield: currentPrediction.result.predictedYield,
    totalProduction: currentPrediction.result.totalProduction,
    category: currentPrediction.result.category,
    suitability: currentPrediction.result.suitability,
    method: currentPrediction.result.method,
    createdAt: Date.now(),
    source: "demo"
  };
  const btn = $("#btn-save-prediction");
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" style="animation:spin 0.8s linear infinite;"></i> Saving…';
  if (window.lucide) window.lucide.createIcons({ root: btn });
  try {
    const res = await window.IcyFirebase.savePrediction(record);
    if (res.ok && !res.demo) {
      toast("Prediction saved to backend.", { type: "success" });
    } else if (res.ok && res.demo) {
      toast("Saved locally in demo mode — backend not reachable.", { type: "warn", title: "Demo mode" });
    } else {
      throw new Error(res.error || "Unknown error");
    }
    // refresh dashboard + history if visible
    if ($("#section-dashboard").classList.contains("active")) refreshDashboard();
    if ($("#section-history").classList.contains("active")) refreshHistory();
  } catch (err) {
    toast("Could not save prediction: " + err.message, { type: "error" });
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="save"></i> Save Prediction';
    if (window.lucide) window.lucide.createIcons({ root: btn });
  }
}

/* ---------------------------------------------------------------------
   11. Dashboard
   --------------------------------------------------------------------- */
let charts = {};

function destroyChart(key) {
  if (charts[key]) { charts[key].destroy(); delete charts[key]; }
}

const CHART_BASE = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: "#12372A", font: { family: "Plus Jakarta Sans", size: 12 } } }
  },
  scales: {
    x: { ticks: { color: "#5B7466", font: { size: 11 } }, grid: { color: "#EEF3E7" } },
    y: { ticks: { color: "#5B7466", font: { size: 11 } }, grid: { color: "#EEF3E7" } }
  }
};

async function refreshDashboard() {
  const predictionsRes = await window.IcyFirebase.getPredictions();
  const predictions = predictionsRes.data || {};
  const records = Object.entries(predictions).map(([id, p]) => ({ id, ...p, _demo: !!p._demo || predictionsRes.demo }));
  records.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  // KPI 1: total predictions
  $("#kpi-total-predictions").textContent = fmtInt(records.length);
  $("#kpi-total-predictions-sub").textContent = predictionsRes.demo ? "demo mode (local)" : "saved to backend";

  // KPI 2: avg predicted yield
  if (records.length) {
    const avg = records.reduce((s, r) => s + (r.predictedYield || 0), 0) / records.length;
    $("#kpi-avg-yield").textContent = fmt(avg, 2);
  } else {
    $("#kpi-avg-yield").textContent = "—";
  }

  // KPI 3: crops analysed (distinct crops in records, else dataset count)
  const distinctCrops = new Set(records.map(r => r.crop).filter(Boolean));
  if (distinctCrops.size > 0) {
    $("#kpi-crops").textContent = distinctCrops.size;
  } else {
    $("#kpi-crops").textContent = Object.keys(window.CROP_DATASET.cropStats).length;
  }

  // KPI 4: most analysed crop
  if (records.length) {
    const counts = {};
    records.forEach(r => { counts[r.crop] = (counts[r.crop] || 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (top) {
      $("#kpi-top-crop").textContent = top[0];
      $("#kpi-top-crop-sub").textContent = `${top[1]} prediction${top[1] > 1 ? "s" : ""}`;
    }
  } else {
    // Use the dataset's most-analysed crop by count
    const top = Object.entries(window.CROP_DATASET.cropStats)
      .sort((a, b) => b[1].count - a[1].count)[0];
    if (top) {
      $("#kpi-top-crop").textContent = top[0];
      $("#kpi-top-crop-sub").textContent = `${top[1].count} historical records (sample)`;
    }
  }

  // Recent predictions table
  const tbody = $("#recent-predictions-body");
  if (records.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="7">No predictions saved yet. Use the Yield Prediction page to create one.</td></tr>';
  } else {
    tbody.innerHTML = records.slice(0, 10).map(r => `
      <tr>
        <td>${r.crop || "—"}</td>
        <td>${r.state || "—"}</td>
        <td>${r.season || "—"}</td>
        <td>${fmt(r.predictedYield, 2)}</td>
        <td>${fmtInt(r.totalProduction)}</td>
        <td><span class="tag-source ${r._demo ? "demo" : "cloud"}">${r._demo ? "demo" : "cloud"}</span></td>
        <td>${timeAgo(r.createdAt)}</td>
      </tr>`).join("");
  }

  // Charts
  renderDashboardCharts(records);
}

function renderDashboardCharts(records) {
  // Chart 1: Crop-wise yield comparison
  destroyChart("cropCompare");
  const cropLabels = Object.keys(window.CROP_DATASET.cropStats);
  const cropData = cropLabels.map(c => window.CROP_DATASET.cropStats[c].avg);
  const ctx1 = $("#chart-crop-compare").getContext("2d");
  charts.cropCompare = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: cropLabels,
      datasets: [{
        label: "Avg yield (t/ha) — historical sample",
        data: cropData,
        backgroundColor: cropLabels.map((c, i) =>
          i % 2 === 0 ? "rgba(31, 111, 67, 0.78)" : "rgba(183, 227, 107, 0.85)"),
        borderColor: "rgba(31, 111, 67, 0.9)",
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: { ...CHART_BASE, plugins: { ...CHART_BASE.plugins, legend: { display: false } } }
  });
  $("#pill-crop-data").textContent = `sample · ${window.CROP_DATASET.totalRecords.toLocaleString()} records`;

  // Chart 2: Seasonal yield trends
  destroyChart("seasonTrend");
  const seasonLabels = Object.keys(window.CROP_DATASET.seasonStats);
  const seasonData = seasonLabels.map(s => window.CROP_DATASET.seasonStats[s].avg);
  const ctx2 = $("#chart-season-trend").getContext("2d");
  charts.seasonTrend = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: seasonLabels,
      datasets: [{
        label: "Avg yield (t/ha)",
        data: seasonData,
        backgroundColor: "rgba(31, 111, 67, 0.78)",
        borderColor: "rgba(31, 111, 67, 0.9)",
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: { ...CHART_BASE, plugins: { ...CHART_BASE.plugins, legend: { display: false } } }
  });

  // Chart 3: Rainfall vs yield (illustrative curve)
  destroyChart("rainfallYield");
  const rainLabels = [];
  const rainData = [];
  for (let r = 200; r <= 3000; r += 100) {
    rainLabels.push(r + "mm");
    // bell curve centred at 1300mm with spread of 600
    const dev = (r - 1300) / 600;
    const yieldVal = 2.5 * Math.exp(-0.5 * dev * dev) + 0.4;
    rainData.push(yieldVal.toFixed(2));
  }
  const ctx3 = $("#chart-rainfall-yield").getContext("2d");
  charts.rainfallYield = new Chart(ctx3, {
    type: "line",
    data: {
      labels: rainLabels,
      datasets: [{
        label: "Illustrative yield (t/ha)",
        data: rainData,
        borderColor: "rgba(31, 111, 67, 1)",
        backgroundColor: "rgba(183, 227, 107, 0.32)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 2
      }]
    },
    options: { ...CHART_BASE, plugins: { ...CHART_BASE.plugins, legend: { display: false } } }
  });
}

/* ---------------------------------------------------------------------
   12. Scenario Simulator
   --------------------------------------------------------------------- */
let simulatorInit = false;

function ensureSimulator() {
  if (!simulatorInit) {
    // populate crops/states if not done
    populateDropdowns();
    simulatorInit = true;
  }
  updateScenario();
}

function readSimBase() {
  return {
    crop: $("#s-crop").value || "Rice",
    state: $("#s-state").value || "Punjab",
    season: $("#s-season").value || "Kharif",
    rainfall: Number($("#s-rainfall").value) || 1100,
    temp: Number($("#s-temp").value) || 27,
    ph: Number($("#s-ph").value) || 6.5,
    area: Number($("#s-area").value) || 2,
    // reasonable defaults for unmodified inputs
    n: 100, p: 50, k: 40, humidity: 70, soil: "Alluvial", irrigation: "Rainfed"
  };
}

function updateScenario() {
  const base = readSimBase();
  const rainPct = Number($("#rainfall-slider").value);
  const tempDelta = Number($("#temp-slider").value);

  const baseRain = base.rainfall;
  const modRain = Math.max(0, Math.round(baseRain * (1 + rainPct / 100)));
  const baseTemp = base.temp;
  const modTemp = Math.round((baseTemp + tempDelta) * 10) / 10;

  $("#s-rain-base").textContent = baseRain;
  $("#s-rain-mod").textContent = modRain;
  $("#s-temp-base").textContent = baseTemp;
  $("#s-temp-mod").textContent = modTemp;
  $("#rainfall-pill").textContent = (rainPct >= 0 ? "+" : "") + rainPct + "%";
  $("#temp-pill").textContent = (tempDelta >= 0 ? "+" : "") + tempDelta + "°C";

  const baselineInput = { ...base, rainfall: baseRain, temp: baseTemp };
  const modifiedInput = { ...base, rainfall: modRain, temp: modTemp };

  const baselineResult = computePrediction(baselineInput);
  const modifiedResult = computePrediction(modifiedInput);

  $("#sim-baseline-yield").textContent = fmt(baselineResult.predictedYield, 2);
  $("#sim-baseline-prod").textContent = fmtInt(baselineResult.totalProduction) + " t total";
  $("#sim-modified-yield").textContent = fmt(modifiedResult.predictedYield, 2);
  $("#sim-modified-prod").textContent = fmtInt(modifiedResult.totalProduction) + " t total";

  const delta = modifiedResult.predictedYield - baselineResult.predictedYield;
  const deltaPct = baselineResult.predictedYield > 0
    ? (delta / baselineResult.predictedYield) * 100
    : 0;
  const deltaEl = $("#sim-delta");
  deltaEl.textContent = (delta >= 0 ? "+" : "") + delta.toFixed(2) + " (" + (deltaPct >= 0 ? "+" : "") + deltaPct.toFixed(1) + "%)";
  deltaEl.classList.toggle("pos", delta > 0.01);
  deltaEl.classList.toggle("neg", delta < -0.01);

  // Scenario comparison chart
  destroyChart("scenario");
  const ctx = $("#chart-scenario").getContext("2d");
  charts.scenario = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Baseline", "Modified"],
      datasets: [
        {
          label: "Yield (t/ha)",
          data: [baselineResult.predictedYield, modifiedResult.predictedYield],
          backgroundColor: ["rgba(31, 111, 67, 0.78)", "rgba(183, 227, 107, 0.9)"],
          borderColor: ["rgba(31, 111, 67, 0.95)", "rgba(31, 111, 67, 0.95)"],
          borderWidth: 1,
          borderRadius: 8
        },
        {
          label: "Total production (t)",
          data: [baselineResult.totalProduction, modifiedResult.totalProduction],
          backgroundColor: ["rgba(31, 111, 67, 0.35)", "rgba(183, 227, 107, 0.45)"],
          borderColor: ["rgba(31, 111, 67, 0.7)", "rgba(31, 111, 67, 0.7)"],
          borderWidth: 1,
          borderRadius: 8
        }
      ]
    },
    options: { ...CHART_BASE }
  });
}

async function handleSaveScenario() {
  const base = readSimBase();
  const rainPct = Number($("#rainfall-slider").value);
  const tempDelta = Number($("#temp-slider").value);
  const modRain = Math.max(0, Math.round(base.rainfall * (1 + rainPct / 100)));
  const modTemp = Math.round((base.temp + tempDelta) * 10) / 10;
  const baselineResult = computePrediction({ ...base, rainfall: base.rainfall, temp: base.temp });
  const modifiedResult = computePrediction({ ...base, rainfall: modRain, temp: modTemp });
  const delta = modifiedResult.predictedYield - baselineResult.predictedYield;

  const record = {
    crop: base.crop,
    state: base.state,
    season: base.season,
    area: base.area,
    baselineRainfall: base.rainfall,
    baselineTemp: base.temp,
    modifiedRainfall: modRain,
    modifiedTemp: modTemp,
    rainPct, tempDelta,
    baselineYield: baselineResult.predictedYield,
    modifiedYield: modifiedResult.predictedYield,
    yieldDelta: delta,
    createdAt: Date.now(),
    source: "demo"
  };
  const btn = $("#btn-save-scenario");
  btn.disabled = true;
  try {
    const res = await window.IcyFirebase.saveScenario(record);
    if (res.ok && !res.demo) toast("Scenario saved to backend.", { type: "success" });
    else if (res.ok && res.demo) toast("Scenario saved locally in demo mode.", { type: "warn", title: "Demo mode" });
    else throw new Error(res.error);
  } catch (err) {
    toast("Could not save scenario: " + err.message, { type: "error" });
  } finally {
    btn.disabled = false;
  }
}

/* ---------------------------------------------------------------------
   13. Explainable AI chart
   --------------------------------------------------------------------- */
function ensureXAIChart() {
  destroyChart("xai");
  const ctx = $("#chart-xai-importance").getContext("2d");
  const factors = [
    { name: "Rainfall",         weight: 22 },
    { name: "Temperature",      weight: 19 },
    { name: "Soil pH",          weight: 14 },
    { name: "Nitrogen (N)",     weight: 12 },
    { name: "Phosphorus (P)",   weight: 8 },
    { name: "Potassium (K)",    weight: 8 },
    { name: "Irrigation",        weight: 11 },
    { name: "Humidity",         weight: 6 }
  ];
  charts.xai = new Chart(ctx, {
    type: "bar",
    data: {
      labels: factors.map(f => f.name),
      datasets: [{
        label: "Illustrative influence (%)",
        data: factors.map(f => f.weight),
        backgroundColor: factors.map((_, i) =>
          i % 2 === 0 ? "rgba(31, 111, 67, 0.78)" : "rgba(183, 227, 107, 0.85)"),
        borderColor: "rgba(31, 111, 67, 0.9)",
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      ...CHART_BASE,
      indexAxis: "y",
      plugins: { ...CHART_BASE.plugins, legend: { display: false } }
    }
  });
}

/* ---------------------------------------------------------------------
   14. Regional Analytics
   --------------------------------------------------------------------- */
async function refreshRegional() {
  const predictionsRes = await window.IcyFirebase.getPredictions();
  const predictions = Object.entries(predictionsRes.data || {}).map(([id, p]) => ({ id, ...p, _demo: !!p._demo || predictionsRes.demo }));

  // Build a combined dataset: saved predictions + sample historical
  const sample = buildSampleDataset();
  let data = [...predictions, ...sample];

  // Apply filters
  const state = $("#ra-state").value;
  const district = $("#ra-district").value.trim().toLowerCase();
  const crop = $("#ra-crop").value;
  const season = $("#ra-season").value;
  const year = $("#ra-year").value;

  data = data.filter(r => {
    if (state && r.state !== state) return false;
    if (district && !(r.district || "").toLowerCase().includes(district)) return false;
    if (crop && r.crop !== crop) return false;
    if (season && (r.season || "") !== season) return false;
    if (year && String(r.year || "") !== year) return false;
    return true;
  });

  $("#ra-record-count").textContent = `${data.length} record${data.length === 1 ? "" : "s"}`;

  // Render table
  const tbody = $("#regional-table-body");
  if (data.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="7">No records match the filters.</td></tr>';
  } else {
    tbody.innerHTML = data.slice(0, 200).map(r => `
      <tr>
        <td>${r.crop || "—"}</td>
        <td>${r.state || "—"}</td>
        <td>${r.season || "—"}</td>
        <td>${r.year || "—"}</td>
        <td>${fmt(r.area || 0, 2)}</td>
        <td>${fmt(r.predictedYield || r.yield || 0, 2)}</td>
        <td><span class="tag-source ${r._demo ? "demo" : (r._sample ? "" : "cloud")}">${r._demo ? "demo" : (r._sample ? "sample" : "cloud")}</span></td>
      </tr>`).join("");
  }

  // Render charts
  renderRegionalCharts(data);
}

function buildSampleDataset() {
  // Generate ~60 sample rows from the embedded dataset so the regional page
  // has something to show even before the user has saved any predictions.
  const sample = [];
  const crops = Object.keys(window.CROP_DATASET.cropStats);
  const states = Object.keys(window.CROP_DATASET.stateStats);
  const seasons = ["Kharif", "Rabi", "Whole Year", "Summer", "Autumn", "Winter"];
  const years = window.CROP_DATASET.years;

  // Seed for reproducibility
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < 80; i++) {
    const crop = crops[Math.floor(rand() * crops.length)];
    const state = states[Math.floor(rand() * states.length)];
    const season = seasons[Math.floor(rand() * seasons.length)];
    const year = years[Math.floor(rand() * years.length)];
    const base = window.CROP_DATASET.cropStats[crop].avg;
    const variance = 0.7 + rand() * 0.6; // ±30%
    const yieldVal = Math.max(0.1, Math.round(base * variance * 100) / 100);
    sample.push({
      id: "sample-" + i,
      crop, state, season, year: Number(year),
      area: Math.round((rand() * 5 + 0.5) * 100) / 100,
      predictedYield: yieldVal,
      totalProduction: Math.round(yieldVal * 2 * 100) / 100,
      source: "sample",
      _sample: true,
      _demo: false
    });
  }
  return sample;
}

function renderRegionalCharts(data) {
  // Regional comparison (by state)
  destroyChart("regionalCompare");
  const byState = {};
  data.forEach(r => {
    if (!r.state) return;
    if (!byState[r.state]) byState[r.state] = [];
    byState[r.state].push(r.predictedYield || r.yield || 0);
  });
  const stateLabels = Object.keys(byState).sort((a, b) => (avg(byState[b]) - avg(byState[a])));
  const stateData = stateLabels.map(s => avg(byState[s]));
  const ctx1 = $("#chart-regional-compare").getContext("2d");
  charts.regionalCompare = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: stateLabels,
      datasets: [{
        label: "Avg yield (t/ha)",
        data: stateData,
        backgroundColor: "rgba(31, 111, 67, 0.78)",
        borderRadius: 6
      }]
    },
    options: { ...CHART_BASE, plugins: { ...CHART_BASE.plugins, legend: { display: false } } }
  });

  // Seasonal trends
  destroyChart("regionalSeason");
  const bySeason = {};
  data.forEach(r => {
    if (!r.season) return;
    if (!bySeason[r.season]) bySeason[r.season] = [];
    bySeason[r.season].push(r.predictedYield || r.yield || 0);
  });
  const seasonLabels = Object.keys(bySeason);
  const seasonData = seasonLabels.map(s => avg(bySeason[s]));
  const ctx2 = $("#chart-regional-season").getContext("2d");
  charts.regionalSeason = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: seasonLabels,
      datasets: [{
        label: "Avg yield (t/ha)",
        data: seasonData,
        backgroundColor: "rgba(183, 227, 107, 0.85)",
        borderColor: "rgba(31, 111, 67, 0.9)",
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: { ...CHART_BASE, plugins: { ...CHART_BASE.plugins, legend: { display: false } } }
  });

  // Crop comparison
  destroyChart("regionalCrop");
  const byCrop = {};
  data.forEach(r => {
    if (!r.crop) return;
    if (!byCrop[r.crop]) byCrop[r.crop] = [];
    byCrop[r.crop].push(r.predictedYield || r.yield || 0);
  });
  const cropLabels = Object.keys(byCrop);
  const cropData = cropLabels.map(c => avg(byCrop[c]));
  const ctx3 = $("#chart-regional-crop").getContext("2d");
  charts.regionalCrop = new Chart(ctx3, {
    type: "bar",
    data: {
      labels: cropLabels,
      datasets: [{
        label: "Avg yield (t/ha)",
        data: cropData,
        backgroundColor: cropLabels.map((_, i) =>
          i % 2 === 0 ? "rgba(31, 111, 67, 0.78)" : "rgba(183, 227, 107, 0.85)"),
        borderRadius: 6
      }]
    },
    options: { ...CHART_BASE, plugins: { ...CHART_BASE.plugins, legend: { display: false } } }
  });

  // Rainfall vs yield scatter
  destroyChart("regionalRainfall");
  const pts = data
    .filter(r => r.rainfall && (r.predictedYield || r.yield))
    .map(r => ({ x: r.rainfall, y: r.predictedYield || r.yield }));
  const ctx4 = $("#chart-regional-rainfall").getContext("2d");
  charts.regionalRainfall = new Chart(ctx4, {
    type: "scatter",
    data: {
      datasets: [{
        label: "Yield vs rainfall",
        data: pts,
        backgroundColor: "rgba(31, 111, 67, 0.65)",
        borderColor: "rgba(31, 111, 67, 0.9)",
        pointRadius: 5
      }]
    },
    options: {
      ...CHART_BASE,
      scales: {
        x: { ...CHART_BASE.scales.x, title: { display: true, text: "Rainfall (mm)" } },
        y: { ...CHART_BASE.scales.y, title: { display: true, text: "Yield (t/ha)" } }
      }
    }
  });
}

function avg(arr) { return arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : 0; }

function exportRegionalCSV() {
  // Re-apply filters (same logic as refreshRegional)
  // For brevity, just export the current table
  const rows = $$("#regional-table-body tr");
  if (!rows.length || (rows.length === 1 && rows[0].classList.contains("empty-row"))) {
    toast("No records to export.", { type: "warn" });
    return;
  }
  const headers = ["Crop", "State", "Season", "Year", "Area_ha", "Yield_t_ha", "Source"];
  const lines = [headers.join(",")];
  rows.forEach(r => {
    const cells = $$("td", r).map(td => {
      let v = td.textContent.trim().replace(/"/g, '""');
      if (v.includes(",")) v = `"${v}"`;
      return v;
    });
    lines.push(cells.join(","));
  });
  downloadCSV(lines.join("\n"), "regional_analytics.csv");
}

function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 200);
  toast("CSV exported: " + filename, { type: "success" });
}

/* ---------------------------------------------------------------------
   15. Prediction History
   --------------------------------------------------------------------- */
let historyRecords = [];

async function refreshHistory() {
  const tbody = $("#history-body");
  tbody.innerHTML = '<tr class="empty-row"><td colspan="9">Loading…</td></tr>';
  const res = await window.IcyFirebase.getPredictions();
  historyRecords = Object.entries(res.data || {}).map(([id, p]) => ({ id, ...p, _demo: !!p._demo || res.demo }));
  renderHistory();
}

function renderHistory() {
  const search = ($("#h-search").value || "").trim().toLowerCase();
  const season = $("#h-season").value;
  const sort = $("#h-sort").value;

  let list = historyRecords.slice();
  if (search) {
    list = list.filter(r =>
      (r.crop || "").toLowerCase().includes(search) ||
      (r.district || "").toLowerCase().includes(search) ||
      (r.state || "").toLowerCase().includes(search)
    );
  }
  if (season) {
    list = list.filter(r => (r.season || "") === season);
  }

  // Sort
  if (sort === "date-desc") list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  else if (sort === "date-asc") list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  else if (sort === "yield-desc") list.sort((a, b) => (b.predictedYield || 0) - (a.predictedYield || 0));
  else if (sort === "yield-asc") list.sort((a, b) => (a.predictedYield || 0) - (b.predictedYield || 0));

  $("#h-count").textContent = `${list.length} record${list.length === 1 ? "" : "s"}`;

  const tbody = $("#history-body");
  if (list.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="9">No matching predictions. Try clearing filters or running a new prediction.</td></tr>';
    return;
  }
  tbody.innerHTML = list.map(r => `
    <tr data-id="${r.id}">
      <td>${r.crop || "—"}</td>
      <td>${r.state || "—"}</td>
      <td>${r.district || "—"}</td>
      <td>${r.season || "—"}</td>
      <td>${fmt(r.predictedYield, 2)}</td>
      <td>${fmtInt(r.totalProduction)}</td>
      <td><span class="tag-source ${r._demo ? "demo" : "cloud"}">${r._demo ? "demo" : "cloud"}</span></td>
      <td>${timeAgo(r.createdAt)}</td>
      <td>
        <button class="row-btn" data-action="view" data-id="${r.id}"><i data-lucide="eye"></i></button>
        <button class="row-btn danger" data-action="delete" data-id="${r.id}"><i data-lucide="trash-2"></i></button>
      </td>
    </tr>`).join("");
  if (window.lucide) window.lucide.createIcons({ root: tbody });
}

function handleHistoryClick(e) {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const id = btn.getAttribute("data-id");
  const action = btn.getAttribute("data-action");
  if (action === "view") openHistoryModal(id);
  else if (action === "delete") confirmDelete(id);
}

function openHistoryModal(id) {
  const r = historyRecords.find(x => x.id === id);
  if (!r) return;
  const body = $("#modal-body");
  body.innerHTML = `
    <div class="detail-grid">
      <div><strong>Crop</strong><span>${r.crop || "—"}</span></div>
      <div><strong>State</strong><span>${r.state || "—"}</span></div>
      <div><strong>District</strong><span>${r.district || "—"}</span></div>
      <div><strong>Season</strong><span>${r.season || "—"}</span></div>
      <div><strong>Year</strong><span>${r.year || "—"}</span></div>
      <div><strong>Soil</strong><span>${r.soil || "—"}</span></div>
      <div><strong>Soil pH</strong><span>${r.ph || "—"}</span></div>
      <div><strong>Nitrogen (kg/ha)</strong><span>${r.nitrogen || "—"}</span></div>
      <div><strong>Phosphorus (kg/ha)</strong><span>${r.phosphorus || "—"}</span></div>
      <div><strong>Potassium (kg/ha)</strong><span>${r.potassium || "—"}</span></div>
      <div><strong>Rainfall (mm)</strong><span>${r.rainfall || "—"}</span></div>
      <div><strong>Temperature (°C)</strong><span>${r.temperature || "—"}</span></div>
      <div><strong>Humidity (%)</strong><span>${r.humidity || "—"}</span></div>
      <div><strong>Irrigation</strong><span>${r.irrigation || "—"}</span></div>
      <div><strong>Farm area (ha)</strong><span>${r.area || "—"}</span></div>
      <div><strong>Predicted yield</strong><span>${fmt(r.predictedYield, 2)} t/ha</span></div>
      <div><strong>Total production</strong><span>${fmtInt(r.totalProduction)} t</span></div>
      <div><strong>Category</strong><span>${r.category || "—"}</span></div>
      <div><strong>Suitability</strong><span>${r.suitability || "—"}</span></div>
      <div><strong>Method</strong><span>${r.method || "—"}</span></div>
      <div><strong>Source</strong><span>${r._demo ? "demo (local)" : "backend (server)"}</span></div>
      <div><strong>Saved</strong><span>${r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}</span></div>
    </div>
  `;
  $("#modal-delete").setAttribute("data-id", id);
  $("#history-modal").classList.add("show");
  $("#history-modal").setAttribute("aria-hidden", "false");
}

function closeHistoryModal() {
  $("#history-modal").classList.remove("show");
  $("#history-modal").setAttribute("aria-hidden", "true");
}

function confirmDelete(id) {
  // Custom inline confirm via toast-prompt style
  if (!confirm("Delete this prediction record? This action cannot be undone.")) return;
  deleteHistoryRecord(id);
}

async function deleteHistoryRecord(id) {
  try {
    const res = await window.IcyFirebase.deletePrediction(id);
    if (res.ok && !res.demo) toast("Prediction deleted from backend.", { type: "success" });
    else if (res.ok && res.demo) toast("Demo record deleted locally.", { type: "info" });
    else throw new Error(res.error);
    // remove from local cache
    historyRecords = historyRecords.filter(r => r.id !== id);
    renderHistory();
    // refresh dashboard too if visible
    if ($("#section-dashboard").classList.contains("active")) refreshDashboard();
  } catch (err) {
    toast("Could not delete: " + err.message, { type: "error" });
  }
}

function exportHistoryCSV() {
  if (!historyRecords.length) {
    toast("No prediction history to export.", { type: "warn" });
    return;
  }
  // Apply same filters as renderHistory
  const search = ($("#h-search").value || "").trim().toLowerCase();
  const season = $("#h-season").value;
  const sort = $("#h-sort").value;
  let list = historyRecords.slice();
  if (search) list = list.filter(r =>
    (r.crop || "").toLowerCase().includes(search) ||
    (r.district || "").toLowerCase().includes(search) ||
    (r.state || "").toLowerCase().includes(search)
  );
  if (season) list = list.filter(r => (r.season || "") === season);
  if (sort === "date-desc") list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  else if (sort === "date-asc") list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  else if (sort === "yield-desc") list.sort((a, b) => (b.predictedYield || 0) - (a.predictedYield || 0));
  else if (sort === "yield-asc") list.sort((a, b) => (a.predictedYield || 0) - (b.predictedYield || 0));

  const headers = [
    "Crop","State","District","Season","Year","Soil","pH",
    "Nitrogen_kg_ha","Phosphorus_kg_ha","Potassium_kg_ha",
    "Rainfall_mm","Temperature_C","Humidity_pct","Irrigation","Area_ha",
    "Predicted_Yield_t_ha","Total_Production_t","Category","Suitability","Method","Source","Saved_At"
  ];
  const lines = [headers.join(",")];
  list.forEach(r => {
    const row = [
      r.crop, r.state, r.district, r.season, r.year, r.soil, r.ph,
      r.nitrogen, r.phosphorus, r.potassium,
      r.rainfall, r.temperature, r.humidity, r.irrigation, r.area,
      r.predictedYield, r.totalProduction, r.category, r.suitability, r.method,
      r._demo ? "demo" : "cloud",
      r.createdAt ? new Date(r.createdAt).toISOString() : ""
    ];
    lines.push(row.map(v => {
      const s = String(v == null ? "" : v).replace(/"/g, '""');
      return /[",\n]/.test(s) ? `"${s}"` : s;
    }).join(","));
  });
  downloadCSV(lines.join("\n"), "prediction_history.csv");
}

/* ---------------------------------------------------------------------
   16. Recommendations page
   --------------------------------------------------------------------- */
function handleGenerateRecs() {
  const input = {
    crop: $("#rec-crop").value,
    ph: Number($("#rec-ph").value),
    rainfall: Number($("#rec-rainfall").value),
    temp: Number($("#rec-temp").value),
    irrigation: $("#rec-irrigation").value,
    n: 100, p: 50, k: 40, humidity: 70, soil: "Alluvial"
  };
  if (!input.crop) {
    toast("Please choose a crop first.", { type: "warn" });
    return;
  }
  const recs = generateRecommendations(input);
  const list = $("#rec-list");
  list.innerHTML = "";
  if (!recs.length) {
    list.innerHTML = "<li>Inputs look optimal — no immediate advisory actions needed.</li>";
    return;
  }
  recs.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `<i data-lucide="check" style="width:16px;height:16px;color:var(--botanical);flex-shrink:0;margin-top:3px;"></i>
      <div><strong>${r.title}</strong><br><span style="color:var(--muted);font-size:13px;">${r.body}</span></div>`;
    list.appendChild(li);
  });
  if (window.lucide) window.lucide.createIcons({ root: list });
}

/* ---------------------------------------------------------------------
   17. Firebase status check
   --------------------------------------------------------------------- */
async function checkFirebaseStatus() {
  const statusEl = $("#firebase-status");
  const bannerEl = $("#firebase-banner");
  if (!window.IcyFirebase) {
    statusEl.className = "firebase-status offline";
    statusEl.querySelector(".status-text").textContent = "API client not loaded";
    bannerEl.innerHTML = '<i data-lucide="cloud-off"></i><span>API client not loaded — running in offline demo mode. Predictions and scenarios are saved to your browser only.</span>';
    if (window.lucide) window.lucide.createIcons({ root: bannerEl });
    return;
  }
  statusEl.querySelector(".status-text").textContent = "Connecting to backend…";
  try {
    const res = await window.IcyFirebase.checkFirebaseStatus();
    if (res.ready) {
      statusEl.className = "firebase-status";
      statusEl.querySelector(".status-text").textContent = "Backend connected";
      bannerEl.innerHTML = '<i data-lucide="server"></i><span><strong>Backend connected.</strong> Predictions and scenarios are saved to the local Node.js server and persist in <code>data.json</code>.</span>';
      bannerEl.style.borderLeftColor = "var(--ok)";
    } else {
      statusEl.className = "firebase-status demo";
      statusEl.querySelector(".status-text").textContent = "Demo mode (backend down)";
      bannerEl.innerHTML = '<i data-lucide="cloud-off"></i><span><strong>Demo mode:</strong> Backend is not running. Start it with <code>npm start</code> in the project folder. Until then, predictions are saved to your browser only.</span>';
      bannerEl.style.borderLeftColor = "var(--warn)";
    }
  } catch (err) {
    statusEl.className = "firebase-status offline";
    statusEl.querySelector(".status-text").textContent = "Backend error";
    bannerEl.innerHTML = '<i data-lucide="cloud-off"></i><span>Could not check backend status. Running in demo mode.</span>';
  }
  if (window.lucide) window.lucide.createIcons({ root: bannerEl });
}

/* ---------------------------------------------------------------------
   18. Global search (topbar)
   --------------------------------------------------------------------- */
function handleGlobalSearch(e) {
  const q = e.target.value.trim().toLowerCase();
  if (!q) return;
  // Switch to history page and apply search
  showSection("history");
  const search = $("#h-search");
  search.value = q;
  renderHistory();
}

/* ---------------------------------------------------------------------
   19. Init / wire events
   --------------------------------------------------------------------- */
function init() {
  // Footer year
  $("#footer-year").textContent = new Date().getFullYear();

  // Populate dropdowns
  populateDropdowns();

  // Initialize Lucide icons
  if (window.lucide) window.lucide.createIcons();

  // Sidebar nav
  $$(".nav-item").forEach(n => {
    n.addEventListener("click", () => showSection(n.getAttribute("data-section")));
  });

  // Mobile menu
  $("#menu-toggle").addEventListener("click", () => {
    $("#sidebar").classList.toggle("open");
    $("#sidebar-overlay").classList.toggle("show");
  });
  $("#sidebar-overlay").addEventListener("click", () => {
    $("#sidebar").classList.remove("open");
    $("#sidebar-overlay").classList.remove("show");
  });

  // Topbar quick predict
  $("#quick-predict").addEventListener("click", () => showSection("predict"));
  $("#btn-quick-predict").addEventListener("click", () => showSection("predict"));
  $("#btn-view-history").addEventListener("click", () => showSection("history"));

  // Prediction form
  $("#predict-form").addEventListener("submit", handlePredictSubmit);
  $("#btn-save-prediction").addEventListener("click", handleSavePrediction);
  $("#btn-redo-prediction").addEventListener("click", () => {
    currentPrediction = null;
    $("#predict-content").hidden = true;
    $("#predict-empty").hidden = false;
    $("#predict-form").reset();
    $("#f-year").value = new Date().getFullYear();
  });

  // Real-time field error clearing
  $$("#predict-form input, #predict-form select").forEach(el => {
    el.addEventListener("input", () => {
      el.classList.remove("invalid");
      const errEl = $(`.field-error[data-for="${el.id}"]`);
      if (errEl) errEl.textContent = "";
    });
  });

  // Simulator
  $("#rainfall-slider").addEventListener("input", updateScenario);
  $("#temp-slider").addEventListener("input", updateScenario);
  ["#s-crop", "#s-state", "#s-season", "#s-rainfall", "#s-temp", "#s-ph", "#s-area"].forEach(sel => {
    const el = $(sel);
    if (el) el.addEventListener("input", updateScenario);
  });
  $("#btn-save-scenario").addEventListener("click", handleSaveScenario);

  // Regional analytics
  $("#btn-apply-filter").addEventListener("click", refreshRegional);
  $("#btn-reset-filter").addEventListener("click", () => {
    ["#ra-state", "#ra-district", "#ra-crop", "#ra-season", "#ra-year"].forEach(s => {
      const el = $(s); if (el) el.value = "";
    });
    refreshRegional();
  });
  $("#btn-export-csv").addEventListener("click", exportRegionalCSV);

  // History
  $("#h-search").addEventListener("input", renderHistory);
  $("#h-season").addEventListener("change", renderHistory);
  $("#h-sort").addEventListener("change", renderHistory);
  $("#history-body").addEventListener("click", handleHistoryClick);
  $("#btn-history-csv").addEventListener("click", exportHistoryCSV);
  $("#modal-close").addEventListener("click", closeHistoryModal);
  $("#modal-cancel").addEventListener("click", closeHistoryModal);
  $("#modal-delete").addEventListener("click", (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    closeHistoryModal();
    confirmDelete(id);
  });
  $("#history-modal").addEventListener("click", (e) => {
    if (e.target.id === "history-modal") closeHistoryModal();
  });

  // Recommendations
  $("#btn-gen-recs").addEventListener("click", handleGenerateRecs);

  // Global search (topbar)
  $("#global-search").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleGlobalSearch(e);
  });

  // Firebase status check
  checkFirebaseStatus();

  // Initial dashboard render
  refreshDashboard();
}

// Wait for DOM + firebase.js to expose window.IcyFirebase.
// firebase.js is loaded as type="module" which is deferred by the browser,
// so it may finish AFTER this synchronous classic script. We poll for the
// global with a bounded retry so we never block forever if the module fails.
function _waitForFirebase(retries) {
  if (window.IcyFirebase || retries <= 0) {
    init();
  } else {
    setTimeout(() => _waitForFirebase(retries - 1), 50);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => _waitForFirebase(40));
} else {
  _waitForFirebase(40);
}
