window.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("productGrid");
  const loadMoreBtn = document.getElementById("load-more");

  if (!productGrid || typeof products !== "object") {
    console.error("Product grid or products object not found.");
    return;
  }

  // ✅ 定义 filteredEntries：将所有产品条目转换为数组,
  const filteredEntries = Object.entries(products);
  let currentIndex = 0;
  const itemsPerPage = 3;

  // 🔁 渲染每个商品卡片
  function renderProducts() {
    const slice = filteredEntries.slice(currentIndex, currentIndex + itemsPerPage);

  slice.forEach(([id, item]) => {
    const card = document.createElement("a");
    card.href = `ProductPage.html?id=${id}`;
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.images[0]}" alt="${item.name}">
      <div class="product-info">
        <h3>${item.brand}</h3>
        <p>${item.name}</p>
        <span class="price ${item.sale ? 'sale-price' : ''}">
          ${item.sale ? `<s>$${(item.price + 20).toFixed(2)}</s> ` : ""}
          $${item.price.toFixed(2)} AUD
        </span>
      </div>
    `;
    productGrid.appendChild(card);
  });

  currentIndex += itemsPerPage;

  //如果显示完了就隐藏按钮
  if (currentIndex >= filteredEntries.length) {
    loadMoreBtn.style.display = "none";
  }
}
 //先渲染前三个
  renderProducts();

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      renderProducts();
    });
  }
});