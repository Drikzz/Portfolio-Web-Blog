const sectionNumbers = [1, 2, 3, 4, 5, 6, 7];
const sectionImages = {
  1: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  2: ['1.jpg', '2.png', '3.jpg', '4.png'],
  3: ['1.png', '2.png', '3.jpg', '4.png'],
  4: ['1.png', '2.png', '3.png', '4.png'],
  5: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  6: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  7: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
};

// gpt
// Gallery variables
let galleryImages = {};
let currentModalImages = [];
let currentModalIndex = 0;

function loadImagesForSection(day) {

  // Declare the container ID based on the day
  const container = document.querySelector(`.section-${day}-images-container`);

  // check if containers exists, if not, end
  if (!container) return;
  
  const images = sectionImages[day];
  if (!images) return;
  
  images.forEach(filename => {
    const img = document.createElement('img');
    img.src = `../assets/images/day-${day}/${filename}`;
    img.alt = `Day ${day} - ${filename}`;
    img.classList.add('section-image');
    container.appendChild(img);

    img.onerror = () => {
      console.log(`Missing: day-${day}/${filename}`);
    };
  });

}

// gpt
// Gallery functions
function loadGalleryImagesForDay(day) {
  const container = document.getElementById(`gallery-day-${day}`);
  if (!container) return;

  let imageIndex = 1;
  const images = [];

  function loadNextImage() {
    const img = document.createElement('img');
    const filename = `${imageIndex}.jpg`;
    img.src = `../assets/images/day-${day}/${filename}`;
    img.alt = `Day ${day} - Image ${imageIndex}`;
    img.classList.add('gallery-image');
    
    img.onload = () => {
      images.push(img.src);
      container.appendChild(img);
      
      // Add click event for modal
      img.addEventListener('click', () => openImageModal(img.src, images));
      
      imageIndex++;
      loadNextImage();
    };

    img.onerror = () => {
      // Try PNG if JPG fails
      if (filename.endsWith('.jpg')) {
        const pngFilename = `${imageIndex}.png`;
        img.src = `../assets/images/day-${day}/${pngFilename}`;
        
        img.onload = () => {
          images.push(img.src);
          container.appendChild(img);
          img.addEventListener('click', () => openImageModal(img.src, images));
          imageIndex++;
          loadNextImage();
        };
        
        img.onerror = () => {
          console.log(`No more images found for day ${day} after image ${imageIndex - 1}`);
          galleryImages[day] = images;
        };
      } else {
        console.log(`No more images found for day ${day} after image ${imageIndex - 1}`);
        galleryImages[day] = images;
      }
    };
  }

  loadNextImage();
}

function initializeGalleryTabs() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const containers = document.querySelectorAll('.gallery-day-container');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const day = tab.getAttribute('data-day');
      
      // Remove active class from all tabs and containers
      tabs.forEach(t => t.classList.remove('active'));
      containers.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding container
      tab.classList.add('active');
      document.querySelector(`.gallery-day-container[data-day="${day}"]`).classList.add('active');
    });
  });
}

function openImageModal(imageSrc, images) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  
  currentModalImages = images;
  currentModalIndex = images.indexOf(imageSrc);
  
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
  if (currentModalImages.length === 0) return;
  
  currentModalIndex += direction;
  
  if (currentModalIndex < 0) {
    currentModalIndex = currentModalImages.length - 1;
  } else if (currentModalIndex >= currentModalImages.length) {
    currentModalIndex = 0;
  }
  
  const modalImage = document.getElementById('modalImage');
  modalImage.src = currentModalImages[currentModalIndex];
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

document.addEventListener('DOMContentLoaded', () => {

  // Loop through all sections for existing functionality
  for (let i = 0; i < 8; i++) {
    loadImagesForSection(sectionNumbers[i]);
  }

  // gpt
  // Initialize gallery functionality
  initializeGalleryTabs();
  initializeImageModal();
  
  // Load gallery images for each day
  for (let day = 1; day <= 7; day++) {
    loadGalleryImagesForDay(day);
  }

});