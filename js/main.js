import { Entity } from "./Entity.js";
import { resizeCanvas } from "./resizeCanvas.js";

function main() {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");

    resizeCanvas();
    window.onresize = resizeCanvas;

    const background = new Entity("images/Cavern.png");
    const bee = new Entity("images/Bee.png");
    const ducky = new Entity("images/Ducky.png")

    function onDraw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // mit weiß füllen, damit das canvas sichtbar ist
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        background.draw(context);

        bee.draw(context);
        ducky.draw(context);
        requestAnimationFrame(onDraw);
    }

    onDraw();
}

window.onload = main;