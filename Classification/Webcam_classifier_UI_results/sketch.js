// The neural network is the brain
let featureExtractor;
let classifier;
let video;
let loss;
let imagesOfA = 0;
let imagesOfB = 0;
let classificationResult;
let confidence = 0;
let confidenceA = 0;
let confidenceB = 0;



function setup() {
  var canvas = createCanvas(900, 480);

  setupButtons(); //setup the UI from ui.js file 

  // Create a video element
  video = createCapture(VIDEO);
  video.size(640, 480);

  video.hide();
  // Append it to the videoContainer DOM element
  //video.parent('videoContainer');
  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // Create a new classifier using those features and give the video we want to use

  const options = {
    numLabels: 2
  }; //Specify the number of classes/labels
  classifier = featureExtractor.classification(video, options);

  background(0);
}


function addDataA() {
  if (pressedA) {
    classifier.addImage('A');
imagesOfA++;
  }
}


function addDataB() {
  if (pressedB) {
    classifier.addImage('B');
  imagesOfB++;
  }
}


function draw() {
  background(0);
  //draw UI contained in ui.js file. 
  click1.draw();
  click2.draw();
  click3.draw();
  click4.draw();

  /////////////////

  image(video, 0, 100);
  noStroke();
  fill(0, 255, 0);
  textSize(32);

  if (classificationResult == 'A') {
   // text("A", 50, 50);

  } else if (classificationResult == 'B') {
    //text("B", 50, 50);

  }
  addDataA(); //data control. 
  addDataB();

  showOutputs();
  //display label and confidence
  if(classificationResult!=null){
  textSize(22);
  fill(0,255,0);
  text(classificationResult + " " + confidence, 130, 90);
  }
}
// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// A function to be called when the video has loaded
function videoReady() {
  select('#videoStatus').html('Video ready!');
}


// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}


// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  // select('#result').html(result[0].label);
  // select('#confidence').html(result[0].confidence);

  classificationResult = result[0].label;
  confidence = result[0].confidence;
  
  
  classify();
}