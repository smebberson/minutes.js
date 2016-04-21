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

        // Join parts with `,`, other than the final one which should be `and`.
        return parts.join(', ').replace(/,(?!.*,)/, ' and');

    }

    //
    // Instance methods.
    //

    /*
     * Format a time unit (i.e. 1 hour as '1 hour').
     * @return {String}
    */
    formatPart (value, unit) {

        var str = `${value} ${this.opts.units[unit]}`;

        // Make the unit representation plural if required.
        if (value > 1) {
            str += 's';
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

}

module.exports = Minutes;