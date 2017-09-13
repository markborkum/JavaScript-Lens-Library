"use strict";

module.exports = function(Hask) {
  class Unit {
    constructor() {
      // Do nothing.
    }

    static mempty(context) {
      return Unit.getInstance();
    }

    static mappend(context) {
      return new Hask(function(unit) {
        // if (unit instanceof Unit) {
          return new Hask(function(unit) {
            // if (unit instanceof Unit) {
              return Unit.getInstance();
            // } else {
            //   throw new TypeError("unit " + String(unit));
            // }
          });
        // } else {
        //   throw new TypeError("unit " + String(unit));
        // }
      });
    }
  }

  Unit.getInstance = (function() {
    const SINGLETON = new Unit();

    Unit.constructor = null;

    return function() {
      return SINGLETON;
    };
  })();

  Hask.Unit = Unit;
};
