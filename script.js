document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.nav-item').forEach(nav => {
      nav.classList.remove('active');
    });
    
    this.classList.add('active');
    
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active-section');
    });
    
    const target = this.getAttribute('data-target');
    document.getElementById(target).classList.add('active-section');
  });
});

document.getElementById('style').addEventListener('change', function() {
  const customStyleInput = document.getElementById('custom-style');
  if (this.value === 'Lainnya') {
    customStyleInput.classList.add('show');
    customStyleInput.required = true;
  } else {
    customStyleInput.classList.remove('show');
    customStyleInput.required = false;
    customStyleInput.value = '';
  }
});

document.getElementById('request-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const songTitle = document.getElementById('song-title').value;
  const category = document.getElementById('category').value;
  const styleSelect = document.getElementById('style');
  const customStyle = document.getElementById('custom-style').value;
  
  let style = styleSelect.value;
  if (style === 'Lainnya' && customStyle.trim() !== '') {
    style = customStyle;
  }
  
  const message = `Misi Bang Mau Request Lagu:%0A%0AJudul Lagu: ${songTitle}%0AKategori: ${category}%0AStyle: ${style}%0A%0AHarganya Berapa Ya Bang?`;
  
  window.open(`https://wa.me/6285753225113?text=${message}`, '_blank');
});

document.querySelectorAll('.btn-buy').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.getAttribute('data-product');
    const productPrice = this.getAttribute('data-price');
    
    const message = `Misi Bang Mau Beli Flm ${productName}%0AHarga: Rp ${parseInt(productPrice).toLocaleString('id-ID')}%0A%0AFlm Ready Kah?`;
    
    window.open(`https://wa.me/6285753225113?text=${message}`, '_blank');
  });
});

const audioElement = document.getElementById('audio-element');
const audioPlayer = document.getElementById('audio-player');
const audioTitle = document.getElementById('audio-title');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const stopBtn = document.getElementById('stop-btn');
const rewindBtn = document.getElementById('rewind-btn');
const forwardBtn = document.getElementById('forward-btn');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');

let isPlaying = false;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
  if (audioElement.duration) {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTime.textContent = formatTime(audioElement.currentTime);
  }
}

function updateDuration() {
  if (audioElement.duration) {
    duration.textContent = formatTime(audioElement.duration);
  }
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioElement.duration;
  
  audioElement.currentTime = (clickX / width) * duration;
}

function updateVolume() {
  audioElement.volume = volumeSlider.value / 100;
  
  if (audioElement.volume === 0) {
    volumeIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
  } else if (audioElement.volume < 0.5) {
    volumeIcon.innerHTML = '<path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>';
  } else {
    volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
  }
}

function skipForward() {
  audioElement.currentTime += 4;
}

function skipBackward() {
  audioElement.currentTime -= 4;
}

audioElement.addEventListener('loadedmetadata', updateDuration);
audioElement.addEventListener('timeupdate', updateProgress);
audioElement.addEventListener('ended', function() {
  isPlaying = false;
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
});

progressContainer.addEventListener('click', setProgress);

playPauseBtn.addEventListener('click', function() {
  if (isPlaying) {
    audioElement.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  } else {
    audioElement.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  }
  isPlaying = !isPlaying;
});

stopBtn.addEventListener('click', function() {
  audioElement.pause();
  audioElement.currentTime = 0;
  isPlaying = false;
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
  progressBar.style.width = '0%';
  currentTime.textContent = '0:00';
});

rewindBtn.addEventListener('click', skipBackward);
forwardBtn.addEventListener('click', skipForward);

volumeSlider.addEventListener('input', updateVolume);

document.querySelectorAll('.btn-play').forEach(button => {
  button.addEventListener('click', function() {
    const audioUrl = this.getAttribute('data-audio');
    const productTitle = this.getAttribute('data-title');
    
    audioElement.src = audioUrl;
    audioTitle.textContent = productTitle;
    
    audioPlayer.classList.add('active');
    
    audioElement.currentTime = 0;
    audioElement.play();
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    
    setTimeout(updateDuration, 500);
  });
});

document.addEventListener('click', function(e) {
  if (!audioPlayer.contains(e.target) && !e.target.classList.contains('btn-play')) {
    audioPlayer.classList.remove('active');
    audioElement.pause();
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  }
});
