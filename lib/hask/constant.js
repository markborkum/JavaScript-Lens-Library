"use strict";

module.exports = function(Hask) {
  Hask.Constant = function(context) {
    return new Hask(function(a) {
      return new Hask(function(ar) {
        return ar.call(a);
      });
    });
  };

  Hask.Constant.getConstant = function(context) {
    return new Hask(function(arr) {
      return arr.call(Hask.id(context));
    });
  };

  Hask.Constant.contramap = function(context) {
    return Hask.pure(context).call(Hask.id(context));
  };

  Hask.Constant.fmap = function(context) {
    return Hask.pure(context).call(Hask.id(context));
  };

  Hask.Constant.pure = function(context) {
    return new Hask(function(b) {
      return new Hask(function(ar) {
        return ar.call(context.m.mempty(context));
      });
    });
  };

  Hask.Constant.ap = function(context) {
    return new Hask(function(arL) {
      return new Hask(function(arR) {
        return new Hask(function(ar) {
          return arL.call(function(aL) {
            return arR.call(function(aR) {
              return ar.call(context.m.mappend(context).call(aL).call(aR));
            });
          });
        });
      });
    });
  };
};
