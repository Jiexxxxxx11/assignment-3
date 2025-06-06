
const menuBtn = document.getElementById('menuIcon');     
const sideMenu = document.getElementById('sideMenu');     
const overlay = document.getElementById('overlay');       

// open the sidemenu
menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('active');   
  overlay.classList.add('active');   
});

// close the sidemenu
overlay.addEventListener('click', () => {
  sideMenu.classList.remove('active');  
  overlay.classList.remove('active');  
});