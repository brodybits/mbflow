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
coffee -p index.coffee > index.js
```

NOTE: this is subject to change and may change in the near future. I think there better way to do this!

## Sample

See index.coffee:

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

## Future TODO

- Keep all components as simple as possible
- Avoid using unnecessary language features such as classes
- Simple components should be in Javascript instead
- Separate license file

