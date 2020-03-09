// sourced from http://www.esologic.com/parsing-serial-data-sent-to-arduino/
//and
//adapted for comms with Processing and Wekinator.

// code to extract String of data from processing
const char EOPmarker = ';'; //This is the end of packet marker
char serialbuf[32]; //This gives the incoming serial some room. Change it if you want a longer incoming.

#include <string.h> // we'll need this for subString
#define MAX_STRING_LEN 20 // like 3 lines above, change as needed.
#include <Servo.h>
Servo myservoX, myservoY;

void setup() {

  Serial.begin(9600);
  myservoX.attach(9); //pins the servo is in 
  myservoY.attach(10);
}

void loop() {

  if (Serial.available() > 0) { //makes sure something is ready to be read
    static int bufpos = 0; //starts the buffer back at the first position in the incoming serial.read
    char inchar = Serial.read(); //assigns one byte (as serial.read()'s only input one byte at a time
    if (inchar != EOPmarker) { //if the incoming character is not the byte that is the incoming package ender
      serialbuf[bufpos] = inchar; //the buffer position in the array get assigned to the current read
      bufpos++; //once that has happend the buffer advances, doing this over and over again until the end of package marker is read.
    }

    else { //once the end of package marker has been read
      serialbuf[bufpos] = 0; //restart the buff
      bufpos = 0; //restart the position of the buff
      int valX = atoi(subStr(serialbuf, ",", 1)); // recieve the 1st variable
      int valY = atoi(subStr(serialbuf, ",", 2));
     
    //this is your output messages to the motors!!!!
      myservoX.write(valX); //send to servo
      myservoY.write(valY); //send to servo

      //could also substitute for analog or digital messages
      /*
      analogWrite(9,valX);
      analogWrite(10,valY);
      */
    }
  }
}

///IGNORE BELOW HERE

// function needed to extract the string of data from processing.
char* subStr (char* input_string, char *separator, int segment_number) {
  char *act, *sub, *ptr;
  static char copy[MAX_STRING_LEN];
  int i;
  strcpy(copy, input_string);
  for (i = 1, act = copy; i <= segment_number; i++, act = NULL) {
    sub = strtok_r(act, separator, &ptr);
    if (sub == NULL) break;
  }
  return sub;
}
