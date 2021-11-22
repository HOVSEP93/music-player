const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "Muraz",
    displayName: "Muraz",
    artist: "Paul Baghdadlian",
  },
  {
    name: "Yerani",
    displayName: "Yerani",
    artist: "Paul Baghdadlian",
  },
  {
    name: "Anoush Yar",
    displayName: "Anoush Yar",
    artist: "Paul Baghdadlian",
  },
  {
    name: "El Chem Timana",
    displayName: "El Chem Timana",
    artist: "Paul Baghdadlian",
  },
  {
    name: "gakhartagan acherit",
    displayName: "gakhartagan acherit",
    artist: "Paul Baghdadlian",
  },
  {
    name: "Gyanks",
    displayName: "Gyanks",
    artist: "Paul Baghdadlian",
  },
  {
    name: "Janiges",
    displayName: "Janiges",
    artist: "Paul Baghdadlian",
  },
  {
    name: "Kroum Em Yes",
    displayName: "Kroum Em Yes",
    artist: "Paul Baghdadlian",
  },
  {
    name: "var hishatakin",
    displayName: "var hishatakin",
    artist: "Paul Baghdadlian",
  },
  {
    name: "Ourishin Yes",
    displayName: "Ourishin Yes",
    artist: "Paul Baghdadlian",
  },
];

let isPlaying = false;

const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

let currentSongIndex = 0;

const prevSong = () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
};

const nextSong = () => {
  currentSongIndex++;
  if (currentSongIndex > songs.length - 1) {
    currentSongIndex = 0;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
};

const getTimeBySecond = (sec) => {
  const minutes = Math.floor(sec / 60);
  const second = Math.floor(sec % 60);
  const padding = second < 10 ? "0" : "";
  return `${minutes}:${padding}${second}`;
};

const updateProgressBar = (event) => {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    durationEl.textContent = getTimeBySecond(duration);
    currentTimeEl.textContent = getTimeBySecond(currentTime);
  }
};

const setProgressBar = (event) => {
  const { offsetX } = event;
  const { clientWidth } = progressContainer;
  const { duration } = music;
  music.currentTime = (offsetX / clientWidth) * duration;
};

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);

loadSong(songs[currentSongIndex]);
