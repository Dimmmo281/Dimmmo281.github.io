// /////////////////////////////////////////////////////////////////////Функция для обновления времени и даты\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function updateTime() {
    const now = new Date();
    
    // Форматирование времени (часы:минуты:секунды)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.querySelector('.time-display').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Форматирование даты (день месяц год)
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateString = now.toLocaleDateString('ru-RU', options);
    
    // Дополнительно: день недели
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayOfWeek = days[now.getDay()];
    
    document.querySelector('.date-display').textContent = `${dayOfWeek}, ${dateString}`;
    
    // Изменение стилей в зависимости от времени суток
    const timeCard = document.querySelector('.time-card');
    const hour = now.getHours();
    
    if (hour >= 6 && hour < 18) {
      timeCard.style.background = 'rgba(30, 30, 30, 0.8)'; // Дневной стиль
    } else {
      timeCard.style.background = 'rgba(10, 10, 30, 0.9)'; // Ночной стиль
    }
  }
  
  // Инициализация времени при загрузке страницы
  document.addEventListener('DOMContentLoaded', function() {
    // Первое обновление времени
    updateTime();
    // Устанавливаем интервал обновления (каждую секунду)
    setInterval(updateTime, 1000);
  });
  document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add('loaded');
});


////////////////////////////////////////////////////////////////////////////// Музыкальный плеер\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const trackName = document.querySelector('.track-name');
const trackTime = document.querySelector('.track-time');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress-container');

// Плейлист
const playlist = [
  {
    name: "",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    name: "",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    name: "",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

let currentTrack = 0;
let isPlaying = false;

// Загрузка трека
function loadTrack(trackIndex) {
  audioPlayer.src = playlist[trackIndex].src;
  trackName.textContent = playlist[trackIndex].name;
  audioPlayer.load();
}

// Воспроизведение/пауза
function playPauseTrack() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playTrack() {
  audioPlayer.play();
  isPlaying = true;
  playBtn.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/2088/2088562.png" alt="Pause" width="24" height="24">';
}

function pauseTrack() {
  audioPlayer.pause();
  isPlaying = false;
  playBtn.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/5577/5577228.png" alt="Play" width="24" height="24">';
}

// Следующий трек
function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  if (isPlaying) playTrack();
}

// Предыдущий трек
function prevTrack() {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  if (isPlaying) playTrack();
}

// Обновление прогресс-бара
function updateProgress() {
  const { currentTime, duration } = audioPlayer;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  
  // Обновление времени
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60).toString().padStart(2, '0');
  
  trackTime.textContent = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
}

// Перемотка по клику на прогресс-бар
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (clickX / width) * duration;
}

// Инициализация плеера
loadTrack(currentTrack);

// События
playBtn.addEventListener('click', playPauseTrack);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextTrack);
progressContainer.addEventListener('click', setProgress);