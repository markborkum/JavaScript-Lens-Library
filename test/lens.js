"use strict";

const expect = require("chai").expect;

const equalToTuple = function(tupleL, tupleR) {
  return tupleL(function(aL, bL) {
    return tupleR(function(aR, bR) {
      return (aL === aR) && (bL === bR);
    });
  });
};

const equalToEither = function(eitherL, eitherR) {
  return eitherL(function(aL) {
    return eitherR(function(aR) {
      return (aL === aR);
    }, function(bR) {
      return false;
    });
  }, function(bL) {
    return eitherR(function(aR) {
      return false;
    }, function(bR) {
      return (bL === bR);
    });
  });
};

// const equalToMaybe = function(maybeL, maybeR) {
//   return maybeL(function() {
//     return maybeR(function() {
//       return true;
//     }, function(aR) {
//       return false;
//     });
//   }, function(aL) {
//     return maybeR(function() {
//       return false;
//     }, function(aR) {
//       return (aL === aR);
//     });
//   });
// };

describe("lens", function() {
  const lens = require("../index");

  const Optic = lens.Optic;

  const _1 = lens._1;
  const _2 = lens._2;
  const _Left = lens._Left;
  const _Right = lens._Right;

  describe("`module.exports`", function() {
    it("should export `Optic` class", function() {
      expect(lens).to.have.property("Optic")
        .that.is.a("function");
    });

    describe("`Getter` constructor(s)", function() {
      it("should export `to` static function with 1 argument", function() {
        expect(lens).to.have.property("to")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(1);
      });
    });

    describe("`Iso` constructor(s)", function() {
      it("should export `iso` static function with 2 arguments", function() {
        expect(lens).to.have.property("iso")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(2);
      });
    });

    describe("`Lens` constructor(s)", function() {
      it("should export `lens` static function with 2 arguments", function() {
        expect(lens).to.have.property("lens")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(2);
      });
    });

    describe("`Prism` constructor(s)", function() {
      it("should export `prism` static function with 2 arguments", function() {
        expect(lens).to.have.property("prism")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(2);
      });

      it("should export `prism_` static function with 2 arguments", function() {
        expect(lens).to.have.property("prism_")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(2);
      });
    });

    it("should export `_1` and `_2` lenses", function() {
      expect(lens).to.have.property("_1")
        .that.is.instanceof(Optic);

      expect(lens).to.have.property("_2")
        .that.is.instanceof(Optic);
    });

    it("should export `_Left` and `_Right` prisms", function() {
      expect(lens).to.have.property("_Left")
        .that.is.instanceof(Optic);

      expect(lens).to.have.property("_Right")
        .that.is.instanceof(Optic);
    });
  });

  describe("`Optic` class", function() {
    describe("`constructor`", function() {
      it("should have `constructor` with 1 argument", function() {
        expect(Optic.constructor)
          .is.a("function")
          .and.that.has.property("length")
            .that.is.equal(1);
      });
    });

    describe("`Getter` constructor(s)", function() {
      it("should export `to` static function with 1 argument", function() {
        expect(Optic).to.have.property("to")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(1);
      });
    });

    describe("`Iso` constructor(s)", function() {
      it("should export `iso` static function with 2 arguments", function() {
        expect(Optic).to.have.property("iso")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(2);
      });
    });

    describe("`Lens` constructor(s)", function() {
      it("should export `lens` static function with 2 arguments", function() {
        expect(Optic).to.have.property("lens")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(2);
      });
    });

    describe("`Prism` constructor(s)", function() {
      it("should export `prism` static function with 2 arguments", function() {
        expect(Optic).to.have.property("prism")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(2);
      });
    });

    describe("`Category` constructor(s)", function() {
      it("should export `id` static function with 0 arguments", function() {
        expect(Optic).to.have.property("id")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(0);
      });

      it("should export `compose` static function with variable number of arguments", function() {
        expect(Optic).to.have.property("compose")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(0);
      });
    });
  });

  describe("`Optic` instances", function() {
    // New instance of `Optic` class.
    const l = new Optic(function(constraints) {
      // Behavior is undefined since we are testing for presence of (not value).
      return undefined;
    });

    it("should be instance of `Optic` class", function() {
      expect(l).to.be.instanceof(Optic);
    });

    describe("`Getter` interface", function() {
      it("should export `view` function with 1 or 2 argument", function() {
        expect(l).to.have.property("view")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(2);
      });
    });

    describe("`Setter` interface", function() {
      it("should export `over` function with 2 or 3 arguments", function() {
        expect(l).to.have.property("over")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(3);
      });

      it("should export `set` function with 2 or 3 arguments", function() {
        expect(l).to.have.property("set")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(3);
      });
    });

    describe("`Iso` interface", function() {
      it("should export `from` function with 0 or 1 argument", function() {
        expect(l).to.have.property("from")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(1);
      });

      it("should export `withIso` function with 1 or 2 arguments", function() {
        expect(l).to.have.property("withIso")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(0);
      });
    });

    describe("`Lens` interface", function() {
      it("should export `withLens` function with 1 or 2 arguments", function() {
        expect(l).to.have.property("withLens")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(0);
      });
    });

    describe("`Prism` interface", function() {
      it("should export `withPrism` function with 1 or 2 arguments", function() {
        expect(l).to.have.property("withPrism")
          .that.is.a("function")
          .and.that.has.property("length")
            .that.is.equal(0);
      });
    });
  });

  describe("`Optic` instances supporting `Iso` interface", function() {
    describe("`id` equality", function() {
      const l = Optic.id();

      it("should be instance of `Optic`", function() {
        expect(l).to.be.instanceof(Optic);
      });

      const x = 42;

      it("should support `over` and `set` functions", function() {
        // expect(l.set(x, undefined)).to.equal(x);
        expect(l.set(x)).to.equal(x);
      });

      it("should support `view` function", function() {
        expect(l.view(x)).to.equal(x);
      });

      it("should support `from` and `withIso` functions", function() {
        expect(l.from().view(x)).to.equal(x);

        l.withIso(function(getter, setter) {
          expect(getter.call(x)).to.equal(x);
          expect(setter.call(x)).to.equal(x);
        });
      });
    });
  });

  describe("`Optic` instances supporting `Lens` interface", function() {
    const a = false;
    const b = true;
    const c = 42;

    const s = function(createTuple) {
      return createTuple(a, b);
    };

    const s_1 = function(createTuple) {
      return createTuple(c, b);
    };

    const s_2 = function(createTuple) {
      return createTuple(a, c);
    };

    describe("`_1` lens", function() {
      it("should support `over` and `set` functions", function() {
        expect(equalToTuple(_1.set(c, s), s_1)).to.equal(true);
      });

      it("should support `view` function", function() {
        expect(_1.view(s)).to.equal(a);
      });

      it("should support `withLens` function", function() {
        _1.withLens(function(getter, setter) {
          expect(getter.call(s)).to.equal(a);
          expect(equalToTuple(setter.call(s).call(c), s_1)).to.equal(true);
        });
      });
    });

    describe("`_2` lens", function() {
      it("should support `over` and `set` functions", function() {
        expect(equalToTuple(_2.set(c, s), s_2)).to.equal(true);
      });

      it("should support `view` function", function() {
        expect(_2.view(s)).to.equal(b);
      });

      it("should support `withLens` function", function() {
        _2.withLens(function(getter, setter) {
          expect(getter.call(s)).to.equal(b);
          expect(equalToTuple(setter.call(s).call(c), s_2)).to.equal(true);
        });
      });
    });
  });

  describe("`Optic` instances supporting `Prism` interface", function() {
    const a = false;
    const b = true;
    const c = 42;

    const sL = function(createLeft, createRight) {
      return createLeft(a);
    };

    const sR = function(createLeft, createRight) {
      return createRight(b);
    };

    const s_Left = function(createLeft, createRight) {
      return createLeft(c);
    };

    const s_Right = function(createLeft, createRight) {
      return createRight(c);
    };

    describe("`_Left` prism", function() {
      it("should support `over` and `set` functions", function() {
        expect(equalToEither(_Left.set(c, sL), s_Left)).to.equal(true);
        expect(equalToEither(_Left.set(c, sR), s_Left)).to.equal(false);
      });

      it("should support `view` function", function() {
        expect(_Left.view(sL)).to.equal(a);
        expect(_Left.view(sR)).to.be.instanceof(Object);
      });

      it("should support `withPrism` function", function() {
        _Left.withPrism(function(getter, setter) {
          expect(equalToEither(lens._Either.from().view(getter.call(sL)), function(createLeft, createRight) {
            return createRight(a);
          })).to.equal(true);
          expect(equalToEither(lens._Either.from().view(getter.call(sR)), function(createLeft, createRight) {
            return createLeft(sR);
          })).to.equal(true);
          expect(equalToEither(setter.call(c), s_Left)).to.equal(true);
        });
      });
    });

    describe("`_Right` prism", function() {
      it("should support `over` and `set` functions", function() {
        expect(equalToEither(_Right.set(c, sL), s_Right)).to.equal(false);
        expect(equalToEither(_Right.set(c, sR), s_Right)).to.equal(true);
      });

      it("should support `view` function", function() {
        expect(_Right.view(sL)).to.be.instanceof(Object);
        expect(_Right.view(sR)).to.equal(b);
      });

      it("should support `withPrism` function", function() {
        _Right.withPrism(function(getter, setter) {
          expect(equalToEither(lens._Either.from().view(getter.call(sL)), function(createLeft, createRight) {
            return createLeft(sL);
          })).to.equal(true);
          expect(equalToEither(lens._Either.from().view(getter.call(sR)), function(createLeft, createRight) {
            return createRight(b);
          })).to.equal(true);
          expect(equalToEither(setter.call(c), s_Right)).to.equal(true);
        });
      });
    });
  });

  describe("Worked example", function() {
    function deriveLens(prop) {
      return lens.lens(function(object) {
        return object[prop];
      }, function(object, val) {
        const begin = {};

        begin[prop] = val;

        return Object.getOwnPropertyNames(object).filter(function(currentProp) {
          return (prop !== currentProp);
        }).reduce(function(accumulator, currentProp) {
          accumulator[currentProp] = object[currentProp];

          return accumulator;
        }, begin);
      });
    }

    class User {
      constructor(username, credentials) {
        this.username = username;
        this.credentials = credentials;
      }

      static toJSON(user) {
        return {
          "username": user.username,
          "credentials": Credentials.toJSON(user.credentials),
        };
      }

      static parseJSON(data) {
        return new User(data.username, Credentials.parseJSON(data.credentials));
      }
    }

    User.asJSON = lens.iso(User.toJSON, User.parseJSON);

    User.username = Optic.compose(User.asJSON, deriveLens("username"));
    User.credentials = Optic.compose(User.asJSON, deriveLens("credentials"));

    class Credentials {
      constructor(hash, hashFunction) {
        this.hash = hash;
        this.hashFunction = hashFunction;
      }

      static toJSON(credentials) {
        return {
          "hash": credentials.hash,
          "hashFunction": credentials.hashFunction,
        };
      }

      static parseJSON(data) {
        return new Credentials(data.hash, data.hashFunction);
      }
    }

    Credentials.asJSON = lens.iso(Credentials.toJSON, Credentials.parseJSON);

    Credentials.hash = Optic.compose(Credentials.asJSON, deriveLens("hash"));
    Credentials.hashFunction = Optic.compose(Credentials.asJSON, deriveLens("hashFunction"));

    const l = Optic.compose(User.credentials, Credentials.hash);

    it("should be instance of `Optic` class", function() {
      expect(l).to.be.instanceof(Optic);
    });

    const username0 = "alice";
    const hash0 = "123456";
    const hashFunction0 = null;

    const s0 = new User(username0, new Credentials(hash0, hashFunction0));

    const hash1 = "654321";

    const s1 = new User(username0, new Credentials(hash1, hashFunction0));

    it("should support `view` function", function() {
      expect(l.view(s0)).to.equal(hash0);
    });

    it("should support `over` and `set` functions", function() {
      expect(l.set(hash1, s0)).to.deep.equal(s1);
    });
  });
});
