/* "Audio loop module", v. 1.0 - 17.05.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include script: <script src="./js/audio_loop_module.js" type="module"></script> */
/* Use this line in HTML for include button:             
        <button class="music__loop" id="music__loop" music__loop href="" type="button" aria-label="stop/start loop music">
                <svg class="theme__icon"><use href="./img/svg/sprite.svg#play"></use></svg>
                <svg class="theme__icon"><use href="./img/svg/sprite.svg#pause"></use></svg>
                <p class="footer__menu__button-theme__txt">Play/pause loop Music</p>
        </button> */
/* Use this line in HTML for include audio:  
        <audio class="audio__loop" id="audio__loop" audio__loop data-status="play" src="./audio/ogg/loop-112_eq_cut.ogg" loop>
            <source src="./audio/ogg/loop-112_eq_cut.ogg" type="audio/ogg; codecs=vorbis" /> 
            <source src="./audio/mp3/loop-112_eq_cut.mp3" type="audio/mpeg" /> 
            <source src="./audio/wav/loop-112_eq_cut.wav" type="audio/wav" />
        </audio>
*/

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */



// AUDIO LOOP SCRIPT

let musicLoop = {
        /* SELECT ONLY ONE STRING */
    // audio: document.body.querySelector("[audio__loop]"), /* Attribute Selector */
    // audio: document.body.querySelector(".audio__loop"), /* CSS Selector */
    // audio: document.body.querySelector("#audio__loop"), /* ID Selector */
    audio: document.getElementById("audio__loop"), /* ID Selector */

        /* SELECT ONLY ONE STRING */
    // music: document.body.querySelector("[music__loop]"), /* Attribute Selector */
    // music: document.body.querySelector(".music__loop"), /* CSS Selector */
    // music: document.body.querySelector("#music__loop"), /* ID Selector */
    button: document.getElementById("music__loop"), /* ID Selector */
};


const context = new (window.AudioContext || window.webkitAudioContext)();

//-----------------------------------
// STEREO PARAMS!
// const buffer = new AudioBuffer(context, {
//   numberOfChannels: 2,
//   length: 22050,
//   sampleRate: 44100,
// });

// MONO PARAMS!
// const buffer = new AudioBuffer(context, {
//   numberOfChannels: 1,
//   length: 22050,
//   sampleRate: 22050,
// });

const buffer = context.createBuffer(2, context.sampleRate * 1, context.sampleRate);
// const channelData = buffer.getChannelData(0);

// console.log(buffer); /* Information about buffer */

//-----------------------------------



const volume = context.createGain();
volume.gain.value = 0.9;

const delay = context.createDelay();
delay.delayTime.value = 0.01;

context.createMediaElementSource(musicLoop.audio).connect(delay).connect(volume).connect(context.destination);

musicLoop.button.addEventListener("click", () => {
    if (musicLoop.audio.getAttribute("data-status") === "stop") {
        startPlay();
    } else if (musicLoop.audio.getAttribute("data-status") === "play") {
        stopPlay();
    }
});

function startPlay () {
    musicLoop.audio.setAttribute("data-status", "play")
    musicLoop.audio.play()
}

function stopPlay () {
    musicLoop.audio.setAttribute("data-status", "stop")
    // volume.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 2.5);
    musicLoop.audio.pause();
}

musicLoop.audio.play();




    /* All Information about this API */
// console.log(context.destination);
// console.log(context.createMediaElementSource(musicLoop.audio))
// console.log(context);
// console.log(delay);
// setTimeout(() => console.log("Duration loop music:", musicLoop.audio.duration), 1000);
// setInterval(() => console.log("Current time loop music:",musicLoop.audio.currentTime), 1000);
