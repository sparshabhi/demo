/**
 * tabs.js — renders each dashboard tab
 */

// ── Grade-Specific Learning Outcomes ─────────────────────────────────────────
const LEARNING_OUTCOMES = {
  1: [
    { id:'lo1', label:'Does homework regularly' },
    { id:'lo2', label:'Submits original work' },
    { id:'lo3', label:'Can read aloud with basic fluency' },
    { id:'lo4', label:'Recognises and writes all alphabet letters' },
    { id:'lo5', label:'Can write simple sentences' },
    { id:'lo6', label:'Understands basic instructions in English' },
    { id:'lo7', label:'Participates in class discussions' },
    { id:'lo8', label:'Can retell a short story' },
  ],
  2: [
    { id:'lo1', label:'Does homework regularly' },
    { id:'lo2', label:'Submits original work' },
    { id:'lo3', label:'Can read aloud with basic fluency' },
    { id:'lo4', label:'Recognises and writes all alphabet letters' },
    { id:'lo5', label:'Can write simple sentences' },
    { id:'lo6', label:'Understands basic instructions in English' },
    { id:'lo7', label:'Participates in class discussions' },
    { id:'lo8', label:'Can retell a short story' },
  ],
  3: [
    { id:'lo1', label:'Does homework regularly' },
    { id:'lo2', label:'Submits original work' },
    { id:'lo3', label:'Can read aloud with basic fluency' },
    { id:'lo4', label:'Recognises and writes all alphabet letters' },
    { id:'lo5', label:'Can write simple sentences' },
    { id:'lo6', label:'Understands basic instructions in English' },
    { id:'lo7', label:'Participates in class discussions' },
    { id:'lo8', label:'Can retell a short story' },
  ],
  4: [
    { id:'lo1', label:'Does homework regularly' },
    { id:'lo2', label:'Submits original work' },
    { id:'lo3', label:'Reads aloud with expression' },
    { id:'lo4', label:'Can write a short paragraph independently' },
    { id:'lo5', label:'Uses punctuation correctly (. ? !)' },
    { id:'lo6', label:'Understands and follows multi-step instructions' },
    { id:'lo7', label:'Can summarise a passage in own words' },
    { id:'lo8', label:'Uses new vocabulary in sentences' },
  ],
  5: [
    { id:'lo1', label:'Does homework regularly' },
    { id:'lo2', label:'Submits original work' },
    { id:'lo3', label:'Reads aloud with expression' },
    { id:'lo4', label:'Can write a short paragraph independently' },
    { id:'lo5', label:'Uses punctuation correctly (. ? !)' },
    { id:'lo6', label:'Understands and follows multi-step instructions' },
    { id:'lo7', label:'Can summarise a passage in own words' },
    { id:'lo8', label:'Uses new vocabulary in sentences' },
  ],
  6: [
    { id:'lo1', label:'Does homework regularly' },
    { id:'lo2', label:'Submits original work' },
    { id:'lo3', label:'Reads with fluency and comprehension' },
    { id:'lo4', label:'Can write structured essays (intro, body, conclusion)' },
    { id:'lo5', label:'Uses grammar correctly (tenses, articles, prepositions)' },
    { id:'lo6', label:'Can identify main idea and supporting details' },
    { id:'lo7', label:'Participates confidently in group discussions' },
    { id:'lo8', label:'Can write formal letters or reports' },
  ],
  7: [
    { id:'lo1', label:'Does homework regularly' },
    { id:'lo2', label:'Submits original work' },
    { id:'lo3', label:'Reads and analyses texts critically' },
    { id:'lo4', label:'Can write argumentative and creative pieces' },
    { id:'lo5', label:'Uses complex sentence structures' },
    { id:'lo6', label:'Can present ideas clearly and confidently' },
    { id:'lo7', label:'Demonstrates research and note-taking skills' },
    { id:'lo8', label:'Can identify literary devices (metaphor, simile, etc.)' },
  ],
  8: [
    { id:'lo1', label:'Does homework regularly' },
    { id:'lo2', label:'Submits original work' },
    { id:'lo3', label:'Reads and analyses texts critically' },
    { id:'lo4', label:'Can write argumentative and creative pieces' },
    { id:'lo5', label:'Uses complex sentence structures' },
    { id:'lo6', label:'Can present ideas clearly and confidently' },
    { id:'lo7', label:'Demonstrates research and note-taking skills' },
    { id:'lo8', label:'Can identify literary devices (metaphor, simile, etc.)' },
  ],
};

