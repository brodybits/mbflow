(function() {
  var component, inport, outport;

  inport = require('./inport.js');

  outport = require('./outport.js');

  component = function(fun) {
    return function() {
      var context, get_inport, get_outport, inport_map, inport_names, inports, myself, run_virtual_loop;
      myself = {};
      inport_map = {};
      inport_names = [];
      inports = [];
      get_inport = function(name, opts) {
        var my_inport;
        my_inport = inport(opts);
        myself[name] = my_inport;
        inport_map[name] = my_inport;
        inport_names.push(name);
        inports.push(my_inport);
        return my_inport;
      };
      get_outport = function(name, opts) {
        var my_outport;
        my_outport = outport(opts);
        myself[name] = my_outport;
        return my_outport;
      };
      context = null;
      run_virtual_loop = function(loop_fun) {
        var i, inport_handler, j, len, results;
        inport_handler = {
          onPost: function(mb) {
            return loop_fun(context);
          }
        };
        results = [];
        for (j = 0, len = inports.length; j < len; j++) {
          i = inports[j];
          i.setListener(null);
          results.push(i.setListener(inport_handler));
        }
        return results;
      };
      context = {
        inport: get_inport,
        outport: get_outport,
        runVirtualLoop: run_virtual_loop,
        inbox: get_inport,
        outbox: get_outport
      };
      fun(context);
      myself.withInputs = function(connections) {
        var j, len, name;
        for (j = 0, len = inport_names.length; j < len; j++) {
          name = inport_names[j];
          if (!!connections[name]) {
            connections[name].setRecipient(inport_map[name]);
          }
        }
        return myself;
      };
      return myself;
    };
  };

  module.exports = component;

}).call(this);
