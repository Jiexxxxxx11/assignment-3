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

  // 文本信息填充
  document.querySelector(".brand").textContent = product.brand;
  document.querySelector(".name").textContent = product.name;
  document.querySelector(".price").textContent = `$${product.price.toFixed(2)} AUD`;
  document.querySelector(".color").textContent = product.color;
  document.querySelector(".description").textContent = product.description;
  document.querySelector(".details-text").textContent = product.details;
  const delivery = document.querySelector(".delivery-text");
  if (delivery) delivery.textContent = "Free delivery and returns.";

  // 图片渲染
  const thumbnailContainer = document.querySelector(".thumbnail-images");
  const mainImage = document.querySelector(".main-image");
  product.images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "thumbnail";
    img.addEventListener("click", () => {
      mainImage.src = src;
    });
    thumbnailContainer.appendChild(img);
    if (index === 0) mainImage.src = src;
  });

  // 尺寸选择
  const sizeContainer = document.querySelector(".size-options");
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

  // 评论
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

  // 收藏功能
  const favBtn = document.getElementById("fav-btn");
  const iconEmpty = document.getElementById("icon-empty");
  const iconFilled = document.getElementById("icon-filled");

  if (favBtn && iconEmpty && iconFilled) {
    favBtn.addEventListener("click", () => {
      if (!selectedSize) {
        alert("Please select a size before adding to favourites.");
        return;
      }

      favBtn.classList.toggle("active");
      const isActive = favBtn.classList.contains("active");

      iconEmpty.style.display = isActive ? "none" : "inline-block";
      iconFilled.style.display = isActive ? "inline-block" : "none";

      const sizeText = selectedSize.textContent;
      const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

      if (isActive && !favourites.some(fav => fav.id === id && fav.size === sizeText)) {
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
  }

  // 加入购物车
  const addBtn = document.querySelector(".btn-add");
  addBtn.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const cartItem = {
      id,
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

  // 图标跳转
  document.getElementById("cart-icon")?.addEventListener("click", () => {
    window.location.href = "CartPage.html";
  });
  document.getElementById("bag-icon")?.addEventListener("click", () => {
    window.location.href = "CartPage.html";
  });
});