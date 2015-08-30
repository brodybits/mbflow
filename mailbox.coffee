

class Mailbox
  constructor: ->
    @full = false
    @contents = null
    @listener = null

  isFull: -> @full

  setListener: (l) ->
    @listener = l

    if @full
      if @listener then @listener.trigger @

    l

  put: (message) ->
    if @full
      false
    else
      @contents = message
      @full = true
      if @listener then @listener.trigger @
      true

  get: ->
    if @full
      c = @contents
      @contents = null
      @full = false
      c
    else
      null

mailbox = -> new Mailbox

module.exports = mailbox

