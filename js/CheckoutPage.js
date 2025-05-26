window.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryListContainer = document.querySelector(".checkout-summary-products");
    const subtotalSpan = document.querySelector(".summary-row span:last-child");
    const totalNum = document.getElementById("total-num");
  
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
  });