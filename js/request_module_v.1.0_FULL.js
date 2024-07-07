/* "Request module", v. 1.0 - 07.07.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

/* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/request_module_v.1.0.js" type="module"></script> */

/* INSTRUCTION */
/* Examples and Tests in end on this is script */
/* All functions with Fetch: requestFetchSmall, requestFetchLitle, requestFetchLite, requestFetchMedium, requestFetchLarge, requestFetchUniversal */
/* initializateRequestUniversal(LINK, METHOD, OBJECT WITH DATA, TIMEOUT, RECIVE DATA, RECIVE TYPE); - First step: set options. Default for METHOD - "GET" */
/* Value for RECIVE DATA: 0 (Default) - 'application/json', 1 - 'text/html', 2 - "text/xml", 3 - "". */
/* Value for RECIVE TYPE: 0 (Default) - '', 1 - "json", 2 - "text", 3 - "arraybuffer", 4 - "blob", 5 - "document" */
/* await requestFetchUniversal(request); - Second step, send. */

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

let href = null; /* That's HTTP Adress. For use replace this string OR use function initializateRequest(); */
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


/* Universal request */
let request = null;
function initializateRequestUniversal(url, method = "GET", object = {}, timeOUT = 5000, reciveData = 0, reciveType = 0) {
    if (url === null || url === undefined) {
        console.error("Link is not set.")
        return
    } else { href = url };

    const contentTypes = ['application/json', 'text/html', "text/xml", ""]; /* "application/json", "text/html", "text/xml" */
    const dataOut = ['', "json", "text", "arraybuffer", "blob", "document"]; /* '', "json", "text", "arraybuffer", "blob", "document" */
    const METHOD = method;
    let HEADERS = {};
    let BODY = null; 

    if (METHOD === "POST" || METHOD === "PUT" || METHOD === "DELETE" || METHOD === "PATCH") { BODY = JSON.stringify(object) };

    if (METHOD === "GET") { HEADERS = { 'Content-Type': contentTypes[reciveData] } }
    else if (METHOD === "HEAD") { HEADERS = { 'Content-Type': '' } };
    


    request = new Request(url, {
        method: METHOD,
        body: BODY,
        data: dataRequest || null,
        headers: HEADERS,
        credentials: 'same-origin',
        timeout: timeOUT || 5000,
        responseType: dataOut[reciveType],
        withCredentials: false,
    });
};

/* GET request */
let requestGET = {
    method: 'GET',
    body: null,
    data: dataRequest || null,
    headers: {},
    credentials: 'same-origin',
    timeout: 5000,
    responseType: '',
    withCredentials: false,
};

/* POST request */
let requestPOST = {
    method: 'POST',
    body: JSON.stringify({
        id: "",
        account: "",
        key: "",
        location: "",
        time_zone: 0,
    }),
    headers: {
        'Content-Type': 'application/json', /* "application/json", "text/html", "text/xml" */
    },
    credentials: 'same-origin',
    data: dataRequest || null,
    timeout: 5000,
    responseType: '',
    withCredentials: false,
};






/* ===================================== All different functions with Fetch ===================================== */
    
async function requestFetchSmall(href) {
    return await fetch(href)
    .then(response => {
        return response.json();
    })
    .then(result => {
        dataRequest = result;
        return dataRequest;
    })
    .catch(error => {
        console.log("ERROR", error);
    })
};

