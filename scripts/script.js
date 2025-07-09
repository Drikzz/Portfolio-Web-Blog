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

// Modal variables
let modalImages = [];
let modalIndex = 0;

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

// Modal functions
function openImageModal(imageSrc, images) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  
  modalImages = images;
  modalIndex = images.indexOf(imageSrc);
  
  modalImage.src = imageSrc;
  modal.style.display = 'flex';
  document.body.classList.add('no-scroll');
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = 'none';
  document.body.classList.remove('no-scroll');
}

function navigateModal(direction) {
  if (modalImages.length === 0) return;
  
  modalIndex += direction;
  
  if (modalIndex < 0) {
    modalIndex = modalImages.length - 1;
  } else if (modalIndex >= modalImages.length) {
    modalIndex = 0;
  }
  
  const modalImage = document.getElementById('modalImage');
  modalImage.src = modalImages[modalIndex];
}

function initializeImageModal() {
  const modal = document.getElementById('imageModal');
  const closeBtn = document.querySelector('.modal-close');
  const prevBtn = document.querySelector('.modal-prev');
  const nextBtn = document.querySelector('.modal-next');
  
  // Close modal events
  closeBtn.addEventListener('click', closeImageModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeImageModal();
  });
  
  // Navigation events
  prevBtn.addEventListener('click', () => navigateModal(-1));
  nextBtn.addEventListener('click', () => navigateModal(1));
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') closeImageModal();
      if (e.key === 'ArrowLeft') navigateModal(-1);
      if (e.key === 'ArrowRight') navigateModal(1);
    }
  });
}

function initializeProjectImages() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const images = card.querySelectorAll('.project-images, .project-thumbnail');
    const imageUrls = Array.from(images).map(img => img.src);
    
    images.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => openImageModal(img.src, imageUrls));
    });
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {

  applyTheme();
  initVanta();
  initializeImageModal();
  initializeProjectImages();

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