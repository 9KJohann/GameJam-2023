import { rgbaToHex } from "./utils.js";

export const WATER = 0;
export const AIR = 1;
export const EARTH = 2;

export class LevelTerrain {

    constructor(imageSource) {
        this.image = new Image();
        this.image.src = imageSource;
        this.image.onload = this.onload.bind(this);
    }

    onload() {
        const canvas = document.createElement("canvas");
        canvas.width = this.image.width;
        canvas.height = this.image.height;

        const context = canvas.getContext("2d");
        context.drawImage(this.image, 0, 0);
        this.imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    colorAtPixel(x, y) {
        x = Math.floor(Math.min(Math.max(x, 0), this.image.width))
        y = Math.floor(Math.min(Math.max(y, 0), this.image.height))

        let index = Math.floor(y * this.imageData.width + x) * 4;

        let colorR = this.imageData.data[index];
        let colorG = this.imageData.data[index + 1];
        let colorB = this.imageData.data[index + 2];
        let colorA = this.imageData.data[index + 3];

        // console.log(`index: ${index}`)
        return rgbaToHex(colorR, colorG, colorB, colorA);
        alert("help");
    }

    areaAtPixel(x, y) {
        const color = this.colorAtPixel(x, y);

        switch (color) {
            case "#003ebdff":
                return WATER;
            case "#92ffe4ff":// "#9fffe2ff":
                return AIR;
            case "#ffc300ff":
                return EARTH;
            default:
                console.debug('unkown area for color', color);
                return -1;
        }
    }
}