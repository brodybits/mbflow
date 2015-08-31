// -----------------------------------------------------------------------------
// HTTP server test

// Import(s):

var httpServerComponent = require('./httpServerComponent.js');
var httpTestFlowboxHandler = require('./httpTestFlowboxHandler.es6.js');
var logFlowboxHandler = require('./logFlowboxHandler.js');

// Constant(s):

var PORT = 8080;

// HTTP server instance
var mysrv = httpServerComponent();

// App HTTP handler
var http_handler = httpTestFlowboxHandler();

// App Log handler
var log_handler = logFlowboxHandler();

// Hook it up:
mysrv.http_out.setRecipient(http_handler.inbox);
mysrv.log_out.setRecipient(log_handler.inbox);

// Run the HTTP server

mysrv.run_trigger.post({ port: PORT });

