// -----------------------------------------------------------------------------
// HTTP server component test

// Import(s):
var httpServerComponent = require('./httpServerComponent.js');
var httpTestHandlerComponent = require('./httpTestHandlerComponent.es6.js');

// Constant(s):
var PORT = 8080;

// Components:
var mysrv = httpServerComponent();
var http_handler = httpTestHandlerComponent();

// Hook it up:
mysrv.http_out.setRecipient(http_handler.inbox);

// Run the HTTP server
mysrv.run_trigger.post({ port: PORT });

// NOTE: due to the design of Node.js this will print before the HTTP server will actually start listening:
console.log('setup finished');

