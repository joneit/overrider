'use strict';

/* global describe, it, beforeEach, afterEach */

require('should'); // extends Object with `should`

var overrider = require('..');

describe('`overrider.mixIn` that', function() {
    var source, target, c, mixIn;
    beforeEach(function() {
        target = { f: 23 };
        source = { e: 5 };
        c = {
            source: 17,
            get b() { return this._b; },
            set b(x) { this._b = x; }
        };
        mixIn = overrider.mixIn;
    });
    it('is source function', function() {
        mixIn.should.be.a.Function();
    });
    it('returns context (`this`, the target object)', function() {
        mixIn.call(target, source).should.equal(target);
    });
    it('preserves existing properties of context (`this`, the target object)', function() {
        mixIn.call(target, source);
        target.f.should.equal(23);
    });
    it('leaves first arg (the source object) alone', function() {
        mixIn.call(target, source);
        source.e.should.equal(5);
        Object.keys(source).length.should.equal(1);
    });
    it('copies regular properties', function() {
        mixIn.call(target, source);
        target.e.should.equal(5);
        Object.keys(target).length.should.equal(2);
    });
    it('copies getters and setters that function as expected', function() {
        mixIn.call(target, c);
        c.b = 99;
        c.b.should.equal(99);
        c._b.should.equal(99);
    });
});

describe('`overrider.mixInTo` that', function() {
    var source, target, c, mixInTo;
    beforeEach(function() {
        target = { f: 23 };
        source = { e: 5 };
        c = {
            source: 17,
            get b() { return this._b; },
            set b(x) { this._b = x; }
        };
        mixInTo = overrider.mixInTo;
    });
    it('is source function', function() {
        overrider.mixInTo.should.be.a.Function();
    });
    it('returns first arg (the target object)', function() {
        mixInTo.call(source, target).should.equal(target);
    });
    it('preserves existing properties of first arg (the target object)', function() {
        mixInTo.call(source, target);
        target.f.should.equal(23);
    });
    it('leaves source object alone', function() {
        mixInTo.call(source, target);
        source.e.should.equal(5);
        Object.keys(source).length.should.equal(1);
    });
    it('copies regular properties', function() {
        mixInTo.call(source, target);
        target.e.should.equal(5);
        Object.keys(target).length.should.equal(2);
    });
    it('copies getters and setters that function as expected', function() {
        mixInTo.call(source, c);
        c.b = 99;
        c.b.should.equal(99);
        c._b.should.equal(99);
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
    it('calls mixIn');
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
