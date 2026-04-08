/**
 * data.js — student data model, JSONBin cloud storage, CSV/Excel import
 */

const AVATAR_COLORS = [
  ['#EBF0FE','#2B5CE6'], ['#E6F5EB','#2D7D46'], ['#FEF3E0','#9B6200'],
  ['#F3EDFC','#6B3FA0'], ['#FDECEA','#C0392B'], ['#E0F4F4','#1A7A7A'],
  ['#FFF0F5','#A0306A'], ['#F0F4E8','#4A6D1A']
];

const PROJECTS = [
  { id:'p1', name:'My Story World',        term:1, rt:'Predicting + Summarizing',   desc:'Personal narrative writing exploring imagination and storytelling.' },
  { id:'p2', name:'Animal Kingdom Report', term:1, rt:'Questioning + Clarifying',   desc:'Non-fiction research report on a chosen animal.' },
  { id:'p3', name:'Poetry Anthology',      term:2, rt:'Summarizing',                desc:'Collection of original and copied poems demonstrating handwriting skills.' },
  { id:'p4', name:'Book Review',           term:2, rt:'Predicting + Questioning',   desc:'Structured review of a class reader using RT scenarios.' },
  { id:'p5', name:'News Report',           term:3, rt:'Clarifying + Summarizing',   desc:'Journalistic piece on a school or local event.' },
  { id:'p6', name:'Reflective Journal',    term:3, rt:'All four strategies',        desc:'End-of-year reflection demonstrating mastery of RT and GMT skills.' }
];

const FLAGS = [
  { id:'dysgraphia',     icon:'✏️', label:'Dysgraphia risk indicators' },
  { id:'phonics',        icon:'🔤', label:'Phonics intervention needed' },
  { id:'reading',        icon:'📖', label:'Reading fluency concern' },
  { id:'comprehension',  icon:'💭', label:'Comprehension difficulties' },
  { id:'spelling',       icon:'🔡', label:'Spelling support needed' },
  { id:'attention',      icon:'🎯', label:'Attention / focus concerns' }
];

const RT_LABELS = { predict:'Predicting', question:'Questioning', clarify:'Clarifying', summarize:'Summarizing' };

// LSRW domains and prescriptive feedback
const LSRW_DOMAINS = ['listening','speaking','reading','writing'];
const LSRW_LABELS  = { listening:'Listening', speaking:'Speaking', reading:'Reading', writing:'Writing' };
const LSRW_ICONS   = { listening:'👂', speaking:'🗣️', reading:'📖', writing:'✍️' };

const LSRW_FEEDBACK = {
  listening: {
    High:    'Excellent listening skills — continue to engage with complex audio texts and debates to further stretch comprehension.',
    Average: 'If your performance in Listening is at an average level, you are advised to practise active listening by summarising spoken passages daily.',
    Low:     'If your performance in Listening is below the expected threshold, you are advised to begin with short audio stories and answer guided comprehension questions aloud.'
  },
  speaking: {
    High:    'Outstanding speaking ability — take leadership in discussions, debates, and presentations to model confident English for peers.',
    Average: 'If your performance in Speaking is at an average level, you are advised to practise reading aloud for 10 minutes each day and record yourself to identify areas for improvement.',
    Low:     'If your performance in Speaking is below the expected threshold, you are advised to start with structured sentence starters and simple oral responses before building to extended speaking tasks.'
  },
  reading: {
    High:    'Strong reading comprehension — challenge yourself with longer, more complex texts and analytical reading tasks.',
    Average: 'If your performance in Reading is at an average level, you are advised to read at least one graded reader per week and focus on identifying the main idea and supporting details.',
    Low:     'If your performance in Reading is below the expected threshold, you are advised to work with phonics-based decodable texts and revisit foundational fluency strategies with teacher support.'
  },
  writing: {
    High:    'Excellent writing — focus on refining style, voice, and complexity in extended writing tasks.',
    Average: 'If your performance in Writing is at an average level, you are advised to practise structured paragraph writing daily, using a topic sentence, supporting ideas, and a concluding sentence.',
    Low:     'If your performance in Writing is below the expected threshold, you are advised to focus on sentence construction, correct punctuation, and spelling of high-frequency words before moving to paragraphs.'
  }
};

