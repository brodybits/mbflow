# HTTP server test

#### Imports

    http = require('http')

    mailbox = require('./mailbox.js')

#### HTTP-out mailbox:

    mb = mailbox()

#### HTTP server

    handleReq = (req, res) ->
      console.log 'Got request with url: ' + req.url
      mb.put
        url: req.url
        req: req
        res: res

    srv = http.createServer handleReq

#### App HTTP handler

    myListener =
      trigger: (mb) ->
        m = mb.get()
        m.res.end 'Response from URL: ' + m.req.url + '\n'

    mb.setListener myListener

#### Run the HTTP server

    # NOTE: this must be done last since it will block:
    srv.listen 8080, -> console.log 'SERVER is listening'

#### ref: http://blog.modulus.io/build-your-first-http-server-in-nodejs

#### vim: set ft=coffee :

