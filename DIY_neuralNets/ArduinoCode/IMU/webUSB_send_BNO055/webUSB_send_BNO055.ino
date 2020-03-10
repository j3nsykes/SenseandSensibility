#include <WebUSB.h>

/**
   Creating an instance of WebUSBSerial will add an additional USB interface to
   the device that is marked as vendor-specific (rather than USB CDC-ACM) and
   is therefore accessible to the browser.

   The URL here provides a hint to the browser about what page the user should
   navigate to to interact with the device.
*/


#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
#include <utility/imumaths.h>

WebUSB WebUSBSerial(1 /* https:// */, "editor.p5js.org/jen_GSA/sketches/_UTpiD3sM");

#define Serial WebUSBSerial

/* Set the delay between fresh samples */
#define BNO055_SAMPLERATE_DELAY_MS (100)

Adafruit_BNO055 bno = Adafruit_BNO055(55);

void setup() {
  while (!Serial) {
    ;
  }
  Serial.begin(9600);
  Serial.write("Sketch begins.\r\n");
  Serial.flush();

  //Serial.println("Orientation Sensor Test"); Serial.println("");

  /* Initialise the sensor */
  if (!bno.begin())
  {
    /* There was a problem detecting the BNO055 ... check your connections */
    //Serial.print("Ooops, no BNO055 detected ... Check your wiring or I2C ADDR!");
    while (1);
  }
  delay(1000);

pinMode(13,OUTPUT);
digitalWrite(13,HIGH);
  bno.setExtCrystalUse(true);
}

void loop() {
  /* Get a new sensor event */
  sensors_event_t event;
  bno.getEvent(&event);

  String json;
  json = "{\"tX\":";
  json = json + event.orientation.x;
  json = json + ";\"tY\":";
  json = json + event.orientation.y;
  json = json + ";\"tZ\":";
  json = json + event.orientation.z;
  json = json + "}";

  Serial.println(json);
  Serial.flush();


    /* Wait the specified delay before requesting nex data */
  delay(BNO055_SAMPLERATE_DELAY_MS);


}
