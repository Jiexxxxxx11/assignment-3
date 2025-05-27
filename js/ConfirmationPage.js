window.addEventListener("DOMContentLoaded", () => {
    const orderListContainer = document.getElementById("order-product-list");
    const orderNumberDisplay = document.getElementById("order-id"); // 修正 ID
    const deliveryDateDisplay = document.getElementById("delivery-date"); // 修正 ID
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const paymentMethod = localStorage.getItem("paymentMethod") || "Not specified";
  
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
  
    orderNumberDisplay.textContent = generateOrderId();
    deliveryDateDisplay.textContent = getDeliveryDate();
  
    const paymentNote = document.createElement("p");
    paymentNote.innerHTML = `Payment Method: <strong>${paymentMethod}</strong><br>Total: <strong>$${subtotal.toFixed(2)} AUD</strong>`;
    orderListContainer.appendChild(paymentNote);
  });