// ── CDC Nepal Curriculum Data ─────────────────────────────────────────────────
const CDC_CURRICULUM = {
  1: { level:'Primary (Grade 1)', approach:'Transdisciplinary — all subjects taught through common themes', themes:[
    { id:'t1',  name:'Me and My Family',                     desc:'Personal identity and family roles.',               subjects:['English','Nepali','Math','Our Surroundings'] },
    { id:'t2',  name:'My Daily Life',                        desc:'Routine, habits, and time management.',             subjects:['English','Nepali','Math'] },
    { id:'t3',  name:'Our Community',                        desc:'Neighbourhood, local helpers, and social harmony.', subjects:['English','Nepali','Our Surroundings'] },
    { id:'t4',  name:'Our School',                           desc:'Learning environment and school rules.',            subjects:['English','Nepali'] },
    { id:'t5',  name:'Our Environment',                      desc:'Weather, plants, and local geography.',             subjects:['English','Our Surroundings'] },
    { id:'t6',  name:'My Belongings',                        desc:'Personal items and taking care of things.',         subjects:['English','Nepali'] },
    { id:'t7',  name:'Our Culture',                          desc:'Festivals, traditions, and local customs.',         subjects:['English','Nepali','Our Surroundings'] },
    { id:'t8',  name:'Communication, Technology and Market', desc:'Basic tools and buying/selling.',                   subjects:['English','Math','Our Surroundings'] },
    { id:'t9',  name:'Fruits and Vegetables',                desc:'Nutrition and farming.',                            subjects:['English','Our Surroundings'] },
    { id:'t10', name:'Birds and Animals',                    desc:'Wildlife and domestic animals.',                    subjects:['English','Our Surroundings'] },
    { id:'t11', name:'Hobbies and Interests',                desc:'Creative arts and physical activities.',            subjects:['English','Nepali'] },
  ]},
  2: { level:'Primary (Grade 2)', approach:'Transdisciplinary — all subjects taught through common themes', themes:[
    { id:'t1',  name:'Me and My Family',                     desc:'Personal identity and family roles.',               subjects:['English','Nepali','Math','Our Surroundings'] },
    { id:'t2',  name:'My Daily Life',                        desc:'Routine, habits, and time management.',             subjects:['English','Nepali','Math'] },
    { id:'t3',  name:'Our Community',                        desc:'Neighbourhood, local helpers, and social harmony.', subjects:['English','Nepali','Our Surroundings'] },
    { id:'t4',  name:'Our School',                           desc:'Learning environment and school rules.',            subjects:['English','Nepali'] },
    { id:'t5',  name:'Our Environment',                      desc:'Weather, plants, and local geography.',             subjects:['English','Our Surroundings'] },
    { id:'t6',  name:'My Belongings',                        desc:'Personal items and taking care of things.',         subjects:['English','Nepali'] },
    { id:'t7',  name:'Our Culture',                          desc:'Festivals, traditions, and local customs.',         subjects:['English','Nepali','Our Surroundings'] },
    { id:'t8',  name:'Communication, Technology and Market', desc:'Basic tools and buying/selling.',                   subjects:['English','Math','Our Surroundings'] },
    { id:'t9',  name:'Fruits and Vegetables',                desc:'Nutrition and farming.',                            subjects:['English','Our Surroundings'] },
    { id:'t10', name:'Birds and Animals',                    desc:'Wildlife and domestic animals.',                    subjects:['English','Our Surroundings'] },
    { id:'t11', name:'Hobbies and Interests',                desc:'Creative arts and physical activities.',            subjects:['English','Nepali'] },
  ]},
  3: { level:'Primary (Grade 3)', approach:'Transdisciplinary — all subjects taught through common themes', themes:[
    { id:'t1',  name:'Me and My Family',                     desc:'Personal identity and family roles.',               subjects:['English','Nepali','Math','Our Surroundings'] },
    { id:'t2',  name:'My Daily Life',                        desc:'Routine, habits, and time management.',             subjects:['English','Nepali','Math'] },
    { id:'t3',  name:'Our Community',                        desc:'Neighbourhood, local helpers, and social harmony.', subjects:['English','Nepali','Our Surroundings'] },
    { id:'t4',  name:'Our School',                           desc:'Learning environment and school rules.',            subjects:['English','Nepali'] },
    { id:'t5',  name:'Our Environment',                      desc:'Weather, plants, and local geography.',             subjects:['English','Our Surroundings'] },
    { id:'t6',  name:'My Belongings',                        desc:'Personal items and taking care of things.',         subjects:['English','Nepali'] },
    { id:'t7',  name:'Our Culture',                          desc:'Festivals, traditions, and local customs.',         subjects:['English','Nepali','Our Surroundings'] },
    { id:'t8',  name:'Communication, Technology and Market', desc:'Basic tools and buying/selling.',                   subjects:['English','Math','Our Surroundings'] },
    { id:'t9',  name:'Fruits and Vegetables',                desc:'Nutrition and farming.',                            subjects:['English','Our Surroundings'] },
    { id:'t10', name:'Birds and Animals',                    desc:'Wildlife and domestic animals.',                    subjects:['English','Our Surroundings'] },
    { id:'t11', name:'Hobbies and Interests',                desc:'Creative arts and physical activities.',            subjects:['English','Nepali'] },
  ]},
  4: { level:'Primary (Grade 4)', approach:'Multidisciplinary — themes shared across subjects', themes:[
    { id:'ef1', name:'Family and Friends',  desc:'Relationships and social interaction.',           subjects:['English','Nepali'] },
    { id:'ef2', name:'Health and Hygiene',  desc:'Personal wellness and cleanliness.',              subjects:['English','Nepali','Science'] },
    { id:'ef3', name:'Our Identity',        desc:'National symbols, biography, and self.',          subjects:['English','Nepali','Social Studies'] },
    { id:'ef4', name:'Work and Leisure',    desc:'Professional life and sports.',                   subjects:['English','Nepali'] },
    { id:'ef5', name:'Ethics and Values',   desc:'Moral stories and social responsibility.',        subjects:['English','Nepali'] },
    { id:'ss1', name:'Living Things',       desc:'Classification of plants and animals.',           subjects:['Science','Social Studies'] },
    { id:'ss2', name:'Energy and Matter',   desc:'Basics of heat, light, and states of matter.',   subjects:['Science'] },
    { id:'ss3', name:'Our Earth',           desc:'Soil, rocks, and environmental conservation.',    subjects:['Science','Social Studies'] },
    { id:'ss4', name:'Map Work',            desc:'Understanding basic maps and direction.',         subjects:['Social Studies'] },
    { id:'ss5', name:'History',             desc:'Local history and significant national figures.', subjects:['Social Studies'] },
  ]},
  5: { level:'Primary (Grade 5)', approach:'Multidisciplinary — themes shared across subjects', themes:[
    { id:'ef1', name:'Family and Friends',  desc:'Relationships and social interaction.',           subjects:['English','Nepali'] },
    { id:'ef2', name:'Health and Hygiene',  desc:'Personal wellness and cleanliness.',              subjects:['English','Nepali','Science'] },
    { id:'ef3', name:'Our Identity',        desc:'National symbols, biography, and self.',          subjects:['English','Nepali','Social Studies'] },
    { id:'ef4', name:'Work and Leisure',    desc:'Professional life and sports.',                   subjects:['English','Nepali'] },
    { id:'ef5', name:'Ethics and Values',   desc:'Moral stories and social responsibility.',        subjects:['English','Nepali'] },
    { id:'ss1', name:'Living Things',       desc:'Classification of plants and animals.',           subjects:['Science','Social Studies'] },
    { id:'ss2', name:'Energy and Matter',   desc:'Basics of heat, light, and states of matter.',   subjects:['Science'] },
    { id:'ss3', name:'Our Earth',           desc:'Soil, rocks, and environmental conservation.',    subjects:['Science','Social Studies'] },
    { id:'ss4', name:'Map Work',            desc:'Understanding basic maps and direction.',         subjects:['Social Studies'] },
    { id:'ss5', name:'History',             desc:'Local history and significant national figures.', subjects:['Social Studies'] },
  ]},
  6: { level:'Basic Level (Grade 6)', approach:'Disciplinary — subject-specific themes', themes:[
    { id:'en1', name:'Personal Identity and Biography',    desc:'Self-reflection and life stories.',                  subjects:['English'] },
    { id:'en2', name:'Travel and Tourism',                 desc:'Destinations, itineraries, and culture.',            subjects:['English'] },
    { id:'en3', name:'Science and Technology',             desc:'Innovations and modern gadgets.',                    subjects:['English','Science'] },
    { id:'en4', name:'Environment and Health',             desc:'Climate change, diseases, and wellness.',            subjects:['English','Science'] },
    { id:'en5', name:'Folktales and Literature',           desc:'Myths, legends, and creative writing.',              subjects:['English'] },
    { id:'en6', name:'Mass Media and Communication',       desc:'News, advertisements, and digital citizenship.',     subjects:['English'] },
    { id:'en7', name:'Democracy and Human Rights',         desc:'Social justice and governance.',                     subjects:['English','Social Studies'] },
    { id:'sl1', name:'We, Our Community, and Nation',      desc:'Social issues and solutions.',                       subjects:['Social Studies'] },
    { id:'sl2', name:'Our Traditions and Heritage',        desc:'Ethnic diversity and national pride.',               subjects:['Social Studies'] },
    { id:'sl3', name:'Civic Sense',                        desc:'Rights, duties, and the constitution.',              subjects:['Social Studies'] },
    { id:'sl4', name:'International Relations',            desc:'Nepal and its neighbors (SAARC/UN).',                subjects:['Social Studies'] },
    { id:'sc1', name:'Biology — Cells and Human Body',     desc:'Cell structure, digestive and respiratory systems.', subjects:['Science'] },
    { id:'sc2', name:'Physics — Measurement and Force',    desc:'Measurement, force, pressure, and magnetism.',       subjects:['Science'] },
    { id:'sc3', name:'Chemistry — Elements and Compounds', desc:'Elements, compounds, and chemical reactions.',       subjects:['Science'] },
    { id:'sc4', name:'Astronomy',                          desc:'The Solar System and the universe.',                 subjects:['Science'] },
  ]},
  7: { level:'Basic Level (Grade 7)', approach:'Disciplinary — subject-specific themes', themes:[
    { id:'en1', name:'Personal Identity and Biography',    desc:'Self-reflection and life stories.',                  subjects:['English'] },
    { id:'en2', name:'Travel and Tourism',                 desc:'Destinations, itineraries, and culture.',            subjects:['English'] },
    { id:'en3', name:'Science and Technology',             desc:'Innovations and modern gadgets.',                    subjects:['English','Science'] },
    { id:'en4', name:'Environment and Health',             desc:'Climate change, diseases, and wellness.',            subjects:['English','Science'] },
    { id:'en5', name:'Folktales and Literature',           desc:'Myths, legends, and creative writing.',              subjects:['English'] },
    { id:'en6', name:'Mass Media and Communication',       desc:'News, advertisements, and digital citizenship.',     subjects:['English'] },
    { id:'en7', name:'Democracy and Human Rights',         desc:'Social justice and governance.',                     subjects:['English','Social Studies'] },
    { id:'sl1', name:'We, Our Community, and Nation',      desc:'Social issues and solutions.',                       subjects:['Social Studies'] },
    { id:'sl2', name:'Our Traditions and Heritage',        desc:'Ethnic diversity and national pride.',               subjects:['Social Studies'] },
    { id:'sl3', name:'Civic Sense',                        desc:'Rights, duties, and the constitution.',              subjects:['Social Studies'] },
    { id:'sl4', name:'International Relations',            desc:'Nepal and its neighbors (SAARC/UN).',                subjects:['Social Studies'] },
    { id:'sc1', name:'Biology — Cells and Human Body',     desc:'Cell structure, digestive and respiratory systems.', subjects:['Science'] },
    { id:'sc2', name:'Physics — Measurement and Force',    desc:'Measurement, force, pressure, and magnetism.',       subjects:['Science'] },
    { id:'sc3', name:'Chemistry — Elements and Compounds', desc:'Elements, compounds, and chemical reactions.',       subjects:['Science'] },
    { id:'sc4', name:'Astronomy',                          desc:'The Solar System and the universe.',                 subjects:['Science'] },
  ]},
  8: { level:'Basic Level (Grade 8)', approach:'Disciplinary — subject-specific themes', themes:[
    { id:'en1', name:'Personal Identity and Biography',    desc:'Self-reflection and life stories.',                  subjects:['English'] },
    { id:'en2', name:'Travel and Tourism',                 desc:'Destinations, itineraries, and culture.',            subjects:['English'] },
    { id:'en3', name:'Science and Technology',             desc:'Innovations and modern gadgets.',                    subjects:['English','Science'] },
    { id:'en4', name:'Environment and Health',             desc:'Climate change, diseases, and wellness.',            subjects:['English','Science'] },
    { id:'en5', name:'Folktales and Literature',           desc:'Myths, legends, and creative writing.',              subjects:['English'] },
    { id:'en6', name:'Mass Media and Communication',       desc:'News, advertisements, and digital citizenship.',     subjects:['English'] },
    { id:'en7', name:'Democracy and Human Rights',         desc:'Social justice and governance.',                     subjects:['English','Social Studies'] },
    { id:'sl1', name:'We, Our Community, and Nation',      desc:'Social issues and solutions.',                       subjects:['Social Studies'] },
    { id:'sl2', name:'Our Traditions and Heritage',        desc:'Ethnic diversity and national pride.',               subjects:['Social Studies'] },
    { id:'sl3', name:'Civic Sense',                        desc:'Rights, duties, and the constitution.',              subjects:['Social Studies'] },
    { id:'sl4', name:'International Relations',            desc:'Nepal and its neighbors (SAARC/UN).',                subjects:['Social Studies'] },
    { id:'sc1', name:'Biology — Cells and Human Body',     desc:'Cell structure, digestive and respiratory systems.', subjects:['Science'] },
    { id:'sc2', name:'Physics — Measurement and Force',    desc:'Measurement, force, pressure, and magnetism.',       subjects:['Science'] },
    { id:'sc3', name:'Chemistry — Elements and Compounds', desc:'Elements, compounds, and chemical reactions.',       subjects:['Science'] },
    { id:'sc4', name:'Astronomy',                          desc:'The Solar System and the universe.',                 subjects:['Science'] },
  ]},
};

