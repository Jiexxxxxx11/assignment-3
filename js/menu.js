// menu.js
const menuBtn = document.getElementById('menuIcon');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeMenu');

menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('active');
  overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlay.classList.remove('active');
});