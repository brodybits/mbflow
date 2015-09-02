var component = require('./component.js');

var webSocketBroadcastComponent = component((context) => {
  var inbox = context.inport('inbox', {inportType: 'inbox', flowStyle: 'inline'});

  context.runVirtualLoop((mycontext) => {
    var m = inbox.get();
    var wss = m.wss;
    var message = m.message;

    // ref: https://github.com/websockets/ws
    wss.clients.forEach((c) => {
      c.send(message);
    });
  });
});

module.exports = webSocketBroadcastComponent;

