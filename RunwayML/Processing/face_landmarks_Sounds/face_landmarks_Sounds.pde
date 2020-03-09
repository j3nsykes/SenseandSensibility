// Copyright (C) 2019 RunwayML Examples
// 
// This file is part of RunwayML Examples.
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

// PoseNet Demo:
// Receive OSC messages from Runway
// Running PoseNet model
// original example by Joel Matthys @jwmatthys, adapted by George Profenza

/**
 USEFUL LANDMARKS: 
 {"labels":["chin_0","chin_1","chin_2","chin_3","chin_4","chin_5","chin_6","chin_7","chin_8","chin_9","chin_10","chin_11","chin_12","chin_13","chin_14","chin_15","chin_16",
 "left_eyebrow_0","left_eyebrow_1","left_eyebrow_2","left_eyebrow_3","left_eyebrow_4",
 "right_eyebrow_0","right_eyebrow_1","right_eyebrow_2","right_eyebrow_3","right_eyebrow_4"
 ,"nose_bridge_0","nose_bridge_1","nose_bridge_2","nose_bridge_3",
 "nose_tip_0","nose_tip_1","nose_tip_2","nose_tip_3","nose_tip_4",
 "left_eye_0","left_eye_1","left_eye_2","left_eye_3","left_eye_4","left_eye_5",
 "right_eye_0","right_eye_1","right_eye_2","right_eye_3","right_eye_4","right_eye_5",
 "top_lip_0","top_lip_1","top_lip_2","top_lip_3","top_lip_4","top_lip_5","top_lip_6","top_lip_7","top_lip_8","top_lip_9","top_lip_10","top_lip_11",
 "bottom_lip_0","bottom_lip_1","bottom_lip_2","bottom_lip_3","bottom_lip_4","bottom_lip_5","bottom_lip_6","bottom_lip_7","bottom_lip_8","bottom_lip_9","bottom_lip_10","bottom_lip_11"]
 
 //see here for breakdown https://www.pyimagesearch.com/2017/04/03/facial-landmarks-dlib-opencv-python/
 
 */
// import Runway library
import com.runwayml.*;
// reference to runway instance
RunwayHTTP runway;

// This array will hold all the humans detected
JSONObject data;

void setup() {
  // match sketch size to default model camera setup
  size(600, 400);
  fill(9, 130, 250);
  noStroke();
  //set up sounds
  setupSounds();
  // setup Runway
  runway = new RunwayHTTP(this);
}

void draw() {
  background(0);
  trigSounds();//sound output 
  
  // use the utiliy class to draw PoseNet parts
  if (data != null) {
    JSONArray landmarks = data.getJSONArray("points");
    JSONArray  locations=data.getJSONArray("labels");
    //printArray(locations);
    //printArray(landmarks.size());
    if (landmarks != null)
    {
      for (int k = 0; k < landmarks.size(); k++) {
        // Body parts are relative to width and weight of the input
        JSONArray point = landmarks.getJSONArray(k);
        float x = point.getFloat(0);
        float y = point.getFloat(1);

        //draw face
        beginShape();
        stroke(255);
        strokeWeight(6);
        vertex(x * width, y * height);
        endShape();


//get a specific part of the face. 
//see top reference for more details. 
        String label=locations.getString(k);
        if (label.equals("top_lip_3")) {

          //get x and y of this part. 
          float sx = point.getFloat(0);
          float sy = point.getFloat(1);
          pushMatrix();
          noStroke();
          fill(255, 0, 0);
          rectMode(CENTER);
          rect(sx * width, sy * height, 10, 10);
          popMatrix();
          
          //println(sy); //see our outputs 
          
          //do something with this point! 
          //if I open my moouth play a random note. 
          
          float pos=map(sy,1.0,0.0,0,100);
          //println("pos: "+pos);
          if(pos>=40){
          trigger=true;
          }
          else{
          trigger=false;
          }
        }
      }
    }
  }
}


// this is called when new Runway data is available
void runwayDataEvent(JSONObject runwayData) {
  // point the sketch data to the Runway incoming data 
  data = runwayData;
}
