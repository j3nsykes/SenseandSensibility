// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;
let currentPrediction = "";

function setup() {
   var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  // Create a video element
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
  image(video, 0, 0);
  //background(255,0,0);

  if (currentPrediction === "iPod") {
    background(0, 255, 0);
    textSize(64);
    text("actually a phone!", 10, height / 2);
  }
}

function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {

  // The results are in an array ordered by probability.
  currentPrediction = results[0].className;
  //currentPrediction = currentPrediction.split(',')[0]; //Optionally only use the first part of the prediction, before any commas  
  
  //Print out the top three results
  for (let i = 0; i<3; i++) {
  	if (i == 0) console.log("*******");
   console.log(i + ": " + results[i].className + " " + nf(results[i].probability, 0, 2));
  }
  
  select('#result').html(currentPrediction);
  select('#probability').html(nf(results[0].probability, 0, 2)); 
  
  // text(results[i].className,10,10);
  // text(results[i].probability,10,50);
  
  if (results[0].probability > 0.3) {
    //console.log("sure");
  } else {
    //console.log("unsure");
  }

  classifyVideo();
}