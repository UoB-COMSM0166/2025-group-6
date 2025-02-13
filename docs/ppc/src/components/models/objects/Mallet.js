import game  from "../../../core/Game.js";
import { RectShape } from "../shapes/RectShape.js";
import { GameObject } from "./GameObject.js";

export class Mallet extends GameObject {
  constructor(x, y) {
    super(x, y, new RectShape(10, 80));
    this.score = 0;
    this.leftSide = true;
    this.isPlayerCpu = true;
  }

  /* overriding update method since mallet needs to constrained
  to either half the board */
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.leftSide) {
      this.x = constrain(
        this.x,
        this.margin + game.board.width / 2,
        width / 2 - game.board.width / 2
      );
    } else {
      this.x = constrain(
        this.x,
        width / 2,
        width - this.margin - game.board.width / 2
      );
    }
    this.y = constrain(
      this.y,
      this.margin + game.board.height / 2,
      height - this.margin - game.board.height / 2
    );
  }

  move(targetX, targetY) {
    // Smooth movement towards target
    let dx = targetX - this.x;
    let dy = targetY - this.y;
    this.velocity.x = dx * 0.2;
    this.velocity.y = dy * 0.2;
  }
}
