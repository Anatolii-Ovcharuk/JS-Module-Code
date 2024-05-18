/* "Generator numbers", v. 1.1 - 17.05.2024 | MIT License | Made by Anatolii Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/generator_numbers.js" type="module"></script> */
/* Use this line in HTML for include form:  
            <form>
            <label for="startNumbers">Start Number:</label>
            <input id="startNumbers" type="number" placeholder="START Number" />
            <label for="endNumbers">End Number:</label>
            <input id="endNumbers" type="number" placeholder="END Number" />
                <fieldset id="fieldsetGen" >
                    <legend>Split number's with:</legend>
                        <input type="radio" id="line" name="split" value="line" checked />
                        <label for="line">Line</label>
                        <input type="radio" id="space" name="split" value="space" />
                        <label for="space">Space</label>
                        <input type="radio" id="slash" name="split" value="slash" />
                        <label for="slash">Slash</label>
                        <input type="radio" id="nothing" name="split" value="nothing" />
                        <label for="nothing">Nothing</label>
                        <input type="radio" id="not_use" name="split" value="not use" />
                        <label for="not_use">Not use</label>
                </fieldset>
            <button id="generateNumbers" href="" type="button" aria-label="Start to generate numbers" ><p>Start Generate Number's</p></button>
            <progress id="generateProgress" style="width: 200px;"></progress>
            </form>
            <p id="generateStatProgressTime">Time to end process: 0 sec.</p>
*/



// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

const refs = {
    showNumbers: document.getElementById("showNumbers"),
    startNumbers: document.getElementById("startNumbers"),
    endNumbers: document.getElementById("endNumbers"),
    generateNumbers: document.getElementById("generateNumbers"),
    generateProgress: document.getElementById("generateProgress"),

    split: document.getElementById("fieldsetGen"),
    splitSelect: document.body.querySelector(`input[type="radio"][name="split"]:checked`),

    gspt: document.getElementById("generateStatProgressTime"),
    }

    refs.split.addEventListener("change", (event) => {
    event.preventDefault();    
    refs.splitSelect = document.body.querySelector(`input[type="radio"][name="split"]:checked`);
        
    // console.log(refs.split.elements)
    // console.log(refs.splitSelect.value)
    })

refs.generateNumbers.addEventListener('click', generateNumbers);

function generateNumbers() {
    if (!document.body.querySelector(`input[type="radio"][name="split"]:checked`)) {
    alert(`⚠ Choice only one option to split number's for continue.`);
    }

    console.log("Initializate generating...")
    const startTimeProcess = Date.now();

    let startNumbers = Number.parseInt(refs.startNumbers.value);
    let endNumbers = Number.parseInt(refs.endNumbers.value);
    let numbers = [];

    if (Number.isNaN(startNumbers) || Number.isNaN(endNumbers)) {
        console.log("⚠ ERROR. Please, write only numbers.");
        alert("⚠ Please, write only numbers.");
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

    if (refs.splitSelect.value === "line") { 
        numbers = numbers.join('\n');
    } else if (refs.splitSelect.value === "space") { 
        numbers = numbers.join(' ');
    } else if (refs.splitSelect.value === "slash") { 
        numbers = numbers.join(' / ');
    } else if (refs.splitSelect.value === "nothing") { 
        numbers = numbers.join('');
    } else if (refs.splitSelect.value === "not use") { 
        console.log("Option to split numbers not using...")
    } else {
        console.log("Error: Choice only one option to split number's for continue.")
    }
    
    console.log(numbers); /* Test */

    setTimeout(() => {
        refs.generateProgress.value = 0;
        refs.generateProgress.max = 0;
    }, 3000);

    const endTimeProcess = Date.now();
    refs.gspt.innerHTML = `Time to end process: ${((endTimeProcess - startTimeProcess) / 1000).toFixed(3)} sec.`;
};
