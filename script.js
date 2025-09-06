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

// Dark mode toggle
const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  // Save preference in localStorage
  if (document.body.classList.contains("dark-mode")) {
    darkToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    darkToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme on page load
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkToggle.textContent = "☀️";
  }
});
