// -----------------------------------------------------------------------------
// HTTP server component test

// Import(s):
var httpServerComponent = require('./httpServerComponent.js');
var httpTestHandlerComponent = require('./httpTestHandlerComponent.es6.js');
var consoleLogComponent = require('./consoleLogComponent.js');

// Constant(s):
var PORT = 8080;

// Components:
var mysrv = httpServerComponent();
var http_handler = httpTestHandlerComponent();
var log_handler = consoleLogComponent();

// Hook it up:
mysrv.http_out.setRecipient(http_handler.inbox);
mysrv.log_out.setRecipient(log_handler.inbox);

// Run the HTTP server
mysrv.run_trigger.post({ port: PORT });

