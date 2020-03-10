// Copyright (C) 2019 Runway ML Examples
// 
// This file is part of Runway ML Examples.
// 
// Runway-Examples is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// Runway-Examples is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Runway.  If not, see <http://www.gnu.org/licenses/>.
// 
// ===========================================================================

// RUNWAYML
// www.runwayml.com
// original example by https://github.com/maybay21, adapted by George Profenza

//import speech
import guru.ttslib.*;
TTS tts;

// import Runway library
import com.runwayml.*;
// reference to runway instance
RunwayHTTP runway;

String textValue = "";

String text_output="In principle a work of art has always been reproducible.";

String text_input="";
JSONObject data;
JSONObject json_message;
String json_output;
String newestSentence="In principle a work of art has always been reproducible.";
int lengthString=56; //iniital sentence. 
char numLetters []= new char [lengthString];

void setup() {
  //create canvas
  size(900, 700);

  // setup Runway
  runway = new RunwayHTTP(this);
  // don't send data at the end of each frame automatically
  runway.setAutoUpdate(false);

  //create a font
  PFont font = loadFont("Avenir-Medium-32.vlw");

  textFont(font);
  tts = new TTS(); //speech
  tts.speak(text_output);
  background(0);
  fill(255);
  stroke(255);
  textAlign(LEFT);
  text(text_output, 20, 50, width-50, height);
  //how many chars in your starting  sentence. 
  println(newestSentence.length());
}

void draw() {
}
void mousePressed() {
  if (text_output != null) {

    //need to check and delete mattching returned text 
    //icheck size of inital senttence.
    //sttar new sentence from size onwards. 
    //then only send remaining new sttring 

    input(text_output); //send input text to be the last output 
    background(0);
    text(text_output, 20, 50, width-50, height);//here before it gets "substringed". 


    //only from here on in String.So it doesn't keep sending back all of the previous text  
    newestSentence= text_output.substring(lengthString);

    //println("newestSentence: "+newestSentence);
    //println(text_output.length());
    lengthString=newestSentence.length(); //update length of sentence to be that of new one.
    //println(newestSentence.length());
    text_output=newestSentence; //update text output

    tts.speak(text_output); //speak the latest output. 
  }
}


//send the text from ou interface to RunwayML
void input(String theText) {
  //create json object
  json_message = new JSONObject();

  //add the text from the textfield and seed
  json_message.setString("prompt", theText);
  json_message.setInt("seed", 1);
  print(json_message);
  json_output = json_message.toString();

  //send the message to RunwayML
  runway.query(json_output);
}

// this is called when new Runway data is available
void runwayDataEvent(JSONObject runwayData) {
  // point the sketch data to the Runway incoming data 
  data = runwayData;
  //get the value of the "text" key
  text_output = data.getString("generated_text");
}
