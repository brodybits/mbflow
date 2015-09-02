// Import(s)

var outbox = require('./outbox.js');

// Wrapper around flowbox (FUTURE TBD flowbox may be renamed to inport)

var outport = function(opts) {
  if (!!opts && !!opts.outportType && opts.outportType != 'outbox')
    throw new Exception('Invalid inport type');

  return outbox(opts);
};

// export

module.exports = outport;

