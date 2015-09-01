// -----------------------------------------------------------------------------
// HTTP server component test

// Import(s):
var composite = require('./composite.js');
var httpServerComponent = require('./httpServerComponent.js');
var httpTestHandlerComponent = require('./httpTestHandlerComponent.es6.js');
var httpTestHandlerComponent2 = require('./httpTestHandlerComponent2.es6.js');

// Constant(s):
var PORT1 = 8000;
var PORT2 = 8080;

var mycomponents = {
  httpServerComponent: httpServerComponent,
  httpTestHandlerComponent: httpTestHandlerComponent,
  httpTestHandlerComponent2: httpTestHandlerComponent2,
};

// Pure JSON object:
var myspec = {
  mysrv: { httpServerComponent: {}},
  mysrv2: { httpServerComponent: {}},
  http_handler: { httpTestHandlerComponent: {inbox: {mysrv: 'http_out'}}},
  http_handler2: { httpTestHandlerComponent2: {inbox: {mysrv2: 'http_out'}}},
};

var c = composite(mycomponents, myspec);

c.mysrv.listen_port_inbox.post({ port: PORT1 });
c.mysrv2.listen_port_inbox.post({ port: PORT2 });

// NOTE: due to the design of Node.js this will print before the HTTP server will actually start listening to the ports!
console.log('setup finished');

