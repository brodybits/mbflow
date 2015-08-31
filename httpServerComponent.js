(function() {
  var component, http, httpServerComponent;

  http = require('http');

  component = require('./component.js');

  httpServerComponent = component(function(context) {
    var handleReq, http_out, log_out, mylog, runListener, run_trigger, srv;
    run_trigger = context.inbox('run_trigger');
    http_out = context.outbox('http_out');
    log_out = context.outbox('log_out');
    mylog = function(s) {
      if (!log_out.isBlocked()) {
        return log_out.post(s);
      }
    };
    handleReq = function(req, res) {
      mylog('Got request with url: ' + req.url);
      return http_out.post({
        req: req,
        res: res
      });
    };
    srv = http.createServer(handleReq);
    runListener = {
      onPost: function(mb) {
        var myport, opt;
        opt = mb.get();
        myport = opt.port;
        srv.listen(myport, function() {
          return mylog('SERVER is listening to port: ' + myport);
        });
      }
    };
    run_trigger.setListener(runListener);
  });

  module.exports = httpServerComponent;

}).call(this);
