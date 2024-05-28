document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("practiceCanvas");
    const ctx = canvas.getContext("2d");
    const clearButton = document.getElementById("clearButton");

    canvas.width = 400;
    canvas.height = 200;

    let drawing = false;

    drawDashedLetterA();

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
    clearButton.addEventListener("click", clearCanvas);

    function drawDashedLetterA() {
        ctx.setLineDash([5, 5]);  // Set dashed line
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#87ceeb";

        // Draw "A"
        ctx.beginPath();
        ctx.moveTo(200, 50);
        ctx.lineTo(150, 150);
        ctx.moveTo(200, 50);
        ctx.lineTo(250, 150);
        ctx.moveTo(175, 100);
        ctx.lineTo(225, 100);
        ctx.stroke();
        ctx.setLineDash([]);  // Reset to solid line
    }

    function startDrawing(event) {
        drawing = true;
        draw(event);
    }

    function draw(event) {
        if (!drawing) return;

        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#4682b4";

        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }

    function stopDrawing() {
        drawing = false;
        ctx.beginPath();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawDashedLetterA();
    }
});
