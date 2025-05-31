document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("searchIcon");
    const searchInput = document.getElementById("searchInput");
  
    if (!searchIcon || !searchInput) {
      console.warn("searchIcon 或 searchInput 没找到，请检查 HTML 中是否存在对应的 id。");
      return;
    }
  
    searchIcon.addEventListener("click", () => {
      searchInput.style.display = "inline-block";
      searchInput.focus();
    });
  
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `ProductList.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  });