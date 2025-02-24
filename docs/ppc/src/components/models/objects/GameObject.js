import { constants } from "../../../core/config.js";
import game from "../../../core/Game.js";


/**
 Blueprint for all objects in the game , all objects need to extend this class
 * Shape object is injected into GameObjects so that object shape can be changed easily
 */
export class GameObject {
    constructor(x, y, shape) {
        this.x = x;
        this.y = y;
        this.shape = shape;
        this.velocity = { x: 0, y: 0 };
    }
    
    draw() {
        this.shape.draw(this.x, this.y);
    }
    
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
       const bounds = this.shape.getBounds();
        // all game objects must be constained within the board
        this.x = constrain(
            this.x, 
            constants.margin + bounds.width/2, 
            width -constants.margin - bounds.width/2
        );
        
        this.y = constrain(
            this.y, 
            constants.margin + bounds.height/2, 
            height - bounds.height/2 -constants.margin
        );
    }

    checkCollision(other) {
        return this.shape.checkCollision(this.x, this.y,this.velocity, other.shape,other.x,other.y,other.velocity);
    }
    

}