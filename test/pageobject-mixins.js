'use strict';

var expect = require('chai').expect;
var victim = require('../src/latte-pageobject');

describe('When mixing multiple page objects', function () {
    it('should mix their fluent APIs', function () {

        var parent = victim.makeIt({
            on: {},
            given: {},
            when: {
                a: function () { return this; }
            },
            then: {
                d: function () { return 'parent'; }
            }
        });

        var api = {
            on: {},
            given: {},
            when: {
                b: function () { return this; }
            },
            then: {
                c: function () { return this; }
            }
        };

        var pageObject = victim.makeIt(api, parent);

        expect(pageObject.when.a().and.b().then.c().and.d()).to.equal(api.then.d());
    });

    it('should mix fluent APIs of more than two parent page objects', function () {

        var parent1 = victim.makeIt({
            on: {},
            given: {},
            when: {
                a: function () { return this; }
            },
            then: {
                c: function () { return this; }
            }
        });

        var parent2 = victim.makeIt({
            on: {},
            given: {},
            when: {
                b: function () { return this; }
            },
            then: {
                d: function () { return this; }
            }
        });

        var api = {
            on: {},
            given: {},
            when: {
                e: function () { return this; }
            },
            then: {
                f: function () { return 'f'; }
            }
        };

        var pageObject = victim.makeIt(api, [parent1, parent2]);

        expect(pageObject.when.a().and.b().and.e().then.c().and.d().and.f()).to.equal(api.then.f());
    });

    it('should support polymorphism when child and parent have the same function name', function () {
        var parent = victim.makeIt({
            on: {},
            given: {},
            when: {
                a: function () { return this; }
            },
            then: {
                d: function () { return 'parent'; }
            }
        });

        var api = {
            on: {},
            given: {},
            when: {
                b: function () { return this; }
            },
            then: {
                c: function () { return this; },
                d: function () { return 'child'; }
            }
        };

        var pageObject = victim.makeIt(api, parent);

        expect(pageObject.when.a().and.b().then.c().and.d()).to.equal(api.then.d());
    });
});