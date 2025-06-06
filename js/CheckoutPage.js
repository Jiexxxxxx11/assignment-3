window.addEventListener("DOMContentLoaded", () => {
  // get the data from cartpage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const summaryListContainer = document.getElementById("checkout-summary-products"); 
  const subtotalSpan = document.querySelector(".summary-row span:last-child"); 
  const totalNum = document.getElementById("total-num"); 
  const form = document.getElementById("checkout-info"); 
  const submitBtn = document.querySelector(".btn-checkout"); 

  // get products info 
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

  // caculate subtotal price
  subtotalSpan.textContent = `$${subtotal.toFixed(2)} AUD`;
  totalNum.textContent = `$${subtotal.toFixed(2)} AUD`;

  //payment methods choiced 
  document.querySelectorAll(".pay-icon").forEach(button => {
    button.addEventListener("click", () => {
      const isSelected = button.classList.contains("selected");

      // clear the btn be choiced style 
      document.querySelectorAll(".pay-icon").forEach(btn => btn.classList.remove("selected"));

      // if the btn not be selected, be selected 
      if (!isSelected) {
        button.classList.add("selected");
      }
    });
  });

  // submit customers details 
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); 

    // if isn't be filled, return tips 
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // get the customers patment methods and details
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

    // save these info to localstorage 
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("paymentMethod", userInfo.paymentMethod);
    localStorage.setItem("cart", JSON.stringify(cart));

    // link to confirmation page 
    window.location.href = "ConfirmationPage.html";
  });
});