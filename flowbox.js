(function() {
  var flowbox;

  flowbox = function() {
    var contents, full, get, hasListener, isBlocked, isFull, listener, myself, post, setListener;
    myself = void 0;
    full = false;
    contents = null;
    listener = null;
    isFull = function() {
      return full;
    };
    hasListener = function() {
      return !!listener;
    };
    isBlocked = function() {
      return full || !listener;
    };
    setListener = function(newListener) {
      if (!!newListener && !!listener) {
        throw new Error("flowbox already has a listener");
      }
      listener = newListener;
      if (full && listener) {
        listener.trigger(myself);
      }
      return newListener;
    };
    post = function(message) {
      if (full) {
        throw new Error('Cannot post: flowbox is already full');
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
      hasListener: hasListener,
      isBlocked: isBlocked,
      setListener: setListener,
      post: post,
      get: get
    };
  };

  module.exports = flowbox;

}).call(this);
