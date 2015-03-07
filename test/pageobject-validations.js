'use strict';

var expect = require('chai').expect;
var victim = require('../src/latte-pageobject');

describe('When validating API', function () {
    it('should throw exception without api object', function () {
        expect(victim.makeIt.bind()).to.throw(Error);
    });

    it('should throw exception without \'on\' block', function () {
        var api = { given: {}, when: {}, then: {} };

        expect(victim.makeIt.bind(api)).to.throw(Error);
    });

    it('should throw exception without \'given\' block', function () {
        var api = { on: {}, when: {}, then: {} };

        expect(victim.makeIt.bind(api)).to.throw(Error);
    });

    it('should throw exception without \'when\' block', function () {
        var api = { on: {}, given: {}, then: {} };

        expect(victim.makeIt.bind(api)).to.throw(Error);
    });

    it('should throw exception without \'then\' block', function () {
        var api = { on: {}, given: {}, when: {} };

        expect(victim.makeIt.bind(api)).to.throw(Error);
    });
});