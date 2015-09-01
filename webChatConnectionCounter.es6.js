var component = require('./component.js');

var webChatConnectionCounter = component((context) => {
  // FUTURE TODO:
  // - get disconnect event and reduce counter if a client is disconnected
  // - control input to reset the counter
  var inbox = context.inbox('inbox');
  var outbox = context.outbox('outbox');

  var count = 0;

  context.runVirtualLoop((mycontext) => {
    if (inbox.isFull()) {
      var m = inbox.get();
      var wss = m.wss;

      count++;
      outbox.post({wss: wss, message: 'New connection, total count: ' + count});
    }
  });
});

module.exports = webChatConnectionCounter;

