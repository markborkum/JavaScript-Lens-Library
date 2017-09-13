"use strict";

const Hask = require("../hask");

class Market {
  //
  // data Market a b s t = Exchange (s -> Either t a) (b -> t)
  //
  constructor(getter, setter) {
    this.getter = getter;
    this.setter = setter;
  }

  //
  // dimap :: (u -> s) -> (t -> v) -> Market a b s t -> Market a b u v
  //
  static dimap(context) {
    return new Hask(function(f) {
      return new Hask(function(g) {
        return new Hask(function(p) {
          if (p instanceof Market) {
            const getter = new Hask(function(s) {
              return Hask.Either(context).call(new Hask(function(Left) {
                return Hask.compose(context).call(p.getter).call(f).call(s).call(Hask.compose(context).call(Left).call(g));
              }));
            });

            const setter = Hask.compose(context).call(g).call(p.setter);

            return new Market(getter, setter);
          } else {
            throw new TypeError("p");
          }
        });
      });
    });
  }

  //
  // lmap :: (u -> s) -> Market a b s t -> Market a b u t
  //
  static lmap(context) {
    return new Hask(function(sa) {
      return Market.dimap(context).call(sa).call(Hask.id(context));
    });
  }

  //
  // rmap :: (t -> v) -> Market a b s t -> Market a b s v
  //
  static rmap(context) {
    return Market.dimap(context).call(Hask.id(context));
  }

  //
  // left :: Market a b s t -> Market a b (Either s x) (Either t x)
  //
  static left(context) {
    throw new Error("TODO: Method not implemented");
  }

  //
  // right :: Market a b s t -> Market a b (Either x s) (Either x t)
  //
  static right(context) {
    return new Hask(function(p) {
      if (p instanceof Market) {
        const getter = new Hask(function(exs) {
          return Hask.Either(context).call(new Hask(function(LeftOuter) {
            return new Hask(function(RightOuter) {
              return exs.call(new Hask(function(x) {
                return Hask.Either(context).call(new Hask(function(LeftInner) {
                  return new Hask(function(RightInner) {
                    return Hask.compose(context).call(LeftOuter).call(LeftInner).call(x);
                  });
                }));
              })).call(new Hask(function(s) {
                return p.getter.call(s).call(new Hask(function(t) {
                  return Hask.Either(context).call(new Hask(function(LeftInner) {
                    return new Hask(function(RightInner) {
                      return Hask.compose(context).call(LeftOuter).call(RightInner).call(x);
                    });
                  }));
                })).call(RightOuter);
              }));
            });
          }));
        });

        const setter = new Hask(function(b) {
          return Hask.Either(context).call(new Hask(function(LeftOuter) {
            return new Hask(function(RightOuter) {
              return Hask.compose(context).call(RightOuter).call(p.setter).call(b);
            });
          }));
        });

        return new Market(getter, setter);
      } else {
        throw new TypeError("p");
      }
    });
  }
}

module.exports = Market;
