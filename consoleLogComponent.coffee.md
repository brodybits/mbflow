# Console log handler object

#### Import(s)

    component = require('./component.js')

#### Console log handler function

    consoleLogComponent = component (context) ->
      inbox = context.inbox('inbox')

      context.runVirtualLoop (context) ->
        s = inbox.get()
        console.log s
        return

## export

    module.exports = consoleLogComponent

#### vim: set ft=coffee :

