function mqttClient(){
    const DEVIVCE_ID = '00-0001';
    var count = -1;
    var last_count = -1;
    //
    hert_interval = null;
    if("WebSocket" in window){
       
        client  = new Paho.MQTT.Client('39.105.179.248',Number(8085),"00-0001");
        client.connect({onSuccess:onConnect});
        function onConnect(){
            client.subscribe("mqtt/M2W");``
            message = new Paho.MQTT.Message('{"id": "' + DEVIVCE_ID.substring(0,2) + '","device_id": "' + DEVIVCE_ID + '"}');
            message.destinationName = "mqtt/W2M";
            client.send(message);
        }
        client.onConnectionLost =(responseObject) =>{
			if (responseObject.errorCode !== 0) {
            }
            console.log(responseObject);
		}; 
		client.onMessageArrived = (message)=> {
            var js_data = JSON.parse(message.payloadString.replace(/\'/g,"\""));
                if(js_data.keeplive){
                    last_count = js_data.keeplive;                   
                }
                if(js_data.type){ 
                    if(js_data.status == 1)     vm.status = 1;
                    else  vm.status = 0;
                }
		}; 
        function subscribe(){
			client.subscribe(topic, { qos:1});
		}
		
		function unsubscribe(){ 
			client.unsubscribe(topic);
        }
        /**
         * 设置一个定时
         * count 是检测标志位； last_count 是每次新的数据发送更新的标志位；
         *  如果 检测位 与 最后更新标志位相同
         *              说明消息没有到达；
         * 否则  
         *       消息已经到，更新一次检测位
         */
        initHeart = function initHeart(){
            if(last_count != -1){
                if(count == last_count){
                    vm.status = -1;
                    vm.light = 0;
                }else{
                    count = last_count;
                    if(vm.status == -1) {vm.status = 0;}
                     
                }
            }
        };
        hert_interval = setInterval(initHeart,5*1000);
        
    }else{
        alert("不支持，更换浏览器");
    }
}