// RT prescriptive feedback
const RT_FEEDBACK = {
  predict: {
    1: 'If your Predicting score is at the beginning stage, you are advised to look at titles, images, and headings before reading and write down what you think the text will be about.',
    2: 'If your Predicting score is developing, you are advised to practise making predictions using sentence starters ("I think… because…") and check them after reading.',
    3: 'Your predicting skill is proficient — work on justifying predictions with specific text evidence.',
    4: 'Advanced predictor — challenge yourself to predict authorial intent and genre conventions.'
  },
  question: {
    1: 'If your Questioning score is at the beginning stage, you are advised to practise asking at least one "Why?" or "How?" question per paragraph you read.',
    2: 'If your Questioning score is developing, you are advised to move from literal questions to inferential ones using the question starters "Why might…?" and "What would happen if…?"',
    3: 'Your questioning skill is proficient — focus on crafting evaluative and critical questions.',
    4: 'Advanced questioner — model your questioning strategies to peers and explore Socratic seminar techniques.'
  },
  clarify: {
    1: 'If your Clarifying score is at the beginning stage, you are advised to underline unfamiliar words and use context clues or a dictionary before asking for help.',
    2: 'If your Clarifying score is developing, you are advised to identify confusing sentences and restate them in your own words to check understanding.',
    3: 'Your clarifying skill is proficient — practise explaining complex passages to a partner without looking at the text.',
    4: 'Advanced clarifier — focus on clarifying ambiguous authorial choices and figurative language.'
  },
  summarize: {
    1: 'If your Summarising score is at the beginning stage, you are advised to practise retelling a text using only 3 sentences: beginning, middle, and end.',
    2: 'If your Summarising score is developing, you are advised to use the "main idea + 2 key details" framework to write summaries after each reading session.',
    3: 'Your summarising skill is proficient — practise writing summaries without looking back at the text.',
    4: 'Advanced summariser — challenge yourself to summarise across multiple texts, identifying common themes.'
  }
};

// ── JSONBin Cloud Storage ─────────────────────────────────────────────────────
const JSONBIN_KEY = '$2a$10$52TyfZ/CO4k6o05mMkvWuOTsqty/llTq.8XldYvYtaYlN86P3U.a6';
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b';
let JSONBIN_BIN_ID = localStorage.getItem('ept_bin_id') || null;

let students = [];
let _saveTimeout = null;

async function cloudLoad() {
  showLoadingOverlay(true);
  try {
    if (!JSONBIN_BIN_ID) {
      const res = await fetch(JSONBIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_KEY,
          'X-Bin-Name': 'english-tracker-students',
          'X-Bin-Private': 'false'
        },
        body: JSON.stringify({ students: [] })
      });
      const data = await res.json();
      JSONBIN_BIN_ID = data.metadata.id;
      localStorage.setItem('ept_bin_id', JSONBIN_BIN_ID);
      students = [];
    } else {
      const res = await fetch(`${JSONBIN_URL}/${JSONBIN_BIN_ID}/latest`, {
        headers: { 'X-Master-Key': JSONBIN_KEY }
      });
      const data = await res.json();
      students = data.record.students || [];
    }
  } catch(e) {
    console.error('Cloud load failed, falling back to localStorage', e);
    try {
      const raw = localStorage.getItem('ept_students_v3');
      if (raw) students = JSON.parse(raw);
    } catch(e2) { students = []; }
    showToast('⚠️ Offline mode — changes may not sync', true);
  }
  showLoadingOverlay(false);
}

