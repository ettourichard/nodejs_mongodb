//server side

//SOCKET.IO + EXPRESS
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//MONGODB
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});




app.get('/', function(req, res){
    //res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    //console.log('a user connected');
    io.emit('connexion', '');
    socket.on('disconnect', function(){
        //console.log('user disconnected');
        io.emit('deconnexion', '');
    });
    socket.on('chat message', function(msg){
        //console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('userDetails', function(userDetails){
        //for each(var value in userDetails){
            console.log("\n  ");
            console.log("\n\t>>Infos navigation  ");
            console.log("- Page courante \t\t[" + userDetails['entryUrl'] +"]");
            console.log("- Titre de la page \t\t[" + userDetails['pageTitle'] +"]");
            console.log("\n\t>>Infos matériel  ")
            console.log("- userAgent \t\t\t[" + userDetails['userAgent'] +"]");
            console.log("- appCodeName \t\t\t[" + userDetails['navigatorAppCodeName'] +"]");
            console.log("- appName \t\t\t[" + userDetails['navigatorAppName'] +"]");
            console.log("- appVersion \t\t\t[" + userDetails['navigatorAppVersion'] +"]");
            console.log("- OS \t\t\t\t[" + userDetails['navigatorOs'] +"]");
            console.log("- language \t\t\t[" + userDetails['navigatorLanguage'] +"]");
            console.log("- screenResolution \t\t["+ userDetails['screenWidth'] + "x" + userDetails['screenHeight'] +"]");
            console.log("- browserResolution \t\t["+ userDetails['browserWidth'] + "x" + userDetails['browserHeight'] +"]");
            console.log("- javaEnabled \t\t\t[" + userDetails['javaEnabled'] +"]");
            console.log("\n\t>>Geolocation  ")
            console.log("- latitude \t\t\t[" + userDetails['geolocationLatitude'] +"]");
            console.log("- longitude \t\t\t[" + userDetails['geolocationLongitude'] +"]");
            console.log("- altitude \t\t\t[" + userDetails['geolocationAltitude'] +"]");
            console.log("- heading \t\t\t[" + userDetails['geolocationHeading'] +"]");
            console.log("- speed \t\t\t[" + userDetails['geolocationSpeed'] +"]");


       // }
        //console.log("info navigateur : "+ userDetails);
    })
})



http.listen(3000, function(){
    console.log('listening on port 3000');
});

