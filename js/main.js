/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const background = new Image();
background.src = "images/Cavern.png";

const bee = new Image();
bee.src = "images/Bee.png";
const ducky = new Image();
ducky.src = "images/Ducky.png";

alert("Hi ich bin nervig!"); // by Kaddah

function onDraw() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.drawImage(background, 0, 0, 150, 150);
    context.drawImage(bee, 0, 0, 50, 50);
    context.drawImage(ducky, 75, 75, 50, 50);
    requestAnimationFrame(onDraw);
}

onDraw();