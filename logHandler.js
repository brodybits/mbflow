(function() {
  var flowbox, http, logHandler, outbox;

  http = require('http');

  flowbox = require('./flowbox.js');

  outbox = require('./outbox.js');

  logHandler = function() {
    var inbox, logListener;
    inbox = flowbox();
    logListener = {
      onPost: function(mb) {
        var s;
        s = mb.get();
        console.log(s);
      }
    };
    inbox.setListener(logListener);
    return {
      inbox: inbox
    };
  };

  module.exports = logHandler;

}).call(this);
