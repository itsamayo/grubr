//Such var much require
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser'); //Returns middleware that only parses json
var server = require('http').createServer(app);

//LIVE PORT
var port = 8080;

//Usage
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/app', express.static(__dirname + "/app" ));
app.use('/public', express.static(__dirname + "/public"))
app.get('/', function(req, res){
    res.sendfile('index.html');
});

//Listen in
function listen() {
    server.listen(port, function(){
    console.log("It's all going down on PORT " + port);
    });
}

listen();

//API Endpoints