import CPUHandler  from './CPUHandler.js';
import  CollisionHandler  from './CollisionHandler.js';
import PowerupHandler from './PowerUpHandler.js';
import { SoundHandler } from './SoundHandler.js';

export class GameEngine {
    constructor(game) {
        this.game = game
        this.cpuHandler = new CPUHandler(this.game);
        this.collisionHandler = new CollisionHandler(this.game);
        this.powerUpHandler = new PowerupHandler(this.game);
        this.soundHandler = new SoundHandler(this.game);
    }


    updateGame(){
        this.cpuHandler.update();
        this.collisionHandler.update();
        this.powerUpHandler.update()
    }
}
    