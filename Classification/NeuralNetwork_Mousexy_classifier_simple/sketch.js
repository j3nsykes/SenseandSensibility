// The neural network is the brain
let brain;
let pressed = false;
let confidence;
let classificationResult;
let labelB = '';
let labelA = '';
let confA = 0;
let confB = 0;

function setup() {
  let canvas = createCanvas(400, 400);

  // Only when clicking on the canvas
  canvas.mousePressed(addData);
  
  //for holding down recording. 
  // canvas.mousePressed(check);
  // canvas.mouseReleased(uncheck);

  // Create ethe model
  const options = {
    inputs: ['x', 'y'], // TODO: support ['x', 'y']
    outputs: ['label'], // TODO: support ['label']
    debug: true,
    task: 'classification'
  }
  brain = ml5.neuralNetwork(options);

  // Train Model button
  select('#train').mousePressed(trainModel);

  background(0);
}

function draw() {
  console.log(pressed);
  // addData(); //only here is pressed boolean uncommented. 
  showConfidence();

  //debug
  /*
  fill(255);
  text(labelB, 50, 300);
  text(labelA, 50, 350);
  text(confB, 150, 300);
  text(confA, 150, 350);
  */
}

function check() {
  pressed = true;

}

function uncheck() {
  pressed = false;

}


//move into an instance mode 
function showConfidence() {

  noStroke();
  fill(0);
  rect(50, 300, 400, 100);

  fill(0, 255, 0);
  rect(50, 300, confA * 100, 45);

  fill(255, 0, 0);
  rect(50, 350, confB * 100, 45);

}
// Add a data record
function addData() {
  // if (pressed) {
  // Get label
  let label = select('#label').value();
  // Add data

  brain.addData({
    x: mouseX,
    y: mouseY
  }, {
    label
  });

  // Draw circle to visualize training data
  stroke(255);
  noFill();
  ellipse(mouseX, mouseY, 32);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, mouseX, mouseY);
}

//}

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
  brain.classify([mouseX, mouseY], gotResults);
}

// Got a result
function gotResults(error, results) {
  if (error) {
   // console.error(error);
    return;
  }

  // Show classification
  select('#classification').html(results[0].label);
  confidence = results[0].confidence;
  classificationResult = results[0].label;

  labelB = results[0].label;
  labelA = results[1].label;
  confA = results[1].confidence;
  confB = results[0].confidence;

 // console.log(results);
  // Predict again
  brain.classify([mouseX, mouseY], gotResults);
}