# HTTP server object (without 'new' or 'this' keywords)

#### Import(s)

    http = require('http')

    flowbox = require('./flowbox.js')

#### HTTP server function

    httpServer = ->
      # run trigger flow-box:
      run_trigger = flowbox()

      # output flow mailboxes:
      http_out = flowbox()
      log_out = flowbox()

      # internal helper function(s):
      mylog = (s) -> if !log_out.isBlocked() then log_out.post s

      handleReq = (req, res) ->
        mylog 'Got request with url: ' + req.url
        http_out.post
          req: req
          res: res

      srv = http.createServer handleReq

      # add listen function:
      runListener =
        trigger: (mb) ->
          opt = mb.get()
          myport = opt.port
          srv.listen myport, ->
            mylog 'SERVER is listening to port: ' + myport
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

