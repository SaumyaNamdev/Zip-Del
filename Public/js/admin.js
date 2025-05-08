document.addEventListener("DOMContentLoaded", () => {
  // Retrieve cart data from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // DOM elements
  const totalItemsElem = document.getElementById("total-items");
  const totalQuantityElem = document.getElementById("total-quantity");
  const totalValueElem = document.getElementById("total-value");
  const inventoryLog = document.getElementById("inventory-log");

  // Calculate totals
  let totalItems = cart.length;
  let totalQuantity = 0;
  let totalValue = 0;

  cart.forEach(item => {
    totalQuantity += item.quantity;
    totalValue += item.price * item.quantity;
  });

  // Update dashboard stats
  totalItemsElem.textContent = totalItems;
  totalQuantityElem.textContent = totalQuantity.toFixed(1);
  totalValueElem.textContent = totalValue.toFixed(2);

  // Display items in inventory log
  if (cart.length === 0) {
    inventoryLog.innerHTML = "<tr><td colspan='5'>No items in cart.</td></tr>";
  } else {
    cart.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity} ${item.unit}</td>
        <td>₹${item.price}</td>
        <td>₹${(item.price * item.quantity).toFixed(2)}</td>
        <td><img src="${item.image}" alt="${item.name}" style="width:40px; height:40px;" /></td>
      `;
      inventoryLog.appendChild(row);
    });
  }
});
