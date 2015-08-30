(function() {
  var mailbox;

  mailbox = function() {
    var contents, full, get, isBlocked, isFull, listener, myself, put, setListener;
    myself = void 0;
    full = false;
    contents = null;
    listener = null;
    isFull = function() {
      return full;
    };
    isBlocked = function() {
      return full || !listener;
    };
    setListener = function(newListener) {
      if (!!newListener && !!listener) {
        throw new Error("mailbox already has a listener");
      }
      listener = newListener;
      if (full && listener) {
        listener.trigger(myself);
      }
      return newListener;
    };
    put = function(message) {
      if (full) {
        throw new Error('Cannot put: mail-box is already full');
      }
      contents = message;
      full = true;
      if (listener) {
        listener.trigger(myself);
      }
    };
    get = function() {
      var c;
      if (full) {
        c = contents;
        contents = null;
        full = false;
        return c;
      } else {
        return null;
      }
    };
    return myself = {
      isFull: isFull,
      isBlocked: isBlocked,
      setListener: setListener,
      put: put,
      get: get
    };
  };

  module.exports = mailbox;

}).call(this);
