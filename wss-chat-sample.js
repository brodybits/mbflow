// -----------------------------------------------------------------------------
// Web Socket chat sample

// Import(s):
var composite = require('./composite.js');

var fileReaderComponent = require('./fileReaderComponent.es6.js');
var httpServerComponent = require('./httpServerComponent.js');
var httpResponderComponent = require('./httpResponderComponent.es6.js');
var webSocketServerComponent = require('./webSocketServerComponent.es6.js');
var webSocketBroadcastComponent = require('./webSocketBroadcastComponent.es6.js');

// Constant(s):
var HTTP_PORT = 8000;
var WS_PORT = 8080;

// Components:

var mycomponents = {
  fileReaderComponent: fileReaderComponent,
  httpServerComponent: httpServerComponent,
  httpResponderComponent: httpResponderComponent,
  webSocketServerComponent: webSocketServerComponent,
  webSocketBroadcastComponent: webSocketBroadcastComponent,
};

// Pure JSON object:
var myspec = {
  myFileReader: {fileReaderComponent: {}},
  myhttpsrv: {httpServerComponent: {}},
  myhttpres: {httpResponderComponent: {inbox: {myhttpsrv: 'http_out'}, contents_inbox: {myFileReader: 'outbox'}}},
  mywssrv: {webSocketServerComponent: {}},
  mywssend: {webSocketBroadcastComponent: {inbox: {mywssrv: 'outbox'}}},
};

var c = composite(mycomponents, myspec);

c.myFileReader.control_inbox.post({filename: 'ws-chat-test.html'});

c.myhttpsrv.listen_port_inbox.post({ port: HTTP_PORT });
c.mywssrv.control_inbox.post({ port: WS_PORT });

// NOTE: due to the design of Node.js this will print before the HTTP server will actually start listening to the ports!
console.log('setup finished');

