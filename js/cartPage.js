window.addEventListener("DOMContentLoaded", () => {
  // --- 从本地存储获取购物车和收藏数据 ---
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  // --- DOM 节点选择 ---
  const itemSection = document.querySelector(".cart-items"); // 有商品时显示的区域
  const itemList = document.querySelector(".cart-list");     // 商品列表容器
  const emptyState = document.querySelector(".cart-empty");  // 空购物车显示内容

  const favList = document.querySelector(".favourite-list"); // 收藏商品列表
  const favSection = document.querySelector(".favourite-section"); // 收藏区域
  const noFav = document.querySelector(".no-fav");           // 收藏为空时显示文本

  let subtotal = 0; // 初始化小计

  // --- 购物车显示逻辑 ---
  if (cart.length === 0) {
    emptyState.classList.remove("hidden");  // 显示空状态
    itemSection.classList.add("hidden");    // 隐藏商品列表
  } else {
    emptyState.classList.add("hidden");
    itemSection.classList.remove("hidden");
    itemList.innerHTML = "";

    // 遍历购物车商品并渲染
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

  // --- 收藏夹显示逻辑 ---
  if (favourites.length === 0) {
    favList.innerHTML = "";
    favSection.classList.remove("hidden");
    noFav.classList.remove("hidden");
  } else {
    favList.innerHTML = "";
    favSection.classList.remove("hidden");
    noFav.classList.add("hidden");

    // 遍历收藏夹并渲染
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

  // --- 小计金额更新 ---
  document.querySelectorAll(".summary-row span")[1].textContent = `$${subtotal.toFixed(2)} AUD`;
  document.getElementById("total-num").textContent = `$${subtotal.toFixed(2)} AUD`;

  // --- 购物车移除功能 ---
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", event => {
      const index = parseInt(event.target.getAttribute("data-index"));
      cart.splice(index, 1); // 移除指定商品
      localStorage.setItem("cart", JSON.stringify(cart)); // 更新本地存储
      location.reload(); // 刷新页面
    });
  });

  // --- 收藏移除功能 ---
  document.querySelectorAll(".remove-fav-btn").forEach(button => {
    button.addEventListener("click", event => {
      const index = parseInt(event.target.getAttribute("data-index"));
      favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      location.reload();
    });
  });

  // --- 跳转到结账页面 ---
  const checkoutBtn = document.querySelector(".go-checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "CheckoutPage.html"; // ✅ 注意这里路径已简化为同一目录
    });
  }
});