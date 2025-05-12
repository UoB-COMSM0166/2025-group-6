import { constants } from "../../core/config.js";
import GoalPost from "./GoalPost.js";
import game from "../../core/Game.js";

/**
 * This class is responsible for generating game board
 * includes:
 * method to draw game board
 * method to get dimensions of the game board
 */
export class GameBoard {
  constructor() {
    this.boardWidth = width - 2 * constants.margin;
    this.boardHeight = height - 2 * constants.margin;
    this.centerX = width / 2;
    this.centerY = height / 2;

    this.centerCircleRadius = min(width, height) * 0.1;

    this.goalPost = new GoalPost();
  }

  draw() {
    if (game.gameBackImg) {
      image(game.gameBackImg, 0, 0, width, height);
    }

    drawingContext.shadowBlur = 20 + sin(millis() / 500) * 10;
    drawingContext.shadowColor = color(0, 255, 255);

    strokeWeight(4);
    stroke(0, 255, 255); 
    noFill();
    rectMode(CENTER);
    rect(width / 2, height / 2, this.boardWidth, this.boardHeight, 20);

    strokeWeight(3);
    line(width / 2, constants.margin, width / 2, height - constants.margin);

    strokeWeight(4);
    ellipse(width / 2, height / 2, this.centerCircleRadius * 2);

    drawingContext.shadowBlur = 0;

    fill(255);
    stroke(0);
    this.goalPost.draw();

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
