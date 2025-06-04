// menu.js

// 获取菜单按钮、侧边菜单、遮罩层与关闭按钮
const menuBtn = document.getElementById('menuIcon');     // 点击此图标打开菜单
const sideMenu = document.getElementById('sideMenu');     // 侧边栏菜单容器
const overlay = document.getElementById('overlay');       // 点击遮罩可关闭菜单
const closeBtn = document.getElementById('closeMenu');    // 如果有关闭按钮可用于关闭（但当前未使用）

// --- 打开菜单 ---
menuBtn.addEventListener('click', () => {
  sideMenu.classList.add('active');   // 显示菜单
  overlay.classList.add('active');    // 显示遮罩层
});

// --- 点击遮罩关闭菜单 ---
overlay.addEventListener('click', () => {
  sideMenu.classList.remove('active');  // 隐藏菜单
  overlay.classList.remove('active');   // 隐藏遮罩层
});