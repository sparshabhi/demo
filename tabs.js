/**
 * tabs.js — renders each dashboard tab
 */

// ── CDC Nepal Curriculum Data ─────────────────────────────────────────────────

const CDC_CURRICULUM = {
  // Grades 1-3: Integrated/Transdisciplinary
  1: {
    level: 'Primary (Grade 1)',
    approach: 'Transdisciplinary — all subjects taught through common themes',
    themes: [
      { id:'t1', name:'Me and My Family', desc:'Personal identity and family roles.', subjects:['English','Nepali','Math','Our Surroundings'] },
      { id:'t2', name:'My Daily Life', desc:'Routine, habits, and time management.', subjects:['English','Nepali','Math'] },
      { id:'t3', name:'Our Community', desc:'Neighbourhood, local helpers, and social harmony.', subjects:['English','Nepali','Our Surroundings'] },
      { id:'t4', name:'Our School', desc:'Learning environment and school rules.', subjects:['English','Nepali'] },
      { id:'t5', name:'Our Environment', desc:'Weather, plants, and local geography.', subjects:['English','Our Surroundings'] },
      { id:'t6', name:'My Belongings', desc:'Personal items and taking care of things.', subjects:['English','Nepali'] },
      { id:'t7', name:'Our Culture', desc:'Festivals, traditions, and local customs.', subjects:['English','Nepali','Our Surroundings'] },
      { id:'t8', name:'Communication, Technology and Market', desc:'Basic tools and buying/selling.', subjects:['English','Math','Our Surroundings'] },
      { id:'t9', name:'Fruits and Vegetables', desc:'Nutrition and farming.', subjects:['English','Our Surroundings'] },
      { id:'t10', name:'Birds and Animals', desc:'Wildlife and domestic animals.', subjects:['English','Our Surroundings'] },
      { id:'t11', name:'Hobbies and Interests', desc:'Creative arts and physical activities.', subjects:['English','Nepali'] },
    ]
  },
  2: {
    level: 'Primary (Grade 2)',
    approach: 'Transdisciplinary — all subjects taught through common themes',
    themes: [
      { id:'t1', name:'Me and My Family', desc:'Personal identity and family roles.', subjects:['English','Nepali','Math','Our Surroundings'] },
      { id:'t2', name:'My Daily Life', desc:'Routine, habits, and time management.', subjects:['English','Nepali','Math'] },
      { id:'t3', name:'Our Community', desc:'Neighbourhood, local helpers, and social harmony.', subjects:['English','Nepali','Our Surroundings'] },
      { id:'t4', name:'Our School', desc:'Learning environment and school rules.', subjects:['English','Nepali'] },
      { id:'t5', name:'Our Environment', desc:'Weather, plants, and local geography.', subjects:['English','Our Surroundings'] },
      { id:'t6', name:'My Belongings', desc:'Personal items and taking care of things.', subjects:['English','Nepali'] },
      { id:'t7', name:'Our Culture', desc:'Festivals, traditions, and local customs.', subjects:['English','Nepali','Our Surroundings'] },
      { id:'t8', name:'Communication, Technology and Market', desc:'Basic tools and buying/selling.', subjects:['English','Math','Our Surroundings'] },
      { id:'t9', name:'Fruits and Vegetables', desc:'Nutrition and farming.', subjects:['English','Our Surroundings'] },
      { id:'t10', name:'Birds and Animals', desc:'Wildlife and domestic animals.', subjects:['English','Our Surroundings'] },
      { id:'t11', name:'Hobbies and Interests', desc:'Creative arts and physical activities.', subjects:['English','Nepali'] },
    ]
  },
  3: {
    level: 'Primary (Grade 3)',
    approach: 'Transdisciplinary — all subjects taught through common themes',
    themes: [
      { id:'t1', name:'Me and My Family', desc:'Personal identity and family roles.', subjects:['English','Nepali','Math','Our Surroundings'] },
      { id:'t2', name:'My Daily Life', desc:'Routine, habits, and time management.', subjects:['English','Nepali','Math'] },
      { id:'t3', name:'Our Community', desc:'Neighbourhood, local helpers, and social harmony.', subjects:['English','Nepali','Our Surroundings'] },
      { id:'t4', name:'Our School', desc:'Learning environment and school rules.', subjects:['English','Nepali'] },
      { id:'t5', name:'Our Environment', desc:'Weather, plants, and local geography.', subjects:['English','Our Surroundings'] },
      { id:'t6', name:'My Belongings', desc:'Personal items and taking care of things.', subjects:['English','Nepali'] },
      { id:'t7', name:'Our Culture', desc:'Festivals, traditions, and local customs.', subjects:['English','Nepali','Our Surroundings'] },
      { id:'t8', name:'Communication, Technology and Market', desc:'Basic tools and buying/selling.', subjects:['English','Math','Our Surroundings'] },
      { id:'t9', name:'Fruits and Vegetables', desc:'Nutrition and farming.', subjects:['English','Our Surroundings'] },
      { id:'t10', name:'Birds and Animals', desc:'Wildlife and domestic animals.', subjects:['English','Our Surroundings'] },
      { id:'t11', name:'Hobbies and Interests', desc:'Creative arts and physical activities.', subjects:['English','Nepali'] },
    ]
  },
  // Grades 4-5: Subject-Based/Multidisciplinary
  4: {
    level: 'Primary (Grade 4)',
    approach: 'Multidisciplinary — themes shared across subjects',
    themes: [
      { id:'ef1', name:'Family and Friends', desc:'Relationships and social interaction.', subjects:['English','Nepali'] },
      { id:'ef2', name:'Health and Hygiene', desc:'Personal wellness and cleanliness.', subjects:['English','Nepali','Science'] },
      { id:'ef3', name:'Our Identity', desc:'National symbols, biography, and self.', subjects:['English','Nepali','Social Studies'] },
      { id:'ef4', name:'Work and Leisure', desc:'Professional life and sports.', subjects:['English','Nepali'] },
      { id:'ef5', name:'Ethics and Values', desc:'Moral stories and social responsibility.', subjects:['English','Nepali'] },
      { id:'ss1', name:'Living Things', desc:'Classification of plants and animals.', subjects:['Science','Social Studies'] },
      { id:'ss2', name:'Energy and Matter', desc:'Basics of heat, light, and states of matter.', subjects:['Science'] },
      { id:'ss3', name:'Our Earth', desc:'Soil, rocks, and environmental conservation.', subjects:['Science','Social Studies'] },
      { id:'ss4', name:'Map Work', desc:'Understanding basic maps and direction.', subjects:['Social Studies'] },
      { id:'ss5', name:'History', desc:'Local history and significant national figures.', subjects:['Social Studies'] },
    ]
  },
  5: {
    level: 'Primary (Grade 5)',
    approach: 'Multidisciplinary — themes shared across subjects',
    themes: [
      { id:'ef1', name:'Family and Friends', desc:'Relationships and social interaction.', subjects:['English','Nepali'] },
      { id:'ef2', name:'Health and Hygiene', desc:'Personal wellness and cleanliness.', subjects:['English','Nepali','Science'] },
      { id:'ef3', name:'Our Identity', desc:'National symbols, biography, and self.', subjects:['English','Nepali','Social Studies'] },
      { id:'ef4', name:'Work and Leisure', desc:'Professional life and sports.', subjects:['English','Nepali'] },
      { id:'ef5', name:'Ethics and Values', desc:'Moral stories and social responsibility.', subjects:['English','Nepali'] },
      { id:'ss1', name:'Living Things', desc:'Classification of plants and animals.', subjects:['Science','Social Studies'] },
      { id:'ss2', name:'Energy and Matter', desc:'Basics of heat, light, and states of matter.', subjects:['Science'] },
      { id:'ss3', name:'Our Earth', desc:'Soil, rocks, and environmental conservation.', subjects:['Science','Social Studies'] },
      { id:'ss4', name:'Map Work', desc:'Understanding basic maps and direction.', subjects:['Social Studies'] },
      { id:'ss5', name:'History', desc:'Local history and significant national figures.', subjects:['Social Studies'] },
    ]
  },
  // Grades 6-8: Disciplinary/Subject-specific
  6: {
    level: 'Basic Level (Grade 6)',
    approach: 'Disciplinary — subject-specific themes bridging toward secondary',
    themes: [
      { id:'en1', name:'Personal Identity and Biography', desc:'Self-reflection and life stories.', subjects:['English'] },
      { id:'en2', name:'Travel and Tourism', desc:'Destinations, itineraries, and culture.', subjects:['English'] },
      { id:'en3', name:'Science and Technology', desc:'Innovations and modern gadgets.', subjects:['English','Science'] },
      { id:'en4', name:'Environment and Health', desc:'Climate change, diseases, and wellness.', subjects:['English','Science'] },
      { id:'en5', name:'Folktales and Literature', desc:'Myths, legends, and creative writing.', subjects:['English'] },
      { id:'en6', name:'Mass Media and Communication', desc:'News, advertisements, and digital citizenship.', subjects:['English'] },
      { id:'en7', name:'Democracy and Human Rights', desc:'Social justice and governance.', subjects:['English','Social Studies'] },
      { id:'sl1', name:'We, Our Community, and Nation', desc:'Social issues and solutions.', subjects:['Social Studies'] },
      { id:'sl2', name:'Our Traditions and Heritage', desc:'Ethnic diversity and national pride.', subjects:['Social Studies'] },
      { id:'sl3', name:'Civic Sense', desc:'Rights, duties, and the constitution.', subjects:['Social Studies'] },
      { id:'sl4', name:'International Relations', desc:'Nepal and its neighbors (SAARC/UN).', subjects:['Social Studies'] },
      { id:'sc1', name:'Biology — Cells and Human Body', desc:'Cell structure, digestive and respiratory systems.', subjects:['Science'] },
      { id:'sc2', name:'Physics — Measurement and Force', desc:'Measurement, force, pressure, and magnetism.', subjects:['Science'] },
      { id:'sc3', name:'Chemistry — Elements and Compounds', desc:'Elements, compounds, and chemical reactions.', subjects:['Science'] },
      { id:'sc4', name:'Astronomy', desc:'The Solar System and the universe.', subjects:['Science'] },
    ]
  },
  7: {
    level: 'Basic Level (Grade 7)',
    approach: 'Disciplinary — subject-specific themes bridging toward secondary',
    themes: [
      { id:'en1', name:'Personal Identity and Biography', desc:'Self-reflection and life stories.', subjects:['English'] },
      { id:'en2', name:'Travel and Tourism', desc:'Destinations, itineraries, and culture.', subjects:['English'] },
      { id:'en3', name:'Science and Technology', desc:'Innovations and modern gadgets.', subjects:['English','Science'] },
      { id:'en4', name:'Environment and Health', desc:'Climate change, diseases, and wellness.', subjects:['English','Science'] },
      { id:'en5', name:'Folktales and Literature', desc:'Myths, legends, and creative writing.', subjects:['English'] },
      { id:'en6', name:'Mass Media and Communication', desc:'News, advertisements, and digital citizenship.', subjects:['English'] },
      { id:'en7', name:'Democracy and Human Rights', desc:'Social justice and governance.', subjects:['English','Social Studies'] },
      { id:'sl1', name:'We, Our Community, and Nation', desc:'Social issues and solutions.', subjects:['Social Studies'] },
      { id:'sl2', name:'Our Traditions and Heritage', desc:'Ethnic diversity and national pride.', subjects:['Social Studies'] },
      { id:'sl3', name:'Civic Sense', desc:'Rights, duties, and the constitution.', subjects:['Social Studies'] },
      { id:'sl4', name:'International Relations', desc:'Nepal and its neighbors (SAARC/UN).', subjects:['Social Studies'] },
      { id:'sc1', name:'Biology — Cells and Human Body', desc:'Cell structure, digestive and respiratory systems.', subjects:['Science'] },
      { id:'sc2', name:'Physics — Measurement and Force', desc:'Measurement, force, pressure, and magnetism.', subjects:['Science'] },
      { id:'sc3', name:'Chemistry — Elements and Compounds', desc:'Elements, compounds, and chemical reactions.', subjects:['Science'] },
      { id:'sc4', name:'Astronomy', desc:'The Solar System and the universe.', subjects:['Science'] },
    ]
  },
  8: {
    level: 'Basic Level (Grade 8)',
    approach: 'Disciplinary — subject-specific themes bridging toward secondary',
    themes: [
      { id:'en1', name:'Personal Identity and Biography', desc:'Self-reflection and life stories.', subjects:['English'] },
      { id:'en2', name:'Travel and Tourism', desc:'Destinations, itineraries, and culture.', subjects:['English'] },
      { id:'en3', name:'Science and Technology', desc:'Innovations and modern gadgets.', subjects:['English','Science'] },
      { id:'en4', name:'Environment and Health', desc:'Climate change, diseases, and wellness.', subjects:['English','Science'] },
      { id:'en5', name:'Folktales and Literature', desc:'Myths, legends, and creative writing.', subjects:['English'] },
      { id:'en6', name:'Mass Media and Communication', desc:'News, advertisements, and digital citizenship.', subjects:['English'] },
      { id:'en7', name:'Democracy and Human Rights', desc:'Social justice and governance.', subjects:['English','Social Studies'] },
      { id:'sl1', name:'We, Our Community, and Nation', desc:'Social issues and solutions.', subjects:['Social Studies'] },
      { id:'sl2', name:'Our Traditions and Heritage', desc:'Ethnic diversity and national pride.', subjects:['Social Studies'] },
      { id:'sl3', name:'Civic Sense', desc:'Rights, duties, and the constitution.', subjects:['Social Studies'] },
      { id:'sl4', name:'International Relations', desc:'Nepal and its neighbors (SAARC/UN).', subjects:['Social Studies'] },
      { id:'sc1', name:'Biology — Cells and Human Body', desc:'Cell structure, digestive and respiratory systems.', subjects:['Science'] },
      { id:'sc2', name:'Physics — Measurement and Force', desc:'Measurement, force, pressure, and magnetism.', subjects:['Science'] },
      { id:'sc3', name:'Chemistry — Elements and Compounds', desc:'Elements, compounds, and chemical reactions.', subjects:['Science'] },
      { id:'sc4', name:'Astronomy', desc:'The Solar System and the universe.', subjects:['Science'] },
    ]
  }
};

