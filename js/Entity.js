import { EventEmitter } from "./EventEmitter.js";

export class Entity extends EventEmitter {
  /**
   *
   * @param {string} imageSrc path to image
   */
  constructor(imageSrc, x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;

    if (imageSrc) {
      this.image = new Image();
      this.image.src = imageSrc;
    }
    this.orientation = 1;
    this.width = this.image?.width ?? 0;
    this.height = this.image?.height ?? 0;
  }

  isLoaded() {
    return new Promise((resolve) => {
      if (!this.image) return resolve();
      if (this.image.complete) return resolve();
      this.image.onload = resolve;
    })
  }

  update() { }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    if (this.image) {
      if (this.orientation < 0) {
        context.scale(-1, 1);
        context.drawImage(this.image, -this.x, this.y, -this.width, this.height);
        context.scale(-1, 1);
      } else {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    }
  }

  /** @param {Entity} other */
  collidesWith(other) {
    let dx = this.x + this.width / 2 - (other.x + other.width / 2);
    let dy = this.y + this.height / 2 - (other.y + other.height / 2);
    let width = (this.width + other.width) / 2;
    let height = (this.height + other.height) / 2;
    let crossWidth = width * dy;
    let crossHeight = height * dx;
    let collision = "none";

    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
      if (crossWidth > crossHeight) {
        collision = crossWidth > -crossHeight ? "bottom" : "left";
      } else {
        collision = crossWidth > -crossHeight ? "right" : "top";
      }
    }
    return collision;
  }

  /** @param {Entity[]} array */
  collidesWithArray(array) {
    let collisions = [];
    for (let i = 0; i < array.length; i++) {
      let collision = this.collidesWith(array[i]);
      if (collision !== "none" && this !== array[i]) {
        collisions.push(collision);
      }
    }
    if (collisions.length == 0) {
      collisions.push("none");
    }
    return collisions;
  }
}
