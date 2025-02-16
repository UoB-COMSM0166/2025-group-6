import { constants } from "../../core/config.js";
import GoalPost  from "./GoalPost.js";

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
   

    // background image
    this.gameBackImg= '';
  }

  draw() {
    if (this.gameBackImg) {
      image(this.gameBackImg, 0, 0, width, height); // Draw the image to cover the entire canvas
    }
    // Draw main board
    rectMode(CENTER);
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(width / 2, height / 2, this.boardWidth, this.boardHeight);
    line(width / 2, constants.margin, width / 2, height-constants.margin); 

    // Draw center circle
    stroke(0);
    circle(width / 2, height / 2, this.centerCircleRadius * 2);


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
