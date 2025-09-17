function showSection(id){
    document.querySelectorAll('.section').forEach(sec=>sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Billing
document.getElementById('billingForm').addEventListener('submit',function(e){
    e.preventDefault();
    let [patient, med, qty, price] = [...this.querySelectorAll('input')].map(i=>i.value);
    let total = qty * price;
    document.getElementById('billingOutput').innerHTML +=
    `<p><strong>${patient}</strong> → ${med} × ${qty} = ₹${total}</p>`;
    this.reset();
});

// Send Bills
document.getElementById('sendBillsForm').addEventListener('submit',function(e){
    e.preventDefault();
    let name = this.querySelector('input').value;
    let details = this.querySelector('textarea').value;
    document.getElementById('sentBills').innerHTML +=
    `<p>Bill sent to <strong>${name}</strong>: ${details}</p>`;
    this.reset();
});

// Records
document.getElementById('recordForm').addEventListener('submit',function(e){
    e.preventDefault();
    let [med, qty] = [...this.querySelectorAll('input')].map(i=>i.value);
    let tbody = document.querySelector('#recordTable tbody');
    tbody.innerHTML += `<tr><td>${med}</td><td>${qty}</td></tr>`;
    this.reset();
});

// Orders
document.getElementById('orderMedicineForm').addEventListener('submit',function(e){
    e.preventDefault();
    let [med, qty] = [...this.querySelectorAll('input')].map(i=>i.value);
    document.getElementById('medicineOrders').innerHTML +=
    `<p>Medicine order placed: ${qty} units of ${med}</p>`;
    this.reset();
});

document.getElementById('orderEquipmentForm').addEventListener('submit',function(e){
    e.preventDefault();
    let [equip, qty] = [...this.querySelectorAll('input')].map(i=>i.value);
    document.getElementById('equipmentOrders').innerHTML +=
    `<p>Equipment order placed: ${qty} units of ${equip}</p>`;
    this.reset();
});

// --- Profile Dropdown for Sourav Paul ---
const profileCircle = document.getElementById("profileCircle");
const profileDropdown = document.getElementById("profileDropdown");
const userNameElem = document.getElementById("userName");
const userEmailElem = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

// Get logged-in email from sessionStorage
const loggedInEmail = sessionStorage.getItem("userEmail")?.trim().toLowerCase();

if (loggedInEmail !== "sinchansarkar.cse124215@bppimt.ac.in" & "souvikdey1810@gmail.com") {
    alert("⚠️ Access restricted to Sinchan Sarkar only!");
    window.location.href = "login.html";
} else {
    // Set profile info
    const username = "Sinchan Sarkar";
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
