/* ═══════════════════════════════════════════════════
   RKLB Investment Thesis — Interactive JS
════════════════════════════════════════════════════ */

// ─── CHART DEFAULTS ──────────────────────────────
const ACCENT = '#00A3E0';
const GREEN  = '#00C896';
const RED    = '#FF4D6A';
const GOLD   = '#F5C542';
const PURPLE = '#9B72CF';
const MUTED  = '#7B8794';
const SURFACE3 = '#161C27';
const BORDER   = 'rgba(255,255,255,0.07)';

// ─── DEVICE PIXEL RATIO — crisp rendering on all displays ───
// Set globally so every Chart.js instance renders at native resolution.
Chart.defaults.devicePixelRatio = window.devicePixelRatio || 2;

Chart.defaults.color = MUTED;
Chart.defaults.borderColor = BORDER;
Chart.defaults.font.family = "'Space Mono', monospace";
Chart.defaults.font.size = 11;
Chart.defaults.plugins.tooltip.backgroundColor = '#0D1117';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(0,163,224,0.3)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.titleColor = ACCENT;
Chart.defaults.plugins.tooltip.bodyColor = '#E8EDF2';
Chart.defaults.plugins.legend.display = false;

/**
 * setupHiDPI(canvas)
 * Scales a canvas element to the device pixel ratio so it renders crisp
 * on Retina / HiDPI screens.  Must be called BEFORE Chart.js touches the canvas.
 * Returns the 2d context with the correct transform applied.
 */
function setupHiDPI(canvas) {
  const dpr    = window.devicePixelRatio || 2;
  const rect   = canvas.parentElement
    ? canvas.parentElement.getBoundingClientRect()
    : { width: canvas.offsetWidth || 800, height: canvas.offsetHeight || 380 };
  const cssW   = rect.width  || canvas.offsetWidth  || 800;
  const cssH   = parseInt(canvas.style.height) || canvas.offsetHeight || 380;
  canvas.width  = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.style.width  = cssW + 'px';
  canvas.style.height = cssH + 'px';
  const ctx = canvas.getContext('2d', { alpha: true });
  ctx.scale(dpr, dpr);
  return ctx;
}

