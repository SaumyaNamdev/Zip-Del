document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("searchBox");
    const productItems = document.querySelectorAll(".product-item");
    const cartCountDisplay = document.getElementById("cartCount");
  
    // --- Load cart count from localStorage ---
    // Example function to add to cart
function addToCart(name, price) {document.getElementById("clear-cart").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all orders?")) {
      localStorage.removeItem("cart");
      location.reload(); // Refresh dashboard to update UI
    }
  });
  

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === name);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  }
  
    function updateCartCount() {
      const count = localStorage.getItem("cartCount") || 0;
      cartCountDisplay.textContent = count;
    }
  
    updateCartCount();
  
    // --- Search Filter ---
    searchBox.addEventListener("input", function () {
      const query = this.value.toLowerCase();
  
      productItems.forEach((item) => {
        const name = item.dataset.name.toLowerCase();
        item.style.display = name.includes(query) ? "block" : "none";
      });
    });
  
    // --- Add to Cart Logic ---
    
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", function () {
        let count = parseInt(localStorage.getItem("cartCount")) || 0;
        count += 1;
        localStorage.setItem("cartCount", count);
        updateCartCount();
        alert("✅ Item added to cart!");
        const products = [
            { name: "Apple", emoji: "🍎", price: 50 },
            { name: "Banana", emoji: "🍌", price: 30 },
            { name: "Carrot", emoji: "🥕", price: 40 },
            { name: "Tomato", emoji: "🍅", price: 25 },
            { name: "Potato", emoji: "🥔", price: 20 },
            { name: "Cucumber", emoji: "🥒", price: 35 }
          ];
          
          const productList = document.getElementById("product-list");
          
          products.forEach((product) => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
              <div class="product-emoji">${product.emoji}</div>
              <div class="product-name">${product.name}</div>
              <div class="product-price">₹${product.price}/kg</div>
              <select class="weight-select">
                <option value="0.5">0.5 kg</option>
                <option value="1">1 kg</option>
                <option value="2">2 kg</option>
              </select>
              <button class="add-to-cart-btn" onclick="addToCart('${product.name}', ${product.price}, this)">
                <span>🛒</span> Add to Cart
              </button>
            `;
            productList.appendChild(card);
          });
          
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          
          function addToCart(name, price, button) {
            const weight = button.previousElementSibling.value;
            const total = price * parseFloat(weight);
          
            cart.push({ name, weight, price: total });
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} (${weight} kg) added to cart!`);
          }
          
          
      });
    });
  });
  