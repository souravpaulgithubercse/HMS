document.getElementById("reportForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const reportType = document.getElementById("reportType").value;
  const message = document.getElementById("message").value;

  if (name && id && email && phone && fromDate && toDate && reportType) {
    // ✅ Create request object
    const request = {
      name,
      id,
      email,
      phone,
      fromDate,
      toDate,
      reportType
    };

    // ✅ Save to localStorage
    let requests = JSON.parse(localStorage.getItem("requests")) || [];
    requests.push(request);
    localStorage.setItem("requests", JSON.stringify(requests));

    // ✅ Add to table
    addRequestToTable(request);

    alert(`✅ Financial Report Request Submitted for ${name}`);
    document.getElementById("reportForm").reset();
    document.getElementById("daysCount").textContent = "";
  } else {
    alert("⚠️ Please fill out all required fields.");
  }
});

// 📅 Calculate number of days
const fromInput = document.getElementById("fromDate");
const toInput = document.getElementById("toDate");
const daysCount = document.getElementById("daysCount");

function updateDays() {
  if (fromInput.value && toInput.value) {
    const from = new Date(fromInput.value);
    const to = new Date(toInput.value);
    const diff = (to - from) / (1000 * 60 * 60 * 24);
    if (diff >= 0) {
      daysCount.textContent = `📅 Report covers ${diff + 1} day(s).`;
    } else {
      daysCount.textContent = "⚠️ End date must be after start date.";
    }
  } else {
    daysCount.textContent = "";
  }
}
fromInput.addEventListener("change", updateDays);
toInput.addEventListener("change", updateDays);

// ✅ Function to add a row to the table
function addRequestToTable(request) {
  const table = document.getElementById("requestsTable").querySelector("tbody");
  const row = table.insertRow();
  row.innerHTML = `
    <td>${request.name}</td>
    <td>${request.id}</td>
    <td>${request.email}</td>
    <td>${request.phone}</td>
    <td>${request.fromDate}</td>
    <td>${request.toDate}</td>
    <td>${request.reportType}</td>
  `;
}

// ✅ Load saved requests on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedRequests = JSON.parse(localStorage.getItem("requests")) || [];
  savedRequests.forEach(req => addRequestToTable(req));
});

// ✅ Clear All Requests
document.getElementById("clearRequests").addEventListener("click", () => {
  if (confirm("⚠️ Are you sure you want to clear all requests?")) {
    localStorage.removeItem("requests"); // clear localStorage
    document.querySelector("#requestsTable tbody").innerHTML = ""; // clear table
    alert("🗑️ All requests have been cleared.");
  }
});

// ✅ Function to add a row to the table
function addRequestToTable(request) {
  const table = document.getElementById("requestsTable").querySelector("tbody");
  const row = table.insertRow();
  row.innerHTML = `
    <td>${request.name}</td>
    <td>${request.id}</td>
    <td>${request.email}</td>
    <td>${request.phone}</td>
    <td>${request.fromDate}</td>
    <td>${request.toDate}</td>
    <td>${request.reportType}</td>
  `;
}