const SUBJECT_COLORS = {
  'English':          ['#EBF0FE','#2B5CE6'],
  'Nepali':           ['#FEF3E0','#9B6200'],
  'Math':             ['#E6F5EB','#2D7D46'],
  'Our Surroundings': ['#F3EDFC','#6B3FA0'],
  'Science':          ['#E0F4F4','#1A7A7A'],
  'Social Studies':   ['#FFF0F5','#A0306A'],
};

const LSRW_COLORS = {
  High:    { bg:'#E6F5EB', border:'#5BBF7A', text:'#2D7D46', dot:'#2D7D46' },
  Average: { bg:'#FEF3E0', border:'#E6A82A', text:'#9B6200', dot:'#9B6200' },
  Low:     { bg:'#FDECEA', border:'#E57373', text:'#C0392B', dot:'#C0392B' },
};

// ── Tab Router ────────────────────────────────────────────────────────────────
function renderTabContent() {
  if (!selectedStudentId) return;
  const s = getStudent(selectedStudentId);
  const c = document.getElementById('tabContent');
  if (currentTab === 'overview')      renderOverview(s, c);
  else if (currentTab === 'rt')       renderRT(s, c);
  else if (currentTab === 'lsrw')     renderLSRW(s, c);
  else if (currentTab === 'outcomes') renderOutcomes(s, c);
  else if (currentTab === 'projects') renderProjects(s, c);
  else if (currentTab === 'support')  renderSupport(s, c);
  else if (currentTab === 'cdc')      renderCDC(s, c);
}

