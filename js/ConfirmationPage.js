window.addEventListener("DOMContentLoaded", () => {
    const orderListContainer = document.getElementById("order-product-list");
    const orderNumberDisplay = document.getElementById("order-id"); // 修正 ID
    const deliveryDateDisplay = document.getElementById("delivery-date"); // 修正 ID
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let paymentMethod = localStorage.getItem("paymentMethod");

      // ✅ 如果用户未选择支付方式，则默认使用 Credit/Debit Card
    if (!paymentMethod || paymentMethod === "Not selected" || paymentMethod === "Not specified") {
      paymentMethod = "Credit Card";
    }

  
    let subtotal = 0;
  
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
  
    const generateOrderId = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let id = "";
      for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    };
  
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
  
    // 显示订单号
orderNumberDisplay.textContent = generateOrderId();
deliveryDateDisplay.textContent = getDeliveryDate();

// ✅ 显示付款方式和总价
const finalPaymentMethod = paymentMethod === "Not specified" ? "Credit/Debit Card" : paymentMethod;
const paymentNote = document.createElement("p");
paymentNote.innerHTML = `Payment Method: <strong>${finalPaymentMethod}</strong><br>Total: <strong>$${subtotal.toFixed(2)} AUD</strong>`;
orderListContainer.appendChild(paymentNote);

// ✅ 点击 “Continue Shopping” 时，清除非收藏商品
const continueBtn = document.querySelector(".btn.btn-continue-shopping");
if (continueBtn) {
  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // 保留 favourites，清除其它
    const favourites = localStorage.getItem("favourites");
    localStorage.clear();
    if (favourites) {
      localStorage.setItem("favourites", favourites);
    }

    // 跳转页面
    window.location.href = "../html/ProductList.html";
  });
}});