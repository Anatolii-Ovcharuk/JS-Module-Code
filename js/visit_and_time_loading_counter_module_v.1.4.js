/* "Visit and time loading counter module", v. 1.4 - 13.07.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/visit_and_time_loading_counter_module.js" type="module"></script> */
/* Use this line in HTML for show: <p class="visit" id="visit" visit></p> */


    /* NEXT USE THIS STRING'S ONLY RESULT WITH Version 1 */
/* Use this line after <title> (in start) HTML: <script> "use strict"; const timeStartLoadingPage = Date.now(); </script> */
/* Use this line before </body> (in end) HTML: <script> "use strict"; const timeEndLoadingPage = Date.now(); </script> */


// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

/* Code using LocalStorage */

/* That's default variables*/
let visitCount = 0;
let totalTimeLoadPage = 0;
let resultTimeLoadPage = 0;

let domContentLoadedTime = 0;
let redirectTime = 0;
let dnsLookupTime = 0;
let tcpHandshakeTime = 0;
let responseTime = 0;
let domInteractiveTime = 0;
let totalPerformanceAPI = 0;

    // Время загрузки страницы Performance API:
        window.addEventListener('load', () => {
            const performanceTiming = performance.timing;

            // const pageLoadTime = (performanceTiming.loadEventEnd - performanceTiming.navigationStart) / 1000;
            // const pageLoadTime = (performanceTiming.navigationStart - performance.timeOrigin) / 1000;
            domContentLoadedTime = (performanceTiming.domContentLoadedEventEnd - performanceTiming.navigationStart) / 1000;
            redirectTime = (performanceTiming.redirectEnd - performanceTiming.redirectStart) / 1000;
            dnsLookupTime = (performanceTiming.domainLookupEnd - performanceTiming.domainLookupStart) / 1000;
            tcpHandshakeTime = (performanceTiming.connectEnd - performanceTiming.connectStart) / 1000;
            responseTime = (performanceTiming.responseEnd - performanceTiming.requestStart) / 1000;
            domInteractiveTime = (performanceTiming.domInteractive - performanceTiming.domLoading) / 1000;
            totalPerformanceAPI = domContentLoadedTime + redirectTime + dnsLookupTime + tcpHandshakeTime + responseTime + domInteractiveTime;

            // console.log(`Performance API | Page Load Time: ${pageLoadTime.toFixed(3)}s`);
            console.log(`Performance API | DOM Content Loaded Time: ${domContentLoadedTime.toFixed(3)}s`);
            console.log(`Performance API | Redirect Time: ${redirectTime.toFixed(3)}s`);
            console.log(`Performance API | DNS Lookup Time: ${dnsLookupTime.toFixed(3)}s`);
            console.log(`Performance API | TCP Handshake Time: ${tcpHandshakeTime.toFixed(3)}s`);
            console.log(`Performance API | Response Time: ${responseTime.toFixed(3)}s`);
            console.log(`Performance API | DOM Interactive Time: ${domInteractiveTime.toFixed(3)}s`);
            console.log(`Performance API | Total Time: ${totalPerformanceAPI.toFixed(3)}s`);




/* Old versions "IF (***)" */
// (localStorage.length >= 1)
// (localStorage.key(0) === "totalTimeLoadPage" && localStorage.key(1) === "visitCount")

if (localStorage.hasOwnProperty("totalTimeLoadPage") && localStorage.hasOwnProperty("visitCount")) { 
    visitCount = localStorage.getItem("visitCount");
    visitCount = Number.parseFloat(visitCount);
    totalTimeLoadPage = localStorage.getItem("totalTimeLoadPage");
    totalTimeLoadPage = Number.parseFloat(totalTimeLoadPage);
} else {
    saveStat();
}

function saveStat () {
    localStorage.setItem("visitCount", visitCount);
    localStorage.setItem("totalTimeLoadPage", totalTimeLoadPage);
}

/* Version's' for result, comment string for disable or enable */
// resultTimeLoadPage = (timeEndLoadingPage - timeStartLoadingPage) / 1000; /* Version 1 */
// resultTimeLoadPage = document.timeline.currentTime  / 100; /* Version 2 */
resultTimeLoadPage = totalPerformanceAPI /* Version 3 - Using Performance API */

const totalTimeLoad = () => {
    const result = totalTimeLoadPage += resultTimeLoadPage;
    totalTimeLoadPage = result;
    localStorage.setItem("totalTimeLoadPage", result);
    return result;
}

const visitProcess = () => {
    const result = visitCount += 1;
    visitCount = result;
    localStorage.setItem("visitCount", result);
    return result;
}

const statsMiddle = () => totalTimeLoad() / visitCount;

/* Use one line code below this line. Include that's code <p class="visit" id="visit" visit ></p> in HTML page for show information. */

function showStat() {
    /* Next use only one string... */
    // document.body.querySelector(".visit").innerHTML = `Current time to load this page ${resultTimeLoadPage}s. | Visited of all time: ${visitProcess()}. | Middle time to loading page of all time: ${statsMiddle().toFixed(3)}s. `; /* Show result in HTML by property CSS */
    // document.body.querySelector("[visit]").innerHTML = `Current time to load this page ${resultTimeLoadPage}s. | Visited of all time: ${visitProcess()}. | Middle time to loading page of all time: ${statsMiddle().toFixed(3)}s. `; /* Show result in HTML by attribute */
    // document.body.querySelector('#visit').innerHTML = `Current time to load this page ${resultTimeLoadPage.toFixed(3)} s. | You are visited this page of all time: ${visitProcess()}. | Time to loading page of all time: ${statsMiddle().toFixed(3)} s. `; /* Show result in HTML by ID */
    document.getElementById('visit').innerHTML = `Current time to load this page ${resultTimeLoadPage.toFixed(3)} s. | You are visited this page of all time: ${visitProcess()}. | Time to loading page of all time: ${statsMiddle().toFixed(3)} s. `; /* Show result in HTML by ID */
    
    // document.body.getElementById('visit').innerHTML = `Current time to load this page ${resultTimeLoadPage} s.`; /* Show result in HTML by ID */
};

showStat();

    /* RESET BUTTON CODE */
/* Next use only one string... */
// const reset = document.body.querySelector(".counter-reset"); /* HTML by property CSS */
// const reset = document.body.querySelector("[counter-reset]"); /* HTML by attribute */
// const reset = document.body.querySelector("#counter-reset"); /* HTML by ID */
const reset = document.getElementById("counter-reset"); /* HTML by ID */


reset.addEventListener("click", (event) => {
    event.preventDefault(); 

    visitCount = 0;
    totalTimeLoadPage = 0;
    resultTimeLoadPage = 0;

    /* Use one of this is... */
    // localStorage.clear() /* - Notification: That's stats stuck on new mobile. */
    saveStat();

    showStat();
    return console.log("Stats was reset.")
});
             
        });


