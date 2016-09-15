'use strict';

/* global describe, it, beforeEach, afterEach */

require('should'); // extends Object with `should`

var overrider = require('..');

describe('`overrider` that', function() {
    var a, o, c;
    beforeEach(function() {
        a = { f: 23 };
        o = { e: 5 };
        c = {
            a: 17,
            get b() { return this.c; },
            set b(x) { this.c = x; }
        };
    });
    it('is a function', function() {
        overrider.should.be.a.Function();
    });
    it('returns first param', function() {
        var r = overrider(a, o);
        r.should.equal(a);
    });
    it('preserves existing properties', function() {
        var r = overrider(a, o);
        a.f.should.equal(23);
    });
    it('copies regular properties', function() {
        var r = overrider(a, o);
        r.e.should.equal(5);
    });
    it('copies getters and setters that function as expected', function() {
        var r = overrider(a,c);
        r.b = 99;
        r.b.should.equal(99);
        r.c.should.equal(99);
    });
});
