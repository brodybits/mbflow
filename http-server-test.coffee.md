# HTTP server test

#### Import(s)

    httpServer = require('./httpServer.js')

    flowbox = require('./flowbox.js')

#### Constant(s):

    PORT = 8080

#### HTTP server instance

    mysrv = httpServer()

#### App HTTP handler

    my_inbox = flowbox()

    myListener =
      onPost: (mb) ->
        m = mb.get()
        m.res.end 'Response from URL: ' + m.req.url + '\n'
        return

    my_inbox.setListener myListener

    mysrv.http_out.setRecipient my_inbox

#### App Log handler

    log_inbox = flowbox()

    logListener =
      onPost: (mb) ->
        s = mb.get()
        console.log s
        return

    log_inbox.setListener logListener

    mysrv.log_out.setRecipient log_inbox

#### Run the HTTP server

    mysrv.run_trigger.post { port: PORT }

#### vim: set ft=coffee :

