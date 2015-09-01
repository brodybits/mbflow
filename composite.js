(function() {
  var component, composite;

  component = require('./component.js');

  composite = function(components, spec) {
    var c, f, i, mycomponent, mycomponents, myspec, n, outbox, s;
    mycomponents = {};
    for (n in components) {
      mycomponents[n] = components[n];
    }
    myspec = {};
    for (s in spec) {
      for (c in spec[s]) {
        mycomponent = mycomponents[c]();
        myspec[s] = mycomponent;
        for (i in spec[s][c]) {
          for (f in spec[s][c][i]) {
            outbox = spec[s][c][i][f];
            myspec[f][outbox].setRecipient(mycomponent[i]);
            break;
          }
        }
        break;
      }
    }
    return myspec;
  };

  module.exports = composite;

}).call(this);
