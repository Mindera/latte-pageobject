'use strict';

var _ = require('lodash');

/**
 * Serves the Latte Page Object in a proper cup.
 *
 * Now seriously:
 * It returns an object which proxies the fluid API. It allows the final object to have indirect references to the
 * fluid API. This prevents having cyclical references which can cause problems when serializing the page objects.
 *
 * @param fluidApi The API object subject to the interceptor
 */
function serveInLatteCup(fluidApi) {
    return {
        and: {
            get: function () { return fluidApi; }
        },
        on: {
            get: function () { return fluidApi.on; }
        },
        given: {
            get: function () { return fluidApi.given; }
        },
        when: {
            get: function () { return fluidApi.when; }
        },
        then: {
            get: function () { return fluidApi.then; }
        }
    };
}


/**
 * It gets the 'crunchy' parts of the API, which are all functions and properties that aren't the following keywords:
 * 'and', 'on', 'given', 'when', 'then'
 *
 * @param apiIngredients The API ingredients from where the 'crunchy' parts will be obtained
 * @returns {Object} An object with out the 'and', 'on', 'given', 'when', 'then' properties
 */
function getCrunchyParts(apiIngredients) {
    return _.omit(apiIngredients, 'and', 'on', 'given', 'when', 'then');
}

var waiter = {
    /**
     * Serves the final Latte Page Object.
     *
     * @param apiIngredients The API ingredients
     * @param fluidAPI The fluid API
     * @returns {Object} A delicious Latte Page Object ready to consume
     */
    serve: function (apiIngredients, fluidAPI) {
        var crunchyParts = getCrunchyParts(apiIngredients);
        var latte = serveInLatteCup(fluidAPI);
        return Object.create(crunchyParts, latte);
    },

    /**
     * Checks if the API ingredients are valid.
     *
     * @param apiIngredients The API ingredients to verify
     */
    checkIngredients: function(apiIngredients) {
        if (_.isUndefined(apiIngredients)) {
            throw new Error('No api ingredients were found');
        }
        if (_.isUndefined(apiIngredients.on)) {
            throw new Error('On ingredient was not found');
        }
        if (_.isUndefined(apiIngredients.given)) {
            throw new Error('Given ingredient was not defined');
        }
        if (_.isUndefined(apiIngredients.when)) {
            throw new Error('When ingredient was not defined');
        }
        if (_.isUndefined(apiIngredients.then)) {
            throw new Error('Then ingredient was not defined');
        }
    }
};

module.exports = waiter;