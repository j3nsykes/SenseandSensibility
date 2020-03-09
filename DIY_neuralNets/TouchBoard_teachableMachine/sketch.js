//this example combines tthe Bare Conductive TouchBoard with ML5 neural //network classifyer code. 
//neural network methods forked from
//https://editor.p5js.org/ml5/sketches/eM-65FxlKkU


// The neural network is the brain
let brain;
// Interface
let dataButton;
let dataLabel;
let trainButton;
let classificationP;
let labelB = '';
let labelA = '';
let labelC = '';
let labelD = '';
let confA = 0;
let confB = 0;
let confC = 0;
let confD = 0;

//define electrodes to be used
var firstElectrode = 1; //start at one ignore first String
var lastElectrode = 7; //use if you do not want all electrodes in use. 
//remeber to update the inputs if you change the lastElectrode ID. 

let classificationResult;
let confidence;
let sample = 0;
let pressed = false;
let classifierLabel;
let training = false;
let lastTraining = false;
let recording = false;
let font;

function preload(){
font= loadFont('SourceCodePro-Regular.ttf');

}


function setup() {
  let canvas = createCanvas(650, 400);
  canvas.parent('sketch-holder');
  visualSetup();

  //interface
//   classificationP = createP('waiting to train model');

   samplesP = createP('waiting for samples');
samplesP.position(130,85);
  // Create ethe model
  const options = {
    inputs: 6, // add each electron
    outputs: 4, // add amount of output labels
    debug: true,
    task: 'classification'
  }
  brain = ml5.neuralNetwork(options);


textFont(font);
  background(0);
}


// Train the model
function trainModel() {
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
  //console.log(results);
  classificationP.html(`${results[0].label} (${floor(results[0].confidence * 100)})%`);

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

 
  var idD = results.filter(function(e) {
    return e.label == 'D';
  });
  
  // console.log(idB[0].confidence);
  labelD = idD[0].label;
  confD = idD[0].confidence;
  
}

function getInputs() {

  let inputs = [];
  for (let i = firstElectrode; i < lastElectrode; i++) {
    inputs.push(float(filteredData[i])); //data needs to be float for training!!!

  }
  // console.log(inputs);
  return inputs;
}


// Add a data record
function addExample() {

  samplesP.html('samples: '+sample++); //see amount of samples collected. 

  let inputs = getInputs();
  // Get frequency
  let target = classifierLabel;
  // Add data
  brain.addData(inputs, [target]);

}



function draw() {
  background(80);
  //handle incoming data
  readIncomingSerial();
  processData();

  controlsCheck(); //gui controls


  //comment  in to display text of filttered data
  //debug();

  //display  electrode visuals. 
  displayAllBars();
  displayTouch();

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
      //  console.log('training');
      trainModel();
    }
  }
  lastTraining = training;


  if (recording) {
    addExample(); //add samples if button checked 
    //console.log('recording');
  }
}