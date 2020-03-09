var inString; // input string from serial port
var splitString = []; // input string array after splitting
let status = [];
let lastStatus = [];
let filteredData = [];
let proximity = []
let mapData = [];
var numElectrodes = 13; //one higher to  include data string
let bars = [];
var sensorData = [];


function visualSetup() {


  //////DATA AND VISUAL INFO///////////////////////
  // Create objects  
  for (var i = firstElectrode; i < lastElectrode; i++) {
    //parse i  into the id parameter 
    bars[i] = new Bar(i, 10 + (i * 80), 50, 50, height);
    bars[i].setCol(200, 200, 200);
    lastStatus[i] = 0;
  }

}

//get the serial information!!!
function readIncomingSerial() {

  inString = sensorData //new line feed 

  //is there a string?
  if (inString.length > 0) {
    splitString = splitTokens(inString, ': ');
    //console.log(splitString);

  }

}
//get the data  and do something with it....
function processData() {

  //recieve and processs the different data.
  for (var i = firstElectrode; i < lastElectrode; i++) {

    //if the String begins with FDAT (filtered data / proximity) 
    if (splitString[0] === 'FDAT') {
      filteredData[i] = parseInt(trim(splitString[i])); //make whole number
      //map into visual parameters. 
      proximity[i] = map(filteredData[i], 0, 1023, 0, height);
      // print(proximity[1]);
    }

    //if the String begins with TOUCH
    if (splitString[0] === 'TOUCH') {
      //parse into int. 
      status[i] = parseInt(trim(splitString[i]));


    }
  }

}





function debug() {

  textSize(14);
  textAlign(LEFT, CENTER);
  //text display the data. 
  for (var i = firstElectrode; i < lastElectrode; i++) {
    fill(255);

    text('PROXIMITY ' + " E" + (i - 1) + ": " + filteredData[i], 400, 150 + (i * 30), 600, 50);
  }
}
///////////////////////////BAR VISUALS//////////////////////////////////
//Bar class so we can control individual visuals of the touch electrodes.
//references P.Maguire's method of using id to parse each electrode's data into the class.
class Bar {


  constructor(id, x, y, w, h) {

    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.c = color(this.r, this.g, this.b);
    this.id = id;
  }

  //change colour of individual bar when touched
  setCol(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;

    this.c = color(this.r, this.g, this.b);

  }

  display() {

    this.h = proximity[this.id];

    noStroke();
    fill(this.c);
    rect(this.x, this.y, this.w, height - this.h);
  }

  touchCheck() {
    //take serial touch data to control colour of bars. 
    if (lastStatus[this.id] == 0 && status[this.id] == 1) {
      //print("Electrode " + this.id + " was touched");
      lastStatus[this.id] = 1;
      this.setCol(105, 152, 146);
    } else if (lastStatus[this.id] == 1 && status[this.id] == 0) {
     // print("Electrode " + this.id + " was released");
      lastStatus[this.id] = 0;
      this.setCol(200, 200, 200);
    }
  }
}

function displayAllBars() {
  //iterate through all the bars to display

  bars.forEach(b => {
    b.display();
  });
}

function displayTouch() {
  //iterate through all touch checks of bars. 
  bars.forEach(b => {
    b.touchCheck();
  });
}