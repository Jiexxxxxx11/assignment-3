// 等待页面加载完成后执行
window.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("productGrid");       // 商品展示容器
  const loadMoreBtn = document.getElementById("load-more");         // “加载更多”按钮
  const categoryTitle = document.getElementById("category-title"); // 类别标题（如果不存在可忽略）
  const navButtons = document.querySelectorAll(".nav-button");      // 顶部筛选按钮集合

  // 如果找不到容器或产品数据未定义，停止执行
  if (!productGrid || typeof products !== "object") {
    console.error("Product grid or products object not found.");
    return;
  }

  let allEntries = Object.entries(products); // 所有产品（数组形式）
  let filteredEntries = [];                  // 筛选后的产品
  let currentIndex = 0;                      // 当前加载到的索引
  const itemsPerPage = 3;                    // 每次加载的数量

  // 根据筛选条件过滤产品
  function filterProducts(filter) {
    if (filter.type === "new") {
      filteredEntries = allEntries; // 显示所有产品作为“新品”
      if (categoryTitle) categoryTitle.textContent = "New Arrivals";
    }

    // 根据性别筛选
    if (filter.gender) {
      filteredEntries = allEntries.filter(
        ([, item]) =>
          Array.isArray(item.gender)
            ? item.gender.includes(filter.gender)
            : item.gender === filter.gender
      );
      if (categoryTitle)
        categoryTitle.textContent = filter.gender.charAt(0).toUpperCase() + filter.gender.slice(1);
    }

    // 根据年龄筛选
    if (filter.age) {
      filteredEntries = filteredEntries.filter(
        ([, item]) => item.age === filter.age
      );
      if (categoryTitle)
        categoryTitle.textContent = filter.age.charAt(0).toUpperCase() + filter.age.slice(1);
    }

    // 根据品牌筛选
    if (filter.brand) {
      filteredEntries = filteredEntries.filter(
        ([, item]) => item.brand === filter.brand
      );
      if (categoryTitle)
        categoryTitle.textContent = filter.brand.charAt(0).toUpperCase() + filter.brand.slice(1);
    }

    // 根据是否促销筛选
    if (filter.sale) {
      filteredEntries = filteredEntries.filter(
        ([, item]) => item.sale === filter.sale
      );
      if (categoryTitle)
        categoryTitle.textContent = filter.sale.charAt(0).toUpperCase() + filter.sale.slice(1);
    }

    // 清空原有内容并重新渲染
    currentIndex = 0;
    productGrid.innerHTML = "";
    renderProducts();
  }

  // 渲染商品卡片
  function renderProducts() {
    const slice = filteredEntries.slice(currentIndex, currentIndex + itemsPerPage);

    slice.forEach(([id, item]) => {
      const card = document.createElement("a");
      card.href = `ProductPage.html?id=${id}`; // 跳转到商品详情页
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

    // 控制“加载更多”按钮显示与否
    if (currentIndex >= filteredEntries.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-block";
    }
  }

  // 为所有分类按钮添加点击事件
  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      navButtons.forEach(btn => btn.classList.remove("active")); // 移除所有按钮高亮
      button.classList.add("active");                            // 当前按钮高亮

      // 获取各类筛选条件
      const gender = button.getAttribute("data-gender");
      const age = button.getAttribute("data-age");
      const brand = button.getAttribute("data-brand");
      const sale = button.getAttribute("data-sale");
      const type = button.getAttribute("data-type");

      // 传入条件进行过滤
      filterProducts({ gender, age, brand, sale, type });
    });
  });

  // 页面加载后默认显示新品
  filterProducts({ type: "new" });

  // 加载更多按钮功能
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", renderProducts);
  }
});