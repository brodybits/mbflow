(function() {
  var component, consoleLogComponent;

  component = require('./component.js');

  consoleLogComponent = component(function(context) {
    var inbox;
    inbox = context.inbox('inbox');
    return context.runVirtualLoop(function(context) {
      var s;
      s = inbox.get();
      console.log(s);
    });
  });

  module.exports = consoleLogComponent;

}).call(this);
