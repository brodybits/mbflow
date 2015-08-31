# Log handler object

#### Import(s)

    flowbox = require('./flowbox.js')
    outbox = require('./outbox.js')

#### Log handler function

    logFlowboxHandler = ->
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

    module.exports = logFlowboxHandler

#### vim: set ft=coffee :

