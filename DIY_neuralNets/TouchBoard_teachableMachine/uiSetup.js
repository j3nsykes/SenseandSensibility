
let pressedR = false;



///////////////////GUI///////////////////////////

let sketch = function(p) {

  let div;
  // gui
  var visible = true;
  var gui;

  // gui params
  let params = {
    record: false,
    train: false,
    predict: false,
    classifierLabel: ['A', 'B', 'C', 'D']
  };

  p.setup = function() {

    div = p.canvas.parentElement;

    p.createCanvas(div.clientWidth, div.clientHeight);
    // Create Layout GUI
    gui = createGui(this);
    gui.addObject(params);

  };

  p.draw = function() {
    classifierLabel = params.classifierLabel;
    // Train Model button
    if (params.train) {
      //params.train = true;

      training = true;
    }

    if (params.record) {
      //params.train = true;

      recording = true;
    } else {
      recording = false;
    }

    if (params.predict) {
      //params.train = true;

      predicting = true;
    }

  };

  p.windowResized = function() {
    p.resizeCanvas(div.clientWidth, div.clientHeight);
  };

};
new p5(sketch, 'gui');



///////////////////////////visual output bars/////////////////
//seperate canvas to diplay the results. Don't want to obscure the canvas  used for Mouse input. 
var s = function(p) { // p could be any variable name
  var x = 100;
  var y = 100;
  p.setup = function() {
    p.createCanvas(400, 400);
    p.textFont(font);
  };

  p.draw = function() {
    // x=p.mouseX;
    // y=p.mouseY;

    p.background(255);
    p.noStroke();
    p.fill(0);
    // p.rect(x,y,50,50);
    p.textSize(22);
    p.text('Classification Result', 20, 60);
    // p.text(classificationResult, p.width - 100, p.height / 2);
    // p.text(confidence, p.width - 100, p.height - 70);

    //TODO: make this into a class. 
    p.textAlign(LEFT);
    p.text(labelA, 220, 105);
    p.text(labelB, 220, 165);
    p.text(labelC, 220, 225);
    p.text(labelD, 220, 285);


    //classification bars 
    p.noStroke();

    //label A

      p.fill(0, 255, 0, 25);
      p.rect(20, 75, 150, 45, 10);
      p.fill(0, 255, 0);
      p.rect(20, 75, confA * 100, 45, 10);
    
    //label B

      p.fill(255, 0, 0, 25);
      p.rect(20, 135, 150, 45, 10);
      p.fill(255, 0, 0);
      p.rect(20, 135, confB * 100, 45, 10);
    
    //label C

      p.fill(255, 0, 200, 25);
      p.rect(20, 195, 150, 45, 10);
      p.fill(255, 0, 200);
      p.rect(20, 195, confC * 100, 45, 10);
    
    //label  D

      p.fill(0, 0, 255, 25);
      p.rect(20, 255, 150, 45, 10);
      p.fill(0, 0, 255);
      p.rect(20, 255, confD * 100, 45, 10);
    
  };
};
var myp5 = new p5(s, 'outputs');