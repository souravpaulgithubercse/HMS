const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");
const emailInput = document.getElementById("email");

// Multiple fixed credentials
const validUsers = [
    { email: "souvikdey1810@gmail.com", password: "Hms@2025" },
    { email: "souravpaul1912@gmail.com", password: "Pay@1234" },
    { email: "chaitalibiswas8@gmail.com", password: "User@456" },
    { email: "tamojyoti.cse123175@bppimt.ac.in", password: "Doc@2025" },
    { email: "sinchansarkar.cse124215@bppimt.ac.in", password: "Staff@2025" }
];

// Password criteria check (optional hints)
const criteria = {
    length: (pwd) => pwd.length >= 8,
    uppercase: (pwd) => /[A-Z]/.test(pwd),
    lowercase: (pwd) => /[a-z]/.test(pwd),
    number: (pwd) => /[0-9]/.test(pwd),
    special: (pwd) => /[!@#$%^&*]/.test(pwd)
};

passwordInput.addEventListener("input", () => {
    for (const [id, check] of Object.entries(criteria)) {
        const li = document.getElementById(id);
        if (check(passwordInput.value)) {
            li.classList.remove("invalid");
            li.classList.add("valid");
        } else {
            li.classList.remove("valid");
            li.classList.add("invalid");
        }
    }
});

// Toggle password visibility
togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    eyeIcon.classList.toggle("fa-eye-slash");
});

// Form submission
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase(); // case-insensitive
    const pwd = passwordInput.value;

    const isValidUser = validUsers.some(
        user => user.email.toLowerCase() === email && user.password === pwd
    );

    if (isValidUser) {
        errorMsg.style.display = "none";
        alert("✅ Login successful!");
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("userEmail", email);  // save normalized email
        window.location.href = "home.html";
    } else {
        errorMsg.textContent = "❌ Invalid username or password!";
        errorMsg.style.display = "block";
    }
});

// Forgot Password simulation
document.getElementById("forgotPassword").addEventListener("click", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
        alert("⚠️ Please enter your email first to reset password.");
        return;
    }

    const user = validUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
        alert(`📩 Password reset link sent to ${email}.`);
    } else {
        alert("❌ Email not found in our system.");
    }
});

// Enable login button always (only form submit validates)
loginBtn.disabled = false;
