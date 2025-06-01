window.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("productGrid");
  const categoryTitle = document.getElementById("category-title");
  const loadMoreBtn = document.getElementById("load-more");

  if (!productGrid || typeof products !== "object") {
    console.error("Product grid or products object not found.");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const categoryType = urlParams.get("type"); // 例如 shoes / tops

  if (!categoryType) {
    categoryTitle.textContent = "Category Not Found.";
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    return;
  }

  // 设置标题
  categoryTitle.textContent =
    categoryType.charAt(0).toUpperCase() + categoryType.slice(1);

  // 根据 category 字段筛选
  const filteredEntries = Object.entries(products).filter(
    ([, item]) => item.category === categoryType
  );

  let currentIndex = 0;
  const itemsPerPage = 3;

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
            ${item.sale ? `<s>$${(item.price + 20).toFixed(2)}</s>` : ""}
            $${item.price.toFixed(2)} AUD
          </span>
        </div>
      `;
      productGrid.appendChild(card);
    });

    currentIndex += itemsPerPage;
    if (currentIndex >= filteredEntries.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-block";
    }
  }

  renderProducts();

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", renderProducts);
  }
});