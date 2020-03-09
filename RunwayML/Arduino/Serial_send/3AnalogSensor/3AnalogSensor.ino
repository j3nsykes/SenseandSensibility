
  
float X, Y, Z;
 
void setup() {
  Serial.begin(9600);

}
 
void loop() {
  X = analogRead(A0);
  Y = analogRead(A1);
  Z = analogRead(A2);
 
  Serial.print(X);
  Serial.print(",");
  Serial.print(Y);
  Serial.print(",");
  Serial.println(Z);
 
  delay(100);
}
