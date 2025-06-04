// 当文档加载完成后执行
document.addEventListener("DOMContentLoaded", () => {
  // 获取搜索图标和搜索输入框元素
  const searchIcon = document.getElementById("searchIcon");
  const searchInput = document.getElementById("searchInput");

  // 如果任意一个元素未找到，给出警告并退出函数
  if (!searchIcon || !searchInput) {
    console.warn("searchIcon 或 searchInput 没找到，请检查 HTML 中是否存在对应的 id。");
    return;
  }

  // 点击搜索图标时显示输入框并聚焦
  searchIcon.addEventListener("click", () => {
    searchInput.style.display = "inline-block"; // ✅ 显示搜索框
    searchInput.focus(); // ✅ 聚焦光标
  });

  // 在输入框中按下 Enter 键时触发搜索跳转
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim(); // ✅ 去除空格
      if (query) {
        // ✅ 跳转到 ProductList 页面并携带搜索参数
        window.location.href = `ProductList.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
});