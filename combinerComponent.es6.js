var component = require('./component.js');

var combinerComponent = component((context) => {
  var a_inbox = context.inport('a_inbox', {inportType: 'inbox', flowStyle: 'inline'});
  var b_inbox = context.inport('b_inbox', {inportType: 'inbox', flowStyle: 'inline'});
  var outbox = context.outport('outbox', {outportType: 'outbox', flowStyle: 'inline'});

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

