import { Entity } from "./Entity.js";

export class MoveableEntity extends Entity {
    static gravity = 5;

    /** @param {Entity[]} entityList */
    update(entityList) {
        super.update();
        this.move(0, MoveableEntity.gravity, entityList);
    }

    /** 
     * Moves Object to Position
     * @param {number} x 
     * @param {number} y 
     * @param {Entity[]} entityList
     */
    move(x, y, entityList) {
        let newX = this.x + x;
        let newY = this.y + y;

        // check if something is in the way
        for (const entity of entityList) {
            if (this == entity) continue;
            if (!(this.y < entity.y && newY < entity.y)) {
                newY = entity.y - 1;
            }
        }

        this.x = newX;
        this.y = newY;
    }
}