# mailbox object

## mailbox object without 'new' or 'this' keywords

    mailbox = ->
      # *declare* self:
      myself = undefined

      # private local variables:
      full = false
      contents = null
      listener = null

      isFull = -> full

      # FUTURE TBD:
      #hasListener = -> !!listener

      isBlocked = -> full or !listener

      setListener = (newListener) ->
        if !!newListener and !!listener then throw new Error "mailbox already has a listener"

        listener = newListener

        if full and listener then listener.trigger myself

        newListener

      put = (message) ->
        if full then throw new Error 'Cannot put: mail-box is already full'
        contents = message
        full = true
        if listener then listener.trigger myself
        return

      get = ->
        if full
          c = contents
          contents = null
          full = false
          c
        else
          null

      # store and return my self reference:
      myself =
        isFull: isFull
        isBlocked: isBlocked
        setListener: setListener
        put: put
        get: get

## export

    module.exports = mailbox

#### vim: set ft=coffee :

