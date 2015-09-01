# component object


## Import(s)

    flowbox = require('./flowbox.js')
    outbox = require('./outbox.js')

## component object function

    component = (fun) ->

      ->
        myself = {}

        inbox_map = {}
        inbox_names = []
        inboxes = []

        get_inbox = (name) ->
          inbox = flowbox()
          myself[name] = inbox
          inbox_map[name] = inbox
          inbox_names.push name
          inboxes.push inbox
          inbox

        get_outbox = (name) ->
          my_outbox = outbox()
          myself[name] = my_outbox
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

        myself.withInputs = (connections) ->
          for name in inbox_names
            if !!connections[name]
              connections[name].setRecipient inbox_map[name]

          return myself

        return myself

## export

    module.exports = component

#### vim: set ft=coffee :

