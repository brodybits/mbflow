(function() {
  var component, http, httpServerComponent;

  http = require('http');

  component = require('./component.js');

  httpServerComponent = component(function(context) {
    var handleReq, http_out, listen_port_inbox, srv;
    listen_port_inbox = context.inbox('listen_port_inbox');
    http_out = context.outbox('http_out');
    handleReq = function(req, res) {
      console.log('Got request with url: ' + req.url);
      return http_out.post({
        req: req,
        res: res
      });
    };
    srv = http.createServer(handleReq);
    context.runVirtualLoop(function(context) {
      var myport, opt;
      opt = listen_port_inbox.get();
      myport = opt.port;
      srv.listen(myport, function() {
        console.log('SERVER is listening to port: ' + myport);
      });
    });
  });

  module.exports = httpServerComponent;

}).call(this);
