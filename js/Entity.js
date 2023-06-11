import { EventEmitter } from "./EventEmitter.js";

export class Entity extends EventEmitter {
    /**
     *
     * @param {string} imageSrc path to image
     * @param {number} x starting x position
     * @param {number} y starting y position
     * @param {boolean} animatable is the image animatable
     * @param {number} frameHeight height of each frame
     * @param {number} frameWidth width of each frame
     * @param {string[]} animationStates array of animation states
     */
    constructor(
        imageSrc,
        x = 0,
        y = 0,
        animatable = false,
        frameHeight = 32,
        frameWidth = 32,
        animationStates = []
    ) {
        super();
        this.x = x;
        this.y = y;

        if (imageSrc) {
            this.image = new Image();
            this.image.src = imageSrc;
        }
        this.orientation = 1;
        this.lastOrientation = 1; //looks left

        if (!animatable) {
            this.width = this.image?.width ?? 0;
            this.height = this.image?.height ?? 0;
        }

        if (animatable) {
            this.animatable = animatable;
            this.sourceX = 0;
            this.sourceY = 0;
            this.width = frameHeight;
            this.height = frameWidth;
            this.animationStates = animationStates;

            this.gameFrame = 0;

            this.staggerFrames = 5;
            this.spriteAnimations = [];

            this.currentState = "idle";

            this.animationStates.forEach((state, index) => {
                let frames = {
                    loc: [],
                };
                for (let j = 0; j < state.frames; j++) {
                    let positionX = j * this.width;
                    let positionY = index * this.height;
                    frames.loc.push({ x: positionX, y: positionY });
                }
                this.spriteAnimations[state.name] = frames;
            });
        }
    }

    update() { }

    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        if (this.image) {
            if (this.animatable) {
                console.log(this.spriteAnimations);
                let position =
                    Math.floor(this.gameFrame / this.staggerFrames) %
                    this.spriteAnimations[this.currentState].loc.length;

                let frameX = this.spriteAnimations[this.currentState].loc[position].x;
                let frameY = this.spriteAnimations[this.currentState].loc[position].y;

                if (this.orientation < 0) {
                    context.scale(-1, 1);
                    context.drawImage(
                        this.image,
                        frameX,
                        frameY,
                        this.width,
                        this.height,
                        -this.x,
                        this.y,
                        -this.width,
                        this.height
                    );
                    this.lastOrientation = -1;
                    context.scale(-1, 1);
                }
                if (this.orientation == 0) {
                    if (this.lastOrientation == 1)
                        context.drawImage(this.image, frameX, frameY, this.width, this.height, this.x, this.y, this.width, this.height);
                    if (this.lastOrientation == -1) {
                        context.scale(-1, 1);
                        context.drawImage(this.image, frameX, frameY, this.width, this.height, -this.x, this.y, -this.width, this.height);
                    }
                }
                if (this.orientation > 0) {
                    this.lastOrientation = 1;
                    context.drawImage(
                        this.image,
                        frameX,
                        frameY,
                        this.width,
                        this.height,
                        this.x,
                        this.y,
                        this.width,
                        this.height
                    );
                }



                this.gameFrame++;
            } else {
                {
                    if (this.orientation < 0) {
                        context.scale(-1, 1);
                        context.drawImage(this.image, -this.x, this.y, -this.width, this.height);
                    } else {
                        context.drawImage(this.image, this.x, this.y, this.width, this.height);
                    }
                }
            }
        }
    }

    /** @param {Entity} other */
    collidesWith(other) {
        let dx = this.x + this.width / 2 - (other.x + other.width / 2);
        let dy = this.y + this.height / 2 - (other.y + other.height / 2);
        let width = (this.width + other.width) / 2;
        let height = (this.height + other.height) / 2;
        let crossWidth = width * dy;
        let crossHeight = height * dx;
        let collision = "none";

        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                collision = crossWidth > -crossHeight ? "bottom" : "left";
            } else {
                collision = crossWidth > -crossHeight ? "right" : "top";
            }
        }
        return collision;
    }

    /** @param {Entity[]} array */
    collidesWithArray(array) {
        let collisions = [];
        for (let i = 0; i < array.length; i++) {
            let collision = this.collidesWith(array[i]);
            if (collision !== "none" && this !== array[i]) {
                collisions.push(collision);
            }
        }
        if (collisions.length == 0) {
            collisions.push("none");
        }
        return collisions;
    }
}
