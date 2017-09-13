"use strict";

const Hask = require("../hask");

class Pierce {
  //
  // data Pierce a b s t = Exchange (s -> a) (s -> b -> t)
  //
  constructor(getter, setter) {
    this.getter = getter;
    this.setter = setter;
  }

  //
  // dimap :: (u -> s) -> (t -> v) -> Pierce a b s t -> Pierce a b u v
  //
  static dimap(context) {
    return new Hask(function(f) {
      return new Hask(function(g) {
        return new Hask(function(p) {
          if (p instanceof Pierce) {
            const getter = Hask.compose(context).call(p.getter).call(f);

            const setter = Hask.compose(context).call(Hask.compose(context).call(g).call(p.setter)).call(Hask.first(context).call(f));

            return new Pierce(getter, setter);
          } else {
            throw new TypeError("p");
          }
        });
      });
    });
  }

  //
  // lmap :: (u -> s) -> Pierce a b s t -> Pierce a b u t
  //
  static lmap(context) {
    return new Hask(function(sa) {
      return Pierce.dimap(context).call(sa).call(Hask.id(context));
    });
  }

  //
  // rmap :: (t -> v) -> Pierce a b s t -> Pierce a b s v
  //
  static rmap(context) {
    return Pierce.dimap(context).call(Hask.id(context));
  }

  //
  // first :: Pierce a b s t -> Pierce a b (Either s x) (Either t x)
  //
  static first(context) {
    throw new Error("TODO: Method not implemented");
  }

  //
  // second :: Pierce a b s t -> Pierce a b (Either x s) (Either x t)
  //
  static second(context) {
    return new Hask(function(p) {
      if (p instanceof Pierce) {
        const getter = Hask.second(context).call(p.getter);

        const setter = new Hask(function(__x_s_b__) {
          return __x_s_b__.call(new Hask(function(__x_s__) {
            return new Hask(function(b) {
              return Hask.second(context).call(new Hask(function(s) {
                return p.setter.call(Hask.Tuple(context).call(s).call(b));
              })).call(__x_s__);
            });
          }));
        });

        return new Pierce(getter, setter);
      } else {
        throw new TypeError("p");
      }
    });
  }
}

module.exports = Pierce;
