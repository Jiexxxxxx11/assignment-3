let selectedSize = null;
let product = null;

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id || !products[id]) {
    document.body.innerHTML = "<h2>Product not found</h2>";
    return;
  }

  product = products[id];

  document.querySelector(".brand").textContent = product.brand;
  document.querySelector(".name").textContent = product.name;
  document.querySelector(".price").textContent = `$${product.price.toFixed(2)} AUD`;
  document.querySelector(".color").textContent = product.color;
  document.querySelector(".description").textContent = product.description;
  document.querySelector(".delivery-text").textContent = product.delivery;
  document.querySelector(".details-text").textContent = product.details;

  const thumbnailContainer = document.querySelector(".thumbnail-images");
  const mainImage = document.querySelector(".main-image");

  thumbnailContainer.innerHTML = "";
  product.images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "thumbnail";
    img.addEventListener("click", () => {
      mainImage.src = src;
    });
    if (index === 0) mainImage.src = src;
    thumbnailContainer.appendChild(img);
  });

  const reviewSection = document.querySelector(".review-section");
  reviewSection.innerHTML = "";
  if (product.reviews.length === 0) {
    reviewSection.textContent = "No reviews yet.";
  } else {
    product.reviews.forEach(r => {
      const div = document.createElement("div");
      div.className = "review";
      div.innerHTML = `<strong>${r.user}</strong> (${r.rating}/5): ${r.comment}`;
      reviewSection.appendChild(div);
    });
  }

  // ====== 尺寸选择 ======
  const sizeContainer = document.querySelector(".size-options");
  sizeContainer.innerHTML = "";
  product.sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.textContent = size;
    btn.addEventListener("click", () => {
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

  // ====== 收藏功能（增强）======
  const favBtn = document.getElementById("fav-btn");
  const favIcon = document.getElementById("fav-icon");

  favBtn.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size before adding to favourites.");
      return;
    }

    favBtn.classList.toggle("active");
    const sizeText = selectedSize ? selectedSize.textContent : "";
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    const exists = favourites.some(fav => fav.id === id && fav.size === sizeText);

    if (favBtn.classList.contains("active")) {
      favIcon.textContent = "♥";
      if (!exists) {
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
    } else {
      favIcon.textContent = "♡";
      const updated = favourites.filter(fav => !(fav.id === id && fav.size === sizeText));
      localStorage.setItem("favourites", JSON.stringify(updated));
    }
  });

  // ====== 添加到购物车功能 ======
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

    addBtn.disabled = true;
    addBtn.textContent = "Added!";
    setTimeout(() => {
      addBtn.disabled = false;
      addBtn.textContent = "ADD TO BAG";
    }, 1500);
  });

  // ====== 图标跳转 ======
  document.getElementById("cart-icon").addEventListener("click", () => {
    window.location.href = "../html/cartPage.html";
  });

  document.getElementById("bag-icon").addEventListener("click", () => {
    window.location.href = "../html/cartPage.html";
  });
});