import { constants } from "../../../core/config.js";
import game from "../../../core/Game.js";


/**
 Blueprint for all objects in the game , all objects need to extend this class
 * Shape object is injected into GameObject to able to change shape of objects easily
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
        
 
        // all game objects must be constained within the board
        this.x = constrain(
            this.x, 
            constants.Margin + halfWidth, 
            game.board.width - constants.Margin - halfWidth
        );
        
        this.y = constrain(
            this.y, 
            constants.Margin + halfHeight, 
            game.board.height - constants.Margin - halfHeight
        );
    }
    

}