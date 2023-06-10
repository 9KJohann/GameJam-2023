export class Entity {
  constructor(imageSrc) {
    this.x = 0;
    this.y = 0;

    this.image = new Image();
    this.image.src = imageSrc;

    this.width = this.image.width;
    this.height = this.image.height;
  }

  update() {}

  /** @param {CanvasRenderingContext2D} context */
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
    // alert("hier könnte ihre Werbung stehen");
  }

  /** @param {Entity} other */
  collidesWith(other) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }

  /** @param {Entity[]} array */
  collidesWithArray(array) {
    for (let i = 0; i < array.length; i++) {
      if (this.collidesWith(array[i]) && this !== array[i]) {
        console.log("collides");
        return true;
      }
    }
    return false;
  }
}
