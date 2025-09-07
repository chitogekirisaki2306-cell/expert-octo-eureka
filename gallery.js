(function(){
  const buttons = document.querySelectorAll('.btn');
  const items = Array.from(document.querySelectorAll('.gallery .item'));
  const gallery = document.getElementById('gallery');

  function setActive(btn){
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function filter(category){
    items.forEach((it, idx) => {
      const cat = it.getAttribute('data-category');
      const match = (category === 'pictures' || category === 'videos') && (cat === category);
      
      if(match){
        it.style.display = 'block';
        it.style.animation = 'none';
        void it.offsetWidth;
        it.style.animation = `fadeInUp .6s forwards`;
        it.style.animationDelay = (idx * 40) + 'ms';
      } else {
        it.style.display = 'none';
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterTo = btn.dataset.filter;
      setActive(btn);
      filter(filterTo);
    });
  });

  buttons.forEach(b => b.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); b.click();
    }
  }));

  filter('pictures');  // Default to showing "Pictures" first

  function adjustVideoSizes(){
    document.querySelectorAll('.item.video').forEach(v=>{
      const width = v.clientWidth;
      const iframe = v.querySelector('iframe');
      if(iframe) iframe.style.height = (width * 9/16) + 'px';
    });
  }
  window.addEventListener('resize', adjustVideoSizes);
  adjustVideoSizes();
})();

function openModal(videoId) {
  // Update iframe to play the selected video
  const iframe = document.getElementById('videoIframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  
  // Show the modal
  document.getElementById('videoModal').style.display = "block";
}

function closeModal() {
  // Stop video when modal is closed
  const iframe = document.getElementById('videoIframe');
  iframe.src = ""; // Stops the video

  // Hide the modal
  document.getElementById('videoModal').style.display = "none";
}

// Close modal if the user clicks outside of it
window.onclick = function(event) {
  const modal = document.getElementById('videoModal');
  if (event.target === modal) {
    closeModal();
  }
}
function openImageModal(imageSrc) {
  // Set the image src to the modal image
  const modalImage = document.getElementById('modalImage');
  modalImage.src = imageSrc;
  
  // Display the modal
  document.getElementById('imageModal').style.display = "block";
}

function closeImageModal() {
  // Hide the image modal
  document.getElementById('imageModal').style.display = "none";
}

// Close image modal if the user clicks outside of it
window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target === modal) {
    closeImageModal();
  }
}



