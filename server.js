var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 6789));
app.get('/', function(req, res) {
 res.render('index');
});
var messages =[];
var server = app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
  console.log('SERVER::WE ARE USING SOCKETS!');
  console.log(socket.id);
  socket.on('messageToServer', function(data){
  	messages.push(data)
  	console.log(" receving message from ios", messages, typeof(data))
  	io.sockets.emit('messageToPage', messages);
  	io.sockets.emit('messageFromServer', messages);
  })
});