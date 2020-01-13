'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

//
// Constants
//
var HOUR = 60;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;

var Minutes =
    /*#__PURE__*/
    (function() {
        /**
         * Create a new instance of minutes, scoped to an integer passed in.
         * @param  {Number} minutes The number of minutes this instance should work with.
         * @param  {Object} opts    The options to alter this particular instance of minutes.js
         * @return {Object}         The initialized instance of Minutes.
         */
        function Minutes(minutes) {
            var _Number$isNaN,
                _this$opts$units,
                _this$opts$units$w,
                _this$opts$units$d,
                _this$opts$units$h,
                _this$opts$units$m,
                _this$opts$display,
                _this$opts$display$w,
                _this$opts$display$d,
                _this$opts$display$h,
                _this$opts$display$m,
                _this$opts$pluralize,
                _this$opts$tokens,
                _this$opts$tokens$spa,
                _this$opts$tokens$com,
                _this$opts$tokens$and,
                _this$opts$tokens$plu;

            var opts =
                arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : {};

            _classCallCheck(this, Minutes);

            // Attempt to parse the minutes as an integer.
            this.minutes = parseInt(minutes); // Only accept an integer.

            if (
                ((_Number$isNaN = Number.isNaN) !== null &&
                    _Number$isNaN !== void 0
                    ? _Number$isNaN
                    : isNaN)(this.minutes)
            ) {
                throw new Error(
                    'Minutes accepts an integer representing minutes.'
                );
            }

            this.opts = opts; // Default the time units.

            this.opts.units =
                (_this$opts$units = this.opts.units) !== null &&
                _this$opts$units !== void 0
                    ? _this$opts$units
                    : {};
            this.opts.units.w =
                (_this$opts$units$w = this.opts.units.w) !== null &&
                _this$opts$units$w !== void 0
                    ? _this$opts$units$w
                    : 'week';
            this.opts.units.d =
                (_this$opts$units$d = this.opts.units.d) !== null &&
                _this$opts$units$d !== void 0
                    ? _this$opts$units$d
                    : 'day';
            this.opts.units.h =
                (_this$opts$units$h = this.opts.units.h) !== null &&
                _this$opts$units$h !== void 0
                    ? _this$opts$units$h
                    : 'hour';
            this.opts.units.m =
                (_this$opts$units$m = this.opts.units.m) !== null &&
                _this$opts$units$m !== void 0
                    ? _this$opts$units$m
                    : 'minute'; // Default the time units to display.

            this.opts.display =
                (_this$opts$display = this.opts.display) !== null &&
                _this$opts$display !== void 0
                    ? _this$opts$display
                    : {};
            this.opts.display.w =
                (_this$opts$display$w = this.opts.display.w) !== null &&
                _this$opts$display$w !== void 0
                    ? _this$opts$display$w
                    : true;
            this.opts.display.d =
                (_this$opts$display$d = this.opts.display.d) !== null &&
                _this$opts$display$d !== void 0
                    ? _this$opts$display$d
                    : true;
            this.opts.display.h =
                (_this$opts$display$h = this.opts.display.h) !== null &&
                _this$opts$display$h !== void 0
                    ? _this$opts$display$h
                    : true;
            this.opts.display.m =
                (_this$opts$display$m = this.opts.display.m) !== null &&
                _this$opts$display$m !== void 0
                    ? _this$opts$display$m
                    : true; // Default pluralize (to true).

            this.opts.pluralize =
                (_this$opts$pluralize = this.opts.pluralize) !== null &&
                _this$opts$pluralize !== void 0
                    ? _this$opts$pluralize
                    : true; // Default separation tokens.

            this.opts.tokens =
                (_this$opts$tokens = this.opts.tokens) !== null &&
                _this$opts$tokens !== void 0
                    ? _this$opts$tokens
                    : {};
            this.opts.tokens.space =
                (_this$opts$tokens$spa = this.opts.tokens.space) !== null &&
                _this$opts$tokens$spa !== void 0
                    ? _this$opts$tokens$spa
                    : ' ';
            this.opts.tokens.comma =
                (_this$opts$tokens$com = this.opts.tokens.comma) !== null &&
                _this$opts$tokens$com !== void 0
                    ? _this$opts$tokens$com
                    : ', ';
            this.opts.tokens.and =
                (_this$opts$tokens$and = this.opts.tokens.and) !== null &&
                _this$opts$tokens$and !== void 0
                    ? _this$opts$tokens$and
                    : ' and ';
            this.opts.tokens.plural =
                (_this$opts$tokens$plu = this.opts.tokens.plural) !== null &&
                _this$opts$tokens$plu !== void 0
                    ? _this$opts$tokens$plu
                    : 's';
            return this;
        }
        /**
         * Using the options provided to the constructor take the value of the minutes and
         * format into a string.
         * @return {String} The formatted string (i.e. `10630` becomes `7 days, 9 hours and 10 minutes`).
         */

        _createClass(
            Minutes,
            [
                {
                    key: 'toString',
                    value: function toString() {
                        // The delta will reduce in scope as we move through the various time units.
                        // Each time a time unit is matched, remove that unit from the delta.
                        var parts = [];
                        var delta = this.minutes; // Determine the time period.
                        // Are the minutes greater than a week?

                        if (delta >= WEEK && this.opts.display.w) {
                            parts.push(
                                this.formatPart(Math.floor(delta / WEEK), 'w')
                            );
                            delta -= Math.floor(delta / WEEK) * WEEK;
                        } // Are the remaining(?) minutes greater than a day?

                        if (delta >= DAY && this.opts.display.d) {
                            parts.push(
                                this.formatPart(Math.floor(delta / DAY), 'd')
                            );
                            delta -= Math.floor(delta / DAY) * DAY;
                        } // Are the remaining(?) minutes greater than an hour?

                        if (delta >= HOUR && this.opts.display.h) {
                            parts.push(
                                this.formatPart(Math.floor(delta / HOUR), 'h')
                            );
                            delta -= Math.floor(delta / HOUR) * HOUR;
                        } // Are there any remaining minutes?

                        if (delta > 0 && this.opts.display.m) {
                            parts.push(this.formatPart(delta, 'm'));
                        } // Create the regex to replace the last occurrence of `this.opts.tokens.comma` with `this.opts.tokens.and`.

                        var lastOccurrence = new RegExp(
                            ''
                                .concat(
                                    Minutes.safeRegExpString(
                                        this.opts.tokens.comma
                                    ),
                                    '(?!.*'
                                )
                                .concat(
                                    Minutes.safeRegExpString(
                                        this.opts.tokens.comma
                                    ),
                                    ')'
                                )
                        ); // Join parts with `,`, other than the final one which should be `and`.

                        return parts
                            .join(this.opts.tokens.comma)
                            .replace(lastOccurrence, this.opts.tokens.and);
                    } //
                    // Instance methods.
                    //

                    /**
                     * Format a time unit (i.e. 1 h as '1 hour').
                     * @param  {Number} value The value of the time unit.
                     * @param  {String} unit  The time unit (either `'w'`, `'h'`, `'m'`, `'d'`).
                     * @return {String}       The string representation of the time unit (i.e. 5 hours).
                     */
                },
                {
                    key: 'formatPart',
                    value: function formatPart(value, unit) {
                        var str =
                            value +
                            this.opts.tokens.space +
                            this.opts.units[unit]; // Make the unit representation plural if required.

                        if (this.opts.pluralize && value > 1) {
                            str += this.opts.tokens.plural;
                        }

                        return str;
                    } //
                    // Static methods.
                    //

                    /**
                     * Return a string that is safe to be used when dynamically building a regular expression.
                     * @param  {String} str The string to escaped.
                     * @return {String}     An escaped version of `str`.
                     */
                }
            ],
            [
                {
                    key: 'safeRegExpString',
                    value: function safeRegExpString(str) {
                        return str.replace(
                            /(?:\.|\^|\$|\&|\`|\*|\(|\)|\||\?|\:|\=)/g,
                            '\\$&'
                        );
                    }
                }
            ]
        );

        return Minutes;
    })();

exports.DAY = DAY;
exports.HOUR = HOUR;
exports.WEEK = WEEK;
exports.default = Minutes;
