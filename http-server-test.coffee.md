# HTTP server test

#### Import(s)

    httpServer = require('./httpServer.js')

#### Constant(s):

    PORT = 8080

#### HTTP server instance

    mysrv = httpServer()

#### App HTTP handler

    myListener =
      onPost: (mb) ->
        m = mb.get()
        m.res.end 'Response from URL: ' + m.req.url + '\n'
        return

    mysrv.http_out.setListener myListener

#### App Log handler

    logListener =
      onPost: (mb) ->
        s = mb.get()
        console.log s
        return

    mysrv.log_out.setListener logListener

#### Run the HTTP server

    mysrv.run_trigger.post { port: PORT }

#### vim: set ft=coffee :

