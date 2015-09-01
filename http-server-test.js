// -----------------------------------------------------------------------------
// HTTP server component test

// Import(s):
var httpServerComponent = require('./httpServerComponent.js');
var httpTestHandlerComponent = require('./httpTestHandlerComponent.es6.js');
var httpTestHandlerComponent2 = require('./httpTestHandlerComponent2.es6.js');

// Constant(s):
var PORT1 = 8000;
var PORT2 = 8080;

// Components:
var mysrv = httpServerComponent();
var mysrv2 = httpServerComponent();
var http_handler = httpTestHandlerComponent();
var http_handler2 = httpTestHandlerComponent2();

// Hook them up:
mysrv.http_out.setRecipient(http_handler.inbox);
mysrv2.http_out.setRecipient(http_handler2.inbox);

// Listen to the HTTP server ports:
mysrv.listen_port_inbox.post({ port: PORT1 });
mysrv2.listen_port_inbox.post({ port: PORT2 });

// NOTE: due to the design of Node.js this will print before the HTTP server will actually start listening to the ports!
console.log('setup finished');

