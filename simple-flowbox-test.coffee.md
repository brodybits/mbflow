# Simple flowbox test

    flowbox = require './flowbox.js'

    mybox = flowbox { flowStyle: 'inline' }

    # will be blocked:
    mybox.post { a: 1, b: 'hello' }

    myListener =
      onPost: (box) ->
        mc = box.get()
        console.log 'got message with contents: ' + JSON.stringify mc

    # will immediately handle the blocked post:
    mybox.setListener myListener

    # post another message:
    mybox.post { c: 2, d: 'world' }

#### vim: set ft=coffee:

