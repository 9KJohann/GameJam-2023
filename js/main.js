import { CollectableEntity } from "./CollectableEntity.js";
import { Entity } from "./Entity.js";
import { GameContext } from "./GameContext.js";
import { InputHandler } from "./InputHandler.js";
import { LevelTerrain, WATER, EARTH, AIR } from "./LevelTerrain.js";
import { MoveableEntity } from "./MoveableEntity.js";
import { Vector2D } from "./Vector2D.js";
import { Jar } from "./Jar.js";

function main() {
    let font = new FontFace("Press Start 2P", "url(font_Press_Start_2P/PressStart2P-Regular.ttf)");
    font.load().then(() => {
        document.fonts.add(font);
    });

    const debug = false;
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("canvas");
    const gameContext = new GameContext(canvas);
    const context = gameContext.renderingContext;

    let lost = false;
    let start = false;
    let won = false;
    //const textFont = new FontFace("Press Start 2P", "url(font_Press_Start_2P/PressStart2P-Regular.ttf)");

    window.addEventListener("loose", () => {
        lost = true;
    });

    window.addEventListener("start", () => {
        start = true;
    });

    window.addEventListener(InputHandler.EVENT_SWAP, () => {
        if (gameContext.player == bee) {
            gameContext.player = ducky;
        } else {
            gameContext.player = bee;
        }
    });

    window.addEventListener(InputHandler.EVENT_DROP, () => {
        gameContext.player?.drop();
    });

    const background = new Entity("images/Level_1_Background.png");
    const startScreen = new Entity("images/Start_Background.png");
    const terrain = new LevelTerrain("images/Level_1_Background_Collision.png")

    const chest = new Jar("images/Chest_Opened.png", "images/Chest_Closed.png", 815, 945);
    chest.close();

    const jar = new Jar("images/Jar_Opened.png", "images/Jar_Closed.png", 1056, 453);
    jar.close();

    const bee = new MoveableEntity(
        "images/BeeAnimation.png",
        1055,
        465,
        true,
        50,
        45,
        [
            {
                name: "carry",
                frames: 4,
            },
            {
                name: "idle",
                frames: 4,
            },
        ]
    );
    const ducky = new MoveableEntity(
        "images/DuckyAnimation.png",
        0,
        520,
        true,
        50,
        42,
        [
            {
                name: "idle",
                frames: 5,
            },
            {
                name: "carry",
                frames: 5,
            },
        ]
    );

    ducky.on('collision', (entity) => {
        if (entity == jar) {
            jar.open();
        }
        if (entity == chest && ducky.collected === key) {
            chest.open();
            won = true;
        }
    })

    const key = new CollectableEntity("images/Key.png");

    key.x = 130;
    key.y = 145;

    const input = new InputHandler();

    const entities = [bee, ducky, jar, chest];
    const collectables = [key];
    gameContext.player = ducky;
    function onUpdate() {
        bee.update(entities);
        ducky.update(entities);
        for (const collectable of collectables) {
            collectable.update(entities);
        }
        input.updateInput();

        const move = new Vector2D(0, 0);
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


        if (gameContext.player == bee && !jar.isOpened()) {
            return;
        }


        gameContext.player.accelerate(move.x, move.y);

        const area = terrain.areaAtPixel(gameContext.player.x, gameContext.player.y);
        switch (area) {
            case WATER:
                if (gameContext.player == bee) {
                    window.dispatchEvent(new Event('loose'));
                }
                break;
            case AIR:
                break;
            case EARTH:
                break;
            default:
                break;
        }

    }

    function onDraw() {
        if (start) {
            if (!lost && !won) {
                onUpdate();
            }
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

                // drawDebugText(context, `speedX=${bee.speedX}`, line++);
                // drawDebugText(context, `speedY=${bee.speedY}`, line++);
                // drawDebugText(context, `accelX=${bee.accelerationX}`, line++);
                // drawDebugText(context, `accelY=${bee.accelerationY}`, line++);
                drawDebugText(context, JSON.stringify({ position: new Vector2D(gameContext.player.x, gameContext.player.y) }), line++);

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
                drawDebugText(context, "Ducky is at: " + terrain.areaAtPixel(ducky.x, ducky.y), line++);
                drawDebugText(context, "Color is: " + terrain.colorHexAtPixel(gameContext.player.x, gameContext.player.y), line++);
                drawDebugText(context, `keyCollected=${key.isCollected()}`, line++);
            }
            if (lost) {
                drawEndScreen();
            }
            if (won) {
                drawWonScreen();
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

    function drawWonScreen() {
        context.fillStyle = "#00000088";
        context.fillRect(0, 0, 1280, 1024);

        context.font = "135px 'Press Start 2P'";
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("you won!", 1280 / 2, 1024 / 2);

        context.font = "133px 'Press Start 2P'";
        context.fillStyle = "orange";
        context.textAlign = "center";
        context.fillText("you won!", 1280 / 2, 1024 / 2);

        context.font = "130px 'Press Start 2P'";
        context.fillStyle = "#FFD700";
        context.textAlign = "center";
        context.fillText("you won!", 1280 / 2, 1024 / 2);
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
        // explanation box
        context.fillStyle = "#FFD70099";
        context.fillRect(0, 0, 400, 100);
        fontsize = 25;
        let line = 0;
        let startpoint = 53
        context.font = `${fontsize}px 'Press Start 2P'`;
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("yellow: switch", 5, (startpoint + (line++) * fontsize));
        context.fillText("green:  drop", 5, (startpoint + (line++) * fontsize));



    }


    function drawDebugText(ctx, text, line) {
        let debugPosX = 600;
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
