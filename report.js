// ---------- setup ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- master & filtered arrays ----------
let reports = [];               // start empty
let currentFiltered = [...reports];

// ---------- DOM refs ----------
const tBody = document.querySelector('#reportTable tbody');
const rowCount = document.getElementById('rowCount');
const fromDate = document.getElementById('fromDate');
const toDate = document.getElementById('toDate');
const reportType = document.getElementById('reportType');
const quickSearch = document.getElementById('quickSearch');
const btnFilter = document.getElementById('btnFilter');
const btnExport = document.getElementById('btnExport');
const detailModal = document.getElementById('detailModal');
const detailBody = document.getElementById('detailBody');
const addForm = document.getElementById("addReportForm");

// ---------- helpers ----------
function capitalize(s) { return s[0].toUpperCase() + s.slice(1) }
function escapeHtml(s) { if (!s) return ''; return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;') }

// ---------- render table with View/Edit/Delete ----------
function renderTable(rows) {
  tBody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.date}</td>
      <td>${capitalize(r.type)}</td>
      <td>${r.patient}</td>
      <td>${escapeHtml(r.note)}</td>
      <td>${r.amount ? '₹ ' + r.amount : '-'}</td>
      <td>
        <button class="action-btn view-btn" data-id="${r.id}"><i class="fa fa-eye"></i></button>
        <button class="action-btn edit-btn" data-id="${r.id}" style="background:#2563eb"><i class="fa fa-edit"></i></button>
        <button class="action-btn delete-btn" data-id="${r.id}" style="background:#dc2626"><i class="fa fa-trash"></i></button>
      </td>
    `;
    tBody.appendChild(tr);
  });
  rowCount.textContent = `${rows.length} result${rows.length !== 1 ? 's' : ''}`;

  // attach listeners
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => openDetail(btn.dataset.id));
  });
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEdit(btn.dataset.id));
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteReport(btn.dataset.id));
  });
}

// ---------- filters ----------
function applyFilters() {
  const from = fromDate.value ? new Date(fromDate.value) : null;
  const to = toDate.value ? new Date(toDate.value) : null;
  const type = reportType.value;
  const q = quickSearch.value.trim().toLowerCase();

  let filtered = reports.filter(r => {
    let ok = true;
    if (from && new Date(r.date) < from) ok = false;
    if (to && new Date(r.date) > to) ok = false;
    if (type !== 'all' && r.type !== type) ok = false;
    if (q) ok = ok && (r.id.toLowerCase().includes(q) || r.patient.toLowerCase().includes(q) || (r.note && r.note.toLowerCase().includes(q)));
    return ok;
  });

  currentFiltered = filtered;
  renderTable(filtered);
  updateChart(filtered);
}

// ---------- add report ----------
addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("patientName").value;
  const type = document.getElementById("reportTypeAdd").value;
  const date = document.getElementById("reportDateAdd").value;
  const note = document.getElementById("reportNote").value;
  const amount = document.getElementById("reportAmount").value;

  if (!name || !type || !date) {
    alert("Please fill required fields!");
    return;
  }

  const id = 'RPT-' + String(1000 + reports.length + 1);
  reports.push({
    id, date, type, patient: name,
    note: note || (type + " added"),
    amount: type === "billing" ? (amount || "0.00") : ""
  });

  applyFilters();     // refresh table & chart
  addForm.reset();    // clear form
  alert("Report added successfully!");
});

// ---------- delete report ----------
function deleteReport(id) {
  if (!confirm("Delete this report?")) return;
  reports = reports.filter(r => r.id !== id);
  applyFilters();
}

// ---------- open detail ----------
function openDetail(id) {
  const r = reports.find(x => x.id === id);
  if (!r) return;
  detailBody.innerHTML = `
    <p><strong>ID:</strong> ${r.id}</p>
    <p><strong>Date:</strong> ${r.date}</p>
    <p><strong>Type:</strong> ${capitalize(r.type)}</p>
    <p><strong>Patient:</strong> ${r.patient}</p>
    <p><strong>Note:</strong> ${escapeHtml(r.note)}</p>
    <p><strong>Amount:</strong> ${r.amount ? '₹ ' + r.amount : '-'}</p>
  `;
  detailModal.classList.remove('hidden');
}

// ---------- open edit ----------
function openEdit(id) {
  const r = reports.find(x => x.id === id);
  if (!r) return;

  // Show modal with editable form
  detailBody.innerHTML = `
    <form id="editReportForm">
      <label>Patient Name:</label>
      <input type="text" id="editPatientName" value="${r.patient}" required>
      <label>Type:</label>
      <select id="editReportType" required>
        <option value="admission" ${r.type === 'admission' ? 'selected' : ''}>Admission</option>
        <option value="discharge" ${r.type === 'discharge' ? 'selected' : ''}>Discharge</option>
        <option value="billing" ${r.type === 'billing' ? 'selected' : ''}>Billing</option>
        <option value="feedback" ${r.type === 'feedback' ? 'selected' : ''}>Feedback</option>
      </select>
      <label>Date:</label>
      <input type="date" id="editReportDate" value="${r.date}" required>
      <label>Note:</label>
      <input type="text" id="editReportNote" value="${r.note}">
      <label>Amount:</label>
      <input type="number" id="editReportAmount" value="${r.amount || ''}">
      <button type="submit" class="btn accent">Save Changes</button>
    </form>
  `;
  detailModal.classList.remove('hidden');

  // handle save
  const editForm = document.getElementById("editReportForm");
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    r.patient = document.getElementById("editPatientName").value;
    r.type = document.getElementById("editReportType").value;
    r.date = document.getElementById("editReportDate").value;
    r.note = document.getElementById("editReportNote").value;
    r.amount = r.type === "billing" ? (document.getElementById("editReportAmount").value || "0.00") : "";
    applyFilters();
    detailModal.classList.add('hidden');
  });
}

// ---------- close modal ----------
document.querySelectorAll('.close-modal, #closeBtn').forEach(el => {
  el.addEventListener('click', () => detailModal.classList.add('hidden'));
});
detailModal.addEventListener('click', (e) => { if (e.target === detailModal) detailModal.classList.add('hidden'); });

// ---------- export CSV ----------
function exportCSV() {
  const rows = currentFiltered;
  if (!rows.length) { alert('No rows to export'); return; }
  const headers = ['ID', 'Date', 'Type', 'Patient', 'Note', 'Amount'];
  const csv = [headers.join(',')].concat(rows.map(r => {
    return [r.id, r.date, r.type, r.patient, `"${(r.note || '').replace(/"/g, '""')}"`, r.amount].join(',');
  })).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reports_export_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- chart ----------
