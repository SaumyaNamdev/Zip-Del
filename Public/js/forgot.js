document.addEventListener("DOMContentLoaded", function () {
    const field = document.getElementById("emailOrPhone");
    const error = document.getElementById("emailOrPhoneError");
    const form = document.getElementById("forgotForm");
    const resetBtn = document.getElementById("resetBtn");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const value = field.value.trim();
  
      if (value === "") {
        error.textContent = "❌ This field cannot be empty.";
        field.style.borderColor = "red";
      } else if (/^[6-9]\d{9}$/.test(value) || /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
        error.textContent = "";
        field.style.borderColor = "";
        alert("📩 A password reset link has been sent to your email/phone (simulated).");
        window.location.href = "login.html";
      } else {
        error.textContent = "❌ Please enter a valid email or phone number.";
        field.style.borderColor = "red";
      }
    });
  });
  