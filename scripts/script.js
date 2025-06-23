// NavBar Variables
const hamburger = document.querySelector('.fa-bars');
const mobileNav = document.querySelector('.mobile-nav');
const navBlur = document.querySelector('.nav-blur');
const navLinks = document.querySelectorAll('.nav-bar a');

// Body
const wholeContainer = document.querySelector('.whole-container');

// Vanta
let vantaEffect;

// openMobile Nav
function openMobileNav() {
  
  mobileNav.classList.toggle('active');
  hamburger.classList.toggle('active');
  wholeContainer.classList.toggle('no-scroll');
}

function getTheme() {
  return localStorage.getItem('theme') || 'dark'; // fallback to dark
}

function updateThemeIcons(theme) {
  const sun = document.getElementById('sun-icon');
  const moon = document.getElementById('moon-icon');
  // const mSun = document.getElementById('m-sun-icon');
  // const mMoon = document.getElementById('m-moon-icon');

  if (theme === 'light') {
    sun.style.display = 'none';
    moon.style.display = 'inline-block';
    // mSun.style.display = 'none';
    // mMoon.style.display = 'inline-block';
  } else {
    sun.style.display = 'inline-block';
    moon.style.display = 'none';
    // mSun.style.display = 'inline-block';
    // mMoon.style.display = 'none';
  }
}

function applyTheme() {
  const theme = getTheme();
  document.body.classList.toggle('light', theme === 'light');
  updateThemeIcons(theme);
}

function initVanta() {
  const theme = getTheme();

  if (vantaEffect) vantaEffect.destroy();

  vantaEffect = VANTA.TRUNK({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    spacing: 8.00,
    chaos: 2.00,
    color: theme === 'light' ? 0x4a4444 : 0x4a4444,        // light mode color
    backgroundColor: theme === 'light' ? 0xFFFFFF : 0x222222 // light bg / dark bg
  });
}

function toggleTheme() {
  const current = getTheme();
  const newTheme = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  applyTheme();
  initVanta();
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  initVanta();
});


navBlur.addEventListener('click', () => {
  mobileNav.classList.remove('active');
  hamburger.classList.remove('active');
  wholeContainer.classList.remove('no-scroll');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    hamburger.classList.remove('active');
    wholeContainer.classList.remove('no-scroll');
  })
});