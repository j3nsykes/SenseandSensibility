/*
Face API classifier built from similar training structure to that of PoseNet classifier 
sourced here: 

ml5.js: Pose Classification
The Coding Train / Daniel Shiffman
https://thecodingtrain.com/Courses/ml5-beginners-guide/7.2-pose-classification.html


reference code: https://editor.p5js.org/codingtrain/sketches/JoZl-QRPK

This example utilises the FaceAPI in ML5 : https://learn.ml5js.org/docs/#/reference/face-api

*/


let faceapi;
let video;
let detections = [];

//neural net
let brain;
let feature;
// Interface
let dataButton;
let dataLabel;
let trainButton;
let classificationP;
let classificationResult = "";
let confidence;
let sample = 0;
let pressed = false;
let inputs = [];




function setup() {
  var cnv = createCanvas(640, 480);
  cnv.position(0, 300);


  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.position(0, 300);
  video.hide(); // Hide the video element, and just show the canvas

  //interface
  classificationP = createP('waiting to train model');


  dataLabel = createSelect();
  dataLabel.option('A');
  dataLabel.option('B');
  dataLabel.option('C');
  dataLabel.option('D'); //must give enough smaples to each option otherwise not able to provide enough confidence of classification. 

  // Only when clicking on the button
  dataButton = createButton('add example');
  dataButton.mousePressed(check);
  dataButton.mouseReleased(uncheck); //so you can hold the button down for quicker sample collection.



  samplesP = createP('waiting for samples');

  // Train Model button
  trainButton = createButton('train model');
  trainButton.mousePressed(trainModel);


  const faceOptions = {
    withLandmarks: true,
    withExpressions: false,
    withDescriptors: false
  };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);


  textAlign(RIGHT);

  let options = {
    inputs: 68,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);

  // LOAD PRETRAINED MODEL
  // Uncomment to train your own model!
  // const modelInfo = {
  //   model: 'model2/model.json',
  //   metadata: 'model2/model_meta.json',
  //   weights: 'model2/model.weights.bin',
  // };
  // brain.load(modelInfo, brainLoaded);

  // LOAD TRAINING DATA
  // brain.loadData('ymca.json', dataReady);
}


//Face API stuff
// Start detecting faces
function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result;
  faceapi.detect(gotFaces);
}

//Neural Netraining stuff
// Train the model
function trainModel() {
  brain.normalizeData();

  let options = {
    epochs: 25
  }

  brain.train(options, finishedTraining);
}

function brainLoaded() { //if preloading saved model. 
  console.log('pose classification ready!');
  classifyPose();
}


function dataReady() { //for pretrained ymca.json file
  brain.normalizeData();
  brain.train({
    epochs: 50
  }, finished);
}

// When the model is trained
function finishedTraining() {
  console.log('model trained');
  brain.save();//save it 
  classify();
}

// Classify
function classify() {

  let inputs = getInputs();
  brain.classify(inputs, gotResults);

}


// Got a result
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  //  Log output
  console.log(results);
  classificationP.html(`${results[0].label} (${floor(results[0].confidence * 100)})%`);

  classificationResult = results[0].label;
  confidence = results[0].confidence;
  // Classify again
  classify();
}

function getInputs() {

  inputs = [];
  if (detections.length > 0) {
    let points = detections[0].landmarks.positions;

    for (let i = 0; i < points.length; i++) {
      // stroke(161, 95, 251);
      // strokeWeight(4);
      // point(points[i]._x, points[i]._y);
      console.log(points[i]._x);
      let x = points[i]._x;
      let y = points[i]._y;
      inputs.push(x);
      inputs.push(y);
    }
  }
  // console.log(inputs);
  return inputs;
}


// Add a data record
function addExample() {


  if (pressed) { //only if button held!!!
    samplesP.html(sample++); //see amount of samples collected. 

    inputs = getInputs();
    // Get frequency
    let target = dataLabel.value();
    // Add data
    brain.addData(inputs, [target]);
  }
}

//button checks 
function check() {
  pressed = true;

}

function uncheck() {
  pressed = false;

}

function draw() {

  background(0);
  image(video, 0, 0, width, height);
  // Just look at the first face and draw all the points
  if (detections.length > 0) {
    let points = detections[0].landmarks.positions;
    //console.log(points);
    console.log(points.keypoints);
    for (let i = 0; i < points.length; i++) {
      stroke(161, 95, 251);
      strokeWeight(4);
      point(points[i]._x, points[i]._y);
      // console.log(points[i]._x);
    }
  }

  addExample(); //add samples if button  held down. 

  ////////////////// ADD YOUR INTTERACTION !!!!! ///////////////////////////
  //check classification results
  if (classificationResult === "A") {
    fill(255, 0, 0, 100);
    ellipse(75, 350, 50, 50);
  }

  if (classificationResult === "B") {
    fill(0, 255, 0, 100);
    ellipse(75, 350, 50, 50);
  }

  /////////display result all the time. 
  fill(255, 0, 255);
  noStroke();
  textSize(512);
  textAlign(CENTER, CENTER);
  text(classificationResult, width / 2, height / 2);
}