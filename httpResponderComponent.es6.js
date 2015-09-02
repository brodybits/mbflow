var component = require('./component.js');

var httpResponderComponent = component((context) => {
  var contents_inbox = context.inport('contents_inbox', {inportType: 'inbox', flowStyle: 'inline'});
  var inbox = context.inport('inbox', {inportType: 'inbox', flowStyle: 'inline'});

  var contents = 'default data';

  context.runVirtualLoop((mycontext) => {
    if (contents_inbox.hasContents()) {
      contents = contents_inbox.get();
    }

    if (inbox.hasContents()) {
      var m = inbox.get();
      m.res.end(contents);
    }
  });

});

module.exports = httpResponderComponent;