async function requestFetchLitle(href, requestMethod, requestData) {
    // Пример использования данных для отправки запроса

    fetch(href, {
        method: requestMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestMethod !== 'GET' && requestMethod !== 'HEAD' ? JSON.stringify({data: requestData}) : null
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response Data:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
};


async function requestFetchLite(request) {
    return await fetch(request)
  .then((response) => {
    if (response.status === 200) {
        dataRequest = response.json();
        return dataRequest;
    } else {
        throw new Error("Something went wrong on API server!");
    }
  })
  .then((response) => {
    // console.debug(response);
        dataRequest = response;
        return response;
  })
  .catch((error) => {
    console.error(error);
  });
};



async function requestFetchMedium(href, optionsRequest) {

    const options = new Headers({
    "Content-Type": "application/json", /* "application/json", "text/html", "text/xml" */
    "X-Custom-Header": "",
    "x-api-key": "",
    });

    const response = await fetch(href, optionsRequest || options);
    
    try {    
        // const response = await fetch(href, options); /* Or use FETCH here... */    
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error(response.statusText);
        } else {
            let result = await response.json();
            // console.log(result);  /* Code for view what yor recive... */
            dataRequest = result;
            return result;
        }
    } catch (error) {
        console.log(error);
        return null;  /* Возвращаем null в случае ошибки */  
    };
};


async function requestFetchLarge ( url, {method = 'GET', data = null, headers = {}, credentials = 'same-origin', timeout = 5000, body}) {
    try {
        // Тайм-аут для запроса
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutRequest = setTimeout(() => controller.abort(), timeout);

        // Параметры fetch
        const fetchOptions = {
            method,
            body,
            headers,
            credentials,
            signal
        };

        // Добавление данных к запросу
        if (data) {
            if (headers['Content-Type'] === 'application/json') {
                fetchOptions.body = JSON.stringify(data);
            } else {
                fetchOptions.body = data;
            }
        }

        const response = await fetch(url, fetchOptions);
        clearTimeout(timeoutRequest);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let result = await response.json();
        // console.log(result);  /* Code for view what yor recive... */
        dataRequest = result;
        return result;
    } catch (error) {
        console.error(`HTTP request failed: ${error}`);
        return null;
    }
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
            // console.log(result);  /* Code for view what yor recive... */
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
    
/* All functions with Fetch: requestFetchSmall, requestFetchLitle, requestFetchLite, requestFetchMedium, requestFetchLarge, requestFetchUniversal */


/* initializateRequestUniversal(LINK, METHOD, OBJECT WITH DATA, TIMEOUT, RECIVE DATA, RECIVE TYPE); - First step: set options. Default for METHOD - "GET" */
/* Value for RECIVE DATA: 0 (Default) - 'application/json', 1 - 'text/html', 2 - "text/xml", 3 - "". */
/* Value for RECIVE TYPE: 0 (Default) - '', 1 - "json", 2 - "text", 3 - "arraybuffer", 4 - "blob", 5 - "document" */
/* await requestFetchUniversal(request); - Second step, send. */


/* Example, uncoment for watch how this is work */
initializateRequestUniversal("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu", "HEAD", {}, 3000, 0, 0); 
let rfu = await requestFetchUniversal(request);
console.log("requestFetchUniversal:", rfu);
// console.log("dataRequest:", dataRequest);

/* Example, uncoment for watch how this is work */
initializateRequestUniversal("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu", "GET", {}); /* Example */
(async () => {
    rfu = await requestFetchUniversal(request);
    console.log("requestFetchUniversal:", rfu);
    // console.log("dataRequest:", dataRequest);
})();

/* Example, uncoment for watch how this is work */
initializateRequestUniversal("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/29"); /* Example with default method "GET" */
(async () => {
    rfu = await requestFetchUniversal(request);
    console.log("requestFetchUniversal - Short:", rfu);
    // console.log("dataRequest:", dataRequest);
})();


/* TEST other functions */

// const dataFetchSmall = await requestFetchSmall(href);
// console.log("dataFetchSmall:", dataFetchSmall);

// const dataFetchLite = await requestFetchLite(request);
// console.log("dataFetchLite:", dataFetchLite);

// const dataFetchMedium = await requestFetchMedium(request);
// console.log("dataFetchMedium:", dataFetchMedium);

// const dataFetchLarge = await requestFetchLarge(href, request);
// console.log("dataFetchLarge:", dataFetchLarge);



// console.log("dataRequest:", dataRequest);

