
document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("searchIcon");
  const searchInput = document.getElementById("searchInput");

  // show the input box when click searchicon 
  searchIcon.addEventListener("click", () => {
    searchInput.style.display = "inline-block";
    searchInput.focus(); 
  });

  //press enter to search 
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim(); 
      if (query) {
        //jump to productlist which has similar elements 
        window.location.href = `ProductList.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
});