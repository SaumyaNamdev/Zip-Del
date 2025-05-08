const cartItemsDiv = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Weight: ${item.weight} kg</p>
      <p>Price: ₹${item.price}</p>
      <button onclick="removeItem(${index})">Remove</button>
      <hr />
    `;
    cartItemsDiv.appendChild(itemDiv);
    total += parseFloat(item.price);
  });

  cartTotalSpan.textContent = total.toFixed(2);
}

function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  alert("Proceeding to checkout...");
  // Add actual checkout logic or redirect here
}

displayCart();
