/* "IP info module", v. 1.1 | MIT License | Made by Anatolii Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/ip_info_module.js" type="module"></script> */
/* Use this line in HTML for show: <p class="ip" id="ip" ip></p> */


// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */


/* -------------- VERSION 1 -------------- */

// fetch('https://ipapi.co/json/')
//     .then(info => info.json())
// /* SELECT ONLY ONE "THEN" STRING */
//     .then(info => document.querySelector('.ip').innerHTML = `You're current IP Adress: ${info.ip}`)
// //  .then(info => document.querySelector('#ip').innerHTML = `You're current IP Adress: ${info.ip}`)
//     .catch(error => console.log("ERROR", error));




/* -------------- VERSION 2 -------------- */

// let dataIP = "Not detected.";
// let colorIP = "#f9f522";
// showIP();

// async function initializateIP () {
//     await fetch('https://ipapi.co/json/')
//     .then(info => info.json())
//     .then(info => {dataIP = info.ip; colorIP = "#26f922";})
//     .catch(error => console.log("ERROR", error));

//     if (dataIP === "Not detected." || dataIP === undefined || dataIP === false) {
//         colorIP = "#f92222";
//         console.log("WARNING! IP Adress not detected.");
//     }; 

//     showIP();
// }

// function showIP () {
// /* SELECT ONLY ONE STRING */
// document.querySelector('.ip').innerHTML = `You're current IP Adress: <a href="https://en.ipshu.com/picture/${dataIP}.png" style="color:${colorIP};" target="_blank">${dataIP}</a>`;
// // document.querySelector('#ip').innerHTML = `You're current IP Adress: <a href="https://en.ipshu.com/picture/${dataIP}.png" style="color:${colorIP};" target="_blank">${dataIP}</a>`;
// }

// initializateIP();




/* -------------- VERSION 3 -------------- */

let dataIP = {
    ip: "Searching...",
    asn: "",
    city: "Unknown city",
    continent_code: "Unknown continent",
    country: "",
    country_area: 0,
    country_calling_code: "",
    country_capital: "",
    country_code: "",
    country_code_iso3: "",
    country_name: "Unknown country",
    country_population: 0,
    country_tld: "",
    currency: "",
    currency_name: "",
    in_eu: false,
    languages: "",
    latitude: "",
    longitude: "",
    network: "",
    org: "",
    postal: "",
    region: "Unknown region",
    region_code: "",
    timezone: "",
    utc_offset: "",
    version: "",
};
let colorIP = "#c48600";
showIP();


async function initializateIP () {
    const response = await fetch('https://ipapi.co/json/'); // Also http://freegeoip.net/json/
    try {
        if (!response.ok) {
            throw new Error(response.statusText);
        } else {
            dataIP = await response.json();
            // console.log(dataIP);
        }
    } catch (error) {
        console.log(error);
    };

    colorIP = "#0000ff";
    showIP();
}

setTimeout( () => {
    if (dataIP.ip === "Searching...") {
        dataIP.ip = "Not detected."
        colorIP = "#f92222";
        console.log("WARNING! IP Adress not detected. Problem with connection. Waiting...");
        showIP();
    }
}, 10000);

function showIP() {
    const info = `You're place: ${dataIP.city}, ${dataIP.region}, ${dataIP.country_name}, ${dataIP.continent_code}. You're current IP Adress: <a href="https://en.ipshu.com/picture/${dataIP.ip}.png" style="color:${colorIP};" target="_blank">${dataIP.ip}</a> ${dataIP.version} ${dataIP.org}`
/* SELECT ONLY ONE STRING */
// document.body.querySelector('.ip').innerHTML = info; /* HTML by property CSS */
// document.body.querySelector('[ip]').innerHTML = info; /* HTML by attribute */
// document.body.querySelector('#ip').innerHTML = info; /* HTML by ID */
document.getElementById("ip").innerHTML = info; /* HTML by ID */
}

initializateIP();
