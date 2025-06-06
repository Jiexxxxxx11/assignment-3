//clear product info 
let selectedSize = null; 
let product = null; 

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); 
  product = products[id]; // use the products id to find it 

  document.querySelector(".brand").textContent = product.brand;
  document.querySelector(".name").textContent = product.name;
  document.querySelector(".price").textContent = `$${product.price.toFixed(2)} AUD`;
  document.querySelector(".color").textContent = product.color;
  document.querySelector(".description").textContent = product.description;
  document.querySelector(".delivery-text").textContent = product.delivery;
  document.querySelector(".details-text").textContent = product.details;

  // products images 
  const thumbnailContainer = document.querySelector(".thumbnail-images");
  const mainImage = document.querySelector(".main-image");
  thumbnailContainer.innerHTML = "";

  product.images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "thumbnail";
    img.addEventListener("click", () => {
      mainImage.src = src; // click the image to change 
    });
    if (index === 0) mainImage.src = src; // default first image is main image 
    thumbnailContainer.appendChild(img);
  });

  const reviewSection = document.querySelector(".review-section");
  reviewSection.innerHTML = "";
  if (product.reviews.length === 0) {
    reviewSection.textContent = "No reviews yet."; // if don't have reviews
  } else {
    product.reviews.forEach(r => {
      const div = document.createElement("div");
      div.className = "review";
      div.innerHTML = `<strong>${r.user}</strong> (${r.rating}/5): ${r.comment}`;
      reviewSection.appendChild(div);
    });
  }

  // btn for size choicing 
  const sizeContainer = document.querySelector(".size-options");
  sizeContainer.innerHTML = "";
  product.sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.textContent = size;
    btn.addEventListener("click", () => {
      // click again to cancel select 
      if (selectedSize === btn) {
        btn.classList.remove("selected");
        selectedSize = null;
      } else {
        if (selectedSize) selectedSize.classList.remove("selected");
        btn.classList.add("selected");
        selectedSize = btn;
      }
    });
    sizeContainer.appendChild(btn);
  });

  // btn of fav(change the css style)
  const favBtn = document.getElementById("fav-btn");
  const iconEmpty = document.getElementById("icon-empty"); 
  const iconFilled = document.getElementById("icon-filled"); 

  favBtn.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size before adding to favourites.");
      return;
    }

    favBtn.classList.toggle("active"); 
    const isActive = favBtn.classList.contains("active");

    iconEmpty.style.display = isActive ? "none" : "inline-block";
    iconFilled.style.display = isActive ? "inline-block" : "none";
    
    //favourite function 
    const sizeText = selectedSize.textContent;
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const exists = favourites.some(fav => fav.id === id && fav.size === sizeText);

    if (isActive && !exists) {
      favourites.push({
        id,
        name: product.name,
        brand: product.brand,
        size: sizeText,
        price: product.price,
        image: product.images[0]
      });
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }

    if (!isActive) {
      const updated = favourites.filter(fav => !(fav.id === id && fav.size === sizeText));
      localStorage.setItem("favourites", JSON.stringify(updated));
    }
  });

  //adding to cart function 
  const addBtn = document.querySelector(".btn-add");

  addBtn.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const cartItem = {
      id: id,
      name: product.name,
      brand: product.brand,
      size: selectedSize.textContent,
      price: product.price,
      image: product.images[0],
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    // show the condition (added)
    addBtn.disabled = true;
    addBtn.textContent = "Added!";
    setTimeout(() => {
      addBtn.disabled = false;
      addBtn.textContent = "ADD TO BAG";
    }, 1500);
  });

  // click the icon to get cartpage 
  document.getElementById("cart-icon").addEventListener("click", () => {
    window.location.href = "CartPage.html";
  });

  document.getElementById("bag-icon").addEventListener("click", () => {
    window.location.href = "CartPage.html";
  });
});