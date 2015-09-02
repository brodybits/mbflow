# HTTP server component object (without 'new' or 'this' keywords)

#### Import(s)

    http = require('http')

    component = require('./component.js')

#### HTTP server function

    httpServerComponent = component (context) ->
      # input:
      listen_port_inbox = context.inport('listen_port_inbox', {inportType: 'inbox', flowStyle: 'inline'})

      # output:
      http_out = context.outport('http_out', {outportType: 'outbox', flowStyle: 'inline'})

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

      # XXX TODO needs a way to stop a HTTP server listener!

      return

## export

    module.exports = httpServerComponent

#### ref: http://blog.modulus.io/build-your-first-http-server-in-nodejs

#### vim: set ft=coffee :

