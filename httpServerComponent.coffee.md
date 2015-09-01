# HTTP server component object (without 'new' or 'this' keywords)

#### Import(s)

    http = require('http')

    component = require('./component.js')

#### HTTP server function

    httpServerComponent = component (context) ->
      # input:
      listen_port_inbox = context.inbox('run_trigger')

      # output:
      http_out = context.outbox('http_out')

      handleReq = (req, res) ->
        console.log 'Got request with url: ' + req.url
        http_out.post
          req: req
          res: res

      srv = http.createServer handleReq

      context.runVirtualLoop (context) ->
        opt = listen_port_inbox.get()
        myport = opt.port
        srv.listen myport, ->
          console.log 'SERVER is listening to port: ' + myport
          return

        return

      # XXX TODO need a way to stop a HTTP server listener!

      return

## export

    module.exports = httpServerComponent

#### ref: http://blog.modulus.io/build-your-first-http-server-in-nodejs

#### vim: set ft=coffee :

