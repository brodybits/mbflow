// -----------------------------------------------------------------------------
// Web Socket server component test

// Import(s):
var composite = require('./composite.js');
var webSocketServerComponent = require('./webSocketServerComponent.es6.js');

// Constant(s):
var WS_PORT = 8080;

var mywssrv = webSocketServerComponent();

mywssrv.control_inbox.post({ port: WS_PORT });

// NOTE: due to the design of Node.js this will print before the HTTP server will actually start listening to the ports!
console.log('setup finished');

