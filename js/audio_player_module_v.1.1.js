/* "Audio player module", v. 1.1 - 12.07.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include script: <script src="./js/audio_player_module_v.1.0.js" type="module"></script> */
/* Use this line in HTML for include:             
<form class="audio__player" id="audio__player" audio__player data-status="stop">
                    <div class="audio_option_container">
                        <button type="button" id="playPauseButton" aria-label="stop/start play music">
                            <p>Play | Pause</p>
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
                        <button type="button" id="muteButton" aria-label="Mute music">
                            <p>Mute</p>
                        </button>
                    </div>
                    <div class="audio_option_container">
                        <label for="volume">Volume</label>
                        <p id="value_volume" style="text-align: center;">50 %</p>
                        <input type="range" class="volume" id="volume" name="volume" min="0" value="0.5" max="1" step="0.01" />
                    </div>
                    <div class="audio_option_container">
                        <label for="range_music"></label> <!-- Progress -->
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
                        <option value="./music/LoopyMusic.wav" selected>Test music</option>
                        <option value="./music/nickelback-bottoms-up.mp3">Nickelback - Bottoms Up</option>
                        <option value="./music/Joshua Loucka - Light that fuse vox.mp3">Joshua Loucka - Light that fuse vox
                        </option>
                    </select>
                </form>
                <canvas id="oscilloscope" width="200" height="50" style="border: 3px solid #f9f9f9;border-radius: 5px;"></canvas>
                <div id="audioSpectr"></div>
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
    songSelect: document.getElementById('songs'),
    muteButton: document.getElementById('muteButton'),
};

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = new Audio();
let sourceNode = audioContext.createMediaElementSource(audioElement);
let gainNode = audioContext.createGain();
let buffer = null;

gainNode.gain.value = 0.5;
document.getElementById("volume").value = 0.5;

let analyser = audioContext.createAnalyser();
analyser.fftSize = 256; /* SET: 2048, 1024, 512, 256, 128, 64, 32 */
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength); /* Cледует использовать массивы Float32Array или Uint8Array, в зависимости от нужных данных. */

audioElement.crossOrigin = "anonymous";
sourceNode.connect(gainNode).connect(analyser).connect(audioContext.destination);

let isAutoplay = false;
let isLoop = false;
let isMuted = false;

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
    audioElement.play();
});

audioPlayerRefs.nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    nextSong();
    audioElement.play();
});

audioPlayerRefs.autoplayButton.addEventListener("click", (event) => {
    event.preventDefault();
    toggleAutoplay();
});

audioPlayerRefs.loopButton.addEventListener("click", (event) => {
    event.preventDefault();
    toggleLoop();
});


audioPlayerRefs.muteButton.addEventListener("click", (event) => {
    event.preventDefault();
    toggleMute();
});

function startPlay() {
    audioPlayerRefs.audioPlayer.setAttribute("data-status", "play");
    audioElement.play();
    console.log('Audio play.');
}

function stopPlay() {
    audioPlayerRefs.audioPlayer.setAttribute("data-status", "stop");
    audioElement.pause();
    console.log('Audio pause.');
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
        audioElement.play();
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
    fetch(href)
    .then(response => response.arrayBuffer())
        .then(data => {
            audioContext.decodeAudioData(data)
            console.log('Audio file loaded successfully.');
        })
    // .then(audioBuffer => {
    //     audioElement.src = href;
    //     buffer = audioBuffer;
    //     console.log('Audio file loaded successfully');
    // })
    .catch(err => console.error('Error loading audio file:', err));
    
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
    console.log('Previous audio.');
}

function nextSong() {
    let selectedIndex = audioPlayerRefs.songSelect.selectedIndex;
    if (selectedIndex < audioPlayerRefs.songSelect.options.length - 1) {
        audioPlayerRefs.songSelect.selectedIndex = selectedIndex + 1;
        loadMusic(audioPlayerRefs.songSelect.value);
    }
    console.log('Next audio.');
}

function toggleAutoplay() {
    isAutoplay = !isAutoplay;
    audioPlayerRefs.autoplayButton.classList.toggle('active', isAutoplay);
    if (isAutoplay) { console.log("Autoplay is enabled.") } else if (!isAutoplay) { console.log("Autoplay is disabled.") };
}

function toggleMute() {
    isMuted = !isMuted;
    audioElement.muted = isMuted;
    audioPlayerRefs.muteButton.classList.toggle('active', isMuted);
    if (isMuted) { console.log('Audio mute.'); };
}

function toggleLoop() {
    isLoop = !isLoop;
    audioPlayerRefs.loopButton.classList.toggle('active', isLoop);
    if (isLoop) { console.log("Loop is enabled.") } else if (!isLoop) { console.log("Loop is disabled.") };
}

// Initialize the first selected song
loadMusic(document.getElementById('songs').value);

    /* ADD CODE HERE */

    /* All Information about this API */
// console.log(audioContext.destination);
// console.log(audioContext);
// console.log(delay);



/* =========================== VIZUALIZATION AUDIO CODE =========================== */

    /* audioSpectr - oscilograph */

const canvas = document.getElementById('oscilloscope');
const canvasCtx = canvas.getContext('2d');

setInterval(() => {
    // requestAnimationFrame(*функция вместо интервала*);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    const sliceWidth = canvas.width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
}, 20);




    /* audioSpectr - barscope */

const canvasBar = document.getElementById('barscope');
const canvasBarCtx = canvasBar.getContext('2d');

setInterval(() => {
    // requestAnimationFrame(*функция вместо интервала*);

    analyser.getByteFrequencyData(dataArray);

    canvasBarCtx.clearRect(0, 0, canvasBar.width, canvasBar.height);

    const barWidth = (canvasBar.width / bufferLength) * 1.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] - (canvasBar.height * 2);

        canvasBarCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        canvasBarCtx.fillRect(x, canvasBar.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
    }
}, 20);






    /* audioD3 */
        /* Initialize D3 Visualization */

const width = 140;
const height = 50;
const barWidth = width / bufferLength;

const svg = d3.select("#audioSpectr")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid #ffffff");

    svg.selectAll("rect")
        .data(dataArray)
        .enter().append("rect")
        .attr("x", (d, i) => i * barWidth)
        .attr("width", barWidth - 1)
        .attr("y", height)
        .attr("height", 0)
        // .attr("fill", "#c63737")
        .attr("class", "bar");

setInterval(() => {
    // requestAnimationFrame(*function*);
    analyser.getByteFrequencyData(dataArray);

    svg.selectAll("rect")
        .data(dataArray.map(element => element))
        .attr("y", d => height - d + 60)
        .attr("height", d => d + 60);
}, 20);

