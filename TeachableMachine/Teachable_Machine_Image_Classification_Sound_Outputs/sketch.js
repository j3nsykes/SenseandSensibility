/*
Teachable Machine ml5 image example - modified from The Coding Train https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html

This example exapnds on Andreas Refsgaard's resource: https://editor.p5js.org/AndreasRef/sketches/gqE6vCsYf
*/
let video;
let label = "waiting...";
let displayLabel = "waiting...";
let previousLabel = "waiting...";
let confidence = 0.0;
let classifier;

//copy, paste   your URL here. 
let modelURL = 'https://teachablemachine.withgoogle.com/models/9ZhtUP8P/';
let soundA;
let soundB;

// STEP 1: Load the model + sounds 
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  soundA = loadSound("0.mp3");
  soundB = loadSound("1.mp3");
}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function draw() {
  background(0);
  image(video, 0, 0);

  // STEP 4: Playback sound if there is a switch in labels
  //look at  the use of != so it does not repeatedly trigger. 
  if (label == "hand" && previousLabel != "hand") {
    soundA.play();
    soundB.stop();
  } else if (label == "person" && previousLabel != "person") {
    soundB.play();
    soundA.stop();
  } else if (label == "nothing") {
    //don't do anything on this label
  }
  
  //Display current label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(displayLabel + " " + confidence, width / 2, height - 16);
  
  //Update previousLabel
  //this is required for the boolean trigger check  in STEP 4. 
  previousLabel = label;
}

// STEP 2: Do the classifying
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// STEP 3: Get the classification
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again
  confidence = nf(results[0].confidence, 0, 2);
  //Small hack: Only update labels when confidence is above a set value
  if (confidence > 0.95) {
    label = results[0].label;
    displayLabel = label;
  } else {
    displayLabel = "unsure";
  }
  classifyVideo();
}
