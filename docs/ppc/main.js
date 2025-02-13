import game from "./src/core/Game.js";
import { constants } from "./src/core/config.js";
import gameScreen from "./src/components/screens/GameScreen.js";
import { updateDimensions } from "./src/utils/windowResizer.js";

function setup() {
  createCanvas(windowWidth, windowHeight);
  game.initializeGame();
  updateDimensions();
}


function draw() {
   gameScreen.draw()
}


window.setup = setup;
window.draw = draw;