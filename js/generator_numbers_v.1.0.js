/* "Generator numbers", v. 1.0 - 11.05.2024 | MIT License | Made by Anatolii Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/generator_numbers.js" type="module"></script> */
/* Use this line in HTML for include form:  

*/



// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

const refs = {
    showNumbers: document.getElementById("showNumbers"),
    startNumbers: document.getElementById("startNumbers"),
    endNumbers: document.getElementById("endNumbers"),
    generateNumbers: document.getElementById("generateNumbers"),
    generateProgress: document.getElementById("generateProgress"),
    }

refs.generateNumbers.addEventListener('click', generateNumbers);

function generateNumbers() {

    console.log("Initializate generating...")

    let startNumbers = Number.parseInt(refs.startNumbers.value);
    let endNumbers = Number.parseInt(refs.endNumbers.value);
    let numbers = [];

    if (Number.isNaN(startNumbers) || Number.isNaN(endNumbers)) {
        console.log("ERROR. Please, write only numbers.");
        alert("Please, write only numbers.");
        return
    }
            
    refs.generateProgress.value = startNumbers;
    refs.generateProgress.max = endNumbers;

    console.log("Start generating...")
    console.log(`Start numbers: ${startNumbers}, End numbers: ${endNumbers}`)

    for (let i = startNumbers; i <= endNumbers; i += 1) {
        refs.generateProgress.value = i;
        numbers.push([i]);
    };

    numbers = numbers.join(' ');
    console.log(numbers); /* Test */

    setTimeout(() => {
        refs.generateProgress.value = 0;
        refs.generateProgress.max = 0;
    }, 3000);
};

