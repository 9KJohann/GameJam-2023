import { CollectableEntity } from "./CollectableEntity.js";
import { Entity } from "./Entity.js";
import { GameContext } from "./GameContext.js";
import { InputHandler } from "./InputHandler.js";
import { LevelTerrain } from "./LevelTerrain.js";
import { MoveableEntity } from "./MoveableEntity.js";
import { resizeCanvas } from "./resizeCanvas.js";

function main() {
    let font = new FontFace("Press Start 2P", "url(font_Press_Start_2P/PressStart2P-Regular.ttf)");
    font.load().then(() => {
        document.fonts.add(font);
    });

    const debug = true;
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("canvas");
    const gameContext = new GameContext(canvas);
    const context = gameContext.renderingContext;

    let lost = false;
    let start = false;
    //const textFont = new FontFace("Press Start 2P", "url(font_Press_Start_2P/PressStart2P-Regular.ttf)");

    window.addEventListener("loose", () => {
        lost = true;
    });

    window.addEventListener("start", () => {
        start = true;
    });

    const background = new Entity("images/Level_1_Background.png");
    const startScreen = new Entity("images/Start_Background.png");
    const terrain = new LevelTerrain("images/Level_1_Background_Collision.png")

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
                frames: 4,
            },
        ]
    );
    const ducky = new MoveableEntity(
        "images/DuckyAnimation.png",
        200,
        200,
        true,
        50,
        50,
        [
            {
                name: "idle",
                frames: 5,
            },
        ]
    );
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
        if (start) {
            onUpdate();
            // canvas leeren
            context.clearRect(0, 0, canvas.width, canvas.height);

            // mit weiß füllen, damit das canvas sichtbar ist
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);

            // zeichnen
            background.width = canvas.width;
            background.height = canvas.height;
            //background.draw(context); // eigentlich sollte der Background so gezeichnet werden, allerdings wurde etwas in Entity geändert, wodurch der background nicht mehr richtig gezeichnet wird.
            context.drawImage(background.image, 0, 0);


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
                    debugStrInput += "DOWN ";
                }
                if (input.leftPressed) {
                    debugStrInput += "LEFT ";
                }
                if (input.rightPressed) {
                    debugStrInput += "RIGHT ";
                }
                drawDebugText(context, debugStrInput, line++);

                drawDebugText(context, "Bee is at: " + terrain.areaAtPixel(bee.x, bee.y), line++);
                drawDebugText(context, "Color is: " + terrain.colorAtPixel(bee.x, bee.y), line++);
                drawDebugText(context, `keyCollected=${key.isCollected()}`, line++);
            }
            if (lost) {
                drawEndScreen();
            }
        } else {
            drawStartScreen();

        }

        requestAnimationFrame(onDraw);
    }

    function drawEndScreen() {
        context.fillStyle = "#000000CC";
        context.fillRect(0, 0, 1280, 1024);


        context.font = "105px 'Press Start 2P'";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("you lost", 1280 / 2, 1024 / 2);

        context.font = "103px 'Press Start 2P'";
        context.fillStyle = "orange";
        context.textAlign = "center";
        context.fillText("you lost", 1280 / 2, 1024 / 2);

        context.font = "100px 'Press Start 2P'";
        context.fillStyle = "#FFD700";
        context.textAlign = "center";
        context.fillText("you lost", 1280 / 2, 1024 / 2);

    }

    function drawStartScreen() {
        input.updateInput();
        if (input.upPressed || input.downPressed || input.leftPressed || input.rightPressed) {
            start = true;
        }

        context.drawImage(startScreen.image, 0, 0, 1280, 1024);
        let width = 600;
        let height = 200;
        context.fillStyle = "#000000";
        context.fillRect(1280 / 2 - width / 2, 1024 / 2 - height / 2, width, height);

        context.fillStyle = "#FFD700";
        context.fillRect(1280 / 2 - (width - 10) / 2, 1024 / 2 - (height - 10) / 2, (width - 10), (height - 10));

        let fontsize = 100;
        context.font = `${fontsize}px 'Press Start 2P'`;
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("start", 1280 / 2, 1024 / 2 + fontsize / 2);
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