// ─── SEGMENT DONUT ───────────────────────────────
new Chart(document.getElementById('segmentChart'), {
  type: 'doughnut',
  data: {
    labels: ['Space Systems', 'Launch Services'],
    datasets: [{
      data: [67, 33],
      backgroundColor: [ACCENT, SURFACE3],
      borderColor: ['#00A3E0', 'rgba(0,163,224,0.2)'],
      borderWidth: 2,
      hoverOffset: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.label}: ${ctx.parsed}% of FY2025 revenue`
        }
      }
    }
  }
});

// ─── REVENUE BAR CHART ───────────────────────────
new Chart(document.getElementById('revenueChart'), {
  type: 'bar',
  data: {
    labels: ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026E', 'FY2027E'],
    datasets: [
      {
        label: 'Space Systems',
        data: [107, 214, 293, 403, 592, 820],
        backgroundColor: ACCENT,
        borderRadius: 4,
        stack: 'rev'
      },
      {
        label: 'Launch Services',
        data: [44, 88, 143, 199, 293, 345],
        backgroundColor: 'rgba(0,163,224,0.2)',
        borderRadius: 4,
        stack: 'rev'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { color: MUTED, font: { size: 10 }, boxWidth: 10, padding: 16 }
      },
      tooltip: {
        callbacks: {
          footer: (items) => {
            const total = items.reduce((sum, i) => sum + i.parsed.y, 0);
            return `Total: $${total}M`;
          }
        }
      }
    },
    scales: {
      x: { stacked: true, grid: { display: false }, ticks: { color: MUTED } },
      y: {
        stacked: true,
        grid: { color: BORDER },
        ticks: {
          color: MUTED,
          callback: v => `$${v}M`
        }
      }
    }
  }
});

// ─── PILLAR I — MIX SHIFT ────────────────────────
new Chart(document.getElementById('mixShiftChart'), {
  type: 'line',
  data: {
    labels: ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'],
    datasets: [
      {
        label: 'Space Systems %',
        data: [20, 71, 71, 67, 67],
        borderColor: ACCENT,
        backgroundColor: 'rgba(0,163,224,0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: ACCENT,
        pointRadius: 4
      },
      {
        label: 'Launch Services %',
        data: [80, 29, 29, 33, 33],
        borderColor: MUTED,
        backgroundColor: 'rgba(123,135,148,0.05)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: MUTED,
        pointRadius: 4,
        borderDash: [4, 4]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { color: MUTED, font: { size: 10 }, boxWidth: 10, padding: 12 }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: MUTED } },
      y: {
        min: 0, max: 100,
        grid: { color: BORDER },
        ticks: { color: MUTED, callback: v => `${v}%` }
      }
    }
  }
});

// ─── PILLAR II — TAM CHART ───────────────────────
new Chart(document.getElementById('tamChart'), {
  type: 'bar',
  data: {
    labels: ['Small-Lift\n(Current TAM)', 'Medium-Lift\n(Neutron TAM)', 'RKLB @ 5%\nMedium-Lift'],
    datasets: [{
      data: [10, 100, 5],
      backgroundColor: [MUTED, ACCENT, GREEN],
      borderRadius: 6,
      barThickness: 52
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => ` $${ctx.parsed.y}B`
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: MUTED } },
      y: {
        grid: { color: BORDER },
        ticks: { color: MUTED, callback: v => `$${v}B` }
      }
    }
  }
});

// ─── PILLAR III — SHORT INTEREST ─────────────────
new Chart(document.getElementById('shortInterestChart'), {
  type: 'line',
  data: {
    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
    datasets: [{
      label: 'Short Interest Index (100=Peak)',
      data: [100, 95, 88, 82, 70, 60, 48, 38, 35],
      borderColor: RED,
      backgroundColor: 'rgba(255,77,106,0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: RED,
      pointRadius: 4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: { label: ctx => ` Index: ${ctx.parsed.y} (vs 100 peak)` }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: MUTED, maxRotation: 30 } },
      y: {
        grid: { color: BORDER },
        ticks: { color: MUTED },
        min: 0, max: 110
      }
    }
  }
});

// ─── COMPS TABLE ─────────────────────────────────
const COMPS_DATA = [
  { ticker: 'RKLB', company: 'Rocket Lab', marketCap: 38600, ev: 37200, ltmRev: 602, ntmRev: 885, ev_ntm: 42.0, grossMargin: '44.3%', revGrowth: '+38%', backlog: 1850, highlight: true },
  { ticker: 'ASTS', company: 'AST SpaceMobile', marketCap: 12400, ev: 11900, ltmRev: 28, ntmRev: 80, ev_ntm: 149.0, grossMargin: '28%', revGrowth: '+185%', backlog: 420, highlight: false },
  { ticker: 'PL',   company: 'Planet Labs', marketCap: 850, ev: 780, ltmRev: 242, ntmRev: 260, ev_ntm: 3.0, grossMargin: '43%', revGrowth: '+12%', backlog: 290, highlight: false },
  { ticker: 'LUNR', company: 'Intuitive Machines', marketCap: 1200, ev: 1100, ltmRev: 228, ntmRev: 290, ev_ntm: 3.8, grossMargin: '10%', revGrowth: '+145%', backlog: 316, highlight: false },
  { ticker: 'RDW',  company: 'Redwire', marketCap: 650, ev: 780, ltmRev: 320, ntmRev: 380, ev_ntm: 2.1, grossMargin: '26%', revGrowth: '+22%', backlog: 490, highlight: false },
  { ticker: 'BKSY', company: 'BlackSky Technology', marketCap: 290, ev: 260, ltmRev: 110, ntmRev: 128, ev_ntm: 2.0, grossMargin: '36%', revGrowth: '+18%', backlog: 130, highlight: false },
  { ticker: 'LHX',  company: 'L3Harris', marketCap: 38200, ev: 42500, ltmRev: 21300, ntmRev: 22100, ev_ntm: 1.9, grossMargin: '16%', revGrowth: '+6%', backlog: 31000, highlight: false, defense: true },
  { ticker: 'NOC',  company: 'Northrop Grumman', marketCap: 66500, ev: 74200, ltmRev: 39300, ntmRev: 41000, ev_ntm: 1.8, grossMargin: '22%', revGrowth: '+8%', backlog: 84900, highlight: false, defense: true },
];

let currentSort = 'marketCap';
let sortDir = -1;

function renderComps() {
  const sorted = [...COMPS_DATA].sort((a, b) => sortDir * (b[currentSort] - a[currentSort]));
  const tbody = document.getElementById('compsBody');
  tbody.innerHTML = sorted.map(r => `
    <tr class="${r.highlight ? 'row-rklb' : r.defense ? 'row-defense' : ''}">
      <td>
        <span style="font-weight:700;color:${r.highlight ? ACCENT : 'inherit'}">${r.ticker}</span>
        <span style="color:${MUTED};margin-left:8px;font-size:0.8em">${r.company}</span>
        ${r.defense ? '<span style="font-size:10px;color:'+MUTED+';margin-left:4px">(defense comp)</span>' : ''}
      </td>
      <td class="td-right">$${(r.marketCap/1000).toFixed(1)}B</td>
      <td class="td-right">$${(r.ev/1000).toFixed(1)}B</td>
      <td class="td-right">${r.defense ? '$'+(r.ltmRev/1000).toFixed(1)+'B' : '$'+r.ltmRev+'M'}</td>
      <td class="td-right">${r.defense ? '$'+(r.ntmRev/1000).toFixed(1)+'B' : '$'+r.ntmRev+'M'}</td>
      <td class="td-right" style="color:${r.highlight ? ACCENT : 'inherit'}">${r.ev_ntm.toFixed(1)}×</td>
      <td class="td-right">${r.grossMargin}</td>
      <td class="td-right" style="color:${parseFloat(r.revGrowth)>=20 ? GREEN : MUTED}">${r.revGrowth}</td>
      <td class="td-right">${r.defense ? '$'+(r.backlog/1000).toFixed(1)+'B' : '$'+r.backlog.toLocaleString()+'M'}</td>
    </tr>
  `).join('');
}

document.querySelectorAll('.sort-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const s = btn.dataset.sort;
    if (s === currentSort) sortDir *= -1;
    else { currentSort = s; sortDir = -1; }
    renderComps();
  });
});
renderComps();

// ─── INTERACTIVE DCF ─────────────────────────────
const BASE = {
  revGrowth: 47, revGrowth27: 45, ebitdaMargin: 35,
  wacc: 15.6, tgr: 3.5, multPremium: 4.0
};

function calcDCF(params) {
  const fy2025 = 602;
  const g26 = params.revGrowth / 100;
  const g27 = params.revGrowth27 / 100;
  const g28 = 0.30; const g29 = 0.22; const g30 = 0.18;
  const ebitdaMarginRamp = [0.05, 0.15, params.ebitdaMargin/100*0.7, params.ebitdaMargin/100*0.85, params.ebitdaMargin/100];
  const taxRate = 0.21;
  const capexPct = 0.08;
  const daPct = 0.06;
  const wacc = params.wacc / 100;
  const tgr = params.tgr / 100;

  const revs = [
    fy2025 * (1 + g26),
    fy2025 * (1 + g26) * (1 + g27),
    fy2025 * (1 + g26) * (1 + g27) * (1 + g28),
    fy2025 * (1 + g26) * (1 + g27) * (1 + g28) * (1 + g29),
    fy2025 * (1 + g26) * (1 + g27) * (1 + g28) * (1 + g29) * (1 + g30),
  ];

  const years = ['FY2026E', 'FY2027E', 'FY2028E', 'FY2029E', 'FY2030E'];
  const rows = [];
  let pvSum = 0;

  revs.forEach((rev, i) => {
    const ebitda = rev * ebitdaMarginRamp[i];
    const da = rev * daPct;
    const ebit = ebitda - da;
    const nopat = ebit * (1 - taxRate);
    const capex = rev * capexPct;
    const ufcf = nopat + da - capex;
    const pv = ufcf / Math.pow(1 + wacc, i + 1);
    pvSum += pv;
    rows.push({ year: years[i], rev, ebitda, ebitdaMarginPct: ebitdaMarginRamp[i], ufcf, pv });
  });

  // Terminal value (Gordon Growth)
  const terminalFCF = rows[4].ufcf * (1 + tgr);
  const tv = terminalFCF / (wacc - tgr);
  const pvTV = tv / Math.pow(1 + wacc, 5);

  // Equity bridge
  const ev = pvSum + pvTV;
  const netCash = 1100;
  const dilutedShares = 569.5;

  // Blend with revenue multiple
  const ntmRev = rows[0].rev;
  const multVal = ntmRev * params.multPremium;
  const pvMultVal = multVal / Math.pow(1 + wacc, 1);

  const blendedEV = ev * 0.6 + pvMultVal * 0.4;
  const equityValue = blendedEV + netCash;
  const pricePerShare = equityValue / dilutedShares;

  return { rows, pvSum, pvTV: pvTV, totalEV: blendedEV, equityValue, pricePerShare };
}

function updateDCF() {
  const params = {
    revGrowth:    parseFloat(document.getElementById('revGrowth').value),
    revGrowth27:  parseFloat(document.getElementById('revGrowth27').value),
    ebitdaMargin: parseFloat(document.getElementById('ebitdaMargin').value),
    wacc:         parseFloat(document.getElementById('wacc').value),
    tgr:          parseFloat(document.getElementById('tgr').value),
    multPremium:  parseFloat(document.getElementById('multPremium').value),
  };

  // Update labels
  document.getElementById('revGrowthVal').textContent    = `${params.revGrowth}%`;
  document.getElementById('revGrowth27Val').textContent  = `${params.revGrowth27}%`;
  document.getElementById('ebitdaMarginVal').textContent = `${params.ebitdaMargin}%`;
  document.getElementById('waccVal').textContent         = `${parseFloat(params.wacc).toFixed(1)}%`;
  document.getElementById('tgrVal').textContent          = `${params.tgr}%`;
  document.getElementById('multPremiumVal').textContent  = `${params.multPremium}×`;

  const result = calcDCF(params);

  // Implied price
  const price = result.pricePerShare;
  const currentPrice = 67.68;
  const ret = ((price - currentPrice) / currentPrice * 100);
  document.getElementById('impliedPrice').textContent = `$${price.toFixed(2)}`;
  const retEl = document.getElementById('impliedReturn');
  retEl.textContent = `${ret >= 0 ? '+' : ''}${ret.toFixed(1)}% vs. current`;
  retEl.className = `ip-return ${ret < 0 ? 'negative' : ''}`;

  // Bar fill — map $38–$125 → 0–100%
  const barPct = Math.max(0, Math.min(100, (price - 38) / (125 - 38) * 100));
  document.getElementById('ipBarFill').style.width = `${barPct}%`;

  // Bridge
  document.getElementById('pvCFs').textContent      = `$${Math.round(result.pvSum).toLocaleString()}M`;
  document.getElementById('pvTV').textContent        = `$${Math.round(result.pvTV).toLocaleString()}M`;
  document.getElementById('totalEV').textContent     = `$${Math.round(result.totalEV).toLocaleString()}M`;
  document.getElementById('equityPerShare').textContent = `$${price.toFixed(2)}`;

  // Table
  document.getElementById('dcfBody').innerHTML = result.rows.map((r, i) => `
    <tr>
      <td>${r.year}</td>
      <td class="td-right">$${Math.round(r.rev).toLocaleString()}M</td>
      <td class="td-right">$${Math.round(r.ebitda).toLocaleString()}M</td>
      <td class="td-right">${(r.ebitdaMarginPct * 100).toFixed(1)}%</td>
      <td class="td-right" style="color:${r.ufcf < 0 ? RED : GREEN}">$${Math.round(r.ufcf).toLocaleString()}M</td>
      <td class="td-right">$${Math.round(r.pv).toLocaleString()}M</td>
    </tr>
  `).join('');
}

['revGrowth','revGrowth27','ebitdaMargin','wacc','tgr','multPremium'].forEach(id => {
  document.getElementById(id).addEventListener('input', updateDCF);
});

document.getElementById('resetDCF').addEventListener('click', () => {
  document.getElementById('revGrowth').value    = BASE.revGrowth;
  document.getElementById('revGrowth27').value  = BASE.revGrowth27;
  document.getElementById('ebitdaMargin').value = BASE.ebitdaMargin;
  document.getElementById('wacc').value         = BASE.wacc;
  document.getElementById('tgr').value          = BASE.tgr;
  document.getElementById('multPremium').value  = BASE.multPremium;
  updateDCF();
});

updateDCF();

// ─── SCENARIO CHART ──────────────────────────────
new Chart(document.getElementById('scenarioChart'), {
  type: 'bar',
  data: {
    labels: ['Bear ($38 · 15%)', 'Base ($95 · 60%)', 'Bull ($125 · 25%)'],
    datasets: [
      {
        label: 'Price Target',
        data: [38, 95, 125],
        backgroundColor: [RED, ACCENT, GREEN],
        borderRadius: 6,
        barThickness: 60
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` Target: $${ctx.parsed.y}`
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: MUTED } },
      y: {
        grid: { color: BORDER },
        ticks: { color: MUTED, callback: v => `$${v}` },
        min: 0, max: 145
      }
    }
  },
  plugins: [{
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const yScale = chart.scales.y;
      const xScale = chart.scales.x;
      const y = yScale.getPixelForValue(67.68);
      ctx.save();
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(xScale.left, y);
      ctx.lineTo(xScale.right, y);
      ctx.stroke();
      ctx.fillStyle = GOLD;
      ctx.font = '10px Space Mono';
      ctx.fillText('Current $67.68', xScale.left + 4, y - 5);
      ctx.restore();
    }
  }]
});

// ─── SENSITIVITY HEATMAP ──────────────────────────
function generateHeatmap() {
  const waccVals  = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const tgrVals   = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
  const currentPrice = 67.68;

  function getColor(price) {
    const norm = (price - 30) / (150 - 30); // 0–1
    const r = norm < 0.5 ? 255 : Math.round(255 * (1 - (norm - 0.5) * 2));
    const g = norm > 0.5 ? 200 : Math.round(200 * norm * 2);
    const b = norm < 0.4 ? Math.round(106 * (1 - norm / 0.4)) : 0;
    return `rgba(${r},${g},${b},0.75)`;
  }

  function impliedPrice(wacc, tgr) {
    const params = {
      revGrowth: 47, revGrowth27: 45, ebitdaMargin: 35,
      wacc, tgr, multPremium: 4.0
    };
    return calcDCF(params).pricePerShare;
  }

  const container = document.getElementById('heatmapContainer');
  let html = '<table class="heatmap-table">';

  // Header row: TGR values
  html += '<thead><tr><th>WACC \\ TGR</th>';
  tgrVals.forEach(t => { html += `<th>${t}%</th>`; });
  html += '</tr></thead><tbody>';

  waccVals.forEach(w => {
    html += `<tr><th>${w}%</th>`;
    tgrVals.forEach(t => {
      const price = impliedPrice(w, t);
      const bg = getColor(price);
      const isBase = Math.abs(w - 15.6) < 0.7 && Math.abs(t - 3.5) < 0.3;
      const textColor = price < 50 ? '#fff' : price > 90 ? '#000' : '#fff';
      html += `<td style="background:${bg};color:${textColor}" ${isBase ? 'class="cell-base"' : ''} title="WACC ${w}%, TGR ${t}% → $${price.toFixed(0)}">$${price.toFixed(0)}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}
generateHeatmap();

// ─── RISK MATRIX ──────────────────────────────────
const RISKS = [
  {
    label: 'Neutron Delay',
    prob: 0.45,
    impact: 0.70,
    color: RED,
    probability: 'Medium-High (45%)',
    impactText: 'High — removes TAM expansion optionality, prompts multiple compression',
    mitigant: 'Base case does not require Neutron. Priced in as a free call option. Exit trigger is a 2028+ slip.',
    exit: 'Neutron delayed beyond H2 2028 with no clear path forward'
  },
  {
    label: 'Margin Compression',
    prob: 0.30,
    impact: 0.75,
    color: RED,
    probability: 'Medium (30%)',
    impactText: 'High — breaks the "defense infrastructure" re-rating thesis if SS gross < 35%',
    mitigant: 'Current trajectory is 780bps expansion over 18 months. Mynaric acquisition improves mix.',
    exit: 'Space Systems non-GAAP gross margin falls below 35% for two consecutive quarters'
  },
  {
    label: 'SDA Contract Risk',
    prob: 0.20,
    impact: 0.80,
    color: RED,
    probability: 'Low-Medium (20%)',
    impactText: 'Very High — would impair FY2027 $532M revenue event and remove core catalyst',
    mitigant: 'Already contracted ($816M Tranche III). Congressional defense space budget up 40% YoY.',
    exit: 'SDA program restructured or RKLB replaced as prime contractor'
  },
  {
    label: 'Dilution Risk',
    prob: 0.35,
    impact: 0.40,
    color: GOLD,
    probability: 'Medium (35%)',
    impactText: 'Moderate — modest dilution is expected and priced in; severe dilution is the risk',
    mitigant: '$1.1B cash provides runway. ATM facility capped. Management compensation actions signal alignment.',
    exit: 'Equity issuance exceeds 15% of shares outstanding in any 12-month period'
  },
  {
    label: 'SpaceX IPO Delays',
    prob: 0.58,
    impact: 0.25,
    color: GOLD,
    probability: 'High (58%)',
    impactText: 'Low — sector re-rate is Tier 2 catalyst only. Base case does not depend on it.',
    mitigant: 'Thesis built on contracted fundamentals. SpaceX IPO is pure upside optionality.',
    exit: 'Not an exit trigger — monitor for potential positioning reversion'
  },
  {
    label: 'Macro / Demand',
    prob: 0.25,
    impact: 0.45,
    color: MUTED,
    probability: 'Low-Medium (25%)',
    impactText: 'Moderate — defense revenue is government-contracted and budget-insensitive',
    mitigant: '3.1× backlog coverage. Multi-year government contracts insulate near-term revenue.',
    exit: 'Commercial satellite market contracts more than 20% YoY — evaluate mix shift'
  },
];

const riskChart = new Chart(document.getElementById('riskChart'), {
  type: 'bubble',
  data: {
    datasets: RISKS.map((r, i) => ({
      label: r.label,
      data: [{ x: r.impact * 100, y: r.prob * 100, r: 14 }],
      backgroundColor: r.color + '55',
      borderColor: r.color,
      borderWidth: 2
    }))
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => RISKS[items[0].datasetIndex].label,
          label: (item) => [
            `Probability: ${(item.parsed.y).toFixed(0)}%`,
            `Impact: ${(item.parsed.x).toFixed(0)}%`
          ]
        }
      }
    },
    scales: {
      x: { min: 0, max: 100, title: { display: false }, grid: { color: BORDER }, ticks: { color: MUTED, callback: v => v + '%' } },
      y: { min: 0, max: 100, title: { display: false }, grid: { color: BORDER }, ticks: { color: MUTED, callback: v => v + '%' } }
    },
    onClick: (evt, elements) => {
      if (!elements.length) return;
      const idx = elements[0].datasetIndex;
      const risk = RISKS[idx];
      document.getElementById('rdpContent').style.display = 'flex';
      document.getElementById('rdpContent').style.flexDirection = 'column';
      document.getElementById('rdpContent').style.gap = '12px';
      document.querySelector('.rdp-placeholder').style.display = 'none';
      document.getElementById('rdpName').textContent = risk.label;
      document.getElementById('rdpProb').textContent = risk.probability;
      document.getElementById('rdpImpact').textContent = risk.impactText;
      document.getElementById('rdpMitigant').textContent = risk.mitigant;
      document.getElementById('rdpExit').textContent = risk.exit;
    }
  }
});

