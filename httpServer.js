(function() {
  var flowbox, http, httpServer;

  http = require('http');

  flowbox = require('./flowbox.js');

  httpServer = function() {
    var handleReq, http_out, log_out, mylog, runListener, run_trigger, srv;
    run_trigger = flowbox();
    http_out = flowbox();
    log_out = flowbox();
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
    runListener = {
      trigger: function(mb) {
        var myport;
        myport = mb.get();
        srv.listen(myport, function() {
          return mylog('SERVER is listening');
        });
      }
    };
    run_trigger.setListener(runListener);
    return {
      run_trigger: run_trigger,
      http_out: http_out,
      log_out: log_out
    };
  };

  module.exports = httpServer;

}).call(this);
