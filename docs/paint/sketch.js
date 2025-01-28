let brushColor; // Variable to store the brush color
let colorPicker; // Color picker for dynamic color selection
let prevX, prevY; // Previous mouse coordinates
let brushSizeSlider; // Slider for changing brush size
let brushType = 'pencil'; // Default brush type
let prevBrushType; // Variable to store the previous brush type
let saveButton;
let eraserButton;

function setup() {
    createCanvas(950, 700);
    background(0);

    // Initialize brush color to blue
    brushColor = color(0, 0, 255);

    // Create a color picker
    colorPicker = createColorPicker('#FFC0CB'); // Default: pink
    colorPicker.position(100, height + 45); // Position below the canvas
    
    // Add and style the color picker label
    let colorPickerLabel = createDiv("🎨 Click to choose a different color");
    colorPickerLabel.position(10, height + 10); // Position below the color picker
    colorPickerLabel.style('font-size', '16px'); // Larger font size for better visibility
    colorPickerLabel.style('font-weight', 'bold'); // Make the text bold
    colorPickerLabel.style('color', '#333'); // Dark color for text
    colorPickerLabel.style('padding', '5px 15px'); // Add padding to the label
    colorPickerLabel.style('border-radius', '10px'); // Round corners for the label
    colorPickerLabel.style('background-color', '#90EE90'); // Soft background color
    colorPickerLabel.style('box-shadow', '2px 2px 8px rgba(0, 0, 0, 0.1)'); // Add a shadow for depth
    
    // Create a slider for brush size
    brushSizeSlider = createSlider(1, 50, 2); // Min: 1, Max: 50, Default: 10
    brushSizeSlider.position(320, height + 45); // Position below the color picker
    brushSizeSlider.style('width', '200px'); // Set the width of the slider
    brushSizeSlider.style('height', '10px'); // Make the slider a little thicker for better visibility
    
    // Add and style the brush size label
    let brushSizeLabel = createDiv("🖌️ Brush Size and Type");
    brushSizeLabel.position(325, height + 10); // Position below the slider
    brushSizeLabel.style('font-size', '16px'); // Larger font size
    brushSizeLabel.style('font-weight', 'bold'); // Make the text bold
    brushSizeLabel.style('color', '#333'); // Dark text color
    brushSizeLabel.style('padding', '5px 15px'); // Add padding for spacing
    brushSizeLabel.style('border-radius', '10px'); // Rounded corners
    brushSizeLabel.style('background-color', '#ADD8E6'); // Light background
    brushSizeLabel.style('box-shadow', '2px 2px 8px rgba(0, 0, 0, 0.1)'); // Subtle shadow

    createBrushTypeButtons();

    // Create Eraser button
    eraserButton = createButton('Eraser');
    eraserButton.position(150, height + 45);
    eraserButton.mousePressed(() => {
        prevBrushType = brushType; // Store the current brush type before changing to eraser
        brushType = 'eraser'; // Change brush type to eraser
    });

    // Create Save button
    saveButton = createButton('Save Drawing');
    saveButton.position(820, height + 10); // Position the button
    saveButton.style('font-size', '16px'); // Set the font size
    saveButton.style('padding', '10px 20px'); // Add padding for better clickability
    saveButton.style('background-color', '#4CAF50'); // Set the background color to green
    saveButton.style('color', 'white'); // Set the text color to white
    saveButton.style('border', 'none'); // Remove the border
    saveButton.style('border-radius', '5px'); // Round corners
    saveButton.style('cursor', 'pointer'); // Change the cursor to pointer on hover
    saveButton.mousePressed(saveCanvasFunction); // Trigger saveCanvasFunction when the button is clicked
}

function createBrushTypeButtons() {
    let pencilButton = createButton('Pencil');
    pencilButton.position(325, height + 75); // Position the pencil button
    pencilButton.mousePressed(() => { brushType = 'pencil'; });

    let sprayButton = createButton('Spray');
    sprayButton.position(425, height + 75); // Position the spray button
    sprayButton.mousePressed(() => { brushType = 'spray'; });

    let ballPenButton = createButton('Ball Pen');
    ballPenButton.position(525, height + 75); // Position the ball pen button
    ballPenButton.mousePressed(() => { brushType = 'ballpen'; });
}

function saveCanvasFunction(){
    saveCanvas('my ugly drawing','png');
}

function draw() {
    // Update brush color from the color picker if not using eraser
    if (brushType !== 'eraser') {
        brushColor = colorPicker.color();
    }

    // Get brush size from the slider
    let brushSize = brushSizeSlider.value();

    // Draw a continuous stroke when the mouse is pressed
    if (mouseIsPressed) {
       if(brushType == 'pencil'){
        stroke(brushColor); // Use the current brush color
        strokeWeight(brushSize); // Use the brush size from the slider
        line(prevX, prevY, mouseX, mouseY); // Draw a line from the previous to the current position
       } else if(brushType == 'spray'){
            for (let i = 0; i < 10; i++) { // Draw 10 dots per frame
                let offsetX = random(-brushSize, brushSize);
                let offsetY = random(-brushSize, brushSize);
                fill(brushColor);
                noStroke();
                ellipse(mouseX + offsetX, mouseY + offsetY, 5, 5); // Spray effect using small circles
            }
        } else if (brushType === 'ballpen') {
            // Ball Pen: thick, solid line
            stroke(brushColor);
            strokeWeight(brushSize * 2); // Make the ballpen thicker than the pencil
            line(prevX, prevY, mouseX, mouseY); // Draw a line from the previous to the current position
        } else if(brushType == 'eraser'){
            stroke(0);
            strokeWeight(brushSize);
            line(prevX, prevY, mouseX, mouseY);
        }
    }

    // Update previous coordinates
    prevX = mouseX;
    prevY = mouseY
}

function mousePressed() {
    // Initialize the previous position when the mouse is first pressed
    prevX = mouseX;
    prevY = mouseY;
}
