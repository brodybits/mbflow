// -----------------------------------------------------------------------------
// HTTP flowbox server test

// Import(s):

var httpFlowboxServer = require('./httpFlowboxServer.js');
var httpTestFlowboxHandler = require('./httpTestFlowboxHandler.es6.js');
var logFlowboxHandler = require('./logFlowboxHandler.js');

var flowbox = require('./flowbox.js');

// Constant(s):

var PORT = 8080;

// HTTP server instance

var mysrv = httpFlowboxServer();

// App HTTP handler

var http_handler = httpTestFlowboxHandler();

mysrv.http_out.setRecipient(http_handler.inbox);

// App Log handler

var log_handler = logFlowboxHandler();

mysrv.log_out.setRecipient(log_handler.inbox);

// Run the HTTP server

mysrv.run_trigger.post({ port: PORT });

