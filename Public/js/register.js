document.addEventListener("DOMContentLoaded", function () {
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const roleField = document.getElementById("role");
  
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
  
    const registerBtn = document.getElementById("registerBtn");
    const form = document.getElementById("registerForm");
  
    // Validate form inputs
    function validateInputs() {
      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const password = passwordField.value.trim();
      const role = roleField.value;
  
      let validName = false, validEmail = false, validPassword = false;
  
      // Name validation
      if (name.length > 0) {
        nameError.textContent = "";
        validName = true;
      } else {
        nameError.textContent = "❌ Name cannot be empty.";
      }
  
      // Email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(email)) {
        emailError.textContent = "";
        validEmail = true;
      } else {
        emailError.textContent = "❌ Please enter a valid email address.";
      }
  
      // Password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
      if (passwordRegex.test(password)) {
        passwordError.textContent = "";
        validPassword = true;
      } else {
        passwordError.textContent = "❌ Password must be 8-20 characters with at least one uppercase, one lowercase, one number, and one special character.";
      }
  
      //registerBtn.disabled = !(validName && validEmail && validPassword && role);
    }
  
    nameField.addEventListener("input", validateInputs);
    emailField.addEventListener("input", validateInputs);
    passwordField.addEventListener("input", validateInputs);
    roleField.addEventListener("change", validateInputs);
  
    // Submit handler
    form.addEventListener("submit", function (e) {
        e.preventDefault();
      
        fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameField.value,
            email: emailField.value,
            password: passwordField.value,
            role: roleField.value
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            alert("✅ Registration successful!");
            window.location.href = "login.html";
          } else {
            alert("❌ " + data.error);
          }
        });
      });
      
  });
  