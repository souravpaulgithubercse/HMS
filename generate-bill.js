// ✅ Generate random Transaction ID
function generateTransactionNo() {
  return "TXN" + Math.floor(100000 + Math.random() * 900000); // 6-digit random
}

// ✅ Add more service input fields dynamically
function addService() {
  const servicesList = document.getElementById("servicesList");
  const div = document.createElement("div");
  div.className = "service-item";
  div.innerHTML = `
    <input type="text" placeholder="Ex: Consultation" class="service-name">
    <input type="number" placeholder="Amount (₹)" class="service-amount">
  `;
  servicesList.appendChild(div);
}

// ✅ Mobile number validation (only digits, max 10)
function validateMobile() {
  const mobile = document.getElementById("patientMobile");
  mobile.value = mobile.value.replace(/[^0-9]/g, "").slice(0, 10);
}

// ✅ Generate Receipt
function generateReceipt() {
  const name = document.getElementById("patientName").value.trim();
  const id = document.getElementById("patientId").value.trim();
  const dept = document.getElementById("department").value.trim();
  const method = document.getElementById("paymentMethod").value;
  const date = document.getElementById("date").value;
  const insurance = parseFloat(document.getElementById("insuranceAmount").value) || 0;

  if (!name || !id || !date) {
    alert("⚠️ Please enter Patient Name, Patient ID, and Date");
    return;
  }

  const serviceNames = document.querySelectorAll(".service-name");
  const serviceAmounts = document.querySelectorAll(".service-amount");

  let services = [];
  let servicesHTML = "";
  let total = 0;

  serviceNames.forEach((input, i) => {
    const sName = input.value || "N/A";
    const sAmount = parseFloat(serviceAmounts[i].value) || 0;
    total += sAmount;
    services.push({ sName, sAmount });
    servicesHTML += `<li>${sName} - ₹${sAmount.toFixed(2)}</li>`;
  });

  const txnNo = generateTransactionNo();

  // ✅ Apply insurance discount
  let finalTotal = total - insurance;
  if (finalTotal < 0) finalTotal = 0;

  // ✅ Update receipt preview
  document.getElementById("receiptOutput").innerHTML = `
    <h3>Hospital Receipt</h3>
    <p><strong>Patient Name:</strong> ${name}</p>
    <p><strong>Patient ID:</strong> ${id}</p>
    <p><strong>Transaction No:</strong> ${txnNo}</p>
    <p><strong>Department:</strong> ${dept}</p>
    <p><strong>Services:</strong></p>
    <ul>${servicesHTML}</ul>
    <p><strong>Gross Bill:</strong> ₹${total.toFixed(2)}</p>
    <p><strong>Insurance Covered:</strong> -₹${insurance.toFixed(2)}</p>
    <p class="total-bill">Final Payable Bill: ₹${finalTotal.toFixed(2)}</p>
    <p><strong>Payment Method:</strong> ${method}</p>
    <p><strong>Date:</strong> ${date}</p>
    <hr>
    <p style="text-align:center;">✅ Thank you! Wishing you good health.</p>
  `;

  // ✅ Save all details
  const transaction = {
    txnNo, name, id, dept, services,
    gross: total, insurance, finalTotal,
    method, date
  };
  saveTransaction(transaction);
  addTransaction(transaction);

  alert("✅ Receipt generated & stored successfully!");
}

// ✅ Add transaction to table (showing all details)
function addTransaction({ txnNo, name, id, dept, services, gross, insurance, finalTotal, method, date }) {
  const tableBody = document.getElementById("transactionTable");
  const row = document.createElement("tr");

  // Convert services to string
  const servicesText = services.map(s => `${s.sName} (₹${s.sAmount.toFixed(2)})`).join(", ");

  row.innerHTML = `
    <td>${txnNo}</td>
    <td>${name}</td>
    <td>${id}</td>
    <td>${dept}</td>
    <td>${servicesText}</td>
    <td>₹${gross.toFixed(2)}</td>
    <td>₹${insurance.toFixed(2)}</td>
    <td>₹${finalTotal.toFixed(2)}</td>
    <td>${method}</td>
    <td>${date}</td>
    <td>
      <button class="action-btn view-btn" onclick="viewTransaction(this)">View</button>
      <button class="action-btn edit-btn" onclick="editTransaction(this)">Edit</button>
      <button class="action-btn delete-btn" onclick="deleteTransaction(this)">Delete</button>
    </td>
  `;

  tableBody.appendChild(row);
}

