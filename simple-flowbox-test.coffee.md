# Simple flowbox test

    flowbox = require './flowbox.js'

    m1 = flowbox()

    m1.post { a: 1, b: 'hello' }

    l1 =
      trigger: (m) ->
        mc = m1.get()
        console.log 'got message with contents: ' + JSON.stringify mc

    m1.setListener l1

    m1.post { c: 2, d: 'world' }

#### vim: set ft=coffee:

