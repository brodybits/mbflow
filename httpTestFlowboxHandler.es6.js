var flowbox = require('./flowbox.js');

var httpTestFlowboxHandler = () => {
  var inbox = flowbox();

  var myListener = {
    onPost: (mb) => {
      var m = mb.get();
      m.res.end('Response from URL: ' + m.req.url + '\n');
    }
  };

  inbox.setListener(myListener);

  return {
    inbox: inbox
  };
};

module.exports = httpTestFlowboxHandler;

