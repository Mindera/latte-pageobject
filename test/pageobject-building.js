'use strict';

var expect = require('chai').expect;
var victim = require('../src/latte-pageobject');

describe('When building page objects', function () {
    it('should create a fluent \'on\' block', function () {
        var api = {
            on: {
                a: function () { return 'a'; },
                b: function () { return 'b'; }
            },
            given: {},
            when: {},
            then: {}
        };

        var pageObject = victim.makeIt(api);

        expect(pageObject.on.a()).to.equal(api.on.a());
        expect(pageObject.on.and.on.b()).to.equal(api.on.b());
    });

    it('should create a fluent \'given\' block', function () {
        var api = {
            on: {},
            given: {
                a: function () { return 'a'; },
                b: function () { return 'b'; }
            },
            when: {},
            then: {}
        };

        var pageObject = victim.makeIt(api);

        expect(pageObject.given.a()).to.equal(api.given.a());
        expect(pageObject.given.and.given.b()).to.equal(api.given.b());
    });

    it('should create a fluent \'when\' block', function () {
        var api = {
            on: {},
            given: {},
            when: {
                a: function () { return 'a'; },
                b: function () { return 'b'; }
            },
            then: {}
        };

        var pageObject = victim.makeIt(api);

        expect(pageObject.when.a()).to.equal(api.when.a());
        expect(pageObject.when.and.b()).to.equal(api.when.b());
    });

    it('should create a fluent \'then\' block', function () {
        var api = {
            on: {},
            given: {},
            when: {
                a: function () { return 'a'; },
                b: function () { return 'b'; }
            },
            then: {
                c: function () { return 'c'; },
                d: function () { return 'd'; }
            }
        };

        var pageObject = victim.makeIt(api);

        expect(pageObject.when.a()).to.equal(api.when.a());
        expect(pageObject.when.and.b()).to.equal(api.when.b());

        expect(pageObject.then.d()).to.equal(api.then.d());
        expect(pageObject.when.then.c()).to.equal(api.then.c());
        expect(pageObject.when.then.and.c()).to.equal(api.then.c());
    });

    it('should create a pure fluent api', function () {
        var api = {
            on: {},
            given: {},
            when: {
                a: function () { return this; },
                b: function () { return this; }
            },
            then: {
                c: function () { return this; },
                d: function () { return 'd'; }
            }
        };

        var pageObject = victim.makeIt(api);

        expect(pageObject.when.a().and.b().then.c().and.d()).to.equal(api.then.d());
    });
});