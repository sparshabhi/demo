/**
 * tabs.js — renders each dashboard tab
 */

function renderTabContent() {
  if (!selectedStudentId) return;
  const s = getStudent(selectedStudentId);
  const c = document.getElementById('tabContent');
  if (currentTab === 'overview')  renderOverview(s, c);
  else if (currentTab === 'rt')   renderRT(s, c);
  else if (currentTab === 'gmt')  renderGMT(s, c);
  else if (currentTab === 'projects') renderProjects(s, c);
  else if (currentTab === 'support')  renderSupport(s, c);
}

/* ── OVERVIEW ── */
function renderOverview(s, c) {
  const pd = projectsDoneCount(s);
  const gm = gmtMasteredCount(s);
  const fc = Object.values(s.flags).filter(Boolean).length;
  const ra = rtAverage(s);

  c.innerHTML = `
  <div class="grid-4">
    <div class="stat-card"><div class="stat-label">RT Average</div><div class="stat-value">${ra}</div><div class="stat-sub">out of 4.0</div></div>
    <div class="stat-card"><div class="stat-label">Projects</div><div class="stat-value">${pd}<span style="font-size:16px;color:var(--text-faint)">/6</span></div><div class="stat-sub">completed</div></div>
    <div class="stat-card"><div class="stat-label">Letters mastered</div><div class="stat-value">${gm}</div><div class="stat-sub">across all types</div></div>
    <div class="stat-card"><div class="stat-label">Active flags</div><div class="stat-value" style="color:${fc>0?'var(--red)':'var(--text)'}">${fc}</div><div class="stat-sub">${fc>0?'needs attention':'all clear'}</div></div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-title">RT proficiency <span class="hint">see RT tab to edit</span></div>
      <div class="radar-wrap"><canvas id="overviewRadar"></canvas></div>
    </div>
    <div class="card">
      <div class="card-title">GMT progress</div>
      ${['giraffe','monkey','tortoise'].map(type => {
        const letters = GMT_DATA[type].letters;
        const mastered = letters.filter(l => s.gmt[type][l] === 'mastered').length;
        const pct = Math.round((mastered / letters.length) * 100);
        const colors = { giraffe:'var(--accent)', monkey:'var(--green)', tortoise:'var(--amber)' };
        return `<div style="margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:12px;color:var(--text-muted)">${GMT_DATA[type].emoji} ${type.charAt(0).toUpperCase()+type.slice(1)}</span>
            <span style="font-size:11px;color:var(--text-faint)">${mastered}/${letters.length}</span>
          </div>
          <div class="prog-wrap"><div class="prog-bar" style="width:${pct}%;background:${colors[type]}"></div></div>
        </div>`;
      }).join('')}
      <div style="margin-top:18px">
        <div class="ov-section-title">Projects checklist</div>
        ${PROJECTS.map(p => `
        <div style="display:flex;align-items:center;gap:8px;padding:4px 0">
          <div style="width:14px;height:14px;border-radius:3px;flex-shrink:0;${s.projects[p.id]?'background:var(--green)':'border:1.5px solid var(--border-md)'}"></div>
          <span style="font-size:12px;color:var(--text-${s.projects[p.id]?'faint':'muted'});${s.projects[p.id]?'text-decoration:line-through':''}">${p.name}</span>
          <span class="term-badge t${p.term}" style="margin-left:auto">T${p.term}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>`;

  drawRadar('overviewRadar', s);
}

function drawRadar(canvasId, s) {
  if (radarChartInstance) { try { radarChartInstance.destroy(); } catch(e){} radarChartInstance = null; }
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const dark = matchMedia('(prefers-color-scheme: dark)').matches;
  const tc = dark ? 'rgba(200,198,190,0.75)' : 'rgba(80,76,68,0.75)';
  const gc = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
  radarChartInstance = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: ['Predicting','Questioning','Clarifying','Summarizing'],
      datasets: [{ data: [s.rt.predict,s.rt.question,s.rt.clarify,s.rt.summarize],
        backgroundColor: 'rgba(43,92,230,0.12)', borderColor: '#2B5CE6', borderWidth: 2,
        pointBackgroundColor: '#2B5CE6', pointRadius: 4, pointHoverRadius: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: { r: { min:0, max:4, ticks:{ stepSize:1, font:{size:9}, color:tc, backdropColor:'transparent' },
        grid:{ color:gc }, pointLabels:{ font:{size:11}, color:tc }, angleLines:{ color:gc } } },
      plugins: { legend:{ display:false } }, animation:{ duration:400 }
    }
  });
}

/* ── RT ── */
function renderRT(s, c) {
  const colors = { predict:'#2B5CE6', question:'#2D7D46', clarify:'#9B6200', summarize:'#6B3FA0' };
  c.innerHTML = `
  <div class="grid-2">
    <div class="card">
      <div class="card-title">Proficiency radar</div>
      <div class="radar-wrap"><canvas id="rtRadar"></canvas></div>
    </div>
    <div class="card">
      <div class="card-title">Adjust ratings <span class="hint">1 = beginning · 4 = advanced</span></div>
      ${['predict','question','clarify','summarize'].map(k => `
      <div class="rt-row">
        <span class="rt-label">${RT_LABELS[k]}</span>
        <div class="rt-bar-wrap"><div class="rt-bar" style="width:${(s.rt[k]/4)*100}%;background:${colors[k]}"></div></div>
        <div class="rt-dots">
          ${[1,2,3,4].map(n => `<div class="rt-dot${s.rt[k]===n?' active':''}"
            style="${s.rt[k]===n?`background:${colors[k]};border-color:${colors[k]};color:#fff`:''}"
            onclick="setRT('${k}',${n})">${n}</div>`).join('')}
        </div>
      </div>`).join('')}
      <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
        <div class="ov-section-title">Rating rubric</div>
        ${[['1','Beginning','Rarely attempts strategy independently'],
           ['2','Developing','Attempts with teacher prompting'],
           ['3','Proficient','Applies independently most of the time'],
           ['4','Advanced','Consistent; can explain strategy to peers']].map(([n,t,d]) => `
        <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px">
          <div style="width:20px;height:20px;border-radius:5px;background:var(--accent-lt);color:var(--accent);font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0">${n}</div>
          <div><div style="font-size:12px;font-weight:500">${t}</div><div style="font-size:11px;color:var(--text-muted)">${d}</div></div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
  drawRadar('rtRadar', s);
}

function setRT(key, val) {
  const s = getStudent(selectedStudentId);
  s.rt[key] = val;
  saveStudents();
  renderTabContent();
}

/* ── GMT ── */
function renderGMT(s, c) {
  c.innerHTML = `
  <div class="card">
    <div class="card-title">GMT handwriting system <span class="hint">Click letters to cycle: untrained → learning → mastered</span></div>
    <div class="grid-3" style="gap:14px;margin-top:4px">
      ${Object.entries(GMT_DATA).map(([type, {emoji, label, letters}]) => `
      <div class="gmt-col">
        <div class="gmt-col-title">
          <span style="font-size:16px">${emoji}</span>
          <span>${type.charAt(0).toUpperCase()+type.slice(1)}</span>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:10px">${label}</div>
        <div class="letter-grid">
          ${letters.map(l => {
            const st = s.gmt[type][l] || 'none';
            return `<div class="lchip ${st === 'none' ? '' : st}" onclick="cycleLetter('${type}','${l}')" title="${l}: ${st}">${l}</div>`;
          }).join('')}
        </div>
        <div style="margin-top:10px;font-size:11px;color:var(--text-faint)">
          ${letters.filter(l => s.gmt[type][l]==='mastered').length}/${letters.length} mastered
        </div>
      </div>`).join('')}
    </div>
    <div class="gmt-legend">
      <span><span class="legend-chip" style="background:var(--surface2);border-color:var(--border-md)"></span> Not started</span>
      <span><span class="legend-chip" style="background:var(--amber-lt);border-color:#E6A82A"></span> In progress</span>
      <span><span class="legend-chip" style="background:var(--green-lt);border-color:#5BBF7A"></span> Mastered</span>
    </div>
  </div>`;
}

function cycleLetter(type, letter) {
  const s = getStudent(selectedStudentId);
  const states = ['none','learning','mastered'];
  const cur = s.gmt[type][letter] || 'none';
  const next = states[(states.indexOf(cur)+1) % states.length];
  if (next === 'none') delete s.gmt[type][letter];
  else s.gmt[type][letter] = next;
  saveStudents();
  renderTabContent();
}

/* ── PROJECTS ── */
function renderProjects(s, c) {
  const done = projectsDoneCount(s);
  c.innerHTML = `
  <div class="card">
    <div class="card-title">Project-based assessment log <span class="hint">${done}/6 complete</span></div>
    ${PROJECTS.map((p,i) => `
    <div class="proj-item">
      <div class="proj-header" onclick="toggleProjBody('pb${i}')">
        <div class="proj-check${s.projects[p.id]?' done':''}" onclick="event.stopPropagation();toggleProject('${p.id}')"></div>
        <div class="proj-info" style="flex:1">
          <div class="proj-name${s.projects[p.id]?' done-text':''}">${p.name}</div>
          <div class="proj-meta">RT: ${p.rt} · GMT: ${p.gmt}</div>
        </div>
        <span class="term-badge t${p.term}">Term ${p.term}</span>
        <span style="color:var(--text-faint);font-size:11px;margin-left:8px">▾</span>
      </div>
      <div class="proj-body" id="pb${i}">
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">${p.desc}</p>
        <span class="proj-tag">RT: ${p.rt}</span>
        <span class="proj-tag">GMT: ${p.gmt}</span>
        <span class="proj-tag">Term ${p.term}</span>
      </div>
    </div>`).join('')}
  </div>`;
}

function toggleProjBody(id) {
  document.getElementById(id).classList.toggle('open');
}

function toggleProject(projId) {
  const s = getStudent(selectedStudentId);
  s.projects[projId] = !s.projects[projId];
  saveStudents();
  renderTabContent();
}

/* ── SUPPORT ── */
function renderSupport(s, c) {
  const fc = Object.values(s.flags).filter(Boolean).length;
  c.innerHTML = `
  <div class="grid-2">
    <div class="card">
      <div class="card-title">Learning difference indicators <span class="hint">${fc} active</span></div>
      ${FLAGS.map(f => `
      <div class="flag-item${s.flags[f.id]?' flagged':''}" onclick="toggleFlag('${f.id}')">
        <span class="flag-icon">${f.icon}</span>
        <span class="flag-label">${f.label}</span>
        <div class="flag-toggle${s.flags[f.id]?' on':''}"></div>
      </div>`).join('')}
    </div>
    <div class="card">
      <div class="card-title">Intervention log <span class="hint">${s.interventions.length} entr${s.interventions.length===1?'y':'ies'}</span></div>
      <div id="intvList">
        ${s.interventions.length === 0
          ? '<div style="font-size:12px;color:var(--text-faint);padding:4px 0">No interventions recorded yet.</div>'
          : s.interventions.map((iv,i) => `
        <div class="intv-item">
          <span class="intv-date">${iv.date}</span>
          <span class="intv-text">${iv.text}</span>
          <span class="intv-del" onclick="deleteIntervention(${i})">✕</span>
        </div>`).join('')}
      </div>
      <div class="add-intv">
        <input id="intvInput" placeholder="Log an intervention or note…" onkeydown="if(event.key==='Enter')addIntervention()" />
        <button onclick="addIntervention()">Add note</button>
      </div>
    </div>
  </div>`;
}

function toggleFlag(flagId) {
  const s = getStudent(selectedStudentId);
  s.flags[flagId] = !s.flags[flagId];
  saveStudents();
  renderSidebar();
  renderTabContent();
}

function addIntervention() {
  const input = document.getElementById('intvInput');
  if (!input || !input.value.trim()) return;
  const s = getStudent(selectedStudentId);
  const today = new Date().toISOString().slice(0,10);
  s.interventions.unshift({ date: today, text: input.value.trim() });
  saveStudents();
  input.value = '';
  renderTabContent();
}

function deleteIntervention(idx) {
  const s = getStudent(selectedStudentId);
  s.interventions.splice(idx, 1);
  saveStudents();
  renderTabContent();
}
