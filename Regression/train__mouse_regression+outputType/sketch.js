// The neural network is the brain
let brain;

//control value
let slider;
let results;
let count = 0;


var font = 'sans-serif';
var letter = 'A';
let target;

function setup() {
  colorMode(RGB);
  let canvas = createCanvas(400, 400);
  // Only when clicking on the canvas
  canvas.mousePressed(addData);

  slider = createSlider(10, 355, 0, 10);
  slider.position(0, 60);
  slider.style('width', '180px');

  // Create ethe model
  const options = {
    inputs: 2, // TODO: support ['x', 'y']
    outputs: 1, // TODO: support ['val]
    debug: true,
  }
  brain = ml5.neuralNetwork(options);

  // Train Model button
  select('#train').mousePressed(trainModel);

  background(249, 248, 146);
  fill(0);

  textFont(font);
  textAlign(CENTER, CENTER);
}

function draw() {

  select('#slider').html(slider.value());
}
// Add a data record
function addData() {
  //add samples
  count++;
  select('#samples').html(count);

  // Get value
  target = parseFloat(slider.value());

  // Add data
  brain.addData([mouseX, mouseY], [target]);

  //background(target, 100, 100, 1);
 background(249, 248, 146);

  // Draw circle to visualize training data

  stroke(255);
  noFill();
  ellipse(mouseX, mouseY, 32);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(target, mouseX, mouseY);
  
  //outputs  you want  to change 
  textSize(target);

}

function draw() {




  fill(0);
  text(letter, width / 2, 200); //draw the letter to the canvas 
}

function keyTyped() {
  letter = key;
}
// Train the model
function trainModel() {
  // ml5 will normalize data to a range between 0 and 1 for you.
  brain.normalizeData();
  // Train the model
  // Epochs: one cycle through all the training data
  brain.train({
    epochs: 20
  }, finishedTraining);
}

// When the model is trained
function finishedTraining() {


  // Predict a frequency
  brain.predict([mouseX, mouseY], gotResults);
}

// Got a result
function gotResults(error, outputs) {
  if (error) {
    console.error(error);
    return;
  }

  // The output comes in an array
  // There is only one output in this example, but it could be more!
  value = parseFloat(outputs[0].value);

  // Render  value
  select('#prediction').html(value.toFixed(2));



  //send results back to slider. 
  results = floor(outputs[0].value);
  slider.value(results);
 
  //update background color. 
  //background(results, 100, 100);
   background(249, 248, 146);//static
  
  
    //display the Letter chnage. 
   //outputs  you want  to change with the  predicted results 
   textSize(results);
  // Predict again
  brain.predict([mouseX, mouseY], gotResults);
}