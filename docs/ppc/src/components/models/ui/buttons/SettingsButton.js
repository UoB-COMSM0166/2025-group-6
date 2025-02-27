import Button from "./Button.js";

class SettingsButton extends Button {
    constructor(x, y, w, h, label) {
        super(x, y, w, h, label);
    }
    
    isMouseOver() {
      return (
        mouseX > this.x - this.w / 2 &&
        mouseX < this.x + this.w / 2 &&
        mouseY > this.y - this.h / 2 &&
        mouseY < this.y + this.h / 2
      );
    }

    handleClick() {
        if (this.isMouseOver()) {
            this.showDialogBox = true;
        }
    }
}
  
export default SettingsButton;