# outbox object

#### Can be connected to an input flowbox on another component

    outbox = (opts) ->
      # private local variables:
      recipient = null

      # FUTURE TBD ???:
      #isFull = -> full

      if !!opts and !!opts.flowStyle and opts.flowStyle != 'inline'
        throw new Exception 'Only inline flow style is supported'

      hasRecipient = -> !!recipient

      isBlocked = -> !recipient or recipient.isBlocked()

      setRecipient = (newRecipient) ->
        if !!newRecipient and !!recipient then throw new Error 'outbox already has a recipient'
        if !!recipient and !recipient.get then throw new Error 'recipient does not support inbox get function'

        recipient = newRecipient

        # return:
        newRecipient

      post = (message) ->
        if isBlocked() then throw new Error 'Cannot post: this outbox is already full'
        recipient.post message
        return

      # return:
      hasRecipient: hasRecipient
      isBlocked: isBlocked
      setRecipient: setRecipient
      post: post

## export

    module.exports = outbox

#### vim: set ft=coffee :