// Risk table
const riskTableBody = document.getElementById('riskTableBody');
riskTableBody.innerHTML = RISKS.map(r => `
  <tr>
    <td>${r.label}</td>
    <td class="td-center">
      <span style="color:${r.color};font-weight:700">${r.probability}</span>
    </td>
    <td class="td-center">${r.impact >= 0.7 ? '🔴 High' : r.impact >= 0.45 ? '🟡 Med' : '🟢 Low'}</td>
    <td>${r.mitigant}</td>
    <td>${r.exit}</td>
  </tr>
`).join('');

// ─── CATALYST CHART ───────────────────────────────
new Chart(document.getElementById('catalystChart'), {
  type: 'bar',
  data: {
    labels: [
      'Q1 Earnings Beat',
      'SpaceX IPO',
      'Mynaric Integration',
      'SDA New Contracts',
      'Neutron Maiden Flight',
      'Space Sys. Margin Exp.',
      'First Neutron Contract',
      'SDA $532M Peak',
    ],
    datasets: [
      {
        label: 'Probability (%)',
        data: [72, 42, 78, 68, 38, 85, 55, 90],
        backgroundColor: [GREEN, ACCENT, GREEN, GREEN, GOLD, GREEN, GOLD, ACCENT],
        borderRadius: 4,
        barThickness: 28,
        yAxisID: 'y'
      },
      {
        label: 'Expected Impact (%)',
        data: [8, 18, 9, 12, 35, 15, 22, 20],
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderColor: MUTED,
        borderWidth: 1.5,
        type: 'line',
        tension: 0.4,
        pointBackgroundColor: MUTED,
        pointRadius: 4,
        yAxisID: 'y2'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { color: MUTED, font: { size: 10 }, boxWidth: 10, padding: 16 }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: MUTED, maxRotation: 30 }
      },
      y: {
        grid: { color: BORDER },
        ticks: { color: GREEN, callback: v => v + '%' },
        title: { display: true, text: 'Probability', color: GREEN, font: { size: 10 } },
        min: 0, max: 110
      },
      y2: {
        position: 'right',
        grid: { display: false },
        ticks: { color: MUTED, callback: v => '+' + v + '%' },
        title: { display: true, text: 'Price Impact', color: MUTED, font: { size: 10 } },
        min: 0, max: 45
      }
    }
  }
});

