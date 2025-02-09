import { GameObject } from './models/GameObject.js';
import { Mallet } from './models/Mallet.js';
import { Puck } from './models/Puck.js';


export let margin = 40;
export let boardWidth, boardHeight;
export let centerCircleRadius;
export let goalWidth = 10;
export let goalHeight;
export let goalY;
export let gameState = 'welcome';
export let gameMode = '';
export let exitButtonSize = 40;
export let player1, player2, puck;
export let aiOffset = 0;
export let welcomeBg; 
export let mainpage;



/* Function called only once at the beginning of the program to setup the game elements 
- p5.js function */

function setup() {
    console.log("Sketch is running");
    createCanvas(windowWidth, windowHeight);
    updateDimensions();
    rectMode(CENTER);
}

/* Function called only once at the beginning of the program to load images and other media files
-called before setup() 
- p5.js function */

function preload() {
    welcomeBg = loadImage('./resources/background_image_3.jpg');
    mainpage = loadImage('./resources/main_page_2.jpg');
}


function initializeGame() {
    player1 = new Mallet(width * 0.25, height/2);
    player1.leftSide = true;
    player2 = new Mallet(width * 0.75, height/2);
    player2.leftSide = false;
    puck = new Puck();
}
function updateAI() {
    // Reaction delay - AI will only update its target position periodically
    const reactionDelay = 0.05; // 5% chance to update per frame
    const predictionError = 0.2; // 20% error in prediction
    
    // Only update AI target if random check passes
    if (Math.random() < reactionDelay) {
        // Add randomness to target Y position
        let targetY = puck.y + aiOffset;
        let targetX = width * 0.75;
        
        // Predict puck position with some error
        if (puck.x > width/2) {
            // Calculate predicted X position with error
            let predictedX = puck.x + puck.velocity.x * (1 + (Math.random() - 0.5) * predictionError);
            targetX = constrain(predictedX + 30, width/2, width - margin - player2.shape.width/2);
            
            // Randomize defensive position when puck is coming towards AI
            if (puck.velocity.x > 0) {
                // More aggressive when puck is moving towards AI
                aiOffset = random(-50, 50);
            } else {
                // More defensive when puck is moving away
                aiOffset = random(-20, 20);
            }
        } else {
            // Return to default position with some randomness when puck is far
            targetX = width * 0.75 + random(-30, 30);
            targetY = height/2 + random(-50, 50);
        }

        // Add "personality" to AI movement
        const aggressiveness = 0.7; // 70% of max speed
        const maxSpeed = 15;
        
        // Calculate direction to target
        let dx = targetX - player2.x;
        let dy = targetY - player2.y;
        
        // Apply speed limit with randomness
        let speed = Math.min(Math.sqrt(dx * dx + dy * dy), maxSpeed * aggressiveness);
        speed *= (0.8 + Math.random() * 0.4); // Random speed variation
        
        // Move towards target at calculated speed
        if (dx !== 0 || dy !== 0) {
            let angle = Math.atan2(dy, dx);
            player2.move(
                player2.x + Math.cos(angle) * speed,
                player2.y + Math.sin(angle) * speed
            );
        }
    }
}

function resetPuck() {
    puck.x = width / 2;
    puck.y = height / 2;
    puck.velocity.x = 0;
    puck.velocity.y = 0;
}

function handleBoundaryCollisions(puck) {
    const friction = 0.98; // Friction coefficient
    const restitution = 0.8; // Bounciness factor
    
    // Top and bottom boundaries
    if (puck.y - puck.shape.radius <= margin) {
        // Prevent sticking by moving puck just outside boundary
        puck.y = margin + puck.shape.radius + 1;
        puck.velocity.y = -puck.velocity.y * restitution;
        puck.velocity.x *= friction;
    } else if (puck.y + puck.shape.radius >= height - margin) {
        // Prevent sticking by moving puck just outside boundary
        puck.y = height - margin - puck.shape.radius - 1;
        puck.velocity.y = -puck.velocity.y * restitution;
        puck.velocity.x *= friction;
    }

    // Left and right boundaries (excluding goals)
    if (puck.x - puck.shape.radius <= margin) {
        // Check if puck is within goal height
        if (puck.y < goalY || puck.y > goalY + goalHeight) {
            // Prevent sticking by moving puck just outside boundary
            puck.x = margin + puck.shape.radius + 1;
            puck.velocity.x = -puck.velocity.x * restitution;
            puck.velocity.y *= friction; // Apply friction consistently
        } else {
            // Goal scored for player 2
            player2.score++;
            puck.reset();
        }
    } else if (puck.x + puck.shape.radius >= width - margin) {
        // Check if puck is within goal height
        if (puck.y < goalY || puck.y > goalY + goalHeight) {
            // Prevent sticking by moving puck just outside boundary
            puck.x = width - margin - puck.shape.radius - 1;
            puck.velocity.x = -puck.velocity.x * restitution;
            puck.velocity.y *= friction; // Apply friction consistently
        } else {
            // Goal scored for player 1
            player1.score++;
            puck.reset();
        }
    }
}





