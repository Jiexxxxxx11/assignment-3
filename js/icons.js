// get the reddot
const heartDot = document.getElementById("heart");
const cartDot = document.getElementById("cart");

// favourite
const favouriteButton = document.querySelector(".btn-fav");
favouriteButton.addEventListener("click", () => {
  heartDot.classList.add("active");
});

// bag
const addToCartButton = document.querySelector(".btn-add");
addToCartButton.addEventListener("click", () => {
  cartDot.classList.add("active");
});