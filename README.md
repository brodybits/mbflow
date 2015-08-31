# Mailbox flow system

Simple message [Flow-based programming (fbp)](http://www.jpaulmorrison.com/fbp/) system based on simple mailboxes, for Node.JS and other CommonJS implementations

Intended to be used to build a simple CoffeeScript/Javascript FBP implementation that can be used in both server and browser,
without any new features such as "Fibers" (which will not work on browsers) or generators.

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

In the future, there will be higher-level component flow and program assembly APIs to make this library easier to use.

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

See [http-server-test.coffee.md](http-server-test.coffee.md)

To run:

```shell
coffee http-server-test.coffee.md -n
```

and attempt to access the http port using something like:

```shell
curl http://localhost:8080/test-url
```

## Coding notes

- Using CoffeeScript for now since I find it easier for first-time development than Javascript (or at least ES3/ES5)
- Using the simplest subset possible, i.e. no classes (which are sugar anyway), avoid `new` and `this` unless absolutely necessary. A couple links for reference:
  - http://radar.oreilly.com/2014/03/javascript-without-the-this.html
  - https://nemisj.com/js-without-new-and-this/
- All components should be kept as simple as possible.

## Future TODO

- Simple components should be in Javascript instead
- Try ES6 with simple `=>` function operator
- Separate license file

