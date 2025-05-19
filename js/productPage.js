
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id || !products[id]) {
    document.body.innerHTML = "<h2>Product not found</h2>";
    return;
  }

  const product = products[id];

  // 填充基础信息
  document.querySelector(".brand").textContent = product.brand;
  document.querySelector(".name").textContent = product.name;
  document.querySelector(".price").textContent = `$${product.price.toFixed(2)} AUD`;
  document.querySelector(".color").textContent = product.color;
  document.querySelector(".description").textContent = product.description;
  document.querySelector(".delivery-text").textContent = product.delivery;
  document.querySelector(".details-text").textContent = product.details;

  // 图片切换逻辑
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

  // 可选：加载评论
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
});

// 尺寸按钮
const sizeContainer = document.querySelector(".size-options");
sizeContainer.innerHTML = "";

let selectedSize = null;

product.sizes.forEach(size => {
  const btn = document.createElement("button");
  btn.className = "size-btn";
  btn.textContent = size;

  btn.addEventListener("click", () => {
    //if be selected, remove selected 
    if (selectedSize === btn) {
      btn.classList.remove("selected");
      selectedSize = null;
    } else {
      // remove selected class from previous button
    if (selectedSize) {
      selectedSize.classList.remove("selected");
    }
    btn.classList.add("selected");
    selectedSize = btn;}
  });
  sizeContainer.appendChild(btn);
});

//favourite button
const favBtn = document.getElementById("fav-btn");
const favIcon = document.getElementById("fav-icon");

favBtn.addEventListener("click", () => {
  favBtn.classList.toggle("active");
  if (favBtn.classList.contains("active")) {
    favIcon.textContent = "♥";
  } else {
    favIcon.textContent = "♡";
  }
});

// Add to cart button
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
    image: product.images[0], // Assuming the first image is the main one
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(cartItem);

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");

  addBtn.disabled = true;
  addBtn.textContent = "Added!";
  setTimeout(() => {
    addBtn.disabled = false;
    addBtn.textContent = "ADD TO BAG";
  }, 1500);
});


