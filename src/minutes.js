'use strict';

class Minutes {

    constructor(minutes, opts) {

        // Atempt to parse the minutes as an integer.
        this.minutes = parseInt(minutes);

        // Only accept an integer.
        if (Number.isNaN()) {
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
        this.opts.pluralize = (typeof this.opts.pluralize === 'undefined') ? true : this.opts.pluralize;

        // Default separation tokens.
        this.opts.tokens = this.opts.tokens || {};
        this.opts.tokens.space = (typeof this.opts.tokens.space === 'undefined') ? ' ' : this.opts.tokens.space;
        this.opts.tokens.comma = (typeof this.opts.tokens.comma === 'undefined') ? ', ' : this.opts.tokens.comma;
        this.opts.tokens.and = (typeof this.opts.tokens.and === 'undefined') ? ' and ' : this.opts.tokens.and;
        this.opts.tokens.plural = (typeof this.opts.tokens.plural === 'undefined') ? 's' : this.opts.tokens.plural;


    }

    toString () {

        // The delta will reduce in scope as we move through the various time units.
        // Each time a time unit is matched, remove that unit from the delta.
        var delta = this.minutes,
            parts = [];

        // Determine the time period.

        // Are the minutes greater than a week?
        if (delta >= Minutes.week()) {
            parts.push(this.formatPart(Math.floor(delta/Minutes.week()), 'w'));
            delta -= Math.floor(delta/Minutes.week())*Minutes.week();
        }

        // Are the remaining(?) minutes greater than a day?
        if (delta >= Minutes.day()) {
            parts.push(this.formatPart(Math.floor(delta/Minutes.day()), 'd'));
            delta -= Math.floor(delta/Minutes.day())*Minutes.day();
        }

        // Are the remaining(?) minutes greather than an hour?
        if (delta >= Minutes.hour()) {
            parts.push(this.formatPart(Math.floor(delta/Minutes.hour()), 'h'));
            delta -= Math.floor(delta/Minutes.hour())*Minutes.hour();
        }

        // Are there any remaining minutes?
        if (delta > 0 && delta < Minutes.hour()) {
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

    /*
     * Format a time unit (i.e. 1 h as '1 hour').
     * @return {String}
    */
    formatPart (value, unit) {

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

    /*
     * Return the number of minutes in an hour.
     * @return {Number}
    */
    static hour () {
        return 60;
    }

    /*
     * Return the number of minutes in a day.
     * @return {Number}
    */
    static day () {
        return 24*Minutes.hour();
    }

    /*
     * Return the number of minutes in a week.
     * @return {Number}
    */
    static week () {
        return 7*Minutes.day();
    }

    /*
     * Return a string that is safe to be used when dynamically building a regular expression.
     * @return {Number}
    */
    static safeRegExpString (str) {

        str = str.replace(/(?:\.|\^|\$|\&|\`|\*|\(|\)|\||\?|\:|\=)/g, '\\$&');

        return str;

    }

}

module.exports = Minutes;
