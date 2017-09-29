const STATIC_PORT = 8080
const SOCKET_PORT = 8081

// create static web server
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(STATIC_PORT, function(){
  console.log('Server running on ' + STATIC_PORT + '...');
});


// create Websocket server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: SOCKET_PORT });

wss.on('connection', function connection(ws) {
  console.log("connected");
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });


  var stdin = process.openStdin();
  stdin.addListener("data", function(d) {
    console.log("you entered: [" +
                d.toString().trim() + "]");
    ws.send(d.toString().trim());
  });
});
