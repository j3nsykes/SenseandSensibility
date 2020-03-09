//Serial Comms to motor. 
//This Uses arduino but can be converted to direct Serial Bus if using 360º motor like a Dynamixel. 
import processing.serial.*; // Import Serial library to talk to Arduino 
Serial myPort; // Send value to Arduino // 


boolean face=false;
boolean lastFace=true;

void setupMotor(int _port) {
  printArray(Serial.list()); // shows available serial ports on the system 

  // Change 0 to select the appropriate port as required. 
  String portName = Serial.list()[_port]; 
  myPort = new Serial(this, portName, 9600);
}


void motorMove() {
  //do something here 
  if (face!=lastFace) { //don't repeatedly trigger.
  float randomPos= random(0,180);//random position picker. Could be up to 360 with a continuous servo motor. 
  myPort.write(int(randomPos)+";"); //send to Arduino. Don't forget the delimiter ";"
  }
  lastFace=face; //update lastFace
}
