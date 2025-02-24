import { constants } from "../../core/config.js";
import GoalPost from "./GoalPost.js";

export class GameBoard {
  constructor() {
    // Board dimensions
    this.boardWidth = width - 2 * constants.margin;
    this.boardHeight = height - 2 * constants.margin;
    this.centerX = width / 2;
    this.centerY = height / 2;

    // Center circle
    this.centerCircleRadius = min(width, height) * 0.1;

    // Goal post Object
    this.goalPost = new GoalPost();

    // Background image
    this.gameBackImg = "";
  }

  draw() {
    if (this.gameBackImg) {
      image(this.gameBackImg, 0, 0, width, height);
    }

    // Apply glow effect for neon aesthetics
    drawingContext.shadowBlur = 20 + sin(millis() / 500) * 10;
    drawingContext.shadowColor = color(0, 255, 255);

    // Draw Main Board Border
    strokeWeight(4);
    stroke(0, 255, 255); // Electric Blue
    noFill();
    rectMode(CENTER);
    rect(width / 2, height / 2, this.boardWidth, this.boardHeight, 20);

    // Draw Center Line
    strokeWeight(3);
    line(width / 2, constants.margin, width / 2, height - constants.margin);

    // Draw Center Circle
    strokeWeight(4);
    ellipse(width / 2, height / 2, this.centerCircleRadius * 2);

    // Reset glow effect for other objects
    drawingContext.shadowBlur = 0;

    fill(255);
    stroke(0);
    this.goalPost.draw();

    // Reset drawing settings
    noFill();
    noStroke();
  }

  getDimensions() {
    return {
      width: this.boardWidth,
      height: this.boardHeight,
      centerX: this.centerX,
      centerY: this.centerY
    };
  }
}
