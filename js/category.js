window.addEventListener("DOMContentLoaded", () => {
  // 获取 DOM 元素
  const productGrid = document.getElementById("productGrid"); // 商品容器
  const categoryTitle = document.getElementById("category-title"); // 标题栏
  const loadMoreBtn = document.getElementById("load-more"); // “加载更多”按钮

  // 如果未找到元素或产品对象，终止加载
  if (!productGrid || typeof products !== "object") {
    console.error("Product grid or products object not found.");
    return;
  }

  // 获取 URL 中的 type 参数，例如 ?type=shoes
  const urlParams = new URLSearchParams(window.location.search);
  const categoryType = urlParams.get("type");

  // 如果未传入分类类型，显示错误提示并隐藏按钮
  if (!categoryType) {
    categoryTitle.textContent = "Category Not Found.";
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    return;
  }

  // 设置标题为分类名（首字母大写）
  categoryTitle.textContent =
    categoryType.charAt(0).toUpperCase() + categoryType.slice(1);

  // 根据产品的 category 字段过滤出目标商品
  const filteredEntries = Object.entries(products).filter(
    ([, item]) => item.category === categoryType
  );

  let currentIndex = 0; // 当前加载的索引位置
  const itemsPerPage = 3; // 每次加载的商品数

  // 渲染函数，每次调用渲染一批商品
  function renderProducts() {
    const slice = filteredEntries.slice(currentIndex, currentIndex + itemsPerPage);

    slice.forEach(([id, item]) => {
      const card = document.createElement("a");
      card.href = `ProductPage.html?id=${id}`; // 商品详情页跳转链接
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

    // 如果商品已全部加载完，隐藏按钮，否则继续显示
    if (currentIndex >= filteredEntries.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-block";
    }
  }

  // 初始加载
  renderProducts();

  // 点击“加载更多”按钮时加载下一批
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", renderProducts);
  }
});