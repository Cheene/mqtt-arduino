
var mosca = require('mosca');
var MqttServer = new mosca.Server({
    port: 8084,
    http: {
        port: 8085,  
        bundle: true,
        static: '../'
        }
});
MqttServer.on('ready', function(){
    console.log('mqtt is running...');
});

MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
    
}); 
 
MqttServer.on('clientDisconnected', function (client) {
});

MqttServer.on('subscribed', function (topic, client) {
    console.log("Subscribed :=", topic, client.id);
});
 
MqttServer.on('unsubscribed', function (topic, client) {
    console.log('unsubscribed := ', topic, client.id);
});
 
 
 
MqttServer.on('published', function(packet, client) {
    
    if (typeof (client) == "undefined")
	return;
    else{
        //业务逻辑部分
        console.log('client ', client.id, ' publish :', 'topic ='+packet.topic+ 
        ',message = '+ packet.payload.toString());        
    }
}); 
 
 
MqttServer.on("error", function (err) {
    console.log(err);
});

exports.mqttServer = MqttServer;