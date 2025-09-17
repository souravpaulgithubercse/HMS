// --- User Access Control ---
const userAccess = {
    "souravpaul1912@gmail.com": ["payment-process.html"],
    "chaitalibiswas8@gmail.com": ["appointment.html"],
    "tamojyoti.cse123175@bppimt.ac.in": ["patient.html"],
    "sinchansarkar.cse124215@bppimt.ac.in": ["supplier.html"],
    "souvikdey1810@gmail.com": [
        "appointment.html", "patient.html", "payment-process.html", "supplier.html"
    ]
};

// --- Email to Full Name Mapping ---
const userNames = {
    "souravpaul1912@gmail.com": "Sourav Paul",
    "chaitalibiswas8@gmail.com": "Souraneel Biswas",
    "tamojyoti.cse123175@bppimt.ac.in": "Tamojyoti Maitra",
    "sinchansarkar.cse124215@bppimt.ac.in": "Sinchan Sarkar",
    "souvikdey1810@gmail.com": "Souvik Dey"
};

// Get logged-in email from sessionStorage
const loggedInEmail = sessionStorage.getItem("userEmail")?.trim().toLowerCase();

if (!loggedInEmail) {
    alert("⚠️ Please log in first!");
    window.location.href = "login.html";
}

// Allowed pages for this user
const allowedPages = userAccess[loggedInEmail] || [];

// Disable all links not allowed for this user
document.querySelectorAll('.features-grid .feature-card a').forEach(link => {
    const href = link.getAttribute('href');
    if (!allowedPages.includes(href)) {
        link.style.pointerEvents = "none";
        link.style.opacity = "0.4";
        link.textContent = "Access Denied";
    } else {
        link.style.pointerEvents = "auto";
        link.style.opacity = "1";
    }
});

// --- Profile Dropdown ---
const profileCircle = document.getElementById("profileCircle");
const profileDropdown = document.getElementById("profileDropdown");
const userNameElem = document.getElementById("userName");
const userEmailElem = document.getElementById("userEmail");

// Set profile info dynamically
const username = userNames[loggedInEmail] || "Unknown User";
userNameElem.textContent = username;
userEmailElem.textContent = loggedInEmail;
profileCircle.textContent = username.charAt(0).toUpperCase();

// Toggle dropdown
profileCircle.addEventListener("click", () => {
    profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
});

// Hide dropdown when clicking outside
window.addEventListener("click", (e) => {
    if (!profileCircle.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.style.display = "none";
    }
});
