# Mailbox flow system

Simple flow-based ES3/ES5/ES6 (Javascript) execution system based on simple mailboxes, based on the [Flow-based programming (fbp)](http://www.jpaulmorrison.com/fbp/) concept, for Node.JS and other CommonJS implementations. Does not need any new features such as "Fibers" (which will not work on browsers), generators, etc.

by Christopher J. Brody mailto: info@litehelpers.net

## Licensing

UNLICENSE (public domain)

I can hereby state that this software is entirely authored by myself and is NOT subject to any possible ownership by others.
In case I accept and include contributions in the future I will require a similar statement from all contributors.

## Overall architecture/design

A program or system would be a [directed acyclic graph (dag)](https://en.wikipedia.org/wiki/Directed_acyclic_graph) of components
that are connected to each other via very simple message flow mailboxes. Each message flow mailbox can hold only one message,
which is an arbitrary object. When a sender puts a message into a mailbox, it calls the trigger function on the listener if it is
connected and the listener _may_ get and consume the message from the message flow mailbox. Queueing can be added as special
components or within existing components.

Certain Node.js functions, such as http server listen(), will block the main program flow. In this case, the main program can
post a control command into the server object and it will block while the server object is listening. Whenever the
server function send calls a server object callback, and the callback posts the message into a mailbox, the listener
will be able to handle the message and send it on.

So the message flow mailbox, called a "flowbox" here, acts to provide both data flow control and program execution flow control.

There is also an "outbox" object, that can be part of one component and connected to an input "flowbox" on another component.

There is now a "component" object that can be used to define components, and keep track of its input and output flow boxes.
It will support higher-level component flow and program assembly APIs to make this library easier to use.
The component object now supports a virtual loop functionality, as shown in the sample HTTP server code below.

The virtual loop will execute its function once every time a message is posted into an inbox of the component.
FUTURE TBD/TODO:
- If there is a pending message in an inbox and a downstream inbox is cleared, the virtual loop function should be triggered
- The virtual loop function _should_ check the outbox before posting a message. More elegant solutions would include blocking the message processing when any or all outboxes are full and perhaps support for limited queueing.

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

## Simple HTTP server sample

See [http-server-test.js](http-server-test.js)

To run:

```shell
node --harmony http-server-test.js
```

and to access the local http server using something like:

```shell
curl http://localhost:8080/test-url
```

Here is the top-level Javascript:

```Javascript
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
```

and the test HTTP handler component in ES6:

```Javascript
var component = require('./component.js');

var httpTestHandlerComponent = component((context) => {
  var inbox = context.inbox('inbox');

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

## Coding notes

- Using CoffeeScript that is compiled to Javascript (ES3/ES5) for all library classes
- Using the simplest subset possible, i.e. no classes (which are sugar anyway), avoid `new` and `this` (unless absolutely necessary someday). Here are a couple of links for reference:
  - http://radar.oreilly.com/2014/03/javascript-without-the-this.html
  - https://nemisj.com/js-without-new-and-this/
- All components should be kept as simple as possible.

## Future TODO

- Simple components should be in Javascript instead
- Consider replacing _all_ CoffeeScript with ES6 which can be transpiled to ES3/ES5
- Separate license file

