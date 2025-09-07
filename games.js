const timeEl = document.getElementById('time');
    const updateTime = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2,'0');
      const m = d.getMinutes().toString().padStart(2,'0');
      timeEl.textContent = `${h}:${m}`;
    }
    updateTime();
    setInterval(updateTime, 30_000);

    
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function scrollByCard(dir = 1) {
  const scrollAmount = carousel.offsetWidth * 0.5; // scroll half the visible area
  carousel.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
}

    prevBtn.addEventListener('click', () => {
  console.log('Previous button clicked');
  scrollByCard(-1);
});

nextBtn.addEventListener('click', () => {
  console.log('Next button clicked');
  scrollByCard(1);
});

    
    window.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowRight') scrollByCard(1);
      if(e.key === 'ArrowLeft') scrollByCard(-1);
      if(e.key === 'Escape') hideFullscreen();
    });

   
const fullscreen = document.getElementById('fullscreen');
const fsBg = document.getElementById('fsBg');
const fsTitle = document.getElementById('fsTitle');
const exitBtn = document.getElementById('exitBtn');

function showFullscreen(fromCard) {
    const title = fromCard.getAttribute('data-title') || 'Game';
    const bg = fromCard.querySelector('.thumb').style.backgroundImage;
    const platform = fromCard.getAttribute('data-platform');
    const release = fromCard.getAttribute('data-release');
    const genre = fromCard.getAttribute('data-genre');
    const description = fromCard.getAttribute('data-description');  // Get description

    // Set the title and background image
    fsTitle.textContent = title;
    fsBg.style.backgroundImage = bg;

    // Create or update the description element separately
    const descriptionElement = document.createElement('p');
    descriptionElement.innerHTML = `${description || 'No description available'}`;
    descriptionElement.classList.add('fs-description'); // Apply special class for description styling

    // Create platform, release date, and genre elements
    const platformElement = document.createElement('p');
    platformElement.innerHTML = `<strong>🎮 Platform:</strong> ${platform}`;

    const releaseElement = document.createElement('p');
    releaseElement.innerHTML = `<strong>📅 Release:</strong> ${release}`;

    const genreElement = document.createElement('p');
    genreElement.innerHTML = `<strong>🧭 Genre:</strong> ${genre}`;

    // Create the fs-details container (for platform, release, and genre)
    const fsDetails = document.createElement('div');
    fsDetails.classList.add('fs-details');
    fsDetails.appendChild(platformElement);
    fsDetails.appendChild(releaseElement);
    fsDetails.appendChild(genreElement);

    // Clear any previous content (both description and other details)
    const existingDescription = document.querySelector('.fs-description');
    const existingFsDetails = document.querySelector('.fs-details');
    if (existingDescription) {
        existingDescription.remove();
    }
    if (existingFsDetails) {
        existingFsDetails.remove();
    }

    // Append the description and then the details to the fullscreen container
    fullscreen.appendChild(descriptionElement);  // Description first
    fullscreen.appendChild(fsDetails); // Then platform, release, genre

    fullscreen.classList.add('active');
    fullscreen.setAttribute('aria-hidden', 'false');
}

function hideFullscreen() {
    fullscreen.classList.remove('active');
    fullscreen.setAttribute('aria-hidden', 'true');

    // Remove both description and details when hiding fullscreen
    const fsDetails = document.querySelector('.fs-details');
    const fsDescription = document.querySelector('.fs-description');
    if (fsDetails) {
        fsDetails.remove();
    }
    if (fsDescription) {
        fsDescription.remove();
    }
}



    exitBtn.addEventListener('click', hideFullscreen);

    
    carousel.addEventListener('click', (e)=>{
      const card = e.target.closest('.card');
      if(!card) return;
      showFullscreen(card);
    });

    const productCards = document.querySelectorAll('.card');
const genreButtons = document.querySelectorAll('.category');

function hideAllProductCards() {
  productCards.forEach(card => {
    card.style.display = 'none';
  });
}

function showProductCards(genre) {
  hideAllProductCards();

  if (genre === 'all') {
    productCards.forEach(card => card.style.display = 'block');
  } else {
    productCards.forEach(card => {
      const cardGenres = card.dataset.genre.split(',').map(g => g.trim().toLowerCase());
      if (cardGenres.includes(genre)) {
        card.style.display = 'block';
      }
    });
  }
}

genreButtons.forEach(button => {
  button.addEventListener('click', () => {
    genreButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const selectedGenre = button.textContent.trim().toLowerCase();
    showProductCards(selectedGenre);
  });
});