window.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  
    const itemSection = document.querySelector(".cart-items");
    const itemList = document.querySelector(".cart-list");
    const emptyState = document.querySelector(".cart-empty");
  
    const favList = document.querySelector(".favourite-list");
    const favSection = document.querySelector(".favourite-section");
    const noFav = document.querySelector(".no-fav");
  
    let subtotal = 0;
  
    // --- 购物车显示逻辑 ---
    if (cart.length === 0) {
      emptyState.classList.remove("hidden");
      itemSection.classList.add("hidden");
    } else {
      emptyState.classList.add("hidden");
      itemSection.classList.remove("hidden");
      itemList.innerHTML = "";
  
      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
      
        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="item-details">
            <h3>$${item.price.toFixed(2)}</h3>
            <p>${item.brand}</p>
            <p>${item.name}</p>
            <p>Size: ${item.size}</p>
            <button class="btn remove-btn" data-index="${index}">Remove</button>
          </div>
        `;
      
        itemList.appendChild(itemDiv);
        subtotal += item.price;
      });
    }
  
    // --- 收藏显示逻辑 ---
    if (favourites.length === 0) {
      favList.innerHTML = "";
      favSection.classList.remove("hidden");
      noFav.classList.remove("hidden");
    } else {
      favList.innerHTML = "";
      favSection.classList.remove("hidden");
      noFav.classList.add("hidden");
  
      favourites.forEach((item, index) => {
        const favDiv = document.createElement("div");
        favDiv.className = "favourite-item";
        favDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" width="80" />
          <div style="margin-left: 16px;">
            <h4>${item.brand}</h4>
            <p>${item.name}</p>
            <p>Size: ${item.size}</p>
            <button class="btn remove-fav-btn" data-index="${index}">Remove</button>
          </div>
        `;
        favList.appendChild(favDiv);
      });
    }
  
    document.querySelectorAll(".summary-row span")[1].textContent = `$${subtotal.toFixed(2)} AUD`;
    document.getElementById("total-num").textContent = `$${subtotal.toFixed(2)} AUD`;
  
    // --- 删除购物车商品 ---  //
    document.querySelectorAll(".remove-btn").forEach(button => {
      button.addEventListener("click", event => {
        const index = parseInt(event.target.getAttribute("data-index"));
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    });
  
    // --- 删除收藏商品 ---
    document.querySelectorAll(".remove-fav-btn").forEach(button => {
      button.addEventListener("click", event => {
        const index = parseInt(event.target.getAttribute("data-index"));
        favourites.splice(index, 1);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        location.reload();
      });
    });
  
    // 跳转到 Checkout 页面
    const checkoutBtn = document.querySelector(".go-checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
    window.location.href = "../html/CheckoutPage.html";
    });
}
  });