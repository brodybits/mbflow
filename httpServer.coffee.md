# HTTP server object (without 'new' or 'this' keywords)

#### Import(s)

    http = require('http')

    mailbox = require('./mailbox.js')

#### HTTP server function

    httpServer = ->
      # run trigger mailbox:
      run_trigger = mailbox()

      # output mailboxes:
      http_out = mailbox()
      log_out = mailbox()

      # internal helper function(s):
      mylog = (s) -> if !log_out.isBlocked() then log_out.put s

      handleReq = (req, res) ->
        mylog 'Got request with url: ' + req.url
        http_out.put
          req: req
          res: res

      srv = http.createServer handleReq

      # add listen function:
      runListener =
        trigger: (mb) ->
          myport = mb.get()
          srv.listen myport, -> mylog 'SERVER is listening'
          return
      run_trigger.setListener runListener

      # returns:
      run_trigger: run_trigger
      http_out: http_out
      log_out: log_out

## export

    module.exports = httpServer

#### ref: http://blog.modulus.io/build-your-first-http-server-in-nodejs

#### vim: set ft=coffee :

