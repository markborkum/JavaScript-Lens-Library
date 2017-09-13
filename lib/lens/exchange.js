"use strict";

const Hask = require("../hask");

class Exchange {
  //
  // data Exchange a b s t = Exchange (s -> a) (b -> t)
  //
  constructor(getter, setter) {
    this.getter = getter;
    this.setter = setter;
  }

  //
  // dimap :: (u -> s) -> (t -> v) -> Exchange a b s t -> Exchange a b u v
  //
  static dimap(context) {
    return new Hask(function(us) {
      return new Hask(function(tv) {
        return new Hask(function(p) {
          if (p instanceof Exchange) {
            const getter = Hask.compose(context).call(p.getter).call(us);

            const setter = Hask.compose(context).call(tv).call(p.setter);

            return new Exchange(getter, setter);
          } else {
            throw new TypeError("p");
          }
        });
      });
    });
  }

  //
  // lmap :: (u -> s) -> Exchange a b s t -> Exchange a b u t
  //
  static lmap(context) {
    return new Hask(function(us) {
      return Exchange.dimap(context).call(us).call(Hask.id(context));
    });
  }

  //
  // rmap :: (t -> v) -> Exchange a b s t -> Exchange a b s v
  //
  static rmap(context) {
    return Exchange.dimap(context).call(Hask.id(context));
  }
}

module.exports = Exchange;
