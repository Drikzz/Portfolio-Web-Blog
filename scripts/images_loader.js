const sectionNumbers = [1, 2, 3, 4, 5];
const sectionImages = {
  1: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  2: ['1.jpg', '2.png', '3.jpg', '4.png'],
  3: ['1.png', '2.png', '3.jpg', '4.png'],
  4: ['1.png', '2.png', '3.png', '4.png'],
  5: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  // 6: ['1.jpg', '2.jpg', '3.jpg', '4.jpg']
};

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

document.addEventListener('DOMContentLoaded', () => {

  // Loop through all sections
  for (let i = 0; i < 5; i++) {
    loadImagesForSection(sectionNumbers[i]);
  }
  
});