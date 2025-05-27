window.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryListContainer = document.getElementById("checkout-summary-products");
    const subtotalSpan = document.querySelector(".summary-row span:last-child");
    const totalNum = document.getElementById("total-num");
   
    document.addEventListener("DOMContentLoaded", () => {
        const checkoutBtn = document.querySelector(".go-checkout-btn");
      
        if (checkoutBtn) {
          checkoutBtn.addEventListener("click", () => {
            window.location.href = "../html/CheckoutPage.html";
          });
        }
      });
    
    document.querySelectorAll(".pay-icon").forEach(button => {
        button.addEventListener("click", () => {
          document.querySelectorAll(".pay-icon").forEach(btn => btn.classList.remove("selected"));
          button.classList.add("selected");
        });
      });

    document.querySelector(".btn-checkout").addEventListener("click", (e) => {
        const form = document.getElementById("checkout-info");
        if (!form.checkValidity()) {
          e.preventDefault(); // 阻止默认提交行为
          form.reportValidity(); // 显示浏览器内置验证提示
        } else {
          // 表单通过验证，执行下一步（比如提交或跳转）
          alert("Form is valid! Proceeding to payment...");
        }
      });
  
    let subtotal = 0;
  
    // 清空旧内容
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

    let selectedPaymentMethod = "";

document.querySelectorAll(".pay-icon").forEach(button => {
  button.addEventListener("click", () => {
    // 清除之前的选中状态
    document.querySelectorAll(".pay-icon").forEach(btn => btn.classList.remove("selected"));

    // 设置当前为选中状态
    button.classList.add("selected");

    // 保存选中的付款方式（按钮的文本内容）
    selectedPaymentMethod = button.textContent.trim();
    localStorage.setItem("paymentMethod", selectedPaymentMethod); // 存储到 localStorage
  });
});
  });