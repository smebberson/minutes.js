//
// Constants
//

export const HOUR = 60;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;

const defaultOptions = (defaults = {}) => {
    const opts = { ...defaults };

    // Default the time units.
    opts.units = opts.units ?? {};
    opts.units.w = opts.units.w ?? 'week';
    opts.units.d = opts.units.d ?? 'day';
    opts.units.h = opts.units.h ?? 'hour';
    opts.units.m = opts.units.m ?? 'minute';

    // Default the time units to display.
    opts.display = opts.display ?? {};
    opts.display.w = opts.display.w ?? true;
    opts.display.d = opts.display.d ?? true;
    opts.display.h = opts.display.h ?? true;
    opts.display.m = opts.display.m ?? true;

    // Default pluralize (to true).
    opts.pluralize = opts.pluralize ?? true;

    // Default separation tokens.
    opts.tokens = opts.tokens ?? {};
    opts.tokens.space = opts.tokens.space ?? ' ';
    opts.tokens.comma = opts.tokens.comma ?? ', ';
    opts.tokens.and = opts.tokens.and ?? ' and ';
    opts.tokens.plural = opts.tokens.plural ?? 's';

    return opts;
};

/**
 * Format a time unit (i.e. 1 h as '1 hour').
 * @param  {Number} value The value of the time unit.
 * @param  {String} unit  The time unit (either `'w'`, `'h'`, `'m'`, `'d'`).
 * @return {String}       The string representation of the time unit (i.e. 5 hours).
 */
const formatPart = (value, unit, opts) => {
    let str = value + opts.tokens.space + opts.units[unit];

    // Make the unit representation plural if required.
    if (opts.pluralize && value > 1) {
        str += opts.tokens.plural;
    }

    return str;
};

/**
 * Return a string that is safe to be used when dynamically building a regular expression.
 * @param  {String} str The string to escaped.
 * @return {String}     An escaped version of `str`.
 */
const safeRegExpString = (str) =>
    str.replace(/(?:\.|\^|\$|\&|\`|\*|\(|\)|\||\?|\:|\=)/g, '\\$&');

/**
 * Using the options provided to the constructor take the value of the minutes and
 * format into a string.
 * @return {String} The formatted string (i.e. `10630` becomes `7 days, 9 hours and 10 minutes`).
 */
const toString = (mins, opts) => {
    // The delta will reduce in scope as we move through the various time units.
    // Each time a time unit is matched, remove that unit from the delta.
    const parts = [];
    let delta = mins;

    // Determine the time period.

    // Are the minutes greater than a week?
    if (delta >= WEEK && opts.display.w) {
        parts.push(formatPart(Math.floor(delta / WEEK), 'w', opts));
        delta -= Math.floor(delta / WEEK) * WEEK;
    }

    // Are the remaining(?) minutes greater than a day?
    if (delta >= DAY && opts.display.d) {
        parts.push(formatPart(Math.floor(delta / DAY), 'd', opts));
        delta -= Math.floor(delta / DAY) * DAY;
    }

    // Are the remaining(?) minutes greater than an hour?
    if (delta >= HOUR && opts.display.h) {
        parts.push(formatPart(Math.floor(delta / HOUR), 'h', opts));
        delta -= Math.floor(delta / HOUR) * HOUR;
    }

    // Are there any remaining minutes?
    if (delta > 0 && opts.display.m) {
        parts.push(formatPart(delta, 'm', opts));
    }

    // Create the regex to replace the last occurrence of `opts.tokens.comma` with `opts.tokens.and`.
    const lastOccurrence = new RegExp(
        `${safeRegExpString(opts.tokens.comma)}(?!.*${safeRegExpString(
            opts.tokens.comma
        )})`
    );

    // Join parts with `,`, other than the final one which should be `and`.
    return parts
        .join(opts.tokens.comma)
        .replace(lastOccurrence, opts.tokens.and);
};

/**
 * Create a new instance of minutes, scoped to an integer passed in.
 * @param  {Number} minutes The number of minutes this instance should work with.
 * @param  {Object} options The options to alter this particular instance of minutes.js
 * @return {Object}         The initialized instance of Minutes.
 */
export default (minutes, options = {}) => {
    // Attempt to parse the minutes as an integer.
    const mins = parseInt(minutes);

    // Only accept an integer.
    if ((Number.isNaN ?? isNaN)(mins)) {
        throw new Error('Minutes accepts an integer representing minutes.');
    }

    const opts = defaultOptions(options);

    return toString(mins, opts);
};
