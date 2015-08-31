# HTTP server object (without 'new' or 'this' keywords)

#### Import(s)

    http = require('http')

    mailbox = require('./mailbox.js')

#### Constants:

    PORT = 8080

#### HTTP server function

    httpServer = ->
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

      # BLOCKING listen function:
      runServer = ->
        srv.listen PORT, -> mylog 'SERVER is listening'

      # returns:
      http_out: http_out
      log_out: log_out
      runServer: runServer

## export

    module.exports = httpServer

#### ref: http://blog.modulus.io/build-your-first-http-server-in-nodejs

#### vim: set ft=coffee :

