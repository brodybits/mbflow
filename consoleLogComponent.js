(function() {
  var component, consoleLogComponent;

  component = require('./component.js');

  consoleLogComponent = component(function(context) {
    var consoleLogListener, inbox;
    inbox = context.inbox('inbox');
    consoleLogListener = {
      onPost: function(mb) {
        var s;
        s = mb.get();
        console.log(s);
      }
    };
    inbox.setListener(consoleLogListener);
  });

  module.exports = consoleLogComponent;

}).call(this);
