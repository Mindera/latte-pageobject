'use strict';

var _ = require('lodash');
var blender = require('../blending-machine');
var recipe = require('../recipe');

var lattePageObject = {
    /**
     * Builds a page object with a Fluent BDD-like API. The API can be infinitely chainable. To achieve an infinite
     * chain, each function inside each block must return 'this'.
     *
     * @param api An API object structure used to build the page object
     * @param pageObjectsToMix (Optional) A page object or an array of page objects to mix with the built page object
     */
    makeIt: function (api, pageObjectsToMix) {
        recipe.checkIngredients(api);
        var fluidAPI = blender.fluidify(api);
        return blender.mix(api, fluidAPI, pageObjectsToMix);
    }
};
module.exports = lattePageObject;