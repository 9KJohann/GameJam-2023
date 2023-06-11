import { CollectableEntity } from "./CollectableEntity.js";
import { Entity } from "./Entity.js";
import { InputHandler } from "./InputHandler.js";
import { MoveableEntity } from "./MoveableEntity.js";
import { resizeCanvas } from "./resizeCanvas.js";

function main() {
    const debug = true;

    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    resizeCanvas();
    window.onresize = resizeCanvas;

    const background = new Entity("images/Level_1_Background.png");
    const bee = new MoveableEntity(
        "images/BeeAnimation.png",
        100,
        100,
        true,
        50,
        50,
        [
            {
                name: "idle",
                frames: 3,
            },
        ]
    );
    const ducky = new Entity("images/Ducky.png", 200, 200);
    const floor = new Entity();
    const key = new CollectableEntity("images/Key.png");
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

    const entities = [bee, floor, chest, ducky];
    const collectables = [key];

    function onUpdate() {
        bee.update(entities);
        for (const collectable of collectables) {
            collectable.update(entities);
        }
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
        // canvas leeren
        context.clearRect(0, 0, canvas.width, canvas.height);

        // mit weiß füllen, damit das canvas sichtbar ist
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // zeichnen
        background.width = canvas.width;
        background.height = canvas.height;
        background.draw(context);

        for (const entity of entities) {
            entity.draw(context);
        }

        for (const collectable of collectables) {
            collectable.draw(context);
        }

        // debug stuff
        if (debug) {
            let line = 0;

            drawDebugText(context, `speedX=${bee.speedX}`, line++);
            drawDebugText(context, `speedY=${bee.speedY}`, line++);
            drawDebugText(context, `accelX=${bee.accelerationX}`, line++);
            drawDebugText(context, `accelY=${bee.accelerationY}`, line++);

            drawDebugText(context, `collisionX=${bee.collidesWith(ducky)}`, line++);

            let debugStrInput = "";
            if (input.upPressed) {
                debugStrInput += "UP ";
            }
            if (input.downPressed) {
                debugStrInput += " DOWN ";
            }
            if (input.leftPressed) {
                debugStrInput += " LEFT ";
            }
            if (input.rightPressed) {
                debugStrInput += " RIGHT ";
            }
            drawDebugText(context, debugStrInput, line++);
            drawDebugText(context, `keyCollected=${key.isCollected()}`, line++);
        }

        requestAnimationFrame(onDraw);
    }

    function drawDebugText(ctx, text, line) {
        let debugPosX = 400;
        let debugPosY = 50;
        let fontsize = 24;
        ctx.font = `${fontsize}px arial`;
        ctx.fillStyle = "#000000";

        ctx.fillText(text, debugPosX, debugPosY + line * (fontsize + 4));
    }

    // wait until all entities loaded
    Promise
        .all(entities.map(entity => entity.isLoaded()))
        .then(() => requestAnimationFrame(onDraw));
}

window.onload = main;
