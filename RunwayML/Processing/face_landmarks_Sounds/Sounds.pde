import processing.sound.*;

SoundFile[] file;

// Define the number of samples 
int numsounds = 5;

// Create an array of values which represent the octaves. 1.0 is playback at normal speed, 0.5 is half and 
// therefore one octave down. 2.0 is double so one octave up.
float[] octave = {0.25, 0.5, 1.0, 2.0, 4.0};

// The playSound array is defining how many samples will be played at each trigger event
int[] playSound = {1, 1, 1, 1, 1};
boolean trigger=false;
boolean lastTrig=true;

void setupSounds() {
  // Create an array of empty soundfiles
  file = new SoundFile[numsounds];

  // Load 5 soundfiles from a folder in a for loop. By naming the files 1., 2., 3., n.aif it is easy to iterate
  // through the folder and load all files in one line of code.
  for (int i = 0; i < numsounds; i++) {
    file[i] = new SoundFile(this, (i+1) + ".aif");
  }
}


void trigSounds() {
if(trigger!=lastTrig){
  if(trigger){
  for (int i = 0; i < numsounds; i++) {      
    // Check which indexes are 1 and 0.
    if (playSound[i] == 1) {
      float rate;


      // Choose a random index of the octave array
      rate = octave[int(random(0, 5))];
      // Play the soundfile from the array with the respective rate and loop set to false
      file[i].play(rate, 1.0);
    }

    // Renew the indexes of playSound so that at the next event the order is different and randomized.
    playSound[i] = int(random(0, 2));
  }
  }
}

lastTrig=trigger;
  
}
