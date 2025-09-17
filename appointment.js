let editingIndex = -1; // track which appointment is being updated

// Book or Update Appointment
document.getElementById("patientForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const appointment = getFormData();
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  if (editingIndex === -1) {
    appointments.push(appointment);
    alert("✅ Appointment booked successfully!");
  } else {
    appointments[editingIndex] = appointment;
    editingIndex = -1;
    alert("✏️ Appointment updated successfully!");
    document.querySelector("button[type='submit']").textContent = "Book Appointment";
  }

  // Sort by date + time
  appointments.sort((a, b) => {
    let dateA = new Date(a.date + " " + a.time);
    let dateB = new Date(b.date + " " + b.time);
    return dateA - dateB;
  });

  localStorage.setItem("appointments", JSON.stringify(appointments));

  displayAppointments();
  this.reset();
});

// ✅ Only one getFormData()
function getFormData() {
  return {
    patient_id: document.getElementById("patient_id").value,
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    address: document.getElementById("address").value,
    mobile: document.getElementById("mobile").value, // fixed
    history: document.getElementById("history").value,
    file: document.getElementById("file").value,
    time: document.getElementById("time").value + " " + document.getElementById("ampm").value,
    date: document.getElementById("date").value
  };
}

// Display Appointments
function displayAppointments() {
  const appointmentList = document.getElementById("appointmentList");
  appointmentList.innerHTML = "";

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  appointments.forEach((app, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${app.name}</strong> (${app.patient_id})<br>
        📅 ${app.date} ⏰ ${app.time}
      </div>
      <div>
        <button class="update-btn" onclick="updateAppointment(${index})">Update</button>
        <button class="cancel-btn" onclick="cancelAppointment(${index})">Cancel</button>
      </div>
    `;
    appointmentList.appendChild(li);
  });
}

// Cancel Appointment
function cancelAppointment(index) {
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.splice(index, 1);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  displayAppointments();
  alert("❌ Appointment cancelled successfully!");
}

// Update Appointment
function updateAppointment(index) {
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  let app = appointments[index];

  document.getElementById("patient_id").value = app.patient_id;
  document.getElementById("name").value = app.name;
  document.getElementById("age").value = app.age;
  document.getElementById("gender").value = app.gender;
  document.getElementById("address").value = app.address;
  document.getElementById("mobile").value = app.mobile;
  document.getElementById("history").value = app.history;
  document.getElementById("time").value = app.time.split(" ")[0];
  document.getElementById("ampm").value = app.time.split(" ")[1];
  document.getElementById("date").value = app.date;

  editingIndex = index;
  document.querySelector("button[type='submit']").textContent = "Update Appointment";
}

// Search filter
document.getElementById("searchBox").addEventListener("input", function() {
  let query = this.value.toLowerCase();
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  let filtered = appointments.filter(app =>
    app.name.toLowerCase().includes(query) ||
    app.patient_id.toLowerCase().includes(query)
  );
  renderFilteredAppointments(filtered);
});

function renderFilteredAppointments(list) {
  const appointmentList = document.getElementById("appointmentList");
  appointmentList.innerHTML = "";

  list.forEach((app, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${app.name}</strong> (${app.patient_id})<br>
        📅 ${app.date} ⏰ ${app.time}
      </div>
      <div>
        <button class="update-btn" onclick="updateAppointment(${index})">Update</button>
        <button class="cancel-btn" onclick="cancelAppointment(${index})">Cancel</button>
      </div>
    `;
    appointmentList.appendChild(li);
  });
}

// Load appointments on page load
window.onload = displayAppointments;

// Mobile validation
const mobileInput = document.getElementById("mobile");
mobileInput.addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, ""); // only digits
  const mobilePattern = /^[6-9][0-9]{9}$/;
  if (!mobilePattern.test(this.value)) {
    this.setCustomValidity("Enter a valid 10-digit number starting with 6–9");
  } else {
    this.setCustomValidity("");
  }
});

// --- Profile Dropdown (only for Souraneel Biswas) ---
document.addEventListener("DOMContentLoaded", function() {
  const profileCircle = document.getElementById("profileCircle");
  const profileDropdown = document.getElementById("profileDropdown");
  const userNameElem = document.getElementById("userName");
  const userEmailElem = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  const loggedInEmail = sessionStorage.getItem("userEmail")?.trim().toLowerCase();

  if (loggedInEmail !== "chaitalibiswas8@gmail.com" & "souvikdey1810@gmail.com") {
    alert("⚠️ Access restricted to Souraneel Biswas only!");
    window.location.href = "login.html";
    return;
  }

  const username = "Souraneel Biswas";
  userNameElem.textContent = username;
  userEmailElem.textContent = loggedInEmail;
  profileCircle.textContent = username.charAt(0).toUpperCase();

  profileCircle.addEventListener("click", function(e) {
    e.stopPropagation();
    profileDropdown.style.display =
      profileDropdown.style.display === "block" ? "none" : "block";
  });

  window.addEventListener("click", function() {
    profileDropdown.style.display = "none";
  });

  logoutBtn.addEventListener("click", function(e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "login.html";
  });
});
