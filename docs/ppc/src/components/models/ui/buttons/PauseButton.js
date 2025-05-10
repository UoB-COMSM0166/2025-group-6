import Button from "./Button.js";
import { constants } from "../../../../core/config.js";
import game from "../../../../core/Game.js";

export default class PauseButton extends Button {
  constructor(x, y, w, h, label = "Pause") {
    super(x, y, w, h, label);
    this.isPaused = false;
  }

  draw() {
    push();
    ellipseMode(CENTER);
    // hover styling
    if (this.isMouseOver()) {
      fill(80, 80, 80, 180);
      stroke(60);
    } else {
      fill(50, 50, 50, 150);
      stroke(30);
    }
    stroke(255);
    strokeWeight(3);
    ellipse(this.x, this.y, this.w, this.h);

    // draw play/pause icon
    noStroke();
    fill(255);
    if (this.isPaused) {
      const tri = this.h * 0.3;
      triangle(this.x - tri/1.5, this.y - tri, this.x - tri/1.5, this.y + tri, this.x + tri, this.y);
    } else {
      const bw = this.h * 0.15;
      const bh = this.h * 0.6;
      const sp = this.h * 0.15;
      rect(this.x - sp, this.y, bw, bh);
      rect(this.x + sp, this.y, bw, bh);
    }
    pop();
  }

  // central pause/resume logic
  togglePause() {
    this.isPaused = !this.isPaused;
    this.label    = this.isPaused ? "Play" : "Pause";
    game.gamePaused = this.isPaused;

    if (this.isPaused) {
      game.gameEngine.soundHandler.pauseAll();
    } else {
      game.gameEngine.soundHandler.resumeAll();
    }
    game.gameEngine.soundHandler.playSound("click");
  }

  handleClick() {
    if (this.isMouseOver()) {
      this.togglePause();
    }
  }

  reset() {
    this.x = width / 2;
    this.y = constants.margin / 2;
  }
}
