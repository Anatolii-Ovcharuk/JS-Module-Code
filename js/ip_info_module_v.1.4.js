/* "IP info module", v. 1.4 - 14.07.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/ip_info_module.js" type="module"></script> */
/* Use this line in HTML for show client IP Address: <p class="ip" id="ip" ip></p> */
/* Use this line in HTML for show info about IP Address: <p class="ipInfo" id="ipInfo" ipInfo></p> */
/* Use this line in HTML for show client information: <div class="client__info" id="client__info" client__info></div> */
/* Use this line in HTML for show session information: <p class="session__info" id="session__info" session__info></p> */
            
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

    
/* SELECT ONLY ONE STRING */
// document.body.querySelector('.ipInfo').innerHTML = getInfoIP(); /* HTML by property CSS */
// document.body.querySelector('[ipInfo]').innerHTML = getInfoIP(); /* HTML by attribute */
// document.body.querySelector('#ipInfo').innerHTML = getInfoIP(); /* HTML by ID */
document.getElementById("ipInfo").innerHTML = getInfoIP(dataIP.ip); /* HTML by ID */
}

initializateIP();


    /* CODE FOR INFO ABOUT USER */
    
/* SELECT ONLY ONE STRING */
// const clientInfo = document.body.querySelector('.client__info'); /* HTML by property CSS */
// const clientInfo = document.body.querySelector('[client__info]'); /* HTML by attribute */
// const clientInfo = document.body.querySelector('#client__info'); /* HTML by ID */
const clientInfo = document.getElementById("client__info"); /* HTML by ID */

clientInfo.innerHTML = `<p>Operation system user: ${navigator.oscpu || "Unknown"}.</p><p>Browser: ${navigator.userAgent || "Unknown"}.</p></p><p>Language system on client: ${navigator.language || "Unknown"}.</p>`



    /* CODE FOR INFO ABOUT SESSION */
    
/* SELECT ONLY ONE STRING */
// const clientInfo = document.body.querySelector('.session__info'); /* HTML by property CSS */
// const clientInfo = document.body.querySelector('[session__info]'); /* HTML by attribute */
// const clientInfo = document.body.querySelector('#session__info'); /* HTML by ID */
const sessionInfo = document.getElementById("session__info"); /* HTML by ID */

let t = 0;
        setInterval(() => {
            t++;
            // sessionInfo.innerHTML = `Time to current session: ${i} s.`
            // console.log(`Time to current session: ${i} s.`);

            const formattedTime = formatTime(t);
            sessionInfo.innerHTML = `Time to current session: ${formattedTime}`;
            // console.log(`Time to current session: ${formattedTime}`);
        }, 1000);

        function formatTime(seconds) {
            const date = new Date(seconds * 1000);
            const years = date.getUTCFullYear() - 1970; // Get years since 1970
            const months = date.getUTCMonth(); // Months are zero-based
            const days = date.getUTCDate() - 1; // Days are one-based, so subtract 1
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();
            const secs = date.getUTCSeconds();

            return `${years.toString().padStart(2, '0')}:${months.toString().padStart(2, '0')}:${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };




    /* CODE FOR INFO ABOUT SESSION */

function getInfoIP(ip) {
    const address = ip.split(".")[0];
    const notStatic = ["192", "172", "10", "127", "169"] /* 192.168.xxx.xxx, 172.16.xxx.xxx, 10.xxx.xxx.xxx, 127.xxx.xxx.xxx, 169.254.xxx.xxx */
    if (address === "Searching") {
        return "Detect IP Address in progress."
    } else if (notStatic.includes(address)) {
        return "IP Address is not static."
    } else if (!notStatic.includes(address)) {
        return "IP Address is static."
    } else { return "IP Address is invalid."}   
}; 

