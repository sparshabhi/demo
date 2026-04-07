/**
 * auth.js — login, session, permission checks
 */

let currentUser = null;

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUser').value.trim().toLowerCase();
  const password = document.getElementById('loginPass').value;
  const errEl    = document.getElementById('loginError');
  errEl.textContent = '';

  const teacher = CONFIG.teachers.find(t => t.username.toLowerCase() === username);
  if (!teacher) {
    errEl.textContent = 'Username not found.';
    return;
  }

  const hash = await hashPassword(password);
  if (hash !== teacher.passwordHash) {
    errEl.textContent = 'Incorrect password.';
    return;
  }

  currentUser = teacher;
  sessionStorage.setItem('ept_user', JSON.stringify({ username: teacher.username }));

  // init emailjs
  if (CONFIG.emailjs.publicKey && CONFIG.emailjs.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
    emailjs.init({ publicKey: CONFIG.emailjs.publicKey });
  }

  launchApp();
}

function signOut() {
  currentUser = null;
  sessionStorage.removeItem('ept_user');
  selectedStudentId = null;
  document.getElementById('appScreen').classList.remove('active');
  document.getElementById('loginScreen').classList.add('active');
  document.getElementById('loginPass').value = '';
  document.getElementById('loginUser').value = '';
}

function tryResumeSession() {
  const saved = sessionStorage.getItem('ept_user');
  if (!saved) return false;
  try {
    const { username } = JSON.parse(saved);
    const teacher = CONFIG.teachers.find(t => t.username === username);
    if (!teacher) return false;
    currentUser = teacher;
    if (CONFIG.emailjs.publicKey && CONFIG.emailjs.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
      emailjs.init({ publicKey: CONFIG.emailjs.publicKey });
    }
    return true;
  } catch(e) { return false; }
}

function canAccessGrade(grade) {
  if (!currentUser) return false;
  return currentUser.grades.includes(Number(grade));
}
