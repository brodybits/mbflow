(function() {
  var PORT, http, httpServer, mailbox;

  http = require('http');

  mailbox = require('./mailbox.js');

  PORT = 8080;

  httpServer = function() {
    var handleReq, http_out, log_out, mylog, runServer, srv;
    http_out = mailbox();
    log_out = mailbox();
    mylog = function(s) {
      if (!log_out.isBlocked()) {
        return log_out.put(s);
      }
    };
    handleReq = function(req, res) {
      mylog('Got request with url: ' + req.url);
      return http_out.put({
        req: req,
        res: res
      });
    };
    srv = http.createServer(handleReq);
    runServer = function() {
      return srv.listen(PORT, function() {
        return mylog('SERVER is listening');
      });
    };
    return {
      http_out: http_out,
      log_out: log_out,
      runServer: runServer
    };
  };

  module.exports = httpServer;

}).call(this);
