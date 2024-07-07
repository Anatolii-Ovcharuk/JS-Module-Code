/* "Console module", v. 1.2 - 07.07.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/console_module_v.1.2.js" type="module"></script> */
/* Use this line in HTML for include form:  
    <section>
        <p style="text-align: center;padding: 10px;font-size: 16px;">Console:</p>
        <button class="saveConsole" id="saveConsole" saveConsole type="button" aria-label="Save data" >Save</button>
        <button class="copyConsole" id="copyConsole" copyConsole type="button" aria-label="Copy data" >Copy</button>
        <button class="clearConsole" id="clearConsole" clearConsole type="button" aria-label="Clear data" >Clear</button>
        <pre class="console" id="console" console ></pre>
        <!-- OR uncoment and use next "pre" with included styles -->        
        <!-- <pre class="console" id="console" console style="display: block;margin: 10px auto;padding: 10px;width: 75%;height: 100px;box-shadow: inset 0px 0px 10px rgba(0,0,0,0.5);overflow: auto;scrollbar-color: #0066FF #353535;user-select: text; overflow-y: scroll; text-align: justify;"></pre> <!-- scrollbar-width: thin; --> -->
    </section>
*/
/* Use this line in HTML for include css style: 
pre {
    // white-space: pre-wrap;       /* CSS 2.1 */
    // white-space: -moz-pre-wrap;  /* Mozilla */
    // white-space: -pre-wrap;      /* Opera 4-6 */
    // white-space: -o-pre-wrap;    /* Opera 7 */
    // word-wrap: break-word;       /* IE 5.5+ */ } */


// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */


let dataConsole = '';
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

        /* SELECT ONLY ONE STRING */
    // btnSave: document.body.querySelector("[saveConsole]"), /* Attribute Selector */
    // btnSave: document.body.querySelector(".saveConsole"), /* CSS Selector */
    // btnSave: document.body.querySelector("#saveConsole"), /* ID Selector */
    btnSave: document.getElementById("saveConsole"), /* ID Selector */
    
};


        /* Console Log in HTML SCRIPT */
        console._log = console.log;

        console.log = function () {
            // document.body.querySelector('pre').innerText = arguments[0];
            // refsConsole.terminal.innerText = arguments[0];

            dataConsole += '\n' + arguments[0];
            refsConsole.terminal.innerText = dataConsole;           
            refsConsole.terminal.scrollTop = refsConsole.terminal.scrollHeight; // Прокручиваем до нижней части элемента
            console._log.apply(null, arguments);
        };
        
        /* Code for clear data console */
        
        refsConsole.btnClear.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Console starting clearing...");
            let t = 4; /* That's value time to start clearing console */
            let timerOUT = null;
            
            setTimeout(() => {
                timerOUT = setInterval(() => {
                t--;
                console.log(`The console will be cleared after ${t} seconds.`)
                }, 1000);
            }, 1000)

            setTimeout(() => {
            clearInterval(timerOUT);
            console.clear();
            dataConsole = "";
            console.log("Console was cleared. Version 1.2 - Update: 07.07.2024 | Made by Anatolii Ovcharuk.");
            setTimeout(() => console.log(""), 3000);
            }, (t*1000) + 2000);
        });
            
        /* Code for copy data console */

        if (navigator.clipboard) {
                // API буфера обмена доступно
            console.log("Clipboard API supported.")
            setTimeout(() => { 
                console.log("Initializate console ready. Version 1.2 - Update: 07.07.2024 | Made by Anatolii Ovcharuk.");
            }, 500);
            } else {
                // API буфера обмена не доступно
            setTimeout(() => {
                console.log("Initializate console ready, but Clipboard API (Copy) not supported. Version 1.2 - Update: 07.07.2024 | Made by Anatolii Ovcharuk.");
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

                /* For save result console in TXT document */
            refsConsole.btnSave.addEventListener("click", (event) => {
                event.preventDefault();
                
            // Создаем содержимое текстового файла
            const content = refsConsole.terminal.innerText;

            // Создаем объект Blob
            // const blob = new Blob([content], { type: 'text/plain' });
            const blob = new Blob([dataConsole], { type: 'text/plain' });

            // Создаем ссылку на объект Blob
            const url = URL.createObjectURL(blob);
            
            // Формирую дату и время для названия файла
                const INCLUDE_DATE_IN_NAME = true; /* Include date in name file ? true/false */

                function formDate() {
                // const time = new Date().toTimeString().slice(0, 8).replace(/:/g, '-'); /* Alternate version */
                const time = Date().slice(16, 24).toString().replaceAll(":", "-"); 
                let year = "";
                let month = "";
                let date = "";

                if (INCLUDE_DATE_IN_NAME) {
                year = (new Date).getFullYear().toString();
                month = ((new Date).getMonth() + 1).toString();
                if (month.length === 1) {
                        month = "0" + month;
                    };
                date = (new Date).getDate().toString();
                if (date.length === 1) {
                        date = "0" + date;
                    };
                };
                
                return `_${date}.${month}.${year}_${time}`
                };


            // Создаем элемент <a> для скачивания файла
            const a = document.createElement('a');
            a.href = url;
            a.download = `console_result${INCLUDE_DATE_IN_NAME ? formDate() : ""}.txt`;
            document.body.appendChild(a);
            a.click();

            // Удаляем элемент <a> и освобождаем URL
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
             
            });


           
            