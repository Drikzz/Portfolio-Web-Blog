const mobileNav = document.querySelector('.mobile-nav');
const hamburger = document.querySelector('.fa-bars');
const navBlur = document.querySelector('.nav-blur');
const body = document.body;

function openMobileNav() {
  
  mobileNav.classList.toggle('active');
  hamburger.classList.toggle('active');
  body.classList.toggle('no-scroll');
}

navBlur.addEventListener('click', () => {
  mobileNav.classList.remove('active');
  hamburger.classList.remove('active');
  body.classList.remove('no-scroll');
});