import { constants } from "../../../../core/config.js";
import game from "../../../../core/Game.js";
import { RectShape } from "../../shapes/RectShape.js";
import { GameObject } from "../GameObject.js";

export class PowerUps extends GameObject {
  constructor(x, y, width, height, shape) {
    super(x, y, shape);
    this.active = false;
    this.width = width;
    this.height = height;
    this.effect =false;
    this.leftSide =undefined;
  }

  draw() {
  }
// Later we'll need custom methods to update/draw the fire or any powerup

}