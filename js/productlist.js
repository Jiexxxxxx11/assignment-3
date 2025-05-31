window.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("productGrid");

  if (!productGrid || typeof products !== "object") {
    console.error("Product grid or products object not found.");
    return;
  }

  // ✅ 定义 filteredEntries：将所有产品条目转换为数组
  const filteredEntries = Object.entries(products);

  // 🔁 渲染每个商品卡片
  filteredEntries.forEach(([id, item]) => {
    const card = document.createElement("a");
    card.href = `ProductPage.html?id=${id}`;
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.images[0]}" alt="${item.name}">
      <div class="product-info">
        <h3>${item.brand}</h3>
        <p>${item.name}</p>
        <span class="price">
          ${item.sale ? `<s>$${(item.price + 20).toFixed(2)}</s> ` : ""}
          $${item.price.toFixed(2)} AUD
        </span>
      </div>
    `;
    productGrid.appendChild(card);
  });
});