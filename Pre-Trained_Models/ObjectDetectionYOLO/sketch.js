let video;
let yolo;
let status;
let objects = [];
var myFont;

function preload() {
  myFont=loadFont('Roboto-Medium.ttf');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  
  var options = { filterBoxesThreshold: 0.01, IOUThreshold: 0.4, classProbThreshold: 0.4 }
  
  
  // Create a YOLO method
  yolo = ml5.YOLO(video, options, startDetecting);

  // Hide the original video
  video.hide();
  status = select('#status');
}

function draw() {
  image(video, 0, 0, width, height);
  for (let i = 0; i < objects.length; i++) {
    noStroke();
    fill(0, 255, 0);
    textSize(18);
    textFont(myFont);
    text(objects[i].label + " " + nfc(objects[i].confidence * 100.0, 2) + "%", objects[i].x * width, objects[i].y * height - 5);
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
  }
}

function startDetecting() {
  status.html('Model loaded!');
  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });
}