#include <WiFi.h>
#include <string>
#include <HTTPClient.h>
#include <SparkFun_MMA8452Q.h>
#include <Wire.h>
#include <iostream>
// #include <Arduino_JSON.h>
#include <ArduinoJson.h>
// #include <WiFiMulti.h>
​
using namespace std;
#define ACE_SDA 4
#define ACE_SCL 5
MMA8452Q acelerometro(0x1C);
​
// // internet/wifi config
// const char* ssid = "Inteli-COLLEGE";
// const char* password = "QazWsx@123";
​
// internet/wifi config
const char* ssid = "SHARE-RESIDENTE";
const char* password = "Share@residente";
​
//server routes
const char* updateRoute = "http://10.254.18.157:8000/api/v1/update";
​
​
// time interval 5 seconds (5000)
unsigned long lastTime = 0;
unsigned long timerDelay = 2000;
​
int x = 0;
int y = 0;
int z = 0;
​
int activated = 0;
int led = 9;
int buzzer = 6;
​
bool movimento = 0;  //1=TRUE, 0=FALSE
​
void setup() {
  Wire.begin(ACE_SDA, ACE_SCL);
  acelerometro.init();
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  pinMode(led, OUTPUT);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println(acelerometro.x);
}
void loop() {
​
  if (activated == 1) {
    digitalWrite(led, HIGH);
    tone(buzzer, 845, 40);
    delay(300);
    digitalWrite(led, LOW);
    noTone(buzzer);
    delay(2500);
  }
​
​
  if ((millis() - lastTime) > timerDelay) {
    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(updateRoute);
      http.addHeader("Content-Type", "application/json");
      // http.addHeader("Content-Type", "text/plain");
      //String httpRequestData = "api_key=tPmAT5Ab3j7F9&sensor=BME280&value1=24.25&value2=49.54&value3=1005.14";
      //http.addHeader("Connection", "keep-alive");
​
      acelerometro.read();
      int new_x = acelerometro.x;
      int new_y = acelerometro.y;
      int new_z = acelerometro.z;
​
      if (abs(x - new_x) > 150 || abs(y - new_y) > 150 || abs(z - new_z) > 150) {
        movimento = 1;
        x = new_x;
        y = new_y;
        z = new_z;
      } else {
        movimento = 0;
      }
​
      // Envio de dados do acelerometro para o servidor em JSON
      StaticJsonDocument<200> doc;
      doc["acelerationX"] = String(new_x);
      doc["acelerationY"] = String(new_y);
      doc["acelerationZ"] = String(new_z);
      doc["isMooving"] = String(movimento);
​
      String requestBody;
      serializeJson(doc, requestBody);
​
      // int httpResponseCode = http.POST("{\"sensor\":\"ACCEL-MMA845X\",\"value1\":\"24.25\",\"value2\":\"49.54\",\"value3\":\"1005.14\"}");
​
      int httpResponseCode = http.POST(requestBody);
​
​
      if (httpResponseCode > 0) {
        String response = http.getString();
​
​
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        Serial.print("HTTP Response Body: ");
        Serial.println(response);
        // The above line is equivalent to:
        // JsonObject jso n= doc.as<JsonObject>();
        // JsonObject json = response;
        deserializeJson(doc, response);
        // const char* json = doc["activated"];
        // Serial.println(json);
        activated = int(doc["activated"]);
        Serial.println(activated);
​
        // activated = doc["activated"];
      }
      // Free resources
      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
