const express = require('express');
const mqttServer = require('./module/mqttServer.js');
var app = express();
app.listen(8081);
app.use(express.static('./www'));