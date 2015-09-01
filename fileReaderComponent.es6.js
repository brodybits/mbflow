var component = require('./component.js');

var fs = require('fs');

var fileReaderComponent = component((context) => {
  var control_inbox = context.inbox('control_inbox');
  var outbox = context.outbox('outbox');

  context.runVirtualLoop((mycontext) => {
    var m = control_inbox.get();
    var filename = m.filename;

    // ref: http://code-maven.com/reading-a-file-with-nodejs
    fs.readFile(filename, 'utf8', (error, data) => {
      outbox.post(data);
    });
  });
});

module.exports = fileReaderComponent;

