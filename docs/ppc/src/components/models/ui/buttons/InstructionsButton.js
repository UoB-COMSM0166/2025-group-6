import Button from "./Button.js";


class InstructionsButton extends Button {
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
            this.loadInstructions();
        }
    }

    loadInstructions() {
        this.content = loadStrings("./assets/textFiles/Instructions.txt"); // Synchronous file read
        this.showDialogBox = true;
    }
}

export default InstructionsButton;
