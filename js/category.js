window.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const loadMoreBtn = document.getElementById("load-more");
    const categoryTitle = document.getElementById("category-title");
    const navButtons = document.querySelectorAll(".nav-button");
  
    if (!productGrid || typeof products !== "object") {
      console.error("Product grid or products object not found.");
      return;
    }
  
    let allEntries = Object.entries(products);
    let filteredEntries = [];
    let currentIndex = 0;
    const itemsPerPage = 3;
  
    // ✅ 筛选函数
    function filterProducts(filter) {
      if (filter.type === "new") {
        // 你可以自定义“新到”商品，比如直接用全部
        filteredEntries = allEntries;
        categoryTitle.textContent = "New Arrivals";
      } else if (filter.gender) {
        filteredEntries = allEntries.filter(
          ([, item]) =>
            Array.isArray(item.gender)
              ? item.gender.includes(filter.gender)
              : item.gender === filter.gender
        );
        categoryTitle.textContent = filter.gender.charAt(0).toUpperCase() + filter.gender.slice(1);
      }
  
      currentIndex = 0;
      productGrid.innerHTML = ""; // 清空原有
      renderProducts();
    }
  
    // ✅ 渲染函数
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
      if (currentIndex >= filteredEntries.length) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "inline-block";
      }
    }
  
    // ✅ 点击导航按钮切换
    navButtons.forEach(button => {
      button.addEventListener("click", () => {
        // 更新按钮样式
        navButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        // 获取筛选条件
        const gender = button.getAttribute("data-gender");
        const type = button.getAttribute("data-type");
        filterProducts({ gender, type });
      });
    });
  
    // 默认加载 “New Arrivals”
    filterProducts({ type: "new" });
  
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", renderProducts);
    }
  });