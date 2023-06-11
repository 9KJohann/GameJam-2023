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

        window.addEventListener('resize', this.onResize.bind(this));
    }

    onResize() {
        this.scale = new Vector2D(window.innerWidth / 1280, window.innerHeight / 1024);
        this.renderingContext.scale(this.scale.x, this.scale.y);
        console.log('GameContext.onResize()', this.scale);
    }
}