// Dynamic Year
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("feedbackForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Hide form and show success message
  form.style.display = "none";
  successMessage.classList.remove("hidden");

  // Reset form after showing success
  setTimeout(() => {
    form.reset();
    form.style.display = "block";
    successMessage.classList.add("hidden");
  }, 5000); // show success for 5 sec
});
