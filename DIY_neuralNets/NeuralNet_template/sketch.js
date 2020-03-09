/*
This example if forked from Dan Shiffman and the Coding train 
https://thecodingtrain.com/learning/ml5/6.1-train-your-own.html
*/

function setup() {
  createCanvas(400, 400);

  //STEP 1
  // Only when clicking on the canvas
  canvas.mousePressed(addData);

  //STEP 2
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
//not needed at moment 
}

// Add a data record
function addData() {

  //STEP 3
  // Get label
  let label = select('#label').value();
  // Add data

  brain.addData({
    x: mouseX,
    y: mouseY
  }, {
    label
  });

  //STEP 4
  // Draw circle to visualize training data
  stroke(255);
  noFill();
  ellipse(mouseX, mouseY, 32);
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, mouseX, mouseY);
}



//STEP 5
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

//STEP 6
// When the model is trained
function finishedTraining() {
  brain.classify([mouseX, mouseY], gotResults);
}

//STEP 6
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

 // console.log(results);
  // Predict again
  brain.classify([mouseX, mouseY], gotResults);
}