async function cloudSave() {
  localStorage.setItem('ept_students_v3', JSON.stringify(students));
  clearTimeout(_saveTimeout);
  _saveTimeout = setTimeout(async () => {
    try {
      if (!JSONBIN_BIN_ID) return;
      await fetch(`${JSONBIN_URL}/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_KEY
        },
        body: JSON.stringify({ students })
      });
    } catch(e) {
      console.error('Cloud save failed', e);
      showToast('⚠️ Could not sync to cloud', true);
    }
  }, 800);
}

function showLoadingOverlay(show) {
  let overlay = document.getElementById('loadingOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
        <div class="spinner"></div>
        <div style="font-size:13px;color:var(--text-muted)">Loading student data…</div>
      </div>`;
    overlay.style.cssText = `position:fixed;inset:0;background:var(--surface);display:flex;align-items:center;justify-content:center;z-index:9999`;
    document.body.appendChild(overlay);
    const style = document.createElement('style');
    style.textContent = `.spinner{width:32px;height:32px;border:3px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:spin 0.8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`;
    document.head.appendChild(style);
  }
  overlay.style.display = show ? 'flex' : 'none';
}

function loadStudents() { return cloudLoad(); }
function saveStudents() { return cloudSave(); }

// ── Student model ─────────────────────────────────────────────────────────────
function makeStudent(name, grade, section = '', roll = '') {
  const id = 's' + Date.now() + Math.random().toString(36).slice(2,7);
  const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  return {
    id, name,
    grade: Number(grade),
    section: section || '',
    roll: roll || '',
    color,
    createdBy: currentUser ? currentUser.username : 'unknown',
    rt: { predict:1, question:1, clarify:1, summarize:1 },
    lsrw: { listening:'Average', speaking:'Average', reading:'Average', writing:'Average' },
    projects: { p1:false, p2:false, p3:false, p4:false, p5:false, p6:false },
    outcomes: {},
    cdcProgress: {},
    flags: {},
    interventions: []
  };
}

function getStudent(id) { return students.find(s => s.id === id); }

function addStudent() {
  const name    = document.getElementById('newStudentName').value.trim();
  const grade   = document.getElementById('newStudentGrade').value;
  const section = document.getElementById('newStudentSection').value.trim();
  const roll    = document.getElementById('newStudentRoll').value.trim();
  if (!name) return;
  if (!canAccessGrade(grade)) { showToast('You cannot add students to that grade.', true); return; }
  const s = makeStudent(name, grade, section, roll);
  students.push(s);
  saveStudents();
  closeModal('addStudentModal');
  document.getElementById('newStudentName').value = '';
  document.getElementById('newStudentSection').value = '';
  document.getElementById('newStudentRoll').value = '';
  renderSidebar();
  selectStudent(s.id);
  showToast('Student added ☁️');
}

function confirmDeleteStudent() {
  const s = getStudent(selectedStudentId);
  if (!s) return;
  document.getElementById('deleteStudentName').textContent = s.name;
  document.getElementById('deleteModal').style.display = 'flex';
}

function deleteStudent() {
  students = students.filter(s => s.id !== selectedStudentId);
  saveStudents();
  closeModal('deleteModal');
  selectedStudentId = null;
  document.getElementById('studentDashboard').style.display = 'none';
  document.getElementById('mainEmpty').style.display = '';
  renderSidebar();
  showToast('Student removed');
}

function initials(name) {
  return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0,2);
}

function hasFlag(s) {
  return Object.values(s.flags).some(Boolean);
}

function rtAverage(s) {
  const vals = Object.values(s.rt);
  return (vals.reduce((a,b) => a+b, 0) / vals.length).toFixed(1);
}

function projectsDoneCount(s) {
  return PROJECTS.filter(p => s.projects[p.id]).length;
}

// ── CSV / Excel Import ────────────────────────────────────────────────────────
function openImportModal() {
  document.getElementById('importModal').style.display = 'flex';
  document.getElementById('importFile').value = '';
  document.getElementById('importPreview').innerHTML = '';
  document.getElementById('importConfirmBtn').style.display = 'none';
  document.getElementById('importStatus').textContent = '';
  window._importParsed = [];
}

function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  const ext = file.name.split('.').pop().toLowerCase();
  const status  = document.getElementById('importStatus');
  const preview = document.getElementById('importPreview');
  const confirmBtn = document.getElementById('importConfirmBtn');
  preview.innerHTML = '';
  confirmBtn.style.display = 'none';
  window._importParsed = [];

  if (ext === 'csv') {
    const reader = new FileReader();
    reader.onload = ev => {
      const rows = parseCSV(ev.target.result);
      showImportPreview(rows, status, preview, confirmBtn);
    };
    reader.readAsText(file);
  } else if (ext === 'xlsx' || ext === 'xls') {
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = new Uint8Array(ev.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        showImportPreview(rows, status, preview, confirmBtn);
      } catch(err) {
        status.textContent = '❌ Could not read Excel file.';
        status.style.color = 'var(--danger)';
      }
    };
    reader.readAsArrayBuffer(file);
  } else {
    status.textContent = '❌ Please upload a .csv or .xlsx file.';
    status.style.color = 'var(--danger)';
  }
}

function gradeWordToNumber(raw) {
  const words = { one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8 };
  const lower = raw.toLowerCase().trim();
  const num = parseInt(lower);
  if (!isNaN(num)) return num;
  for (const [word, val] of Object.entries(words)) {
    if (lower.startsWith(word)) return val;
  }
  return NaN;
}

function parseCSV(text) {
  const rows = [];
  const lines = text.trim().split('\n');
  for (const line of lines) {
    const cells = [];
    let inQuote = false, cell = '';
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuote = !inQuote; }
      else if (ch === ',' && !inQuote) { cells.push(cell.trim()); cell = ''; }
      else { cell += ch; }
    }
    cells.push(cell.trim());
    rows.push(cells);
  }
  return rows;
}

