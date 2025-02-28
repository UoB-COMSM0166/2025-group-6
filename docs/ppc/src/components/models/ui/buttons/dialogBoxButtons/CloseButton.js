import DialogBoxButton from "./DialogBoxButton.js";

class CloseButton extends DialogBoxButton {
  constructor(x, y, w, h) {
    super(x, y, w, h, "X"); 
  }

  draw() {
    fill(200, 50, 50);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 5);
    console.log("Close Button:", this.w, this.h);
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

    this.w = width * 0.025;
    this.h = height * 0.05;

    this.x = width / 2 + width / 4 - 100;
    this.y = height / 4 + 30;
  }
}

export default CloseButton;
