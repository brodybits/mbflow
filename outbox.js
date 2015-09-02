(function() {
  var outbox;

  outbox = function() {
    var hasRecipient, isBlocked, post, recipient, setRecipient;
    recipient = null;
    hasRecipient = function() {
      return !!recipient;
    };
    isBlocked = function() {
      return !recipient || recipient.isBlocked();
    };
    setRecipient = function(newRecipient) {
      if (!!newRecipient && !!recipient) {
        throw new Error("outbox already has a recipient");
      }
      recipient = newRecipient;
      return newRecipient;
    };
    post = function(message) {
      if (isBlocked()) {
        throw new Error('Cannot post: this outbox is already full');
      }
      recipient.post(message);
    };
    return {
      hasRecipient: hasRecipient,
      isBlocked: isBlocked,
      setRecipient: setRecipient,
      post: post
    };
  };

  module.exports = outbox;

}).call(this);
