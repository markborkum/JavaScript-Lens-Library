"use strict";

module.exports = function(Hask) {
  Hask.Tuple = function(context) {
    return new Hask(function(a) {
      return new Hask(function(b) {
        return new Hask(function(abr) {
          return abr.call(a).call(b);
        });
      });
    });
  };

  Hask.Tuple.fmap = Hask.second;
};
