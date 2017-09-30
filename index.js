const STATIC_PORT = 8080;
const SOCKET_PORT = 8081;
const ANIM_DELAY  = 50;

commandq = [];
inpEof = false;

var stdin = process.openStdin();
stdin.addListener("data", function(d) {
  var inp = d.toString();
  console.log(inp.trim());
  var lines = inp.split('\n');
  for (var lineNo = 0; lineNo < lines.length; lineNo++) {
    var plottyRegex = /.*<plotty:(.*)>.*/g;
    var plottyCommand = plottyRegex.exec(lines[lineNo]);

    if (plottyCommand != null) {
      plottyCommand = plottyCommand[1]
      command = plottyCommand.split(",");
      command = command.map(function(e) {return e.trim()});
      commandq.push(command);
    }
  }
}).addListener("end", function() {
  inpEof = true;
});
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

  setInterval(function() {
    if (commandq.length > 0) {
      ws.send(JSON.stringify(commandq[0]));
      commandq.splice(0, 1);
    } else if (inpEof) {
      process.exit();
    }
  }, ANIM_DELAY);
});
