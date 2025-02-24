import { constants } from "../../../core/config.js";
import { CircleShape } from "../shapes/CircleShape.js";
import { GameObject } from "./GameObject.js";

export class Mallet extends GameObject {
  constructor(x, y,leftside) {
    super(x, y, new CircleShape(20,"mallet"));
    this.score = 0;
    this.leftSide = leftside;
    this.isPlayerCpu = true;
    this.moveSpeed = 30;

  }

  /* overriding update method since mallet needs to constrained
  to either half the board */
  update() {
    // Handle keyboard input
    if (!this.isPlayerCpu) {
      this.handleKeyboardInput();
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    const bounds = this.shape.getBounds();
    if (this.leftSide) {
      this.x = constrain(
        this.x,
        constants.margin + bounds.width/2,
        width/2 -bounds.width/2
      );
    } else {
      this.x = constrain(
        this.x,
        width / 2 +bounds.width/2,
        width - bounds.width/2
      );
    }
    this.y = constrain(
      this.y,
      constants.margin + bounds.height/2,
      height - constants.margin - bounds.height/2
    );
  }

  handleKeyboardInput() {
    // Reset velocities by default
    this.velocity.x = 0;
    this.velocity.y = 0;

    // Only set velocity when keys are pressed
    if (keyIsDown(UP_ARROW)) {
        this.velocity.y = -this.moveSpeed;
    } else if (keyIsDown(DOWN_ARROW)) {
        this.velocity.y = this.moveSpeed;
    }

    if (keyIsDown(LEFT_ARROW)) {
        this.velocity.x = -this.moveSpeed;
    } else if (keyIsDown(RIGHT_ARROW)) {
        this.velocity.x = this.moveSpeed;
    }
}

  // for cpu controlled mallet
  move(targetX, targetY) {

      let dx = targetX - this.x;
      let dy = targetY - this.y;
      this.velocity.x = dx * 0.2;
      this.velocity.y = dy * 0.2;

  }
}