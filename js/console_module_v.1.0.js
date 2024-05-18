/* "Console module", v. 1.0 - 16.05.2024 | MIT License | Made by Anatolii Ovcharuk */

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


        // Console Log in HTML SCRIPT
        console._log = console.log;

                /* SELECT ONLY ONE STRING */
        // const terminal = document.body.querySelector("[console]"); /* Attribute Selector */
        // const terminal = document.body.querySelector(".console"); /* CSS Selector */
        // const terminal = document.body.querySelector("#console"); /* ID Selector */
        const terminal = document.getElementById('console'); /* ID Selector */

        console.log = function () {
            // document.body.querySelector('pre').innerText = arguments[0];
            terminal.innerText = arguments[0];
            console._log.apply(null, arguments);
        }

        /* Code for copy data */

            /* SELECT ONLY ONE STRING */
        // const btnCopy = document.body.querySelector("[copy]"); /* Attribute Selector */
        // const btnCopy = document.body.querySelector(".copy"); /* CSS Selector */
        // const btnCopy = document.body.querySelector("#copy"); /* ID Selector */
        const btnCopy = document.getElementById("copy"); /* ID Selector */

        if (navigator.clipboard) {
                // API буфера обмена доступно
            console.log("Clipboard API supported.")
            setTimeout(() => { 
                console.log("Initializate console ready. Version 1.0 - Update: 16.05.2024 | Made by Anatolii Ovcharuk.");
            }, 500);
            } else {
                // API буфера обмена не доступно
            setTimeout(() => {
                console.log("Initializate console ready, but Clipboard API (Copy) not supported. Version 1.0 - Update: 16.05.2024 | Made by Anatolii Ovcharuk.");
            }, 500);  
            }

                /* For use button copy */ 
            btnCopy.addEventListener("click", (event) => { 
                event.preventDefault();
                let selection = document.getSelection();

                if (selection == "" || false) {
                    selection = terminal.textContent || terminal.innerHTML || terminal.innerText
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
                //         (clipText) => (terminal.innerText = clipText),
                //     );
            });

                /* For use global copy */
            terminal.addEventListener("copy", (event) => { 
                event.preventDefault();
                const selection = document.getSelection();
                navigator.clipboard.writeText(selection).then(function () {
                    console.log(`Information was copied successfully... "${selection}"`);
                }, function (err) {
                    console.error(`Failed to copy information: `, err);
                });

                // console.log(`Information was copied successfully... "${selection}"`);
            });
