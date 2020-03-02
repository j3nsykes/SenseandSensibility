var click1;
var click2;
var click3;
var click4;
let pressedA = false;
let pressedB = false;

function setupButtons() {

  //Create, style and resize clickables.
  //Label A
  click1 = new Clickable();
  click1.cornerRadius = 10;
  click1.locate(660, 60);
  click1.resize(80, 80);

  //This function is ran when the clickable is NOT hovered.
  click1.onOutside = function() {
    this.color = "#fff444";
    this.text = "A";
    this.textColor = "#000000";
  }
  click1.onHover = function() {
    // console.log("The cursor is over me!");
    this.color = "#f33666";
  }

  //This function is ran when the clickable is pressed.
  click1.onPress = function() {
    //record start
    checkA();
    this.color = "#f33666";
  }
  //This funcion is ran when the cursor was pressed and then
  //rleased inside the clickable. If it was pressed inside and
  //then released outside this won't work.
  click1.onRelease = function() {
    //stop recording
    uncheckA();
  }


  //Label B
  click2 = new Clickable();
  click2.cornerRadius = 10;
  click2.locate(660, 160);
  click2.resize(80, 80);
  click2.onOutside = function() {
    this.color = "#fff444";
    this.text = "B";
  }
  click2.onHover = function() {
    // console.log("The cursor is over me!");
    this.color = "#f33666";
  }
  click2.onPress = function() {
    //do something on click
    checkB();
    this.color = "#f33666";
  }

  click2.onRelease = function() {
    //stop recording
    uncheckB();
  }

  //TRAIn BUTTON
  click3 = new Clickable();
  click3.cornerRadius = 10;
  click3.locate(660, 260);
  click3.resize(80, 80);
  click3.onOutside = function() {
    this.color = "#33f444";
    this.text = "TRAIN";
  }

  click3.onPress = function() {
    //do something on click
    this.color = "#f33666";
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  }

  click3.onRelease = function() {
    //stop recording
  }

  //Predict BUTTON
  click4 = new Clickable();
  click4.cornerRadius = 10;
  click4.locate(660, 360);
  click4.resize(80, 80);
  click4.onOutside = function() {
    this.color = "#33f444";
    this.text = "PREDICT";
  }

  click4.onPress = function() {
    //do something on click
    this.color = "#f33666";
    classify();
  }

  click4.onRelease = function() {
    //stop recording
  }
}

//checks. 
//future task make this a class. 
function checkA() {
  pressedA = true;

}

function uncheckA() {
  pressedA = false;

}

function checkB() {
  pressedB = true;

}

function uncheckB() {
  pressedB = false;

}

function  showOutputs(){

  //samples. 
  
  fill(255);
  textSize(14);
  text('Amount of A samples: ' + imagesOfA, 80, 20);

  rect(200, 10, imagesOfA, 25,5);

  
  text('Amount of B samples: ' + imagesOfB, 80, 60);
  rect(200, 45, imagesOfB, 25,5);

}