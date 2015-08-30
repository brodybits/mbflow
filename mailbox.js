(function() {
  var Mailbox, mailbox;

  Mailbox = (function() {
    function Mailbox() {
      this.full = false;
      this.contents = null;
      this.listener = null;
    }

    Mailbox.prototype.isFull = function() {
      return this.full;
    };

    Mailbox.prototype.setListener = function(l) {
      this.listener = l;
      if (this.full) {
        if (this.listener) {
          this.listener.trigger(this);
        }
      }
      return l;
    };

    Mailbox.prototype.put = function(message) {
      if (this.full) {
        return false;
      } else {
        this.contents = message;
        this.full = true;
        if (this.listener) {
          this.listener.trigger(this);
        }
        return true;
      }
    };

    Mailbox.prototype.get = function() {
      var c;
      if (this.full) {
        c = this.contents;
        this.contents = null;
        this.full = false;
        return c;
      } else {
        return null;
      }
    };

    return Mailbox;

  })();

  mailbox = function() {
    return new Mailbox;
  };

  module.exports = mailbox;

}).call(this);
