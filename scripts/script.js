// NavBar Variables
const hamburger = document.querySelector('.fa-bars');
const mobileNav = document.querySelector('.mobile-nav');
const navBlur = document.querySelector('.nav-blur');
const navLinks = document.querySelectorAll('.nav-bar a');

const imagesDayOne = document.querySelector('.section-images-container');

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

function applyTheme() {
  const theme = getTheme();
  // document.body.classList.toggle('light', theme === 'light');
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme);
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
    color: theme === 'light' ? 0x121212 : 0x555555,        // light mode color
    backgroundColor: theme === 'light' ? 0xE0E0E0 : 0x121212 // light bg / dark bg
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

});