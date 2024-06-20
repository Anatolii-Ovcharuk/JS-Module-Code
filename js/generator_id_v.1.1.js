/* "Generator ID", v. 1.1 - 20.06.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/generator_id_v.1.1.js" type="module"></script> */


// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */


const refs = {
    // btn_gen_id: document.body.querySelector("[generate_id]"), /* Attribute Selector */
    // btn_gen_id: document.body.querySelector(".generate_id"), /* CSS Selector */
    // btn_gen_id: document.body.querySelector("#generate_id"), /* ID Selector */
    btn_gen_id: document.getElementById("generate_id"), /* ID Selector */


    // form: document.body.querySelector("[genOptID]"), /* Attribute Selector */
    // form: document.body.querySelector(".genOptID"), /* CSS Selector */
    // form: document.body.querySelector("#genOptID"), /* ID Selector */
    form: document.getElementById('genOptID'), /* ID Selector */
};

function defaultOpt (event) {
    event.preventDefault(); 
    runGenId();
};

function customOpt (event) {
    event.preventDefault(); 
    // console.log(event.currentTarget);
    runGenId(event.currentTarget.genNumbers.value, event.currentTarget.addDate.checked);
};

document.getElementById('optId').addEventListener("change", (event) => {
    // console.log(event.currentTarget);
    if (event.currentTarget.checked) {
        refs.btn_gen_id.removeEventListener("click", defaultOpt)
        refs.form.addEventListener('submit', customOpt);
    }
    else if (!event.currentTarget.checked) {
        refs.form.removeEventListener('submit', customOpt)
        refs.btn_gen_id.addEventListener("click", defaultOpt);
    }
    else { console.error("Options have problem!"); }
});


function initialSetup() {
    refs.btn_gen_id.addEventListener("click", defaultOpt);
};
document.getElementById('genNumbers').value = 0;
document.getElementById('optId').checked = false;
initialSetup();









/* Next code for Generate ID */

let id = "";
let USE_DATE = true; // Include for Default in ID code date (true / false).
let GENERATE_NUMBER = 6; /* Change for Default ammount generated numbers in ID */

function runGenId(GEN_NUM = GENERATE_NUMBER, GEN_DATE = USE_DATE) {
    const alphabet = "ABCDEFGHIKLMNOPQRSTVXYZ";
    const randomLetterFirst = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomLetterSecond = alphabet[Math.floor(Math.random() * alphabet.length)];
    let randomNumbers = "";

    let i = null;    
    for (i = 0; i < GEN_NUM; i += 1) { 
        randomNumbers = randomNumbers + Math.floor(Math.random() * (9 - 1) + 0).toString();
    };
    // console.log(`Total generate numbers: ${i}`);

    let year = "";
    let month = "";
    let date = "";

    if (GEN_DATE) {
        year = (new Date).getFullYear().toString();
        month = ((new Date).getMonth() + 1).toString();
        if (month.length === 1) {
                month = "0" + month;
            };
        date = (new Date).getDate().toString();
    }

    id = `${ randomNumbers + randomLetterFirst + i + randomLetterSecond + year + month + date}`
    console.log(`ID: ${id}`);


    /* For use script DELETE functions "testId" and "descId", thats code show example */
    // testId(); /* Enable or disable test of repeat id */
    descId(randomNumbers, randomLetterFirst, i, randomLetterSecond, year, month, date, id); 


    return id;
    
};

export default runGenId;








/* ================ Code for test of repeat id (For use script DELETE this, thats code show example) ================ */

let arrayOfId = [];

/* Enable or disable auto test */
const AUTO_TEST_AMMOUNT_ID = 5000; /* Change for test ammount generated ID */
// for (let t = 0; t < AUTO_TEST_AMMOUNT_ID; t += 1) { 
//         runGenId();
// }; 

function testId() {
    console.log(`%c Test Enabled.`, 'background: #222; color: #bada55');
    if (arrayOfId.includes(id)) {
        console.log(`%c Warning: ID Repeat | ID Repeat: ${id}`, 'color: #ff1111');
    } else {
        arrayOfId.push(id);
    }
    console.log(`%c Total valid ID: ${arrayOfId.length}/${AUTO_TEST_AMMOUNT_ID}`, 'background: #222; color: #bada55');
};

/* ================ Code for description id (For use script DELETE this, thats code show example) ================ */

const descriptionID = {
    randomIdNumbers: document.body.querySelector("[randomIdNumbers]"), /* Attribute Selector */
    randomFirstLetterId: document.body.querySelector("[randomFirstLetterId]"), /* Attribute Selector */
    TotalGenNumId: document.body.querySelector("[TotalGenNumId]"), /* Attribute Selector */
    randomSecondId: document.body.querySelector("[randomSecondId]"), /* Attribute Selector */
    dateId: document.body.querySelector("[dateId]"), /* Attribute Selector */
    randomId: document.body.querySelector("[randomId]"), /* Attribute Selector */
}
    
    descriptionID.randomId.innerHTML = "000000A0A00000000";

function descId(randomNumbers, randomLetterFirst, i, randomLetterSecond, year, month, date, id) {
    descriptionID.randomIdNumbers.innerHTML = randomNumbers;
    descriptionID.randomFirstLetterId.innerHTML = randomLetterFirst;
    descriptionID.TotalGenNumId.innerHTML = i;
    descriptionID.randomSecondId.innerHTML = randomLetterSecond;
    descriptionID.dateId.innerHTML = year + month + date;
    descriptionID.randomId.innerHTML = id;
}



