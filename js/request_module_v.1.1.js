/* "Request module", v. 1.1 - 10.07.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

/* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/request_module_v.1.0.js" type="module"></script> and also use import/export; */


/* INSTRUCTION */
/* Examples and Tests in end on this is script */
/* dataRequest = await runUniversalFetch(LINK, METHOD, OBJECT WITH DATA, TIMEOUT, CONTENT TYPES VALUE, RESPONSE TYPE VALUE, CREDENTIALS VALUE); - Set options and send. Default for METHOD - "GET" */
/* Value for CONTENT TYPES VALUE: 0 (Default) - 'application/json', 1 - 'text/html', 2 - "text/xml", 3 - "". */
/* Value for RESPONSE TYPE VALUE: 0 (Default) - '', 1 - "json", 2 - "text", 3 - "arraybuffer", 4 - "blob", 5 - "document" */
/* Value for CREDENTIALS VALUE: 0 (Default) - 'same-origin', 1 - "include", 2 - "omit" */

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

let href = null; /* That's HTTP Adress */
let dataRequest = null; /* That's save your recive data here; */




/* ===================================== All options and requests ===================================== */

/* HTTP request methods
GET - The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
HEAD - The HEAD method asks for a response identical to a GET request, but without the response body.
POST - The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
PUT - The PUT method replaces all current representations of the target resource with the request payload.
DELETE - The DELETE method deletes the specified resource.
CONNECT - The CONNECT method establishes a tunnel to the server identified by the target resource.
OPTIONS - The OPTIONS method describes the communication options for the target resource.
TRACE - The TRACE method performs a message loop-back test along the path to the target resource.
PATCH - The PATCH method applies partial modifications to a resource.

GET — метод GET запрашивает представление указанного ресурса. Запросы с использованием GET должны получать только данные.
HEAD — Метод HEAD запрашивает ответ, идентичный запросу GET, но без тела ответа.
POST — Метод POST отправляет объект в указанный ресурс, что часто вызывает изменение состояния или побочные эффекты на сервере.
PUT — метод PUT заменяет все текущие представления целевого ресурса полезными данными запроса.
DELETE — метод DELETE удаляет указанный ресурс.
CONNECT — Метод CONNECT устанавливает туннель к серверу, указанному целевым ресурсом.
OPTIONS — Метод OPTIONS описывает параметры связи для целевого ресурса.
TRACE — Метод TRACE выполняет проверку обратной связи сообщения на пути к целевому ресурсу.
PATCH — Метод PATCH применяет к ресурсу частичные изменения.
*/

/* responseType property
"" - An empty responseType string is the same as "text", the default type.
"arraybuffer" - The response is a JavaScript ArrayBuffer containing binary data.
"blob" - The response is a Blob object containing the binary data.
"document" - The response is an HTML Document or XML XMLDocument, as appropriate based on the MIME type of the received data. See HTML in XMLHttpRequest to learn more about using XHR to fetch HTML content.
"json" - The response is a JavaScript object created by parsing the contents of received data as JSON.
"text" - The response is a text in a string.

"" — Пустая строка это то же самое что и тип по умолчанию responseType "text".
"arraybuffer" —  Ответом является JavaScript ArrayBuffer, содержащий двоичные данные.
"blob" —  Объект Blob содержит двоичные данные response.
"document" —  Это HTML-документ или XML-XMLDocument, в зависимости от MIME-типа полученных данных. Дополнительные сведения об использовании XHR для получения HTML-содержимого см. в разделе HTML в XMLHttpRequest.response.
"json" —  Это JavaScript-объект, созданный путем синтаксического анализа содержимого полученных данных в формате JSON.response.
"text" —  Это текст в строке response.
*/

/* Request: credentials property
"omit" - Never send credentials in the request or include credentials in the response.
"same-origin" - Only send and include credentials for same-origin requests.
"include" - Always include credentials, even for cross-origin requests.

"omit" - Никогда не отправляйте учетные данные в запросе и не включайте учетные данные в ответ.
"same-origin" - Отправляйте и включайте учетные данные только для запросов того же источника.
"include" - Всегда указывайте учетные данные, даже для запросов из разных источников.
*/


/* ===================================== All functions for universal requests ===================================== */

