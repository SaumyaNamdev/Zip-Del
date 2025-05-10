document.addEventListener("DOMContentLoaded", function () {
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const errorPassword = document.getElementById("passwordError");
  const loginBtn = document.getElementById("loginBtn");
  const form = document.getElementById("loginForm");

  const registerLink = document.querySelector("a[href='register.html']");
  const forgotLink = document.querySelector("a[href='forgot.html']");
  const indexLink = document.querySelector("a[href='index.html']");

  function validateInputs() {
    const email = emailField.value.trim();
    const password = passwordField.value.trim();
    let validEmail = false, validPassword = false;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length > 50) {
      emailField.style.borderColor = "red";
    } else if (emailRegex.test(email)) {
      emailField.style.borderColor = "";
      validEmail = true;
    } else {
      emailField.style.borderColor = "red";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      errorPassword.textContent = "❌ Password must be 8-20 chars with A-Z, a-z, 0-9, and special char.";
      passwordField.style.borderColor = "red";
    } else {
      errorPassword.textContent = "";
      passwordField.style.borderColor = "";
      validPassword = true;
    }

   // loginBtn.disabled = !(validEmail && validPassword);
  }

  emailField.addEventListener("input", validateInputs);
  passwordField.addEventListener("input", validateInputs);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailField.value.trim();
    const password = passwordField.value.trim();

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login successful") {
          alert("✅ Login successful!");
          localStorage.setItem("token", data.token);
          localStorage.setItem("userRole", data.user.role);
          localStorage.setItem("isLoggedIn", "true");

          if (data.user.role === "Admin") {
            window.location.href = "admin-dashboard.html";
          } else if (data.user.role === "Vendor") {
            window.location.href = "/vendor/dashboard";
          } else {
            window.location.href = "/";
          }
        } else {
          alert("❌ " + data.message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("❌ Error logging in. Please try again.");
      });
  });

  registerLink?.addEventListener("click", () => console.log("Navigating to register page..."));
  forgotLink?.addEventListener("click", () => console.log("Navigating to forgot password page..."));
  indexLink?.addEventListener("click", () => console.log("Navigating to home page..."));
});
