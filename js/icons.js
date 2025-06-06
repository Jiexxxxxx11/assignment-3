// if customers add sth into cart or fav, show the reddot
const heartDot = document.getElementById("heart");
const cartDot = document.getElementById("cart");

// favourite
const favouriteButton = document.querySelector(".btn-fav");
favouriteButton.addEventListener("click", () => {
  
  heartDot.classList.add("active");
});
// cart 
const addToCartButton = document.querySelector(".btn-add");
addToCartButton.addEventListener("click", () => {

  cartDot.classList.add("active");
});