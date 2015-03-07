'use strict';

var expect = require('chai').expect;
var victim = require('../src/latte-pageobject');
var Q = require('q');

describe('When encapsulating page objects on promises', function () {
    it('should not throw any exception', function () {
        var fn = function () {
            var api = { on: {}, given: {}, when: {}, then: {} };
            return victim.makeIt(api);
        };

        expect(Q.fcall.bind(fn)).not.to.throw();

        var result = Q.fcall(fn);
        result.then()
    });

    it('should unwrap from promise successfully', function () {
        var api = {
            on: {},
            given: {},
            when: {
                a: function () { return this; }
            },
            then: {
                b: function () { return 'b'; }
            }
        };

        var result = Q.fcall(function () {
            return victim.makeIt(api);
        });

        result.then(function (pageObject) {
            expect(pageObject.when.a().then.b()).to.equal(api.then.b());
        })
    })
});