var component = require('./component.js');

var httpTestHandlerComponent2 = component((context) => {
  var inbox = context.inbox('inbox');

  context.runVirtualLoop((mycontext) => {
    var m = inbox.get();
    m.res.end('Response from URL on port 8080: ' + m.req.url + '\n');
  });

});

module.exports = httpTestHandlerComponent2;

