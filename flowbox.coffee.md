# flowbox object

## Handles both message flow and program control flow

## flowbox object without 'new' or 'this' keywords

    flowbox = ->
      # *declare* self:
      myself = undefined

      # private local variables:
      full = false
      contents = null
      listener = null

      isFull = -> full

      hasListener = -> !!listener

      isBlocked = -> full or !listener

      setListener = (newListener) ->
        if !!newListener and !!listener then throw new Error "flowbox already has a listener"

        listener = newListener

        if full and listener then listener.onPost myself

        newListener

      post = (message) ->
        if full then throw new Error 'Cannot post: this flowbox is already full'
        contents = message
        full = true
        if listener then listener.onPost myself
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
        hasListener: hasListener
        isBlocked: isBlocked
        setListener: setListener
        post: post
        get: get

## export

    module.exports = flowbox

#### vim: set ft=coffee :

