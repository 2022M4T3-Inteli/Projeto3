#include <WiFi.h>
#include <string>
#include <HTTPClient.h>
#include <SparkFun_MMA8452Q.h>
#include <Wire.h>
#include <iostream>
#include <ArduinoJson.h>
using namespace std;
#define ACE_SDA 4
#define ACE_SCL 5
MMA8452Q acelerometro(0x1C);
int led = 9;
int buzzer = 6;
bool movimento = 0;
bool activated = 0;
int last_x = 0;
int last_y = 0;
int last_z = 0;
int x = 0;
int y = 0;
int counter = 0;
int rst = 36;
const char* SSIDS[4] = { "Inteli-COLLEGE", "beacon1", "beacon2", "beacon3" };
const char* PWD[4] = { "QazWsx@123", "beacon123", "beacon123", "beacon123" };
const char* serverName = "http://10.128.0.249:8000/api/tags";
unsigned long lastTime = 0;
unsigned long timerDelay = 2000;
//Variável para medir a distância
int distances[3] = { 0, 0, 0 };
int indice = 0;
// Definições para o FTM
const uint8_t FTM_FRAME_COUNT = 16;   // Number of FTM frames requested in terms of 4 or 8 bursts (allowed values - 0 (No pref), 16, 24, 32, 64)
const uint16_t FTM_BURST_PERIOD = 2;  // Requested time period between consecutive FTM bursts in 100’s of milliseconds (allowed values - 0 (No pref) or 2-255)
xSemaphoreHandle ftmSemaphore;        // Semaphore to signal when FTM Report has been received
bool ftmSuccess = true;               // Status of the received FTM Report
#define NB_APS 3
#define MAX_PONTOS 10
#define DIST_PONTO_A1y 8
#define DIST_PONTO_A3x 13
// class Ponto {
// private:
//   float coordX = 0;
//   float coordY = 0;
// public:
//   Ponto(float x, float y) {
//     coordX = x;
//     coordY = y;
//   };
//   Ponto(){};  // Construtor vazio por requisição do compilador
//   void put(float x, float y) {
//     coordX = x;
//     coordY = y;
//   };
//   float x() {
//     return coordX;
//   };
//   float y() {
//     return coordY;
//   };
// };
void postDataToServer() {
  if (activated == 1) {
    digitalWrite(led, HIGH);
    tone(buzzer, 845, 40);
    delay(300);
    digitalWrite(led, LOW);
    noTone(buzzer);
  }
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    StaticJsonDocument<200> doc;
    doc["macAddress"] = String(WiFi.macAddress());
    doc["isMoving"] = String(movimento);
    JsonArray json = doc.createNestedArray("distances");
    json.add(distances[0]);
    json.add(distances[1]);
    json.add(distances[2]);
    // json.add(5);
    // json.add(4);
    // json.add(distances[2]);
    String requestBody;
    serializeJson(doc, requestBody);
    int httpResponseCode = http.POST(requestBody);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      Serial.print("HTTP Response Body: ");
      Serial.println(response);
      deserializeJson(doc, response);
      activated = int(doc["activated"]);
      Serial.print("resposta activated: ");
      Serial.println(activated);
      counter += 1;
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
  delay(1500);
}
void DadosConexao() {
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("Subnet Mask: ");
  Serial.println(WiFi.subnetMask());
  Serial.println("Gateway IP: ");
  Serial.println(WiFi.gatewayIP());
  Serial.println("DNS IP: ");
  Serial.println(WiFi.dnsIP());
  Serial.println("BroadCast: ");
  Serial.println(WiFi.broadcastIP());
  Serial.println("MAC address: ");
  Serial.println(WiFi.macAddress());
  Serial.println("Network ID: ");
  Serial.println(WiFi.networkID());
  Serial.println("PSK: ");
  Serial.println(WiFi.psk());
  Serial.println("BSSID: ");
  Serial.println(WiFi.BSSIDstr());
  Serial.println("RSSI: ");
  Serial.println(WiFi.RSSI());
}
void onFtmReport(arduino_event_t* event) {
  const char* status_str[5] = { "SUCCESS", "UNSUPPORTED", "CONF_REJECTED", "NO_RESPONSE", "FAIL" };
  wifi_event_ftm_report_t* report1 = &event->event_info.wifi_ftm_report;
  wifi_event_ftm_report_t* report2 = &event->event_info.wifi_ftm_report;
  wifi_event_ftm_report_t* report3 = &event->event_info.wifi_ftm_report;
  ftmSuccess = report1->status | report2->status | report3->status == FTM_STATUS_SUCCESS ;
  if (ftmSuccess) {
    switch (indice) {
      case 0:
        distances[indice] = (float)(report1->dist_est - 4000) / 100;
        Serial.printf("FTM Estimate: Distance RAW: %.4f,Distance: %.4f m, Return Time: %u ns\n", (float)report1->dist_est, (float)(report1->dist_est - 4000) / 100, report1->rtt_est);
        break;
      case 1:
        distances[indice] = (float)(report2->dist_est - 4000) / 100;
        Serial.printf("FTM Estimate: Distance RAW: %.4f,Distance: %.4f m, Return Time: %u ns\n", (float)report2->dist_est, (float)(report2->dist_est - 4000) / 100, report2->rtt_est);
        break;
      case 2:
        distances[indice] = (float)(report3->dist_est - 4000) / 100;
        Serial.printf("FTM Estimate: Distance RAW: %.4f,Distance: %.4f m, Return Time: %u ns\n", (float)report3->dist_est, (float)(report3->dist_est - 4000) / 100, report3->rtt_est);
        break;
    }
    // free(report1->ftm_report_data);
  } else {
    Serial.print("FTM Error: ");
    // Serial.println(status_str[report->status]);
  }
  xSemaphoreGive(ftmSemaphore);
}
bool getFtmReport() {
  if (!WiFi.initiateFTM(FTM_FRAME_COUNT, FTM_BURST_PERIOD)) {
    Serial.println("FTM Error: Initiate Session Failed");
    return false;
  }
  return xSemaphoreTake(ftmSemaphore, portMAX_DELAY) == pdPASS && ftmSuccess;
}
// int menu() {
//   Serial.println(F("1 - Conectar nos 3 beacons e medir a triagulação  \n"));
//   while (!Serial.available()) {};
//   int op = (int)Serial.read();
//   while (Serial.available()) {
//     if (Serial.read() == '\n') break;
//     Serial.read();
//   }
//   return (op - 48);  //do valor lido, subtraimos o 48 que é o ZERO da tabela ascii
// }
void Conectar(int rede) {
  Serial.println("Conectando na rede: ");
  WiFi.begin(SSIDS[0], PWD[0]);
  while (WiFi.status() != WL_CONNECTED) {
    // if (activated == 1) {
    //   // Serial.println(activated);
    //   digitalWrite(led, HIGH);
    //   tone(buzzer, 845, 40);
    //   delay(300);
    //   digitalWrite(led, LOW);
    //   noTone(buzzer);
    // }
    Serial.print(".");
    WiFi.disconnect();
    delay(1000);
    WiFi.reconnect();
    delay(1000);
  }
  Serial.println("WiFi connected");
  postDataToServer();
}
void MedirDistancia(int rede) {
  if (activated == 1) {
    digitalWrite(led, HIGH);
    tone(buzzer, 845, 40);
    delay(300);
    digitalWrite(led, LOW);
    noTone(buzzer);
  }
  ftmSemaphore = xSemaphoreCreateBinary();
  WiFi.onEvent(onFtmReport, ARDUINO_EVENT_WIFI_FTM_REPORT);
  Serial.println("Connecting to FTM Responder");
  WiFi.begin(SSIDS[rede], PWD[rede]);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    WiFi.disconnect();
    delay(1000);
    WiFi.reconnect();
    delay(1000);
  }
  Serial.println("");
  Serial.println("WiFi Connected");
  Serial.print("Initiating FTM session with Frame Count ");
  Serial.print(FTM_FRAME_COUNT);
  Serial.print(" and Burst Period ");
  Serial.print(FTM_BURST_PERIOD * 100);
  Serial.println(" ms");
  getFtmReport();
}
void readyToReset(){
  if (counter == 3){
    counter = 0;
    digitalWrite(36, LOW);
  }
}
void setup() {
  Serial.begin(115200);
  acelerometro.init();
  pinMode(led, OUTPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(rst, OUTPUT);
  digitalWrite(36, HIGH);
  digitalWrite(led, LOW);
  WiFi.mode(WIFI_STA);
}
void loop() {
  Serial.print("Activated: ");
  Serial.println(activated);
  if (activated == 1) {
    digitalWrite(led, HIGH);
    tone(buzzer, 845, 40);
    delay(300);
    digitalWrite(led, LOW);
    noTone(buzzer);
  }
  acelerometro.read();
  int new_x = acelerometro.x;
  int new_y = acelerometro.y;
  int new_z = acelerometro.z;
  if (abs(last_x - new_x) > 150 || abs(last_y - new_y) > 150 || abs(last_z - new_z) > 150) {
    movimento = 1;
    last_x = new_x;
    last_y = new_y;
    last_z = new_z;
  } else {
    movimento = 0;
  }
  for (int i = 1; i < 4; i++) {
    indice = i - 1;
    MedirDistancia(i);
  }
  Conectar(0);
  Serial.println("Dados enviados para o Backend");
  readyToReset();
}
