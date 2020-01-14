'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }

    return obj;
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }

    return keys;
}

function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(
                target,
                Object.getOwnPropertyDescriptors(source)
            );
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(
                    target,
                    key,
                    Object.getOwnPropertyDescriptor(source, key)
                );
            });
        }
    }

    return target;
}

//
// Constants
//
var HOUR = 60;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;

var defaultOptions = function defaultOptions() {
    var _opts$units,
        _opts$units$w,
        _opts$units$d,
        _opts$units$h,
        _opts$units$m,
        _opts$display,
        _opts$display$inclusi,
        _opts$display$w,
        _opts$display$ww,
        _opts$display$d,
        _opts$display$dd,
        _opts$display$h,
        _opts$display$hh,
        _opts$display$m,
        _opts$display$mm,
        _opts$pluralize,
        _opts$tokens,
        _opts$tokens$space,
        _opts$tokens$delimite,
        _opts$tokens$conjunct,
        _opts$tokens$plural;

    var defaults =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var opts = _objectSpread2({}, defaults); // Default the time units.

    opts.units =
        (_opts$units = opts.units) !== null && _opts$units !== void 0
            ? _opts$units
            : {};
    opts.units.w =
        (_opts$units$w = opts.units.w) !== null && _opts$units$w !== void 0
            ? _opts$units$w
            : 'week';
    opts.units.d =
        (_opts$units$d = opts.units.d) !== null && _opts$units$d !== void 0
            ? _opts$units$d
            : 'day';
    opts.units.h =
        (_opts$units$h = opts.units.h) !== null && _opts$units$h !== void 0
            ? _opts$units$h
            : 'hour';
    opts.units.m =
        (_opts$units$m = opts.units.m) !== null && _opts$units$m !== void 0
            ? _opts$units$m
            : 'minute'; // Default the time units to display.

    opts.display =
        (_opts$display = opts.display) !== null && _opts$display !== void 0
            ? _opts$display
            : {};
    opts.display.inclusive =
        (_opts$display$inclusi = opts.display.inclusive) !== null &&
        _opts$display$inclusi !== void 0
            ? _opts$display$inclusi
            : false;
    opts.display.w =
        (_opts$display$w = opts.display.w) !== null &&
        _opts$display$w !== void 0
            ? _opts$display$w
            : true;
    opts.display.ww =
        (_opts$display$ww = opts.display.ww) !== null &&
        _opts$display$ww !== void 0
            ? _opts$display$ww
            : false;
    opts.display.d =
        (_opts$display$d = opts.display.d) !== null &&
        _opts$display$d !== void 0
            ? _opts$display$d
            : true;
    opts.display.dd =
        (_opts$display$dd = opts.display.dd) !== null &&
        _opts$display$dd !== void 0
            ? _opts$display$dd
            : false;
    opts.display.h =
        (_opts$display$h = opts.display.h) !== null &&
        _opts$display$h !== void 0
            ? _opts$display$h
            : true;
    opts.display.hh =
        (_opts$display$hh = opts.display.hh) !== null &&
        _opts$display$hh !== void 0
            ? _opts$display$hh
            : false;
    opts.display.m =
        (_opts$display$m = opts.display.m) !== null &&
        _opts$display$m !== void 0
            ? _opts$display$m
            : true;
    opts.display.mm =
        (_opts$display$mm = opts.display.mm) !== null &&
        _opts$display$mm !== void 0
            ? _opts$display$mm
            : false; // Default pluralize (to true).

    opts.pluralize =
        (_opts$pluralize = opts.pluralize) !== null &&
        _opts$pluralize !== void 0
            ? _opts$pluralize
            : true; // Default separation tokens.

    opts.tokens =
        (_opts$tokens = opts.tokens) !== null && _opts$tokens !== void 0
            ? _opts$tokens
            : {};
    opts.tokens.space =
        (_opts$tokens$space = opts.tokens.space) !== null &&
        _opts$tokens$space !== void 0
            ? _opts$tokens$space
            : ' ';
    opts.tokens.delimiter =
        (_opts$tokens$delimite = opts.tokens.delimiter) !== null &&
        _opts$tokens$delimite !== void 0
            ? _opts$tokens$delimite
            : ', ';
    opts.tokens.conjunction =
        (_opts$tokens$conjunct = opts.tokens.conjunction) !== null &&
        _opts$tokens$conjunct !== void 0
            ? _opts$tokens$conjunct
            : ' and ';
    opts.tokens.plural =
        (_opts$tokens$plural = opts.tokens.plural) !== null &&
        _opts$tokens$plural !== void 0
            ? _opts$tokens$plural
            : 's';
    return opts;
};

