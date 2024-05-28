document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("practiceCanvas");
    const ctx = canvas.getContext("2d");
    const clearButton = document.getElementById("clearButton");

    canvas.width = 400;
    canvas.height = 200;

    let drawing = false;

    // Menambahkan event listener untuk interaksi sentuhan
    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDrawing, { passive: false });

    // Event listener untuk mouse tetap ada untuk kompatibilitas desktop
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    clearButton.addEventListener("click", clearCanvas);

    function getTouchPosition(touchEvent) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    function startDrawing(event) {
        drawing = true;
        ctx.beginPath();
        const position = event.type === 'touchstart'? getTouchPosition(event) : { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };
        ctx.moveTo(position.x, position.y);
    }

    function draw(event) {
        if (!drawing) return;
        event.preventDefault();

        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#4682b4";

        const position = event.type === 'touchmove'? getTouchPosition(event) : { x: event.clientX - canvas.offsetLeft, y: event.clientY - canvas.offsetTop };
        ctx.lineTo(position.x, position.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
    }

    function stopDrawing() {
        drawing = false;
        ctx.beginPath();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});
