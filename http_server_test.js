(function() {
  var handleReq, http, mailbox, mb, myListener, srv;

  http = require('http');

  mailbox = require('./mailbox.js');

  mb = mailbox();

  handleReq = function(req, res) {
    console.log('Got request with url: ' + req.url);
    return mb.put({
      url: req.url,
      req: req,
      res: res
    });
  };

  srv = http.createServer(handleReq);

  myListener = {
    trigger: function(mb) {
      var m;
      m = mb.get();
      return m.res.end('Response from URL: ' + m.req.url + '\n');
    }
  };

  mb.setListener(myListener);

  srv.listen(8080, function() {
    return console.log('SERVER is listening');
  });

}).call(this);
