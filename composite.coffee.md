# composite object


## Import(s)

    # XXX TBD ???:
    component = require('./component.js')

## XXX TODO ERROR CHECKING

## composite object function

    composite = (components, spec) ->
      # FUTURE TBD in a registry object instead?
      mycomponents = {}
      for n of components
        mycomponents[n] = components[n]

      myspec = {}

      for s of spec
        # may be multiple:
        #console.log 'spec entry: ' + s

        for c of spec[s]
          # only once per spec item:
          if !mycomponents[c] then throw new Exception 'No such component ' + c
          mycomponent = mycomponents[c]()
          myspec[s] = mycomponent

          for i of spec[s][c]
            # may be multiple:
            #console.log 'spec entry input: ' + i

            for f of spec[s][c][i]
              # only once:
              #console.log 'spec entry input from: ' + f
              outbox = spec[s][c][i][f]
              #console.log 'spec entry input from outbox: ' + outbox
              myspec[f][outbox].setRecipient mycomponent[i]
              break

          break

      myspec

## export

    module.exports = composite

#### vim: set ft=coffee :