/* ── OVERVIEW ── */
function renderOverview(s, c) {
  const pd = projectsDoneCount(s);
  const ra = rtAverage(s);
  const outcomes = LEARNING_OUTCOMES[s.grade] || [];
  const achievedCount = outcomes.filter(o => s.outcomes && s.outcomes[o.id]).length;
  const curr = CDC_CURRICULUM[s.grade];
  const totalThemes = curr ? curr.themes.length : 0;
  const coveredThemes = curr ? curr.themes.filter(t => s.cdcProgress && s.cdcProgress[t.id] === 'covered').length : 0;
  if (!s.lsrw) s.lsrw = { listening:'Average', speaking:'Average', reading:'Average', writing:'Average' };

  c.innerHTML = `
  <div class="grid-4">
    <div class="stat-card"><div class="stat-label">RT Average</div><div class="stat-value">${ra}</div><div class="stat-sub">out of 4.0</div></div>
    <div class="stat-card"><div class="stat-label">Projects</div><div class="stat-value">${pd}<span style="font-size:16px;color:var(--text-faint)">/6</span></div><div class="stat-sub">completed</div></div>
    <div class="stat-card"><div class="stat-label">Outcomes</div><div class="stat-value">${achievedCount}<span style="font-size:16px;color:var(--text-faint)">/${outcomes.length}</span></div><div class="stat-sub">achieved</div></div>
    <div class="stat-card"><div class="stat-label">CDC Themes</div><div class="stat-value">${coveredThemes}<span style="font-size:16px;color:var(--text-faint)">/${totalThemes}</span></div><div class="stat-sub">covered</div></div>
  </div>

  <div class="grid-2" style="margin-bottom:16px">
    <div class="card">
      <div class="card-title">RT proficiency <span class="hint">see RT tab to edit</span></div>
      <div class="radar-wrap"><canvas id="overviewRadar"></canvas></div>
    </div>
    <div class="card">
      <div class="card-title">LSRW English Skills <span class="hint">see LSRW tab to edit</span></div>
      ${LSRW_DOMAINS.map(d => {
        const level = (s.lsrw && s.lsrw[d]) || 'Average';
        const col = LSRW_COLORS[level];
        return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:16px">${LSRW_ICONS[d]}</span>
          <span style="font-size:13px;font-weight:500;flex:1">${LSRW_LABELS[d]}</span>
          <span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;background:${col.bg};color:${col.text};border:1px solid ${col.border}">${level}</span>
        </div>`;
      }).join('')}
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-title">Learning outcomes <span class="hint">Grade ${s.grade}</span></div>
      ${outcomes.map(o => {
        const achieved = s.outcomes && s.outcomes[o.id];
        return `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)">
          <div style="width:16px;height:16px;border-radius:4px;flex-shrink:0;${achieved?'background:var(--green)':'border:1.5px solid var(--border-md)'}"></div>
          <span style="font-size:12px;color:var(--text-${achieved?'faint':'muted'});${achieved?'text-decoration:line-through':''}">${o.label}</span>
        </div>`;
      }).join('')}
    </div>
    <div class="card">
      <div class="card-title">Active flags</div>
      ${Object.values(s.flags).some(Boolean)
        ? FLAGS.filter(f => s.flags[f.id]).map(f => `
          <div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border)">
            <span>${f.icon}</span>
            <span style="font-size:12px;color:var(--red)">${f.label}</span>
          </div>`).join('')
        : '<div style="font-size:12px;color:var(--text-faint);padding:4px 0">No active flags — all clear ✓</div>'
      }
      <div class="card-title" style="margin-top:16px">Projects</div>
      ${PROJECTS.map(p => `
      <div style="display:flex;align-items:center;gap:8px;padding:4px 0">
        <div style="width:14px;height:14px;border-radius:3px;flex-shrink:0;${s.projects[p.id]?'background:var(--green)':'border:1.5px solid var(--border-md)'}"></div>
        <span style="font-size:12px;color:var(--text-${s.projects[p.id]?'faint':'muted'});${s.projects[p.id]?'text-decoration:line-through':''}">${p.name}</span>
        <span class="term-badge t${p.term}" style="margin-left:auto">T${p.term}</span>
      </div>`).join('')}
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
        <div class="ov-section-title">Prescriptive Feedback</div>
        ${['predict','question','clarify','summarize'].map(k => {
          const feedback = RT_FEEDBACK[k][s.rt[k]];
          return `<div style="margin-bottom:12px;padding:10px 12px;border-radius:8px;background:var(--accent-lt);border-left:3px solid var(--accent)">
            <div style="font-size:11px;font-weight:600;color:var(--accent);margin-bottom:3px">${RT_LABELS[k]}</div>
            <div style="font-size:12px;color:var(--text-muted);line-height:1.5">${feedback}</div>
          </div>`;
        }).join('')}
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

