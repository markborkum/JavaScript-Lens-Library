"use strict";

class Hask {
  constructor(fn) {
    if (fn instanceof Function) {
      switch (fn.length) {
        case 1:
          this.fn = fn;

          break;
        default:
          throw new Error("fn.length !== 1");
      }
    } else {
      throw new TypeError("fn");
    }
  }

  call() {
    switch (arguments.length) {
      case 1:
        return this.fn.apply(this, arguments);
      default:
        throw new Error("arguments.length !== 1");
    }
  }

  static id(context) {
    return new Hask(function(a) {
      return a;
    });
  }

  static compose(context) {
    return new Hask(function(bc) {
      return new Hask(function(ab) {
        return new Hask(function(a) {
          return bc.call(ab.call(a));
        });
      });
    });
  }

  static dimap(context) {
    return new Hask(function(sa) {
      return new Hask(function(bt) {
        return new Hask(function(ab) {
          return Hask.compose(context).call(Hask.compose(context).call(bt).call(ab)).call(sa);
        });
      });
    });
  }

  static lmap(context) {
    return new Hask(function(sa) {
      return Hask.dimap(context).call(sa).call(Hask.id(context));
    });
  }

  static rmap(context) {
    return Hask.dimap(context).call(Hask.id(context));
  }

  static first(context) {
    return new Hask(function(ab) {
      return new Hask(function(__a_c__) {
        return __a_c__.call(Hask.compose(context).call(Hask.Tuple(context)).call(ab));
      });
    });
  }

  static second(context) {
    return new Hask(function(ab) {
      return new Hask(function(__c_a__) {
        return __c_a__.call(new Hask(function(c) {
          return Hask.compose(context).call(Hask.Tuple(context).call(c)).call(ab);
        }));
      });
    });
  }

  static left(context) {
    return new Hask(function(ab) {
      return new Hask(function(eac) {
        return Hask.Either(context).call(new Hask(function(Left) {
          return eac.call(Hask.compose(context).call(Left).call(ab));
        }));
      });
    });
  }

  static right(context) {
    return new Hask(function(ab) {
      return new Hask(function(eca) {
        return Hask.Either(context).call(new Hask(function(Left) {
          return new Hask(function(Right) {
            return eca.call(Left).call(Hask.compose(context).call(Right).call(ab));
          });
        }));
      });
    });
  }

  static fmap(context) {
    return Hask.compose(context);
  }

  static pure(context) {
    return new Hask(function(a) {
      return new Hask(function(r) {
        return a;
      });
    });
  }

  static ap(context) {
    return new Hask(function(rab) {
      return new Hask(function(ra) {
        return new Hask(function(r) {
          return rab.call(r).call(ra.call(r));
        });
      });
    });
  }
}

[
  "./constant",
  "./either",
  "./identity",
  "./tuple",
  "./unit",
].map(function(file) {
  return require(file);
}).forEach(function(callback) {
  callback(Hask);
});

module.exports = Hask;
