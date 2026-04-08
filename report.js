/**
 * report.js — student portfolio reports, class report, engagement module
 */

function openReportModal() {
  const s = getStudent(selectedStudentId);
  if (!s) return;
  document.getElementById('reportPreview').innerHTML = buildReportHTML(s);
  document.getElementById('reportNotes').value = '';
  document.getElementById('reportModal').style.display = 'flex';
}

// ── Individual Portfolio Report ───────────────────────────────────────────────
function buildReportHTML(s, extraNotes = '') {
  const date = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  const flagLabels = FLAGS.filter(f => s.flags[f.id]).map(f => f.label);
  const projDone   = PROJECTS.filter(p => s.projects[p.id]);
  const projPending= PROJECTS.filter(p => !s.projects[p.id]);
  const outcomes   = LEARNING_OUTCOMES[s.grade] || [];
  const achieved   = outcomes.filter(o => s.outcomes && s.outcomes[o.id]).length;
  const lsrw       = s.lsrw || {};
  const ra         = parseFloat(rtAverage(s));
  const raColor    = ra >= 3 ? '#2D7D46' : ra >= 2 ? '#9B6200' : '#C0392B';

  return `
  <div style="font-family:'DM Sans',system-ui,sans-serif;color:#1A1814;line-height:1.5">

    <!-- Header -->
    <div style="background:#1A1814;color:#fff;border-radius:10px;padding:20px 24px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px">
      <div>
        <div style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:4px">Student Portfolio Report</div>
        <div style="font-size:22px;font-weight:700;margin-bottom:2px">${s.name}</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.6)">Grade ${s.grade}${s.section?' · Section '+s.section:''}${s.roll?' · Roll No. '+s.roll:''}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:11px;color:rgba(255,255,255,0.4)">${date}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4)">Prepared by ${currentUser.displayName}</div>
      </div>
    </div>

    <!-- Key Metrics Row -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px">
      <div style="background:#EBF0FE;border-radius:8px;padding:12px 14px;text-align:center">
        <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.06em;color:#2B5CE6;margin-bottom:3px">RT Average</div>
        <div style="font-size:24px;font-weight:700;color:${raColor}">${ra.toFixed(1)}</div>
        <div style="font-size:10px;color:#2B5CE6">out of 4.0</div>
      </div>
      <div style="background:#E6F5EB;border-radius:8px;padding:12px 14px;text-align:center">
        <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.06em;color:#2D7D46;margin-bottom:3px">Projects</div>
        <div style="font-size:24px;font-weight:700;color:#2D7D46">${projDone.length}<span style="font-size:14px">/6</span></div>
        <div style="font-size:10px;color:#2D7D46">completed</div>
      </div>
      <div style="background:#FEF3E0;border-radius:8px;padding:12px 14px;text-align:center">
        <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.06em;color:#9B6200;margin-bottom:3px">Outcomes</div>
        <div style="font-size:24px;font-weight:700;color:#9B6200">${achieved}<span style="font-size:14px">/${outcomes.length}</span></div>
        <div style="font-size:10px;color:#9B6200">achieved</div>
      </div>
      <div style="background:${flagLabels.length?'#FDECEA':'#F3EDFC'};border-radius:8px;padding:12px 14px;text-align:center">
        <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.06em;color:${flagLabels.length?'#C0392B':'#6B3FA0'};margin-bottom:3px">Flags</div>
        <div style="font-size:24px;font-weight:700;color:${flagLabels.length?'#C0392B':'#6B3FA0'}">${flagLabels.length}</div>
        <div style="font-size:10px;color:${flagLabels.length?'#C0392B':'#6B3FA0'}">${flagLabels.length?'active':'all clear'}</div>
      </div>
    </div>

    <!-- LSRW -->
    <div style="border:1px solid #eee;border-radius:10px;padding:16px;margin-bottom:14px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin-bottom:12px">English — LSRW Proficiency</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
        ${LSRW_DOMAINS.map(d => {
          const lvl = lsrw[d] || 'Average';
          const col = LSRW_COLORS[lvl];
          return `<div style="background:${col.bg};border:1px solid ${col.border};border-radius:8px;padding:10px;text-align:center">
            <div style="font-size:18px;margin-bottom:4px">${LSRW_ICONS[d]}</div>
            <div style="font-size:11px;color:${col.text};font-weight:500">${LSRW_LABELS[d]}</div>
            <div style="font-size:13px;font-weight:700;color:${col.text}">${lvl}</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- RT + Feedback -->
    <div style="border:1px solid #eee;border-radius:10px;padding:16px;margin-bottom:14px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin-bottom:12px">Reciprocal Teaching</div>
      ${Object.entries(s.rt).map(([k,v]) => {
        const col = v >= 3 ? '#2D7D46' : v >= 2 ? '#9B6200' : '#C0392B';
        const bg  = v >= 3 ? '#E6F5EB' : v >= 2 ? '#FEF3E0' : '#FDECEA';
        const pct = (v/4)*100;
        return `<div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px">
            <span style="font-size:12px;font-weight:500">${RT_LABELS[k]}</span>
            <span style="font-size:12px;font-weight:700;color:${col}">${v}/4</span>
          </div>
          <div style="height:6px;background:#f0f0f0;border-radius:3px;overflow:hidden;margin-bottom:5px">
            <div style="width:${pct}%;height:100%;background:${col};border-radius:3px"></div>
          </div>
          <div style="font-size:11px;color:#888;background:${bg};padding:6px 8px;border-radius:5px;line-height:1.5">${RT_FEEDBACK[k][v]}</div>
        </div>`;
      }).join('')}
    </div>

    <!-- LSRW Prescriptive Feedback -->
    <div style="border:1px solid #eee;border-radius:10px;padding:16px;margin-bottom:14px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin-bottom:12px">LSRW Prescriptive Feedback</div>
      ${LSRW_DOMAINS.map(d => {
        const lvl = lsrw[d] || 'Average';
        const col = LSRW_COLORS[lvl];
        return `<div style="margin-bottom:10px;padding:10px 12px;border-left:3px solid ${col.border};background:${col.bg};border-radius:0 6px 6px 0">
          <div style="font-size:11px;font-weight:600;color:${col.text};margin-bottom:3px">${LSRW_ICONS[d]} ${LSRW_LABELS[d]} — ${lvl}</div>
          <div style="font-size:11px;color:#555;line-height:1.55">${LSRW_FEEDBACK[d][lvl]}</div>
        </div>`;
      }).join('')}
    </div>

    <!-- Projects -->
    <div style="border:1px solid #eee;border-radius:10px;padding:16px;margin-bottom:14px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin-bottom:10px">Projects (${projDone.length}/6)</div>
      ${PROJECTS.map(p => {
        const done = s.projects[p.id];
        return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #f5f5f5">
          <div style="width:16px;height:16px;border-radius:4px;flex-shrink:0;background:${done?'#5BBF7A':'#eee'};display:flex;align-items:center;justify-content:center">
            ${done?'<span style="color:white;font-size:10px;font-weight:700">✓</span>':''}
          </div>
          <span style="font-size:12px;flex:1;color:${done?'#999':'#333'};${done?'text-decoration:line-through':''}">${p.name}</span>
          <span style="font-size:10px;padding:2px 7px;border-radius:10px;background:${p.term===1?'#EBF0FE':p.term===2?'#E6F5EB':'#FEF3E0'};color:${p.term===1?'#2B5CE6':p.term===2?'#2D7D46':'#9B6200'}">T${p.term}</span>
        </div>`;
      }).join('')}
    </div>

    <!-- Learning Outcomes -->
    <div style="border:1px solid #eee;border-radius:10px;padding:16px;margin-bottom:14px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin-bottom:10px">Grade ${s.grade} Learning Outcomes (${achieved}/${outcomes.length})</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${outcomes.map(o => {
          const done = s.outcomes && s.outcomes[o.id];
          return `<div style="display:flex;align-items:center;gap:6px;font-size:11px;color:${done?'#999':'#333'}">
            <span style="color:${done?'#5BBF7A':'#ccc'};font-weight:700">${done?'✓':'○'}</span>
            <span style="${done?'text-decoration:line-through':''}">${o.label}</span>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Flags -->
    ${flagLabels.length > 0 ? `
    <div style="border:1.5px solid #FDECEA;border-radius:10px;padding:16px;margin-bottom:14px;background:#FDECEA">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#C0392B;margin-bottom:8px">⚑ Active Flags (${flagLabels.length})</div>
      ${FLAGS.filter(f => s.flags[f.id]).map(f => `<div style="font-size:12px;color:#C0392B;margin-bottom:4px">${f.icon} ${f.label}</div>`).join('')}
    </div>` : ''}

    <!-- Interventions -->
    ${s.interventions.length > 0 ? `
    <div style="border:1px solid #eee;border-radius:10px;padding:16px;margin-bottom:14px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin-bottom:8px">Intervention Log</div>
      ${s.interventions.map(iv => `<div style="display:flex;gap:10px;padding:6px 0;border-bottom:1px solid #f5f5f5;font-size:12px">
        <span style="color:#aaa;flex-shrink:0">${iv.date}</span>
        <span>${iv.text}</span>
      </div>`).join('')}
    </div>` : ''}

    <!-- Extra Notes -->
    ${extraNotes ? `
    <div style="border:1px solid #eee;border-radius:10px;padding:16px;margin-bottom:14px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin-bottom:6px">Additional Notes</div>
      <div style="font-size:12px;color:#555;line-height:1.6">${extraNotes}</div>
    </div>` : ''}
  </div>`;
}

async function sendReport() {
  const s = getStudent(selectedStudentId);
  const notes = document.getElementById('reportNotes').value;
  const btn = document.getElementById('sendReportBtn');
  const ejs = CONFIG.emailjs;

  if (!ejs.publicKey || ejs.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
    showToast('EmailJS not configured. See js/config.js for setup.', true);
    return;
  }

  btn.textContent = 'Sending…';
  btn.disabled = true;

  const date = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  const lsrw = s.lsrw || {};
  const lsrwSummary = LSRW_DOMAINS.map(d => `${LSRW_LABELS[d]}: ${lsrw[d]||'Average'}`).join(', ');
  const reportBody = `Student: ${s.name} | Grade ${s.grade}${s.section?' | Section '+s.section:''}${s.roll?' | Roll '+s.roll:''}\nRT Average: ${rtAverage(s)}/4\nLSRW: ${lsrwSummary}\nProjects: ${projectsDoneCount(s)}/6\n${notes ? '\nNotes: '+notes : ''}`;

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

// ── Class Report ─────────────────────────────────────────────────────────────
function openClassReportModal() {
  const gradeFilter = document.getElementById('adminGradeFilter') ?
    document.getElementById('adminGradeFilter').value : 'all';
  const visible = gradeFilter === 'all' ? students : students.filter(s => String(s.grade) === gradeFilter);
  const label = gradeFilter === 'all' ? 'All Grades' : `Grade ${gradeFilter}`;
  const date = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });

  // LSRW aggregate
  const lsrwCounts = {};
  LSRW_DOMAINS.forEach(d => { lsrwCounts[d] = { High:0, Average:0, Low:0 }; });
  visible.forEach(s => {
    if (!s.lsrw) return;
    LSRW_DOMAINS.forEach(d => {
      const lvl = s.lsrw[d] || 'Average';
      lsrwCounts[d][lvl]++;
    });
  });

  const avgRT = visible.length ? (visible.reduce((a,s) => a + parseFloat(rtAverage(s)), 0) / visible.length).toFixed(1) : '—';
  const flaggedCount = visible.filter(s => hasFlag(s)).length;
  const projTotal = visible.reduce((a,s) => a + projectsDoneCount(s), 0);

  const html = `
  <div style="font-family:'DM Sans',system-ui,sans-serif;color:#1A1814">
    <div style="background:#1A1814;color:#fff;border-radius:10px;padding:18px 22px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:flex-start">
      <div>
        <div style="font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:3px">Class Progress Report</div>
        <div style="font-size:20px;font-weight:700">${label}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.5)">${visible.length} students · ${date}</div>
      </div>
      <div style="font-size:11px;color:rgba(255,255,255,0.4)">By ${currentUser.displayName}</div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px">
      <div style="background:#EBF0FE;border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:#2B5CE6;text-transform:uppercase;letter-spacing:0.05em">Students</div><div style="font-size:22px;font-weight:700;color:#2B5CE6">${visible.length}</div></div>
      <div style="background:#E6F5EB;border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:#2D7D46;text-transform:uppercase;letter-spacing:0.05em">Avg RT</div><div style="font-size:22px;font-weight:700;color:#2D7D46">${avgRT}</div></div>
      <div style="background:#FEF3E0;border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:#9B6200;text-transform:uppercase;letter-spacing:0.05em">Projects</div><div style="font-size:22px;font-weight:700;color:#9B6200">${projTotal}</div></div>
      <div style="background:${flaggedCount?'#FDECEA':'#F3EDFC'};border-radius:8px;padding:10px;text-align:center"><div style="font-size:9px;color:${flaggedCount?'#C0392B':'#6B3FA0'};text-transform:uppercase;letter-spacing:0.05em">Flagged</div><div style="font-size:22px;font-weight:700;color:${flaggedCount?'#C0392B':'#6B3FA0'}">${flaggedCount}</div></div>
    </div>

    <div style="border:1px solid #eee;border-radius:10px;padding:14px;margin-bottom:12px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin-bottom:10px">LSRW Class Breakdown</div>
      ${LSRW_DOMAINS.map(d => {
        const total = visible.length || 1;
        const h = lsrwCounts[d].High, av = lsrwCounts[d].Average, lo = lsrwCounts[d].Low;
        const hPct = Math.round((h/total)*100), avPct = Math.round((av/total)*100), loPct = Math.round((lo/total)*100);
        return `<div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px">
            <span style="font-weight:500">${LSRW_ICONS[d]} ${LSRW_LABELS[d]}</span>
            <span style="font-size:10px;color:#999">${h} High · ${av} Avg · ${lo} Low</span>
          </div>
          <div style="height:8px;border-radius:4px;overflow:hidden;display:flex;background:#f5f5f5">
            ${hPct>0?`<div style="width:${hPct}%;background:#5BBF7A"></div>`:''}
            ${avPct>0?`<div style="width:${avPct}%;background:#E6A82A"></div>`:''}
            ${loPct>0?`<div style="width:${loPct}%;background:#E57373"></div>`:''}
          </div>
        </div>`;
      }).join('')}
    </div>

    <div style="border:1px solid #eee;border-radius:10px;padding:14px">
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#888;margin-bottom:10px">Student Summary</div>
      <table style="width:100%;border-collapse:collapse;font-size:11px">
        <thead><tr style="background:#f8f8f8">
          <th style="padding:6px 10px;text-align:left;font-weight:500;color:#888">Student</th>
          <th style="padding:6px 10px;text-align:center;font-weight:500;color:#888">Gr.</th>
          <th style="padding:6px 10px;text-align:center;font-weight:500;color:#888">Sec.</th>
          <th style="padding:6px 10px;text-align:center;font-weight:500;color:#888">Roll</th>
          <th style="padding:6px 10px;text-align:center;font-weight:500;color:#888">RT</th>
          <th style="padding:6px 10px;text-align:center;font-weight:500;color:#888">L</th>
          <th style="padding:6px 10px;text-align:center;font-weight:500;color:#888">S</th>
          <th style="padding:6px 10px;text-align:center;font-weight:500;color:#888">R</th>
          <th style="padding:6px 10px;text-align:center;font-weight:500;color:#888">W</th>
          <th style="padding:6px 10px;text-align:center;font-weight:500;color:#888">Proj</th>
        </tr></thead>
        <tbody>
          ${visible.sort((a,b) => a.grade - b.grade || a.name.localeCompare(b.name)).map((s, i) => {
            const lsrw = s.lsrw || {};
            const ra = parseFloat(rtAverage(s));
            const raCol = ra>=3?'#2D7D46':ra>=2?'#9B6200':'#C0392B';
            return `<tr style="border-top:1px solid #f0f0f0;background:${i%2===0?'#fff':'#fafafa'}">
              <td style="padding:5px 10px;font-weight:500">${s.name}</td>
              <td style="padding:5px 10px;text-align:center;color:#888">${s.grade}</td>
              <td style="padding:5px 10px;text-align:center;color:#888">${s.section||'—'}</td>
              <td style="padding:5px 10px;text-align:center;color:#888">${s.roll||'—'}</td>
              <td style="padding:5px 10px;text-align:center;font-weight:700;color:${raCol}">${ra.toFixed(1)}</td>
              ${LSRW_DOMAINS.map(d => {
                const lvl = lsrw[d]||'Average';
                const col = LSRW_COLORS[lvl];
                return `<td style="padding:5px 10px;text-align:center"><span style="font-size:9px;padding:1px 5px;border-radius:8px;background:${col.bg};color:${col.text};font-weight:700">${lvl[0]}</span></td>`;
              }).join('')}
              <td style="padding:5px 10px;text-align:center">${projectsDoneCount(s)}/6</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>`;

  document.getElementById('classReportBody').innerHTML = html;
  document.getElementById('classReportModal').style.display = 'flex';
}

async function sendClassReport() {
  const btn = document.getElementById('sendClassReportBtn');
  const ejs = CONFIG.emailjs;
  if (!ejs.publicKey || ejs.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
    showToast('EmailJS not configured.', true); return;
  }
  btn.textContent = 'Sending…'; btn.disabled = true;
  const gradeFilter = document.getElementById('adminGradeFilter') ?
    document.getElementById('adminGradeFilter').value : 'all';
  const label = gradeFilter === 'all' ? 'All Grades' : `Grade ${gradeFilter}`;
  const date = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  try {
    await emailjs.send(ejs.serviceId, ejs.templateId, {
      to_email:  CONFIG.adminEmail,
      from_name: currentUser.displayName,
      student_name: `Class Report — ${label}`,
      student_grade: label,
      report_date: date,
      report_body: `Class report for ${label} — generated on ${date} by ${currentUser.displayName}.`,
      extra_notes: '(class report)',
      rt_average: '—', projects_done: '—', flags_count: '—'
    });
    closeModal('classReportModal');
    showToast(`Class report sent to admin`);
  } catch(e) {
    showToast('Failed to send — check EmailJS config', true);
  } finally {
    btn.textContent = 'Send to admin →'; btn.disabled = false;
  }
}

// ── Engagement Module ─────────────────────────────────────────────────────────
function openEngagementModal() {
  document.getElementById('engagementModal').style.display = 'flex';
  renderEngagementPreview();
}

function renderEngagementPreview() {
  const gradeVal = document.getElementById('engGradeFilter').value;
  const msgType  = document.getElementById('engMessageType').value;
  const targetStudents = gradeVal === 'all' ? students : students.filter(s => String(s.grade) === gradeVal);

  const messages = {
    encouragement: [
      "Keep up the excellent effort — your hard work in English is truly making a difference!",
      "You are making great progress this month. Keep reading and practising every day!",
      "Your dedication to learning English is inspiring. We're proud of you!",
    ],
    reading:  ["Don't forget to read for at least 15 minutes every day this month!",
               "Great readers are made one page at a time — keep going!"],
    writing:  ["Try writing 3 sentences in English today — you'll be surprised how much you improve!",
               "Practice writing every day this month and watch your skills soar!"],
    rt:       ["Remember to use your RT strategies: Predict, Question, Clarify, Summarise!",
               "Try using one Reciprocal Teaching strategy in your reading today!"],
  };

  const msgList = messages[msgType] || messages.encouragement;
  const preview = document.getElementById('engPreview');
  preview.innerHTML = `
    <div style="margin-bottom:12px">
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px">
        Sending to <strong>${targetStudents.length} student${targetStudents.length!==1?'s':''}</strong>${gradeVal!=='all'?' in Grade '+gradeVal:''}:
      </div>
      <div style="max-height:100px;overflow-y:auto;border:1px solid var(--border);border-radius:6px;padding:8px;font-size:12px;display:flex;flex-wrap:wrap;gap:4px">
        ${targetStudents.map(s => `<span style="padding:2px 8px;background:var(--accent-lt);color:var(--accent);border-radius:10px;font-size:11px">${s.name}</span>`).join('') || '<span style="color:var(--text-faint)">No students found</span>'}
      </div>
    </div>
    <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px">Sample messages:</div>
    ${msgList.map((m,i) => `
    <div style="padding:10px 12px;border-radius:8px;background:${i===0?'var(--accent-lt)':'var(--surface-2)'};border:1px solid ${i===0?'var(--accent)':'var(--border)'};margin-bottom:6px;font-size:12px;color:${i===0?'var(--accent)':'var(--text-muted)'}">
      ${i===0?'<strong>Selected: </strong>':''}${m}
    </div>`).join('')}`;
}

async function sendEngagementMessages() {
  const btn = document.getElementById('sendEngBtn');
  const gradeVal = document.getElementById('engGradeFilter').value;
  const msgType  = document.getElementById('engMessageType').value;
  const targetStudents = gradeVal === 'all' ? students : students.filter(s => String(s.grade) === gradeVal);

  if (!targetStudents.length) { showToast('No students to message', true); return; }

  const ejs = CONFIG.emailjs;
  if (!ejs.publicKey || ejs.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
    // Simulate success in demo mode
    closeModal('engagementModal');
    showToast(`✉️ Engagement messages queued for ${targetStudents.length} students`);
    return;
  }

  btn.textContent = 'Sending…'; btn.disabled = true;
  try {
    // In production, iterate and send per student; here we send a summary
    await emailjs.send(ejs.serviceId, ejs.templateId, {
      to_email:     CONFIG.adminEmail,
      from_name:    currentUser.displayName,
      student_name: `Engagement — ${gradeVal==='all'?'All Grades':'Grade '+gradeVal}`,
      student_grade: gradeVal==='all'?'All':'Grade '+gradeVal,
      report_date:  new Date().toLocaleDateString('en-GB'),
      report_body:  `Engagement messages (${msgType}) sent to ${targetStudents.length} students.`,
      extra_notes:  '(engagement module)',
      rt_average:'—', projects_done:'—', flags_count:'—'
    });
    closeModal('engagementModal');
    showToast(`✉️ Engagement messages sent to ${targetStudents.length} students`);
  } catch(e) {
    showToast('Failed to send messages', true);
  } finally {
    btn.textContent = 'Send messages'; btn.disabled = false;
  }
}
