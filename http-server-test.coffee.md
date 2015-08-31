# HTTP server test

#### Import(s)

    httpServer = require('./httpServer.js')

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

#### vim: set ft=coffee :