var padWithZero = function padWithZero(value, leadingZero) {
    return leadingZero && value < 10 ? '0'.concat(value) : value;
};
/**
 * Format a time unit (i.e. 1 h as '1 hour').
 * @param  {Number} value The value of the time unit.
 * @param  {String} unit  The time unit (either `'w'`, `'h'`, `'m'`, `'d'`).
 * @return {String}       The string representation of the time unit (i.e. 5 hours).
 */

var formatPart = function formatPart(value, unit, leadingZero, opts) {
    var str =
        padWithZero(value, leadingZero) + opts.tokens.space + opts.units[unit]; // Make the unit representation plural if required.

    if (opts.pluralize && (value > 1 || value === 0)) {
        str += opts.tokens.plural;
    }

    return str;
};
/**
 * Using the options provided to the constructor take the value of the minutes and
 * format into a string.
 * @return {String} The formatted string (i.e. `10630` becomes `7 days, 9 hours and 10 minutes`).
 */

var toString = function toString(mins, opts) {
    // The delta will reduce in scope as we move through the various time units.
    // Each time a time unit is matched, remove that unit from the delta.
    var parts = [];
    var delta = mins; // Determine the time period.
    // Are the minutes greater than a week?

    if (
        (delta >= WEEK || opts.display.inclusive) &&
        (opts.display.w || opts.display.ww)
    ) {
        parts.push(
            formatPart(Math.floor(delta / WEEK), 'w', opts.display.ww, opts)
        );
        delta -= Math.floor(delta / WEEK) * WEEK;
    } // Are the remaining(?) minutes greater than a day?

    if (
        (delta >= DAY || opts.display.inclusive) &&
        (opts.display.d || opts.display.dd)
    ) {
        parts.push(
            formatPart(Math.floor(delta / DAY), 'd', opts.display.dd, opts)
        );
        delta -= Math.floor(delta / DAY) * DAY;
    } // Are the remaining(?) minutes greater than an hour?

    if (
        (delta >= HOUR || opts.display.inclusive) &&
        (opts.display.h || opts.display.hh)
    ) {
        parts.push(
            formatPart(Math.floor(delta / HOUR), 'h', opts.display.hh, opts)
        );
        delta -= Math.floor(delta / HOUR) * HOUR;
    } // Are there any remaining minutes?

    if (
        (delta > 0 || opts.display.inclusive) &&
        (opts.display.m || opts.display.mm)
    ) {
        parts.push(formatPart(delta, 'm', opts.display.mm, opts));
    }

    if (parts.length === 1) {
        return parts.toString();
    } // Join parts with `delimiter`, other than the final one which should be `conjunction`.

    return ''
        .concat(parts.slice(0, parts.length - 1).join(opts.tokens.delimiter))
        .concat(opts.tokens.conjunction)
        .concat(parts[parts.length - 1]);
};
/**
 * Create a new instance of minutes, scoped to an integer passed in.
 * @param  {Number} minutes The number of minutes this instance should work with.
 * @param  {Object} options The options to alter this particular instance of minutes.js
 * @return {Object}         The initialized instance of Minutes.
 */

var minutes = function(minutes) {
    var _Number$isNaN;

    var options =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // Attempt to parse the minutes as an integer.
    var mins = parseInt(minutes); // Only accept an integer.

    if (
        ((_Number$isNaN = Number.isNaN) !== null && _Number$isNaN !== void 0
            ? _Number$isNaN
            : isNaN)(mins)
    ) {
        throw new Error('Minutes accepts an integer representing minutes.');
    }

    var opts = defaultOptions(options);
    return toString(mins, opts);
};

exports.DAY = DAY;
exports.HOUR = HOUR;
exports.WEEK = WEEK;
exports.default = minutes;
