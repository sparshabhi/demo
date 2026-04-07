/**
 * data.js — student data model, JSONBin cloud storage, CSV/Excel import
 */

const AVATAR_COLORS = [
  ['#EBF0FE','#2B5CE6'], ['#E6F5EB','#2D7D46'], ['#FEF3E0','#9B6200'],
  ['#F3EDFC','#6B3FA0'], ['#FDECEA','#C0392B'], ['#E0F4F4','#1A7A7A'],
  ['#FFF0F5','#A0306A'], ['#F0F4E8','#4A6D1A']
];

const GMT_DATA = {
  giraffe:  { emoji: '🦒', label: 'Tall ascenders',  letters: ['b','d','f','h','i','j','k','l','t'] },
  monkey:   { emoji: '🐒', label: 'Descenders',      letters: ['g','j','p','q','y'] },
  tortoise: { emoji: '🐢', label: 'Middle zone',     letters: ['a','c','e','m','n','o','r','s','u','v','w','x','z'] }
};

const PROJECTS = [
  { id:'p1', name:'My Story World',        term:1, rt:'Predicting + Summarizing',   gmt:'Giraffe letters',   desc:'Personal narrative writing exploring imagination and storytelling.' },
  { id:'p2', name:'Animal Kingdom Report', term:1, rt:'Questioning + Clarifying',   gmt:'Tortoise letters',  desc:'Non-fiction research report on a chosen animal.' },
  { id:'p3', name:'Poetry Anthology',      term:2, rt:'Summarizing',                gmt:'All letter types',  desc:'Collection of original and copied poems demonstrating handwriting skills.' },
  { id:'p4', name:'Book Review',           term:2, rt:'Predicting + Questioning',   gmt:'Monkey letters',    desc:'Structured review of a class reader using RT scenarios.' },
  { id:'p5', name:'News Report',           term:3, rt:'Clarifying + Summarizing',   gmt:'Mixed focus',       desc:'Journalistic piece on a school or local event.' },
  { id:'p6', name:'Reflective Journal',    term:3, rt:'All four strategies',        gmt:'All letter types',  desc:'End-of-year reflection demonstrating mastery of RT and GMT skills.' }
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
function makeStudent(name, grade) {
  const id = 's' + Date.now() + Math.random().toString(36).slice(2,7);
  const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  return {
    id, name, grade: Number(grade), color,
    createdBy: currentUser ? currentUser.username : 'unknown',
    rt: { predict:1, question:1, clarify:1, summarize:1 },
    gmt: { giraffe:{}, monkey:{}, tortoise:{} },
    projects: { p1:false, p2:false, p3:false, p4:false, p5:false, p6:false },
    flags: {},
    interventions: []
  };
}

function getStudent(id) { return students.find(s => s.id === id); }

function addStudent() {
  const name  = document.getElementById('newStudentName').value.trim();
  const grade = document.getElementById('newStudentGrade').value;
  if (!name) return;
  if (!canAccessGrade(grade)) { showToast('You cannot add students to that grade.', true); return; }
  const s = makeStudent(name, grade);
  students.push(s);
  saveStudents();
  closeModal('addStudentModal');
  document.getElementById('newStudentName').value = '';
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

function gmtMasteredCount(s) {
  return Object.values(s.gmt).reduce((a, g) => a + Object.values(g).filter(v => v === 'mastered').length, 0);
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
  const status = document.getElementById('importStatus');
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
  const nameIdx = header.findIndex(h => h.includes('student name') || h === 'name');
  const gradeIdx = header.findIndex(h => h === 'grade' || h.startsWith('grade'));
  const guardianIdx = header.findIndex(h => h.includes('guardian'));
  const genderIdx = header.findIndex(h => h.includes('gender'));
  const rollIdx = header.findIndex(h => h.includes('roll'));

  if (nameIdx === -1 || gradeIdx === -1) {
    status.textContent = '❌ Could not find "Name" and "Grade" columns.';
    status.style.color = 'var(--danger)';
    return;
  }

  const parsed = [], skipped = [];
  rows.slice(1).forEach((row, i) => {
    const name = (row[nameIdx] || '').trim();
    const gradeRaw = (row[gradeIdx] || '').toString().trim();
    const grade = gradeWordToNumber(gradeRaw);
    const guardian = guardianIdx !== -1 ? (row[guardianIdx] || '').trim() : '';
    const gender = genderIdx !== -1 ? (row[genderIdx] || '').trim() : '';
    const roll = rollIdx !== -1 ? (row[rollIdx] || '').trim() : '';
    if (!name) { skipped.push(`Row ${i+2}: empty name`); return; }
    if (isNaN(grade) || grade < 1 || grade > 8) { skipped.push(`Row ${i+2}: invalid grade "${gradeRaw}"`); return; }
    if (!canAccessGrade(grade)) { skipped.push(`Row ${i+2}: ${name} — no access`); return; }
    parsed.push({ name, grade, guardian, gender, roll });
  });

  window._importParsed = parsed;
  if (parsed.length === 0) {
    status.textContent = '❌ No valid students found in file.';
    status.style.color = 'var(--danger)';
    return;
  }

  let html = `<div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">Found <strong>${parsed.length}</strong> student${parsed.length>1?'s':''} to import${skipped.length ? ` · ${skipped.length} skipped` : ''}:</div>`;
  html += `<div style="max-height:200px;overflow-y:auto;border:1px solid var(--border);border-radius:8px"><table style="width:100%;border-collapse:collapse;font-size:13px">`;
  html += `<thead><tr style="background:var(--surface-2)"><th style="padding:6px 12px;text-align:left">Name</th><th style="padding:6px 12px;text-align:left">Grade</th>${parsed[0].gender?'<th style="padding:6px 12px;text-align:left">Gender</th>':''}${parsed[0].guardian?'<th style="padding:6px 12px;text-align:left">Guardian</th>':''}</tr></thead><tbody>`;
  parsed.forEach((s, i) => {
    html += `<tr style="border-top:1px solid var(--border);background:${i%2===0?'var(--surface)':'var(--surface-2)'}"><td style="padding:6px 12px">${s.name}</td><td style="padding:6px 12px">Grade ${s.grade}</td>${s.gender?`<td style="padding:6px 12px">${s.gender}</td>`:''}${s.guardian?`<td style="padding:6px 12px;font-size:11px">${s.guardian}</td>`:''}</tr>`;
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
  parsed.forEach(({ name, grade, guardian, gender, roll }) => {
    const exists = students.some(s => s.name.toLowerCase() === name.toLowerCase() && s.grade === grade);
    if (exists) { dupes++; return; }
    const s = makeStudent(name, grade);
    if (guardian) s.guardian = guardian;
    if (gender) s.gender = gender;
    if (roll) s.roll = roll;
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
