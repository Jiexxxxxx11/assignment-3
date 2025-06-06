window.addEventListener("DOMContentLoaded", () => {
  // get cart and fav data from localstorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const itemSection = document.querySelector(".cart-items"); // if have products
  const itemList = document.querySelector(".cart-list");     // products list contanier 
  const emptyState = document.querySelector(".cart-empty");  // if cart is emtpy

  const favList = document.querySelector(".favourite-list"); // if have fav products
  const favSection = document.querySelector(".favourite-section"); // fav list contanier 
  const noFav = document.querySelector(".no-fav");           // if fav is empty

  let subtotal = 0; 

  // for cart page showing 
  if (cart.length === 0) {
    emptyState.classList.remove("hidden"); 
    itemSection.classList.add("hidden");   // if there is nothing in there 
  } else {
    emptyState.classList.add("hidden");
    itemSection.classList.remove("hidden");
    itemList.innerHTML = "";

    // cart function
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

  // fav products showing 
  if (favourites.length === 0) {
    favList.innerHTML = "";
    favSection.classList.remove("hidden");
    noFav.classList.remove("hidden");
  } else {
    favList.innerHTML = "";
    favSection.classList.remove("hidden");
    noFav.classList.add("hidden");
    // fav function 
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

  // update products price in total
  document.querySelectorAll(".summary-row span")[1].textContent = `$${subtotal.toFixed(2)} AUD`;
  document.getElementById("total-num").textContent = `$${subtotal.toFixed(2)} AUD`;

  // remove function for cart function
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", event => {
      const index = parseInt(event.target.getAttribute("data-index"));
      cart.splice(index, 1); 
      localStorage.setItem("cart", JSON.stringify(cart)); 
      location.reload(); // reload page auto
    });
  });

  // remove function for fav
  document.querySelectorAll(".remove-fav-btn").forEach(button => {
    button.addEventListener("click", event => {
      const index = parseInt(event.target.getAttribute("data-index"));
      favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      location.reload();
    });
  });

  //get to checkoutpage
  const checkoutBtn = document.querySelector(".go-checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "CheckoutPage.html"; Z
    });
  }
});