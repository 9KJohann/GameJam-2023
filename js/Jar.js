import { Entity } from "./Entity.js";

export class Jar extends Entity {
    constructor(openedImageSrc, closedImageSrc, x, y) {
        super(openedImageSrc, x, y);
        this.openedImage = this.image;
        this.closedImage = new Image();
        this.closedImage.src = closedImageSrc;
    }

    open() {
        this.image = this.openedImage;
    }

    isOpened() {
        return this.openedImage == this.image;
    }

    close() {
        this.image = this.closedImage;
    }
}