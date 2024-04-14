const play = document.querySelector(".play");
const audio = document.querySelector("audio");
const image = document.querySelector("img");
const audioName = document.querySelector("h2");
const singerName = document.querySelector("h3");
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");

let isAudioPlaying = false;

function playAudio() {
    audio.play();
    play.classList.replace("fa-play", "fa-pause");
    isAudioPlaying = true;
}

function pauseAudio() {
    audio.pause();
    play.classList.replace("fa-pause", "fa-play");
    isAudioPlaying = false;
}

play.addEventListener("click", () => {
    if (isAudioPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
});

const songsData = [
    {
        imageName: "/images/On feat Daniel Levi.jpeg",
        audioName: "/audios/Cartoon, Jéja - On & On (feat. Daniel Levi).mp3",
        songName: "On & On",
        singerName: "Cartoon, Jéja (feat. Daniel Levi)"
    },
    {
        imageName: "/images/Why We Lose.jpeg",
        audioName: "/audios/Cartoon, Jéja - Why We Lose (feat. Coleman Trapp).mp3",
        songName: "Why We Lose",
        singerName: "Cartoon, Jéja (feat. Coleman Trapp)"
    },
    {
        imageName: "/images/Sky High.jpeg",
        audioName: "/audios/Elektronomia - Sky High.mp3",
        songName: "Sky High",
        singerName: "Elektronomia"
    },
    {
        imageName: "/images/Heroes Tonight.jpeg",
        audioName: "/audios/Janji - Heroes Tonight (feat. Johnning).mp3",
        songName: "Heroes Tonight",
        singerName: "Janji (feat. Johnning)"
    },
    {
        imageName: "/images/Mortals.jpeg",
        audioName: "/audios/Warriyo - Mortals (feat. Laura Brehm).mp3",
        songName: "Mortals",
        singerName: "Warriyo (feat. Laura Brehm)"
    }
];

image.src = songsData[0].imageName;
audio.src = songsData[0].audioName;
audioName.textContent = songsData[0].songName;
singerName.textContent = songsData[0].singerName;

function loadSong(info) {
    image.src = info.imageName;
    audio.src = info.audioName;
    audioName.textContent = info.songName;
    singerName.textContent = info.singerName;
}

let songIndex = 0;

forward.addEventListener("click", () => {
    if (songIndex == 0) {
        songIndex = 1;
    }
    if (songIndex > songsData.length - 1) {
        songIndex = 0;
    }
    loadSong(songsData[songIndex]);
    heart.style.color = "#2f3e46";
    playAudio();
    songIndex++;
});

backward.addEventListener("click", () => {
    if (songIndex == 0) {
        songIndex = songsData.length;
    }
    loadSong(songsData[songIndex - 1]);
    playAudio();
    songIndex--;
});

const finalTime = document.querySelector(".total-time");
const finalCurrentTime = document.querySelector(".current-time");
const progressInner = document.querySelector(".progress-inner");

audio.addEventListener("timeupdate", (event) => {
    let myCurrentTime = event.target.currentTime;
    let totalTime = event.target.duration;

    let audioPlayedPercentage = myCurrentTime / totalTime * 100;
    progressInner.style.width = `${audioPlayedPercentage}%`;

    let totalTimeInMinutes = Math.floor(totalTime / 60);
    let totalTimeInSeconds = Math.floor(totalTime % 60);
    finalTime.textContent = `${totalTimeInMinutes}:${totalTimeInSeconds}`;

    let currentTimeInMinutes = Math.floor(myCurrentTime / 60);
    let currentTimeInSeconds = Math.floor(myCurrentTime % 60);

    if (currentTimeInSeconds < 10) {
        currentTimeInSeconds = `0${currentTimeInSeconds}`;
    }
    finalCurrentTime.textContent = `${currentTimeInMinutes}:${currentTimeInSeconds}`;
});

const shuffle = document.querySelector(".shuffle");

shuffle.addEventListener("click", () => {
    let randomSongIndex = Math.floor(Math.random() * 5);
    loadSong(songsData[randomSongIndex]);
    playAudio();
});

const heart = document.querySelector(".heart");

heart.addEventListener("click", () => {
    if (heart.style.color = "#2f3e46") {
        heart.style.color = "red";
    }

    localStorage.setItem(audioName.textContent, singerName.textContent);
});