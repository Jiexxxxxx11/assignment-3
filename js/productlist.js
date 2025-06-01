window.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("productGrid");
  const loadMoreBtn = document.getElementById("load-more");
  const categoryTitle = document.getElementById("category-title"); // 如果没有可以不管
  const navButtons = document.querySelectorAll(".nav-button");

  if (!productGrid || typeof products !== "object") {
    console.error("Product grid or products object not found.");
    return;
  }

  let allEntries = Object.entries(products);
  let filteredEntries = [];
  let currentIndex = 0;
  const itemsPerPage = 3;

  function filterProducts(filter) {
    if (filter.type === "new") {
      filteredEntries = allEntries;
      if (categoryTitle) categoryTitle.textContent = "New Arrivals";
    }
    
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

    if (filter.age) {
      filteredEntries = filteredEntries.filter(
        ([, item]) => item.age === filter.age
      );
      if (categoryTitle)
        categoryTitle.textContent = filter.age.charAt(0).toUpperCase() + filter.age.slice(1);
    }
    
    if (filter.brand) {
      filteredEntries = filteredEntries.filter(
        ([, item]) => item.brand === filter.brand
      );
      if (categoryTitle)
        categoryTitle.textContent = filter.brand.charAt(0).toUpperCase() + filter.brand.slice(1);
    }
    if (filter.sale) {
      filteredEntries = filteredEntries.filter(
        ([, item]) => item.sale === filter.sale
      );
      if (categoryTitle) categoryTitle.textContent = filter.sale.charAt(0).toUpperCase() + filter.sale.slice(1);
    }

    currentIndex = 0;
    productGrid.innerHTML = ""; // 清空原有
    renderProducts();
  }

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

  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      navButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const gender = button.getAttribute("data-gender");
      const age = button.getAttribute("data-age");
      const brand = button.getAttribute("data-brand");
      const sale = button.getAttribute("data-sale");
      const type = button.getAttribute("data-type");
      filterProducts({ gender, age, brand, sale, type });
    });
  });

  // 默认加载 “New Arrivals”
  filterProducts({ type: "new" });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", renderProducts);
  }
});