// -----------------------------------------------------------------------------
// Web Socket broadcast chat sample

// Import(s):
var composite = require('./composite.js');

var mycomponents = {
    fileReaderComponent : require('./fileReaderComponent.es6.js'),
    httpServerComponent : require('./httpServerComponent.js'),
    httpResponderComponent : require('./httpResponderComponent.es6.js'),
    webSocketServerComponent : require('./webSocketServerComponent.es6.js'),
    webSocketBroadcastComponent : require('./webSocketBroadcastComponent.es6.js'),
    webChatConnectionCounter : require('./webChatConnectionCounter.es6.js'),
    combinerComponent : require('./combinerComponent.es6.js'),
};

// Constant(s):
var HTTP_PORT = 8000;
var WS_PORT = 8080;

// Components:

// Pure JSON object:
var myspec = {
  myFileReader: {fileReaderComponent: {}},
  myhttpsrv: {httpServerComponent: {}},
  myhttpres: {httpResponderComponent: {inbox: {myhttpsrv: 'http_out'}, contents_inbox: {myFileReader: 'outbox'}}},
  mywssrv: {webSocketServerComponent: {}},
  mycounter: {webChatConnectionCounter: {inbox: {mywssrv: 'control_outbox'}}},
  mycombiner: {combinerComponent: {a_inbox: {mywssrv: 'outbox'}, b_inbox: {mycounter: 'outbox'}}},
  mywssend: {webSocketBroadcastComponent: {inbox: {mycombiner: 'outbox'}}},
};

var c = composite(mycomponents, myspec);

c.myFileReader.control_inbox.post({filename: 'ws-chat-test.html'});

c.myhttpsrv.listen_port_inbox.post({ port: HTTP_PORT });
c.mywssrv.control_inbox.post({ port: WS_PORT });

// NOTE: due to the design of Node.js this will print before the HTTP server will actually start listening to the ports!
console.log('setup finished');

