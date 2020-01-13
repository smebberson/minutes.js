# minutes.js changelog

All notable changes to minutes.js will be documented here. This project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

-   Upgraded Rollup and Babel.
-   Added Prettier.
-   Updated code to use more es6 functionality (via babel).
-   Updated test code to use more es6 functionality (via babel).
-   Removed mocha and chai, replacing them with Jest.
-   Removed files that are no longer required.
-   Removed usage of Class, minutes is now a single function.
-   `options.tokens.comma` is now `options.tokens.delimiter`.
-   `options.tokens.and` is now `options.tokens.conjunction`.

### Breaking changes

-   The export has been renamed from `Minutes` to `minutes`.
-   You can no longer use `new` with minutes, it is now a single function.
-   The `toString()` method has been removed, instead, use the single function.
-   `options.tokens.comma` is now `options.tokens.delimiter`.
-   `options.tokens.and` is now `options.tokens.conjunction`.

## [1.1.1] - 2016-05-27

-   Falling back to `isNaN` if `Number.isNaN` is not present (to support IE).

## [1.1.0] - 2016-05-05

-   Added the `display` option to control which units are output.

## [1.0.1] - 2016-04-23

-   Now provides support for browser, Node.js and AMD.

## [1.0.0] - 2016-04-23

-   First complete version.
