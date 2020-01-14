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
    opts.display.inclusive = opts.display.inclusive ?? false;
    opts.display.w = opts.display.w ?? true;
    opts.display.ww = opts.display.ww ?? false;
    opts.display.d = opts.display.d ?? true;
    opts.display.dd = opts.display.dd ?? false;
    opts.display.h = opts.display.h ?? true;
    opts.display.hh = opts.display.hh ?? false;
    opts.display.m = opts.display.m ?? true;
    opts.display.mm = opts.display.mm ?? false;

    // Default pluralize (to true).
    opts.pluralize = opts.pluralize ?? true;

    // Default separation tokens.
    opts.tokens = opts.tokens ?? {};
    opts.tokens.space = opts.tokens.space ?? ' ';
    opts.tokens.delimiter = opts.tokens.delimiter ?? ', ';
    opts.tokens.conjunction = opts.tokens.conjunction ?? ' and ';
    opts.tokens.plural = opts.tokens.plural ?? 's';

    return opts;
};

const padWithZero = (value, leadingZero) =>
    leadingZero && value < 10 ? `0${value}` : value;

/**
 * Format a time unit (i.e. 1 h as '1 hour').
 * @param  {Number} value The value of the time unit.
 * @param  {String} unit  The time unit (either `'w'`, `'h'`, `'m'`, `'d'`).
 * @return {String}       The string representation of the time unit (i.e. 5 hours).
 */
const formatPart = (value, unit, leadingZero, opts) => {
    let str =
        padWithZero(value, leadingZero) + opts.tokens.space + opts.units[unit];

    // Make the unit representation plural if required.
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
const toString = (mins, opts) => {
    // The delta will reduce in scope as we move through the various time units.
    // Each time a time unit is matched, remove that unit from the delta.
    const parts = [];
    let delta = mins;

    // Determine the time period.

    // Are the minutes greater than a week?
    if (
        (delta >= WEEK || opts.display.inclusive) &&
        (opts.display.w || opts.display.ww)
    ) {
        parts.push(
            formatPart(Math.floor(delta / WEEK), 'w', opts.display.ww, opts)
        );
        delta -= Math.floor(delta / WEEK) * WEEK;
    }

    // Are the remaining(?) minutes greater than a day?
    if (
        (delta >= DAY || opts.display.inclusive) &&
        (opts.display.d || opts.display.dd)
    ) {
        parts.push(
            formatPart(Math.floor(delta / DAY), 'd', opts.display.dd, opts)
        );
        delta -= Math.floor(delta / DAY) * DAY;
    }

    // Are the remaining(?) minutes greater than an hour?
    if (
        (delta >= HOUR || opts.display.inclusive) &&
        (opts.display.h || opts.display.hh)
    ) {
        parts.push(
            formatPart(Math.floor(delta / HOUR), 'h', opts.display.hh, opts)
        );
        delta -= Math.floor(delta / HOUR) * HOUR;
    }

    // Are there any remaining minutes?
    if (
        (delta > 0 || opts.display.inclusive) &&
        (opts.display.m || opts.display.mm)
    ) {
        parts.push(formatPart(delta, 'm', opts.display.mm, opts));
    }

    if (parts.length === 1) {
        return parts.toString();
    }

    // Join parts with `delimiter`, other than the final one which should be `conjunction`.
    return `${parts.slice(0, parts.length - 1).join(opts.tokens.delimiter)}${
        opts.tokens.conjunction
    }${parts[parts.length - 1]}`;
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
