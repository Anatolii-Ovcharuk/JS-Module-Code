/* "Audio player module", v. 1.0 - 30.06.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include script: <script src="./js/audio_player_module_v.1.0.js" type="module"></script> */
/* Use this line in HTML for include:             
                <form class="audio__player" id="audio__player" audio__player data-status="stop">
                    <div class="audio_option_container">
                        <button type="button" id="playPauseButton" aria-label="stop/start play music">
                            <svg class="theme__icon">
                                <use href="./img/svg/sprite.svg#play"></use>
                            </svg>
                            <svg class="theme__icon">
                                <use href="./img/svg/sprite.svg#pause"></use>
                            </svg>
                        </button>
                        <button type="button" id="previousButton" aria-label="previous play music">
                            <p>Previous</p>
                        </button>
                        <button type="button" id="nextButton" aria-label="next play music">
                            <p>Next</p>
                        </button>
                        <button type="button" id="autoplayButton" aria-label="Autoplay next music">
                            <p>Autoplay</p>
                        </button>
                        <button type="button" id="loopButton" aria-label="loop music">
                            <p>Loop</p>
                            <!-- <svg>
                                <use href="./img/svg/sprite.svg#reset"></use>
                            </svg> -->
                        </button>
                    </div>
                    <div class="audio_option_container">
                        <label for="volume">Volume</label>
                        <p id="value_volume" style="text-align: center;">50 %</p>
                        <input type="range" class="volume" id="volume" name="volume" min="0" value="0.5" max="1" step="0.01" />
                    </div>
                    <div class="audio_option_container">
                        <label for="range_music">Progress</label>
                        <p id="progress" style="text-align: center;">00:00 / 00:00</p>
                        <input type="range" class="range_music" id="range_music" name="range_music" value="0" step="1" />
                    </div>
                    <div class="audio_option_container">
                        <input type="radio" id="stereo" name="channel" value="stereo" checked />
                        <label for="stereo">Stereo</label>
                        <input type="radio" id="mono" name="channel" value="mono" />
                        <label for="mono">Mono</label>
                    </div>
                    <select class="songs" id="songs" size="2" name="select">
                        <option value="./music/example.wav" selected>Test music</option>
                        <option value="./music/example.mp3">Test music</option>
                    </select>
                </form>
*/

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */



// AUDIO PLAYER SCRIPT

const audioPlayerRefs = {
    audioPlayer: document.getElementById("audio__player"),
    vv: document.getElementById('value_volume'),
    playPauseButton: document.getElementById('playPauseButton'),
    progress: document.getElementById('progress'),
    rangeMusic: document.getElementById('range_music'),
    previousButton: document.getElementById('previousButton'),
    nextButton: document.getElementById('nextButton'),
    autoplayButton: document.getElementById('autoplayButton'),
    loopButton: document.getElementById('loopButton'),
    songSelect: document.getElementById('songs')
};

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = new Audio();
let sourceNode = audioContext.createMediaElementSource(audioElement);
let gainNode = audioContext.createGain();
let buffer = null;
gainNode.gain.value = 0.5;
document.getElementById("volume").value = 0.5;

audioElement.crossOrigin = "anonymous";
sourceNode.connect(gainNode).connect(audioContext.destination);

let isAutoplay = false;
let isLoop = false;

audioPlayerRefs.playPauseButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (audioPlayerRefs.audioPlayer.getAttribute("data-status") === "stop") {
        startPlay();
    } else if (audioPlayerRefs.audioPlayer.getAttribute("data-status") === "play") {
        stopPlay();
    }
});

audioPlayerRefs.previousButton.addEventListener("click", (event) => {
    event.preventDefault();
    previousSong();
});

audioPlayerRefs.nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    nextSong();
});

audioPlayerRefs.autoplayButton.addEventListener("click", (event) => {
    event.preventDefault();
    toggleAutoplay();
});

audioPlayerRefs.loopButton.addEventListener("click", (event) => {
    event.preventDefault();
    toggleLoop();
});

function startPlay() {
    audioPlayerRefs.audioPlayer.setAttribute("data-status", "play");
    audioElement.play();
}

function stopPlay() {
    audioPlayerRefs.audioPlayer.setAttribute("data-status", "stop");
    audioElement.pause();
}

