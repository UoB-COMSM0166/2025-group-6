let margin = 40;
let boardWidth, boardHeight;
let centerCircleRadius;
let goalWidth = 10;
let goalHeight;
let goalY;
let gameState = 'welcome';
let gameMode = '';
let burgerButton;
let menuVisible = false;
let menuItems = ["Instructions", "Settings", "Quit"];
let menuX, menuY, menuWidth, menuHeight;
let instructionsText = '';

/* Function called only once at the beginning of the program to setup the game elements
- p5.js function */

function setup() {
    createCanvas(windowWidth, windowHeight);
    updateDimensions();
    loadInstructions();
}

/* Function called only once at the beginning of the program to load images and other media files
-called before setup()
- p5.js function */
function loadInstructions() {
    loadStrings('./resources/instructions.txt', function(lines) {
        instructionsText = lines.join('\n'); // Join the lines from the file into a single string
    });
}

function preload() {
    welcomeBg = loadImage('./resources/welcome.jpg');
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
    menuX = width - 38;
    menuY = 8;
    menuWidth = 150;
    menuHeight = 40;

    if (gameState === 'welcome') {
        drawWelcome();
    } else {
        drawGame(gameMode);
        drawBurgerMenu();
        if (gameState === 'instructions') {
            drawInstructions();
        } else if (gameState === 'settings') {
            drawSettings();
        } else if (gameState === 'askToQuit') {
            drawQuit();
        }
    }

}

