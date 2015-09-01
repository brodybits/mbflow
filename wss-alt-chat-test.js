// -----------------------------------------------------------------------------
// Alternative web socket broadcast chat sample

// Import(s):
var composite = require('./composite.js');
var httpServerComponent = require('./httpServerComponent.js');
var httpResponderComponent = require('./httpResponderComponent.es6.js');
var fileReaderComponent = require('./fileReaderComponent.es6.js');
var webSocketServerComponent = require('./webSocketServerComponent.es6.js');
var webSocketBroadcastComponent = require('./webSocketBroadcastComponent.es6.js');
var webChatConnectionCounter = require('./webChatConnectionCounter.es6.js');
var combinerComponent = require('./combinerComponent.es6.js');

// Constant(s):
var HTTP_PORT = 8000;
var WS_PORT = 8080;

// Components:

var myFileReader = fileReaderComponent();
var myhttpsrv = httpServerComponent();
var myhttpres = httpResponderComponent().withInputs({inbox: myhttpsrv.http_out, contents_inbox: myFileReader.outbox});

var mywssrv = webSocketServerComponent();
var mycounter = webChatConnectionCounter().withInputs({inbox: mywssrv.control_outbox});
var mycombiner = combinerComponent().withInputs({a_inbox: mywssrv.outbox, b_inbox: mycounter.outbox});
var mywsres = webSocketBroadcastComponent().withInputs({inbox: mycombiner.outbox});

myFileReader.control_inbox.post({filename: 'ws-chat-test.html'});

myhttpsrv.listen_port_inbox.post({ port: HTTP_PORT });
mywssrv.control_inbox.post({ port: WS_PORT });

// NOTE: due to the design of Node.js this will print before the HTTP server will actually start listening to the ports!
console.log('setup finished');

