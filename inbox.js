// Import(s)

var flowbox = require('./flowbox.js');

// Wrapper around flowbox

var inbox = function(opts) {
  return flowbox(opts);
};

// export

module.exports = inbox;

