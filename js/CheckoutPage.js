window.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const summaryListContainer = document.getElementById("checkout-summary-products");
  const subtotalSpan = document.querySelector(".summary-row span:last-child");
  const totalNum = document.getElementById("total-num");
  const form = document.getElementById("checkout-info");
  const submitBtn = document.querySelector(".btn-checkout");

  // 渲染商品信息
  let subtotal = 0;
  summaryListContainer.innerHTML = "";
  cart.forEach(item => {
    subtotal += item.price;
    const itemDiv = document.createElement("div");
    itemDiv.className = "checkout-product";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <p><strong>${item.brand}</strong></p>
        <p>${item.name}</p>
        <p>Size: ${item.size}</p>
        <p>Colour: Black</p>
        <p>QTY: 1</p>
        <p>$${item.price.toFixed(2)}</p>
      </div>
    `;
    summaryListContainer.appendChild(itemDiv);
  });
  subtotalSpan.textContent = `$${subtotal.toFixed(2)} AUD`;
  totalNum.textContent = `$${subtotal.toFixed(2)} AUD`;

  document.querySelectorAll(".pay-icon").forEach(button => {
    button.addEventListener("click", () => {
      const isSelected = button.classList.contains("selected");
  
      // 先移除所有按钮的 selected 状态
      document.querySelectorAll(".pay-icon").forEach(btn => btn.classList.remove("selected"));
  
      // 如果本次点击的是之前没选中的按钮，则添加 selected
      if (!isSelected) {
        button.classList.add("selected");
      }
      // 如果是已选中，则什么都不做，相当于取消
    });
  });

  // 提交表单并跳转到确认页
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // 获取用户输入信息
    const selectedPayment = document.querySelector(".pay-icon.selected");
    const userInfo = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      address: document.getElementById("address").value,
      suburb: document.getElementById("suburb").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      postcode: document.getElementById("postcode").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      paymentMethod: selectedPayment ? selectedPayment.textContent.trim() : "Not selected",
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("paymentMethod", userInfo.paymentMethod);
    localStorage.setItem("cart", JSON.stringify(cart));

    // 跳转页面
    window.location.href = "../html/ConfirmationPage.html";
  });
});