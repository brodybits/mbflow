(function() {
  var flowbox, logFlowboxHandler, outbox;

  flowbox = require('./flowbox.js');

  outbox = require('./outbox.js');

  logFlowboxHandler = function() {
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

  module.exports = logFlowboxHandler;

}).call(this);
