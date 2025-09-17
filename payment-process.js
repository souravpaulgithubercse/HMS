// Smooth scroll for "Get Started" button
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Highlight active menu item dynamically
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll("nav ul li a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// Add interactive effect on feature cards
document.querySelectorAll(".feature-box").forEach(box => {
  box.addEventListener("mouseenter", () => {
    box.style.transform = "scale(1.05)";
    box.style.transition = "0.3s ease";
    box.style.boxShadow = "0px 8px 18px rgba(0,0,0,0.2)";
  });
  box.addEventListener("mouseleave", () => {
    box.style.transform = "scale(1)";
    box.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.1)";
  });
});

// Placeholder for feature buttons
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const action = btn.textContent.trim();
    alert(`🚀 Redirecting to ${action} page...`);
    // let link = btn.getAttribute("href");
    // window.location.href = link; // Uncomment for real navigation
  });
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
