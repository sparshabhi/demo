/**
 * app.js — entry point, initialisation
 */
document.addEventListener('DOMContentLoaded', () => {
  if (tryResumeSession()) {
    launchApp();
  }
  document.getElementById('loginPass').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.querySelector('.login-form').dispatchEvent(new Event('submit', {cancelable:true}));
  });
});

async function launchApp() {
  document.getElementById('loginScreen').classList.remove('active');
  document.getElementById('appScreen').classList.add('active');

  // Populate grade filter based on teacher's grades
  const sel = document.getElementById('gradeFilter');
  Array.from(sel.options).forEach(opt => {
    if (opt.value === 'all') return;
    opt.style.display = canAccessGrade(opt.value) ? '' : 'none';
  });
  document.getElementById('teacherBadge').textContent = currentUser.displayName;

  // Load from cloud
  await loadStudents();
  renderSidebar();

  // Seed demo students for admin on first launch
  if (currentUser.isAdmin && students.length === 0) {
    seedDemoStudents();
    await saveStudents();
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
}
