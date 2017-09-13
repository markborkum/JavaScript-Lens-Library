"use strict";

module.exports = function(Hask) {
  Hask.Identity = function(context) {
    return new Hask(function(a) {
      return new Hask(function(ar) {
        return ar.call(a);
      });
    });
  };

  Hask.Identity.runIdentity = function(context) {
    return new Hask(function(arr) {
      return arr.call(Hask.id(context));
    });
  };

  Hask.Identity.fmap = function(context) {
    return new Hask(function(ab) {
      return new Hask(function(arr) {
        return new Hask(function(br) {
          return arr.call(Hask.compose(context).call(br).call(ab));
        });
      });
    });
  };

  Hask.Identity.pure = Hask.Identity;

  Hask.Identity.ap = function(context) {
    return new Hask(function(abr) {
      return new Hask(function(ar) {
        return new Hask(function(br) {
          return abr.call(Hask.compose(context).call(ar).call(Hask.compose(context).call(br)));
        });
      });
    });
  };
};
