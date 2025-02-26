import CPUHandler  from './CPUHandler.js';
import  CollisionHandler  from './CollisionHandler.js';
import MouseHandler from './MouseHandler.js';
import PowerupHandler from './PowerUpHandler.js';
import ScreenHandler from './ScreenHandler.js';
import SoundHandler from './SoundHandler.js';

export class GameEngine {
    constructor(game) {
        this.game = game
        this.cpuHandler = new CPUHandler(this.game);
        this.collisionHandler = new CollisionHandler(this.game);
        this.powerUpHandler = new PowerupHandler(this.game);
        this.soundHandler = new SoundHandler(this.game);
        this.screenHandler = new ScreenHandler(this.game);
        this.mouseHandler = new MouseHandler(this.game);
    }


    updateGame(){
        this.screenHandler.update();
        if(!this.game.gamePaused){
        this.game.player1.update();
        this.game.player2.update();
        this.game.puck.update();
        this.cpuHandler.update();
        this.collisionHandler.update();
        this.powerUpHandler.update();
       }
    }
}
    