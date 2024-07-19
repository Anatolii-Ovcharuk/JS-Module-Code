/* "Signature module", v. 1.0 - 20.07.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */

    /* INSTALLATION */
/* Use this line in HTML for include: <script src="./js/signature_module_v.1.0.js" type="module"></script> */
/* Use this line in HTML for include: 
        <form id="signature-form">
            <canvas id="signature-pad"></canvas>
            <div class="controls">
                <button type="button" id="clear-btn">Clear</button>
                <button type="button" id="save-btn">Save</button>
            </div>
            <!-- <img id="saved-image" style="display: none; margin-top: 10px; border: 1px solid #000;" /> -->
            <button type="submit">Submit</button>
        </form>
*/

// "use strict"; /* That's Strict mode;  ⛔ DONT USE OTHER CODE WITH THIS IS STRICT, IF YOUR ALL CODE NOT "USE STRICT" OR TYPE="MODULE"... */

const colorPen = "#0000ff" // "#000000" - Black, "#ff0000" - Red, "#00ff00" - Green, "#0000ff" - Blue; 
let signPanel = {
        /* SELECT ONLY ONE STRING */
    // signature_form: document.body.querySelector("[signature-form]"), /* Attribute Selector */
    // signature_form: document.body.querySelector(".signature-form"), /* CSS Selector */
    // signature_form: document.body.querySelector("#signature-form"), /* ID Selector */
    signature_form: document.getElementById('signature-form'), /* ID Selector */

        /* SELECT ONLY ONE STRING */
    // save_btn: document.body.querySelector("[save-btn]"), /* Attribute Selector */
    // save_btn: document.body.querySelector(".save-btn"), /* CSS Selector */
    // save_btn: document.body.querySelector("#save-btn"), /* ID Selector */
    save_btn: document.getElementById('save-btn'), /* ID Selector */

        /* SELECT ONLY ONE STRING */
    // clear_btn: document.body.querySelector("[clear-btn]"), /* Attribute Selector */
    // clear_btn: document.body.querySelector(".clear-btn"), /* CSS Selector */
    // clear_btn: document.body.querySelector("#clear-btn"), /* ID Selector */
    clear_btn: document.getElementById('clear-btn'), /* ID Selector */


};


document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('signature-pad');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let x = 0;
    let y = 0;

    /* Style for canvas */
    const width = 90 // Set value in percent;
    canvas.style.border = `1px solid #252525`;
    canvas.style.width = `${width}%`;
    canvas.style.height = `${width / 3}%`;
    canvas.style.display = "block";
    canvas.style.margin = "0px auto";

    // Resize canvas to fill the parent element
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Start drawing
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        x = e.offsetX;
        y = e.offsetY;
    });

    // Stop drawing
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        x = 0;
        y = 0;
    });

    // Draw on canvas
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            drawLine(ctx, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    });

    // Handle touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (e.touches.length == 1) {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (isDrawing && e.touches.length == 1) {
            const rect = canvas.getBoundingClientRect();
            drawLine(ctx, x, y, e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        }
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        isDrawing = false;
        x = 0;
        y = 0;
    });

    function drawLine(ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `${colorPen}`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    // Clear button
    signPanel.clear_btn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // document.getElementById('saved-image').style.display = 'none';
    });

    // Save button
    signPanel.save_btn.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        // const savedImage = document.getElementById('saved-image');
        // savedImage.src = dataURL;
        // savedImage.style.display = 'block';

        // Optionally, you can download the image
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    });

    // Form submission
    signPanel.signature_form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (isCanvasEmpty()) {
            console.log('Please provide a signature before submitting.');
            alert('Please provide a signature before submitting.');
        } else {
            // Создаем input для хранения данных подписи
            const dataURL = canvas.toDataURL('image/png');
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'signature';
            input.value = dataURL;

            signPanel.signature_form.appendChild(input);

            // Теперь можно отправить форму
            console.log(input);
            // document.getElementById('signature-form').submit();
        }
    });

    function isCanvasEmpty() {
        const emptyCanvas = document.createElement('canvas');
        emptyCanvas.width = canvas.width;
        emptyCanvas.height = canvas.height;
        return canvas.toDataURL() === emptyCanvas.toDataURL();
    }
});
