// Import(s)

var inbox = require('./inbox.js');

// Wrapper around flowbox (FUTURE TBD flowbox may be renamed to inport)

var inport = function(opts) {
  if (!!opts && !!opts.inportType && opts.inportType != 'inbox' && opts.portType != 'flowbox')
    throw new Exception('Invalid inport type');

  return inbox(opts);
};

// export

module.exports = inport;

