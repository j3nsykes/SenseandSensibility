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
// along with RunwayML.  If not, see <http://www.gnu.org/licenses/>.
// 
// ===========================================================================

// RUNWAYML
// www.runwayml.com

// AttnGAN Demo
// Send OSC text messages to Runway and generate images
// example based on https://github.com/runwayml/processing/blob/master/attnGAN/attnGAN.pde adapted by George Profenza

// import Runway library
import com.runwayml.*;
// reference to runway instance
RunwayHTTP runway;

// result image will be stored here
PImage runwayResult;
String words="";
char letter;
boolean send=false;

void setup() {
  size(600, 600);
  frameRate(25);
  // setup Runway
  runway = new RunwayHTTP(this);
  // don't send messages to Runway continuously
  runway.setAutoUpdate(false);
}

void draw() {
  background(0);
  if (runwayResult != null) {
    image(runwayResult, 0, 0, width, height);
  }
  textSize(14);
  text("start typing", 5, 15);

  //display your typed text
  textSize(22);
  text(words, 50, 120, 540, 300);
}

void keyTyped() {
  // The variable "key" always contains the value 
  // of the most recent key pressed.
  if ((key >= 'A' && key <= 'z') || key == ' ') {
    letter = key;
    words = words + key;
    // Write the letter to the console
    //println(key);
   
  }
  
   //ability to delete characters
  if (key==8) {
    println("delete");
    words=words.substring(0,words.length()-1);
  }
}

void keyPressed() {
  if (key == ' ') {
    String caption = words;
    if (caption != null) {
      runway.query("{ \"caption\": \""+ caption +"\"}");
    }
  }
}

// this is called when new Runway data is available
void runwayDataEvent(JSONObject runwayData) {
  // point the sketch data to the Runway incoming data 
  String base64ImageString = runwayData.getString("result");
  // try to decode the image from
  try {
    PImage result = ModelUtils.fromBase64(base64ImageString);
    if (result != null) {
      runwayResult = result;
    }
  }
  catch(Exception e) {
    e.printStackTrace();
  }
}
