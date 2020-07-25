window.onload = function(){
    //请求发送 使用 HTML5 自带的 Socket，以 TCP 的方式进行连接，优势在于仅仅需要开始握手，不需要再次请求
    DEVIVCE_ID = '00-0001';
    var curr_theme = 0;//主题默认不显示
    //1 点击 WIFI按钮 2 获取输入框 3 输入框（① 设置 margin;设置 display）
    

    vm = new Vue({
        el:'#app',
        data:{
            light: 0, // light 表示灯的开或者关
            lightSheets:['on','off'],
            lightGrays:['gray-off','gray-offlight','gray-onlight'],
            status: -1,
            colorR: 255,
            colorG: 255,
            colorB:204,
            hex :'#eeeeee',
            showColorStyle:{background:"#003366"},
            hexPosition:{top: '-200px',left: '54px','visibility':'visible'},
            arrcolor:[
                {id:'#003366', coords:'63,0,72,4,72,15,63,19,54,15,54,4', top:-200, left:54},
                {id:'#336699', coords:'81,0,90,4,90,15,81,19,72,15,72,4', top:-200, left:72},
                {id:'#3366CC', coords:'99,0,108,4,108,15,99,19,90,15,90,4', top:-200, left:90},
                {id:'#003399', coords:'117,0,126,4,126,15,117,19,108,15,108,4', top:-200, left:108},
                {id:'#000099', coords:'135,0,144,4,144,15,135,19,126,15,126,4', top:-200, left:126},
                {id:'#0000CC', coords:'153,0,162,4,162,15,153,19,144,15,144,4', top:-200, left:144},
                {id:'#000066', coords:'171,0,180,4,180,15,171,19,162,15,162,4', top:-200, left:162},
                {id:'#006666', coords:'54,15,63,19,63,30,54,34,45,30,45,19', top:-185, left:45},
                {id:'#006699', coords:'72,15,81,19,81,30,72,34,63,30,63,19', top:-185, left:63},
                {id:'#0099CC', coords:'90,15,99,19,99,30,90,34,81,30,81,19', top:-185, left:81},
                {id:'#0066CC', coords:'108,15,117,19,117,30,108,34,99,30,99,19', top:-185, left:99},
                {id:'#0033CC', coords:'126,15,135,19,135,30,126,34,117,30,117,19', top:-185, left:117},
                {id:'#0000FF', coords:'144,15,153,19,153,30,144,34,135,30,135,19', top:-185, left:135},
                {id:'#3333FF', coords:'162,15,171,19,171,30,162,34,153,30,153,19', top:-185, left:153},
                {id:'#333399', coords:'180,15,189,19,189,30,180,34,171,30,171,19', top:-185, left:171},
                {id:'#669999', coords:'45,30,54,34,54,45,45,49,36,45,36,34', top:-170, left:36},
                {id:'#009999', coords:'63,30,72,34,72,45,63,49,54,45,54,34', top:-170, left:54},
                {id:'#33CCCC', coords:'81,30,90,34,90,45,81,49,72,45,72,34', top:-170, left:72},
                {id:'#00CCFF', coords:'99,30,108,34,108,45,99,49,90,45,90,34', top:-170, left:90},
                {id:'#0099FF', coords:'117,30,126,34,126,45,117,49,108,45,108,34', top:-170, left:108},
                {id:'#0066FF', coords:'135,30,144,34,144,45,135,49,126,45,126,34', top:-170, left:126},
                {id:'#3366FF', coords:'153,30,162,34,162,45,153,49,144,45,144,34', top:-170, left:144},
                {id:'#3333CC', coords:'171,30,180,34,180,45,171,49,162,45,162,34', top:-170, left:162},
                {id:'#666699', coords:'189,30,198,34,198,45,189,49,180,45,180,34', top:-170, left:180},
                {id:'#339966', coords:'36,45,45,49,45,60,36,64,27,60,27,49', top:-155, left:27},
                {id:'#00CC99', coords:'54,45,63,49,63,60,54,64,45,60,45,49', top:-155, left:45},
                {id:'#00FFCC', coords:'72,45,81,49,81,60,72,64,63,60,63,49', top:-155, left:63},
                {id:'#00FFFF', coords:'90,45,99,49,99,60,90,64,81,60,81,49', top:-155, left:81},
                {id:'#33CCFF', coords:'108,45,117,49,117,60,108,64,99,60,99,49', top:-155, left:99},
                {id:'#3399FF', coords:'126,45,135,49,135,60,126,64,117,60,117,49', top:-155, left:117},
                {id:'#6699FF', coords:'144,45,153,49,153,60,144,64,135,60,135,49', top:-155, left:135},
                {id:'#6666FF', coords:'162,45,171,49,171,60,162,64,153,60,153,49', top:-155, left:153},
                {id:'#6600FF', coords:'180,45,189,49,189,60,180,64,171,60,171,49', top:-155, left:171},
                {id:'#6600CC', coords:'198,45,207,49,207,60,198,64,189,60,189,49', top:-155, left:189},
                {id:'#339933', coords:'27,60,36,64,36,75,27,79,18,75,18,64', top:-140, left:18},
                {id:'#00CC66', coords:'45,60,54,64,54,75,45,79,36,75,36,64', top:-140, left:36},
                {id:'#00FF99', coords:'63,60,72,64,72,75,63,79,54,75,54,64', top:-140, left:54},
                {id:'#66FFCC', coords:'81,60,90,64,90,75,81,79,72,75,72,64', top:-140, left:72},
                {id:'#66FFFF', coords:'99,60,108,64,108,75,99,79,90,75,90,64', top:-140, left:90},
                {id:'#66CCFF', coords:'117,60,126,64,126,75,117,79,108,75,108,64', top:-140, left:108},
                {id:'#99CCFF', coords:'135,60,144,64,144,75,135,79,126,75,126,64', top:-140, left:126},
                {id:'#9999FF', coords:'153,60,162,64,162,75,153,79,144,75,144,64', top:-140, left:144},
                {id:'#9966FF', coords:'171,60,180,64,180,75,171,79,162,75,162,64', top:-140, left:162},
                {id:'#9933FF', coords:'189,60,198,64,198,75,189,79,180,75,180,64', top:-140, left:180},
                {id:'#9900FF', coords:'207,60,216,64,216,75,207,79,198,75,198,64', top:-140, left:198},
                {id:'#006600', coords:'18,75,27,79,27,90,18,94,9,90,9,79', top:-125, left:9},
                {id:'#00CC00', coords:'36,75,45,79,45,90,36,94,27,90,27,79', top:-125, left:27},
                {id:'#00FF00', coords:'54,75,63,79,63,90,54,94,45,90,45,79', top:-125, left:45},
                {id:'#66FF99', coords:'72,75,81,79,81,90,72,94,63,90,63,79', top:-125, left:63},
                {id:'#99FFCC', coords:'90,75,99,79,99,90,90,94,81,90,81,79', top:-125, left:81},
                {id:'#CCFFFF', coords:'108,75,117,79,117,90,108,94,99,90,99,79', top:-125, left:99},
                {id:'#CCCCFF', coords:'126,75,135,79,135,90,126,94,117,90,117,79', top:-125, left:117},
                {id:'#CC99FF', coords:'144,75,153,79,153,90,144,94,135,90,135,79', top:-125, left:135},
                {id:'#CC66FF', coords:'162,75,171,79,171,90,162,94,153,90,153,79', top:-125, left:153},
                {id:'#CC33FF', coords:'180,75,189,79,189,90,180,94,171,90,171,79', top:-125, left:171},
                {id:'#CC00FF', coords:'198,75,207,79,207,90,198,94,189,90,189,79', top:-125, left:189},
                {id:'#9900CC', coords:'216,75,225,79,225,90,216,94,207,90,207,79', top:-125, left:207},
                {id:'#003300', coords:'9,90,18,94,18,105,9,109,0,105,0,94', top:-110, left:0},
                {id:'#009933', coords:'27,90,36,94,36,105,27,109,18,105,18,94', top:-110, left:18},
                {id:'#33CC33', coords:'45,90,54,94,54,105,45,109,36,105,36,94', top:-110, left:36},
                {id:'#66FF66', coords:'63,90,72,94,72,105,63,109,54,105,54,94', top:-110, left:54},
                {id:'#99FF99', coords:'81,90,90,94,90,105,81,109,72,105,72,94', top:-110, left:72},
                {id:'#CCFFCC', coords:'99,90,108,94,108,105,99,109,90,105,90,94', top:-110, left:90},
                {id:'#FFFFFF', coords:'117,90,126,94,126,105,117,109,108,105,108,94', top:-110, left:108},
                {id:'#FFCCFF', coords:'135,90,144,94,144,105,135,109,126,105,126,94', top:-110, left:126},
                {id:'#FF99FF', coords:'153,90,162,94,162,105,153,109,144,105,144,94', top:-110, left:144},
                {id:'#FF66FF', coords:'171,90,180,94,180,105,171,109,162,105,162,94', top:-110, left:162},
                {id:'#FF00FF', coords:'189,90,198,94,198,105,189,109,180,105,180,94', top:-110, left:180},
                {id:'#CC00CC', coords:'207,90,216,94,216,105,207,109,198,105,198,94', top:-110, left:198},
                {id:'#660066', coords:'225,90,234,94,234,105,225,109,216,105,216,94', top:-110, left:216},
                {id:'#336600', coords:'18,105,27,109,27,120,18,124,9,120,9,109', top:-95, left:9},
                {id:'#009900', coords:'36,105,45,109,45,120,36,124,27,120,27,109', top:-95, left:27},
                {id:'#66FF33', coords:'54,105,63,109,63,120,54,124,45,120,45,109', top:-95, left:45},
                {id:'#99FF66', coords:'72,105,81,109,81,120,72,124,63,120,63,109', top:-95, left:63},
                {id:'#CCFF99', coords:'90,105,99,109,99,120,90,124,81,120,81,109', top:-95, left:81},
                {id:'#FFFFCC', coords:'108,105,117,109,117,120,108,124,99,120,99,109', top:-95, left:99},
                {id:'#FFCCCC', coords:'126,105,135,109,135,120,126,124,117,120,117,109', top:-95, left:117},
                {id:'#FF99CC', coords:'144,105,153,109,153,120,144,124,135,120,135,109', top:-95, left:135},
                {id:'#FF66CC', coords:'162,105,171,109,171,120,162,124,153,120,153,109', top:-95, left:153},
                {id:'#FF33CC', coords:'180,105,189,109,189,120,180,124,171,120,171,109', top:-95, left:171},
                {id:'#CC0099', coords:'198,105,207,109,207,120,198,124,189,120,189,109', top:-95, left:189},
                {id:'#993399', coords:'216,105,225,109,225,120,216,124,207,120,207,109', top:-95, left:207},
                {id:'#333300', coords:'27,120,36,124,36,135,27,139,18,135,18,124', top:-80, left:18},
                {id:'#669900', coords:'45,120,54,124,54,135,45,139,36,135,36,124', top:-80, left:36},
                {id:'#99FF33', coords:'63,120,72,124,72,135,63,139,54,135,54,124', top:-80, left:54},
                {id:'#CCFF66', coords:'81,120,90,124,90,135,81,139,72,135,72,124', top:-80, left:72},
                {id:'#FFFF99', coords:'99,120,108,124,108,135,99,139,90,135,90,124', top:-80, left:90},
                {id:'#FFCC99', coords:'117,120,126,124,126,135,117,139,108,135,108,124', top:-80, left:108},
                {id:'#FF9999', coords:'135,120,144,124,144,135,135,139,126,135,126,124', top:-80, left:126},
                {id:'#FF6699', coords:'153,120,162,124,162,135,153,139,144,135,144,124', top:-80, left:144},
                {id:'#FF3399', coords:'171,120,180,124,180,135,171,139,162,135,162,124', top:-80, left:162},
                {id:'#CC3399', coords:'189,120,198,124,198,135,189,139,180,135,180,124', top:-80, left:180},
                {id:'#990099', coords:'207,120,216,124,216,135,207,139,198,135,198,124', top:-80, left:198},
                {id:'#666633', coords:'36,135,45,139,45,150,36,154,27,150,27,139', top:-65, left:27},
                {id:'#99CC00', coords:'54,135,63,139,63,150,54,154,45,150,45,139', top:-65, left:45},
                {id:'#CCFF33', coords:'72,135,81,139,81,150,72,154,63,150,63,139', top:-65, left:63},
                {id:'#FFFF66', coords:'90,135,99,139,99,150,90,154,81,150,81,139', top:-65, left:81},
                {id:'#FFCC66', coords:'108,135,117,139,117,150,108,154,99,150,99,139', top:-65, left:99},
                {id:'#FF9966', coords:'126,135,135,139,135,150,126,154,117,150,117,139', top:-65, left:117},
                {id:'#FF6666', coords:'144,135,153,139,153,150,144,154,135,150,135,139', top:-65, left:135},
                {id:'#FF0066', coords:'162,135,171,139,171,150,162,154,153,150,153,139', top:-65, left:153},
                {id:'#CC6699', coords:'180,135,189,139,189,150,180,154,171,150,171,139', top:-65, left:171},
                {id:'#993366', coords:'198,135,207,139,207,150,198,154,189,150,189,139', top:-65, left:189},
                {id:'#999966', coords:'45,150,54,154,54,165,45,169,36,165,36,154', top:-50, left:36},
                {id:'#CCCC00', coords:'63,150,72,154,72,165,63,169,54,165,54,154', top:-50, left:54},
                {id:'#FFFF00', coords:'81,150,90,154,90,165,81,169,72,165,72,154', top:-50, left:72},
                {id:'#FFCC00', coords:'99,150,108,154,108,165,99,169,90,165,90,154', top:-50, left:90},
                {id:'#FF9933', coords:'117,150,126,154,126,165,117,169,108,165,108,154', top:-50, left:108},
                {id:'#FF6600', coords:'135,150,144,154,144,165,135,169,126,165,126,154', top:-50, left:126},
                {id:'#FF5050', coords:'153,150,162,154,162,165,153,169,144,165,144,154', top:-50, left:144},
                {id:'#CC0066', coords:'171,150,180,154,180,165,171,169,162,165,162,154', top:-50, left:162},
                {id:'#660033', coords:'189,150,198,154,198,165,189,169,180,165,180,154', top:-50, left:180},
                {id:'#996633', coords:'54,165,63,169,63,180,54,184,45,180,45,169', top:-35, left:45},
                {id:'#CC9900', coords:'72,165,81,169,81,180,72,184,63,180,63,169', top:-35, left:63},
                {id:'#FF9900', coords:'90,165,99,169,99,180,90,184,81,180,81,169', top:-35, left:81},
                {id:'#CC6600', coords:'108,165,117,169,117,180,108,184,99,180,99,169', top:-35, left:99},
                {id:'#FF3300', coords:'126,165,135,169,135,180,126,184,117,180,117,169', top:-35, left:117},
                {id:'#FF0000', coords:'144,165,153,169,153,180,144,184,135,180,135,169', top:-35, left:135},
                {id:'#CC0000', coords:'162,165,171,169,171,180,162,184,153,180,153,169', top:-35, left:153},
                {id:'#990033', coords:'180,165,189,169,189,180,180,184,171,180,171,169', top:-35, left:171},
                {id:'#663300', coords:'63,180,72,184,72,195,63,199,54,195,54,184', top:-20, left:54},
                {id:'#996600', coords:'81,180,90,184,90,195,81,199,72,195,72,184', top:-20, left:72},
                {id:'#CC3300', coords:'99,180,108,184,108,195,99,199,90,195,90,184', top:-20, left:90},
                {id:'#993300', coords:'117,180,126,184,126,195,117,199,108,195,108,184', top:-20, left:108},
                {id:'#990000', coords:'135,180,144,184,144,195,135,199,126,195,126,184', top:-20, left:126},
                {id:'#800000', coords:'153,180,162,184,162,195,153,199,144,195,144,184', top:-20, left:144},
                {id:'#993333', coords:'171,180,180,184,180,195,171,199,162,195,162,184', top:-20, left:162}
            ]
        },
        methods: {
            hexToRgb: function(hex){// 十六进制转十进制
                this.colorR = parseInt(hex.substring(1,3),16);
                this.colorG = parseInt(hex.substring(3,5),16);
                this.colorB = parseInt(hex.substring(5,7),16);
            },
            changgeLight: function(el){ // 检测灯的状态并且向后台发送数据
                message = new Paho.MQTT.Message('{"id":"01","type":"1","light":"' + this.light+'"}');
                message.destinationName = "mqtt/W2M";
                client.send(message);
                this.light = (this.light == 0)? 1: 0;
            },
            /**
             * 颜色点击事件： 1 设置属性的数值;2 设置 六边形的位置; 3 重新渲染到前端页面 4 向后台发送数据
             */
            clickColor: function(hex,key){
                this.hexToRgb(hex);
                this.hex = hex;
                this.hexPosition.top = this.arrcolor[key].top + 'px';
                this.hexPosition.left = this.arrcolor[key].left + 'px';
                this.showColorStyle.background = hex;
                this.sendColor();

            },
            /*请求发送颜色事件 同时检测是否灯亮   */
            sendColor: function(){
                
                if(this.status == 1){//只有灯亮的时候才能发送
                    message = new Paho.MQTT.Message('{"id": "02","type":"0","R":"' + this.colorR +'","G": "' + this.colorG + '","B": "' + this.colorB + '" }');
                    message.destinationName = "mqtt/W2M";
                    client.send(message);
                }
            },
            /**三种模式事件 */
            sendModel:function(index){
                function sendModelMessage(){
                    message = new Paho.MQTT.Message('{"id": "02","type":"2","module":"'+ index +'"}');
                    message.destinationName = "mqtt/W2M";
                    client.send(message);
                }
                if(this.status != -1){
                    if((this.status === 1) && index == 1){
                        sendModelMessage();
                        clearInterval(hert_interval);
                        setTimeout(()=>{
                            hert_interval = setInterval(initHeart,5*1000);this.light=0;this.status = 0;
                        },11*1000);
                    }else if(index == 2){
                        sendModelMessage();
                        clearInterval(hert_interval);
                        if(this.status = 1){
                            this.light=0;this.status = 0;
                        }
                        setTimeout(()=>{hert_interval = setInterval(initHeart,5*1000);this.light=1;this.status = 1;},15*1000);
                    }
                    else if((this.status === 1) &&index == 3){
                        sendModelMessage();
                        clearInterval(hert_interval);
                        setTimeout(()=>{hert_interval =  setInterval(initHeart,5*1000);},10*1000);
                    }
                    
                }    
            },
           

        },
        computed:{
            lightGray(){
                if(this.status == -1)
                    return this.lightGrays[0];
                else
                    return (this.status == 0)? this.lightGrays[1]:this.lightGrays[2];
            },lightSheet(){
                if(this.status == 1){
                    return this.lightSheets[1];
                }else{
                    return this.lightSheets[0];
                }
            }
        }
    });
    mqttClient();
    // 主题点击事件
    document.getElementById('theme').onclick = function(){
        if(curr_theme){
            document.getElementsByClassName('theme')[0].style.display = 'none';
            curr_theme = !curr_theme;
        }else{
            document.getElementsByClassName('theme')[0].style.display = 'block';
            curr_theme = !curr_theme;
        }
        
    };
    changeWidth();
    //当前必须在这下面
    var wifi_btn = document.getElementsByClassName('nav_left')[0];
    var show_conn_wifi = document.getElementById('show_conn_wifi');
    wifi_btn.onclick = function(){
        show_conn_wifi.style.display = 'block';
        show_conn_wifi.style.transition = 'margin 2s';
        var set = setTimeout(() => {
            show_conn_wifi.style.margin = '60px 25px';
            document.getElementsByTagName('input')[0].focus();
        },100);
    }
    show_conn_wifi.getElementsByTagName('button')[0].onclick = function(){
        var inputs = show_conn_wifi.getElementsByTagName('input');
        
        var flightHandler = function(data){
        }
        if((inputs[0].value.trim() != '')){
            //1 发送数据到服务端;
            var url = "http://192.168.100.29/req?ssid=vivoy51&pass=12345678&callback=flightHandler";
            var script = document.createElement('script');

            script.setAttribute('src',url);
            document.getElementsByTagName('head')[0].appendChild(script);
            show_conn_wifi.style.display = 'none';

            var quit = setTimeout(function(){
                var head = document.getElementsByTagName('head')[0]; 
                var lastChildScript = head.getElementsByTagName('script');
                head.removeChild(lastChildScript[lastChildScript.length-1]);
            },100);
        }else{
            inputs[0].style.border='2px solid red';
            inputs[0].focus();
        }
    }
    
    

}
window.onresize=function(){
    changeWidth();
}
function changeWidth(){
    document.getElementById('icon_send').style.left = ((document.body.clientWidth/2)-22.5) + 'px';

}