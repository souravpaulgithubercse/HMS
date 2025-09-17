document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");
  const fromInput = document.getElementById("fromDate");
  const toInput = document.getElementById("toDate");
  const daysCount = document.getElementById("daysCount");
  const clearBtn = document.getElementById("clearRequests");
  const tbody = document.querySelector("#requestsTable tbody");

  function showPopup(message, type = "success") {
    const popup = document.createElement("div");
    popup.className = `popup ${type}`;
    popup.innerText = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
  }

  function updateDays() {
    if (fromInput.value && toInput.value) {
      const diff = (new Date(toInput.value) - new Date(fromInput.value)) / (1000 * 60 * 60 * 24);
      if (diff >= 0) {
        daysCount.textContent = `📅 Report covers ${diff + 1} day(s).`;
      } else {
        daysCount.textContent = "⚠️ End date must be after start date.";
      }
    } else daysCount.textContent = "";
  }
  fromInput.addEventListener("change", updateDays);
  toInput.addEventListener("change", updateDays);

  function escapeHtml(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function generateInvoiceId() {
    return "INV" + Math.floor(100000 + Math.random() * 900000);
  }

  function loadRequests() {
    tbody.innerHTML = "";
    const saved = JSON.parse(localStorage.getItem("requests")) || [];
    saved.forEach((request, index) => addRequestToTable(request, index));
  }

  function addRequestToTable(request, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(request.invoiceId)}</td>
      <td>${escapeHtml(request.name)}</td>
      <td>${escapeHtml(request.id)}</td>
      <td>${escapeHtml(request.email)}</td>
      <td>${escapeHtml(request.phone)}</td>
      <td>${escapeHtml(request.fromDate)}</td>
      <td>${escapeHtml(request.toDate)}</td>
      <td>${escapeHtml(request.reportType)}</td>
      <td><button class="edit-btn" data-index="${index}">✏️ Edit</button></td>
    `;
    tbody.appendChild(row);

    row.querySelector(".edit-btn").addEventListener("click", () => editRequest(index));
  }

  function editRequest(index) {
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const request = requests[index];
    if (!request) return;

    // Fill form
    document.getElementById("name").value = request.name;
    document.getElementById("id").value = request.id;
    document.getElementById("email").value = request.email;
    document.getElementById("phone").value = request.phone;
    fromInput.value = request.fromDate;
    toInput.value = request.toDate;
    document.getElementById("reportType").value = request.reportType;
    updateDays();

    // Remove old request temporarily
    requests.splice(index, 1);
    localStorage.setItem("requests", JSON.stringify(requests));
    loadRequests();

    showPopup(`✏️ Editing request for ${request.name}. Submit to save changes.`, "success");
  }

  clearBtn.addEventListener("click", () => {
    if (confirm("⚠️ Are you sure you want to clear all requests?")) {
      localStorage.removeItem("requests");
      loadRequests();
      showPopup("🗑️ All requests have been cleared.", "success");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("id").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const fromDate = fromInput.value;
    const toDate = toInput.value;
    const reportType = document.getElementById("reportType").value;

    if (!name || !id || !email || !phone || !fromDate || !toDate || !reportType) {
      showPopup("⚠️ Please fill out all required fields.", "error");
      return;
    }

    const invoiceId = generateInvoiceId();
    const request = { invoiceId, name, id, email, phone, fromDate, toDate, reportType, ts: Date.now() };
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(request);
    localStorage.setItem("requests", JSON.stringify(requests));

    loadRequests();
    showPopup(`✅ Financial Report Request Submitted for ${name}`, "success");
    form.reset();
    daysCount.textContent = "";
  });

  loadRequests();
});
const patientInput = document.getElementById("patientName");

patientInput.addEventListener("input", function() {
    // Replace anything that's not a letter or space
    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
});

// --- Profile Dropdown for Sourav Paul ---
const profileCircle = document.getElementById("profileCircle");
const profileDropdown = document.getElementById("profileDropdown");
const userNameElem = document.getElementById("userName");
const userEmailElem = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

// Get logged-in email from sessionStorage
const loggedInEmail = sessionStorage.getItem("userEmail")?.trim().toLowerCase();

if (loggedInEmail !== "souravpaul1912@gmail.com" & "souvikdey1810@gmail.com") {
    alert("⚠️ Access restricted to Sourav Paul only!");
    window.location.href = "login.html";
} else {
    // Set profile info
    const username = "Sourav Paul";
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
