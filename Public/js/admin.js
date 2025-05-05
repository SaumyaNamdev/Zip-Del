// Simulated vendor data
// Redirect if not logged in or not admin
if (localStorage.getItem("userRole") !== "admin" || localStorage.getItem("isLoggedIn") !== "true") {
  alert("Unauthorized access! Redirecting to login...");
  window.location.href = "login.html";
}

const vendors = [
    { name: "Vendor One", email: "vendor1@example.com" },
    { name: "Vendor Two", email: "vendor2@example.com" }
  ];
  
  function loadVendors() {
    const tableBody = document.querySelector("#vendorTable tbody");
    tableBody.innerHTML = "";
  
    vendors.forEach((vendor, index) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${vendor.name}</td>
        <td>${vendor.email}</td>
        <td>
          <button onclick="approveVendor(${index})">Approve</button>
          <button onclick="rejectVendor(${index})">Reject</button>
        </td>
      `;
  
      tableBody.appendChild(row);
    });
  }
  
  function approveVendor(index) {
    alert(`${vendors[index].name} approved.`);
    vendors.splice(index, 1);
    loadVendors();
  }
  
  function rejectVendor(index) {
    alert(`${vendors[index].name} rejected.`);
    vendors.splice(index, 1);
    loadVendors();
  }
  
  function setTimeSlot() {
    const timeSlot = document.getElementById("timeSlotInput").value;
    if (timeSlot.trim()) {
      alert(`Time slot updated to: ${timeSlot}`);
      document.getElementById("timeSlotInput").value = "";
    } else {
      alert("Please enter a valid time slot.");
    }
  }
  
  // Simulated transaction data
  const transactions = [
    { user: "User1", amount: "₹120", time: "10:30 AM" },
    { user: "User2", amount: "₹250", time: "11:00 AM" },
    { user: "User3", amount: "₹75", time: "12:15 PM" }
  ];
  
  function loadTransactions() {
    const list = document.getElementById("transactionsList");
    list.innerHTML = "";
    transactions.forEach(tx => {
      const li = document.createElement("li");
      li.textContent = `${tx.user} paid ${tx.amount} at ${tx.time}`;
      list.appendChild(li);
    });
  }
  
  // Simulate sensor alert system (auto-refresh every 10s)
  function simulateSensorAlerts() {
    const section = document.querySelector("#sensorAlerts");
    if (!section) return;
  
    const alerts = [
      "⚠️ Overflow detected in Sector 4",
      "✅ Sensor 12 functioning normally",
      "🚨 Leak detected near main valve",
      "🌡️ High temperature in Zone B"
    ];
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
  
    section.innerHTML = `<h3>Sensor Alerts</h3><p>${randomAlert}</p>`;
  }
  
  // Logout simulation
  function logout() {
    alert("Logging out...");
    window.location.href = "login.html";
  }
  
  // Load everything on page load
  window.addEventListener("DOMContentLoaded", () => {
    loadVendors();
    loadTransactions();
    simulateSensorAlerts();
    setInterval(simulateSensorAlerts, 10000); // Every 10 seconds
  });
  