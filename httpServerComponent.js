(function() {
  var component, http, httpServerComponent;

  http = require('http');

  component = require('./component.js');

  httpServerComponent = component(function(context) {
    var handleReq, http_out, log_out, mylog, run_trigger, srv;
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
    return context.runVirtualLoop(function(context) {
      var myport, opt;
      opt = run_trigger.get();
      myport = opt.port;
      return srv.listen(myport, function() {
        return mylog('SERVER is listening to port: ' + myport);
      });
    });
  });

  module.exports = httpServerComponent;

}).call(this);
