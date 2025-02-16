import CPUHandler  from './CPUHandler.js';
import  CollisionHandler  from './CollisionHandler.js';

export class GameEngine {
    constructor(game) {
        this.game = game
        this.cpuHandler = new CPUHandler(this.game);
        this.collisionHandler = new CollisionHandler(this.game);
    }


    updateGame(){
        this.cpuHandler.update();
        this.collisionHandler.update();
    }
}
    