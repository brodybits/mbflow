# HTTP server test

#### Imports

    http = require('http')

    mailbox = require('./mailbox.js')

#### Constants:

    PORT = 8080

#### HTTP server function

    httpServer = ->
      http_out = mailbox()
      log_out = mailbox()

      mylog = (s) -> if !log_out.isBlocked() then log_out.put s

      handleReq = (req, res) ->
        mylog 'Got request with url: ' + req.url
        http_out.put
          req: req
          res: res

      srv = http.createServer handleReq

      # BLOCKING:
      runServer = ->
        srv.listen PORT, -> mylog 'SERVER is listening'

      # return
      http_out: http_out
      log_out: log_out
      runServer: runServer

#### HTTP server instance

    mysrv = httpServer()

#### App HTTP handler

    myListener =
      trigger: (mb) ->
        m = mb.get()
        m.res.end 'Response from URL: ' + m.req.url + '\n'
        return

    mysrv.http_out.setListener myListener

#### App Log handler

    logListener =
      trigger: (mb) ->
        s = mb.get()
        console.log s
        return

    mysrv.log_out.setListener logListener

#### Run the HTTP server

    mysrv.runServer()

#### ref: http://blog.modulus.io/build-your-first-http-server-in-nodejs

#### vim: set ft=coffee :

