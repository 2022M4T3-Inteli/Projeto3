long duration, cm, in;
#define botao 36

int buttonActive = 2;
int buttonDesactive = 1;
int actived = 0;
int led = 5;
int buzzer = 6;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(17, INPUT);
  pinMode(9, OUTPUT);
  pinMode(12, INPUT);
  pinMode(15, OUTPUT);
  pinMode(2, INPUT_PULLUP);

  pinMode(buttonActive, INPUT_PULLUP);
  pinMode(buttonDesactive, INPUT_PULLUP);
  pinMode(led, OUTPUT);
  pinMode(buzzer, OUTPUT);
}
void loop() {
  if (digitalRead(buttonActive) == LOW) {
    actived = 1;
    Serial.println(actived);
  }

  if (digitalRead(buttonDesactive) == LOW) {
    actived = 0;
    Serial.println(actived);
  }

  if (actived == 1) {
    digitalWrite(led, HIGH);
    tone(buzzer, 845, 40);
    delay(300);
    digitalWrite(led, LOW);
    noTone(buzzer);
    delay(2500);
  }

  if (digitalRead(2) == LOW) {
    digitalWrite(15, HIGH);
  } else {
    digitalWrite(15, LOW);
  }
  if (duration < 500) {
    digitalWrite(6, HIGH);
    digitalWrite(15, HIGH);
  } else {
    digitalWrite(6, LOW);
    digitalWrite(15, LOW);
  }
  digitalWrite(9, LOW);
  delayMicroseconds(5);
  digitalWrite(9, HIGH);
  delayMicroseconds(10);
  digitalWrite(9, LOW);
  duration = pulseIn(12, HIGH);
  Serial.println(digitalRead(2));
  delay(100);
}
