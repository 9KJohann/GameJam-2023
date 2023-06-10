export class Entity {

    constructor(imageSrc) {
        this.x = 0;
        this.y = 0;

        this.image = new Image();
        this.image.src = imageSrc;
    }

    update() {

    }

    /** @param {CanvasRenderingContext2D} context */
    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }
}