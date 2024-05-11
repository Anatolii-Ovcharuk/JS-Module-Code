/* "Visit and time loading counter module", v. 1.3 - 11.05.2024 | MIT License | Made by Anatolii Ovcharuk */

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


if (localStorage.key(0) === "totalTimeLoadPage" && localStorage.key(1) === "visitCount") { // localStorage.length >= 1
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
resultTimeLoadPage = document.timeline.currentTime  / 100; /* Version 2 */


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







/* NEXT Code using Data */

/* That's default variables*/
// let visitCount = 0;
// let totalTimeLoadPage = 0;
// let  resultTimeLoadPage = 0; // +++ MINIMAL

// const requestURL = '/json/data.json';
// let response = await fetch(requestURL);
// let visitCount = (await response.json()).visitCount;

// let data = {
//   "id": 0.1,
//   "countDownload": 0,
//   "visitCount": 0,
//   "totalTimeLoadPage": 0
// };


// resultTimeLoadPage = (timeEndLoadingPage - timeStartLoadingPage) / 1000; // +++ MINIMAL

// const totalTimeLoad = () => {
//     const result = totalTimeLoadPage += resultTimeLoadPage;
//     data.totalTimeLoadPage = result
//     // send(requestURL, {"totalTimeLoadPage": result});
//     return result;
// }

// const visitProcess = () => {
//     const result = visitCount += 1;
//     data.visitCount = result
//     // send(requestURL, {"visitCount": result});
//     return result;
// }

// const statsMiddle = () => totalTimeLoad() / visitCount;

    /* Use one line code below this line. Include that's code <p class="visit" id="visit" visit ></p> in HTML page for show information. */
    // document.querySelector("[visit]").innerHTML = `Current time to load this page ${resultTimeLoadPage}s. | Visited of all time: ${visitProcess()}. | Middle time to loading page of all time: ${statsMiddle().toFixed(3)}s. `; /* Show result in HTML by property */
    // document.getElementById('visit').innerHTML = `Current time to load this page ${resultTimeLoadPage} s. | Visited of all time: ${visitProcess()}. | Time to loading page of all time: ${statsMiddle().toFixed(3)} s. `; /* Show result in HTML by ID */

    // document.getElementById('visit').innerHTML = `Current time to load this page ${resultTimeLoadPage} s.`; /* Show result in HTML by ID */ // +++ MINIMAL

    // console.log(data);



// ----------------------------- Send - version 1 -----------------------------

// const options = {
//   method: "POST", // *GET, POST, PATCH, PUT, DELETE, etc.
//   mode: 'no-cors', // no-cors, *cors, same-origin
//   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   referrerPolicy: 'unsafe-url', // no-referrer, *client
//   body: JSON.stringify(data),
//   headers: {
//     "Content-Type": "application/json; charset=UTF-8",
//     // "Allow": "GET, POST, PATCH, HEAD, OPTIONS",
//   },
//   // redirect: 'follow', // manual, *follow, error
//   // credentials: 'same-origin', // include, *same-origin, omit
// };

// fetch(`/../../json/data.json`, options)
//   .then(response => response.json())
//   .then(post => console.log(post))
//   .catch(error => console.log(`ERROR! ${error}`));

// ----------------------------- Send - version 2 -----------------------------

// let totalTimeLoadPage = (await response.json()).totalTimeLoadPage;

// const response = (info) => {
//     let response = fetch(requestURL);
//     return (response.json()).info;
// }

// const send = (data) => fetch('/json/data.json', {
//     method: 'POST', // или 'PUT'
//     body: JSON.stringify(data),
//     headers: {
//     'Content-Type': 'application/json; charset=utf-8'
//     }})


    //     // Пример отправки POST запроса:
// async function send(url, data) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *client
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     // return await response.json(); // parses JSON response into native JavaScript objects
//   }
  
//   postData('https://example.com/answer', { answer: 42 })
//     .then((data) => {
//       console.log(data); // JSON data parsed by `response.json()` call
//     });