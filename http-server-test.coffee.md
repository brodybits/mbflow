# HTTP server test

#### Imports

    http = require('http')

    mailbox = require('./mailbox.js')

#### Constants:

    PORT = 8080

#### HTTP-out mailbox:

    mb = mailbox()

#### HTTP server

    handleReq = (req, res) ->
      console.log 'Got request with url: ' + req.url
      mb.put
        req: req
        res: res

    srv = http.createServer handleReq

    # BLOCKING:
    runServer = ->
      srv.listen PORT, -> console.log 'SERVER is listening'

#### App HTTP handler

    myListener =
      trigger: (mb) ->
        m = mb.get()
        m.res.end 'Response from URL: ' + m.req.url + '\n'
        return

    mb.setListener myListener

#### Run the HTTP server

    runServer()

#### ref: http://blog.modulus.io/build-your-first-http-server-in-nodejs

#### vim: set ft=coffee :

