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
// YOLO version adapted from
// COCO-SSD StreetView Demo:
// Loads a csv file exported by Runway
// Made by jpyepez
// Adapted to fit YOLO data export by Paul M.

void setUpYOLO(String _fileName, int _n) {
  yolo = new YOLO(_fileName, _n);
  isFirstFrame = true;
}

void updateYOLO() {
  yolo.display(movie.time());
}

class YOLO {

  Table YOLOTable;
  TableRow lookup;
  TableRow current;

  int maxIdx;

  YOLO(String _fileName, int maxIdx_) {
    // YOLO SSD data
    YOLOTable = loadTable(_fileName, "header");
    maxIdx = maxIdx_;
  }

  void display(float playhead) {
    // find current time marker on the table
    for ( TableRow row : YOLOTable.rows() ) {
      if (row.getFloat("time") >= playhead) {
        current = row;
        break;
      }
    }

    // parse table and draw bounding boxes
    for (int i = 0; i < maxIdx; i++) {
      if (!Float.isNaN(current.getFloat("bboxes."+i+".0"))) {
        float boxX = current.getFloat("bboxes."+i+".0");
        float boxY = current.getFloat("bboxes."+i+".1");
        float boxW = current.getFloat("bboxes."+i+".2");
        float boxH = current.getFloat("bboxes."+i+".3");
        String boxLabel = current.getString("classes."+i);
        float boxScore = current.getFloat("scores."+i);

        // draw bbox with table data
        drawBBox(boxX, boxY, boxW, boxH, boxLabel, boxScore);
      }
    }
  }

  // drawing bbox function
  void drawBBox(float x, float y, float w, float h, String label, float score) {
    strokeWeight(3);
    stroke(96, 255, 255, 200);
    fill(96, 255, 255, 32);
    rect(x*width, y*height, (w*width)-(x*width), (h*height)-(y*height));

    textSize(12);
    float textW = textWidth(label);
    fill(96, 255, 255);
    rect(x*width, y*height-g.textSize, textW, g.textSize);

    fill(0, 64, 64);
    text(label, x*width, y*height-2);
  }
}
