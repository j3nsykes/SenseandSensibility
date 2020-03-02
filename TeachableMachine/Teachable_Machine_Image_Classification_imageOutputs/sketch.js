// Teachable Machine ml5 image example - modified from The Coding Train https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
let video;
let label = "waiting...";
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/9ZhtUP8P/'; //you can go to this URL to test your model outside of P5JS if you wish. Mightt be a good troubleshooting method? 

let imgA;
let imgB;

// STEP 1: Load the model and your outputs.
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
    handImg = loadImage("0.png");
  personImg = loadImage("1.png");
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

    // STEP 4: Show image output if confidence is over a set value
  if (label == "hand" && confidence > 0.9) {
    image(imgA, 0, 0, width, video.height);
  } else if (label == "person" && confidence > 0.9) {
    image(imgB, 0, 0, width, video.height);
  }  else if (label == "nothing") {
    //don't display any image
  }
  
  // STEP 5: Show current label
  textSize(42);
  textAlign(CENTER, CENTER);
  //label = label.toUpperCase(); //capitalise
  fill(255, 0, 255);
  text(label + " " + confidence, width / 2, height - 16);


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
  //these are the variables useful to you!!!
  console.log(results);
  label = results[0].label; //classification label
  confidence = nf(results[0].confidence, 0, 2); //confidence %
  classifyVideo();
}



//IGNORE THIS 
/*more UI

  noStroke();
  fill(255);
  if (label === 'HAND') {

    rect(10, 10, confidence, 25, 5);
  } else {
    rect(10, 10, 10, 25, 5);

  }

  if (label === 'PERSON') {
    rect(10, 50, confidence, 25, 5);
  } else {
    rect(10, 50, 10, 25, 5);

  }
*/