const hamburger = document.querySelector('.fa-bars');
const mobileNav = document.querySelector('.mobile-nav');
const navBlur = document.querySelector('.nav-blur');
const navLinks = document.querySelectorAll('.nav-bar a');
const wholeContainer = document.querySelector('.whole-container');

function openMobileNav() {
  
  mobileNav.classList.toggle('active');
  hamburger.classList.toggle('active');
  wholeContainer.classList.toggle('no-scroll');
}

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