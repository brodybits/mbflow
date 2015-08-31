# Log handler object

#### Import(s)

    http = require('http')

    flowbox = require('./flowbox.js')
    outbox = require('./outbox.js')

#### HTTP server function

    logHandler = ->
      inbox = flowbox()

      logListener =
        onPost: (mb) ->
          s = mb.get()
          console.log s
          return

      inbox.setListener logListener

      # returns:
      inbox: inbox

## export

    module.exports = logHandler

#### vim: set ft=coffee :