let request = null;
async function runUniversalFetch(url, method = "GET", object = {}, timeOUT = 5000, contentTypesValue = 0, responseTypeValue = 0, credentialsValue = 0) {
        /* That's old version */
    // if (url === null || url === undefined) {
    //     console.error("Link is not set.")
    //     return
    // } else { href = url };

    if (!url) {
        console.error("Link is not set.");
        return;
    } else { href = url };

    const contentTypes = ['application/json', 'text/html', "text/xml", ""]; /* "application/json", "text/html", "text/xml" */
    const responseTypeOptions = ['', "json", "text", "arraybuffer", "blob", "document"]; /* '', "json", "text", "arraybuffer", "blob", "document" */
    const credentialsOption = ['same-origin', "include", "omit"]; /* 'same-origin', "include", "omit" */
    const METHOD = method;
    let HEADERS = {};
    let BODY = null; 

    // if (METHOD === "POST" || METHOD === "PUT" || METHOD === "DELETE" || METHOD === "PATCH") { /* That's old version */
    if (["POST", "PUT", "DELETE", "PATCH"].includes(METHOD)) {
        BODY = JSON.stringify(object);
        HEADERS = { 'Content-Type': contentTypes[contentTypesValue] };
    }
    else if (METHOD === "GET") { HEADERS = { 'Content-Type': contentTypes[contentTypesValue] } }
    else if (METHOD === "HEAD") { HEADERS = { 'Content-Type': '' } };
    

    request = new Request(url, {
        method: METHOD,
        body: BODY,
        data: dataRequest || null,
        headers: HEADERS,
        credentials: credentialsOption[credentialsValue],
        timeout: timeOUT || 5000,
        responseType: responseTypeOptions[responseTypeValue],
        withCredentials: false,
    });

    
    dataRequest = requestFetchUniversal(request);
    return dataRequest;
};

async function requestFetchUniversal(request) {

    const response = await fetch(request.url, request);
    
    try {    
        // const response = await fetch(request.url, request); /* Or use FETCH here... */    
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error(response.statusText);
        } else {
            let result = null;
            const valueContentType = request.headers.get("Content-Type");
            if (valueContentType === 'application/json') {
                result = await response.json();
            } else if (valueContentType === 'text/html' || valueContentType === 'text/xml' ) {
                result = await response.text();
            } else { result = response };
            console.log("Result on Universal Fetch:", result);  /* Code for view what yor recive... */
            dataRequest = result;
            return result;
        }
    } catch (error) {
        console.log(error);
        return null;  /* Возвращаем null в случае ошибки */  
    };
};




/* ===================================== Code for TEST and Example ===================================== */
/* ================ Code for test (For use script DELETE this, thats code show example) ================ */
    
/* dataRequest = await runUniversalFetch(LINK, METHOD, OBJECT WITH DATA, TIMEOUT, CONTENT TYPES VALUE, RESPONSE TYPE VALUE, CREDENTIALS VALUE); - Set options and send. Default for METHOD - "GET" */
/* Value for CONTENT TYPES VALUE: 0 (Default) - 'application/json', 1 - 'text/html', 2 - "text/xml", 3 - "". */
/* Value for RESPONSE TYPE VALUE: 0 (Default) - '', 1 - "json", 2 - "text", 3 - "arraybuffer", 4 - "blob", 5 - "document" */
/* Value for CREDENTIALS VALUE: 0 (Default) - 'same-origin', 1 - "include", 2 - "omit" */


/* Example, uncomment for watch how this is work */
// dataRequest = await runUniversalFetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu", "GET", {}, 3000, 0, 1, 0); /* Example */

// href = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu";
// dataRequest = await runUniversalFetch(href, "HEAD", {});

// dataRequest = await runUniversalFetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/29"); /* Example with default method "GET" */

// console.log(`Save result in 'dataRequest': ${dataRequest}`, dataRequest); /* Final result */




document.body.querySelector("#request").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    
    const requestUrl = form.querySelector("#request_url").value;
    const requestMethod = form.querySelector("#request_method").value;
    const requestData = form.querySelector("#request_data").value;

    // console.log("Request URL:", requestUrl);
    // console.log("Request Method:", requestMethod);
    // console.log("Receive Data Type:", requestData);

    dataRequest = await runUniversalFetch(requestUrl, requestMethod, {}, 3000, requestData, 1, 0);
    document.body.querySelector("#request_info").innerHTML = dataRequest.name || dataRequest;

    console.log(`Save result in 'dataRequest': ${dataRequest}`, dataRequest); /* Final result */

});
