import { constants } from "../../core/config.js";
import { GameObject } from "./objects/GameObject.js";

export default class GoalPost {
  constructor() {
    // Goal post dimensions
    this.goalWidth = 10;
    this.goalHeight = height*0.25;
    this.goalY = height/2;

  }

  draw() {

    fill(255); 
    stroke(0);

    // Left goal post
    rect(
       constants.margin+this.goalWidth/2,this.goalY,
       this.goalWidth,
       this.goalHeight
    );

    // Right goal post 
    rect(
        width - constants.margin - this.goalWidth/2,this.goalY,
        this.goalWidth,
        this.goalHeight
     );
 

    // Reset drawing settings
    noFill();
    noStroke();
  }

  getDimensions() {
    return {
      goalWidth: this.goalWidth,
      goalHeight: this.goalHeight,

    };
  }
}
