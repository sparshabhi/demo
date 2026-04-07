/**
 * data.js — student data model, localStorage persistence
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
  { id:'p4', name:'Book Review',           term:2, rt:'Predicting + Questioning',   gmt:'Monkey letters',    desc:'Structured review of a class reader using RT strategies.' },
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

let students = [];

function storageKey() {
  return 'ept_students_v3';
}

function loadStudents() {
  try {
    const raw = localStorage.getItem(storageKey());
    if (raw) students = JSON.parse(raw);
  } catch(e) { students = []; }
}

function saveStudents() {
  localStorage.setItem(storageKey(), JSON.stringify(students));
}

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
  showToast('Student added');
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
