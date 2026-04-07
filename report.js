/**
 * report.js — generate report text and send via EmailJS
 */

function openReportModal() {
  const s = getStudent(selectedStudentId);
  if (!s) return;

  document.getElementById('reportPreview').innerHTML = buildReportHTML(s);
  document.getElementById('reportNotes').value = '';
  document.getElementById('reportModal').style.display = 'flex';
}

function buildReportHTML(s) {
  const date = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  const flagLabels = FLAGS.filter(f => s.flags[f.id]).map(f => f.label);
  const projDone = PROJECTS.filter(p => s.projects[p.id]);
  const projPending = PROJECTS.filter(p => !s.projects[p.id]);

  return `
  <div class="rpt-section">
    <div class="rpt-section-title">Student</div>
    <div class="rpt-row"><span>Name</span><span>${s.name}</span></div>
    <div class="rpt-row"><span>Grade</span><span>${s.grade}</span></div>
    <div class="rpt-row"><span>Report date</span><span>${date}</span></div>
    <div class="rpt-row"><span>Prepared by</span><span>${currentUser.displayName}</span></div>
  </div>
  <div class="rpt-section">
    <div class="rpt-section-title">Reciprocal Teaching</div>
    ${Object.entries(s.rt).map(([k,v]) => `<div class="rpt-row"><span>${RT_LABELS[k]}</span><span>${v}/4</span></div>`).join('')}
    <div class="rpt-row"><span>Overall average</span><span>${rtAverage(s)}/4</span></div>
  </div>
  <div class="rpt-section">
    <div class="rpt-section-title">GMT Handwriting</div>
    ${Object.entries(GMT_DATA).map(([type,{emoji,letters}]) => {
      const mastered = letters.filter(l => s.gmt[type][l]==='mastered').length;
      const learning = letters.filter(l => s.gmt[type][l]==='learning').length;
      return `<div class="rpt-row"><span>${emoji} ${type.charAt(0).toUpperCase()+type.slice(1)}</span><span>${mastered} mastered, ${learning} in progress</span></div>`;
    }).join('')}
  </div>
  <div class="rpt-section">
    <div class="rpt-section-title">Projects (${projDone.length}/6 complete)</div>
    ${projDone.length > 0 ? projDone.map(p => `<div class="rpt-row"><span>✓ ${p.name}</span><span>Term ${p.term}</span></div>`).join('') : ''}
    ${projPending.length > 0 ? projPending.map(p => `<div class="rpt-row" style="opacity:0.5"><span>○ ${p.name}</span><span>Term ${p.term}</span></div>`).join('') : ''}
  </div>
  ${flagLabels.length > 0 ? `
  <div class="rpt-section">
    <div class="rpt-section-title" style="color:var(--red)">Active flags (${flagLabels.length})</div>
    ${flagLabels.map(l => `<div class="rpt-row"><span>⚑ ${l}</span><span></span></div>`).join('')}
  </div>` : ''}
  ${s.interventions.length > 0 ? `
  <div class="rpt-section">
    <div class="rpt-section-title">Interventions (${s.interventions.length})</div>
    ${s.interventions.map(iv => `<div class="rpt-row"><span>${iv.date}</span><span style="max-width:240px;text-align:right">${iv.text}</span></div>`).join('')}
  </div>` : ''}`;
}

function buildReportText(s, extraNotes) {
  const date = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  const lines = [];

  lines.push(`STUDENT PROGRESS REPORT`);
  lines.push(`========================`);
  lines.push(`Student:     ${s.name}`);
  lines.push(`Grade:       ${s.grade}`);
  lines.push(`Date:        ${date}`);
  lines.push(`Prepared by: ${currentUser.displayName}`);
  lines.push('');

  lines.push(`RECIPROCAL TEACHING`);
  lines.push(`-------------------`);
  Object.entries(s.rt).forEach(([k,v]) => lines.push(`${RT_LABELS[k]}: ${v}/4`));
  lines.push(`Overall average: ${rtAverage(s)}/4`);
  lines.push('');

  lines.push(`GMT HANDWRITING`);
  lines.push(`---------------`);
  Object.entries(GMT_DATA).forEach(([type,{emoji,letters}]) => {
    const mastered = letters.filter(l => s.gmt[type][l]==='mastered').map(l=>l).join(', ') || 'none';
    const learning = letters.filter(l => s.gmt[type][l]==='learning').map(l=>l).join(', ') || 'none';
    lines.push(`${emoji} ${type.charAt(0).toUpperCase()+type.slice(1)}:`);
    lines.push(`  Mastered: ${mastered}`);
    lines.push(`  In progress: ${learning}`);
  });
  lines.push('');

  lines.push(`PROJECTS (${projectsDoneCount(s)}/6 complete)`);
  lines.push(`-----------`);
  PROJECTS.forEach(p => lines.push(`[${s.projects[p.id]?'✓':' '}] ${p.name} (Term ${p.term})`));
  lines.push('');

  const activeFlags = FLAGS.filter(f => s.flags[f.id]);
  if (activeFlags.length) {
    lines.push(`ACTIVE FLAGS`);
    lines.push(`------------`);
    activeFlags.forEach(f => lines.push(`⚑ ${f.label}`));
    lines.push('');
  }

  if (s.interventions.length) {
    lines.push(`INTERVENTIONS`);
    lines.push(`-------------`);
    s.interventions.forEach(iv => lines.push(`[${iv.date}] ${iv.text}`));
    lines.push('');
  }

  if (extraNotes && extraNotes.trim()) {
    lines.push(`ADDITIONAL NOTES`);
    lines.push(`----------------`);
    lines.push(extraNotes.trim());
  }

  return lines.join('\n');
}

async function sendReport() {
  const s = getStudent(selectedStudentId);
  const notes = document.getElementById('reportNotes').value;
  const btn = document.getElementById('sendReportBtn');

  // Check EmailJS is configured
  const ejs = CONFIG.emailjs;
  if (!ejs.publicKey || ejs.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
    showToast('EmailJS not configured. See js/config.js for setup.', true);
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  const reportBody = buildReportText(s, notes);
  const date = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });

  try {
    await emailjs.send(ejs.serviceId, ejs.templateId, {
      to_email:     CONFIG.adminEmail,
      from_name:    currentUser.displayName,
      student_name: s.name,
      student_grade:`Grade ${s.grade}`,
      report_date:  date,
      report_body:  reportBody,
      extra_notes:  notes || '(none)',
      rt_average:   rtAverage(s),
      projects_done:`${projectsDoneCount(s)}/6`,
      flags_count:  String(Object.values(s.flags).filter(Boolean).length)
    });

    closeModal('reportModal');
    showToast(`Report for ${s.name} sent to admin`);
  } catch(err) {
    console.error(err);
    showToast('Failed to send — check EmailJS config', true);
  } finally {
    btn.textContent = 'Send to admin →';
    btn.disabled = false;
  }
}
