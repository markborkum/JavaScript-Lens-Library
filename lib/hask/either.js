"use strict";

module.exports = function(Hask) {
  Hask.Either = function(context) {
    return new Hask(function(arbrr) {
      return arbrr.call(new Hask(function(a) {
        return new Hask(function(ar) {
          return new Hask(function(br) {
            return ar.call(a);
          });
        });
      })).call(new Hask(function(b) {
        return new Hask(function(ar) {
          return new Hask(function(br) {
            return br.call(b);
          });
        });
      }));
    });
  };

  Hask.Either.fmap = Hask.right;

  // Hask.Either.isLeft = function(context) {
  //   return new Hask(function(arbrr) {
  //     return arbrr.call(new Hask(function(a) {
  //       return true;
  //     })).call(new Hask(function(b) {
  //       return false;
  //     }));
  //   });
  // };
  //
  // Hask.Either.isRight = function(context) {
  //   return new Hask(function(arbrr) {
  //     return arbrr.call(new Hask(function(a) {
  //       return false;
  //     })).call(new Hask(function(b) {
  //       return true;
  //     }));
  //   });
  // };
};
