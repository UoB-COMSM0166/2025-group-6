import DialogBoxButton from "./DialogBoxButton.js";

class CloseButton extends DialogBoxButton {
  constructor(x, y, w, h) {
    super(x, y, w, h, "X"); 
  }

  draw() {
    fill(200, 50, 50);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 10);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("X", this.x, this.y);
  }

  handleClick() {
    if (this.isMouseOver()) {
      return true;
    }
  }

  reset() {
    this.x = width / 2 + width * 0.2 - 30;
    this.y = height / 2 - height * 0.25 + 30;
    // this.w = width * 0.025;
    // this.h = width * 0.025;
  }
}

export default CloseButton;