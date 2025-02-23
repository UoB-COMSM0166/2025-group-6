import { constants } from "../../core/config.js";
import { GameObject } from "./objects/GameObject.js";

export default class GoalPost {
  constructor() {
    // Goal post dimensions
    this.goalWidth = 10;
    this.goalHeightOne = height * 0.25;
    this.goalHeightTwo = height * 0.25;
    this.goalY = height / 2;
    this.colorOne = "white";
    this.colorTwo = "white";
  }

  draw() {
    push();
    // Set fill color based on this.color property
    if (this.colorOne === "red") {
      fill(255, 0, 0); // Red color
    } else {
      fill(255); // White color
    }

    stroke(0);

    // Left goal post
    rect(
      constants.margin + this.goalWidth / 2,
      this.goalY,
      this.goalWidth,
      this.goalHeightOne
    );
    if (this.colorTwo === "red") {
      fill(255, 0, 0); // Red color
    } else {
      fill(255); // White color
    }
    // Right goal post
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
