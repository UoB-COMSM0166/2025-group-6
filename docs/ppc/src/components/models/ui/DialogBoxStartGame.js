import LevelModeButton from "./buttons/dialogBoxButtons/LevelModeButton.js";
import DialogBox from "./DialogBox.js";

class DialogBoxStartGame extends DialogBox {
  constructor() {
    super();
    this.normalModeButton = new LevelModeButton(
      this.boxX ,                    
      this.boxY - this.boxH * 0.2,  
      this.boxW * 0.3,              
      this.boxH * 0.1,              
      "Normal Mode"                 
    );
    this.hardModeButton = new LevelModeButton(
      this.boxX ,                   
      this.boxY + this.boxH * 0.2,  
      this.boxW * 0.3,              
      this.boxH * 0.1,              
      "Hard Mode"             
    );

  }

  draw() {
    
    super.draw();
    if(!this.visible){
      return;
    }
    this.normalModeButton.draw();
    this.hardModeButton.draw();
  }

  handleClick(){
    super.handleClick();
    this.normalModeButton.handleClick();
    this.hardModeButton.handleClick();
  }

 
  reset() {
    super.reset();
    this.normalModeButton.x = this.boxX;
    this.normalModeButton.y = this.boxY - this.boxH * 0.2 ;
    this.normalModeButton.width = this.boxW * 0.2;
    this.normalModeButton.height = this.boxH * 0.1;
    this.hardModeButton.x = this.boxX;
    this.hardModeButton.y = this.boxY + this.boxH * 0.2;
    this.hardModeButton.width = this.boxW * 0.2;
    this.hardModeButton.height = this.boxH * 0.1;
  }
}

export default DialogBoxStartGame;
