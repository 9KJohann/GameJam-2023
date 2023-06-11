import { Vector2D } from './Vector2D.js'

export class GameContext {
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas;
        /** @type { CanvasRenderingContext2D} */
        this.renderingContext = canvas.getContext("2d");
        /** @type {Vector2D} */
        this.scale = new Vector2D(1, 1);

        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.onWindowResize();
    }

    onWindowResize() {
        const aspectRatio = 5 / 4;
        const width = window.innerWidth / aspectRatio;
        const height = window.innerHeight;

        const min = Math.min(width, height);

        if (min > 0) {
            canvas.width = min * aspectRatio;
            canvas.height = min;
        }

        this.scale = new Vector2D(this.canvas.width / 1280, this.canvas.height / 1024);
        this.renderingContext.resetTransform();
        this.renderingContext.scale(this.scale.x, this.scale.y);
        console.log('GameContext.onWindowResize()', { scale: this.scale, canvas: new Vector2D(canvas.width, canvas.height) });
    }
}