// ✅ Save transaction in LocalStorage
function saveTransaction(transaction) {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ✅ Load transactions from LocalStorage
function loadTransactions() {
  const tableBody = document.getElementById("transactionTable");
  tableBody.innerHTML = "";
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.forEach(t => addTransaction(t));
}

// ✅ View Transaction (detailed alert)
function viewTransaction(btn) {
  const row = btn.closest("tr");
  alert(
    `Transaction: ${row.cells[0].innerText}\nPatient: ${row.cells[1].innerText}\nPatient ID: ${row.cells[2].innerText}\nDepartment: ${row.cells[3].innerText}\nServices: ${row.cells[4].innerText}\nGross: ${row.cells[5].innerText}\nInsurance: ${row.cells[6].innerText}\nFinal Total: ${row.cells[7].innerText}\nMethod: ${row.cells[8].innerText}\nDate: ${row.cells[9].innerText}`
  );
}

// ✅ Edit Transaction (basic update for dept & total only)
function editTransaction(btn) {
  const row = btn.closest("tr");
  const txnNo = row.cells[0].innerText;

  const newDept = prompt("Enter new Department:", row.cells[3].innerText);
  const newTotal = prompt("Enter new Final Total Bill:", row.cells[7].innerText.replace("₹", ""));

  if (newDept !== null && newDept.trim() !== "") row.cells[3].innerText = newDept;
  if (newTotal !== null && !isNaN(newTotal)) row.cells[7].innerText = `₹${parseFloat(newTotal).toFixed(2)}`;

  // Update LocalStorage
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  let index = transactions.findIndex(t => t.txnNo === txnNo);
  if (index > -1) {
    if (newDept !== null && newDept.trim() !== "") transactions[index].dept = newDept;
    if (newTotal !== null && !isNaN(newTotal)) transactions[index].finalTotal = parseFloat(newTotal);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
}

// ✅ Delete Transaction
function deleteTransaction(btn) {
  const row = btn.closest("tr");
  const txnNo = row.cells[0].innerText;

  if (confirm("Are you sure you want to delete this transaction?")) {
    row.remove();
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions = transactions.filter(t => t.txnNo !== txnNo);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
}

// ✅ Search transactions by Transaction No, Patient Name, or Patient ID
function searchTransactions() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const table = document.getElementById("transactionTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const txnNo = rows[i].cells[0].textContent.toLowerCase();
    const name = rows[i].cells[1].textContent.toLowerCase();
    const id = rows[i].cells[2].textContent.toLowerCase();

    if (txnNo.includes(input) || name.includes(input) || id.includes(input)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

const patientInput = document.getElementById("patientName");

patientInput.addEventListener("input", function() {
    // Replace anything that's not a letter or space
    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
});

// ✅ Load saved transactions on page load
window.addEventListener("DOMContentLoaded", loadTransactions);

// --- Profile Dropdown for Sourav Paul ---
const profileCircle = document.getElementById("profileCircle");
const profileDropdown = document.getElementById("profileDropdown");
const userNameElem = document.getElementById("userName");
const userEmailElem = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

// Get logged-in email from sessionStorage
const loggedInEmail = sessionStorage.getItem("userEmail")?.trim().toLowerCase();

if (loggedInEmail !== "souravpaul1912@gmail.com" & "sinchansarkar.cse124215@bppimt.ac.in"  & "souvikdey1810@gmail.com") {
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