audioPlayerRefs.audioPlayer.addEventListener('change', (event) => {
    event.preventDefault();
    // console.log(event.target);

    if (event.target.name === "channel") {
        checkBuffer(event.target.value);
        console.log(event.target.value, buffer); /* Information about buffer */
    } else if (event.target.name === "volume") {
        changeVolume(event.target.value);
    } else if (event.target.name === "range_music") {
        changeCurrentTime(event.target.value);
    } else if (event.target.name === "select") {
        loadMusic(event.target.value);
    }
});


// audioPlayerRefs.audioPlayer.addEventListener('change', (event) => {
//     event.preventDefault();
//     // console.log(event.target);

//     if (event.target.name === "channel") {
//         buffer = checkBuffer(event.target.value);
//         // console.log(event.target.value, buffer); /* Information about buffer */
//     };

//     if (event.target.name === "volume") { changeVolume(event.target.value); };
//     if (event.target.name === "range_music") { changeCurrentTime(event.target.value); };
//     if (event.target.name === "select") { loadMusic(event.target.value) };
// });


audioElement.addEventListener('ended', () => {
    if (isLoop) {
        audioElement.currentTime = 0;
        audioElement.play();
    } else if (isAutoplay) {
        nextSong();
    }
});


function checkBuffer(value) {
    if (value === "stereo") {
        // new AudioBuffer(audioContext, {numberOfChannels: 2, length: 22050, sampleRate: 44100});
        // audioContext.createBuffer(audioContext, {numberOfChannels: 2, length: 22050, sampleRate: 44100});
        const result = audioContext.createBuffer(2, audioContext.sampleRate * 1, audioContext.sampleRate); // numberOfChannels: 2, length: 22050, sampleRate: 44100
        buffer = result;
        return result
    } else if (value === "mono") {
        // new AudioBuffer(audioContext, {numberOfChannels: 1, length: 22050, sampleRate: 22050});
        // audioContext.createBuffer(audioContext, {numberOfChannels: 1, length: 22050, sampleRate: 22050});
        const result = audioContext.createBuffer(1, audioContext.sampleRate * 1, audioContext.sampleRate / 2); // numberOfChannels: 1, length: 22050, sampleRate: 22050
        buffer = result;
        return result
    } else {
        console.error("Error with configuration audio buffer...")
        return null;
    };
}

function changeVolume(value) {
    gainNode.gain.value = value;
    audioPlayerRefs.vv.innerHTML = ((value * 100).toFixed(0)).toString() + " %";
}

function loadMusic(href) {
    audioElement.src = href;
    audioElement.load();
    audioElement.onloadedmetadata = () => {
        audioPlayerRefs.progress.innerHTML = `${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}`;
        document.getElementById('range_music').max = Math.floor(audioElement.duration);
    };

    audioElement.ontimeupdate = () => {
        audioPlayerRefs.progress.innerHTML = `${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}`;
        document.getElementById('range_music').value = Math.floor(audioElement.currentTime);
    };
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function changeCurrentTime(value) {
    audioElement.currentTime = value;
}

function previousSong() {
    let selectedIndex = audioPlayerRefs.songSelect.selectedIndex;
    if (selectedIndex > 0) {
        audioPlayerRefs.songSelect.selectedIndex = selectedIndex - 1;
        loadMusic(audioPlayerRefs.songSelect.value);
    }
}

function nextSong() {
    let selectedIndex = audioPlayerRefs.songSelect.selectedIndex;
    if (selectedIndex < audioPlayerRefs.songSelect.options.length - 1) {
        audioPlayerRefs.songSelect.selectedIndex = selectedIndex + 1;
        loadMusic(audioPlayerRefs.songSelect.value);
    }
}

function toggleAutoplay() {
    isAutoplay = !isAutoplay;
    audioPlayerRefs.autoplayButton.classList.toggle('active', isAutoplay);
}

function toggleLoop() {
    isLoop = !isLoop;
    audioPlayerRefs.loopButton.classList.toggle('active', isLoop);
}

// Initialize the first selected song
loadMusic(document.getElementById('songs').value);







    /* All Information about this API */
// console.log(audioContext.destination);
// console.log(audioContext);
// console.log(delay);
