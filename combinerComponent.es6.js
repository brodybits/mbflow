var component = require('./component.js');

var combinerComponent = component((context) => {
  var a_inbox = context.inbox('a_inbox');
  var b_inbox = context.inbox('b_inbox');
  var outbox = context.outbox('outbox');

  var count = 0;

  context.runVirtualLoop((mycontext) => {
    if (a_inbox.hasContents()) {
      var m = a_inbox.get();
      outbox.post(m);
    }

    if (b_inbox.hasContents()) {
      var m = b_inbox.get();
      outbox.post(m);
    }
  });
});

module.exports = combinerComponent;