/* Fuction to draw the welcome screen with buttons for single player and multiplayer
- Custom function */
function drawWelcome() {
    image(welcomeBg, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text('Air Hockey', width / 2, height / 3);

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
    rect(width / 2 - buttonWidth - spacing, buttonY, buttonWidth, buttonHeight);
    fill(0);
    textSize(20);
    text('Single Player', width / 2 - buttonWidth / 2 - spacing, buttonY + buttonHeight / 2);

    // Multiplayer Button
    if (isMouseOverButton(width / 2 + spacing, buttonY, buttonWidth, buttonHeight)) {
        fill(200);
    } else {
        fill(255);
    }
    rect(width / 2 + spacing, buttonY, buttonWidth, buttonHeight);
    fill(0);
    text('Multiplayer', width / 2 + buttonWidth / 2 + spacing, buttonY + buttonHeight / 2);
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

    noFill();
    strokeWeight(2);
    rect(margin, margin, boardWidth, boardHeight);
    circle(width / 2, height / 2, centerCircleRadius * 2);
    line(width / 2, margin, width / 2, height - margin);
    rect(margin - goalWidth, goalY, goalWidth, goalHeight);
    rect(width - margin, goalY, goalWidth, goalHeight);

    // Display game mode
    fill(0);
    textAlign(LEFT, TOP);
    textSize(16);
    text(`Mode: ${mode === 'single' ? 'Single Player' : 'Multiplayer'}`, margin, margin - 25);
}

// Function to draw the Burger menu on the screen
function drawBurgerMenu() {
    fill(50);
    rect(menuX, menuY, 30, 30, 5);
    fill(255);
    rect(menuX + 5, menuY + 8, 20, 3);
    rect(menuX + 5, menuY + 14, 20, 3);
    rect(menuX + 5, menuY + 20, 20, 3);

    if (menuVisible) {
        fill(50);
        rect(menuX - menuWidth + 30, menuY + 40, menuWidth, menuItems.length * menuHeight, 5);

        fill(255);
        textSize(16);
        textAlign(LEFT, CENTER);
        for (let i = 0; i < menuItems.length; i++) {
            let itemY = menuY + 50 + i * menuHeight;
            fill(100);
            rect(menuX - menuWidth + 30, itemY, menuWidth, menuHeight);
            fill(255);
            text(menuItems[i], menuX - menuWidth + 40, itemY + menuHeight / 2);
        }
    }
}

// Function to draw the Instruction option on the screen
function drawInstructions() {
    rect((width/2 - 200), (height/2 - 250), 400, 500, 10); // Drawing instruction page.
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    text('INSTRUCTION MANUAL', width/2, (height/5 + 20));
    textSize(20);
    text(instructionsText, width / 4, height / 10, width * 0.5, height * 0.8);  // Adjust the area where text is displayed

    // Cross button to close the instructions page
    fill(255, 0, 0);  // Red cross
    rect((width/2 + 185), (height/2 - 265), 30, 30, 5);  // Cross button position
    fill(255);  // White color for the cross
    line((width/2 + 187.5), (height/2 - 262.5), (width/2 + 212.5), (height/2 - 237.5));  // Diagonal line (\)
    line((width/2 + 187.5), (height/2 - 237.5), (width/2 + 212.5), (height/2 - 262.5));  // Diagonal line (/)
}

// Function to draw the Setting option on the screen
function drawSettings() {
    rect((width/2 - 200), (height/2 - 250), 400, 500, 10); // Drawing settings page.
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    text('SETTINGS', width/2, (height/5 + 20));

    // Cross button to close the instructions page
    fill(255, 0, 0);  // Red cross
    rect((width/2 + 185), (height/2 - 265), 30, 30, 5);  // Cross button position
    fill(255);  // White color for the cross
    line((width/2 + 187.5), (height/2 - 262.5), (width/2 + 212.5), (height/2 - 237.5));  // Diagonal line (\)
    line((width/2 + 187.5), (height/2 - 237.5), (width/2 + 212.5), (height/2 - 262.5));  // Diagonal line (/)
}

// Function to draw the Quit option on the screen
function drawQuit() {
    fill(100, 200, 200);
    rect((width/2 - 150), (height/2 - 50), 300, 100, 10); // Drawing Quit page.
    textAlign(CENTER, BOTTOM);
    textSize(24);
    fill(0, 0, 0);
    text('Are You Sure?', width/2 , (height/2 - 5));

    // Confirmation Buttons to quit game.
    yesButton();
    noButton();
}

// Function to draw the Quit - YES button on the screen
function yesButton() {
    fill(200, 128, 0)
    rect((width/2 - 103), (height/2 + 10), 80, 30, 10); // Drawing YES Button.
    // textAlign(CENTER, BOTTOM);
    textSize(24);
    fill(0);
    text('YES', (width/2 - 65), (height/2 + 37.5));
}

// Function to draw the Quit - NO button on the screen
function noButton() {
    fill(200, 128, 0);
    rect((width/2 + 28), (height/2 + 10), 80, 30, 10); // Drawing NO Button.
    // textAlign(CENTER, BOTTOM);
    textSize(24);
    fill(0);
    text('NO', (width/2 + 68), (height/2 + 37.5));
    textAlign(CENTER, BOTTOM);
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
        if (isMouseOverButton(width / 2 - buttonWidth - spacing, buttonY, buttonWidth, buttonHeight)) {
            gameMode = 'single';
            gameState = 'game';
        } else if (isMouseOverButton(width / 2 + spacing, buttonY, buttonWidth, buttonHeight)) {
            gameMode = 'multi';
            gameState = 'game';
        }
    } else {
        // Check if burger menu button is clicked
        if (mouseX > menuX && mouseX < menuX + 30 && mouseY > menuY && mouseY < menuY + 30) {
            menuVisible = !menuVisible;
        } else if (menuVisible) {
            for (let i = 0; i < menuItems.length; i++) {
                let itemY = menuY + 50 + i * menuHeight;
                if (mouseX > menuX - menuWidth + 30 && mouseX < menuX - menuWidth + 30 + menuWidth && mouseY > itemY && mouseY < itemY + menuHeight) {
                    if (menuItems[i] === "Instructions") {
                        loadStrings('./resources/instructions.txt', (data) => {
                            instructionsText = data.join('\n');
                        });
                        gameState = 'instructions';
                    } else if (menuItems[i] === "Settings") {
                        gameState = 'settings';
                    } else if (menuItems[i] === "Quit") {
                        gameState = 'askToQuit';
                    }
                    menuVisible = false;
                }
            }
        }

        // Check if cross button is clicked in instructions page
        if (gameState === 'instructions' || gameState === 'settings') {
            // If mouse is within the bounds of the cross button
            if (mouseX > (width/2 + 185) && mouseX < (width/2 + 215) && mouseY > (height/2 - 265) && mouseY < (height/2 - 235)) {
                gameState = 'game';  // Close instructions page and return to game
            }
        }
        else if (gameState === 'askToQuit') {
            if (mouseX > (width/2 - 103) && mouseX < (width/2 - 23) && mouseY > (height/2 + 10) && mouseY < (height/2 + 40)) {
                gameState = 'welcome';  // Close instructions page and return to game
            }
            else if (mouseX > (width/2 + 28) && mouseX < (width/2 + 108) && mouseY > (height/2 + 10) && mouseY < (height/2 + 40)) {
                gameState = 'game';     // Close Quit page
            }
        }
    }
}

/* Function to handle window resize event
-p5.js function */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    updateDimensions();
}

// Function to draw score board.
function drawScoreInfo() {
    rect((width/2 - 200), (height/2 - 250), 400, 500);
}