// ─── FOOTBALL FIELD ───────────────────────────────
const FOOTBALL_DATA = [
  { label: 'DCF (Base)', low: 72, high: 118, mid: 95 },
  { label: 'EV/NTM Rev (3–7×)', low: 56, high: 131, mid: 94 },
  { label: 'EV/FY2027E (3–6×)', low: 78, high: 157, mid: 117 },
  { label: 'Analyst Consensus', low: 69, high: 120, mid: 91 },
  { label: 'Defense Comps Re-Rate', low: 85, high: 140, mid: 112 },
];

new Chart(document.getElementById('footballChart'), {
  type: 'bar',
  data: {
    labels: FOOTBALL_DATA.map(d => d.label),
    datasets: [
      {
        label: 'Range Floor',
        data: FOOTBALL_DATA.map(d => d.low),
        backgroundColor: 'transparent',
        borderWidth: 0
      },
      {
        label: 'Valuation Range',
        data: FOOTBALL_DATA.map(d => d.high - d.low),
        backgroundColor: FOOTBALL_DATA.map((_, i) => `rgba(0,163,224,${0.2 + i * 0.06})`),
        borderColor: ACCENT,
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => FOOTBALL_DATA[items[0].dataIndex].label,
          label: (item) => {
            const d = FOOTBALL_DATA[item.dataIndex];
            if (item.datasetIndex === 1) return [
              `Range: $${d.low} – $${d.high}`,
              `Midpoint: $${d.mid}`
            ];
            return null;
          },
          filter: item => item.datasetIndex === 1
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        min: 30, max: 170,
        grid: { color: BORDER },
        ticks: { color: MUTED, callback: v => `$${v}` }
      },
      y: {
        stacked: true,
        grid: { display: false },
        ticks: { color: MUTED }
      }
    }
  },
  plugins: [{
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;

      // Current price line
      const xCurrent = xScale.getPixelForValue(67.68);
      ctx.save();
      ctx.strokeStyle = '#5591c7';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(xCurrent, yScale.top);
      ctx.lineTo(xCurrent, yScale.bottom);
      ctx.stroke();
      ctx.fillStyle = '#5591c7';
      ctx.font = '10px Space Mono';
      ctx.fillText('Current $67.68', xCurrent + 6, yScale.top + 14);

      // Target price line
      const xTarget = xScale.getPixelForValue(95);
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      ctx.moveTo(xTarget, yScale.top);
      ctx.lineTo(xTarget, yScale.bottom);
      ctx.stroke();
      ctx.fillStyle = ACCENT;
      ctx.fillText('Target $95', xTarget + 6, yScale.top + 28);

      // Midpoint dots
      FOOTBALL_DATA.forEach((d, i) => {
        const xMid = xScale.getPixelForValue(d.mid);
        const yCenter = yScale.getPixelForValue(i);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(xMid, yCenter, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }
  }]
});

// ─── SIDEBAR SCROLL SPY ───────────────────────────
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach(s => observer.observe(s));

// ─── SMOOTH SCROLL ───────────────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    // Close mobile nav
    document.getElementById('sidebar').classList.remove('open');
  });
});

