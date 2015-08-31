# HTTP server test

#### Import(s)

    httpFlowboxServer = require('./httpFlowboxServer.js')
    httpTestFlowboxHandler = require('./httpTestFlowboxHandler.es6.js')
    logFlowboxHandler = require('./logFlowboxHandler.js')

    flowbox = require('./flowbox.js')

#### Constant(s):

    PORT = 8080

#### HTTP server instance

    mysrv = httpFlowboxServer()

#### App HTTP handler

    http_handler = httpTestFlowboxHandler()

    mysrv.http_out.setRecipient http_handler.inbox

#### App Log handler

    log_handler = logFlowboxHandler()

    mysrv.log_out.setRecipient log_handler.inbox

#### Run the HTTP server

    mysrv.run_trigger.post { port: PORT }

#### vim: set ft=coffee :

