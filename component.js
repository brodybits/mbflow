(function() {
  var component, flowbox, outbox;

  flowbox = require('./flowbox.js');

  outbox = require('./outbox.js');

  component = function(fun) {
    return function() {
      var flowboxes, get_inbox, get_outbox;
      flowboxes = {};
      get_inbox = function(name) {
        var inbox;
        inbox = flowbox();
        flowboxes[name] = inbox;
        return inbox;
      };
      get_outbox = function(name) {
        var my_outbox;
        my_outbox = outbox();
        flowboxes[name] = my_outbox;
        return my_outbox;
      };
      fun({
        inbox: get_inbox,
        outbox: get_outbox
      });
      return flowboxes;
    };
  };

  module.exports = component;

}).call(this);
