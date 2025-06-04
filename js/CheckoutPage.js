window.addEventListener("DOMContentLoaded", () => {
  // 从 localStorage 中获取购物车数据（若为空则为 []）
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 获取 DOM 元素
  const summaryListContainer = document.getElementById("checkout-summary-products"); // 商品展示容器
  const subtotalSpan = document.querySelector(".summary-row span:last-child"); // 小计显示区域
  const totalNum = document.getElementById("total-num"); // 总计显示区域
  const form = document.getElementById("checkout-info"); // 表单
  const submitBtn = document.querySelector(".btn-checkout"); // 提交按钮

  // --- 渲染商品信息 ---
  let subtotal = 0;
  summaryListContainer.innerHTML = "";

  cart.forEach(item => {
    subtotal += item.price;

    // 创建每个商品的展示块
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

  // 显示价格合计
  subtotalSpan.textContent = `$${subtotal.toFixed(2)} AUD`;
  totalNum.textContent = `$${subtotal.toFixed(2)} AUD`;

  // --- 支付方式选择按钮 ---
  document.querySelectorAll(".pay-icon").forEach(button => {
    button.addEventListener("click", () => {
      const isSelected = button.classList.contains("selected");

      // 先清除所有按钮的选中状态
      document.querySelectorAll(".pay-icon").forEach(btn => btn.classList.remove("selected"));

      // 如果当前按钮原本未选中，则添加选中状态
      if (!isSelected) {
        button.classList.add("selected");
      }
      // 否则点击的是已选中项，不作操作
    });
  });

  // --- 提交订单表单 ---
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); // 阻止默认提交行为

    // 如果表单未填写完整，提示用户
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // 获取用户填写信息
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

    // 保存信息到 localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("paymentMethod", userInfo.paymentMethod);
    localStorage.setItem("cart", JSON.stringify(cart));

    // 跳转到订单确认页
    window.location.href = "ConfirmationPage.html";
  });
});