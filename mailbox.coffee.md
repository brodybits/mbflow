# mailbox object

## mailbox object without 'new' or 'this' keywords

    mailbox = ->

      myself = {}

      myself.full = false
      myself.contents = null
      myself.listener = null

      myself.isFull = -> myself.full

      myself.setListener = (l) ->
        if !!l and !!myself.listener then throw new Error "mailbox already has a listener"

        myself.listener = l

        if myself.full and myself.listener then myself.listener.trigger myself

        l

      myself.put = (message) ->
        if myself.full
          false
        else
          myself.contents = message
          myself.full = true
          if myself.listener then myself.listener.trigger myself
          true

      myself.get = ->
        if myself.full
          c = myself.contents
          myself.contents = null
          myself.full = false
          c
        else
          null

      return myself

## export

    module.exports = mailbox

#### vim: set ft=coffee :

