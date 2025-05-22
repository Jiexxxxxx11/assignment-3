window.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemSection = document.querySelector(".cart-items");
    const itemList = document.querySelector(".cart-list");
    const emptyState = document.querySelector(".cart-empty");
  
    if (cart.length === 0) {
      emptyState.classList.remove("hidden");
      itemSection.classList.add("hidden");
      return;
    }
  
    emptyState.classList.add("hidden");
    itemSection.classList.remove("hidden");
    itemList.innerHTML = "";
  
    let subtotal = 0;
  
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-details">
          <h3>$${item.price.toFixed(2)}</h3>
          <p>${item.brand}</p>
          <p>${item.name}</p>
          <p>Size: ${item.size}</p>
          <button class="remove-btn">Remove</button>
        </div>
      `;
      itemList.appendChild(itemDiv);
      subtotal += item.price;
    });
  
    // 更新 Summary 中的值
    document.querySelectorAll(".summary-row span")[1].textContent = `$${subtotal.toFixed(2)} AUD`; // Subtotal
    document.getElementById("total-num").textContent = `$${subtotal.toFixed(2)} AUD`;
  });
    // Promo toggle section
    const promoToggleBtn = document.getElementById("promo");
    const promoInputContainer = document.getElementById("promo-input");
  
    if (promoToggleBtn && promoInputContainer) {
      promoToggleBtn.addEventListener("click", () => {
        promoInputContainer.classList.toggle("hidden");
      });
    } else {
      console.warn("Promo Code button or input container not found.");
    }
