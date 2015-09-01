var component = require('./component.js');

var WebSocketServer = require('ws').Server;

var webSocketServerComponent = component((context) => {
  var control_inbox = context.inbox('control_inbox');
  var outbox = context.outbox('outbox');

  context.runVirtualLoop((mycontext) => {
    var m = control_inbox.get();
    var myport = m.port;

    // ref: https://github.com/websockets/ws
    var wss = new WebSocketServer({port: myport});
    wss.on('connection', (ws) => {
      console.log('got ws connection');
      ws.on('message', (message) => {
        console.log('got ws message: ' + message);
        outbox.post({wss: wss, ws: ws, message: message});
      });

      // FUTURE TODO send from downstream:
      ws.send('Welcome from server');
    });
  });
});

module.exports = webSocketServerComponent;

