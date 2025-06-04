window.addEventListener("DOMContentLoaded", () => {
  // 获取订单展示容器和信息展示区域
  const orderListContainer = document.getElementById("order-product-list");
  const orderNumberDisplay = document.getElementById("order-id"); // 显示订单编号
  const deliveryDateDisplay = document.getElementById("delivery-date"); // 显示预计送达日期

  // 获取购物车和付款方式数据
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let paymentMethod = localStorage.getItem("paymentMethod");

  // ✅ 若用户未选择付款方式，设为默认 "Credit Card"
  if (!paymentMethod || paymentMethod === "Not selected" || paymentMethod === "Not specified") {
    paymentMethod = "Credit Card";
  }

  let subtotal = 0;

  // --- 渲染每个商品信息 ---
  cart.forEach((item) => {
    subtotal += item.price;

    const itemDiv = document.createElement("div");
    itemDiv.className = "confirmation-item";
    itemDiv.innerHTML = `
      <div class="confirmation-product">
        <img src="${item.image}" alt="${item.name}" />
        <div class="product-details">
          <p><strong>${item.brand}</strong></p>
          <p>${item.name}</p>
          <p>Size: ${item.size}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
        </div>
      </div>
    `;
    orderListContainer.appendChild(itemDiv);
  });

  // --- 生成随机订单号 ---
  const generateOrderId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  // --- 获取预计送达日期（+3天） ---
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // 显示订单号与送达时间
  orderNumberDisplay.textContent = generateOrderId();
  deliveryDateDisplay.textContent = getDeliveryDate();

  // ✅ 显示付款方式与订单总价
  const finalPaymentMethod = paymentMethod === "Not specified" ? "Credit/Debit Card" : paymentMethod;
  const paymentNote = document.createElement("p");
  paymentNote.innerHTML = `Payment Method: <strong>${finalPaymentMethod}</strong><br>Total: <strong>$${subtotal.toFixed(2)} AUD</strong>`;
  orderListContainer.appendChild(paymentNote);

  // ✅ 点击 Continue Shopping 时，清除除 favourites 以外的所有数据
  const continueBtn = document.querySelector(".btn.btn-continue-shopping");
  if (continueBtn) {
    continueBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // 只保留 favourites 数据
      const favourites = localStorage.getItem("favourites");
      localStorage.clear();
      if (favourites) {
        localStorage.setItem("favourites", favourites);
      }

      // 页面跳转到产品列表页
      window.location.href = "ProductList.html";
    });
  }
});