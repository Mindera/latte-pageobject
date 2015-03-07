'use strict';

var _ = require('lodash');
var blender = require('../blending-machine');
var recipe = require('../recipe');
var waiter = require('../waiter');

var lattePageObject = {
    /**
     * Makes a page object with a Fluid BDD-like API. The API can be infinitely chainable. To achieve an such
     * chain, each function inside each ingredient must return 'this'.
     *
     * @param apiIngredients An API object ingredients used to make a Latte page object
     * @param pageObjectsToMix (Optional) A page object or an array of page objects to mix with the built page object
     */
    makeIt: function (apiIngredients, pageObjectsToMix) {
        recipe.checkIngredients(apiIngredients);
        var fluidAPI = blender.fluidify(apiIngredients);
        blender.mix(apiIngredients, fluidAPI, pageObjectsToMix);
        return waiter.serve(apiIngredients, fluidAPI);
    }
};
module.exports = lattePageObject;
