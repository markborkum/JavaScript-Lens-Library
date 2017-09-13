"use strict";

const Exchange = require("./exchange");
const Hask = require("../hask");
const Market = require("./market");
const Pierce = require("./pierce");

class Optic {
  constructor(callback) {
    this.callback = callback;
  }

  static id() {
    return new Optic(Hask.id);
  }

  static compose() {
    return Array.prototype.slice.call(arguments).reduce(function(accumulator, currentOptic, currentIndex) {
      if (currentOptic instanceof Optic) {
        return new Optic(function(context) {
          return Hask.compose(context).call(accumulator.callback(context)).call(currentOptic.callback(context));
        });
      } else {
        throw new TypeError("arguments[" + String(currentIndex) + "]");
      }
    }, Optic.id());
  }

  static iso(sa, bt) {
    return new Optic(function(context) {
      return context.p.dimap(context).call(sa).call(context.f.fmap(context).call(bt));
    });
  }

  static lens(sa, sbt) {
    return new Optic(function(context) {
      return Hask.compose(context).call(context.p.dimap(context).call(new Hask(function(s) {
        return Hask.Tuple(context).call(s).call(sa.call(s));
      })).call(new Hask(function(__s_fb__) {
        return __s_fb__.call(Hask.compose(context).call(context.f.fmap(context)).call(sbt));
      }))).call(context.p.second(context));
    });
  }

  static prism(seta, bt) {
    return new Optic(function(context) {
      return Hask.compose(context).call(context.p.dimap(context).call(seta).call(new Hask(function(etfb) {
        return etfb.call(context.f.pure(context)).call(context.f.fmap(context).call(bt));
      }))).call(context.p.right(context));
    });
  }

  static to(sa) {
    return new Optic(function(context) {
      return context.p.dimap(context).call(sa).call(context.f.contramap(context).call(sa));
    });
  }

  from(context) {
    return this.withIso(context, function(sa, bt) {
      return Optic.iso(bt, sa);
    });
  }

  over(ab, s, context) {
    if (context === undefined) {
      context = {
        p: Hask,
        f: Hask.Identity,
      };
    }

    return this.callback(context).call(Hask.compose(context).call(Hask.Identity(context)).call(ab)).call(s).call(Hask.id(context));
  }

  set(b, s, context) {
    if (context === undefined) {
      context = {
        p: Hask,
        f: Hask.Identity,
      };
    }

    return this.over(Hask.pure(context).call(b), s, context);
  }

  view(s, context) {
    if (context === undefined) {
      context = {
        p: Hask,
        f: Hask.Constant,
        m: Hask.Unit,
      };
    }

    return this.callback(context).call(Hask.Constant(context)).call(s).call(Hask.id(context));
  }

  withIso() {
    var context = {
      p: Exchange,
      f: Hask.Identity,
    };

    var callback = function(seta, bt) {
      return undefined;
    };

    switch (arguments.length) {
      case 1:
        if (arguments[0] === undefined) {
          // Do nothing!
        } else {
          switch (typeof arguments[0]) {
            case "function":
              callback = arguments[0];
              break;
            case "object":
              context = arguments[0];
              break;
            default:
              throw new Error("Invalid argument: 0");
          }
        }
        break;
      case 2:
        if (arguments[0] !== undefined) {
          context = arguments[0];
        }

        if (arguments[1] !== undefined) {
          callback = arguments[1];
        }

        break;
      default:
        throw new Error("Invalid arguemnts");
    }

    const afb = new Exchange(Hask.id(context), Hask.Identity(context));

    const sft = this.callback(context).call(afb);

    if (sft instanceof Exchange) {
      return callback(sft.getter, Hask.compose(context).call(Hask.Identity.runIdentity(context)).call(sft.setter));
    } else {
      throw new TypeError("sft");
    }
  }

  withLens() {
    var context = {
      p: Pierce,
      f: Hask.Tuple,
    };

    var callback = function(seta, bt) {
      return undefined;
    };

    switch (arguments.length) {
      case 1:
        if (arguments[0] === undefined) {
          // Do nothing!
        } else {
          switch (typeof arguments[0]) {
            case "function":
              callback = arguments[0];
              break;
            case "object":
              context = arguments[0];
              break;
            default:
              throw new Error("Invalid argument: 0");
          }
        }
        break;
      case 2:
        if (arguments[0] !== undefined) {
          context = arguments[0];
        }

        if (arguments[1] !== undefined) {
          callback = arguments[1];
        }

        break;
      default:
        throw new Error("Invalid arguemnts");
    }

    const afb = new Pierce(new Hask(function(s) {
      return Hask.Tuple(context).call(s).call(s);
    }), Hask.id(context));

    const sft = this.callback(context).call(afb);

    if (sft instanceof Pierce) {
      return callback(new Hask(function(s) {
        return sft.getter.call(s).call(new Hask(function(s) {
          return new Hask(function(__a_a__) {
            return __a_a__.call(Hask.pure(context).call(Hask.id(context)));
          });
        }));
      }), new Hask(function(s) {
        return new Hask(function(b) {
          return sft.setter.call(Hask.Tuple(context).call(s).call(b)).call(Hask.pure(context).call(Hask.id(context)));
        });
      }));
    } else {
      throw new TypeError("sft");
    }
  }

  withPrism() {
    var context = {
      p: Market,
      f: Hask.Identity,
    };

    var callback = function(seta, bt) {
      return undefined;
    };

    switch (arguments.length) {
      case 1:
        if (arguments[0] === undefined) {
          // Do nothing!
        } else {
          switch (typeof arguments[0]) {
            case "function":
              callback = arguments[0];
              break;
            case "object":
              context = arguments[0];
              break;
            default:
              throw new Error("Invalid argument: 0");
          }
        }
        break;
      case 2:
        if (arguments[0] !== undefined) {
          context = arguments[0];
        }

        if (arguments[1] !== undefined) {
          callback = arguments[1];
        }

        break;
      default:
        throw new Error("Invalid arguemnts");
    }

    const afb = new Market(new Hask(function(s) {
      return Hask.Either(context).call(new Hask(function(Left) {
        return new Hask(function(Right) {
          return Right.call(s);
        });
      }));
    }), Hask.Identity(context));

    const sft = this.callback(context).call(afb);

    if (sft instanceof Market) {
      return callback(new Hask(function(s) {
        return Hask.Either(context).call(new Hask(function(Left) {
          return sft.getter.call(s).call(Hask.compose(context).call(Left).call(Hask.Identity.runIdentity(context)));
        }));
      }), Hask.compose(context).call(Hask.Identity.runIdentity(context)).call(sft.setter));
    } else {
      throw new TypeError("sft");
    }
  }
}

module.exports = Optic;