function showImportPreview(rows, status, preview, confirmBtn) {
  if (!rows || rows.length < 2) {
    status.textContent = '❌ File appears empty or invalid.';
    status.style.color = 'var(--danger)';
    return;
  }
  const header = rows[0].map(h => h.toLowerCase().trim());
  const nameIdx     = header.findIndex(h => h.includes('student name') || h === 'name');
  const gradeIdx    = header.findIndex(h => h === 'grade' || h.startsWith('grade'));
  const sectionIdx  = header.findIndex(h => h.includes('section'));
  const rollIdx     = header.findIndex(h => h.includes('roll'));
  const guardianIdx = header.findIndex(h => h.includes('guardian'));
  const genderIdx   = header.findIndex(h => h.includes('gender'));

  if (nameIdx === -1 || gradeIdx === -1) {
    status.textContent = '❌ Could not find "Name" and "Grade" columns.';
    status.style.color = 'var(--danger)';
    return;
  }

  const parsed = [], skipped = [];
  rows.slice(1).forEach((row, i) => {
    const name     = (row[nameIdx]     || '').trim();
    const gradeRaw = (row[gradeIdx]    || '').toString().trim();
    const grade    = gradeWordToNumber(gradeRaw);
    const section  = sectionIdx  !== -1 ? (row[sectionIdx]  || '').trim() : '';
    const roll     = rollIdx     !== -1 ? (row[rollIdx]     || '').toString().trim() : '';
    const guardian = guardianIdx !== -1 ? (row[guardianIdx] || '').trim() : '';
    const gender   = genderIdx   !== -1 ? (row[genderIdx]   || '').trim() : '';

    if (!name)                              { skipped.push(`Row ${i+2}: empty name`); return; }
    if (isNaN(grade) || grade < 1 || grade > 8) { skipped.push(`Row ${i+2}: invalid grade "${gradeRaw}"`); return; }
    if (!canAccessGrade(grade))             { skipped.push(`Row ${i+2}: ${name} — no access`); return; }
    parsed.push({ name, grade, section, roll, guardian, gender });
  });

  window._importParsed = parsed;
  if (parsed.length === 0) {
    status.textContent = '❌ No valid students found in file.';
    status.style.color = 'var(--danger)';
    return;
  }

  const hasSec = parsed.some(p => p.section);
  const hasRoll = parsed.some(p => p.roll);
  const hasGen  = parsed.some(p => p.gender);
  const hasGrd  = parsed.some(p => p.guardian);

  let html = `<div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">Found <strong>${parsed.length}</strong> student${parsed.length>1?'s':''} to import${skipped.length ? ` · ${skipped.length} skipped` : ''}:</div>`;
  html += `<div style="max-height:200px;overflow-y:auto;border:1px solid var(--border);border-radius:8px"><table style="width:100%;border-collapse:collapse;font-size:13px">`;
  html += `<thead><tr style="background:var(--surface-2)">
    <th style="padding:6px 10px;text-align:left">Name</th>
    <th style="padding:6px 10px;text-align:left">Grade</th>
    ${hasSec  ? '<th style="padding:6px 10px;text-align:left">Section</th>' : ''}
    ${hasRoll ? '<th style="padding:6px 10px;text-align:left">Roll No.</th>' : ''}
    ${hasGen  ? '<th style="padding:6px 10px;text-align:left">Gender</th>' : ''}
    ${hasGrd  ? '<th style="padding:6px 10px;text-align:left">Guardian</th>' : ''}
  </tr></thead><tbody>`;
  parsed.forEach((s, i) => {
    html += `<tr style="border-top:1px solid var(--border);background:${i%2===0?'var(--surface)':'var(--surface-2)'}">
      <td style="padding:6px 10px">${s.name}</td>
      <td style="padding:6px 10px">Grade ${s.grade}</td>
      ${hasSec  ? `<td style="padding:6px 10px">${s.section||'—'}</td>` : ''}
      ${hasRoll ? `<td style="padding:6px 10px">${s.roll||'—'}</td>` : ''}
      ${hasGen  ? `<td style="padding:6px 10px">${s.gender||'—'}</td>` : ''}
      ${hasGrd  ? `<td style="padding:6px 10px;font-size:11px">${s.guardian||'—'}</td>` : ''}
    </tr>`;
  });
  html += `</tbody></table></div>`;
  if (skipped.length) html += `<div style="font-size:11px;color:var(--text-faint);margin-top:6px">Skipped: ${skipped.join(' · ')}</div>`;

  preview.innerHTML = html;
  confirmBtn.style.display = '';
  status.textContent = '';
}

async function confirmImport() {
  const parsed = window._importParsed || [];
  if (!parsed.length) return;
  let added = 0, dupes = 0;
  parsed.forEach(({ name, grade, section, roll, guardian, gender }) => {
    const exists = students.some(s => s.name.toLowerCase() === name.toLowerCase() && s.grade === grade);
    if (exists) { dupes++; return; }
    const s = makeStudent(name, grade, section, roll);
    if (guardian) s.guardian = guardian;
    if (gender)   s.gender   = gender;
    students.push(s);
    added++;
  });
  await saveStudents();
  closeModal('importModal');
  renderSidebar();
  let msg = `${added} student${added!==1?'s':''} imported ☁️`;
  if (dupes) msg += ` · ${dupes} duplicate${dupes!==1?'s':''} skipped`;
  showToast(msg);
}
