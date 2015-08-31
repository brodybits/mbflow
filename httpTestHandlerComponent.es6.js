var component = require('./component.js');

var httpTestHandlerComponent = component((context) => {
  var inbox = context.inbox('inbox');

  inbox.setListener({
    onPost: (mb) => {
      var m = mb.get();
      m.res.end('Response from URL: ' + m.req.url + '\n');
    }
  });

});

module.exports = httpTestHandlerComponent;

