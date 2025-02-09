import { GameObject } from './GameObject.js';
import { RectShape } from './RectShape.js';

export class Mallet extends GameObject {
    constructor(x, y) {
        super(x, y, new RectShape(10,80)); 
        this.score = 0;
        this.leftSide = true;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        
        const bounds = this.shape.getBounds();
        if(this.leftSide){
        this.x = constrain(this.x, this.margin + bounds.width/2, width/2 - bounds.width/2);
        }else{
         this.x = constrain(this.x, width/2 , width - this.margin - bounds.width/2);
        }
        this.y = constrain(this.y, this.margin + bounds.height/2, height - this.margin - bounds.height/2);
    }

    move(targetX, targetY) {
        // Smooth movement towards target
        let dx = targetX - this.x;
        let dy = targetY - this.y;
        this.velocity.x = dx * 0.2;
        this.velocity.y = dy * 0.2;
    }
}