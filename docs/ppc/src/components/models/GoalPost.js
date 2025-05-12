import { constants } from "../../core/config.js";
import { GameObject } from "./objects/GameObject.js";

/**
 * This class handles the creation and positioning of the goal posts
 * includes:
 * method to draw goal post
 * method to get dimensions of goal post
 */

export default class GoalPost {
  constructor() {
    // Goal post dimensions
    this.goalHeightOne = height * 0.25;
    this.goalHeightTwo = height * 0.25;
    this.goalWidth = this.goalHeightOne * 0.05;
    this.goalY = height / 2;
    this.colorOne = "white";
    this.colorTwo = "white";
  }

  draw() {
    push();
    if (this.colorOne === "red") {
      fill(255, 0, 0);
    } else {
      fill(255);
    }

    stroke(0);

    rect(
      constants.margin + this.goalWidth / 2,
      this.goalY,
      this.goalWidth,
      this.goalHeightOne
    );
    if (this.colorTwo === "red") {
      fill(255, 0, 0);
    } else {
      fill(255);
    }

    rect(
      width - constants.margin - this.goalWidth / 2,
      this.goalY,
      this.goalWidth,
      this.goalHeightTwo
    );

    pop();
  }

  getDimensions() {
    return {
      goalWidth: this.goalWidth,
      goalHeight: this.goalHeight,
    };
  }
}
