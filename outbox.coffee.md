# outbox object

#### Can be connected to an input flowbox on another component

    outbox = ->
      # private local variables:
      recipient = null

      # FUTURE TBD ???:
      #isFull = -> full

      hasRecipient = -> !!recipient

      isBlocked = -> !recipient or recipient.isBlocked()

      setRecipient = (newRecipient) ->
        if !!newRecipient and !!recipient then throw new Error "outbox already has a recipient"

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

