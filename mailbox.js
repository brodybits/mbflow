(function() {
  var mailbox;

  mailbox = function() {
    var myself;
    myself = {};
    myself.full = false;
    myself.contents = null;
    myself.listener = null;
    myself.isFull = function() {
      return myself.full;
    };
    myself.setListener = function(l) {
      if (!!l && !!myself.listener) {
        throw new Error("mailbox already has a listener");
      }
      myself.listener = l;
      if (myself.full && myself.listener) {
        myself.listener.trigger(myself);
      }
      return l;
    };
    myself.put = function(message) {
      if (myself.full) {
        return false;
      } else {
        myself.contents = message;
        myself.full = true;
        if (myself.listener) {
          myself.listener.trigger(myself);
        }
        return true;
      }
    };
    myself.get = function() {
      var c;
      if (myself.full) {
        c = myself.contents;
        myself.contents = null;
        myself.full = false;
        return c;
      } else {
        return null;
      }
    };
    return myself;
  };

  module.exports = mailbox;

}).call(this);
