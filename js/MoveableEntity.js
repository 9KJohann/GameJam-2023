import { Entity } from "./Entity.js";

export class MoveableEntity extends Entity {
  constructor(imageSrc) {
    super(imageSrc);

    // Speed
    this.speedX = 0;
    this.speedY = 0;

    // Max Speed
    this.maxSpeedX = 10;
    this.maxSpeedY = 10;

    // Acceleration
    this.accelerationX = 0;
    this.accelerationY = 0;

    // max Acceleration
    this.maxAccelerationX = 2;
    this.maxAccelerationY = 2;

    // Gravity
    this.gravity = 2;
  }

  /** @param {Entity[]} entityList */
  update(entityList) {
    // Call Superclass Update
    super.update();
    this.orientation = -this.speedX;



    // Deceleration
    this.speedX *= 0.9;
    this.speedY *= 0.9;

    // Acceleration
    this.speedX += this.accelerationX;
    this.speedY += this.accelerationY;

    // Gravity
    this.speedY += this.gravity;

    // Max Speed
    if (this.speedX > this.maxSpeedX) {
      this.speedX = this.maxSpeedX;
    }
    if (this.speedX < -this.maxSpeedX) {
      this.speedX = -this.maxSpeedX;
    }
    if (this.speedY > this.maxSpeedY) {
      this.speedY = this.maxSpeedY;
    }
    if (this.speedY < -this.maxSpeedY) {
      this.speedY = -this.maxSpeedY;
    }

    this.move(entityList);

    this.accelerate(0.1, -0.1)
  }

  /**
   * Moves Object to Position
   * @param {Entity[]} entityList
   */
  move(entityList) {
    let collsions = this.collidesWithArray(entityList);
    //console.log(collsions);
    if (collsions.includes("top")) {
      this.speedY = 0;
    }
    if (collsions.includes("bottom")) {
      this.speedY = 0;
    }
    if (collsions.includes("left")) {
      this.speedX = 0;
    }
    if (collsions.includes("right")) {
      this.speedX = 0;
    }

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    //TODO: add canvas width and height

    if (!(collsions.includes("bottom") || collsions.includes("top"))) {
      this.y += this.speedY;
    }
    if (!(collsions.includes("left") || collsions.includes("right"))) {
      this.x += this.speedX;
    }
  }

  /**
   * Accelerates Object by x and y
   * @param {number} x
   * @param {number} y
   */
  accelerate(x, y) {
    this.accelerationX += x;
    this.accelerationY += y;
    if (this.accelerationX > this.maxAccelerationX) {
      this.accelerationX = this.maxAccelerationX;
    }
    if (this.accelerationY > this.maxAccelerationY) {
      this.accelerationY = this.maxAccelerationY;
    }
    if (this.accelerationX < -this.maxAccelerationX) {
      this.accelerationX = -this.maxAccelerationX;
    }
    if (this.accelerationY < -this.maxAccelerationY) {
      this.accelerationY = -this.maxAccelerationY;
    }
  }
}
