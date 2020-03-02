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
let feature;





function setup() {
  var cnv = createCanvas(640, 480);
  cnv.position(0, 0);


  // load up your video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.position(0, 0);
  video.hide(); // Hide the video element, and just show the canvas




  const faceOptions = {
    withLandmarks: true,
    withExpressions: false,
    withDescriptors: false
  };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);


  textAlign(RIGHT);


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


}