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
            console.log("entryUrl =" + userDetails['entryUrl']);
            console.log("userAgent=" + userDetails['userAgent']);
            console.log("screenWidth="+ userDetails['screenWidth']);
            console.log("screenHeight="+ userDetails['screenHeight']);
       // }
        //console.log("info navigateur : "+ userDetails);
    })
})



http.listen(3000, function(){
    console.log('listening on port 3000');
});

