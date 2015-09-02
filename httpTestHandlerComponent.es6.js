var component = require('./component.js');

var httpTestHandlerComponent = component((context) => {
  var inbox = context.inport('inbox', {inportType: 'inbox', flowStyle: 'inline'});

  context.runVirtualLoop((mycontext) => {
    var m = inbox.get();
    m.res.end('Response from URL: ' + m.req.url + '\n');
  });

});

module.exports = httpTestHandlerComponent;

