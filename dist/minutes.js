'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

    'use strict';

    //
    // Constants
    //

    var HOUR = 60;
    var DAY = 24 * HOUR;
    var WEEK = 7 * DAY;

    var Minutes = function () {

        /**
         * Create a new instance of minutes, scoped to an integer passed in.
         * @param  {Number} minutes The number of minutes this instance should work with.
         * @param  {Object} opts    The options to alter this particular instance of minutes.js
         * @return {Object}         The initialized instance of Minutes.
         */

        function Minutes(minutes, opts) {
            _classCallCheck(this, Minutes);

            // Atempt to parse the minutes as an integer.
            this.minutes = parseInt(minutes);

            // Only accept an integer.
            if (Number.isNaN(this.minutes)) {
                throw new Error('Minutes accepts an integer representing minutes.');
            }

            // Accept some options, default those that don't exist.
            this.opts = opts || {};

            // Default the time units.
            this.opts.units = this.opts.units || {};
            this.opts.units.w = this.opts.units.w || 'week';
            this.opts.units.d = this.opts.units.d || 'day';
            this.opts.units.h = this.opts.units.h || 'hour';
            this.opts.units.m = this.opts.units.m || 'minute';

            // Default pluralize (to true).
            this.opts.pluralize = typeof this.opts.pluralize === 'undefined' ? true : this.opts.pluralize;

            // Default separation tokens.
            this.opts.tokens = this.opts.tokens || {};
            this.opts.tokens.space = typeof this.opts.tokens.space === 'undefined' ? ' ' : this.opts.tokens.space;
            this.opts.tokens.comma = typeof this.opts.tokens.comma === 'undefined' ? ', ' : this.opts.tokens.comma;
            this.opts.tokens.and = typeof this.opts.tokens.and === 'undefined' ? ' and ' : this.opts.tokens.and;
            this.opts.tokens.plural = typeof this.opts.tokens.plural === 'undefined' ? 's' : this.opts.tokens.plural;

            return this;
        }

        /**
         * Using the options provided to the constructor take the value of the minutes and
         * format into a string.
         * @return {String} The formatted string (i.e. `10630` becomes `7 days, 9 hours and 10 minutes`).
         */


        _createClass(Minutes, [{
            key: 'toString',
            value: function toString() {

                // The delta will reduce in scope as we move through the various time units.
                // Each time a time unit is matched, remove that unit from the delta.
                var delta = this.minutes,
                    parts = [];

                // Determine the time period.

                // Are the minutes greater than a week?
                if (delta >= WEEK) {
                    parts.push(this.formatPart(Math.floor(delta / WEEK), 'w'));
                    delta -= Math.floor(delta / WEEK) * WEEK;
                }

                // Are the remaining(?) minutes greater than a day?
                if (delta >= DAY) {
                    parts.push(this.formatPart(Math.floor(delta / DAY), 'd'));
                    delta -= Math.floor(delta / DAY) * DAY;
                }

                // Are the remaining(?) minutes greather than an hour?
                if (delta >= HOUR) {
                    parts.push(this.formatPart(Math.floor(delta / HOUR), 'h'));
                    delta -= Math.floor(delta / HOUR) * HOUR;
                }

                // Are there any remaining minutes?
                if (delta > 0 && delta < HOUR) {
                    parts.push(this.formatPart(delta, 'm'));
                }

                // Create the regex to replace the last occurance of `this.opts.tokens.comma` with `this.opts.tokens.and`.
                var lastOccurence = new RegExp(Minutes.safeRegExpString(this.opts.tokens.comma) + '(?!.*' + Minutes.safeRegExpString(this.opts.tokens.comma) + ')');

                // Join parts with `,`, other than the final one which should be `and`.
                return parts.join(this.opts.tokens.comma).replace(lastOccurence, this.opts.tokens.and);
            }

            //
            // Instance methods.
            //

            /**
             * Format a time unit (i.e. 1 h as '1 hour').
             * @param  {Number} value The value of the time unit.
             * @param  {String} unit  The time unit (either `'w'`, `'h'`, `'m'`, `'d'`).
             * @return {String}       The string representation of the time unit (i.e. 5 hours).
             */

        }, {
            key: 'formatPart',
            value: function formatPart(value, unit) {

                var str = value + this.opts.tokens.space + this.opts.units[unit];

                // Make the unit representation plural if required.
                if (this.opts.pluralize && value > 1) {
                    str += this.opts.tokens.plural;
                }

                return str;
            }

            //
            // Static methods.
            //

            /**
             * Return a string that is safe to be used when dynamically building a regular expression.
             * @param  {String} str The string to escaped.
             * @return {String}     An escaped version of `str`.
             */

        }], [{
            key: 'safeRegExpString',
            value: function safeRegExpString(str) {

                return str.replace(/(?:\.|\^|\$|\&|\`|\*|\(|\)|\||\?|\:|\=)/g, '\\$&');
            }
        }]);

        return Minutes;
    }();

    module.exports = Minutes;
})();