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
        this.collectedBy = null;

        this.timer = 0;

        this.on('collision', (entity, collision) => {
            if (entity instanceof MoveableEntity) {
                if (!this.isCollected() && this.timer > 200) { this.collect(); this.collectedBy = entity; entity.collect(this); }
            }
        });
    }

    /** @param {Entity[]} entityList */
    update(entityList) {
        super.update();

        for (const entity of entityList) {
            if (entity instanceof MoveableEntity) {
                this.collidesWith(entity);
            }
        }

        this.timer++;
    }

    drop() {
        this.x = this.collectedBy.x;
        this.y = this.collectedBy.y;
        this.collected = false;
        this.collectedBy = null;
        this.timer = 0;
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