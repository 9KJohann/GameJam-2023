import { Entity } from "./Entity.js";
import { MoveableEntity } from "./MoveableEntity.js";

export class CollectableEntity extends Entity {

    constructor(
        imageSrc,
        x = 0,
        y = 0,
        animatable = false,
        frameHeight = 32,
        frameWidth = 32,
        animationStates = []
    ) {
        super(imageSrc, x, y, animatable, frameHeight, frameWidth, animationStates);
        this.collected = false;

        this.on('collision', (entity, collision) => { if (entity instanceof MoveableEntity) { this.collect(); } });
    }

    /** @param {Entity[]} entityList */
    update(entityList) {
        super.update();

        for (const entity of entityList) {
            if (entity instanceof MoveableEntity) {
                this.collidesWith(entity);
            }
        }
    }

    collect() {
        this.collected = true;
    }

    isCollected() {
        return this.collected;
    }

    draw(ctx) {
        if (!this.collected) {
            super.draw(ctx);
        }
    }
}