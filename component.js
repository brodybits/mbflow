(function() {
  var component, flowbox, outbox;

  flowbox = require('./flowbox.js');

  outbox = require('./outbox.js');

  component = function(fun) {
    return function() {
      var context, flowboxes, get_inbox, get_outbox, inboxes, run_virtual_loop;
      flowboxes = {};
      inboxes = [];
      get_inbox = function(name) {
        var inbox;
        inbox = flowbox();
        flowboxes[name] = inbox;
        inboxes.push(inbox);
        return inbox;
      };
      get_outbox = function(name) {
        var my_outbox;
        my_outbox = outbox();
        flowboxes[name] = my_outbox;
        return my_outbox;
      };
      context = null;
      run_virtual_loop = function(loop_fun) {
        var i, inbox, inbox_handler, len, results;
        inbox_handler = {
          onPost: function(mb) {
            return loop_fun(context);
          }
        };
        results = [];
        for (i = 0, len = inboxes.length; i < len; i++) {
          inbox = inboxes[i];
          inbox.setListener(null);
          results.push(inbox.setListener(inbox_handler));
        }
        return results;
      };
      context = {
        inbox: get_inbox,
        outbox: get_outbox,
        runVirtualLoop: run_virtual_loop
      };
      fun(context);
      return flowboxes;
    };
  };

  module.exports = component;

}).call(this);
