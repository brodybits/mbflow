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
        #console.log 'found component name: ' + n
        mycomponents[n] = components[n]

      myspec = {}

      for s of spec
        # may be multiple:
        #console.log 'spec entry: ' + s

        for c of spec[s]
          # only once per spec item:
          #console.log 'spec entry component: ' + c
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

