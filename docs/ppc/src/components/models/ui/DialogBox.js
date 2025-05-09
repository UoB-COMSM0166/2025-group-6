import CloseButton from "./buttons/dialogBoxButtons/CloseButton.js";

// DialogBox Blueprint
class DialogBox {
  constructor() {
    this.content = undefined;
    this.boxW = width * 0.4;
    this.boxH = height * 0.5;
    this.boxX = width / 2;
    this.boxY = height / 2;
    this.visible = false;
    this.margin = 20;
    this.closeButton = new CloseButton(width / 2 + width / 4 - 100, height / 2 - height * 0.25 + 30, width * 0.025, width * 0.025);
  }

  draw() {
    if (!this.visible) return;

    // Draw dialog background
    rectMode(CENTER);
    fill(30, 30, 30, 220); // Dark semi-transparent background
    stroke(255);
    strokeWeight(2);
    rect(this.boxX, this.boxY, this.boxW, this.boxH, 20);

    // Draw content text - centered in the dialog box
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(
      this.content,
      this.boxX, // Use center X coordinate
      this.boxY, // Use center Y coordinate
      this.boxW - this.margin * 2,
      this.boxH - this.margin * 2
    );

    // Draw close button
    this.closeButton.draw();
  }

  hide() {
    this.visible = false;
  }

  handleClick() {
    if (this.closeButton.handleClick()) {
      this.hide();
    }
  }

  reset() {
    this.visible = false;
    this.boxW = width * 0.4;
    this.boxH = height * 0.5;
    this.boxX = width / 2;
    this.boxY = height / 2;
    this.closeButton.reset();
  }
}

export default DialogBox;