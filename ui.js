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

  // Admin dashboard button
  if (currentUser && currentUser.isAdmin) {
    const adminBtn = document.createElement('div');
    adminBtn.id = 'adminDashBtn';
    adminBtn.className = 'student-item' + (selectedStudentId === '__admin__' ? ' active' : '');
    adminBtn.innerHTML = `
      <div class="s-avatar" style="background:#EBF0FE;color:#2B5CE6;font-size:13px">⊞</div>
      <div style="flex:1;min-width:0">
        <div class="s-name" style="color:var(--accent);font-weight:500">Class Dashboard</div>
        <div class="s-grade">${students.length} students</div>
      </div>`;
    adminBtn.onclick = openAdminDashboard;
    list.appendChild(adminBtn);
    // Divider
    const div = document.createElement('div');
    div.style.cssText = 'height:1px;background:var(--border);margin:4px 0 8px';
    list.appendChild(div);
  }

  const visible = students.filter(s => {
    if (!canAccessGrade(s.grade)) return false;
    if (gradeVal !== 'all' && String(s.grade) !== gradeVal) return false;
    return true;
  });

  if (visible.length === 0) {
    const empty = document.createElement('div');
    empty.style.cssText = 'font-size:12px;color:var(--text-faint);padding:8px 4px;text-align:center';
    empty.textContent = 'No students found';
    list.appendChild(empty);
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
        <div class="s-grade">Grade ${s.grade}${s.section?' · '+s.section:''}${s.roll?' · #'+s.roll:''}</div>
      </div>
      ${hasFlag(s) ? '<div class="s-flag"></div>' : ''}
    `;
    div.onclick = () => selectStudent(s.id);
    list.appendChild(div);
  });
}

function filterStudents() { renderSidebar(); }

function openAdminDashboard() {
  selectedStudentId = '__admin__';
  renderSidebar();
  document.getElementById('mainEmpty').style.display = 'none';
  const dash = document.getElementById('studentDashboard');
  dash.style.display = 'flex';
  dash.style.flexDirection = 'column';

  // Header
  const av = document.getElementById('dashAvatar');
  av.style.background = '#EBF0FE';
  av.style.color = '#2B5CE6';
  av.textContent = '⊞';
  document.getElementById('dashName').textContent = 'Class Dashboard';
  document.getElementById('dashMeta').textContent = `${students.length} students · Admin view`;

  // Hide report/delete buttons for admin view
  document.getElementById('reportBtn').style.display = 'none';
  document.getElementById('deleteBtn').style.display = 'none';

  // Switch to admin tab
  const tabNav = document.getElementById('tabNav');
  tabNav.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));

  // Use tab content area to render admin dashboard
  renderAdminDashboard();
}

function selectStudent(id) {
  selectedStudentId = id;
  const s = getStudent(id);
  renderSidebar();
  document.getElementById('mainEmpty').style.display = 'none';
  const dash = document.getElementById('studentDashboard');
  dash.style.display = 'flex';
  dash.style.flexDirection = 'column';

  // Show report/delete buttons
  document.getElementById('reportBtn').style.display = '';
  document.getElementById('deleteBtn').style.display = '';

  // Header
  const av = document.getElementById('dashAvatar');
  av.style.background = s.color[0];
  av.style.color = s.color[1];
  av.textContent = initials(s.name);
  document.getElementById('dashName').textContent = s.name;
  const meta = [`Grade ${s.grade}`];
  if (s.section) meta.push('Section ' + s.section);
  if (s.roll)    meta.push('Roll No. ' + s.roll);
  meta.push('Added by ' + s.createdBy);
  document.getElementById('dashMeta').textContent = meta.join(' · ');

  switchTab(currentTab === '__admin__' ? 'overview' : currentTab);
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
