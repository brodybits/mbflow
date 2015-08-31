# component object


## Import(s)

    flowbox = require('./flowbox.js')
    outbox = require('./outbox.js')

## component object function

    component = (fun) ->

      ->
        # FUTURE TBD may (or may not) separate inboxes/outboxes
        flowboxes = {}

        # needed for virtual loop feature:
        inboxes = []

        get_inbox = (name) ->
          inbox = flowbox()
          flowboxes[name] = inbox
          inboxes.push inbox
          inbox

        get_outbox = (name) ->
          my_outbox = outbox()
          flowboxes[name] = my_outbox
          my_outbox

        context = null # will fill below

        run_virtual_loop = (loop_fun) ->
          inbox_handler =
            onPost: (mb) ->
              # TBD should the same context be given again ??
              loop_fun context

          for inbox in inboxes
            inbox.setListener null # prevent a possible exception
            inbox.setListener inbox_handler

        context =
          inbox: get_inbox
          outbox: get_outbox
          runVirtualLoop: run_virtual_loop

        fun context

        # expose inboxes/outboxes
        flowboxes

## export

    module.exports = component

#### vim: set ft=coffee :

