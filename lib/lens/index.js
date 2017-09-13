"use strict";

module.exports = (function() {
  const Hask = require("../hask");
  const Optic = require("./optic");

  const lens = {
    Optic: Optic,

    iso: function(sa, bt) {
      return Optic.iso(new Hask(sa), new Hask(bt));
    },

    lens: function(sa, sbt) {
      return Optic.lens(new Hask(sa), new Hask(function(s) {
        return new Hask(function(b) {
          return sbt(s, b);
        });
      }));
    },

    prism: function(seta, bt) {
      const context = {};

      return Optic.prism(new Hask(function(s) {
        return Hask.Either(context).call(new Hask(function(Left) {
          return new Hask(function(Right) {
            return seta(s)(function(t) {
              return Left.call(t);
            }, function(a) {
              return Right.call(a);
            });
          });
        }));
      }), new Hask(bt));
    },

    to: function(sa) {
      return Optic.to(new Hask(sa));
    },
  };

  lens.prism_ = function(sma, bs) {
    return lens.prism(function(s) {
      return function(createLeft, createRight) {
        return sma(s)(function() {
          return createLeft(s);
        }, createRight);
      };
    }, bs);
  };

  lens._Either = lens.iso(function(either) {
    return new Hask(function(ar) {
      return new Hask(function(br) {
        return either(function(a) {
          return ar.call(a);
        }, function(b) {
          return br.call(b);
        });
      });
    });
  }, function(arbrr) {
    return function(createLeft, createRight) {
      return arbrr.call(new Hask(function(a) {
        return createLeft(a);
      })).call(new Hask(function(b) {
        return createRight(b);
      }));
    };
  });

  lens._Tuple = lens.iso(function(tuple) {
    return tuple(function(a, b) {
      return new Hask(function(abr) {
        return abr.call(a).call(b);
      });
    });
  }, function(abrr) {
    return function(createTuple) {
      return abrr.call(new Hask(function(a) {
        return new Hask(function(b) {
          return createTuple(a, b);
        });
      }));
    };
  });

  lens._1 = lens.lens(function(tuple) {
    return tuple(function(a, b) {
      return a;
    });
  }, function(tuple, a) {
    return tuple(function(_, b) {
      return function(createTuple) {
        return createTuple(a, b);
      };
    });
  });

  lens._2 = lens.lens(function(tuple) {
    return tuple(function(a, b) {
      return b;
    });
  }, function(tuple, b) {
    return tuple(function(a, _) {
      return function(createTuple) {
        return createTuple(a, b);
      };
    });
  });

  lens._Left = lens.prism_(function(either) {
    return function(createNothing, createJust) {
      return either(createJust, function(b) {
        return createNothing();
      });
    };
  }, function(a) {
    return function(createLeft, createRight) {
      return createLeft(a);
    };
  });

  lens._Right = lens.prism_(function(either) {
    return function(createNothing, createJust) {
      return either(function(a) {
        return createNothing();
      }, createJust);
    };
  }, function(a) {
    return function(createLeft, createRight) {
      return createRight(a);
    };
  });

  return lens;
})();
