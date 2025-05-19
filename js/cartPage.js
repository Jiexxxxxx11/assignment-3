window.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const emptyState = document.querySelector(".cart-empty");
    const itemSection = document.querySelector(".cart-items");
    const itemContainer = document.querySelector(".cart-items");
    const summary = document.querySelector(".cart-summary");
  //cart is empty
    if (cart.length === 0) {
      emptyState.classList.remove("hidden");
      itemSection.classList.add("hidden");
      return;
    }
  
    emptyState.classList.add("hidden");
    itemSection.classList.remove("hidden");

    cartItemList.remove();
  
    let total = 0;
  
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-details">
          <h3>${item.brand}</h3>
          <p>${item.name}</p>
          <p>Size: ${item.size}</p>
          <p>Price: $${item.price.toFixed(2)} AUD</p>
          <button class="remove-btn">Remove</button>
        </div>
      `;
      itemContainer.insertBefore(itemDiv, summary);
      total += item.price;
    });
  
    summary.querySelector("strong").textContent = `$${total.toFixed(2)} AUD`;
  });