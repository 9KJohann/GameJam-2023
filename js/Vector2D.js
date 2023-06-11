export class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * 
     * @param {Vector2D} vec 
     */
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }

    /**
     * 
     * @param {Vector2D} vec 
     */
    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    }

    /**
     * 
     * @param {number} value 
     */
    scale(value) {
        this.x *= value;
        this.y *= value;
    }
}