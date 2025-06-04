// 获取右上角红点图标（用于显示用户是否有收藏或加入购物车）
const heartDot = document.getElementById("heart");
const cartDot = document.getElementById("cart");

// --- 收藏按钮逻辑 ---
const favouriteButton = document.querySelector(".btn-fav");
favouriteButton.addEventListener("click", () => {
  // 点击后，显示“红心”提示红点
  heartDot.classList.add("active");
});

// --- 加入购物车按钮逻辑 ---
const addToCartButton = document.querySelector(".btn-add");
addToCartButton.addEventListener("click", () => {
  // 点击后，显示“购物袋”提示红点
  cartDot.classList.add("active");
});