let chart = null;
function updateChart(rows) {
  const counts = { admission: 0, discharge: 0, billing: 0, feedback: 0 };
  rows.forEach(r => { if (counts[r.type] !== undefined) counts[r.type]++ });

  const data = {
    labels: ['Admissions', 'Discharges', 'Billing', 'Feedback'],
    datasets: [{
      label: 'Report count',
      data: [counts.admission, counts.discharge, counts.billing, counts.feedback],
      backgroundColor: ['#1f77b4', '#ff7f0e', '#2ca02c', '#9467bd'],
      borderRadius: 6,
    }]
  };

  const ctx = document.getElementById('summaryChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data,
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
    }
  });
}

// ---------- initial render ----------
renderTable(reports);
updateChart(reports);

btnFilter.addEventListener('click', applyFilters);
btnExport.addEventListener('click', exportCSV);
quickSearch.addEventListener('keyup', (e) => { if (e.key === 'Enter') applyFilters(); });


// --- Profile Dropdown for Sourav Paul ---
const profileCircle = document.getElementById("profileCircle");
const profileDropdown = document.getElementById("profileDropdown");
const userNameElem = document.getElementById("userName");
const userEmailElem = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

// Get logged-in email from sessionStorage
const loggedInEmail = sessionStorage.getItem("userEmail")?.trim().toLowerCase();

if (loggedInEmail !==  "souvikdey1810@gmail.com") {
    alert("⚠️ Access restricted to Souvik Dey only!");
    window.location.href = "login.html";
} else {
    // Set profile info
    const username = "Souvik Dey";
    userNameElem.textContent = username;
    userEmailElem.textContent = loggedInEmail;
    profileCircle.textContent = username.charAt(0).toUpperCase();

    // Toggle dropdown visibility on click
    profileCircle.addEventListener("click", () => {
        profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
    });

    // Hide dropdown when clicking outside
    window.addEventListener("click", (e) => {
        if (!profileCircle.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.style.display = "none";
        }
    });

    // Logout functionality
    logoutBtn.addEventListener("click", () => {
        sessionStorage.clear(); // Clear session
        window.location.href = "login.html"; // Redirect to login
    });
}
