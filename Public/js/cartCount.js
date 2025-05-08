function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countSpan = document.getElementById("cart-count");
    if (countSpan) {
      countSpan.textContent = cart.length;
    }
  }
  
  updateCartCount();
  