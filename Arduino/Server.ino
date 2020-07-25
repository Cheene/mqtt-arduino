#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
bool module_flag = true;//只有当某个执行完毕之后才能执行下一个
char * ssidout = "vivoy51";
char * passout = "12345678";
const char* mqtt_server = "39.105.179.248";
const String clientId = "01-001";
WiFiClient espClient;
PubSubClient client(espClient);
ESP8266WebServer server(80);
const IPAddress sip(192, 168, 100, 29);//本地IP
const IPAddress sip1(192, 168, 100, 29);//本地网关
const IPAddress sip2(255, 255, 255, 0);//本地子网掩码
String html1 = "<!DOCTYPE html><html><head> <title></title><meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'> <meta charset='utf-8'>  <style type='text/css'> *{margin:0;padding: 0;}   body{background-color: rgb(254,254,254) ;} ul{list-style: none;width:500px;margin: 3em auto;} ul li{text-align: center;margin: 30px;} ul li label{width: 150px;display: inline-block;color: rgb(30,41,61);font-weight: bold;} ul li input{height: 30px;color:rgb(254,254,254);background-color: rgb(30,41,61);border:none;font-size: 1.2em;} ul li  button{ height: 50px;width: 150px;border-width: 0px;border-radius: 10px;outline: none;background-color: rgb(30,41,61);color:rgb(254,254,254);}</style></head><body><article><form action='/req' method='get'><ul><li><label>WIFI ID</label><input type='text' name='ssid'></li><li><label>WIFI PASSWD</label><input type='password' name='pass'></li><li><button >确定</button></li></ul></form></article></body></html>";
char buff[200];
DynamicJsonDocument  jsonBuffer(200);

int count = 0;
long lastMsg = 0;
char msg[50];

void handleRoot() {
  server.send(200, "text/html", html1);
}
void beginWifi(){
 
  WiFi.disconnect();
  if(passout == ""){
    WiFi.begin(ssidout);
    //EEPROM.write(0,ssid);
  }
  else{
    WiFi.begin(ssidout, passout);
//    EEPROM.write(0,ssid);
  //  EEPROM.write(100,passout);
  }
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  beginMqtt();
  // 存入到 EEPROM 中
  
}
void beginMqtt(){
  client.setServer(mqtt_server, 8084);//连接 mqtt服务端
  client.setCallback(callback);  //mqtt的事件响应
  
}

void module01(){
    analogWrite(1,255);
    analogWrite(2,0);
    analogWrite(3,255);
    for(int i=0;i<10;i++){
      analogWrite(1,0);
      analogWrite(2,0);
      analogWrite(3,0);
      delay(1*500);
      analogWrite(1,255);
      analogWrite(2,0);
      analogWrite(3,255);
      delay(500);
    }
    analogWrite(1,0);
    analogWrite(2,0);
    analogWrite(3,0);
}
void module02(){
  
    analogWrite(1,0);
        analogWrite(2,0);
        analogWrite(3,0);
    delay(5*1000);
    for(int i=0;i<4;i++){
      for(int i=1;i<255;i++){
        analogWrite(1,i);
        analogWrite(2,i);
        analogWrite(3,i);
        delay(5);  
      }
      for(int i=254;i>0;i--){
        analogWrite(1,i);
        analogWrite(2,i);
        analogWrite(3,i);
        delay(5);  
      }
       analogWrite(1,255);
       analogWrite(2,255);
        analogWrite(3,0);
   }
}
void module03(){
    for(int i=0;i<50;i++){
      analogWrite(1,(int)random(0,255));
      analogWrite(2,(int)random(0,255));
      analogWrite(3,(int)random(0,255));
      delay(300);
    }
  
}

void callback(char* topic, byte* payload, unsigned int length) {
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    buff[i] = (char)payload[i];
}
  /**
  主要的业务逻辑
  */
   deserializeJson(jsonBuffer,buff);
   JsonObject root = jsonBuffer.as<JsonObject>();
   const char type = root["type"];
   if(((int)type)== 0){
      analogWrite(1,root["B"]);
      analogWrite(2,root["G"]);
      analogWrite(3,root["R"]);
    }else if(((int)type)==1){
       if((int)(root["light"])==1){
          digitalWrite(1,0);
          digitalWrite(2,0);
          digitalWrite(3,0);
          client.publish("mqtt/M2W", "{'id':'00-1101','type':'1','status':'0'}");
      }else{
          digitalWrite(1,255);
          digitalWrite(2,255);
          digitalWrite(3,255);
          client.publish("mqtt/M2W", "{'id':'00-1101','type':'1','status':'1'}");
          Serial.println();
      }
    }else if(((int)type) == 2){
      if((int)(root["module"]) == 1){
        module01();
      }else if((int)(root["module"]) == 2){
        module02();
      }
      else if((int)(root["module"]) == 3){
        module03();
      }
    }
}
void reconnect() {
  while (!client.connected()) {
    if (client.connect(clientId.c_str())) {
      client.publish("mqtt/M2W", "{'id':'00-1101','type':'1','status':'0'}");
      client.subscribe("mqtt/W2M");
    } else {delay(5000);}
  }
}
void setup() {
  Serial.begin(115200);
  delay(10);
  pinMode(1,OUTPUT);
  pinMode(3,OUTPUT);
  pinMode(2,OUTPUT);
  pinMode(16,OUTPUT);
  digitalWrite(16,HIGH);
  analogWrite(1,0);
  analogWrite(2,0);
  analogWrite(3,0);
   WiFi.mode(WIFI_AP_STA);//设置模式为AP+STA
   WiFi.softAPConfig(sip,sip1,sip2);
   WiFi.softAP("SSSS");
   //beginWifi();
  Serial.println("HTTP server started");
  
  //获得EEPROM的数值，如果为没有就不进行 1 形成字节流；2 转换出来
  digitalWrite(16,LOW);
  
   //然后再进行操作
   server.on("/",handleRoot);
   server.begin();
}

void loop() {
 // server.handleClient();
  /**
    检测WIFI是否连接 如果连接成功就开始检测是否与 MQTT服务的连接
  */
  if(WiFi.status() != WL_CONNECTED){
     digitalWrite(16,HIGH);

  }else{
   if (!client.connected()) {
    reconnect();
    }
    client.loop();
    long now = millis();
    if (now - lastMsg > 5*1000) {
         lastMsg = now;
         snprintf (msg, 50, "{'id':'00-1101','keeplive':'%ld'}",count);
         client.publish("mqtt/M2W",msg);
         count++;
         if(count == 1000){count = 0;}
    } 
 }
}
