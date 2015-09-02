# component object


## Import(s)

    inport = require('./inport.js')
    outport = require('./outport.js')

## component object function

    component = (fun) ->

      ->
        myself = {}

        inport_map = {}
        inport_names = []
        inports = []

        get_inport = (name, opts) ->
          my_inport = inport(opts)
          myself[name] = my_inport
          inport_map[name] = my_inport
          inport_names.push name
          inports.push my_inport
          my_inport

        get_outport = (name, opts) ->
          my_outport = outport(opts)
          myself[name] = my_outport
          my_outport

        context = null # will fill below

        run_virtual_loop = (loop_fun) ->
          inport_handler =
            onPost: (mb) ->
              # TBD should the same context be given again ??
              loop_fun context

          for i in inports
            i.setListener null # prevent a possible exception
            i.setListener inport_handler

        context =
          inport: get_inport
          outport: get_outport
          runVirtualLoop: run_virtual_loop
          # XXX legacy (will go away):
          inbox: get_inport
          outbox: get_outport

        fun context

        myself.withInputs = (connections) ->
          for name in inport_names
            if !!connections[name]
              connections[name].setRecipient inport_map[name]

          return myself

        return myself

## export

    module.exports = component

#### vim: set ft=coffee :

