'use strict';

/* global describe, it, beforeEach, afterEach */

require('should'); // extends Object with `should`

var overrider = require('..');

describe('`overrider.mixInFrom` that', function() {
    var a, o, c, mixInFrom;
    beforeEach(function() {
        a = { f: 23 };
        o = { e: 5 };
        c = {
            a: 17,
            get b() { return this.c; },
            set b(x) { this.c = x; }
        };
        mixInFrom = overrider.mixInFrom;
    });
    it('is a function', function() {
        mixInFrom.should.be.a.Function();
    });
    it('returns `this`', function() {
        var r = mixInFrom.call(a, o);
        r.should.equal(a);
    });
    it('preserves existing properties', function() {
        var r = mixInFrom.call(a, o);
        a.f.should.equal(23);
    });
    it('copies regular properties', function() {
        var r = mixInFrom.call(a, o);
        r.e.should.equal(5);
    });
    it('copies getters and setters that function as expected', function() {
        var r = mixInFrom.call(a,c);
        r.b = 99;
        r.b.should.equal(99);
        r.c.should.equal(99);
    });
});

describe('`overrider.mixInTo` that', function() {
    it('is a function', function() {
        overrider.mixInTo.should.be.a.Function();
    });
});

describe('`overrider` that', function() {
    var a, o, c;
    beforeEach(function() {
        a = { f: 23 };
        o = { e: 5 };
        c = { g: 7 };
    });
    it('is a function', function() {
        overrider.should.be.a.Function();
    });
    it('calls mixInFrom');
    it('returns first arg', function() {
        var r = overrider(a, o);
        r.should.equal(a);
    });
    it('copies from multiple sources', function() {
        var r = overrider(a,c,o);
        r.e.should.equal(5);
        r.g.should.equal(7);
    });
});
