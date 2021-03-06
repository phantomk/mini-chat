'use strict'

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/socket.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { app: 'chat' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
