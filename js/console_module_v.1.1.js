/* "Console module", v. 1.1 - 30.06.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/console_module.js" type="module"></script> */
/* Use this line in HTML for include form:  
    <section>
        <p style="text-align: center;padding: 10px;font-size: 16px;">Console:</p>
        <button class="copy" id="copy" copy href="" type="button" aria-label="Copy data" >Copy</button>
        <pre class="console" id="console" console ></pre>
    </section>
*/

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */


const refsConsole = {
    /* SELECT ONLY ONE STRING */
    // terminal: document.body.querySelector("[console]"), /* Attribute Selector */
    // terminal: document.body.querySelector(".console"), /* CSS Selector */
    // terminal: document.body.querySelector("#console"), /* ID Selector */
    terminal: document.getElementById('console'), /* ID Selector */

    /* SELECT ONLY ONE STRING */
    // btnCopy : document.body.querySelector("[copyConsole]"), /* Attribute Selector */
    // btnCopy : document.body.querySelector(".copyConsole"), /* CSS Selector */
    // btnCopy : document.body.querySelector("#copyConsole"), /* ID Selector */
    btnCopy: document.getElementById("copyConsole"), /* ID Selector */
        
    /* SELECT ONLY ONE STRING */
    // btnClear: document.body.querySelector("[clearConsole]"), /* Attribute Selector */
    // btnClear: document.body.querySelector(".clearConsole"), /* CSS Selector */
    // btnClear: document.body.querySelector("#clearConsole"), /* ID Selector */
    btnClear: document.getElementById("clearConsole"), /* ID Selector */
    
};


        /* Console Log in HTML SCRIPT */
        console._log = console.log;

        console.log = function () {
            // document.body.querySelector('pre').innerText = arguments[0];
            refsConsole.terminal.innerText = arguments[0];
            console._log.apply(null, arguments);
        };
        
        /* Code for clear data console */
        
        refsConsole.btnClear.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Console starting clearing...");
            setTimeout(() => {
                console.clear();
                console.log("Console was cleared. Version 1.1 - Update: 30.06.2024 | Made by Anatolii Ovcharuk.");
                setTimeout(() => console.log(""), 3000);
            }, 2000);
        });
            
        /* Code for copy data console */

        if (navigator.clipboard) {
                // API буфера обмена доступно
            console.log("Clipboard API supported.")
            setTimeout(() => { 
                console.log("Initializate console ready. Version 1.1 - Update: 30.06.2024 | Made by Anatolii Ovcharuk.");
            }, 500);
            } else {
                // API буфера обмена не доступно
            setTimeout(() => {
                console.log("Initializate console ready, but Clipboard API (Copy) not supported. Version 1.1 - Update: 30.06.2024 | Made by Anatolii Ovcharuk.");
            }, 500);  
            }

                /* For use button copy */ 
            refsConsole.btnCopy.addEventListener("click", (event) => { 
                event.preventDefault();
                let selection = document.getSelection();

                if (selection == "" || false) {
                    selection = refsConsole.terminal.textContent || refsConsole.terminal.innerHTML || refsConsole.terminal.innerText
                };

                navigator.clipboard.writeText(selection).then(function () {
                    console.log(`Information was copied successfully... "${selection}"`);
                }, function (err) {
                    console.error(`Failed to copy information: `, err);
                });

                        /* Next code to past in console */
                // navigator.clipboard
                //     .readText()
                //     .then(
                //         (clipText) => (refsConsole.terminal.innerText = clipText),
                //     );
            });

                /* For use global copy */
            refsConsole.terminal.addEventListener("copy", (event) => { 
                event.preventDefault();
                const selection = document.getSelection();
                navigator.clipboard.writeText(selection).then(function () {
                    console.log(`Information was copied successfully... "${selection}"`);
                }, function (err) {
                    console.error(`Failed to copy information: `, err);
                });

                // console.log(`Information was copied successfully... "${selection}"`);
            });

            