const SUBJECT_COLORS = {
  'English':        ['#EBF0FE','#2B5CE6'],
  'Nepali':         ['#FEF3E0','#9B6200'],
  'Math':           ['#E6F5EB','#2D7D46'],
  'Our Surroundings':['#F3EDFC','#6B3FA0'],
  'Science':        ['#E0F4F4','#1A7A7A'],
  'Social Studies': ['#FFF0F5','#A0306A'],
};

// ── Tab Router ────────────────────────────────────────────────────────────────

function renderTabContent() {
  if (!selectedStudentId) return;
  const s = getStudent(selectedStudentId);
  const c = document.getElementById('tabContent');
  if (currentTab === 'overview')    renderOverview(s, c);
  else if (currentTab === 'rt')     renderRT(s, c);
  else if (currentTab === 'gmt')    renderGMT(s, c);
  else if (currentTab === 'projects') renderProjects(s, c);
  else if (currentTab === 'support')  renderSupport(s, c);
  else if (currentTab === 'cdc')    renderCDC(s, c);
}

/* ── OVERVIEW ── */
function renderOverview(s, c) {
  const pd = projectsDoneCount(s);
  const gm = gmtMasteredCount(s);
  const fc = Object.values(s.flags).filter(Boolean).length;
  const ra = rtAverage(s);
  const curr = CDC_CURRICULUM[s.grade];
  const totalThemes = curr ? curr.themes.length : 0;
  const coveredThemes = curr ? curr.themes.filter(t => s.cdcProgress && s.cdcProgress[t.id] === 'covered').length : 0;

  c.innerHTML = `
  <div class="grid-4">
    <div class="stat-card"><div class="stat-label">RT Average</div><div class="stat-value">${ra}</div><div class="stat-sub">out of 4.0</div></div>
    <div class="stat-card"><div class="stat-label">Projects</div><div class="stat-value">${pd}<span style="font-size:16px;color:var(--text-faint)">/6</span></div><div class="stat-sub">completed</div></div>
    <div class="stat-card"><div class="stat-label">Letters mastered</div><div class="stat-value">${gm}</div><div class="stat-sub">across all types</div></div>
    <div class="stat-card"><div class="stat-label">CDC Themes</div><div class="stat-value">${coveredThemes}<span style="font-size:16px;color:var(--text-faint)">/${totalThemes}</span></div><div class="stat-sub">covered</div></div>
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

/* ── CDC CURRICULUM ── */
function renderCDC(s, c) {
  const curr = CDC_CURRICULUM[s.grade];
  if (!curr) {
    c.innerHTML = `<div class="card"><p style="color:var(--text-muted)">No CDC curriculum data available for this grade.</p></div>`;
    return;
  }

  if (!s.cdcProgress) s.cdcProgress = {};
  const covered = curr.themes.filter(t => s.cdcProgress[t.id] === 'covered').length;
  const inProgress = curr.themes.filter(t => s.cdcProgress[t.id] === 'in-progress').length;
  const pct = Math.round((covered / curr.themes.length) * 100);

  // Group themes by subject for Grades 4-8
  const isIntegrated = s.grade <= 3;

  c.innerHTML = `
  <div class="card" style="margin-bottom:14px">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
      <div>
        <div class="card-title" style="margin-bottom:2px">CDC Nepal — ${curr.level}</div>
        <div style="font-size:12px;color:var(--text-muted)">${curr.approach}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:22px;font-weight:700;color:var(--accent)">${pct}%</div>
        <div style="font-size:11px;color:var(--text-faint)">${covered} covered · ${inProgress} in progress</div>
      </div>
    </div>
    <div class="prog-wrap" style="margin-top:12px">
      <div class="prog-bar" style="width:${pct}%;background:var(--accent)"></div>
    </div>
  </div>

  <div class="card">
    <div class="card-title" style="margin-bottom:12px">
      Theme Tracker
      <span class="hint">Click to cycle: not started → in progress → covered</span>
    </div>
    ${curr.themes.map((t, i) => {
      const status = s.cdcProgress[t.id] || 'none';
      const statusColors = {
        none: { bg:'var(--surface-2)', border:'var(--border)', text:'var(--text-faint)', label:'Not started' },
        'in-progress': { bg:'#FEF3E0', border:'#E6A82A', text:'#9B6200', label:'In progress' },
        covered: { bg:'#E6F5EB', border:'#5BBF7A', text:'#2D7D46', label:'Covered ✓' }
      };
      const sc = statusColors[status];
      return `
      <div class="cdc-theme-item" onclick="cycleCDCTheme('${t.id}')" style="cursor:pointer;padding:12px;border-radius:8px;border:1.5px solid ${sc.border};background:${sc.bg};margin-bottom:8px;transition:all 0.15s">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
          <div style="flex:1">
            <div style="font-size:13px;font-weight:500;margin-bottom:3px">${i+1}. ${t.name}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">${t.desc}</div>
            <div style="display:flex;flex-wrap:wrap;gap:4px">
              ${t.subjects.map(sub => {
                const sc2 = SUBJECT_COLORS[sub] || ['#f0f0f0','#555'];
                return `<span style="font-size:10px;padding:2px 7px;border-radius:20px;background:${sc2[0]};color:${sc2[1]};font-weight:500">${sub}</span>`;
              }).join('')}
            </div>
          </div>
          <div style="font-size:11px;font-weight:500;color:${sc.text};white-space:nowrap;padding:3px 8px;border-radius:20px;background:white;border:1px solid ${sc.border}">${sc.label}</div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function cycleCDCTheme(themeId) {
  const s = getStudent(selectedStudentId);
  if (!s.cdcProgress) s.cdcProgress = {};
  const states = ['none', 'in-progress', 'covered'];
  const cur = s.cdcProgress[themeId] || 'none';
  const next = states[(states.indexOf(cur) + 1) % states.length];
  if (next === 'none') delete s.cdcProgress[themeId];
  else s.cdcProgress[themeId] = next;
  saveStudents();
  renderTabContent();
}
