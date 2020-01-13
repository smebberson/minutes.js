//
// Constants
//

export const HOUR = 60;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;

export default class Minutes {
    /**
     * Create a new instance of minutes, scoped to an integer passed in.
     * @param  {Number} minutes The number of minutes this instance should work with.
     * @param  {Object} opts    The options to alter this particular instance of minutes.js
     * @return {Object}         The initialized instance of Minutes.
     */
    constructor(minutes, opts = {}) {
        // Attempt to parse the minutes as an integer.
        this.minutes = parseInt(minutes);

        // Only accept an integer.
        if ((Number.isNaN ?? isNaN)(this.minutes)) {
            throw new Error('Minutes accepts an integer representing minutes.');
        }

        this.opts = opts;

        // Default the time units.
        this.opts.units = this.opts.units ?? {};
        this.opts.units.w = this.opts.units.w ?? 'week';
        this.opts.units.d = this.opts.units.d ?? 'day';
        this.opts.units.h = this.opts.units.h ?? 'hour';
        this.opts.units.m = this.opts.units.m ?? 'minute';

        // Default the time units to display.
        this.opts.display = this.opts.display ?? {};
        this.opts.display.w = this.opts.display.w ?? true;
        this.opts.display.d = this.opts.display.d ?? true;
        this.opts.display.h = this.opts.display.h ?? true;
        this.opts.display.m = this.opts.display.m ?? true;

        // Default pluralize (to true).
        this.opts.pluralize = this.opts.pluralize ?? true;

        // Default separation tokens.
        this.opts.tokens = this.opts.tokens ?? {};
        this.opts.tokens.space = this.opts.tokens.space ?? ' ';
        this.opts.tokens.comma = this.opts.tokens.comma ?? ', ';
        this.opts.tokens.and = this.opts.tokens.and ?? ' and ';
        this.opts.tokens.plural = this.opts.tokens.plural ?? 's';

        return this;
    }

    /**
     * Using the options provided to the constructor take the value of the minutes and
     * format into a string.
     * @return {String} The formatted string (i.e. `10630` becomes `7 days, 9 hours and 10 minutes`).
     */
    toString() {
        // The delta will reduce in scope as we move through the various time units.
        // Each time a time unit is matched, remove that unit from the delta.
        const parts = [];
        let delta = this.minutes;

        // Determine the time period.

        // Are the minutes greater than a week?
        if (delta >= WEEK && this.opts.display.w) {
            parts.push(this.formatPart(Math.floor(delta / WEEK), 'w'));
            delta -= Math.floor(delta / WEEK) * WEEK;
        }

        // Are the remaining(?) minutes greater than a day?
        if (delta >= DAY && this.opts.display.d) {
            parts.push(this.formatPart(Math.floor(delta / DAY), 'd'));
            delta -= Math.floor(delta / DAY) * DAY;
        }

        // Are the remaining(?) minutes greater than an hour?
        if (delta >= HOUR && this.opts.display.h) {
            parts.push(this.formatPart(Math.floor(delta / HOUR), 'h'));
            delta -= Math.floor(delta / HOUR) * HOUR;
        }

        // Are there any remaining minutes?
        if (delta > 0 && this.opts.display.m) {
            parts.push(this.formatPart(delta, 'm'));
        }

        // Create the regex to replace the last occurrence of `this.opts.tokens.comma` with `this.opts.tokens.and`.
        const lastOccurrence = new RegExp(
            `${Minutes.safeRegExpString(
                this.opts.tokens.comma
            )}(?!.*${Minutes.safeRegExpString(this.opts.tokens.comma)})`
        );

        // Join parts with `,`, other than the final one which should be `and`.
        return parts
            .join(this.opts.tokens.comma)
            .replace(lastOccurrence, this.opts.tokens.and);
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
    formatPart(value, unit) {
        let str = value + this.opts.tokens.space + this.opts.units[unit];

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
    static safeRegExpString(str) {
        return str.replace(/(?:\.|\^|\$|\&|\`|\*|\(|\)|\||\?|\:|\=)/g, '\\$&');
    }
}