// ─── MOBILE NAV ───────────────────────────────────
document.getElementById('mobileNavToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ─── ENTRANCE ANIMATIONS ──────────────────────────
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.metric-card, .exec-summary-card, .pillar-block, .scenario-card, .cat-card, .vi-item, .source-category').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  animObserver.observe(el);
});

// ─── MONTE CARLO SIMULATION ───────────────────────
(function () {
  'use strict';

  const CURRENT_PRICE = 67.68;
  const TARGET_PRICE  = 95;
  const N_PATHS       = 10000;
  const FY2025_REV    = 602;
  const NET_CASH      = 1100;
  const BASE_SHARES   = 569.5;

  // Box-Muller transform → standard normal
  function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  // Sample from truncated normal (lo/hi are soft clamps at 3σ)
  function sampleTruncNormal(mu, sigma, lo, hi) {
    let x;
    let tries = 0;
    do {
      x = mu + sigma * randn();
      tries++;
      if (tries > 50) { x = Math.max(lo, Math.min(hi, x)); break; }
    } while (x < lo || x > hi);
    return x;
  }

  // Single-path DCF — mirrors calcDCF() in the main DCF section
  function singlePathPrice(revGrowth26, ebitdaMarginTerminal, wacc, tgr, dilutionFactor) {
    const g26 = revGrowth26 / 100;
    // Subsequent years mean-revert toward ~25% from the sampled g26
    const g27 = Math.max(0.10, g26 * sampleTruncNormal(0.92, 0.06, 0.70, 1.10));
    const g28 = Math.max(0.10, g27 * sampleTruncNormal(0.85, 0.06, 0.60, 1.05));
    const g29 = Math.max(0.05, g28 * sampleTruncNormal(0.80, 0.06, 0.55, 1.00));
    const g30 = Math.max(0.05, g29 * sampleTruncNormal(0.75, 0.05, 0.50, 0.95));

    const revs = [
      FY2025_REV * (1 + g26),
      FY2025_REV * (1 + g26) * (1 + g27),
      FY2025_REV * (1 + g26) * (1 + g27) * (1 + g28),
      FY2025_REV * (1 + g26) * (1 + g27) * (1 + g28) * (1 + g29),
      FY2025_REV * (1 + g26) * (1 + g27) * (1 + g28) * (1 + g29) * (1 + g30),
    ];

    // Margin ramp: Year 1 starts low, converges to terminal by Year 5
    const tm = ebitdaMarginTerminal / 100;
    const margins = [
      tm * 0.12,
      tm * 0.38,
      tm * 0.62,
      tm * 0.82,
      tm
    ];

    const taxRate  = 0.21;
    const capexPct = 0.08;
    const daPct    = 0.06;
    const waccD    = wacc / 100;
    const tgrD     = tgr  / 100;

    let pvSum = 0;
    let lastUFCF = 0;
    revs.forEach((rev, i) => {
      const ebitda = rev * margins[i];
      const da     = rev * daPct;
      const nopat  = (ebitda - da) * (1 - taxRate);
      const ufcf   = nopat + da - rev * capexPct;
      pvSum += ufcf / Math.pow(1 + waccD, i + 1);
      if (i === 4) lastUFCF = ufcf;
    });

    // Gordon-growth terminal value
    if (waccD <= tgrD) return null; // degenerate case
    const tv   = (lastUFCF * (1 + tgrD)) / (waccD - tgrD);
    const pvTV = tv / Math.pow(1 + waccD, 5);

    // Blend DCF with revenue multiple (same 60/40 split as base model)
    const ntmRev      = revs[0];
    const multPremium = sampleTruncNormal(4.0, 1.0, 2.0, 7.5);
    const pvMultVal   = (ntmRev * multPremium) / (1 + waccD);
    const blendedEV   = (pvSum + pvTV) * 0.6 + pvMultVal * 0.4;

    const shares     = BASE_SHARES * dilutionFactor;
    const equityVal  = blendedEV + NET_CASH;
    const pricePerSh = equityVal / shares;

    return pricePerSh;
  }

  // Run N_PATHS simulations
  function runSimulation(params) {
    const results = [];
    for (let i = 0; i < N_PATHS; i++) {
      const revGrowth = sampleTruncNormal(
        params.revMu, params.revSigma, 5, 90
      );
      const margin = sampleTruncNormal(
        params.marginMu, params.marginSigma, 8, 58
      );
      // Mild macro correlation: higher WACC tends to come with lower TGR
      const waccRaw  = sampleTruncNormal(params.waccMu, params.waccSigma, 7, 24);
      const tgrRaw   = sampleTruncNormal(
        params.tgrMu - 0.15 * (waccRaw - params.waccMu),
        params.tgrSigma, 1, 5.5
      );
      const dilution = sampleTruncNormal(1.02, 0.03, 0.95, 1.12);

      const price = singlePathPrice(revGrowth, margin, waccRaw, tgrRaw, dilution);
      if (price !== null && isFinite(price) && price > 0 && price < 1000) {
        results.push(price);
      }
    }
    results.sort((a, b) => a - b);
    return results;
  }

  // Statistics
  function percentile(sorted, p) {
    const idx = Math.max(0, Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length)));
    return sorted[idx];
  }
  function mean(arr) {
    return arr.reduce((s, v) => s + v, 0) / arr.length;
  }
  function std(arr, mu) {
    const m = mu !== undefined ? mu : mean(arr);
    return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length);
  }

  // Build histogram bins
  function buildHistogram(data, nBins) {
    const lo  = Math.max(0,   percentile(data, 0.5));
    const hi  = Math.min(600, percentile(data, 99.5));
    const bw  = (hi - lo) / nBins;
    const bins = Array.from({ length: nBins }, (_, i) => ({
      lo: lo + i * bw,
      hi: lo + (i + 1) * bw,
      count: 0
    }));
    data.forEach(v => {
      if (v < lo || v > hi) return;
      const b = Math.min(nBins - 1, Math.floor((v - lo) / bw));
      bins[b].count++;
    });
    return { bins, lo, hi, bw };
  }

  let mcChartInstance = null;

  function renderHistogram(results, params) {
    const N_BINS = 60;
    const { bins, lo, hi } = buildHistogram(results, N_BINS);

    const labels = bins.map(b => ((b.lo + b.hi) / 2).toFixed(0));
    const counts = bins.map(b => b.count);

    // Color each bar: red if below current price, blue if above
    const bgColors = bins.map(b => {
      const midpoint = (b.lo + b.hi) / 2;
      if (midpoint < CURRENT_PRICE) return 'rgba(255,77,106,0.60)';
      return 'rgba(0,163,224,0.55)';
    });
    const borderColors = bins.map(b => {
      const midpoint = (b.lo + b.hi) / 2;
      if (midpoint < CURRENT_PRICE) return 'rgba(255,77,106,0.85)';
      return 'rgba(0,163,224,0.80)';
    });

    const mu     = mean(results);
    const median = percentile(results, 50);
    const p5     = percentile(results, 5);
    const p95    = percentile(results, 95);
    const sd     = std(results, mu);

    if (mcChartInstance) {
      mcChartInstance.destroy();
      mcChartInstance = null;
    }

    // ── Hi-DPI canvas setup: size the canvas backing store at devicePixelRatio
    // before handing it to Chart.js so every pixel is crisp on Retina screens.
    const mcCanvas = document.getElementById('mcHistogram');

    // 1. Let the wrapper dictate the CSS dimensions we want
    const mcWrapper = mcCanvas.parentElement;
    const dpr = window.devicePixelRatio || 2;
    const cssW = mcWrapper.clientWidth  || 800;
    const cssH = 380;  // matches the CSS height

    // 2. Set backing-store size to physical pixels
    mcCanvas.width  = Math.round(cssW * dpr);
    mcCanvas.height = Math.round(cssH * dpr);

    // 3. Keep the CSS display size at logical pixels (no CSS scaling distortion)
    mcCanvas.style.width  = cssW + 'px';
    mcCanvas.style.height = cssH + 'px';

    // 4. Get context WITHOUT Chart.js re-scaling it (we pass devicePixelRatio:1
    //    so Chart.js skips its own DPR handling since we already did it above)
    const ctx = mcCanvas.getContext('2d', { alpha: true });

    mcChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: counts,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
          borderRadius: 2,
          barPercentage: 1.0,
          categoryPercentage: 1.0,
        }]
      },
      options: {
        responsive: false,
        devicePixelRatio: dpr,   // tell Chart.js the true DPR so it draws at full res
        animation: { duration: 600, easing: 'easeOutCubic' },
        layout: { padding: { top: 26, bottom: 4, left: 4, right: 4 } },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => {
                const b = bins[items[0].dataIndex];
                return `$${b.lo.toFixed(0)} – $${b.hi.toFixed(0)}`;
              },
              label: (item) => {
                const pct = ((item.parsed.y / results.length) * 100).toFixed(1);
                return ` ${item.parsed.y.toLocaleString()} paths (${pct}%)`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#7B8794',
              maxTicksLimit: 10,
              callback: (val, idx) => {
                // Show tick only every ~6th bin to avoid crowding
                if (idx % 6 === 0) return '$' + labels[idx];
                return '';
              }
            }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: {
              color: '#7B8794',
              callback: v => v.toLocaleString()
            },
            title: {
              display: true,
              text: 'Simulation Paths',
              color: '#7B8794',
              font: { size: 10, family: 'Space Mono' }
            }
          }
        }
      },
      // Custom plugin: draw vertical lines for key levels
      plugins: [{
        afterDraw(chart) {
          const ctx = chart.ctx;
          const xScale = chart.scales.x;
          const yScale = chart.scales.y;
          const bw  = (hi - lo) / N_BINS;

          function xForPrice(price) {
            // Map price to bar index fractionally
            const frac = (price - lo) / (hi - lo);
            return xScale.left + frac * (xScale.right - xScale.left);
          }

          // ── Vertical reference lines ──────────────────
          // Current price gets special full-height filled treatment
          // All others are standard dashed lines with staggered labels
          const lines = [
            { price: p5,           color: '#FF4D6A', label: `P5 $${p5.toFixed(0)}`,           dash: [4, 3], tier: 0, thick: 1.6, isMedian: false },
            { price: mu,           color: '#7BB8D4', label: `Mean $${mu.toFixed(0)}`,           dash: [6, 3], tier: 2, thick: 1.6, isMedian: false },
            { price: median,       color: '#00A3E0', label: `Median (Base Case) $${median.toFixed(0)}`, dash: [], tier: 1, thick: 3.0, isMedian: true },
            { price: TARGET_PRICE, color: '#F5C542', label: `Target $${TARGET_PRICE}`,          dash: [8, 3], tier: 3, thick: 1.8, isMedian: false },
            { price: p95,          color: '#00C896', label: `P95 $${p95.toFixed(0)}`,           dash: [4, 3], tier: 0, thick: 1.6, isMedian: false },
          ];

          ctx.save();

          // ── Draw current price FIRST (behind other lines) as a bold gold band ──
          if (CURRENT_PRICE >= lo && CURRENT_PRICE <= hi) {
            const xCur = xForPrice(CURRENT_PRICE);

            // Filled semi-transparent band ±2px
            ctx.fillStyle = 'rgba(245, 197, 66, 0.10)';
            ctx.fillRect(xCur - 2, yScale.top, 4, yScale.bottom - yScale.top);

            // Solid gold line
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.strokeStyle = '#F5C542';
            ctx.lineWidth = 2.5;
            ctx.moveTo(xCur, yScale.top);
            ctx.lineTo(xCur, yScale.bottom);
            ctx.stroke();

            // DOM overlay label — positioned via requestAnimationFrame after render
            // so it sits above the canvas and is never clipped by Chart.js
            requestAnimationFrame(() => {
              const canvas   = chart.canvas;
              const rect     = canvas.getBoundingClientRect();
              const wrapper  = canvas.parentElement;
              const wrapRect = wrapper.getBoundingClientRect();

              // x fraction of current price within the chart x-axis
              const xFrac = (CURRENT_PRICE - lo) / (hi - lo);
              // Pixel offset of the line within the wrapper element
              const caLeft  = xScale.left;
              const caWidth = xScale.right - xScale.left;
              const pxInCanvas = caLeft + xFrac * caWidth;

              // Scale from canvas pixel to CSS pixel (devicePixelRatio)
              const dpr = window.devicePixelRatio || 1;
              const pxCSS = pxInCanvas / dpr;

              // Remove any previous overlay
              const old = wrapper.querySelector('.mc-cur-overlay');
              if (old) old.remove();

              const label = document.createElement('div');
              label.className = 'mc-cur-overlay';
              label.textContent = '\u25BC  Current Market Price  $67.68';
              label.style.cssText = [
                'position:absolute',
                'top:6px',
                `left:${pxCSS + 6}px`,
                'background:rgba(5,8,12,0.93)',
                'border:1px solid #F5C542',
                'border-radius:3px',
                'color:#F5C542',
                'font-family:Space Mono,monospace',
                'font-size:9px',
                'font-weight:700',
                'padding:3px 7px',
                'pointer-events:none',
                'white-space:nowrap',
                'z-index:10',
              ].join(';');

              // Flip to left of line if near right edge
              wrapper.style.position = 'relative';
              wrapper.appendChild(label);

              // Check if it overflows right and flip
              const lRect = label.getBoundingClientRect();
              const wRight = wrapRect.right;
              if (lRect.right > wRight - 8) {
                label.style.left = '';
                label.style.right = `${wrapper.offsetWidth - pxCSS + 6}px`;
              }
            });
          }

          // ── Draw all reference lines ──
          // Sort so Median is drawn LAST (on top of everything else)
          const sortedLines = [...lines].sort((a, b) => (a.isMedian ? 1 : 0) - (b.isMedian ? 1 : 0));

          sortedLines.forEach(({ price, color, label, dash, tier, thick, isMedian }) => {
            if (price < lo || price > hi) return;
            const x = xForPrice(price);

            if (isMedian) {
              // ── MEDIAN: glow halo + solid bright line + prominent label pill ──

              // 1. Outer glow (wide, very transparent)
              ctx.save();
              ctx.beginPath();
              ctx.setLineDash([]);
              ctx.strokeStyle = 'rgba(0, 163, 224, 0.18)';
              ctx.lineWidth = 12;
              ctx.moveTo(x, yScale.top);
              ctx.lineTo(x, yScale.bottom);
              ctx.stroke();

              // 2. Mid glow
              ctx.beginPath();
              ctx.strokeStyle = 'rgba(0, 163, 224, 0.30)';
              ctx.lineWidth = 6;
              ctx.moveTo(x, yScale.top);
              ctx.lineTo(x, yScale.bottom);
              ctx.stroke();

              // 3. Core solid bright line
              ctx.beginPath();
              ctx.strokeStyle = '#00A3E0';
              ctx.lineWidth = 3;
              ctx.moveTo(x, yScale.top);
              ctx.lineTo(x, yScale.bottom);
              ctx.stroke();
              ctx.restore();

              // 4. Label pill — positioned at tier row, pill style
              ctx.save();
              ctx.font = 'bold 10px Space Mono';
              const pillTxt = label;  // "Median (Base Case) $XX"
              const pillW   = ctx.measureText(pillTxt).width + 16;
              const pillH   = 19;
              const tierY   = yScale.top + 10 + tier * 14;
              // Center on line; flip left if near right edge
              let pillX = x - pillW / 2;
              if (pillX + pillW > xScale.right - 2) pillX = x - pillW - 4;
              if (pillX < xScale.left + 2)          pillX = x + 4;
              const pillY = tierY - 14;

              // Pill fill + border
              ctx.fillStyle = 'rgba(0, 163, 224, 0.18)';
              ctx.strokeStyle = '#00A3E0';
              ctx.lineWidth = 1.5;
              const pr = 4;
              ctx.beginPath();
              ctx.moveTo(pillX + pr, pillY);
              ctx.lineTo(pillX + pillW - pr, pillY);
              ctx.quadraticCurveTo(pillX + pillW, pillY, pillX + pillW, pillY + pr);
              ctx.lineTo(pillX + pillW, pillY + pillH - pr);
              ctx.quadraticCurveTo(pillX + pillW, pillY + pillH, pillX + pillW - pr, pillY + pillH);
              ctx.lineTo(pillX + pr, pillY + pillH);
              ctx.quadraticCurveTo(pillX, pillY + pillH, pillX, pillY + pillH - pr);
              ctx.lineTo(pillX, pillY + pr);
              ctx.quadraticCurveTo(pillX, pillY, pillX + pr, pillY);
              ctx.closePath();
              ctx.fill();
              ctx.setLineDash([]);
              ctx.stroke();

              // Pill text
              ctx.fillStyle = '#00A3E0';
              ctx.textAlign = 'center';
              ctx.fillText(pillTxt, pillX + pillW / 2, pillY + 13);
              ctx.restore();

            } else {
              // ── Standard dashed reference line + staggered label ──
              ctx.save();
              ctx.beginPath();
              ctx.setLineDash(dash);
              ctx.strokeStyle = color;
              ctx.lineWidth = thick;
              ctx.moveTo(x, yScale.top);
              ctx.lineTo(x, yScale.bottom);
              ctx.stroke();

              ctx.setLineDash([]);
              ctx.fillStyle = color;
              ctx.font = 'bold 9px Space Mono';
              ctx.textAlign = 'center';
              const labelY = yScale.top + 10 + tier * 14;
              ctx.fillText(label, x, labelY);
              ctx.restore();
            }
          });

          ctx.restore();
        }
      }]
    });

    return { mu, median, p5, p95, sd };
  }

  function updateStats(results, stats) {
    const { mu, median, p5, p95, sd } = stats;
    const probAbove  = results.filter(v => v > CURRENT_PRICE).length / results.length;
    const probTarget = results.filter(v => v > TARGET_PRICE).length / results.length;

    document.getElementById('mc-p5').textContent     = `$${p5.toFixed(2)}`;
    document.getElementById('mc-mean').textContent   = `$${mu.toFixed(2)}`;
    document.getElementById('mc-median').textContent = `$${median.toFixed(2)}`;
    document.getElementById('mc-p95').textContent    = `$${p95.toFixed(2)}`;
    document.getElementById('mc-prob-above').textContent  = `${(probAbove * 100).toFixed(1)}%`;
    document.getElementById('mc-prob-target').textContent = `${(probTarget * 100).toFixed(1)}%`;
    document.getElementById('mc-std').textContent    = `$${sd.toFixed(2)}`;
  }

  function getParams() {
    return {
      revMu:      parseFloat(document.getElementById('mc-rev-mu').value)     || 47,
      revSigma:   parseFloat(document.getElementById('mc-rev-sigma').value)  || 12,
      marginMu:   parseFloat(document.getElementById('mc-margin-mu').value)  || 35,
      marginSigma:parseFloat(document.getElementById('mc-margin-sigma').value)|| 8,
      waccMu:     parseFloat(document.getElementById('mc-wacc-mu').value)    || 15.6,
      waccSigma:  parseFloat(document.getElementById('mc-wacc-sigma').value) || 2.5,
      tgrMu:      parseFloat(document.getElementById('mc-tgr-mu').value)     || 3.5,
      tgrSigma:   parseFloat(document.getElementById('mc-tgr-sigma').value)  || 0.8,
    };
  }

  function runAndRender() {
    const btn = document.getElementById('mcRunBtn');
    btn.classList.add('running');
    btn.innerHTML = '<span class="mc-spinner" style="width:14px;height:14px;border-width:2px;display:inline-block"></span> Running…';

    document.getElementById('mcLoading').style.display = 'flex';
    document.getElementById('mcCanvasWrap').style.display = 'none';

    // Yield to browser for one frame so the spinner renders, then compute
    setTimeout(() => {
      const params  = getParams();
      const results = runSimulation(params);
      const stats   = renderHistogram(results, params);

      updateStats(results, stats);

      document.getElementById('mcLoading').style.display = 'none';
      document.getElementById('mcCanvasWrap').style.display = 'block';

      btn.classList.remove('running');
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Re-run Simulation';
    }, 30);
  }

  // Auto-run when the section scrolls into view (once)
  let hasRun = false;
  const mcSection = document.getElementById('monte-carlo');
  if (mcSection) {
    const mcObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !hasRun) {
        hasRun = true;
        runAndRender();
        mcObserver.disconnect();
      }
    }, { threshold: 0.15 });
    mcObserver.observe(mcSection);
  }

  // Re-run button
  document.getElementById('mcRunBtn').addEventListener('click', runAndRender);

})();
