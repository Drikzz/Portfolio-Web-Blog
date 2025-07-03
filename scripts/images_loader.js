const secImagesCon = document.querySelector('.section-images-container');

// Function to load images dynamically
function loadImages() {

  for (let day = 0; day <= 1; day++) {

    for (let i = 1; i <= 4; i++) {
      const img = document.createElement('img');
      img.src = `../assets/images/day-${day}/${i}.jpg`;
      img.alt = `Day ${day} - Image ${i}`;
      img.classList.add('section-image');

      img.onload = () => {
        secImagesCon.appendChild(img);
      };

      img.onerror = () => {
        console.log(`Missing: day-${day}/${i}.jpg`);
      };

    }

  }

}

// loadImages();