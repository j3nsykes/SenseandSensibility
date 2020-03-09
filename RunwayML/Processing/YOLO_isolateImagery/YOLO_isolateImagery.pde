/*

Adapted  Paul Maguire's CSV  read example and changed to only display labelled imagery 
*/
import processing.video.*;

Movie movie;
YOLO yolo;
boolean isFirstFrame;
float movieDuration;
boolean isPlaying;
PImage copyMov;

void setup() {
  size(1920, 1080, P2D);
  movie = new Movie(this, "esc2.mp4");
  movie.loop();
  copyMov=movie;//movie is PImage

  // The second parameter in this setUpYOLO() function is the max number of tracked entities in the CSV
  // You need to open the CSV, scroll right and check column name 'bboxes'
  // Whatever the highest number is for this in the CSV should be input here
  // TODO: automate this
  setUpYOLO("YOLO2.CSV", 18); 
  frameRate(30); // may need to match the video framerate – not tested
}

void draw() {
  background(0);
  //image(movie, 0, 0, width, height); 


  updateYOLO();

}


void movieEvent(Movie movie) {
  movie.read();
  // set playhead start: manages timings
  if (isFirstFrame) {
    isFirstFrame = false;
    isPlaying = false;
  }
}
