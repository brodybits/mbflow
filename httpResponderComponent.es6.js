var component = require('./component.js');

var httpResponderComponent = component((context) => {
  var contents_inbox = context.inbox('contents_inbox');
  var inbox = context.inbox('inbox');

  var contents = 'default data';

  context.runVirtualLoop((mycontext) => {
    if (contents_inbox.isFull()) {
      contents = contents_inbox.get();
    }

    if (inbox.isFull()) {
      var m = inbox.get();
      m.res.end(contents);
    }
  });

});

module.exports = httpResponderComponent;

