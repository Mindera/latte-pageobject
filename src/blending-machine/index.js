'use strict';

var _ = require('lodash');
var recipe = require('../recipe');

/**
 * Mixes the source object's fluid API with the destination's.
 *
 * @param destination The destination fluid API
 * @param source The source fluid API
 */
function mixFluidAPI(destination, source) {

    recipe.checkIngredients(destination);
    recipe.checkIngredients(source);

    _.merge(destination.and, source.and, mergeCustomizer);
    _.merge(destination.on, source.on, mergeCustomizer);
    _.merge(destination.given, source.given, mergeCustomizer);
    _.merge(destination.when, source.when, mergeCustomizer);
    _.merge(destination.then, source.then, mergeCustomizer);
}

/**
 * Merges to page objects APIs
 *
 * @param destination The destination page object
 * @param source The source page object
 */
function mixCrunchyParts(destination, source) {
    _.merge(destination, source, Object.getPrototypeOf(source), mergeCustomizer);
}

function blendAPIs(crunchyApi, fluidApi, sourcesArray) {
    var i;
    for (i = 0; i < sourcesArray.length; i++) {
        blendAPI(crunchyApi, fluidApi, sourcesArray[i]);
    }
}

function blendAPI(crunchyApi, fluidApi, source) {
    mixFluidAPI(fluidApi, source);
    mixCrunchyParts(crunchyApi, source);
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

/**
 * Lodash merge customizer to allow child functions to override parent function when mixing page objects together.
 */
function mergeCustomizer(objectValue) {
    if (objectValue !== undefined && typeof objectValue === 'function') {
        return objectValue;
    }
}

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

var blendingMachine = {
    /**
     * Mixes the ingredients, the fluid API and other Latte page objects and returns a single,
     * creamy and delicious Latte Page Object.
     *
     * @param apiIngredients The original API ingredients
     * @param fluidAPI The fluid API
     * @param pageObjectsToMix Other Latte Page Objects to mix
     * @returns {Object} A creamy and delicious Latte Page Object with all blended up.
     */
    mix: function (apiIngredients, fluidAPI, pageObjectsToMix) {
        if (!_.isUndefined(pageObjectsToMix)) {
            if (Array.isArray(pageObjectsToMix)) {
                blendAPIs(apiIngredients, fluidAPI, pageObjectsToMix);
            } else {
                blendAPI(apiIngredients, fluidAPI, pageObjectsToMix);
            }
        }

        var crunchyParts = getCrunchyParts(apiIngredients);
        var latte = serveInLatteCup(fluidAPI);
        return Object.create(crunchyParts, latte);
    },

    /**
     * Make the given API ingredients fluid. The returned API is fluent and chainable.
     *
     * @param apiIngredients The API ingredients used to build the fluid API
     */
    fluidify: function(apiIngredients) {
        var fluidAPI = {
            and: fluidAPI,
            on: apiIngredients.on,
            given: apiIngredients.given,
            when: apiIngredients.when,
            then: apiIngredients.then
        };

        fluidAPI.on.and = fluidAPI;
        fluidAPI.given.and = fluidAPI;
        fluidAPI.then.and = fluidAPI.then;
        fluidAPI.when.then = fluidAPI.then;
        fluidAPI.when.and = fluidAPI.when;
        fluidAPI.and = fluidAPI;

        return fluidAPI;
    }
};
module.exports = blendingMachine;