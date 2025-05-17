
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

  // 尺寸按钮
  const sizeContainer = document.querySelector(".size-options");
  sizeContainer.innerHTML = "";
  product.sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.textContent = size;
    sizeContainer.appendChild(btn);
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
