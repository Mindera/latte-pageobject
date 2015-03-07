'use strict';

var _ = require('lodash');

var recipe = {
    /**
     * Checks if the API ingredients are valid.
     *
     * @param apiIngredients The API ingredients to verify
     */
    checkIngredients: function(apiIngredients) {
        if (_.isUndefined(apiIngredients)) {
            throw new Error('No api object was defined');
        }
        if (_.isUndefined(apiIngredients.on)) {
            throw new Error('On block was not defined');
        }
        if (_.isUndefined(apiIngredients.given)) {
            throw new Error('Given block was not defined');
        }
        if (_.isUndefined(apiIngredients.when)) {
            throw new Error('When block was not defined');
        }
        if (_.isUndefined(apiIngredients.then)) {
            throw new Error('Then block was not defined');
        }
    }
};
module.exports = recipe;
