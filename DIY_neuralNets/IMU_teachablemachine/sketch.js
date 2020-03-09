/*
IMU classifier 
works with BMO055 and any webUSB compatible Arduino
wait 5 seconds at beginning for serial to kick in. 
once you see the data streaming in you can start recording smaples. 

Neural Net structure built from Dan Shiffman example on the Coding Train
https://thecodingtrain.com/learning/ml5/6.1-train-your-own.html
*/

var sensorData = 0;
var val;
var data = 0; //give initial values. 
var totalInputs = 3; //amount of sensors input X,Y,Z

//ML variables
let confidence;
let classificationResult = "waiting";
let brain;
let _x = 0
let _y = 0
let _z = 0;
let sample = 0;
let training = false;
let lastTraining = false;
let recording = false;
let font;
let  inputs=[];


function preload() {
  font = loadFont('SourceCodePro-Regular.ttf');

}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');

  samplesP = createP('waiting for samples');
  samplesP.position(130, 85);
  // Create ethe model
  const options = {
    inputs: ['x', 'y', 'z'], // add each electron
    outputs: 3, // add amount of output labels
    debug: true,
    task: 'classification'
  }
  brain = ml5.neuralNetwork(options);

  textFont(font);
  background(0);
}

// Train the model
function trainModel() {
  console.log('train model');
  brain.normalizeData();

  let options = {
    epochs: 25
  }

  brain.train(options, finishedTraining);
}

// When the model is trained
function finishedTraining() {
  classify();
}

// Classify
function classify() {
  console.log('classify');

  let inputs = getInputs();
  brain.classify(inputs, gotResults);

}

// Got a result
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  classificationResult = results[0].label;
  confidence = results[0].confidence;
  updateClassification(results); //filter results

  // Classify again
  classify();
}

function updateClassification(results) {

  //filter the results
  var idA = results.filter(function(e) {
    return e.label == 'A';
  });
  console.log(idA[0].confidence);
  labelA = idA[0].label;
  confA = idA[0].confidence;

  var idB = results.filter(function(e) {
    return e.label == 'B';
  });
  console.log(idB[0].confidence);
  labelB = idB[0].label;
  confB = idB[0].confidence;

  //comment in and out for less/more options
  var idC = results.filter(function(e) {
    return e.label == 'C';
  });
  // console.log(idB[0].confidence);
  labelC = idC[0].label;
  confC = idC[0].confidence;

  /*
    var idD = results.filter(function(e) {
      return e.label == 'D';
    });

    // console.log(idB[0].confidence);
    labelD = idD[0].label;
    confD = idD[0].confidence;
  */
}

function getInputs() {
  //console.log(sensorData);
  sensorData = str(sensorData); //parse to string. 
  let splitString = splitTokens(sensorData, ';'); //seperate at the ';'

  if (millis() >= 5000) { //allow for Serial to start stream at beginning. 
    //  console.log(splitString);
    data = JSON.parse(splitString); //parse to JSON object 
    inputs = [];
    fill(0);
    textSize(22);
    text('data.tX: ' + data.tX, 50, 50);
    text('data.tY: ' + data.tY, 50, 100);
    text('data.tZ: ' + data.tZ, 50, 150);
    _x = data.tX;
    _y = data.tY;
    _z = data.tZ;
    inputs.push(_x);
    inputs.push(_y);
    inputs.push(_y);
  }
  return inputs;
}

// Add a data record
function addExample() {

  samplesP.html('samples: ' + sample++); //see amount of samples collected. 
  let inputs = getInputs();
  // Get frequency
  let target = classifierLabel;
  // Add data
  brain.addData(inputs, [target]);

}

function draw() {
  background(220);
  getInputs();
  controlsCheck();

  fill(255);
  textSize(18);
  text(classificationResult, 50, 300);

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



}


function controlsCheck() {
  if (training !== lastTraining) { //don't continuously train!
    if (training) {
      //console.log('training');
      trainModel();
    }
  }
  lastTraining = training;


  if (recording) {
    addExample(); //add samples if button checked 
    // console.log('recording');
  }
}