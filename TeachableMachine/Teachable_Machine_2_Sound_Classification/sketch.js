/*
Teachable Machine ml5 image example - modified from The Coding Train https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
and Andreas Refsgaard example here: https://editor.p5js.org/AndreasRef/sketches/gqE6vCsYf
*/

//remember to change to your URL !!!
let modelURL = "https://teachablemachine.withgoogle.com/models/eS-oMtWl/";
let label = "waiting...";
let confidence = 0.00;
let diameter = 50;
let col;

// STEP 1: Load the model
function preload() {
  const options = {
    probabilityThreshold: 0.95
  };
  classifier = ml5.soundClassifier(modelURL + "model.json", options);

}

function setup() {
  createCanvas(640, 520);
  // STEP 2: Start continous classifying from the microphone
  classifier.classify(gotResult);
  col = color(255); //whitte circle to begin with 
}

function draw() {
  background(0);

  // STEP 4: Display current label + some graphics
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255,0,255);
  label = label.toUpperCase(); //capitalise
  text(label + " " + confidence, width / 2, height - 16);

  //look a new P5JS function! circle();
  fill(col);
  circle(width / 2, height / 2, diameter);
}


// STEP 3: Get the classification
//Notice that the model does not output results for background noise and often outputs multiple classifications for the same class in a row
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results[0].label);
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);

  //Update size of the ellipse based on the classifications
  if (label == "clap") {
    fill(255, 0, 0); //red
    diameter += 10;
  } else if (label == "whistle") {
    fill(0, 0, 255); //blue 
    diameter -= 10;
  }
  diameter = constrain(diameter, 0, height);//don't go bigger than canvas height 
}