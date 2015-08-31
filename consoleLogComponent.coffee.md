# Console log handler object

#### Import(s)

    component = require('./component.js')

#### Console log handler function

    consoleLogComponent = component (context) ->
      inbox = context.inbox('inbox')

      consoleLogListener =
        onPost: (mb) ->
          s = mb.get()
          console.log s
          return

      inbox.setListener consoleLogListener

      return

## export

    module.exports = consoleLogComponent

#### vim: set ft=coffee :

