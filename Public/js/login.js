document.addEventListener("DOMContentLoaded", function () {
    const emailPhoneField = document.getElementById("emailOrPhone");
    const passwordField = document.getElementById("password");
    const errorEmailOrPhone = document.getElementById("emailOrPhoneError");
    const errorPassword = document.getElementById("passwordError");
    const loginBtn = document.getElementById("loginBtn");
    const form = document.getElementById("loginForm");
  
    const registerLink = document.querySelector("a[href='register.html']");
    const forgotLink = document.querySelector("a[href='forgot.html']");
    const indexLink = document.querySelector("a[href='index.html']");
  
    function validateInputs() {
      const value = emailPhoneField.value.trim();
      const password = passwordField.value.trim();
      let validPhone = false, validEmail = false, validPassword = false;
  
      // Phone number validation
      if (/^\d+$/.test(value)) {
        if (value.length > 10) {
          errorEmailOrPhone.textContent = "❌ Phone number cannot exceed 10 digits.";
          emailPhoneField.style.borderColor = "red";
        } else if (/^[6-9]\d{9}$/.test(value)) {
          errorEmailOrPhone.textContent = "";
          emailPhoneField.style.borderColor = "";
          validPhone = true;
        } else {
          errorEmailOrPhone.textContent = "❌ Invalid Indian phone number.";
          emailPhoneField.style.borderColor = "red";
        }
      } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value.length > 50) {
          errorEmailOrPhone.textContent = "❌ Email is too long (max 50 characters).";
          emailPhoneField.style.borderColor = "red";
        } else if (emailRegex.test(value)) {
          errorEmailOrPhone.textContent = "";
          emailPhoneField.style.borderColor = "";
          validEmail = true;
        } else {
          errorEmailOrPhone.textContent = "❌ Invalid email format.";
          emailPhoneField.style.borderColor = "red";
        }
      }
  
      // Password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
      if (!passwordRegex.test(password)) {
        errorPassword.textContent = "❌ Password must be 8-20 chars with A-Z, a-z, 0-9, and special char.";
        passwordField.style.borderColor = "red";
      } else {
        errorPassword.textContent = "";
        passwordField.style.borderColor = "";
        validPassword = true;
      }
  
      loginBtn.disabled = !(validPassword && (validPhone || validEmail));
    }
  
    emailPhoneField.addEventListener("input", validateInputs);
    passwordField.addEventListener("input", validateInputs);
  
    form.addEventListener("submit", function (e) {
        e.preventDefault();
      
        const identifier = emailPhoneField.value.trim();
        const password = passwordField.value.trim();
      
        // Send login data to backend
        fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              alert("✅ Login successful!");
              window.location.href = "index.html"; // Redirect to home
            } else {
              alert("❌ " + data.message);
            }
          })
          .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login successful") {
          alert("✅ Login successful!");
          window.location.href = "index.html"; // Home page
        } else {
          alert("❌ " + data.message);
        }
      })
          .catch(error => {
            console.error("Login error:", error);
            alert("❌ Error logging in. Please try again.");
          });
      });
      
  
    registerLink?.addEventListener("click", () => console.log("Navigating to register page..."));
    forgotLink?.addEventListener("click", () => console.log("Navigating to forgot password page..."));
    indexLink?.addEventListener("click", () => console.log("Navigating to home page..."));
    // Sample login logic (simulate login)
function login(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Dummy check - in real apps, do this with a backend
    if (email === "admin@zip.com" && password === "admin123") {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "dashboard-admin.html";
    } else if (email === "user@zip.com" && password === "user123") {
      localStorage.setItem("userRole", "user");
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "shop.html";
    } else {
      alert("Invalid credentials");
    }
  }
  
    
  });
  