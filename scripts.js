let selectedRow = null;

// ✅ Submit Invoice Form
document.getElementById("invoiceForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("id").value.trim();
    const bookingId = document.getElementById("bookingId").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;
    const department = document.getElementById("department").value.trim();

    // Validation
    if (!name || !id || !bookingId || !email || !phone || !fromDate || !toDate || !department) {
        alert("⚠ Please fill out all required fields.");
        return;
    }

    // Generate unique Invoice ID
    const invoiceId = "INV-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    // Show popup with all details
    alert(
        "✅ Invoice Request Submitted Successfully!\n\n" +
        "Invoice ID: " + invoiceId + "\n" +
        "Patient Name: " + name + "\n" +
        "Patient ID: " + id + "\n" +
        "Booking ID: " + bookingId + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "From Date: " + fromDate + "\n" +
        "To Date: " + toDate + "\n" +
        "Department: " + department
    );

    // Add row to table
    const table = document.getElementById("requestsTable").querySelector("tbody");
    const row = table.insertRow();
    row.innerHTML = `
        <td>${invoiceId}</td>
        <td>${name}</td>
        <td>${id}</td>
        <td>${bookingId}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${fromDate}</td>
        <td>${toDate}</td>
        <td>${department}</td>
    `;

    // Reset form
    document.getElementById("invoiceForm").reset();
    selectedRow = null;
});

// ✅ Clear All Requests button
document.getElementById("clearRequests").addEventListener("click", function () {
    const tableBody = document.getElementById("requestsTable").querySelector("tbody");
    tableBody.innerHTML = ""; // remove all rows
    document.getElementById("invoiceResult").textContent = "🗑 All requests cleared!";
    selectedRow = null;
});

// ✅ Table row selection
document.querySelector("#requestsTable tbody").addEventListener("click", function (e) {
    const tr = e.target.closest("tr");
    if (!tr) return;

    if (selectedRow) selectedRow.classList.remove("selected-row");
    selectedRow = tr;
    selectedRow.classList.add("selected-row");
});

// ✅ Edit Selected button
document.getElementById("editRequest").addEventListener("click", function () {
    if (!selectedRow) {
        alert("Please select a row to edit!");
        return;
    }

    // Populate form with selected row data
    document.getElementById("name").value = selectedRow.cells[1].textContent;
    document.getElementById("id").value = selectedRow.cells[2].textContent;
    document.getElementById("bookingId").value = selectedRow.cells[3].textContent;
    document.getElementById("email").value = selectedRow.cells[4].textContent;
    document.getElementById("phone").value = selectedRow.cells[5].textContent;
    document.getElementById("fromDate").value = selectedRow.cells[6].textContent;
    document.getElementById("toDate").value = selectedRow.cells[7].textContent;
    document.getElementById("department").value = selectedRow.cells[8].textContent;

    // Remove row (it will be re-added when submitted)
    selectedRow.remove();
    selectedRow = null;
});
