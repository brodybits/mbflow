# component object


## Import(s)

    flowbox = require('./flowbox.js')
    outbox = require('./outbox.js')

## component object function

    component = (fun) ->

      ->
        # FUTURE TBD may (or may not) separate inboxes/outboxes
        flowboxes = {}

        get_inbox = (name) ->
          inbox = flowbox()
          flowboxes[name] = inbox
          inbox

        get_outbox = (name) ->
          my_outbox = outbox()
          flowboxes[name] = my_outbox
          my_outbox

        fun
          inbox: get_inbox
          outbox: get_outbox

        flowboxes

## export

    module.exports = component

#### vim: set ft=coffee :

