import CPUHandler         from './CPUHandler.js';
import  CollisionHandler  from './CollisionHandler.js';
import MouseHandler       from './MouseHandler.js';
import PowerupHandler     from './PowerUpHandler.js';
import ScreenHandler      from './ScreenHandler.js';
import SoundHandler       from './SoundHandler.js';
import WinnerHandler      from './WinnerHandler.js';
import LevelHandler       from './LevelHandler.js';
import ObstacleHandler    from "./ObstacleHandler.js";

/**
 * The GameEngine class coordinates the core update logic for the game
 * It manages various subsystems like CPU, collision, power-ups, sound, and more
 * Each frame, it updates all game elements and handlers unless the game is paused
 * 
 * includes:
 * method to call and update all game handlers
 */


export class GameEngine {
    constructor(game) {
        this.game = game
        this.cpuHandler = new CPUHandler(this.game);
        this.collisionHandler = new CollisionHandler(this.game);
        this.powerUpHandler = new PowerupHandler(this.game);
        this.soundHandler = new SoundHandler(this.game);
        this.screenHandler = new ScreenHandler(this.game);
        this.mouseHandler = new MouseHandler(this.game);
        this.winnerHandler = new WinnerHandler(this.game);
        this.levelHandler = new LevelHandler(this.game);
        this.obstacleHandler = new ObstacleHandler(this.game);
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
        this.winnerHandler.update();
        this.levelHandler.update();
        this.obstacleHandler.updateObstacles(!this.game.gamePaused);
       }
    }
}
    