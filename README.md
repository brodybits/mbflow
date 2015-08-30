# Mailbox flow system

Simple message flow system based on simple mailboxes

Intended to be used to build a simple CoffeeScript/Javascript FBP implementation that can be used in both server and browser,
without any new features such as "Fibers" (which will not work on browsers) or generators.

by Christopher J. Brody mailto: info@litehelpers.net

## Licensing

UNLICENSE (public domain)

I can hereby state that this software is entirely authored by myself and is NOT subject to any possible ownership by others.
In case I accept and include contributions in the future I will require a similar statement from all contributors.

## To test

```shell
node index.js
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

See [simple-mailbox-test.coffee.md](simple-mailbox-test.coffee.md):

```coffeescript
mailbox = require './mailbox.js'

m1 = mailbox()

# message stays in the mailbox since there is no listener:
m1.put { a: 1, b: 'hello' }

# dumb, simple listener
my_listener =
  trigger: (m) ->
    mc = m1.get()
    console.log 'got message with contents: ' + JSON.stringify mc

# this will immediately trigger the listener to retrieve and process the mailbox contents:
m1.setListener my_listener

# put another message in the mailbox, which will immediately trigger the listener
# to retrieve and process it:
m1.put { c: 2, d: 'world' }
```

To run:

```shell
coffee simple-mailbox-test.coffee.md -n
```

or

```shell
coffee simple-mailbox-test.coffee.md --node
```

# Simple HTTP server sample

See [http-server-test.coffee.md](http-server-test.coffee.md)

To run:

```shell
coffee http-server-test.coffee.md -n
```

and attempt to access the http port using something like:

```shell
curl http://localhost:8080/test-url
```

## Future TODO

- Keep all components as simple as possible
- Avoid using unnecessary language features such as classes
- Simple components should be in Javascript instead
- Separate license file