/* ── LSRW ── */
function renderLSRW(s, c) {
  if (!s.lsrw) s.lsrw = { listening:'Average', speaking:'Average', reading:'Average', writing:'Average' };

  c.innerHTML = `
  <div class="card" style="margin-bottom:16px">
    <div class="card-title">English Language Skills — LSRW Assessment</div>
    <div style="font-size:12px;color:var(--text-muted);margin-bottom:16px">
      Set each domain to <strong style="color:#2D7D46">High</strong>, <strong style="color:#9B6200">Average</strong>, or <strong style="color:#C0392B">Low</strong>. Prescriptive feedback is generated automatically.
    </div>
    <div class="grid-2">
      ${LSRW_DOMAINS.map(d => {
        const level = s.lsrw[d] || 'Average';
        const col = LSRW_COLORS[level];
        return `
        <div style="border:1.5px solid ${col.border};border-radius:10px;padding:16px;background:${col.bg}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
            <span style="font-size:22px">${LSRW_ICONS[d]}</span>
            <span style="font-size:14px;font-weight:600;color:${col.text}">${LSRW_LABELS[d]}</span>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:14px">
            ${['High','Average','Low'].map(lvl => {
              const c2 = LSRW_COLORS[lvl];
              const active = level === lvl;
              return `<button onclick="setLSRW('${d}','${lvl}')"
                style="flex:1;padding:6px 0;border-radius:6px;font-size:12px;font-weight:${active?'700':'400'};cursor:pointer;transition:all 0.15s;
                border:1.5px solid ${active?c2.border:'var(--border-md)'};
                background:${active?c2.border:'var(--surface)'};
                color:${active?'#fff':c2.text}">${lvl}</button>`;
            }).join('')}
          </div>
          <div style="font-size:11px;color:${col.text};line-height:1.55;background:rgba(255,255,255,0.6);padding:8px 10px;border-radius:6px">
            ${LSRW_FEEDBACK[d][level]}
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function setLSRW(domain, level) {
  const s = getStudent(selectedStudentId);
  if (!s.lsrw) s.lsrw = {};
  s.lsrw[domain] = level;
  saveStudents();
  renderTabContent();
}

/* ── LEARNING OUTCOMES ── */
function renderOutcomes(s, c) {
  const outcomes = LEARNING_OUTCOMES[s.grade] || [];
  if (!s.outcomes) s.outcomes = {};
  const achieved = outcomes.filter(o => s.outcomes[o.id]).length;
  const pct = Math.round((achieved / outcomes.length) * 100);

  c.innerHTML = `
  <div class="card">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">
      <div>
        <div class="card-title" style="margin-bottom:2px">Grade ${s.grade} Learning Outcomes</div>
        <div style="font-size:12px;color:var(--text-muted)">${achieved} of ${outcomes.length} achieved</div>
      </div>
      <div style="font-size:28px;font-weight:700;color:var(--accent)">${pct}%</div>
    </div>
    <div class="prog-wrap" style="margin-bottom:20px">
      <div class="prog-bar" style="width:${pct}%;background:var(--accent)"></div>
    </div>
    ${outcomes.map(o => {
      const done = s.outcomes && s.outcomes[o.id];
      return `
      <div onclick="toggleOutcome('${o.id}')" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:8px;border:1.5px solid ${done?'#5BBF7A':'var(--border)'};background:${done?'#E6F5EB':'var(--surface)'};margin-bottom:8px;cursor:pointer;transition:all 0.15s">
        <div style="width:20px;height:20px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;${done?'background:#5BBF7A':'border:2px solid var(--border-md)'}">
          ${done?'<span style="color:white;font-size:12px">✓</span>':''}
        </div>
        <span style="font-size:13px;color:var(--text-${done?'faint':''});${done?'text-decoration:line-through':''}">${o.label}</span>
      </div>`;
    }).join('')}
  </div>`;
}

function toggleOutcome(outcomeId) {
  const s = getStudent(selectedStudentId);
  if (!s.outcomes) s.outcomes = {};
  s.outcomes[outcomeId] = !s.outcomes[outcomeId];
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
          <div class="proj-meta">RT: ${p.rt}</div>
        </div>
        <span class="term-badge t${p.term}">Term ${p.term}</span>
        <span style="color:var(--text-faint);font-size:11px;margin-left:8px">▾</span>
      </div>
      <div class="proj-body" id="pb${i}">
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">${p.desc}</p>
        <span class="proj-tag">RT: ${p.rt}</span>
        <span class="proj-tag">Term ${p.term}</span>
      </div>
    </div>`).join('')}
  </div>`;
}

function toggleProjBody(id) { document.getElementById(id).classList.toggle('open'); }

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
    c.innerHTML = `<div class="card"><p style="color:var(--text-muted)">No CDC data available for this grade.</p></div>`;
    return;
  }
  if (!s.cdcProgress) s.cdcProgress = {};
  const covered = curr.themes.filter(t => s.cdcProgress[t.id] === 'covered').length;
  const inProgress = curr.themes.filter(t => s.cdcProgress[t.id] === 'in-progress').length;
  const pct = Math.round((covered / curr.themes.length) * 100);

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
    <div class="card-title" style="margin-bottom:12px">Theme Tracker <span class="hint">Click to cycle: not started → in progress → covered</span></div>
    ${curr.themes.map((t,i) => {
      const status = s.cdcProgress[t.id] || 'none';
      const sc = { none:{bg:'var(--surface-2)',border:'var(--border)',text:'var(--text-faint)',label:'Not started'}, 'in-progress':{bg:'#FEF3E0',border:'#E6A82A',text:'#9B6200',label:'In progress'}, covered:{bg:'#E6F5EB',border:'#5BBF7A',text:'#2D7D46',label:'Covered ✓'} }[status];
      return `
      <div onclick="cycleCDCTheme('${t.id}')" style="cursor:pointer;padding:12px;border-radius:8px;border:1.5px solid ${sc.border};background:${sc.bg};margin-bottom:8px;transition:all 0.15s">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
          <div style="flex:1">
            <div style="font-size:13px;font-weight:500;margin-bottom:3px">${i+1}. ${t.name}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">${t.desc}</div>
            <div style="display:flex;flex-wrap:wrap;gap:4px">
              ${t.subjects.map(sub => { const c2=SUBJECT_COLORS[sub]||['#f0f0f0','#555']; return `<span style="font-size:10px;padding:2px 7px;border-radius:20px;background:${c2[0]};color:${c2[1]};font-weight:500">${sub}</span>`; }).join('')}
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
  const states = ['none','in-progress','covered'];
  const cur = s.cdcProgress[themeId] || 'none';
  const next = states[(states.indexOf(cur)+1) % states.length];
  if (next === 'none') delete s.cdcProgress[themeId];
  else s.cdcProgress[themeId] = next;
  saveStudents();
  renderTabContent();
}

/* ── ADMIN DASHBOARD ── */
function renderAdminDashboard() {
  if (!currentUser || !currentUser.isAdmin) return;
  const c = document.getElementById('tabContent');

  // Build grade filter options
  const grades = [...new Set(students.map(s => s.grade))].sort((a,b) => a-b);
  const gradeFilter = document.getElementById('adminGradeFilter') ?
    document.getElementById('adminGradeFilter').value : 'all';

  const visible = gradeFilter === 'all' ? students : students.filter(s => String(s.grade) === gradeFilter);

  // Aggregate LSRW
  const lsrwCounts = {};
  LSRW_DOMAINS.forEach(d => { lsrwCounts[d] = { High:0, Average:0, Low:0 }; });
  visible.forEach(s => {
    if (!s.lsrw) return;
    LSRW_DOMAINS.forEach(d => {
      const lvl = s.lsrw[d] || 'Average';
      lsrwCounts[d][lvl]++;
    });
  });

  // RT averages per grade
  const rtByGrade = {};
  visible.forEach(s => {
    if (!rtByGrade[s.grade]) rtByGrade[s.grade] = [];
    rtByGrade[s.grade].push(parseFloat(rtAverage(s)));
  });

  const flaggedCount  = visible.filter(s => hasFlag(s)).length;
  const totalProjects = visible.reduce((a,s) => a + projectsDoneCount(s), 0);
  const avgRT = visible.length ? (visible.reduce((a,s) => a + parseFloat(rtAverage(s)), 0) / visible.length).toFixed(1) : '—';

  c.innerHTML = `
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px">
    <div style="font-family:var(--font-display);font-size:20px">Class Dashboard</div>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <select id="adminGradeFilter" onchange="renderAdminDashboard()" style="padding:7px 12px;border:1px solid var(--border-md);border-radius:6px;font-size:13px;background:var(--surface)">
        <option value="all">All Grades</option>
        ${grades.map(g => `<option value="${g}" ${gradeFilter==g?'selected':''}>Grade ${g}</option>`).join('')}
      </select>
      <button onclick="openClassReportModal()" style="padding:7px 14px;background:var(--accent);color:#fff;border:none;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer">⊞ Class Report</button>
      <button onclick="openEngagementModal()" style="padding:7px 14px;background:var(--green);color:#fff;border:none;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer">📣 Engagement</button>
    </div>
  </div>

  <div class="grid-4" style="margin-bottom:20px">
    <div class="stat-card"><div class="stat-label">Total Students</div><div class="stat-value">${visible.length}</div><div class="stat-sub">in selection</div></div>
    <div class="stat-card"><div class="stat-label">Avg RT Score</div><div class="stat-value">${avgRT}</div><div class="stat-sub">out of 4.0</div></div>
    <div class="stat-card"><div class="stat-label">Projects Done</div><div class="stat-value">${totalProjects}</div><div class="stat-sub">across class</div></div>
    <div class="stat-card" style="border-color:${flaggedCount>0?'var(--red)':'var(--border)'}"><div class="stat-label">Flagged</div><div class="stat-value" style="color:${flaggedCount>0?'var(--red)':'var(--text)'}">${flaggedCount}</div><div class="stat-sub">need attention</div></div>
  </div>

  <div class="grid-2" style="margin-bottom:16px">
    <div class="card">
      <div class="card-title">LSRW Class Overview</div>
      ${LSRW_DOMAINS.map(d => {
        const total = visible.length || 1;
        const h = lsrwCounts[d].High, av = lsrwCounts[d].Average, lo = lsrwCounts[d].Low;
        const hPct = Math.round((h/total)*100), avPct = Math.round((av/total)*100), loPct = Math.round((lo/total)*100);
        return `
        <div style="margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
            <span style="font-size:12px;font-weight:500">${LSRW_ICONS[d]} ${LSRW_LABELS[d]}</span>
            <div style="display:flex;gap:6px;font-size:10px">
              <span style="color:#2D7D46;font-weight:600">${h} High</span>
              <span style="color:#9B6200;font-weight:600">${av} Avg</span>
              <span style="color:#C0392B;font-weight:600">${lo} Low</span>
            </div>
          </div>
          <div style="height:8px;border-radius:4px;overflow:hidden;display:flex;background:var(--surface-2)">
            ${hPct > 0  ? `<div style="width:${hPct}%;background:#5BBF7A;transition:width 0.4s"></div>` : ''}
            ${avPct > 0 ? `<div style="width:${avPct}%;background:#E6A82A;transition:width 0.4s"></div>` : ''}
            ${loPct > 0 ? `<div style="width:${loPct}%;background:#E57373;transition:width 0.4s"></div>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>
    <div class="card">
      <div class="card-title">RT Average by Grade</div>
      ${Object.entries(rtByGrade).sort(([a],[b])=>a-b).map(([grade, vals]) => {
        const avg = (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1);
        const pct = (parseFloat(avg)/4)*100;
        return `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <span style="font-size:12px;color:var(--text-muted);width:52px;flex-shrink:0">Grade ${grade}</span>
          <div style="flex:1;height:8px;background:var(--surface-2);border-radius:4px;overflow:hidden">
            <div style="width:${pct}%;height:100%;background:var(--accent);border-radius:4px;transition:width 0.4s"></div>
          </div>
          <span style="font-size:12px;font-weight:600;width:28px;text-align:right">${avg}</span>
        </div>`;
      }).join('') || '<div style="font-size:12px;color:var(--text-faint)">No data yet.</div>'}
    </div>
  </div>

  <div class="card">
    <div class="card-title">All Students — Progress at a Glance</div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr style="background:var(--surface-2)">
            <th style="padding:8px 12px;text-align:left;font-weight:500;color:var(--text-muted)">Student</th>
            <th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted)">Grade</th>
            <th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted)">Section</th>
            <th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted)">Roll</th>
            <th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted)">RT Avg</th>
            <th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted)">Listen</th>
            <th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted)">Speak</th>
            <th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted)">Read</th>
            <th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted)">Write</th>
            <th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted)">Projects</th>
            <th style="padding:8px 12px;text-align:center;font-weight:500;color:var(--text-muted)">Flags</th>
          </tr>
        </thead>
        <tbody>
          ${visible.sort((a,b) => a.grade - b.grade || a.name.localeCompare(b.name)).map((s, i) => {
            const lsrw = s.lsrw || {};
            const fc = Object.values(s.flags).filter(Boolean).length;
            return `<tr style="border-top:1px solid var(--border);background:${i%2===0?'var(--surface)':'var(--surface-2)'};cursor:pointer" onclick="selectStudentFromDashboard('${s.id}')">
              <td style="padding:8px 12px">
                <div style="display:flex;align-items:center;gap:8px">
                  <div style="width:24px;height:24px;border-radius:50%;background:${s.color[0]};color:${s.color[1]};font-size:9px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0">${initials(s.name)}</div>
                  <span style="font-weight:500">${s.name}</span>
                </div>
              </td>
              <td style="padding:8px 12px;text-align:center">${s.grade}</td>
              <td style="padding:8px 12px;text-align:center;color:var(--text-muted)">${s.section||'—'}</td>
              <td style="padding:8px 12px;text-align:center;color:var(--text-muted)">${s.roll||'—'}</td>
              <td style="padding:8px 12px;text-align:center">
                <span style="font-weight:600;color:${parseFloat(rtAverage(s))>=3?'var(--green)':parseFloat(rtAverage(s))>=2?'var(--amber)':'var(--red)'}">${rtAverage(s)}</span>
              </td>
              ${LSRW_DOMAINS.map(d => {
                const lvl = lsrw[d] || 'Average';
                const col = LSRW_COLORS[lvl];
                return `<td style="padding:8px 12px;text-align:center"><span style="font-size:10px;padding:2px 7px;border-radius:10px;background:${col.bg};color:${col.text};font-weight:600;border:1px solid ${col.border}">${lvl[0]}</span></td>`;
              }).join('')}
              <td style="padding:8px 12px;text-align:center">${projectsDoneCount(s)}/6</td>
              <td style="padding:8px 12px;text-align:center">${fc > 0 ? `<span style="color:var(--red);font-weight:600">⚑ ${fc}</span>` : '<span style="color:var(--text-faint)">—</span>'}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function selectStudentFromDashboard(id) {
  // Switch back to student view
  document.getElementById('adminDashboardScreen') && (document.getElementById('adminDashboardScreen').style.display = 'none');
  selectStudent(id);
  switchTab('overview');
}
