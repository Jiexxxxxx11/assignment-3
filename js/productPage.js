let selectedSize = null; // 当前选中的尺寸
let product = null; // 当前商品对象

// 页面加载完成后执行
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); // 从 URL 获取商品 ID

  // 如果找不到 ID 或该商品不存在，则显示错误信息
  if (!id || !products[id]) {
    document.body.innerHTML = "<h2>Product not found</h2>";
    return;
  }

  product = products[id]; // 根据 ID 获取商品信息

  // 设置商品文字信息
  document.querySelector(".brand").textContent = product.brand;
  document.querySelector(".name").textContent = product.name;
  document.querySelector(".price").textContent = `$${product.price.toFixed(2)} AUD`;
  document.querySelector(".color").textContent = product.color;
  document.querySelector(".description").textContent = product.description;
  document.querySelector(".delivery-text").textContent = product.delivery;
  document.querySelector(".details-text").textContent = product.details;

  // 渲染商品图片（主图 + 缩略图）
  const thumbnailContainer = document.querySelector(".thumbnail-images");
  const mainImage = document.querySelector(".main-image");
  thumbnailContainer.innerHTML = "";

  product.images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "thumbnail";
    img.addEventListener("click", () => {
      mainImage.src = src; // 点击缩略图更换主图
    });
    if (index === 0) mainImage.src = src; // 第一张图设为默认主图
    thumbnailContainer.appendChild(img);
  });

  // 渲染评论区
  const reviewSection = document.querySelector(".review-section");
  reviewSection.innerHTML = "";
  if (product.reviews.length === 0) {
    reviewSection.textContent = "No reviews yet."; // 无评论时提示
  } else {
    product.reviews.forEach(r => {
      const div = document.createElement("div");
      div.className = "review";
      div.innerHTML = `<strong>${r.user}</strong> (${r.rating}/5): ${r.comment}`;
      reviewSection.appendChild(div);
    });
  }

  // ====== 尺寸选择按钮 ======
  const sizeContainer = document.querySelector(".size-options");
  sizeContainer.innerHTML = "";
  product.sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.textContent = size;
    btn.addEventListener("click", () => {
      // 再次点击已选按钮取消选择
      if (selectedSize === btn) {
        btn.classList.remove("selected");
        selectedSize = null;
      } else {
        // 切换选中按钮状态
        if (selectedSize) selectedSize.classList.remove("selected");
        btn.classList.add("selected");
        selectedSize = btn;
      }
    });
    sizeContainer.appendChild(btn);
  });

  // ====== 收藏按钮功能（带 SVG 图标切换）======
  const favBtn = document.getElementById("fav-btn");
  const iconEmpty = document.getElementById("icon-empty"); // 空心图标
  const iconFilled = document.getElementById("icon-filled"); // 实心图标

  favBtn.addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size before adding to favourites.");
      return;
    }

    favBtn.classList.toggle("active"); // 切换激活状态
    const isActive = favBtn.classList.contains("active");

    // 切换图标显示状态
    iconEmpty.style.display = isActive ? "none" : "inline-block";
    iconFilled.style.display = isActive ? "inline-block" : "none";

    const sizeText = selectedSize.textContent;
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    // 检查是否已收藏
    const exists = favourites.some(fav => fav.id === id && fav.size === sizeText);

    if (isActive && !exists) {
      // 添加收藏
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
      // 取消收藏
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

    // 临时状态显示“已添加”
    addBtn.disabled = true;
    addBtn.textContent = "Added!";
    setTimeout(() => {
      addBtn.disabled = false;
      addBtn.textContent = "ADD TO BAG";
    }, 1500);
  });

  // ====== 图标点击跳转购物车页面 ======
  document.getElementById("cart-icon").addEventListener("click", () => {
    window.location.href = "../html/cartPage.html";
  });

  document.getElementById("bag-icon").addEventListener("click", () => {
    window.location.href = "../html/cartPage.html";
  });
});