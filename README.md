#  [![NPM version][npm-image]][npm-url]

Latte Page Object
=========

A small library to allow creating your page objects with a fluid, creamy and delicious BDD-like API with the ability to
add `crunchy` properties that adds special personal flavour to your page objects for browser automation tests.

## Installation

  npm install latte-pageobject --save

## Usage

Your test could be implemented like the following example:

```javascript
pageObject.on.childPageObject
     .and.on.grandChildPageObject
     .given.somePrecondition()
     .and.otherPrecondition()
     .(*)
     .when.userDoesSomething()
     .and.doesSomethingElse()
     .(*)
     .then.itShouldHaveHappenedAThing()
     .and.itShouldHaveHappenedAnotherThing()
     .(*)
```

To achieve such API, one can have the following API mold:

```javascript
return = {
     // The standard ingredients of the Latte PageObject
     on: {
         grandChildPageObject: grandChildPageObject
     },
     given: {
         somePrecondition: function () {
             createPrecondition();
             return this;
         },
         otherPrecondition: function () {
             createOtherPrecondition();
             return this;
         }
     },
     when: {
         userDoesSomething: function () {
             createPrecondition();
             return this;
         },
         doesSomethingElse: function () {
             createOtherPrecondition();
             return this;
         }
     },
     then: {
         itShouldHaveHappenedAThing: function () {
             createPrecondition();
             return this;
         },
         itShouldHaveHappenedAnotherThing: function () {
             createOtherPrecondition();
             return this;
         }
     },
     
     // The `crunchy` parts of the API, where you can add getters, or any other flavour to your Latte. But like any other hot, creamy drink, you should be moderate adding this sprinkles to your drink
     
     getSomeMeaningValueFromMyPageObject: function () {
        return something;
     }
}
```

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release

[npm-url]: https://npmjs.org/package/latte-pageobject
[npm-image]: https://badge.fury.io/js/latte-pageobject.svg
