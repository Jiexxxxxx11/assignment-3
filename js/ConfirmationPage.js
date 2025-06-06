window.addEventListener("DOMContentLoaded", () => {
  const orderListContainer = document.getElementById("order-product-list");
  const orderNumberDisplay = document.getElementById("order-id"); 
  const deliveryDateDisplay = document.getElementById("delivery-date"); 

  // get the products info 
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let paymentMethod = localStorage.getItem("paymentMethod");

  // if customer didn't choice patment method，default "Credit Card"
  if (!paymentMethod || paymentMethod === "Not selected" || paymentMethod === "Not specified") {
    paymentMethod = "Credit Card";
  }

  let subtotal = 0;

  // get product info from products.js
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

  // generate random order num
  const generateOrderId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  // delivery date expected, add 3 days
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

  // show all the info about the order 
  const finalPaymentMethod = paymentMethod === "Not specified" ? "Credit/Debit Card" : paymentMethod;
  const paymentNote = document.createElement("p");
  paymentNote.innerHTML = `Payment Method: <strong>${finalPaymentMethod}</strong><br>Total: <strong>$${subtotal.toFixed(2)} AUD</strong>`;
  orderListContainer.appendChild(paymentNote);

  // when click continue btn, clear all data in cart 
  const continueBtn = document.querySelector(".btn.btn-continue-shopping");
  if (continueBtn) {
    continueBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // only keep favourite items 
      const favourites = localStorage.getItem("favourites");
      localStorage.clear();
      if (favourites) {
        localStorage.setItem("favourites", favourites);
      }

      // jump to productlist continue shopping 
      window.location.href = "ProductList.html";
    });
  }
});