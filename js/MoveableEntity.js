import { Entity } from "./Entity.js";

export class MoveableEntity extends Entity {
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

    this.minSpeed = 0.001;

    // Gravity
    this.gravity = 0;
  }

  /** @param {Entity[]} entityList */
  update(entityList) {
    // Call Superclass Update
    super.update();
    this.orientation = -this.speedX;



    // Deceleration
    this.speedX *= 0.6;
    this.speedY *= 0.6;

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

    if (Math.abs(this.speedX) < this.minSpeed) {
      this.speedX = 0.0;
    }
    if (Math.abs(this.speedY) < this.minSpeed) {
      this.speedY = 0.0;
    }

    this.move(entityList);

    // this.accelerate(0.0, 0.0)
  }

  /**
   * Moves Object to Position
   * @param {Entity[]} entityList
   */
  move(entityList) {
    let collsions = this.collidesWithArray(entityList);
    if (collsions.includes("top")) {
      this.speedY = Math.min(this.speedY, 0);
    }
    if (collsions.includes("bottom")) {
      this.speedY = Math.max(this.speedY, 0);
    }
    if (collsions.includes("left")) {
      this.speedX = Math.min(this.speedX, 0);
    }
    if (collsions.includes("right")) {
      this.speedX = Math.max(this.speedX, 0);
    }

    // Wall collision left
    if (this.x < 0) {
      this.x = 0;
    }
    // Wall collision top
    if (this.y < 0) {
      this.y = 0;
    }
    // Wall collision right
    if (this.x > 1280 - this.width) {
      this.x = 1280 - this.width;
    }
    // Wall collision bottom
    if (this.y > 1024 - this.height) {
      this.y = 1024 - this.height;
    }

    // Check terrain collision


    this.y += this.speedY;
    this.x += this.speedX;
  }

  /**
   * Accelerates Object by x and y
   * @param {number} x
   * @param {number} y
   */
  accelerate(x, y) {
    this.accelerationX = x;
    this.accelerationY = y;
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
