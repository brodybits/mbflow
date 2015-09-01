(function() {
  var component, flowbox, outbox;

  flowbox = require('./flowbox.js');

  outbox = require('./outbox.js');

  component = function(fun) {
    return function() {
      var context, get_inbox, get_outbox, inbox_map, inbox_names, inboxes, myself, run_virtual_loop;
      myself = {};
      inbox_map = {};
      inbox_names = [];
      inboxes = [];
      get_inbox = function(name) {
        var inbox;
        inbox = flowbox();
        myself[name] = inbox;
        inbox_map[name] = inbox;
        inbox_names.push(name);
        inboxes.push(inbox);
        return inbox;
      };
      get_outbox = function(name) {
        var my_outbox;
        my_outbox = outbox();
        myself[name] = my_outbox;
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
      myself.withInputs = function(connections) {
        var i, len, name;
        for (i = 0, len = inbox_names.length; i < len; i++) {
          name = inbox_names[i];
          if (!!connections[name]) {
            connections[name].setRecipient(inbox_map[name]);
          }
        }
        return myself;
      };
      return myself;
    };
  };

  module.exports = component;

}).call(this);
