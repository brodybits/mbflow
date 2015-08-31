# HTTP server component object (without 'new' or 'this' keywords)

#### Import(s)

    http = require('http')

    component = require('./component.js')

#### HTTP server function

    httpServerComponent = component (context) ->
      # run trigger flow-box:
      run_trigger = context.inbox('run_trigger')

      # output flow mailboxes:
      http_out = context.outbox('http_out')
      log_out = context.outbox('log_out')

      # internal helper function(s):
      mylog = (s) -> if !log_out.isBlocked() then log_out.post s

      handleReq = (req, res) ->
        mylog 'Got request with url: ' + req.url
        http_out.post
          req: req
          res: res

      srv = http.createServer handleReq

      context.runVirtualLoop (context) ->
        opt = run_trigger.get()
        myport = opt.port
        srv.listen myport, ->
          mylog 'SERVER is listening to port: ' + myport


## export

    module.exports = httpServerComponent

#### ref: http://blog.modulus.io/build-your-first-http-server-in-nodejs

#### vim: set ft=coffee :

