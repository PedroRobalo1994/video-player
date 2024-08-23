// Element Selectors
const elements = {
    video: document.querySelector('video'),
    progressRange: document.querySelector('.progress-range'),
    progressBar: document.querySelector('.progress-bar'),
    playBtn: document.getElementById('play-btn'),
    volumeIcon: document.getElementById('volume-icon'),
    volumeRange: document.querySelector('.volume-range'),
    volumeBar: document.querySelector('.volume-bar'),
    currentTime: document.querySelector('.time-elapsed'),
    duration: document.querySelector('.time-duration'),
    fullscreenBtn: document.querySelector('.fullscreen'),
    speed: document.querySelector('.player-speed')
};

const { video, progressRange, progressBar, playBtn, volumeIcon, volumeRange, volumeBar, currentTime, duration, fullscreenBtn, speed } = elements;

// Helper Functions
const updateClassAndTitle = (element, oldClass, newClass, title) => {
    element.classList.replace(oldClass, newClass);
    element.setAttribute('title', title);
};

const displayTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = String(Math.floor(time % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
};

// Play & Pause
const showPlayIcon = () => updateClassAndTitle(playBtn, 'fa-pause', 'fa-play', 'Play');

const togglePlay = () => {
    video.paused ? (video.play(), updateClassAndTitle(playBtn, 'fa-play', 'fa-pause', 'Pause')) : (video.pause(), showPlayIcon());
};

// Progress Bar
const updateProgress = () => {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = displayTime(video.duration);
};

const setProgress = (e) => {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
};

// Volume Controls
const setVolumeSlider = (e) => {
    const volume = Math.min(Math.max(e.offsetX / volumeRange.offsetWidth, 0), 1);
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    volumeIcon.className = '';
    volumeIcon.classList.add('fas', volume > 0.7 ? 'fa-volume-up' : volume > 0 ? 'fa-volume-down' : 'fa-volume-off');
};

const toggleMute = () => {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
};

// Change Playback Speed
const changeSpeed = () => video.playbackRate = speed.value;

// Fullscreen
const toggleFullscreen = () => video.requestFullscreen();

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
fullscreenBtn.addEventListener('click', toggleFullscreen);
volumeRange.addEventListener('click', setVolumeSlider);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);