function handleMalletPuckCollision(mallet, puck) {
    // Find the closest point on the rectangle to the circle's center
    let closestX = constrain(puck.x, mallet.x - mallet.shape.width/2, mallet.x + mallet.shape.width/2);
    let closestY = constrain(puck.y, mallet.y - mallet.shape.height/2, mallet.y + mallet.shape.height/2);
    
    // Calculate collision angle from closest point
    let dx = puck.x - closestX;
    let dy = puck.y - closestY;
    let angle = atan2(dy, dx);
    
    // Calculate mallet's effective speed at the collision point
    let relativeX = closestX - mallet.x;
    let relativeY = closestY - mallet.y;
    let speed = sqrt(mallet.velocity.x * mallet.velocity.x + mallet.velocity.y * mallet.velocity.y);
    
    // Add rotational effect based on where the puck hits the paddle
    let spinEffect = (relativeY / (mallet.shape.height/2)) * 0.5; // -0.5 to 0.5
    angle += spinEffect;
    
    let maxSpeed = 15;
    
    // Transfer momentum with spin effect
    puck.velocity.x = cos(angle) * min(speed + 5, maxSpeed);
    puck.velocity.y = sin(angle) * min(speed + 5, maxSpeed);
}

function handleCollisions() {
    // Mallet-Puck collisions
    if (player1.checkCollision(puck)) {
        handleMalletPuckCollision(player1, puck);
    }
    if (player2.checkCollision(puck)) {
        handleMalletPuckCollision(player2, puck);
    }

    handleBoundaryCollisions(puck);
}




function updateGame() {
    if (gameState !== 'game') return;

    // Player 1 movement
    if (mouseX < width/2) { // Only allow movement on left side
        player1.move(
            constrain(mouseX, margin + player1.shape.width/2, width/2 - player1.shape.width/2),
            constrain(mouseY, margin + player1.shape.height/2, height - margin - player1.shape.height/2)
        );
    }

    // Player 2 movement
    if (gameMode === 'multi') {
        if (mouseX > width/2) { // Only allow movement on right side
            player2.move(
                constrain(mouseX, width/2 + player2.shape.width/2, width - margin - player2.shape.width/2),
                constrain(mouseY, margin + player2.shape.height/2, height - margin - player2.shape.height/2)
            );
        }
    } else {
        // AI movement
        updateAI();
    }

    // Update positions
    player1.update();
    player2.update();
    puck.update();

    // Check collisions
    handleCollisions();
}


/* Function to update the game elements whenever browser windows is resized
- Custom function */

function updateDimensions() {
    boardWidth = width - 2 * margin;
    boardHeight = height - 2 * margin;
    centerCircleRadius = min(width, height) * 0.1;
    goalHeight = height * 0.25;
    goalY = height / 2 - goalHeight / 2;
}

/* Main function which is executed in a loop to draw the game elements on the screen
- By default it is called 60 times per second 
- p5.js function */

function draw() {
    background(220);
    if (gameState === 'welcome') {
        drawWelcome();
    } else {
        drawGame(gameMode);
        drawExitButton();
    }
}

/* Fuction to draw the welcome screen with buttons for single player and multiplayer
- Custom function */

