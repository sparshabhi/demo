/**
 * ui.js — sidebar rendering, modals, toast, general UI helpers
 */

let selectedStudentId = null;
let currentTab = 'overview';
let radarChartInstance = null;

function renderSidebar() {
  const gradeVal = document.getElementById('gradeFilter').value;
  const list = document.getElementById('studentList');
  list.innerHTML = '';

  const visible = students.filter(s => {
    if (!canAccessGrade(s.grade)) return false;
    if (gradeVal !== 'all' && String(s.grade) !== gradeVal) return false;
    return true;
  });

  if (visible.length === 0) {
    list.innerHTML = '<div style="font-size:12px;color:var(--text-faint);padding:8px 4px;text-align:center">No students found</div>';
    return;
  }

  visible.sort((a,b) => a.name.localeCompare(b.name));

  visible.forEach(s => {
    const div = document.createElement('div');
    div.className = 'student-item' + (s.id === selectedStudentId ? ' active' : '');
    div.innerHTML = `
      <div class="s-avatar" style="background:${s.color[0]};color:${s.color[1]}">${initials(s.name)}</div>
      <div style="flex:1;min-width:0">
        <div class="s-name">${s.name}</div>
        <div class="s-grade">Grade ${s.grade}</div>
      </div>
      ${hasFlag(s) ? '<div class="s-flag"></div>' : ''}
    `;
    div.onclick = () => selectStudent(s.id);
    list.appendChild(div);
  });
}

function filterStudents() { renderSidebar(); }

function selectStudent(id) {
  selectedStudentId = id;
  const s = getStudent(id);
  renderSidebar();

  document.getElementById('mainEmpty').style.display = 'none';
  const dash = document.getElementById('studentDashboard');
  dash.style.display = 'flex';
  dash.style.flexDirection = 'column';

  // Header
  const av = document.getElementById('dashAvatar');
  av.style.background = s.color[0];
  av.style.color = s.color[1];
  av.textContent = initials(s.name);
  document.getElementById('dashName').textContent = s.name;
  document.getElementById('dashMeta').textContent = `Grade ${s.grade} · Added by ${s.createdBy}`;

  switchTab(currentTab);
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  renderTabContent();
}

function openAddStudentModal() {
  document.getElementById('addStudentModal').style.display = 'flex';
  setTimeout(() => document.getElementById('newStudentName').focus(), 50);
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => { t.className = 'toast'; }, 2600);
}

function launchApp() {
  document.getElementById('loginScreen').classList.remove('active');
  document.getElementById('appScreen').classList.add('active');

  // Populate grade filter based on teacher's grades
  const sel = document.getElementById('gradeFilter');
  Array.from(sel.options).forEach(opt => {
    if (opt.value === 'all') return;
    opt.style.display = canAccessGrade(opt.value) ? '' : 'none';
  });

  document.getElementById('teacherBadge').textContent = currentUser.displayName;
  loadStudents();
  renderSidebar();

  // Seed demo students for admin on first launch
  if (currentUser.isAdmin && students.length === 0) {
    seedDemoStudents();
    renderSidebar();
  }
}

function seedDemoStudents() {
  const demos = [
    ['Aanya Sharma', 3], ['Ben Kowalski', 5], ['Chloe Obi', 2],
    ['Daniel Park', 7], ['Emma Johansson', 4]
  ];
  demos.forEach(([name, grade]) => {
    const s = makeStudent(name, grade);
    students.push(s);
  });
  students[0].flags.dysgraphia = true;
  students[0].interventions = [{ date: '2025-09-12', text: 'Referred to OT for pencil grip assessment' }];
  students[2].rt = { predict:3, question:2, clarify:3, summarize:2 };
  saveStudents();
}
