import { Entity } from "./Entity.js";
import { InputHandler } from "./InputHandler.js";
import { MoveableEntity } from "./MoveableEntity.js";
import { resizeCanvas } from "./resizeCanvas.js";

function main() {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");

    resizeCanvas();
    window.onresize = resizeCanvas;

    const background = new Entity("images/Level_1_Background.png");
    const bee = new MoveableEntity("images/Bee.png");
    const ducky = new Entity("images/Ducky.png");
    const floor = new Entity();
    const key = new Entity("images/Key.png");
    const chest = new Entity("images/Chest.png");

    chest.x = 500;
    chest.y = 200;

    key.x = 400;
    key.y = 200;
    floor.x = 0;
    floor.y = 500;
    floor.width = 1000;
    floor.height = 100;

    const input = new InputHandler();

    const entities = [bee, floor, key, chest, ducky];
    function onUpdate() {
        bee.update(entities);
        input.updateInput();

        const move = { x: 0, y: 0 };
        if (input.upPressed) {
            move.y -= 10;
        } else if (input.downPressed) {
            move.y += 10;
        }

        if (input.rightPressed) {
            move.x += 10;
        } else if (input.leftPressed) {
            move.x -= 10;
        }
        bee.accelerate(move.x, move.y);
    }

    function onDraw() {
        onUpdate();
        context.clearRect(0, 0, canvas.width, canvas.height);

        // mit weiß füllen, damit das canvas sichtbar ist
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        background.width = canvas.width;
        background.height = canvas.height;
        background.draw(context);

        for (const entity of entities) {
            entity.draw(context)
        }
        requestAnimationFrame(onDraw);
    }

    onDraw();
}

window.onload = main;