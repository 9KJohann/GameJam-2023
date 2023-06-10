export class Entity {
    /**
     * 
     * @param {string} imageSrc path to image
     */
    constructor(imageSrc) {
        this.x = 0;
        this.y = 0;

        if (imageSrc) {
            this.image = new Image();
            this.image.src = imageSrc;
        }


        this.width = this.image?.width ?? 0;
        this.height = this.image?.height ?? 0;
    }

    update() { }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        if (this.image) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    /** @param {Entity} other */
    collidesWith(other) {
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }

    /** @param {Entity[]} array */
    collidesWithArray(array) {
        for (let i = 0; i < array.length; i++) {
            if (this.collidesWith(array[i]) && this !== array[i]) {
                console.log("collides");
                return true;
            }
            return false;
        }
    }
}