function drawWelcome() {
    image(welcomeBg, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(32);
    
    // Add text shadow effect
    fill(0, 0, 139, 160);  // Dark blue with some transparency for shadow
    text('Power Puck Clash', width / 2 + 3, height / 3 + 3);  // Shadow offset
    
    // Main text
    fill(0, 100, 255);  // Bright blue
    text('Power Puck Clash', width / 2, height / 3);

    let buttonWidth = 200;
    let buttonHeight = 50;
    let buttonY = height / 2;
    let spacing = 30;

    // Single Player Button
    if (isMouseOverButton(width / 2 - buttonWidth - spacing, buttonY, buttonWidth, buttonHeight)) {
        fill(200);
    } else {
        fill(255);
    }
    rect(width / 2 - buttonWidth/2 - spacing, buttonY, buttonWidth, buttonHeight);
    fill(0);
    textSize(20);
    text('Single Player', width / 2 - buttonWidth/2 - spacing, buttonY);

    // Multiplayer Button
    if (isMouseOverButton(width / 2 + spacing, buttonY, buttonWidth, buttonHeight)) {
        fill(200);
    } else {
        fill(255);
    }
    rect(width / 2 + buttonWidth/2 + spacing, buttonY, buttonWidth, buttonHeight);
    fill(0);
    text('Multiplayer', width / 2 + buttonWidth/2 + spacing, buttonY);
}

/* Function to check if mouse is over a button
- It makes use of the mouseX and mouseY system variables which are updated by p5.js
- mouseX and mouseY represent the  x and y coordinates of the mouse pointer respectively
- Custom function */

function isMouseOverButton(x, y, w, h) {
    return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

/* Function to draw the game elements on the screen
- Custom function */
function drawGame(mode) {

    image(mainpage, 0, 0, width, height);
    noFill();
    strokeWeight(2);
    rect(width/2, height/2, boardWidth, boardHeight);
    circle(width / 2, height / 2, centerCircleRadius * 2);
    line(width / 2, margin, width / 2, height - margin);
    stroke(255);  // Set stroke color to white
    strokeWeight(4);  // Make border bold
    rect(margin+goalWidth/2, height/2, goalWidth, goalHeight);
    rect(width - margin-goalWidth/2,height/2 , goalWidth, goalHeight);
    strokeWeight(2);  // Reset stroke weight for other elements
    stroke(0);

    // Update and draw game objects
    updateGame();
    
    // Draw scores with player colors and enhanced style
    textSize(24);  // Larger text size
    textStyle(BOLD);  // Make text bold
    textAlign(CENTER, CENTER);
    
    // Player 1 score (red)
    fill(255, 0, 0);  // Red color matching player 1's mallet
    text(player1.score, width * 0.25, margin-15);
    
    // Player 2 score (blue)
    fill(0, 0, 255);  // Blue color matching player 2's mallet
    text(player2.score, width * 0.75, margin-15);
    
    // Reset text style
    textStyle(NORMAL);

    // Draw game objects with rectMode for mallets
    // rectMode(CENTER);
    fill(255, 0, 0);
    player1.draw();
    fill(0, 0, 255);
    player2.draw();
    
    // Draw puck
    fill(0);
    ellipseMode(RADIUS);
    puck.draw();

    // Display game mode
    fill(0);
    textAlign(LEFT, TOP);
    textSize(16);
    text(`Mode: ${mode === 'single' ? 'Single Player' : 'Multiplayer'}`, margin, margin - 25);
}

/* Function to draw the exit button on the screen
- Custom function */

function drawExitButton() {
    let exitButtonWidth = exitButtonSize; 
    let exitButtonHeight = exitButtonSize / 2; 
    
    fill(255, 0, 0);
    rect(width - exitButtonWidth/2 - 10, 10 + exitButtonHeight/2, exitButtonWidth, exitButtonHeight);
    
    fill(255);
    textSize(16); 
    textAlign(CENTER, CENTER);
    text('Exit', width - exitButtonWidth / 2 - 10, 10 + exitButtonHeight / 2);
}

/* Function to handle mouse click event
- It works by chekcing which button is clicked by checking 
the mouse coordinates and comparing it with the button coordinates
- p5.js function */
function mousePressed() {
    if (gameState === 'welcome') {
        let buttonWidth = 200;
        let buttonHeight = 50;
        let buttonY = height / 2;
        let spacing = 30;
        
        // Check if single player or multiplayer button is clicked
        if (isMouseOverButton(width/2 - buttonWidth/2 - spacing, buttonY, buttonWidth, buttonHeight)) {
            gameMode = 'single';
            gameState = 'game';
            initializeGame()
        } else if (isMouseOverButton(width/2 + buttonWidth/2 + spacing, buttonY, buttonWidth, buttonHeight)) {
            gameMode = 'multi';
            gameState = 'game';
            initializeGame()
        }
    } else {
        // Check if exit button is clicked
        if (mouseX > width - exitButtonSize - 10 && mouseX < width - 10 &&
            mouseY > 10 && mouseY < 10 + exitButtonSize) {
            gameState = 'welcome';
        }
    }
}

/* Function to handle window resize event
-p5.js function */

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateDimensions();
}


// Expose p5.js callback functions to the global scope
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.windowResized = windowResized;