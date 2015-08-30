(function() {
  var mailbox;

  mailbox = function() {
    var contents, full, get, isFull, listener, myself, put, setListener;
    myself = void 0;
    full = false;
    contents = null;
    listener = null;
    isFull = function() {
      return full;
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
        return false;
      } else {
        contents = message;
        full = true;
        if (listener) {
          listener.trigger(myself);
        }
        return true;
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
      setListener: setListener,
      put: put,
      get: get
    };
  };

  module.exports = mailbox;

}).call(this);
