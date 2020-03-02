// The neural network is the brain
let brain;

//control value
let slider;
let results;
let count = 0;

function setup() {
  colorMode(HSB);
  let canvas = createCanvas(400, 400);
  // Only when clicking on the canvas
  canvas.mousePressed(addData);

  slider = createSlider(0, 255, 0, 10);
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

  background(0);
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
  let target = parseFloat(slider.value());

  // Add data
  brain.addData([mouseX, mouseY], [target]);

  background(target, 100, 100, 1);


  // Draw circle to visualize training data

  stroke(255);
  noFill();
  ellipse(mouseX, mouseY, 32);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(target, mouseX, mouseY);


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
  background(results, 100, 100);
  // Predict again
  brain.predict([mouseX, mouseY], gotResults);
}