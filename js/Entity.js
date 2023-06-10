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
}