import CloseButton from "./buttons/dialogBoxButtons/CloseButton.js";

/** DialogBox Blueprint  
 * it is the base class for all the pop-up dialogue boxes in the game
 */

class DialogBox {
  constructor() {
    this.content = undefined;
    this.boxW = width * 0.4;
    this.boxH = height * 0.5;
    this.boxX = width / 2;
    this.boxY = height / 2;
    this.visible = false;
    this.margin = 20;
    this.closeButton = new CloseButton(width / 2 + this.boxW/2 - 25, height / 2 - this.boxH/2 + 25, 30, 30);
  }

  draw() {
    if (!this.visible) return;

    rectMode(CENTER);
    fill(30, 30, 30, 220); 
    stroke(255);
    strokeWeight(2);
    rect(this.boxX, this.boxY, this.boxW, this.boxH, 20);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(
      this.content,
      this.boxX,
      this.boxY, 
      this.boxW - this.margin * 2,
      this.boxH - this.margin * 2
    );

    
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