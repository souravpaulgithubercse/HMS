// ✅ Run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // --- Dynamic Year in Footer ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Navbar Toggle (for mobile) ---
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.main-nav');
  toggle?.addEventListener('click', ()=>nav.classList.toggle('show'));

  // --- Contact Form Validation ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("⚠️ Please fill in all fields before submitting.");
        return;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
        alert("⚠️ Please enter a valid email address.");
        return;
      }

      alert(`✅ Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }

  // --- Feedback Form Handling ---
  const feedbackForm = document.getElementById("feedbackForm");
  const successMessage = document.getElementById("successMessage");
  if (feedbackForm && successMessage) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      feedbackForm.style.display = "none";
      successMessage.classList.remove("hidden");

      setTimeout(() => {
        feedbackForm.reset();
        feedbackForm.style.display = "block";
        successMessage.classList.add("hidden");
      }, 5000);
    });
  }

  // --- Appointment Form Validation ---
  const appointmentForm = document.getElementById("appointmentForm");
  const formMsg = document.getElementById("formMessage");
  if (appointmentForm && formMsg) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const dept = document.getElementById("department").value;
      const date = document.getElementById("date").value;

      if (!name || !phone || !dept || !date) {
        formMsg.style.color = "crimson";
        formMsg.textContent = "⚠️ Please fill all required fields.";
        return;
      }

      formMsg.style.color = "green";
      formMsg.textContent = `✅ Thanks ${name.split(" ")[0]} — your request for ${dept} on ${date} has been received. We'll call you at ${phone}.`;

      appointmentForm.reset();
    });

    // Restrict name input to only letters + spaces
    const nameInput = document.getElementById("name");
    nameInput?.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    });
  }
});

