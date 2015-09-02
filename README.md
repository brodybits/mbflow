# Simple Javascript flow system based on internal mailboxes

Simple flow-based ES3/ES5/ES6 (Javascript) execution system based on simple mailboxes, based on the [Flow-based programming (fbp)](http://www.jpaulmorrison.com/fbp/) concept, for Node.JS and other CommonJS implementations. Does not need any new features such as "Fibers" (which will not work on browsers), generators, etc.

by Christopher J. Brody mailto: info@litehelpers.net

## Licensing

UNLICENSE (public domain)

I can hereby state that this software is entirely authored by myself and is NOT subject to any possible ownership by others.
In case I accept and include contributions in the future I will require a similar statement from all contributors.

## Overall architecture/design

A program or system is a [directed acyclic graph (dag)](https://en.wikipedia.org/wiki/Directed_acyclic_graph) of components that
are connected to each other via inport-outport connections, which are currently based on simple mailbox objects.
An inport is a message flow inbox or "flowbox" that currently supports only an "inline" flow style and holds a single message for
processing. An outport is a message flow "outbox" that posts each message into a connected inport.
Other types of inports and outports may be added in the future.

When a sender puts a message into an inbox or "flowbox" (directly or through a connected outbox), it calls a trigger callback on
the listener if one is connected and the listener _may_ get and consume the message from the message flow mailbox.
Queueing can be added as special components or within existing components in the future.

There is a "component" object that can be used to define components, and keep track of its inport and outport interfaces.
The component object supports a virtual loop functionality, as shown in the sample HTTP server code below.
The virtual loop will execute its function once every time a message is posted into an inbox of the component.

There is also a "composite" object that can be used to define a system of components that are connected based on a
pure Javascript object that can be defined in JSON.

This project takes its inspiration from the following projects:
- [Flow-based programming (fbp)](http://www.jpaulmorrison.com/fbp/) which has its own user group as well as some reference implementations at: http://www.jpaulmorrison.com/fbp/software.html
- [Facebook Flux](https://facebook.github.io/flux/)

## To test

```shell
coffee simple-mailbox-test.coffee.md -n
```

## To regenerate Javascript

```shell
coffee -p mailbox.coffee > mailbox.js
```

or for more recent versions of the CoffeeScript compiler:

```shell
coffee -c mailbox.coffee.md
```

## Simple mailbox flow sample

See [simple-flowbox-test.coffee.md](simple-flowbox-test.coffee.md):

```coffeescript
flowbox = require './flowbox.js'

mybox = flowbox()

# message stays in the mailbox since there is no listener:
mybox.put { a: 1, b: 'hello' }

# dumb, simple listener
myListener =
  onPost: (box) ->
    mc = box.get()
    console.log 'got message with contents: ' + JSON.stringify mc

# this will immediately trigger the listener to retrieve and process the mailbox contents:
mybox.setListener myListener

# put another message in the mailbox, which will immediately trigger the listener
# to retrieve and process it:
mybox.put { c: 2, d: 'world' }
```

To run:

```shell
coffee simple-flowbox-test.coffee.md -n
```

or

```shell
coffee simple-flowbox-test.coffee.md --node
```

## Simple HTTP multi-port server sample

See [http-server-test.js](http-server-test.js)

To run:

```shell
node --harmony http-server-test.js
```

and to access the local http server using something like:

```shell
curl http://localhost:8000/test-url
```

or

```shell
curl http://localhost:8080/test-url
```

Here is the top-level Javascript, now with the flow specified in JSON as part of a composite object:

```Javascript
// -----------------------------------------------------------------------------
// HTTP server component test

// Import(s):
var composite = require('./composite.js');

var mycomponents = {
    httpServerComponent : require('./httpServerComponent.js'),
    httpTestHandlerComponent : require('./httpTestHandlerComponent.es6.js'),
    httpTestHandlerComponent2 : require('./httpTestHandlerComponent2.es6.js'),
};

// Constant(s):
var PORT1 = 8000;
var PORT2 = 8080;

// Specification as pure JSON object:
var myspec = {
  mysrv: { httpServerComponent: {}},
  mysrv2: { httpServerComponent: {}},
  http_handler: { httpTestHandlerComponent: {inbox: {mysrv: 'http_out'}}},
  http_handler2: { httpTestHandlerComponent2: {inbox: {mysrv2: 'http_out'}}},
};

// Create the system:
var c = composite(mycomponents, myspec);

// Push the configuration:
c.mysrv.listen_port_inbox.post({ port: PORT1 });
c.mysrv2.listen_port_inbox.post({ port: PORT2 });

// NOTE: due to the design of Node.js this will print before the HTTP server will actually start listening to the ports!
console.log('setup finished');
```

or a simpler alternative that does not use a pure-JSON specification object:

```Javascript
// -----------------------------------------------------------------------------
// HTTP server component test

// Import(s):
var httpServerComponent = require('./httpServerComponent.js');
var httpTestHandlerComponent = require('./httpTestHandlerComponent.es6.js');
var httpTestHandlerComponent2 = require('./httpTestHandlerComponent2.es6.js');

// Constant(s):
var PORT1 = 8000;
var PORT2 = 8080;

// Connected components:
var mysrv = httpServerComponent();
var http_handler = httpTestHandlerComponent().withInputs({inbox: mysrv.http_out});

var mysrv2 = httpServerComponent();
var http_handler = httpTestHandlerComponent().withInputs({inbox: mysrv2.http_out});

// Listen to the HTTP server ports:
mysrv.listen_port_inbox.post({ port: PORT1 });
mysrv2.listen_port_inbox.post({ port: PORT2 });

// NOTE: due to the design of Node.js this will print before the HTTP server will actually start listening to the ports!
console.log('setup finished');
```

and a test HTTP handler component in ES6:

```Javascript
var component = require('./component.js');

var httpTestHandlerComponent = component((context) => {
  var inbox = context.inport('inbox', {inportType: 'inbox', flowStyle: 'inline'});

  context.runVirtualLoop((mycontext) => {
    var m = inbox.get();
    m.res.end('Response from URL: ' + m.req.url + '\n');
  });

});

module.exports = httpTestHandlerComponent;
```

Alternative (TBD may go away):

```Javascript
var component = require('./component.js');

var httpTestHandlerComponent = component((context) => {
  inbox.setListener({
    onPost: (mb) => {
      var m = mb.get();
      m.res.end('Response from URL: ' + m.req.url + '\n');
    }
  });

module.exports = httpTestHandlerComponent;
```

Note that I am using ES6 *only* to get the new `=>` function operator. Otherwise it should be the same as ES5 (or maybe even ES3).

This test illustrates something about how Node.js works. Apparently, Node.js first run the user program script _and then_ listen
to all of its ports (and timers, etc.) until it has no more ports or other items to listen to.

## Simple web socket broadcast chat sample

Serves a static HTTP file with a web socket chat client, and runs a web socket broadcast chat server. Also includes very simple, dumb connection counter and combiner components.

Requires the following npm ws modules to be installed: `npm install fs` and `npm install ws`

Testing:
- In shell: `node --harmony wss-chat-sample.js`
- In browser: open http://localhost:8000

FUTURE TBD it _should_ be possible to update the static HTML file without restarting the server!

### Top-level code

```Javascript
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
```

Alternative code to setup the web socket broadcast chat components from `wss-alt-chat-test.js` (changes to imports omitted):

```Javascript
var myFileReader = fileReaderComponent();
var myhttpsrv = httpServerComponent();
var myhttpres = httpResponderComponent().withInputs({inbox: myhttpsrv.http_out, contents_inbox: myFileReader.outbox});

var mywssrv = webSocketServerComponent();
var mycounter = webChatConnectionCounter().withInputs({inbox: mywssrv.control_outbox});
var mycombiner = combinerComponent().withInputs({a_inbox: mywssrv.outbox, b_inbox: mycounter.outbox});
var mywsres = webSocketBroadcastComponent().withInputs({inbox: mycombiner.outbox});
```

### Simple connection counter component

```Javascript
var component = require('./component.js');

var webChatConnectionCounter = component((context) => {
  var inbox = context.inbox('inbox');
  var outbox = context.outbox('outbox');

  var count = 0;

  context.runVirtualLoop((mycontext) => {
    if (inbox.isFull()) {
      var m = inbox.get();
      var wss = m.wss;

      count++;
      outbox.post({wss: wss, message: 'New connection, total count: ' + count});
    }
  });
});

module.exports = webChatConnectionCounter;
```

## Coding notes

- Using CoffeeScript that is compiled to Javascript (ES3/ES5) for all common library classes, i.e. flowbox/outbox/component/composite (as well as HTTP server component)
- Using the simplest subset possible, i.e. no classes (which are sugar anyway), avoid `new` and `this` (unless absolutely necessary someday). Here are a couple of links for reference:
  - http://radar.oreilly.com/2014/03/javascript-without-the-this.html
  - https://nemisj.com/js-without-new-and-this/
- All components should be kept as simple as possible.

## Future/TODO

- Organize with proper directory structure
- Automatic testing
- Add error checking to the composite object
- Simple components should be in Javascript instead
- Consider replacing _all_ CoffeeScript with ES6 which can be transpiled to ES3/ES5 and perhaps minimized
- Separate license file
- graceful shutdown mechanism ref: http://joseoncode.com/2014/07/21/graceful-shutdown-in-node-dot-js/
- Message queueing component
- Support for limited message queueing in inports/outports
- The virtual loop function in each of the core components _should_ check that an outbox is not blocked before posting any messages
- Possibility to block the triggering of processing of messages from some or all inports when an outport is blocked
- The virtual loop function _should_ check the outbox before posting a message. More elegant solutions would include blocking the message processing when any or all outboxes are full and perhaps support for limited queueing.
- A component's virtual loop function should also be triggered in case there are any pending input messages and a message in the downstream inbox is processed
- Additional types of inports and outports, additional message flow mechanism (such as processing in the next tick), and message queueing mechanism(s)

## Extra references

- http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/

