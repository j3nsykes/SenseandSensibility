# DIY neural  nets
These examples build on the [ML5 Neural Net](https://learn.ml5js.org/docs/#/reference/neural-network) function to generate a series of physical  computing teachable machines. 

The first two are capacitive touch input and accelerometer IMU  inputs. I will keep adding more examples as i build  them. 
Coming soon ...LDR inputs. 

## Capacitive Touch
This  example works with the [Bare Conductive Touch  Board](https://www.bareconductive.com/). Their DataStream.ino Arduino  example code has been adapted to work with webusb, connecting and communicating directly to the  browser window. 


## IMU Accelerometer 
This example currently works for the [Adafruit BNO055 9-axis sensor](https://learn.adafruit.com/adafruit-bno055-absolute-orientation-sensor/overview?fbclid=IwAR3MO_s2-lfCYAh5Uzg_BHAxJ070jfvjhLJoWIPF23j_Aa7CJkpMHr7puiM) and an [Adafruit Feather 32u4](https://learn.adafruit.com/adafruit-feather-32u4-adalogger). However, the Arduino code can  easily  be adapted for alternate sensor breakout boards and be uploaded to any  webUSB compatible Arduino  board. See the  webUSB Github page for  a  list of compatible boards. 

I'll add more/alternate accelerometer examples as I build them. Coming soon...
* [Arduino Nano 33 iot](https://store.arduino.cc/arduino-nano-33-iot) and the LSM6DS3 IMU. 
* LIS3MDL - 9 DoF IMU
* LSM6DSOX IMU
* LSM6DS33 IMU

This is also the easier of the 2 physical computing teachable machine examples to convert to alternate inputs. 


### A few prerequisites: 
* These examples only work with the **Chrome** browser
* You must  first  install the Arduino [WebUSB library](https://github.com/webusb/arduino) before being able to upload my .ino Touchboard or IMU Arduino code. This enables the automatic connection to the browser window. 
* You must train inputs for all available label options. For example; if you have labels [A,B,C,D] you must give each label some options to  train from. You  cannot leave one blank with no data inputs. If you  want less/more label outputs then comment them out or add them in. Also  check the updateClassification() function and comment out/ add in relevantt filtering code for  the display of the  result confidence. 

**TO DO:/** is to make this more flexible in the code so adding/removing isn't required. 

### Connecting Steps:
* Open the  browser window
* Press the connect button
* A pop up window appears  besides the packlock icon (top left of search tab)
* Click onthe device that appears here ***

* Select pair
* Re-run the sketch and from now on it  should automatically connect. 

*** Should you not see your  device make  sure the Arduino code is properly loaded onto the board and you are using a compatible board listed on the WebUSB github page. 
