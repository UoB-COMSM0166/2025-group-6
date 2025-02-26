class Button {
    constructor(x, y, w, h, label) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.label = label;
    }
  
      
    
    isMouseOver() {
      return (
        mouseX > this.x - this.w / 2 &&
        mouseX < this.x + this.w / 2 &&
        mouseY > this.y - this.h / 2 &&
        mouseY < this.y + this.h / 2
      );
    }


  }
  
  export default Button;
  