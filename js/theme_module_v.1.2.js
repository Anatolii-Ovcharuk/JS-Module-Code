/* "Theme module", v. 1.2 - 11.05.2024 | MIT License | Made by Anatolii Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/theme_module.js" type="module"></script> */
/* Use this line in HTML for include: <button class="theme" id="theme" href="" type="button" aria-label="change background theme on page" theme>Change Theme.</button> */
/* Use this line in HTML for include: <button class="lp" id="lp" href="" type="button" aria-label="loop play/pause theme" lp>Loop play/pause Theme</button> */

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

let theme = {
        /* SELECT ONLY ONE STRING */
    // btn: document.body.querySelector("[theme]"), /* Attribute Selector */
    // btn: document.body.querySelector(".theme"), /* CSS Selector */
    // btn: document.body.querySelector("#theme"), /* ID Selector */
    btn_color: document.getElementById("theme"), /* ID Selector */

        /* SELECT ONLY ONE STRING */
    // lp_color: document.body.querySelector("[lp]"), /* Attribute Selector */
    // lp_color: document.body.querySelector(".lp"), /* CSS Selector */
    // lp_color: document.body.querySelector("#lp"), /* ID Selector */
    lp_color: document.getElementById("lp"), /* ID Selector */
};

const defaultBackground = "#dadada"; /* Set here default background color */
document.body.style.backgroundColor = defaultBackground; 
const defaultColor = "#252525"; /* Set here default font color */
document.body.style.color = defaultColor;


const colorsBackground = [defaultBackground, defaultColor, "#101010", "#ff8888", "#f5ff88", "#88ff88", "#88d9ff", "#8888ff"]; /* Add color's for background here */
const colorsFont = [defaultColor, defaultBackground, "#999999"]; /* Add color's for font here */

theme.btn_color.addEventListener("click", (event) => { 
    event.preventDefault(); 
    initialTheme();
});
let currentIndexBackground = 0;

function initialTheme() {

    /* Code for change background color */

        /* RANDOM VERSION */
    // let selectBackground = colorsBackground[Math.floor(colorsBackground.length * Math.random())];
    // const nowBackground = document.body.style.backgroundColor;
    // switch (hexToRGB(selectBackground)) {
    //     case nowBackground:
    //         console.log("Next background color...");
    //         selectBackground = colorsBackground[Math.floor(colorsBackground.length * Math.random())];
    // }
    // document.body.style.backgroundColor = selectBackground;


        /* LINEAR VERSION */
    let selectBackground = defaultBackground;
    const indexBackground = colorsBackground.length - 1
    if (currentIndexBackground < indexBackground) {
        currentIndexBackground = currentIndexBackground + 1;
        selectBackground = colorsBackground[currentIndexBackground];
            // console.log(`Index : ${currentIndexBackground}, color: ${selectBackground}`); /* For test */
    } else {
        currentIndexBackground = 0;
        selectBackground = colorsBackground[currentIndexBackground];
            // console.log(`Index : ${currentIndexBackground}, color: ${selectBackground}`); /* For test */
    }
    document.body.style.backgroundColor = selectBackground;

    /* Code for change font color. Change light and dark fonts with background color's... */

    if (selectBackground === defaultColor) {
        document.body.style.color = defaultBackground;
        document.body.style.fill = defaultBackground;
    } else if (selectBackground === defaultBackground) {
        document.body.style.color = defaultColor;
        document.body.style.fill = defaultColor;
    } else if ((selectBackground === colorsBackground[2]) && (colorsBackground.length >= 3) && (colorsFont.length >= 3) ) { 
        document.body.style.color = colorsFont[2];
        document.body.style.fill = colorsFont[2];
    } else {
        document.body.style.color = defaultColor;
        document.body.style.fill = defaultColor;  
    }

        /* Code for show result */
        console.log(`Change background color: ${selectBackground}. Change font color: ${document.body.style.color}.`)
    };

    

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}



/* LOOP PLAY COLOR CODE */

let activeInt = 0;
let loopTheme = null;

theme.lp_color.addEventListener("click", (event) => { 
    event.preventDefault(); 

    if (activeInt === 1) {
        clearInterval(loopTheme);
        activeInt = 0;
        console.log("Stop play loop color...");
    } else if (activeInt === 0) {
            loopTheme = setInterval(() => {
            activeInt = 1;
            initialTheme();
        }, 500); 
        console.log("Start play loop color...");
    } else {clearInterval(loopTheme); activeInt = 0; console.log("ERROR. Stop play loop color...");}
});

