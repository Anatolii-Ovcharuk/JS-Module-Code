/* "Benchmark Lite", v. 0.1 | MIT License | Made by Anatolii Ovcharuk */
/* Use this line in HTML for include: <script src="./js/benchmark.js" type="module"></script> */

const benchmark = () => {
let start = Date.now(); /* Start time */
/* Process */
let total = 0;
for (let i = 0; i < 200000000; i+= 1) {
  total += i;
}
let end = Date.now(); /* End time */
// console.log (total, end - start);
return alert( `Process complete at ${end - start} ms.` );
}

benchmark();



