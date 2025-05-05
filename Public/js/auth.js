document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };
  
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("token", result.token);
        if (data.role === "admin") location.href = "dashboard-admin.html";
        else if (data.role === "vendor") location.href = "dashboard-vendor.html";
        else location.href = "shop.html";
      } else {
        alert(result.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
    }
  });