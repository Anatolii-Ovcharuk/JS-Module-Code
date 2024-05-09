/* "Theme module", v. 1.1 | MIT License | Made by Anatolii Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/theme_module.js" type="module"></script> */
/* Use this line in HTML for include: <button class="theme" id="theme" href="" type="button" aria-label="change background theme on page" theme>Change Theme.</button> */

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

const theme = {
    /* SELECT ONLY ONE STRING */
    // btn: document.body.querySelector("[theme]"),
    // btn: document.body.querySelector(".theme"),
    // btn: document.body.querySelector("#theme"),
    btn: document.getElementById("theme"),
};

const colors = ["#dadada", "#ff8888", "#f5ff88", "#88ff88", "#88d9ff", "#8888ff"]; /* Add color's here */

document.body.style.backgroundColor = colors.first
theme.btn.addEventListener("click", initialTheme);

function initialTheme() {
        const select = colors[Math.floor(colors.length * Math.random())];
        document.body.style.backgroundColor = select;
        console.log(`Change color theme: ${select}`)
    };
