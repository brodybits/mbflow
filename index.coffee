
mailbox = require './mailbox.js'

m1 = mailbox()

m1.put { a: 1, b: 'hello' }

l1 =
  trigger: (m) ->
    mc = m1.get()
    console.log 'got message with contents: ' + JSON.stringify mc

m1.setListener l1

m1.put { c: 2, d: 'world' }

