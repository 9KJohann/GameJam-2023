import { Entity } from "./Entity.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const background = new Image();
background.src = "images/Cavern.png";

const bee = new Entity("images/Bee.png");
const ducky = new Entity("images/Ducky.png")


//alert("Hi ich bin nervig!"); // by Kaddah

function onDraw() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.drawImage(background, 0, 0, 150, 150);

    bee.draw(context);
    ducky.draw(context);
    requestAnimationFrame(onDraw);
}

onDraw();